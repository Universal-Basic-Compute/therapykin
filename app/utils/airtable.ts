import Airtable from 'airtable';

// Check if environment variables are defined
if (!process.env.AIRTABLE_API_KEY) {
  console.error('AIRTABLE_API_KEY is not defined in environment variables');
}

if (!process.env.AIRTABLE_BASE_ID) {
  console.error('AIRTABLE_BASE_ID is not defined in environment variables');
}

// Initialize Airtable with explicit error handling
let base;
try {
  base = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY,
  }).base(process.env.AIRTABLE_BASE_ID || '');
  
  console.log('Airtable initialized successfully');
} catch (error) {
  console.error('Failed to initialize Airtable:', error);
  // Provide a fallback to prevent crashes
  base = {
    table: () => ({
      select: () => ({ firstPage: async () => [] }),
      find: async () => ({ fields: {} }),
      create: async () => { throw new Error('Airtable not properly initialized'); },
      update: async () => { throw new Error('Airtable not properly initialized'); },
    }),
  };
}

// Get the users table
const usersTable = base('USERS');

// Get the sessions table
export const sessionsTable = base('SESSIONS');

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
  specialist: string = 'generalist'  // Add specialist parameter with default value
): Promise<{ id: string, createdAt: string, sessionLength: number, specialist: string }> {
  try {
    if (!email) {
      throw new Error('Email is required for creating a session');
    }
    
    const createdAt = new Date().toISOString();
    
    console.log(`Creating new session for ${email} with length ${sessionLength} and specialist ${specialist}`);
    
    const records = await sessionsTable.create([
      {
        fields: {
          Email: email,
          CreatedAt: createdAt,
          SessionLength: sessionLength,
          Specialist: specialist,  // Add this field to store the specialist
          RatingSubmitted: false,  // Initialize rating as not submitted
        },
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
    
    // Check for specific Airtable errors
    if (error instanceof Error) {
      if (error.message.includes('AUTHENTICATION_REQUIRED')) {
        console.error('Airtable authentication failed. Check your API key.');
      } else if (error.message.includes('NOT_FOUND')) {
        console.error('Airtable base or table not found. Check your base ID and table name.');
      } else if (error.message.includes('PERMISSION_DENIED')) {
        console.error('Permission denied. Check your Airtable permissions.');
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

export { base, usersTable };
