import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { jwtVerify, SignJWT } from 'jose';
import { cookies } from 'next/headers';
import { usersTable } from './airtable';
import { generatePseudonymFromEmail } from './pseudonyms';

// Generate a salt and hash a password
export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return { hashedPassword, salt };
}

// Verify a password against a hash
export async function verifyPassword(password: string, hashedPassword: string) {
  return await bcrypt.compare(password, hashedPassword);
}

// Generate a JWT token
export function generateToken(userId: string, email: string) {
  if (!process.env.JWT_SECRET) {
    console.error('JWT_SECRET is not defined in environment variables');
    throw new Error('JWT_SECRET is not configured');
  }
  
  return jwt.sign(
    { userId, email },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
}

// Verify a JWT token
export async function verifyToken(token: string) {
  if (!process.env.JWT_SECRET) {
    console.error('JWT_SECRET is not defined in environment variables');
    return null;
  }
  
  try {
    // Convert JWT_SECRET to Uint8Array for jose
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (error) {
    console.error('Token verification error:', error);
    return null;
  }
}

// Set auth cookie
export async function setAuthCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set('auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Only use secure in production
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: '/',
    sameSite: 'lax', // Add this for better compatibility
  });
}

// Clear auth cookie
export async function clearAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.delete('auth_token');
}

/**
 * Escapes single quotes in Airtable formula strings to prevent injection
 * @param value - The string value to escape
 * @returns The escaped string
 */
function escapeAirtableString(value: string): string {
  if (!value) return '';
  // Replace single quotes with escaped single quotes
  return value.replace(/'/g, "\\'");
}

// Get user by email
export async function getUserByEmail(email: string) {
  try {
    const escapedEmail = escapeAirtableString(email);
    const records = await usersTable.select({
      filterByFormula: `{Email} = '${escapedEmail}'`,
      maxRecords: 1,
    }).firstPage();
    
    if (records.length === 0) {
      return null;
    }
    
    const user = records[0];
    return {
      id: user.id,
      email: user.fields.Email as string,
      firstName: user.fields.FirstName as string,
      passwordHash: user.fields.PasswordHash as string,
      passwordSalt: user.fields.PasswordSalt as string,
      createdAt: user.fields.CreatedAt as string,
      fields: user.fields // Add this line to include the raw fields
    };
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}

// Create a new user
export async function createUser(userData: {
  email: string;
  firstName: string;
  password: string;
  preferredSpecialist?: string;
  pseudonym?: string;
}) {
  try {
    const { email, firstName, password, preferredSpecialist, pseudonym } = userData;
    
    // Check if user already exists
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }
    
    // Hash the password
    const { hashedPassword, salt } = await hashPassword(password);
    
    // Create the user in Airtable
    const records = await usersTable.create([
      {
        fields: {
          Email: email,
          FirstName: firstName,
          PasswordHash: hashedPassword,
          PasswordSalt: salt,
          CreatedAt: new Date().toISOString(),
          PreferredSpecialist: preferredSpecialist || 'generalist', // Set default specialist preference
          Pseudonym: pseudonym || '', // Add pseudonym if provided
        },
      },
    ]);
    
    const newUser = records[0];
    return {
      id: newUser.id,
      email: newUser.fields.Email as string,
      firstName: newUser.fields.FirstName as string,
    };
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

// Get current user from cookie
export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;
  
  if (!token) {
    return null;
  }
  
  const decoded = await verifyToken(token) as { userId: string; email: string } | null;
  if (!decoded) {
    return null;
  }
  
  const user = await getUserByEmail(decoded.email);
  if (!user) {
    return null;
  }
  
  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    // Generate a pseudonym from email if one doesn't exist in the database
    pseudonym: user.fields?.Pseudonym as string || generatePseudonymFromEmail(user.email).name,
    Pseudonym: user.fields?.Pseudonym as string || generatePseudonymFromEmail(user.email).name, // Add capitalized version for compatibility
    isTherapist: user.fields?.IsTherapist === true || 
                user.fields?.IsTherapist === "true" || 
                user.fields?.IsTherapist === 1 || 
                user.fields?.IsTherapist === "1",
    specialistsAccess: user.fields?.SpecialistsAccess,
    isAdmin: user.fields?.IsAdmin === true || 
             user.fields?.IsAdmin === "true" || 
             user.fields?.IsAdmin === 1 || 
             user.fields?.IsAdmin === "1",
    subscription: user.fields && user.fields.SubscriptionPlan ? {
      plan: user.fields.SubscriptionPlan as string,
      status: user.fields.SubscriptionStatus as string,
      isAnnual: user.fields.SubscriptionIsAnnual as boolean,
      currentPeriodEnd: user.fields.SubscriptionCurrentPeriodEnd as number,
    } : null
  };
}
/**
 * Checks if a user is authorized for a specific specialist role
 * @param user - The user object
 * @param specialistType - The specialist type to check for
 * @returns Boolean indicating if the user is authorized
 */
export function isAuthorizedForSpecialist(user: any, specialistType: string): boolean {
  // Admin users are authorized for all specialist types
  if (isAdmin(user)) {
    return true;
  }
  
  // Check if user is a therapist with access to the specific specialist
  if (user.isTherapist === true || 
      user.isTherapist === "true" || 
      user.isTherapist === 1 || 
      user.isTherapist === "1") {
    
    // If they're a therapist, check their specialists access list
    if (user.specialistsAccess) {
      try {
        // Parse specialists access if it's a JSON string
        const specialistsAccess = typeof user.specialistsAccess === 'string' && 
          user.specialistsAccess.startsWith('[') ? 
          JSON.parse(user.specialistsAccess) : 
          user.specialistsAccess;
        
        // Check if user has access to the requested specialist type
        if (Array.isArray(specialistsAccess)) {
          return specialistsAccess.includes(specialistType);
        } else if (typeof specialistsAccess === 'string') {
          return specialistsAccess === specialistType || specialistsAccess.includes(specialistType);
        } else if (specialistsAccess === true) {
          // If specialistsAccess is true, they have access to all specialists
          return true;
        }
      } catch (error) {
        console.error('Error parsing specialists access:', error);
      }
    } else {
      // If they're a therapist but don't have a specialists access list,
      // default to allowing access to all specialists
      return true;
    }
  }
  
  return false;
}

/**
 * Checks if a user is an admin
 * @param user - The user object
 * @returns Boolean indicating if the user is an admin
 */
export function isAdmin(user: any): boolean {
  return user.isAdmin === true || 
         user.isAdmin === "true" || 
         user.isAdmin === 1 || 
         user.isAdmin === "1";
}
