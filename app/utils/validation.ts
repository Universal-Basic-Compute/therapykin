/**
 * Validation utilities for API routes
 */

// Valid specialist types
export const VALID_SPECIALISTS = [
  'generalist',
  'crypto',
  'athletes',
  'executives',
  'herosjourney',
  'sexologist',
  'welcome'
];

/**
 * Validates if a specialist value is valid
 * @param specialist - The specialist value to validate
 * @param includeWelcome - Whether to include 'welcome' as a valid specialist
 * @returns Boolean indicating if the specialist is valid
 */
export function isValidSpecialist(specialist: string, includeWelcome = false): boolean {
  if (includeWelcome) {
    return VALID_SPECIALISTS.includes(specialist);
  }
  return VALID_SPECIALISTS.filter(s => s !== 'welcome').includes(specialist);
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
 * Creates a consistent project ID from user information
 * @param options - Object containing user information
 * @returns A URL-safe project ID
 */
export function createProjectId(options: {
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
 * Creates a KinOS API URL for a specific blueprint and project
 * @param options - Object containing URL parameters
 * @returns The constructed API URL
 */
export function createKinOsApiUrl(options: {
  endpoint: string;
  specialist?: string | null;
  projectId: string;
  messageId?: string;
  queryParams?: Record<string, string>;
}): string {
  const { endpoint, specialist = 'generalist', projectId, messageId, queryParams } = options;
  
  // Create the blueprint name based on specialist
  const blueprintName = specialist === 'generalist' ? 'therapykin' : `therapykin${specialist}`;
  
  // Determine the base URL based on environment
  const baseApiUrl = process.env.KINOS_API_URL || 
    (process.env.NODE_ENV === 'development'
      ? 'http://localhost:5000'
      : 'https://api.kinos-engine.ai');
  
  // Construct the URL path
  let url = `${baseApiUrl}/v2/blueprints/${blueprintName}/kins/${projectId}`;
  
  // Add endpoint (e.g., /messages, /image)
  if (endpoint) {
    url += `/${endpoint}`;
  }
  
  // Add message ID if provided
  if (messageId) {
    url += `/${messageId}`;
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
