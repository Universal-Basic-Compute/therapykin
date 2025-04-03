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

// Function to get all active specialists
export async function getActiveSpecialists() {
  try {
    const records = await specialistsTable.select({
      // Filter for active specialists if you have an IsActive field
      filterByFormula: '{IsActive} = TRUE()',
      fields: ['Name', 'DisplayName', 'Description', 'IsActive', 'SortOrder']
    }).all();
    
    return records.map(record => ({
      id: record.fields.Name, // Using "Name" field as the ID/slug
      name: record.fields.DisplayName || record.fields.Name,
      description: record.fields.Description || '',
      sortOrder: record.fields.SortOrder || 999 // Optional sort order field
    }));
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
    // Get the most recent session for this user
    const records = await sessionsTable.select({
      filterByFormula: `{Email} = '${email}'`,
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
    
    // Validate specialist value using the validation utility
    const { isValidSpecialist } = require('@/app/utils/validation');
    if (!isValidSpecialist(specialist, true)) { // true to include 'welcome'
      console.warn(`Invalid specialist value: ${specialist}, defaulting to generalist`);
      specialist = 'generalist';
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

/**
 * Checks if a user is authorized for a specific specialist role
 * @param user - The user object
 * @param specialistType - The specialist type to check for
 * @returns Boolean indicating if the user is authorized
 */
export function isAuthorizedForSpecialist(user: any, specialistType: string): boolean {
  // Admin users are authorized for all specialist types
  if (user.isAdmin === true || 
      user.isAdmin === "true" || 
      user.isAdmin === 1 || 
      user.isAdmin === "1") {
    return true;
  }
  
  // Check if user is a therapist
  if (user.isTherapist) {
    try {
      // Parse therapist types if it's a JSON string
      const therapistTypes = typeof user.isTherapist === 'string' && 
        user.isTherapist.startsWith('[') ? 
        JSON.parse(user.isTherapist) : 
        user.isTherapist;
      
      // Check if user is authorized for the requested specialist type
      if (Array.isArray(therapistTypes)) {
        return therapistTypes.includes(specialistType);
      } else if (typeof therapistTypes === 'string') {
        return therapistTypes === specialistType || therapistTypes.includes(specialistType);
      } else if (therapistTypes === true) {
        return true;
      }
    } catch (error) {
      console.error('Error parsing therapist types:', error);
    }
  }
  
  return false;
}

/**
 * Checks if a user is an admin
 * @param user - The user object
 * @returns Boolean indicating if the user is an admin
 */
export function isAdmin(user: any): boolean {
  return user.isAdmin === true || 
         user.isAdmin === "true" || 
         user.isAdmin === 1 || 
         user.isAdmin === "1";
}

export { base, usersTable };
