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
  // Handle null or undefined input
  if (!specialist) return false;
  
  // Normalize the specialist string
  const normalizedSpecialist = specialist.trim().toLowerCase();
  
  // Special cases that should always be checked explicitly
  if (normalizedSpecialist === 'generalist') return true;
  if (includeWelcome && normalizedSpecialist === 'welcome') return true;
  
  // For all other specialists, use a naming convention check
  // This assumes all valid specialists follow a certain pattern:
  // lowercase, alphanumeric with possible hyphens
  const specialistPattern = /^[a-z0-9-]+$/;
  
  // Additional validation logic if needed
  // For example, you might want to exclude certain words or patterns
  const excludedSpecialists = ['admin', 'test', 'debug', 'undefined', 'null'];
  
  // Log the validation process for debugging
  console.log(`Validating specialist: ${normalizedSpecialist}`);
  console.log(`Pattern test: ${specialistPattern.test(normalizedSpecialist)}`);
  console.log(`Not excluded: ${!excludedSpecialists.includes(normalizedSpecialist)}`);
  console.log(`Length check: ${normalizedSpecialist.length >= 3 && normalizedSpecialist.length <= 30}`);
  
  return (
    specialistPattern.test(normalizedSpecialist) && 
    !excludedSpecialists.includes(normalizedSpecialist) &&
    normalizedSpecialist.length >= 3 && 
    normalizedSpecialist.length <= 30
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
  if (!pseudonym) return 'anonymous_user';
  
  // Convert to lowercase for consistency
  const lowercased = pseudonym.toLowerCase();
  
  // Replace spaces and special characters with underscores
  const sanitized = lowercased
    .replace(/[^a-z0-9]/g, '_') // Only allow lowercase letters and numbers
    .replace(/_+/g, '_') // Replace multiple underscores with a single one
    .replace(/^_|_$/g, ''); // Remove leading/trailing underscores
  
  // If sanitization removed everything, return a default
  if (!sanitized) return 'anonymous_user';
  
  // Ensure the result is not too long (max 50 chars)
  return sanitized.substring(0, 50);
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
  kinId?: string;
}): string {
  const { pseudonym, email, firstName, kinId } = options;
  
  // Use pseudonym directly if provided and not empty
  if (pseudonym && pseudonym.trim()) {
    return pseudonym.trim(); // Don't sanitize if it's already a pseudonym
  }
  
  // Use kinId if provided and not empty
  if (kinId && kinId.trim()) {
    return kinId.trim(); // Don't sanitize if it's already a kinId
  }
  
  // Use email if provided and not empty
  if (email && email.trim()) {
    // Extract username part before @ and sanitize
    const emailParts = email.split('@');
    if (emailParts.length > 0 && emailParts[0].trim()) {
      return sanitizePseudonym(emailParts[0]);
    }
  }
  
  // Use just firstName if provided and not empty
  if (firstName && firstName.trim()) {
    return sanitizePseudonym(`${firstName}_user`);
  }
  
  // Fallback to a random ID with timestamp for uniqueness
  return `user_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;
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
  const { endpoint, specialist, kinId, messageId, queryParams } = options;
  
  // Validate inputs
  if (!kinId) {
    throw new Error('kinId is required for createKinOsApiUrl');
  }
  
  // Validate and normalize specialist
  const validatedSpecialist = specialist && isValidSpecialist(specialist) ? specialist : 'generalist';
  
  // Create the blueprint name based on specialist
  let blueprintName;
  if (validatedSpecialist === 'codeguardian') {
    // Special case: don't add therapykin prefix for codeguardian
    blueprintName = 'codeguardian';
  } else if (validatedSpecialist === 'generalist') {
    blueprintName = 'therapykin';
  } else {
    blueprintName = `therapykin${validatedSpecialist}`;
  }
  
  console.log(`Creating KinOS API URL with blueprint: ${blueprintName} for specialist: ${validatedSpecialist}`);
  
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
    
    // Filter out null/undefined values and encode properly
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value !== null && value !== undefined && String(value).trim() !== '') {
        params.append(key, String(value).trim());
      }
    });
    
    const queryString = params.toString();
    if (queryString) {
      url += `?${queryString}`;
    }
  }
  
  return url;
}
