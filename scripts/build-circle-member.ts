const axios = require('axios');
const dotenv = require('dotenv');

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

interface KinOSError {
  response?: {
    data?: any;
    status?: number;
  };
  message?: string;
}

const initializationMessages = [
  // 1. Initial Build Phase
  `Continue building your identity: Generate Core Identity Elements:
- Age range and basic demographics
- Family structure and background
- Cultural context and influences
- Educational/work background
- Key life experiences that led to therapy
- Current life situation`,

  `Continue building your identity: Establish Therapeutic Context:
- Primary reasons for seeking support
- 2-3 main challenges/struggles
- Current coping mechanisms
- Stage of therapeutic journey
- Growth goals and aspirations`,

  // 2. Initialize Memory Systems
  `Continue building your identity: Initialize Life Story:
- Current state and initial conditions
- Key events timeline
- Basic history background
- Significant life experiences`,

  `Continue building your identity: Initialize Therapeutic Memory:
- Initial therapeutic goals
- Current active challenges
- Basic coping strategies
- Baseline progress state`,

  `Continue building your identity: Initialize Struggles Memory:
- Pattern analysis and recognition
- Coping strategies initialization
- Trigger tracking setup`,

  `Continue building your identity: Initialize Relationships:
- Circle member interactions
- Background relationships
- Support tracking systems`,

  // 3. Personality Development
  `Continue building your identity: Develop Communication Style:
- Baseline emotional expression
- Communication patterns
- Vulnerability comfort level
- Boundary preferences`,

  `Continue building your identity: Establish Therapeutic Presence:
- Initial sharing depth
- Support offering style
- Group participation style`,

  // 4. Mode Configuration
  `Continue building your identity: Configure Interaction Modes:
- Group interaction patterns
- One-on-one interaction style
- Sharing comfort levels
- Personal boundaries`,

  // 5. Final Consistency Check
  `Continue building your identity: Perform Final Verification:
- Life story coherence
- Therapeutic journey consistency
- Personality trait alignment
- Communication pattern verification`
];

interface CreateKinResponse {
  id: string;
  name: string;
  blueprint_id: string;
  created_at: string;
  status: string;
}

async function buildCircleMember(kinId: string, buildIndex: number) {
  try {
    console.log(`Building circle member (iteration ${buildIndex + 1}/${initializationMessages.length})`);
    console.log('Sending message:', initializationMessages[buildIndex]);

    const response = await axios.post(
      `${KINOS_API_URL}/v2/blueprints/therapykinmember/kins/${kinId}/build`,
      {
        message: initializationMessages[buildIndex]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': KINOS_API_KEY
        }
      }
    );

    // Log the full response
    console.log('Full response:', JSON.stringify(response.data, null, 2));

    if (response.data.status !== "completed") {
      throw new Error(`Build failed with status: ${response.data.status}`);
    }

    console.log(`Build iteration ${buildIndex + 1} completed successfully`);
    return response.data;

  } catch (error) {
    const kinError = error as KinOSError;
    console.error('API Error:', kinError.response?.data || kinError.message);
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
    // Create prefixed name to avoid duplicates
    const prefixedName = `${specialization}-${memberName}`;
    console.log(`Creating circle member: ${prefixedName} (${role})`);

    const response = await axios.post(
      `${KINOS_API_URL}/v2/blueprints/therapykinmember/kins`,
      {
        name: prefixedName
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': KINOS_API_KEY
        }
      }
    );

    // The Kin ID is the same as the prefixed name we sent
    const kinId = prefixedName;
    console.log(`Successfully created Kin with ID: ${kinId}`);

    // Step 2: Build the Kin's identity through all initialization messages
    console.log('Starting build iterations...');
    for (let i = 0; i < initializationMessages.length; i++) {
      await buildCircleMember(kinId, i);
      // Add a small delay between builds to prevent rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    console.log('Completed all build iterations successfully');

    return kinId;

  } catch (error) {
    const kinError = error as KinOSError;
    console.error('API Error:', kinError.response?.data || kinError.message);
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

module.exports = { createCircleMember };
