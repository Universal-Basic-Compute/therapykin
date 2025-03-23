import Airtable from 'airtable';

// Check if environment variables are defined
if (!process.env.AIRTABLE_API_KEY) {
  console.error('AIRTABLE_API_KEY is not defined in environment variables');
}

if (!process.env.AIRTABLE_BASE_ID) {
  console.error('AIRTABLE_BASE_ID is not defined in environment variables');
}

// Initialize Airtable with explicit error handling
const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY,
}).base(process.env.AIRTABLE_BASE_ID || '');

// Get the users table
const usersTable = base('USERS');

// Get the sessions table
export const sessionsTable = base('SESSIONS');

// Check for an ongoing session
export async function getOngoingSession(email: string): Promise<{ 
  id: string, 
  createdAt: string, 
  sessionLength?: number,
  specialist?: string  // Add this field
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
    
    // Return the session with its details including specialist
    return {
      id: record.id,
      createdAt: createdAt,
      sessionLength: record.fields.SessionLength as number || 30, // Default to 30 if not set
      specialist: record.fields.Specialist as string || 'generalist', // Default to generalist if not set
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
    const createdAt = new Date().toISOString();
    
    const records = await sessionsTable.create([
      {
        fields: {
          Email: email,
          CreatedAt: createdAt,
          SessionLength: sessionLength,
          Specialist: specialist,  // Add this field to store the specialist
        },
      },
    ]);
    
    const newSession = records[0];
    return {
      id: newSession.id,
      createdAt: newSession.fields.CreatedAt as string,
      sessionLength: newSession.fields.SessionLength as number || sessionLength,
      specialist: newSession.fields.Specialist as string || specialist,
    };
  } catch (error) {
    console.error('Error creating session:', error);
    throw error;
  }
}

export { base, usersTable };
