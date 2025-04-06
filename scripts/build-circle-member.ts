import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const KINOS_API_URL = process.env.KINOS_API_URL || 'https://api.kinos.ai';
const KINOS_API_KEY = process.env.KINOS_API_KEY;

interface CreateKinResponse {
  id: string;
  name: string;
  blueprint_id: string;
  created_at: string;
  status: string;
}

async function buildCircleMember(kinId: string, buildIndex: number) {
  try {
    console.log(`Building circle member (iteration ${buildIndex + 1}/10)`);

    const response = await axios.post(
      `${KINOS_API_URL}/v2/blueprints/therapykinmember/kins/${kinId}/build`,
      {
        message: "continue building your identity"
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': KINOS_API_KEY
        }
      }
    );

    if (response.data.status !== "completed") {
      throw new Error(`Build failed with status: ${response.data.status}`);
    }

    console.log(`Build iteration ${buildIndex + 1} completed successfully`);
    return response.data;

  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('API Error:', error.response?.data || error.message);
    } else {
      console.error('Error:', error);
    }
    throw error;
  }
}

async function createCircleMember(
  memberName: string,
  role: string,
  weeksAtStart: number,
  specialization: string
) {
  try {
    console.log(`Creating circle member: ${memberName} (${role})`);

    // Step 1: Create the Kin in the therapykinmember blueprint
    const createKinResponse = await axios.post<CreateKinResponse>(
      `${KINOS_API_URL}/v2/blueprints/therapykinmember/kins`,
      {
        name: memberName
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': KINOS_API_KEY
        }
      }
    );

    if (!createKinResponse.data.id) {
      throw new Error('Failed to get Kin ID from creation response');
    }

    const kinId = createKinResponse.data.id;
    console.log(`Successfully created Kin with ID: ${kinId}`);

    // Step 2: Build the Kin's identity through 10 iterations
    console.log('Starting build iterations...');
    for (let i = 0; i < 10; i++) {
      await buildCircleMember(kinId, i);
      // Add a small delay between builds to prevent rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    console.log('Completed all build iterations successfully');

    return kinId;

  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('API Error:', error.response?.data || error.message);
    } else {
      console.error('Error:', error);
    }
    throw error;
  }
}

// Example usage
async function main() {
  const args = process.argv.slice(2);
  if (args.length < 4) {
    console.log('Usage: ts-node build-circle-member.ts <memberName> <role> <weeksAtStart> <specialization>');
    process.exit(1);
  }

  const [memberName, role, weeksAtStart, specialization] = args;

  try {
    await createCircleMember(
      memberName,
      role,
      parseInt(weeksAtStart),
      specialization
    );
  } catch (error) {
    console.error('Failed to create circle member:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

export { createCircleMember };
