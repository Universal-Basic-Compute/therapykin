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
  'Witty', 'Wonderful', 'Zestful',
  // Additional adjectives to expand the list
  'Adaptable', 'Affectionate', 'Agreeable', 'Amiable', 'Amused', 'Appreciative', 'Attentive', 'Authentic',
  'Benevolent', 'Blissful', 'Bold', 'Brilliant', 'Candid', 'Capable', 'Captivating', 'Centered',
  'Charismatic', 'Charming', 'Compassionate', 'Confident', 'Considerate', 'Courageous', 'Courteous', 'Dazzling',
  'Dedicated', 'Dependable', 'Diplomatic', 'Dynamic', 'Easygoing', 'Effervescent', 'Efficient', 'Elated',
  'Eloquent', 'Empathetic', 'Enchanting', 'Encouraging', 'Endearing', 'Engaged', 'Enlightened', 'Exuberant',
  'Fascinating', 'Flourishing', 'Focused', 'Forgiving', 'Fortuitous', 'Friendly', 'Fulfilled', 'Genuine',
  'Glowing', 'Good-natured', 'Grounded', 'Hardworking', 'Healthy', 'Heartfelt', 'Humorous', 'Idealistic',
  'Illuminated', 'Innovative', 'Insightful', 'Intelligent', 'Jubilant', 'Keen', 'Lighthearted', 'Lucid',
  'Luminous', 'Marvelous', 'Meditative', 'Mellow', 'Methodical', 'Meticulous', 'Moderate', 'Modest'
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
  'Uakari', 'Viper', 'Wombat', 'Xerus', 'Yellowjacket', 'Zebu',
  // Additional animals to expand the list
  'Aardvark', 'Albatross', 'Alligator', 'Armadillo', 'Axolotl', 'Baboon', 'Barracuda', 'Beaver',
  'Beetle', 'Beluga', 'Bumblebee', 'Camel', 'Capybara', 'Cardinal', 'Caribou', 'Cassowary',
  'Caterpillar', 'Centipede', 'Chinchilla', 'Chipmunk', 'Cicada', 'Cobra', 'Cockatoo', 'Condor',
  'Cormorant', 'Coyote', 'Cricket', 'Crocodile', 'Crow', 'Cuttlefish', 'Dodo', 'Dove',
  'Dragon', 'Duck', 'Echidna', 'Eel', 'Ferret', 'Finch', 'Firefly', 'Flounder',
  'Frog', 'Gerbil', 'Gibbon', 'Gopher', 'Grasshopper', 'Griffin', 'Hamster', 'Hare',
  'Heron', 'Herring', 'Hornet', 'Horse', 'Hummingbird', 'Hyena', 'Impala', 'Jackal',
  'Jay', 'Katydid', 'Komodo', 'Ladybug', 'Lamprey', 'Lark', 'Llama', 'Loris',
  'Magpie', 'Mallard', 'Mammoth', 'Mantis', 'Marlin', 'Marmot', 'Mink', 'Mockingbird'
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

/**
 * Generates a consistent pseudonym and color from an email address
 * @param email The email address to generate a pseudonym from
 * @returns An object containing the pseudonym name and color
 */
function generatePseudonymFromEmail(email) {
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
  
  // Generate a 2-digit number from the hash for additional uniqueness
  const number = Math.abs(hash >> 24) % 100;
  
  return {
    name: `${adjectives[adjectiveIndex]} ${animals[animalIndex]} ${number}`,
    color: nameColors[colorIndex]
  };
}

module.exports = { generatePseudonymFromEmail };
