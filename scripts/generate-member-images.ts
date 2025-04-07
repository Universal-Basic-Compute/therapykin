import fs from 'fs';
import path from 'path';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const KINOS_API_URL = process.env.KINOS_API_URL || 'https://api.kinos.ai';
const KINOS_API_KEY = process.env.KINOS_API_KEY;
const IDEOGRAM_API_KEY = process.env.IDEOGRAM_API_KEY;

interface CircleMember {
  id: string;
  name: string;
  role?: string;
}

async function getPhysicalDescription(kinId: string): Promise<string> {
  try {
    const response = await axios.post(
      `${KINOS_API_URL}/v2/blueprints/therapykinmember/kins/${kinId}/analysis`,
      {
        message: "Describe your physical appearance in detail, including age, facial features, style of dress, and overall demeanor.",
        model: "claude-3-5-haiku-latest"
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': KINOS_API_KEY
        }
      }
    );

    return response.data.response;
  } catch (error) {
    console.error(`Error getting physical description for ${kinId}:`, error);
    throw error;
  }
}

async function generateImagePrompt(description: string): Promise<string> {
  try {
    const response = await axios.post(
      `${KINOS_API_URL}/v2/blueprints/therapykinmember/kins/analysis`,
      {
        message: `Create an Ideogram prompt for a pencil illustration profile picture based on this description: ${description}. 
The illustration should be in a clean, modern therapeutic style using (#00c5bc teal, #8ced7d light green, #a571ff purple, #c278f5 violet, #ffde45 yellow, #ff9d76 orange) on a white background.
Focus on capturing the essence and personality while maintaining privacy and abstraction.
Use gentle, flowing pencil lines and subtle shading. Keep the composition minimalist with smooth, curved forms that evoke support and emotional safety. Style should be contemporary but organic, avoiding harsh edges.`,
        model: "claude-3-7-sonnet-latest"
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': KINOS_API_KEY
        }
      }
    );

    return response.data.response;
  } catch (error) {
    console.error('Error generating image prompt:', error);
    throw error;
  }
}

async function generateImage(prompt: string, memberId: string): Promise<void> {
  try {
    const response = await axios.post(
      'https://api.ideogram.ai/generate',
      {
        image_request: {
          prompt,
          aspect_ratio: "ASPECT_1_1",
          model: "V_2A",
          magic_prompt_option: "AUTO"
        }
      },
      {
        headers: {
          'Api-Key': IDEOGRAM_API_KEY,
          'Content-Type': 'application/json'
        }
      }
    );

    // Ensure the public/members directory exists
    const dirPath = path.join(process.cwd(), 'public', 'members');
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    // Download and save the image
    if (response.data.data?.[0]?.url) {
      const imageUrl = response.data.data[0].url;
      const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
      const imagePath = path.join(dirPath, `${memberId}.jpg`);
      fs.writeFileSync(imagePath, imageResponse.data);
      console.log(`Image saved for ${memberId}`);
    }
  } catch (error) {
    console.error(`Error generating image for ${memberId}:`, error);
    throw error;
  }
}

async function processCircle(circleName: string) {
  try {
    // Read circle data
    const circleDataPath = path.join(process.cwd(), 'app', 'data', 'circles', `${circleName}.json`);
    const circleData = JSON.parse(fs.readFileSync(circleDataPath, 'utf8'));

    // Process each member except empty slots
    const members = circleData.members.filter((member: CircleMember) => 
      member.id !== 'empty' && member.id !== 'therapist'
    );

    // Create the public/members directory if it doesn't exist
    const dirPath = path.join(process.cwd(), 'public', 'members');
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    for (const member of members) {
      console.log(`Processing member: ${member.name} (${member.id})`);
      
      // Check if image already exists
      const imagePath = path.join(dirPath, `${circleName}-${member.id}.jpg`);
      if (fs.existsSync(imagePath)) {
        console.log(`Image already exists for ${member.id}, skipping...`);
        continue;
      }
      
      // Get physical description
      const description = await getPhysicalDescription(`${circleName}-${member.id}`);
      console.log(`Got description for ${member.id}`);

      // Generate image prompt
      const prompt = await generateImagePrompt(description);
      console.log(`Generated prompt for ${member.id}`);

      // Generate and save image
      await generateImage(prompt, `${circleName}-${member.id}`);
      console.log(`Generated image for ${member.id}`);

      // Add delay between members to avoid rate limits
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  } catch (error) {
    console.error(`Error processing circle ${circleName}:`, error);
  }
}

async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('Usage: ts-node generate-member-images.ts <circleName>');
    process.exit(1);
  }

  const circleName = args[0];
  await processCircle(circleName);
}

if (require.main === module) {
  main();
}

module.exports = { processCircle, main };
