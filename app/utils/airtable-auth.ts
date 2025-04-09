import { usersTable, escapeAirtableString } from './airtable';

export async function getUserByEmail(email: string) {
  try {
    if (!email) {
      console.error('Email is required for getUserByEmail');
      return null;
    }
    
    // Escape the email for Airtable formula
    const escapedEmail = escapeAirtableString(email.toLowerCase());
    
    const records = await usersTable.select({
      filterByFormula: `LOWER({Email}) = '${escapedEmail}'`,
      maxRecords: 1,
    }).firstPage();
    
    if (records.length === 0) {
      return null;
    }
    
    const record = records[0];
    
    return {
      id: record.id,
      email: record.fields.Email as string,
      firstName: record.fields.FirstName as string,
      lastName: record.fields.LastName as string,
      isAdmin: record.fields.IsAdmin as boolean,
      isTherapist: record.fields.IsTherapist as string | boolean,
      pseudonym: record.fields.Pseudonym as string,
      // Add any other fields you need
    };
  } catch (error) {
    console.error('Error getting user by email:', error);
    return null;
  }
}
