require('dotenv').config();
const Airtable = require('airtable');
const axios = require('axios');

// Initialize Airtable
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID);
const usersTable = base('Users');

// KinOS API configuration
const KINOS_API_URL = process.env.KINOS_API_URL || 'https://api.kinos-engine.ai';
const KINOS_API_KEY = process.env.KINOS_API_KEY;
const BLUEPRINT_ID = 'kinos'; // Default blueprint ID

// Function to rename a kin in KinOS Engine
async function renameKin(kinId, newName) {
  try {
    const response = await axios.post(
      `${KINOS_API_URL}/v2/blueprints/${BLUEPRINT_ID}/kins/${kinId}/rename`,
      { new_name: newName },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': KINOS_API_KEY
        }
      }
    );
    
    console.log(`Successfully renamed kin ${kinId} to ${newName}`);
    return response.data;
  } catch (error) {
    console.error(`Error renaming kin ${kinId}:`, error.response?.data || error.message);
    return null;
  }
}

// Main function to process all users
async function processUsers() {
  try {
    console.log('Starting to process users...');
    
    // Fetch all users from Airtable who have a Pseudonym
    const records = await usersTable.select({
      filterByFormula: 'NOT({Pseudonym} = "")'
    }).all();
    
    console.log(`Found ${records.length} users with pseudonyms in Airtable`);
    
    let successCount = 0;
    let errorCount = 0;
    
    // Process each user
    for (const record of records) {
      const fields = record.fields;
      const email = fields.Email;
      const firstName = fields.FirstName;
      const lastName = fields.LastName || '';
      const pseudonym = fields.Pseudonym;
      
      // Skip if missing required fields
      if (!email || !firstName || !pseudonym) {
        console.log(`Skipping user ${record.id}: Missing email, firstName, or pseudonym`);
        errorCount++;
        continue;
      }
      
      // The original kin ID would be FirstNameLastName (without spaces)
      const originalKinId = `${firstName}${lastName}`.replace(/\s+/g, '');
      
      // Rename the kin
      console.log(`Renaming kin ${originalKinId} to ${pseudonym}...`);
      const result = await renameKin(originalKinId, pseudonym);
      
      if (result) {
        successCount++;
      } else {
        errorCount++;
      }
      
      // Add a small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    console.log(`Completed processing ${records.length} users`);
    console.log(`Success: ${successCount}, Errors: ${errorCount}`);
    
  } catch (error) {
    console.error('Error processing users:', error.message);
  }
}

// Run the script
processUsers()
  .then(() => console.log('Script completed'))
  .catch(err => console.error('Script failed:', err));
