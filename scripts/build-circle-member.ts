const fs = require('fs');
const path = require('path');
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

const therapistInitializationMessages = [
  // 1. Choose Therapeutic Identity
  `Continue building your identity: Define Core Therapeutic Identity:
- Select and detail your core specialty
- Define your theoretical orientation
- Establish your years of experience and background
- Create formative experiences that led to specialization`,

  // 2. Build Personal History
  `Continue building your identity: Develop Personal History:
- Detail your own struggles related to your specialty
- Create your recovery/growth journey
- Add family/relationship background
- Include cultural/socioeconomic influences`,

  // 3. Add Professional Challenges
  `Continue building your identity: Define Professional Challenges:
- Past clinical mistakes and learning experiences
- Difficult cases that shaped your approach
- Professional burnout experiences
- Ethical dilemmas faced and resolved`,

  // 4. Create Communication Style
  `Continue building your identity: Establish Communication Style:
- Develop unique verbal patterns
- Add specialty-specific metaphors
- Include natural speech imperfections
- Build emotional expression style`,

  // 5. Define Therapeutic Weaknesses
  `Continue building your identity: Acknowledge Therapeutic Weaknesses:
- Add blind spots in specialty area
- Create specific triggers/sensitivities
- Include biases to work through
- Add areas of continued growth`,

  // 6. Establish Relationship Style
  `Continue building your identity: Define Relationship Style:
- Define attachment patterns
- Create boundary setting style
- Add group dynamic preferences
- Build conflict management approach`,

  // 7. Add Life Complications
  `Continue building your identity: Include Life Complications:
- Current personal challenges
- Ongoing growth areas
- Work-life balance struggles
- Personal relationship dynamics`,

  // 8. Create Support Network
  `Continue building your identity: Build Support Network:
- Build mentor relationships
- Add peer supervision group
- Create professional connections
- Include personal support system`,

  // 9. Define Growth Journey
  `Continue building your identity: Establish Growth Journey:
- Add current learning goals
- Create professional development path
- Include supervision experiences
- Build self-care practices`,

  // 10. Establish Circle Role
  `Continue building your identity: Define Circle Role:
- Define group facilitation style
- Create peer support approach
- Add specialty contributions
- Build member interaction patterns`
];

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

async function buildCircleMember(kinId: string, buildIndex: number, isTherapist: boolean = false, memberName?: string, memberRole?: string) {
  try {
    const messages = isTherapist ? therapistInitializationMessages : initializationMessages;
    console.log(`Building ${isTherapist ? 'therapist' : 'circle member'} (iteration ${buildIndex + 1}/${messages.length})`);
    console.log('Sending message:', messages[buildIndex]);

    // Determine the correct blueprint path
    let blueprintPath;
    if (isTherapist) {
      // For therapists, use either herosjourney or generalist blueprint
      if (kinId.includes('-therapist') && (
        kinId.startsWith('addiction-') || 
        kinId.startsWith('depression-') || 
        kinId.startsWith('ptsd-') ||
        kinId.startsWith('life-purpose-')
      )) {
        blueprintPath = 'therapykinherosjourney';
      } else {
        blueprintPath = 'therapykin';  // For generalist therapists
      }
    } else {
      blueprintPath = 'therapykinmember';  // For regular members
    }

    console.log(`Using blueprint: ${blueprintPath} for ${isTherapist ? 'therapist' : 'member'} ${kinId}`);

    const response = await axios.post(
      `${KINOS_API_URL}/v2/blueprints/${blueprintPath}/kins/${kinId}/build`,
      {
        message: messages[buildIndex],
        addSystem: memberName && memberRole ? `You are ${memberName}, ${memberRole}` : undefined
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

async function getKinCommitHistory(kinId: string) {
  try {
    console.log(`Fetching commit history for kin: ${kinId}`);
    
    // Determine the correct blueprint path based on the kinId
    let blueprintPath = 'therapykinmember';
    if (kinId.endsWith('-therapist')) {
      // Check if it's a herosjourney specialist circle
      if (kinId.startsWith('addiction-') || 
          kinId.startsWith('depression-') || 
          kinId.startsWith('ptsd-') ||
          kinId.startsWith('life-purpose-')) {
        blueprintPath = 'therapykinherosjourney';
      } else {
        blueprintPath = 'therapykin';
      }
    }
    
    const response = await axios.get(
      `${KINOS_API_URL}/v2/blueprints/${blueprintPath}/kins/${kinId}/commit-history`,
      {
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': KINOS_API_KEY
        }
      }
    );

    console.log('\nCommit History:');
    if (response.data.commits && response.data.commits.length > 0) {
      response.data.commits.forEach((commit: { message: string }, index: number) => {
        console.log(`${index + 1}. ${commit.message}`);
      });
      console.log(`Total commits: ${response.data.total}`);
    } else {
      console.log('No commits found');
    }

  } catch (error) {
    const kinError = error as KinOSError;
    console.error('Error fetching commit history:', kinError.response?.data || kinError.message);
  }
}

async function buildCircleTherapist(circleName: string, specialist: string) {
  try {
    const therapistId = `${circleName}-therapist`;
    console.log(`Creating therapist: ${therapistId} with specialist ${specialist}`);

    // Create the Kin in the therapist blueprint
    const response = await axios.post(
      `${KINOS_API_URL}/v2/blueprints/therapykin${specialist}/kins`,
      {
        name: therapistId
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': KINOS_API_KEY
        }
      }
    );

    console.log(`Successfully created Therapist with ID: ${therapistId}`);

    // Build the therapist's identity using therapist-specific messages
    for (let i = 0; i < therapistInitializationMessages.length; i++) {
      await buildCircleMember(therapistId, i, true); // Add isTherapist flag
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    // Get commit history
    await getKinCommitHistory(therapistId);

    return therapistId;
  } catch (error) {
    const kinError = error as KinOSError;
    console.error('API Error:', kinError.response?.data || kinError.message);
    throw error;
  }
}

// Add interface for circle member
interface CircleMember {
  id: string;
  name: string;
  role?: string;
  weeksAtStart?: number;
}

async function createCircleMember(
  memberId: string,
  role: string,
  weeksAtStart: number,
  specialization: string
) {
  try {
    // Create prefixed name using id
    const prefixedId = `${specialization}-${memberId}`;
    console.log(`Creating circle member: ${prefixedId} (${role})`);

    const response = await axios.post(
      `${KINOS_API_URL}/v2/blueprints/therapykinmember/kins`,
      {
        name: prefixedId
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': KINOS_API_KEY
        }
      }
    );

    // The Kin ID is the same as the prefixed id we sent
    const kinId = prefixedId;
    console.log(`Successfully created Kin with ID: ${kinId}`);

    // Step 2: Build the Kin's identity through all initialization messages
    console.log('Starting build iterations...');
    for (let i = 0; i < initializationMessages.length; i++) {
      await buildCircleMember(kinId, i, false, memberId, role);
      // Add a small delay between builds to prevent rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    console.log('Completed all build iterations successfully');

    // After all builds are complete, get the commit history
    console.log('\nFetching commit history...');
    await getKinCommitHistory(kinId);

    return kinId;

  } catch (error) {
    const kinError = error as KinOSError;
    console.error('API Error:', kinError.response?.data || kinError.message);
    throw error;
  }
}

async function buildAllCircleMembers(circleName: string) {
  try {
    // Read the circle data
    const circleDataPath = path.join(process.cwd(), 'app', 'data', 'circles', `${circleName}.json`);
    const circleData = JSON.parse(fs.readFileSync(circleDataPath, 'utf8'));

    console.log(`Building all members for circle: ${circleName}`);

    // First build the therapist
    await buildCircleTherapist(circleName, circleData.specialist || 'generalist');

    // Get all non-empty members
    const membersToProcess = circleData.members.filter((member: CircleMember) => member.id !== 'empty');

    // Process members in batches of 3
    for (let i = 0; i < membersToProcess.length; i += 3) {
      const batch = membersToProcess.slice(i, i + 3);
      console.log(`Processing batch ${Math.floor(i/3) + 1} of ${Math.ceil(membersToProcess.length/3)}`);

      // Process each member in the current batch concurrently
      await Promise.all(batch.map((member: CircleMember) => 
        createCircleMember(
          member.id,
          member.role || '',
          member.weeksAtStart || 0,
          circleName
        )
      ));

      // Add a delay between batches
      if (i + 3 < membersToProcess.length) {
        console.log('Waiting between batches...');
        await new Promise(resolve => setTimeout(resolve, 5000)); // 5 second delay between batches
      }
    }

    console.log(`Completed building all members for ${circleName} circle`);
  } catch (error) {
    console.error('Failed to build circle members:', error);
    throw error;
  }
}

// Function to build all circles
async function buildAllCircles() {
  try {
    // Get all JSON files from the circles directory
    const circlesDirectory = path.join(process.cwd(), 'app/data/circles');
    const circleFiles = fs.readdirSync(circlesDirectory)
      .filter((file: string) => file.endsWith('.json'));

    console.log(`Found ${circleFiles.length} circles to build`);

    // Process each circle
    for (const circleFile of circleFiles) {
      const circleName = circleFile.replace('.json', '');
      console.log(`\nProcessing circle: ${circleName}`);
      
      try {
        await buildAllCircleMembers(circleName);
        console.log(`Successfully built all members for ${circleName}`);
      } catch (error) {
        console.error(`Error building circle ${circleName}:`, error);
        // Continue with next circle even if one fails
      }

      // Add a delay between circles
      await new Promise(resolve => setTimeout(resolve, 10000)); // 10 second delay between circles
    }

    console.log('\nCompleted building all circles');
  } catch (error) {
    console.error('Failed to build all circles:', error);
    throw error;
  }
}

// Modify main to handle both single member and full circle builds
async function buildCircleMembers() {
  const args = process.argv.slice(2);
  
  if (args[0] === '--all') {
    // Build all circles
    try {
      await buildAllCircles();
    } catch (error) {
      console.error('Failed to build all circles:', error);
      process.exit(1);
    }
  } else if (args[0] === '--circle') {
    // Build all members of a circle
    if (args.length < 2) {
      console.log('Usage: ts-node build-circle-members.ts --circle <circleName>');
      process.exit(1);
    }
    const circleName = args[1];
    try {
      await buildAllCircleMembers(circleName);
    } catch (error) {
      console.error('Failed to build circle:', error);
      process.exit(1);
    }
  } else {
    // Build single member
    if (args.length < 4) {
      console.log('Usage: ts-node build-circle-members.ts <memberName> <role> <weeksAtStart> <specialization>\n' +
                 '   or: ts-node build-circle-members.ts --circle <circleName>\n' +
                 '   or: ts-node build-circle-members.ts --all');
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
}

if (require.main === module) {
  buildCircleMembers();
}

module.exports = { createCircleMember, buildAllCircleMembers, buildCircleMembers };
