import { NextRequest, NextResponse } from 'next/server';
import { sessionsTable } from '@/app/utils/airtable';
import { getCurrentUser } from '@/app/utils/auth';

// List of adjectives and animals for generating client names
const adjectives = [
  'Brave', 'Calm', 'Clever', 'Curious', 'Determined', 'Eager', 'Friendly', 'Gentle', 
  'Happy', 'Honest', 'Hopeful', 'Joyful', 'Kind', 'Loyal', 'Mindful', 'Optimistic', 
  'Patient', 'Peaceful', 'Playful', 'Polite', 'Proud', 'Quiet', 'Resilient', 'Sincere', 
  'Thoughtful', 'Trustworthy', 'Warm', 'Wise', 'Adventurous', 'Artistic', 'Balanced',
  'Bright', 'Caring', 'Cheerful', 'Creative', 'Daring', 'Delightful', 'Diligent',
  'Elegant', 'Energetic', 'Enthusiastic', 'Faithful', 'Fearless', 'Generous', 'Graceful',
  'Grateful', 'Harmonious', 'Helpful', 'Imaginative', 'Inspiring', 'Intuitive', 'Inventive',
  'Lively', 'Loving', 'Magnificent', 'Majestic', 'Motivated', 'Noble', 'Nurturing',
  'Passionate', 'Persistent', 'Radiant', 'Respectful', 'Serene', 'Spirited', 'Steadfast',
  'Tenacious', 'Thankful', 'Vibrant', 'Vigilant', 'Visionary', 'Vivacious', 'Whimsical',
  'Witty', 'Wonderful', 'Zestful'
];

const animals = [
  'Panda', 'Tiger', 'Dolphin', 'Eagle', 'Fox', 'Koala', 'Lion', 'Owl', 
  'Penguin', 'Wolf', 'Bear', 'Deer', 'Elephant', 'Giraffe', 'Hedgehog', 'Kangaroo', 
  'Leopard', 'Monkey', 'Otter', 'Rabbit', 'Squirrel', 'Turtle', 'Zebra', 'Butterfly',
  'Hummingbird', 'Seahorse', 'Whale', 'Lynx', 'Alpaca', 'Badger', 'Cheetah', 'Dragonfly',
  'Falcon', 'Gazelle', 'Hawk', 'Ibis', 'Jaguar', 'Kiwi', 'Lemur', 'Meerkat',
  'Narwhal', 'Octopus', 'Panther', 'Quokka', 'Raccoon', 'Salamander', 'Toucan', 'Unicorn',
  'Vulture', 'Walrus', 'Xerus', 'Yak', 'Antelope', 'Bison', 'Chameleon', 'Dingo',
  'Ermine', 'Flamingo', 'Gorilla', 'Hippo', 'Iguana', 'Jellyfish', 'Kingfisher', 'Lobster',
  'Manatee', 'Nightingale', 'Ocelot', 'Peacock', 'Quail', 'Reindeer', 'Starfish', 'Tapir',
  'Uakari', 'Viper', 'Wombat', 'Xerus', 'Yellowjacket', 'Zebu'
];

// Define a list of readable colors for the names
const nameColors = [
  '#4B0082', // Indigo
  '#008080', // Teal
  '#800000', // Maroon
  '#4682B4', // Steel Blue
  '#2E8B57', // Sea Green
  '#8B4513', // Saddle Brown
  '#483D8B', // Dark Slate Blue
  '#CD5C5C', // Indian Red
  '#6B8E23', // Olive Drab
  '#BC8F8F', // Rosy Brown
  '#5F9EA0', // Cadet Blue
  '#9932CC', // Dark Orchid
  '#8FBC8F', // Dark Sea Green
  '#E9967A', // Dark Salmon
  '#9370DB', // Medium Purple
  '#3CB371', // Medium Sea Green
  '#B8860B', // Dark Goldenrod
  '#7B68EE', // Medium Slate Blue
  '#6A5ACD', // Slate Blue
  '#2F4F4F', // Dark Slate Gray
  '#228B22', // Forest Green
  '#00CED1', // Dark Turquoise
  '#FF6347', // Tomato
  '#8A2BE2', // Blue Violet
  '#20B2AA', // Light Sea Green
  '#B22222', // Firebrick
  '#DAA520', // Goldenrod
  '#7F0000', // Burgundy
  '#006400', // Dark Green
  '#800080', // Purple
  '#0000CD', // Medium Blue
  '#8B0000', // Dark Red
  '#556B2F', // Dark Olive Green
  '#FF4500', // Orange Red
  '#1E90FF', // Dodger Blue
  '#191970', // Midnight Blue
  '#32CD32', // Lime Green
  '#FF8C00', // Dark Orange
  '#8B008B', // Dark Magenta
  '#008000'  // Green
];

// Function to generate a consistent name from an email
function generateNameFromEmail(email: string): { name: string; color: string } {
  // Create a simple hash of the email
  let hash = 0;
  for (let i = 0; i < email.length; i++) {
    hash = ((hash << 5) - hash) + email.charCodeAt(i);
    hash = hash & hash; // Convert to 32bit integer
  }
  
  // Use the hash to select an adjective and animal
  const adjectiveIndex = Math.abs(hash) % adjectives.length;
  const animalIndex = Math.abs(hash >> 8) % animals.length; // Shift the bits to get a different index
  const colorIndex = Math.abs(hash >> 16) % nameColors.length; // Shift more bits for color
  
  return {
    name: `${adjectives[adjectiveIndex]} ${animals[animalIndex]}`,
    color: nameColors[colorIndex]
  };
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

    if ((currentUser as any).isAdmin || currentUser.email === 'nlr@universalbasiccompute.ai' || currentUser.email === 'theherosjourneyteam@gmail.com') {
      isAuthorized = true;
    } else if ((currentUser as any).isTherapist) {
      try {
        const therapistTypes = JSON.parse((currentUser as any).isTherapist);
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
    const recentActivity: Array<{
      id: string;
      type: string;
      clientId: string;
      clientColor: string;
      timestamp: string;
      minutesActive: number;
    }> = [];
    
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
        const clientIdentifier = record.fields.Email 
          ? generateNameFromEmail(record.fields.Email) 
          : { name: 'Unknown Client', color: '#666666' };
        
        recentActivity.push({
          id: record.id,
          type: record.fields.SessionType || 'session',
          clientId: clientIdentifier.name,
          clientColor: clientIdentifier.color,
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
