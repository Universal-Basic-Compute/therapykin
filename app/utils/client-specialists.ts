// Client-side utility for fetching specialists

/**
 * Fetches the list of available specialists from the API
 */
export async function fetchSpecialists() {
  try {
    const response = await fetch('/api/specialists');
    if (!response.ok) {
      throw new Error(`Failed to fetch specialists: ${response.status}`);
    }
    
    const data = await response.json();
    return data.specialists || [];
  } catch (error) {
    console.error('Error fetching specialists:', error);
    // Return at least the generalist as a fallback
    return [{ id: 'generalist', name: 'General Therapist', description: '' }];
  }
}

/**
 * Client-side validation for specialist values
 */
export function isValidSpecialist(specialist: string, includeWelcome = false): boolean {
  // Special cases that should always be checked explicitly
  if (specialist === 'generalist') return true;
  if (includeWelcome && specialist === 'welcome') return true;
  
  // For all other specialists, use a naming convention check
  const specialistPattern = /^[a-z0-9-]+$/;
  const excludedSpecialists = ['admin', 'test', 'debug'];
  
  return (
    specialistPattern.test(specialist) && 
    !excludedSpecialists.includes(specialist) &&
    specialist.length >= 3 && 
    specialist.length <= 30
  );
}
