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
export async function getOngoingSession(email: string): Promise<{ id: string, createdAt: string } | null> {
  try {
    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000); // 1 hour ago
    
    // Format the date for Airtable formula
    const formattedDate = oneHourAgo.toISOString();
    
    // Query for sessions created in the last hour for this user
    const records = await sessionsTable.select({
      filterByFormula: `AND({Email} = '${email}', {CreatedAt} > '${formattedDate}')`,
      sort: [{ field: 'CreatedAt', direction: 'desc' }],
      maxRecords: 1
    }).firstPage();
    
    if (records.length > 0) {
      const session = records[0];
      console.log(`Found ongoing session: ${session.id} created at ${session.fields.CreatedAt}`);
      return {
        id: session.id,
        createdAt: session.fields.CreatedAt as string
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error checking for ongoing session:', error);
    return null;
  }
}

// Create a new session
export async function createSession(email: string): Promise<{ id: string, createdAt: string }> {
  try {
    const createdAt = new Date().toISOString();
    
    const records = await sessionsTable.create([
      {
        fields: {
          Email: email,
          CreatedAt: createdAt,
        },
      },
    ]);
    
    const newSession = records[0];
    return {
      id: newSession.id,
      createdAt: newSession.fields.CreatedAt as string,
    };
  } catch (error) {
    console.error('Error creating session:', error);
    throw error;
  }
}

export { base, usersTable };
