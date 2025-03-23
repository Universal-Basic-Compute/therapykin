import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { jwtVerify, SignJWT } from 'jose';
import { cookies } from 'next/headers';
import { usersTable } from './airtable';

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

// Get user by email
export async function getUserByEmail(email: string) {
  try {
    const records = await usersTable.select({
      filterByFormula: `{Email} = '${email}'`,
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
      lastName: user.fields.LastName as string,
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
  lastName: string;
  password: string;
}) {
  try {
    const { email, firstName, lastName, password } = userData;
    
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
          LastName: lastName,
          PasswordHash: hashedPassword,
          PasswordSalt: salt,
          CreatedAt: new Date().toISOString(),
        },
      },
    ]);
    
    const newUser = records[0];
    return {
      id: newUser.id,
      email: newUser.fields.Email as string,
      firstName: newUser.fields.FirstName as string,
      lastName: newUser.fields.LastName as string,
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
    lastName: user.lastName,
    subscription: user.fields && user.fields.SubscriptionPlan ? {
      plan: user.fields.SubscriptionPlan as string,
      status: user.fields.SubscriptionStatus as string,
      isAnnual: user.fields.SubscriptionIsAnnual as boolean,
      currentPeriodEnd: user.fields.SubscriptionCurrentPeriodEnd as number,
    } : null
  };
}
