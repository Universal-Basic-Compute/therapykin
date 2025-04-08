import Airtable from 'airtable';

// Check if environment variables are defined
if (!process.env.AIRTABLE_API_KEY) {
  console.error('AIRTABLE_API_KEY is not defined in environment variables');
}

if (!process.env.AIRTABLE_BASE_ID) {
  console.error('AIRTABLE_BASE_ID is not defined in environment variables');
}

// Initialize Airtable with explicit error handling
let base: Airtable.Base;
try {
  base = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY,
  }).base(process.env.AIRTABLE_BASE_ID || '');
  
  console.log('Airtable initialized successfully');
} catch (error) {
  console.error('Failed to initialize Airtable:', error);
  // Provide a fallback to prevent crashes with type assertion
  base = {
    table: () => ({
      select: () => ({ firstPage: async () => [] }),
      find: async () => ({ fields: {} }),
      create: async () => { throw new Error('Airtable not properly initialized'); },
      update: async () => { throw new Error('Airtable not properly initialized'); },
    }),
  } as unknown as Airtable.Base;
}

// Get the users table
const usersTable = base('USERS');

// Get the sessions table
export const sessionsTable = base('SESSIONS');

// Get the specialists table
export const specialistsTable = base('SPECIALISTS');

// Get the bridges table
export const bridgesTable = base('BRIDGES');

// Cache for specialists to avoid frequent database calls
let specialistsCache: Array<{id: string, name: string, description: string, sortOrder: number}> = [];
let specialistsCacheExpiry = 0;
const SPECIALISTS_CACHE_DURATION = 3600000; // 1 hour in milliseconds

// Function to get all active specialists
export async function getActiveSpecialists() {
  // Check cache first
  const now = Date.now();
  if (specialistsCacheExpiry > now && specialistsCache.length > 0) {
    return [...specialistsCache]; // Return a copy of the cache
  }
  try {
    // Query all specialists and filter active ones in code
    // This is more resilient if the IsActive field is missing
    const records = await specialistsTable.select({
      fields: ['Name', 'DisplayName', 'Description', 'IsActive', 'SortOrder']
    }).all();
    
    // Filter for active specialists (default to active if IsActive field is missing)
    const activeRecords = records.filter(record => 
      record.fields.IsActive === undefined || 
      record.fields.IsActive === true || 
      record.fields.IsActive === 'true' || 
      record.fields.IsActive === 1 || 
      record.fields.IsActive === '1'
    );
    
    const specialists = activeRecords.map(record => ({
      id: record.fields.Name, // Using "Name" field as the ID/slug
      name: record.fields.DisplayName || record.fields.Name,
      description: record.fields.Description || '',
      sortOrder: record.fields.SortOrder || 999 // Optional sort order field
    }));
    
    // Update cache
    specialistsCache = specialists.map(s => ({
      id: String(s.id),
      name: String(s.name || ''),
      description: String(s.description || ''),
      sortOrder: Number(s.sortOrder || 999)
    }));
    specialistsCacheExpiry = now + SPECIALISTS_CACHE_DURATION;
    
    return specialists;
  } catch (error) {
    console.error('Error fetching specialists:', error);
    // Return at least the generalist as a fallback
    return [{ id: 'generalist', name: 'General Therapist', description: '', sortOrder: 0 }];
  }
}

// Function to check if a specialist exists in the database
export async function specialistExists(specialistName: string): Promise<boolean> {
  try {
    const records = await specialistsTable.select({
      filterByFormula: `{Name} = '${specialistName}'`,
      maxRecords: 1
    }).firstPage();
    
    return records.length > 0;
  } catch (error) {
    console.error(`Error checking if specialist '${specialistName}' exists:`, error);
    // Default to true for 'generalist' and 'welcome' as fallback
    return specialistName === 'generalist' || specialistName === 'welcome';
  }
}

// Check for an ongoing session
export async function getOngoingSession(email: string): Promise<{ 
  id: string, 
  createdAt: string, 
  sessionLength?: number,
  specialist?: string,
  rating?: number,
  ratingSubmitted?: boolean
} | null> {
  try {
    if (!email) {
      console.error('Email is required for getOngoingSession');
      return null;
    }
    
    // Get the most recent session for this user
    // Use a safer approach with explicit field comparison
    const escapedEmail = escapeAirtableString(email);
    const records = await sessionsTable.select({
      filterByFormula: `LOWER({Email}) = LOWER('${escapedEmail}')`,
      sort: [{ field: 'CreatedAt', direction: 'desc' }],
      maxRecords: 1
    }).firstPage();
    
    if (records.length === 0) {
      return null;
    }
    
    const record = records[0];
    const createdAt = record.fields.CreatedAt as string;
    
    if (!createdAt) {
      return null;
    }
    
    // Return the session with its details including specialist and rating information
    return {
      id: record.id,
      createdAt: createdAt,
      sessionLength: record.fields.SessionLength as number || 30, // Default to 30 if not set
      specialist: record.fields.Specialist as string || 'generalist', // Default to generalist if not set
      rating: record.fields.Rating as number || undefined,
      ratingSubmitted: record.fields.RatingSubmitted as boolean || false,
    };
  } catch (error) {
    console.error('Error checking for ongoing session:', error);
    return null;
  }
}

// Create a new session
export async function createSession(
  email: string, 
  sessionLength: number = 30,
  specialist: string = 'generalist',
  isDemo: boolean = false
): Promise<{ id: string, createdAt: string, sessionLength: number, specialist: string }> {
  try {
    if (!email) {
      throw new Error('Email is required for creating a session');
    }
    
    // Import isValidSpecialist at the top of the file instead of using require
    // This is just a validation check - if the specialist is invalid, default to generalist
    if (specialist !== 'generalist' && specialist !== 'welcome') {
      const specialistPattern = /^[a-z0-9-]+$/;
      const excludedSpecialists = ['admin', 'test', 'debug'];
      
      const isValid = specialistPattern.test(specialist) && 
                      !excludedSpecialists.includes(specialist) &&
                      specialist.length >= 3 && 
                      specialist.length <= 30;
                      
      if (!isValid) {
        console.warn(`Invalid specialist value: ${specialist}, defaulting to generalist`);
        specialist = 'generalist';
      }
    }
    
    const createdAt = new Date().toISOString();
    
    // Log the exact data being sent to Airtable
    const sessionData = {
      Email: email,
      CreatedAt: createdAt,
      SessionLength: sessionLength,
      Specialist: specialist,
      RatingSubmitted: false,
      IsDemo: isDemo // Add this field
    };
    
    console.log(`Creating new session for ${email} with data:`, JSON.stringify(sessionData, null, 2));
    
    const records = await sessionsTable.create([
      {
        fields: sessionData,
      },
    ]);
    
    if (!records || records.length === 0) {
      throw new Error('No records returned from Airtable');
    }
    
    const newSession = records[0];
    console.log(`Session created successfully with ID: ${newSession.id}`);
    
    return {
      id: newSession.id,
      createdAt: newSession.fields.CreatedAt as string,
      sessionLength: newSession.fields.SessionLength as number || sessionLength,
      specialist: newSession.fields.Specialist as string || specialist,
    };
  } catch (error) {
    // Provide more detailed error information
    console.error('Error creating session:', error);
    
    // Log the full error details
    console.error('Detailed error creating session:', JSON.stringify(error, null, 2));
    
    // Check for specific Airtable errors
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error name:', error.name);
      
      if ('statusCode' in error) {
        console.error('Status code:', (error as any).statusCode);
      }
      
      if ('type' in error) {
        console.error('Error type:', (error as any).type);
      }
      
      if (error.message.includes('AUTHENTICATION_REQUIRED')) {
        console.error('Airtable authentication failed. Check your API key.');
      } else if (error.message.includes('NOT_FOUND')) {
        console.error('Airtable base or table not found. Check your base ID and table name.');
      } else if (error.message.includes('PERMISSION_DENIED')) {
        console.error('Permission denied. Check your Airtable permissions.');
      } else if (error.message.includes('INVALID_PERMISSIONS')) {
        console.error('Invalid permissions. Your API key may not have write access.');
      } else if (error.message.includes('INVALID_VALUE_FOR_COLUMN')) {
        console.error('Invalid value for a column. Check field types and formats.');
      } else if (error.message.includes('UNKNOWN_FIELD_NAME')) {
        console.error('Unknown field name. Verify field names match Airtable exactly (case-sensitive).');
      }
    }
    
    throw error;
  }
}

// Submit session rating
export async function submitSessionRating(
  sessionId: string,
  rating: {
    overallRating: number,
    understandingEmpathy: number,
    helpfulnessOfAdvice: number,
    sessionFlow: number,
    rememberingContext: number,
    comments?: string
  }
): Promise<boolean> {
  try {
    await sessionsTable.update([
      {
        id: sessionId,
        fields: {
          Rating: rating.overallRating,
          UnderstandingEmpathy: rating.understandingEmpathy,
          HelpfulnessOfAdvice: rating.helpfulnessOfAdvice,
          SessionFlow: rating.sessionFlow,
          RememberingContext: rating.rememberingContext,
          FeedbackComments: rating.comments || '',
          RatingSubmitted: true,
          RatingSubmittedAt: new Date().toISOString()
        },
      },
    ]);
    
    return true;
  } catch (error) {
    console.error('Error submitting session rating:', error);
    return false;
  }
}

// Update session with summary image URL
export async function updateSessionImage(
  sessionId: string,
  imageUrl: string
): Promise<boolean> {
  try {
    console.log(`Updating session ${sessionId} with image URL: ${imageUrl}`);
    
    await sessionsTable.update([
      {
        id: sessionId,
        fields: {
          SummaryImage: imageUrl,
          ImageGeneratedAt: new Date().toISOString()
        },
      },
    ]);
    
    console.log('Session image updated successfully');
    return true;
  } catch (error) {
    console.error('Error updating session image:', error);
    return false;
  }
}

// These functions have been moved to auth.ts to avoid duplication

/**
 * Escapes single quotes in Airtable formula strings to prevent injection
 * @param value - The string value to escape
 * @returns The escaped string
 */
function escapeAirtableString(value: string): string {
  if (!value) return '';
  // Replace single quotes with escaped single quotes
  return value.replace(/'/g, "\\'");
}

// Bridge-related functions
export interface Bridge {
  id: string;
  name: string;
  description: string;
  type: string;
  creatorEmail: string;
  participants: string[];
  status: string;
  createdAt: string;
  lastActive: string;
}

// Get bridges by user email
export async function getBridgesByUser(email: string): Promise<Bridge[]> {
  try {
    if (!email) {
      console.error('Email is required for getBridgesByUser');
      return [];
    }
    
    const escapedEmail = escapeAirtableString(email);
    const formula = `OR(FIND("${escapedEmail}", LOWER({Participants})), FIND("${escapedEmail}", LOWER({CreatorEmail})))`;
    
    const records = await bridgesTable.select({
      filterByFormula: formula,
      sort: [{ field: 'LastActive', direction: 'desc' }]
    }).all();
    
    return records.map(record => ({
      id: record.id,
      name: record.fields.Name as string || '',
      description: record.fields.Description as string || '',
      type: record.fields.Type as string || 'relationship',
      creatorEmail: record.fields.CreatorEmail as string || '',
      participants: (record.fields.Participants as string || '').split(',').map(p => p.trim()),
      status: record.fields.Status as string || 'active',
      createdAt: record.fields.CreatedAt as string || new Date().toISOString(),
      lastActive: record.fields.LastActive as string || new Date().toISOString()
    }));
  } catch (error) {
    console.error('Error fetching bridges by user:', error);
    return [];
  }
}

// Get a single bridge by ID
export async function getBridge(id: string): Promise<Bridge | null> {
  try {
    if (!id) {
      console.error('Bridge ID is required for getBridge');
      return null;
    }
    
    const record = await bridgesTable.find(id);
    
    if (!record) {
      return null;
    }
    
    return {
      id: record.id,
      name: record.fields.Name as string || '',
      description: record.fields.Description as string || '',
      type: record.fields.Type as string || 'relationship',
      creatorEmail: record.fields.CreatorEmail as string || '',
      participants: (record.fields.Participants as string || '').split(',').map(p => p.trim()),
      status: record.fields.Status as string || 'active',
      createdAt: record.fields.CreatedAt as string || new Date().toISOString(),
      lastActive: record.fields.LastActive as string || new Date().toISOString()
    };
  } catch (error) {
    console.error('Error fetching bridge by ID:', error);
    return null;
  }
}

// Create a new bridge
export async function createBridge(data: {
  name: string;
  description: string;
  type: string;
  creatorEmail: string;
  participantEmail: string | null;
}): Promise<Bridge | null> {
  try {
    const now = new Date().toISOString();
    
    // Initialize participants with the creator
    let participants = [data.creatorEmail];
    
    // Add the participant if provided
    if (data.participantEmail) {
      participants.push(data.participantEmail);
    }
    
    const records = await bridgesTable.create([
      {
        fields: {
          Name: data.name,
          Description: data.description,
          Type: data.type,
          CreatorEmail: data.creatorEmail,
          Participants: participants.join(','),
          Status: 'active',
          CreatedAt: now,
          LastActive: now
        }
      }
    ]);
    
    if (!records || records.length === 0) {
      throw new Error('No records returned from Airtable');
    }
    
    const newBridge = records[0];
    
    return {
      id: newBridge.id,
      name: newBridge.fields.Name as string || '',
      description: newBridge.fields.Description as string || '',
      type: newBridge.fields.Type as string || 'relationship',
      creatorEmail: newBridge.fields.CreatorEmail as string || '',
      participants: (newBridge.fields.Participants as string || '').split(',').map(p => p.trim()),
      status: newBridge.fields.Status as string || 'active',
      createdAt: newBridge.fields.CreatedAt as string || now,
      lastActive: newBridge.fields.LastActive as string || now
    };
  } catch (error) {
    console.error('Error creating bridge:', error);
    return null;
  }
}

// Update a bridge
export async function updateBridge(
  id: string,
  data: {
    name?: string;
    description?: string;
    type?: string;
    status?: string;
  }
): Promise<Bridge | null> {
  try {
    if (!id) {
      console.error('Bridge ID is required for updateBridge');
      return null;
    }
    
    const now = new Date().toISOString();
    
    const records = await bridgesTable.update([
      {
        id,
        fields: {
          ...data,
          LastActive: now
        }
      }
    ]);
    
    if (!records || records.length === 0) {
      throw new Error('No records returned from Airtable');
    }
    
    const updatedBridge = records[0];
    
    return {
      id: updatedBridge.id,
      name: updatedBridge.fields.Name as string || '',
      description: updatedBridge.fields.Description as string || '',
      type: updatedBridge.fields.Type as string || 'relationship',
      creatorEmail: updatedBridge.fields.CreatorEmail as string || '',
      participants: (updatedBridge.fields.Participants as string || '').split(',').map(p => p.trim()),
      status: updatedBridge.fields.Status as string || 'active',
      createdAt: updatedBridge.fields.CreatedAt as string || '',
      lastActive: updatedBridge.fields.LastActive as string || now
    };
  } catch (error) {
    console.error('Error updating bridge:', error);
    return null;
  }
}

// Delete a bridge
export async function deleteBridge(id: string): Promise<boolean> {
  try {
    if (!id) {
      console.error('Bridge ID is required for deleteBridge');
      return false;
    }
    
    await bridgesTable.destroy(id);
    return true;
  } catch (error) {
    console.error('Error deleting bridge:', error);
    return false;
  }
}

// Add a participant to a bridge
export async function addParticipantToBridge(
  id: string,
  email: string
): Promise<Bridge | null> {
  try {
    if (!id || !email) {
      console.error('Bridge ID and email are required for addParticipantToBridge');
      return null;
    }
    
    // Get the current bridge
    const bridge = await getBridge(id);
    
    if (!bridge) {
      return null;
    }
    
    // Add the new participant
    const participants = [...bridge.participants, email];
    
    // Update the bridge
    const now = new Date().toISOString();
    
    const records = await bridgesTable.update([
      {
        id,
        fields: {
          Participants: participants.join(','),
          LastActive: now
        }
      }
    ]);
    
    if (!records || records.length === 0) {
      throw new Error('No records returned from Airtable');
    }
    
    const updatedBridge = records[0];
    
    return {
      id: updatedBridge.id,
      name: updatedBridge.fields.Name as string || '',
      description: updatedBridge.fields.Description as string || '',
      type: updatedBridge.fields.Type as string || 'relationship',
      creatorEmail: updatedBridge.fields.CreatorEmail as string || '',
      participants: (updatedBridge.fields.Participants as string || '').split(',').map(p => p.trim()),
      status: updatedBridge.fields.Status as string || 'active',
      createdAt: updatedBridge.fields.CreatedAt as string || '',
      lastActive: updatedBridge.fields.LastActive as string || now
    };
  } catch (error) {
    console.error('Error adding participant to bridge:', error);
    return null;
  }
}

// Remove a participant from a bridge
export async function removeParticipantFromBridge(
  id: string,
  email: string
): Promise<Bridge | null> {
  try {
    if (!id || !email) {
      console.error('Bridge ID and email are required for removeParticipantFromBridge');
      return null;
    }
    
    // Get the current bridge
    const bridge = await getBridge(id);
    
    if (!bridge) {
      return null;
    }
    
    // Remove the participant
    const participants = bridge.participants.filter(p => p !== email);
    
    // Update the bridge
    const now = new Date().toISOString();
    
    const records = await bridgesTable.update([
      {
        id,
        fields: {
          Participants: participants.join(','),
          LastActive: now
        }
      }
    ]);
    
    if (!records || records.length === 0) {
      throw new Error('No records returned from Airtable');
    }
    
    const updatedBridge = records[0];
    
    return {
      id: updatedBridge.id,
      name: updatedBridge.fields.Name as string || '',
      description: updatedBridge.fields.Description as string || '',
      type: updatedBridge.fields.Type as string || 'relationship',
      creatorEmail: updatedBridge.fields.CreatorEmail as string || '',
      participants: (updatedBridge.fields.Participants as string || '').split(',').map(p => p.trim()),
      status: updatedBridge.fields.Status as string || 'active',
      createdAt: updatedBridge.fields.CreatedAt as string || '',
      lastActive: updatedBridge.fields.LastActive as string || now
    };
  } catch (error) {
    console.error('Error removing participant from bridge:', error);
    return null;
  }
}

export { base, usersTable, escapeAirtableString };
