/**
 * Validation utilities for API routes
 */

import { specialistExists } from '@/app/utils/airtable';

// Cache for specialists to avoid frequent database calls
let specialistsCache: Set<string> = new Set(['generalist', 'welcome']);
let cacheExpiry = 0;
const CACHE_DURATION = 3600000; // 1 hour in milliseconds

/**
 * Validates if a specialist value is valid using a pattern-based approach
 * @param specialist - The specialist value to validate
 * @param includeWelcome - Whether to include 'welcome' as a valid specialist
 * @returns Boolean indicating if the specialist is valid
 */
export function isValidSpecialist(specialist: string, includeWelcome = false): boolean {
  // Special cases that should always be checked explicitly
  if (specialist === 'generalist') return true;
  if (includeWelcome && specialist === 'welcome') return true;
  
  // For all other specialists, use a naming convention check
  // This assumes all valid specialists follow a certain pattern:
  // lowercase, alphanumeric with possible hyphens
  const specialistPattern = /^[a-z0-9-]+$/;
  
  // Additional validation logic if needed
  // For example, you might want to exclude certain words or patterns
  const excludedSpecialists = ['admin', 'test', 'debug'];
  
  return (
    specialistPattern.test(specialist) && 
    !excludedSpecialists.includes(specialist) &&
    specialist.length >= 3 && 
    specialist.length <= 30
  );
}

/**
 * Validates a specialist against the database
 * Use this for more thorough validation when database access is available
 */
export async function isValidSpecialistAsync(specialist: string, includeWelcome = false): Promise<boolean> {
  // Special cases
  if (specialist === 'generalist') return true;
  if (includeWelcome && specialist === 'welcome') return true;
  
  const now = Date.now();
  
  // Check cache first
  if (cacheExpiry > now && specialistsCache.has(specialist)) {
    return true;
  }
  
  // If not in cache, check database
  const exists = await specialistExists(specialist);
  
  // Update cache if it exists
  if (exists) {
    specialistsCache.add(specialist);
    cacheExpiry = now + CACHE_DURATION;
  }
  
  return exists;
}

/**
 * Ensures a pseudonym is URL-safe
 * @param pseudonym - The pseudonym to sanitize
 * @returns A URL-safe version of the pseudonym
 */
export function sanitizePseudonym(pseudonym: string): string {
  // Replace spaces and special characters with underscores
  return pseudonym
    .replace(/[^a-zA-Z0-9]/g, '_')
    .replace(/_+/g, '_') // Replace multiple underscores with a single one
    .replace(/^_|_$/g, ''); // Remove leading/trailing underscores
}

/**
 * Creates a consistent KinId from user information
 * @param options - Object containing user information
 * @returns A URL-safe KinId
 */
export function createKinId(options: {
  pseudonym?: string | null;
  email?: string | null;
  firstName?: string;
  lastName?: string;
  kinId?: string;
}): string {
  const { pseudonym, email, firstName, lastName, kinId } = options;
  
  // Use pseudonym if provided
  if (pseudonym) {
    return sanitizePseudonym(pseudonym);
  }
  
  // Use kinId if provided
  if (kinId) {
    return sanitizePseudonym(kinId);
  }
  
  // Use email if provided
  if (email) {
    return sanitizePseudonym(email.split('@')[0]);
  }
  
  // Use firstName + lastName if provided
  if (firstName && lastName) {
    return sanitizePseudonym(`${firstName}${lastName}`);
  }
  
  // Fallback to a random ID
  return `user_${Date.now()}`;
}

/**
 * Creates a KinOS API URL for a specific blueprint and kin
 * @param options - Object containing URL parameters
 * @returns The constructed API URL
 */
export function createKinOsApiUrl(options: {
  endpoint: string;
  specialist?: string | null;
  kinId: string;
  messageId?: string;
  queryParams?: Record<string, string>;
}): string {
  const { endpoint, specialist = 'generalist', kinId, messageId, queryParams } = options;
  
  // Create the blueprint name based on specialist
  const blueprintName = specialist === 'generalist' ? 'therapykin' : `therapykin${specialist}`;
  
  // Determine the base URL based on environment
  const baseApiUrl = process.env.KINOS_API_URL || 
    (process.env.NODE_ENV === 'development'
      ? 'http://localhost:5000'
      : 'https://api.kinos-engine.ai');
  
  // Construct the URL path with proper encoding for each component
  const encodedBlueprintName = encodeURIComponent(blueprintName);
  const encodedKinId = encodeURIComponent(kinId);
  let url = `${baseApiUrl}/v2/blueprints/${encodedBlueprintName}/kins/${encodedKinId}`;
  
  // Add endpoint (e.g., /messages, /image)
  if (endpoint) {
    const encodedEndpoint = encodeURIComponent(endpoint);
    url += `/${encodedEndpoint}`;
  }
  
  // Add message ID if provided
  if (messageId) {
    const encodedMessageId = encodeURIComponent(messageId);
    url += `/${encodedMessageId}`;
  }
  
  // Add query parameters if provided
  if (queryParams && Object.keys(queryParams).length > 0) {
    const params = new URLSearchParams();
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });
    
    const queryString = params.toString();
    if (queryString) {
      url += `?${queryString}`;
    }
  }
  
  return url;
}
