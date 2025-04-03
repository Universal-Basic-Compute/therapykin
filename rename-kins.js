require('dotenv').config();
const Airtable = require('airtable');
const axios = require('axios');

// Initialize Airtable
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID);
const usersTable = base('Users');

// KinOS API configuration
const KINOS_API_URL = process.env.KINOS_API_URL || 'https://api.kinos-engine.ai';
const KINOS_API_KEY = process.env.KINOS_API_KEY;
const BASE_BLUEPRINT_ID = 'therapykin'; // Base blueprint ID

// List of all available specialists
const SPECIALISTS = [
  'generalist',
  'anxiety',
  'depression',
  'relationships',
  'stress',
  'grief',
  'trauma',
  'selfesteem',
  'addiction',
  'anger',
  'sleep',
  'parenting',
  'career',
  'herosjourney',
  'welcome'
];

// Function to rename a kin in a specific blueprint
async function renameKinInBlueprint(blueprintId, kinId, newName) {
  try {
    const response = await axios.post(
      `${KINOS_API_URL}/v2/blueprints/${blueprintId}/kins/${kinId}/rename`,
      { new_name: newName },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': KINOS_API_KEY
        }
      }
    );
    
    console.log(`Successfully renamed kin ${kinId} to ${newName} in blueprint ${blueprintId}`);
    return { success: true, data: response.data };
  } catch (error) {
    console.error(`Error renaming kin ${kinId} in blueprint ${blueprintId}:`, error.response?.data || error.message);
    return { success: false, error: error.response?.data || error.message };
  }
}

// Function to rename a kin across all blueprints
async function renameKinAcrossBlueprints(kinId, newName) {
  const results = {
    success: 0,
    errors: 0,
    details: []
  };
  
  // First rename in the base blueprint
  const baseResult = await renameKinInBlueprint(BASE_BLUEPRINT_ID, kinId, newName);
  if (baseResult.success) {
    results.success++;
  } else {
    results.errors++;
  }
  results.details.push({ blueprint: BASE_BLUEPRINT_ID, ...baseResult });
  
  // Then rename in each specialist blueprint
  for (const specialist of SPECIALISTS) {
    if (specialist === 'generalist') continue; // Skip generalist as it's the base blueprint
    
    const specialistBlueprintId = `${BASE_BLUEPRINT_ID}${specialist}`;
    const specialistResult = await renameKinInBlueprint(specialistBlueprintId, kinId, newName);
    
    if (specialistResult.success) {
      results.success++;
    } else {
      results.errors++;
    }
    results.details.push({ blueprint: specialistBlueprintId, ...specialistResult });
    
    // Add a small delay between requests to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 200));
  }
  
  return results;
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
    
    let totalSuccess = 0;
    let totalErrors = 0;
    
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
        totalErrors++;
        continue;
      }
      
      // The original kin ID would be FirstNameLastName (without spaces)
      const originalKinId = `${firstName}${lastName}`.replace(/\s+/g, '');
      
      // Rename the kin across all blueprints
      console.log(`Renaming kin ${originalKinId} to ${pseudonym} across all blueprints...`);
      const results = await renameKinAcrossBlueprints(originalKinId, pseudonym);
      
      console.log(`Completed renaming for ${email}: ${results.success} successful, ${results.errors} errors`);
      totalSuccess += results.success;
      totalErrors += results.errors;
      
      // Add a small delay between users to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    console.log(`Completed processing ${records.length} users`);
    console.log(`Total renames: Success: ${totalSuccess}, Errors: ${totalErrors}`);
    
  } catch (error) {
    console.error('Error processing users:', error.message);
  }
}

// Run the script
processUsers()
  .then(() => console.log('Script completed'))
  .catch(err => console.error('Script failed:', err));
