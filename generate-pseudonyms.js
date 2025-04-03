
require('dotenv').config();
const Airtable = require('airtable');
const { generatePseudonymFromEmail } = require('./app/utils/pseudonyms');

// Initialize Airtable
const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY,
}).base(process.env.AIRTABLE_BASE_ID || '');

const usersTable = base('USERS');

async function generatePseudonymsForUsers() {
  try {
    console.log('Fetching all users from Airtable...');
    
    // Get all users
    const records = await usersTable.select().all();
    console.log(`Found ${records.length} users`);
    
    // Process users in batches to avoid Airtable API limits
    const batchSize = 10;
    const batches = [];
    
    for (let i = 0; i < records.length; i += batchSize) {
      batches.push(records.slice(i, i + batchSize));
    }
    
    console.log(`Processing users in ${batches.length} batches of ${batchSize}`);
    
    let updatedCount = 0;
    let skippedCount = 0;
    
    // Process each batch
    for (let i = 0; i < batches.length; i++) {
      const batch = batches[i];
      console.log(`Processing batch ${i + 1} of ${batches.length}`);
      
      const updates = [];
      
      for (const record of batch) {
        const email = record.fields.Email;
        
        // Skip if no email or already has pseudonym
        if (!email) {
          console.log(`Skipping user ${record.id}: No email`);
          skippedCount++;
          continue;
        }
        
        if (record.fields.Pseudonym && record.fields.Color) {
          console.log(`Skipping user ${record.id}: Already has pseudonym`);
          skippedCount++;
          continue;
        }
        
        // Generate pseudonym and color
        const { name, color } = generatePseudonymFromEmail(email);
        console.log(`Generated pseudonym for ${email}: ${name} (${color})`);
        
        // Add to updates
        updates.push({
          id: record.id,
          fields: {
            Pseudonym: name,
            Color: color
          }
        });
        
        updatedCount++;
      }
      
      // Update records in Airtable
      if (updates.length > 0) {
        console.log(`Updating ${updates.length} users in batch ${i + 1}`);
        await usersTable.update(updates);
        console.log(`Successfully updated ${updates.length} users`);
      } else {
        console.log(`No users to update in batch ${i + 1}`);
      }
      
      // Add a small delay between batches to avoid rate limiting
      if (i < batches.length - 1) {
        console.log('Waiting 1 second before processing next batch...');
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    
    console.log('Finished processing all users');
    console.log(`Updated: ${updatedCount}, Skipped: ${skippedCount}, Total: ${records.length}`);
    
  } catch (error) {
    console.error('Error generating pseudonyms:', error);
  }
}

// Run the script
generatePseudonymsForUsers()
  .then(() => {
    console.log('Script completed successfully');
    process.exit(0);
  })
  .catch(error => {
    console.error('Script failed:', error);
    process.exit(1);
  });
