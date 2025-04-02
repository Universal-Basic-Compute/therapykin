import { NextRequest, NextResponse } from 'next/server';
import { sessionsTable } from '@/app/utils/airtable';
import { getCurrentUser } from '@/app/utils/auth';

// List of adjectives and animals for generating client names
const adjectives = [
  'Brave', 'Calm', 'Clever', 'Curious', 'Determined', 'Eager', 'Friendly', 'Gentle', 
  'Happy', 'Honest', 'Hopeful', 'Joyful', 'Kind', 'Loyal', 'Mindful', 'Optimistic', 
  'Patient', 'Peaceful', 'Playful', 'Polite', 'Proud', 'Quiet', 'Resilient', 'Sincere', 
  'Thoughtful', 'Trustworthy', 'Warm', 'Wise'
];

const animals = [
  'Panda', 'Tiger', 'Dolphin', 'Eagle', 'Fox', 'Koala', 'Lion', 'Owl', 
  'Penguin', 'Wolf', 'Bear', 'Deer', 'Elephant', 'Giraffe', 'Hedgehog', 'Kangaroo', 
  'Leopard', 'Monkey', 'Otter', 'Rabbit', 'Squirrel', 'Turtle', 'Zebra', 'Butterfly',
  'Hummingbird', 'Seahorse', 'Whale', 'Lynx'
];

// Function to generate a consistent name from an email
function generateNameFromEmail(email: string): string {
  // Create a simple hash of the email
  let hash = 0;
  for (let i = 0; i < email.length; i++) {
    hash = ((hash << 5) - hash) + email.charCodeAt(i);
    hash = hash & hash; // Convert to 32bit integer
  }
  
  // Use the hash to select an adjective and animal
  const adjectiveIndex = Math.abs(hash) % adjectives.length;
  const animalIndex = Math.abs(hash >> 8) % animals.length; // Shift the bits to get a different index
  
  return `${adjectives[adjectiveIndex]} ${animals[animalIndex]}`;
}

export async function GET(request: NextRequest) {
  try {
    // Get the current user
    const currentUser = await getCurrentUser();
    
    if (!currentUser) {
      return NextResponse.json(
        { error: 'Not authorized' },
        { status: 403 }
      );
    }

    let isAuthorized = false;

    if (currentUser.isAdmin) {
      isAuthorized = true;
    } else if (currentUser.isTherapist) {
      try {
        const therapistTypes = JSON.parse(currentUser.isTherapist);
        // Check if the user is a herosjourney therapist
        isAuthorized = Array.isArray(therapistTypes) && therapistTypes.includes('herosjourney');
      } catch (error) {
        console.error('Error parsing therapist types:', error);
      }
    }

    if (!isAuthorized) {
      return NextResponse.json(
        { error: 'Not authorized' },
        { status: 403 }
      );
    }
    
    console.log('Fetching therapist dashboard stats');
    
    // Query for all herosjourney sessions
    const records = await sessionsTable.select({
      filterByFormula: "{Specialist} = 'herosjourney'",
      sort: [{ field: 'CreatedAt', direction: 'desc' }]
    }).all();
    
    console.log(`Found ${records.length} herosjourney sessions`);
    
    // Calculate statistics
    const totalClients = new Set();
    let sessionsThisWeek = 0;
    let totalRatings = 0;
    let totalRatingScore = 0;
    
    // Get current date and start of week
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay()); // Start of week (Sunday)
    startOfWeek.setHours(0, 0, 0, 0);
    
    // Recent activity for display
    const recentActivity = [];
    
    records.forEach((record: any) => {
      // Count unique clients
      if (record.fields.Email) {
        totalClients.add(record.fields.Email);
      }
      
      // Count sessions this week
      if (record.fields.CreatedAt) {
        const sessionDate = new Date(record.fields.CreatedAt);
        if (sessionDate >= startOfWeek) {
          sessionsThisWeek++;
        }
      }
      
      // Calculate average rating
      if (record.fields.Rating) {
        totalRatings++;
        totalRatingScore += parseInt(record.fields.Rating);
      }
      
      // Add to recent activity (limit to 4 most recent)
      if (recentActivity.length < 4 && record.fields.CreatedAt) {
        recentActivity.push({
          id: record.id,
          type: record.fields.SessionType || 'session',
          clientId: record.fields.Email ? generateNameFromEmail(record.fields.Email) : 'Unknown Client',
          timestamp: record.fields.CreatedAt,
          minutesActive: record.fields.MinutesActive || 0
        });
      }
    });
    
    // Calculate average rating
    const averageRating = totalRatings > 0 ? (totalRatingScore / totalRatings).toFixed(1) : '0.0';
    
    return NextResponse.json({
      stats: {
        activeClients: totalClients.size,
        sessionsThisWeek,
        clientSatisfaction: averageRating,
        recentActivity
      }
    });
  } catch (error) {
    console.error('Error fetching therapist stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch therapist statistics' },
      { status: 500 }
    );
  }
}
