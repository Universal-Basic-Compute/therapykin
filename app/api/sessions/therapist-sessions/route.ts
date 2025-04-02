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
        // If parsing fails, check if it's a string that contains "herosjourney"
        if (typeof (currentUser as any).isTherapist === 'string' && (currentUser as any).isTherapist.includes('herosjourney')) {
          isAuthorized = true;
        }
      }
    }

    if (!isAuthorized) {
      return NextResponse.json(
        { error: 'Not authorized' },
        { status: 403 }
      );
    }
    
    console.log('Fetching therapist session data');
    
    // Query for all herosjourney sessions
    const records = await sessionsTable.select({
      filterByFormula: "{Specialist} = 'herosjourney'",
      sort: [{ field: 'CreatedAt', direction: 'desc' }]
    }).all();
    
    console.log(`Found ${records.length} herosjourney sessions`);
    
    // Process records to get session data
    const now = new Date();
    const pastSessions: Array<{
      id: string;
      clientId: string;
      clientColor: string;
      timestamp: string;
      minutesActive: number;
      rating: number | null;
    }> = [];
    
    // Get the 10 most recent sessions
    records.forEach((record: any) => {
      if (!record.fields.CreatedAt || !record.fields.Email) return;
      
      const sessionDate = new Date(record.fields.CreatedAt);
      const clientIdentifier = generateNameFromEmail(record.fields.Email);
      const minutesActive = record.fields.MinutesActive || 0;
      
      // Only include completed sessions (in the past)
      if (sessionDate < now) {
        pastSessions.push({
          id: record.id,
          clientId: clientIdentifier.name,
          clientColor: clientIdentifier.color,
          timestamp: record.fields.CreatedAt,
          minutesActive: minutesActive,
          rating: record.fields.Rating || null
        });
        
        // Limit to 10 past sessions
        if (pastSessions.length >= 10) {
          return;
        }
      }
    });
    
    return NextResponse.json({
      sessions: {
        pastSessions
      }
    });
  } catch (error) {
    console.error('Error fetching therapist session data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch therapist session data' },
      { status: 500 }
    );
  }
}
