import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser, verifyToken } from '@/app/utils/auth';

export async function GET(request: NextRequest) {
  try {
    // First try to get user from cookie (standard web flow)
    let user = await getCurrentUser();
    
    // If no user found via cookie, check Authorization header (mobile app flow)
    if (!user) {
      const authHeader = request.headers.get('Authorization');
      if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.substring(7); // Remove 'Bearer ' prefix
        console.log('Using token from Authorization header:', token.substring(0, 20) + '...');
        
        // Verify the token and get the payload
        const payload = await verifyToken(token);
        if (payload && payload.email) {
          // If token is valid, get the user by email
          const { getUserByEmail } = await import('@/app/utils/auth');
          const userFromToken = await getUserByEmail(payload.email as string);
          
          if (userFromToken) {
            // Create a user object similar to what getCurrentUser returns
            user = {
              id: userFromToken.id,
              email: userFromToken.email,
              firstName: userFromToken.firstName,
              pseudonym: userFromToken.fields?.Pseudonym as string || null,
              isTherapist: userFromToken.fields?.IsTherapist === true || 
                          userFromToken.fields?.IsTherapist === "true" || 
                          userFromToken.fields?.IsTherapist === 1 || 
                          userFromToken.fields?.IsTherapist === "1",
              specialistsAccess: userFromToken.fields?.SpecialistsAccess,
              isAdmin: userFromToken.fields?.IsAdmin === true || 
                      userFromToken.fields?.IsAdmin === "true" || 
                      userFromToken.fields?.IsAdmin === 1 || 
                      userFromToken.fields?.IsAdmin === "1",
              subscription: userFromToken.fields && userFromToken.fields.SubscriptionPlan ? {
                plan: userFromToken.fields.SubscriptionPlan as string,
                status: userFromToken.fields.SubscriptionStatus as string,
                isAnnual: userFromToken.fields.SubscriptionIsAnnual as boolean,
                currentPeriodEnd: userFromToken.fields.SubscriptionCurrentPeriodEnd as number,
              } : null
            };
          }
        }
      }
    }
    
    if (!user) {
      console.log('No authenticated user found via cookie or Authorization header');
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }
    
    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        pseudonym: user.pseudonym || null
      }
    });
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json(
      { error: 'Authentication check failed' },
      { status: 500 }
    );
  }
}
