const fs = require('fs');
const path = require('path');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const KINOS_API_URL = process.env.KINOS_API_URL || 'https://api.kinos.ai';
const KINOS_API_KEY = process.env.KINOS_API_KEY;
const IDEOGRAM_API_KEY = process.env.IDEOGRAM_API_KEY;

interface CircleMember {
  id: string;
  name: string;
  role?: string;
}

async function getPhysicalDescription(kinId: string, blueprint: string = 'therapykinmember'): Promise<string> {
  try {
    const response = await axios.post(
      `${KINOS_API_URL}/v2/blueprints/${blueprint}/kins/${kinId}/analysis`,
      {
        message: "Decide a physical appearance for your persona. Include age, facial features, body type, style of dress, and overall demeanor. Focus on creating a realistic, relatable appearance that matches your therapeutic journey and background. Be specific but natural in your description.",
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
    console.error(`Error getting physical description for ${kinId}:`, error);
    throw error;
  }
}

async function generateImagePrompt(description: string, kinId: string, blueprint: string = 'therapykinmember'): Promise<string> {
  try {
    console.log('\n=== Physical Description ===\n');
    console.log(description);
    console.log('\n=== Generating Image Prompt ===\n');

    const response = await axios.post(
      `${KINOS_API_URL}/v2/blueprints/${blueprint}/kins/${kinId}/analysis`,
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

    console.log('\n=== Generated Prompt ===\n');
    console.log(response.data.response);
    console.log('\n===========================\n');

    return response.data.response;
  } catch (error) {
    console.error('Error generating image prompt:', error);
    throw error;
  }
}

async function generateImage(prompt: string, memberId: string): Promise<void> {
  try {
    // Generate 4 variants
    const response = await axios.post(
      'https://api.ideogram.ai/generate',
      {
        image_request: {
          prompt,
          aspect_ratio: "ASPECT_1_1",
          model: "V_2A",
          magic_prompt_option: "AUTO",
          num_images: 4 // Request 4 images instead of 1
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

    // Download and save all variants
    if (response.data.data && response.data.data.length > 0) {
      for (let i = 0; i < response.data.data.length; i++) {
        const imageUrl = response.data.data[i].url;
        const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        
        // For first image, use original filename, for others add _1, _2, _3
        const suffix = i === 0 ? '' : `_${i}`;
        const imagePath = path.join(dirPath, `${memberId}${suffix}.jpg`);
        
        fs.writeFileSync(imagePath, imageResponse.data);
        console.log(`Image variant ${i} saved for ${memberId}${suffix}`);
      }
    }
  } catch (error) {
    console.error(`Error generating image for ${memberId}:`, error);
    throw error;
  }
}

async function processTherapist(circleName: string, specialist: string = 'generalist') {
  try {
    // Determine the correct blueprint based on the circle name
    let blueprintPath = 'therapykin'; // default for generalist therapists
    if (circleName.startsWith('addiction') || 
        circleName.startsWith('depression') || 
        circleName.startsWith('ptsd') ||
        circleName.startsWith('life-purpose')) {
      blueprintPath = 'therapykinherosjourney';
    }

    const therapistId = `${circleName}-therapist`;
    console.log(`Processing therapist: ${therapistId} with blueprint: ${blueprintPath}`);

    // Check if image already exists
    const dirPath = path.join(process.cwd(), 'public', 'members');
    const imagePath = path.join(dirPath, `${circleName}-therapist.jpg`);
    if (fs.existsSync(imagePath)) {
      console.log(`Image already exists for therapist ${therapistId}, skipping...`);
      return;
    }

    // Get physical description using the correct blueprint
    const description = await getPhysicalDescription(therapistId, blueprintPath);
    console.log(`Got description for therapist ${therapistId}`);

    // Generate image prompt
    const prompt = await generateImagePrompt(description, therapistId, blueprintPath);
    console.log(`Generated prompt for therapist ${therapistId}`);

    // Generate and save image
    await generateImage(prompt, `${circleName}-therapist`);
    console.log(`Generated image for therapist ${therapistId}`);

  } catch (error) {
    console.error(`Error processing therapist for circle ${circleName}:`, error);
  }
}

async function processCircle(circleName: string) {
  try {
    // Read circle data
    const circleDataPath = path.join(process.cwd(), 'app', 'data', 'circles', `${circleName}.json`);
    const circleData = JSON.parse(fs.readFileSync(circleDataPath, 'utf8'));

    // First process the therapist
    await processTherapist(circleName, circleData.specialist || 'generalist');

    // Then process regular members
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
      const prompt = await generateImagePrompt(description, `${circleName}-${member.id}`);
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
  
  // Find the index of --circle flag
  const circleIndex = args.indexOf('--circle');
  
  if (circleIndex === -1 || circleIndex === args.length - 1) {
    console.log('Usage: ts-node generate-member-images.ts --circle <circleName>');
    process.exit(1);
  }

  // Get the circle name that follows the --circle flag
  const circleName = args[circleIndex + 1];
  console.log(`Processing circle: ${circleName}`);
  await processCircle(circleName);
}

if (require.main === module) {
  main();
}

module.exports = { processCircle, main };
