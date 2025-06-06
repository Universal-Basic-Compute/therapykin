// Client-side utility for fetching specialists

/**
 * Interface for specialist data
 */
export interface Specialist {
  id: string;
  name: string;
  description: string;
  sortOrder?: number;
  isActive?: boolean;
}

/**
 * Fetches the list of available specialists from the API
 * @returns Promise resolving to an array of specialist objects
 */
export async function fetchSpecialists(): Promise<Array<Specialist>> {
  try {
    const response = await fetch('/api/specialists');
    if (!response.ok) {
      throw new Error(`Failed to fetch specialists: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Sort specialists by sortOrder if available
    const specialists = data.specialists || [];
    return specialists.sort((a: any, b: any) => {
      // If sortOrder is available, use it
      if (a.sortOrder !== undefined && b.sortOrder !== undefined) {
        return a.sortOrder - b.sortOrder;
      }
      // Otherwise, sort alphabetically by name
      return (a.name || '').localeCompare(b.name || '');
    });
  } catch (error) {
    console.error('Error fetching specialists:', error);
    // Return at least the generalist as a fallback
    return [{ id: 'generalist', name: 'General Therapist', description: 'General therapeutic support for various concerns' }];
  }
}

/**
 * Client-side validation for specialist values
 */
export function isValidSpecialist(specialist: string, includeWelcome = false): boolean {
  // Special cases that should always be checked explicitly
  if (specialist === 'generalist') return true;
  if (includeWelcome && specialist === 'welcome') return true;
  
  // Check using pattern matching
  const specialistPattern = /^[a-z0-9-]+$/;
  const excludedSpecialists = ['admin', 'test', 'debug'];
  
  return (
    specialistPattern.test(specialist) && 
    !excludedSpecialists.includes(specialist) &&
    specialist.length >= 3 && 
    specialist.length <= 30
  );
}

// Cache for specialist descriptions
let specialistsCache: Array<Specialist> | null = null;

/**
 * Get description for a specialist by ID
 */
export async function getSpecialistDescription(specialistId: string): Promise<string> {
  // Try to use cached specialists if available
  if (!specialistsCache) {
    try {
      specialistsCache = await fetchSpecialists();
    } catch (error) {
      console.error('Error fetching specialists for description:', error);
      // Fallback descriptions if fetch fails
      return specialistId === 'generalist' 
        ? 'General therapeutic support for various concerns'
        : 'Specialized therapeutic support';
    }
  }
  
  // Find the specialist in the cache
  const specialist = specialistsCache.find(s => s.id === specialistId);
  
  // Return the description if found, otherwise a generic description
  return specialist?.description || 'Specialized therapeutic support';
}

/**
 * Get description for a specialist by ID (synchronous version)
 */
export function getSpecialistDescriptionSync(specialistId: string): string {
  // If we have cached specialists, use them
  if (specialistsCache) {
    const specialist = specialistsCache.find(s => s.id === specialistId);
    if (specialist?.description) {
      return specialist.description;
    }
  }
  
  // Fallback descriptions if cache not available
  return specialistId === 'generalist' 
    ? 'General therapeutic support for various concerns'
    : 'Specialized therapeutic support';
}
