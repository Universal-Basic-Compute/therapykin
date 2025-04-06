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
