const axios = require('axios');
require('dotenv').config(); // Load environment variables from .env file

// Configuration
const API_BASE_URL = process.env.KINOS_API_URL || 'https://api.kinos-engine.ai';
const API_KEY = process.env.KINOS_API_KEY;
const CUSTOMER = 'therapykinwelcome';

// Helper function to format messages for display
function formatMessages(messages) {
  return messages.map(msg => {
    const timestamp = new Date(msg.timestamp).toLocaleString();
    return `[${timestamp}] ${msg.role.toUpperCase()}: ${msg.content}`;
  }).join('\n\n' + '-'.repeat(80) + '\n\n');
}

// Main function to get all projects and their messages
async function getWelcomeMessages() {
  try {
    console.log(`Fetching projects for customer: ${CUSTOMER}...`);
    
    // Get all projects for the customer
    const projectsResponse = await axios.get(`${API_BASE_URL}/projects/${CUSTOMER}/projects`, {
      headers: {
        'X-API-Key': API_KEY
      }
    });
    
    const projects = projectsResponse.data.projects;
    console.log(`Found ${projects.length} projects.`);
    
    // Process each project
    for (const projectId of projects) {
      console.log(`\n${'='.repeat(80)}`);
      console.log(`PROJECT: ${projectId}`);
      console.log(`${'='.repeat(80)}\n`);
      
      try {
        // Get messages for this project
        const messagesResponse = await axios.get(
          `${API_BASE_URL}/projects/${CUSTOMER}/${projectId}/messages`,
          {
            headers: {
              'X-API-Key': API_KEY
            }
          }
        );
        
        const messages = messagesResponse.data.messages;
        console.log(`Found ${messages.length} messages for project ${projectId}`);
        
        if (messages.length > 0) {
          // Format and display messages
          const formattedMessages = formatMessages(messages);
          console.log(formattedMessages);
        } else {
          console.log("No messages found for this project.");
        }
      } catch (error) {
        console.error(`Error fetching messages for project ${projectId}:`, error.message);
      }
    }
    
    console.log('\nDone processing all projects.');
  } catch (error) {
    console.error('Error:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    }
  }
}

// Run the main function
getWelcomeMessages();
