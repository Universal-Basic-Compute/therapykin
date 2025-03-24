import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const messageId = searchParams.get('messageId');
    const firstName = searchParams.get('firstName');
    const lastName = searchParams.get('lastName');
    const specialist = searchParams.get('specialist') || 'generalist'; // Get specialist parameter with default
    
    if (!messageId || !firstName || !lastName) {
      return NextResponse.json(
        { error: 'Missing required parameters: messageId, firstName, lastName' },
        { status: 400 }
      );
    }
    
    const projectId = `${firstName}${lastName}`;
    
    // Determine the base URL based on environment and specialist
    let baseUrl;
    
    // Use different project path based on specialist type
    if (specialist === 'crypto') {
      // For crypto specialist
      baseUrl = process.env.KINOS_API_URL 
        ? `${process.env.KINOS_API_URL}/projects/therapykincrypto/${projectId}/messages/${messageId}`
        : process.env.NODE_ENV === 'development'
          ? `http://localhost:5000/projects/therapykincrypto/${projectId}/messages/${messageId}`
          : `https://api.kinos-engine.ai/projects/therapykincrypto/${projectId}/messages/${messageId}`;
    } else if (specialist === 'athletes') {
      // For athletes specialist
      baseUrl = process.env.KINOS_API_URL 
        ? `${process.env.KINOS_API_URL}/projects/therapykinathletes/${projectId}/messages/${messageId}`
        : process.env.NODE_ENV === 'development'
          ? `http://localhost:5000/projects/therapykinathletes/${projectId}/messages/${messageId}`
          : `https://api.kinos-engine.ai/projects/therapykinathletes/${projectId}/messages/${messageId}`;
    } else if (specialist === 'executives') {
      // For executives specialist
      baseUrl = process.env.KINOS_API_URL 
        ? `${process.env.KINOS_API_URL}/projects/therapykinexecutives/${projectId}/messages/${messageId}`
        : process.env.NODE_ENV === 'development'
          ? `http://localhost:5000/projects/therapykinexecutives/${projectId}/messages/${messageId}`
          : `https://api.kinos-engine.ai/projects/therapykinexecutives/${projectId}/messages/${messageId}`;
    } else {
      // For generalist (default)
      baseUrl = process.env.KINOS_API_URL 
        ? `${process.env.KINOS_API_URL}/projects/therapykin/${projectId}/messages/${messageId}`
        : process.env.NODE_ENV === 'development'
          ? `http://localhost:5000/projects/therapykin/${projectId}/messages/${messageId}`
          : `https://api.kinos-engine.ai/projects/therapykin/${projectId}/messages/${messageId}`;
    }
    
    // Call the appropriate API to check the status of the message
    const response = await fetch(baseUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Add any required API keys or authentication headers here
      },
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`KinOS API status check error (${response.status}): ${errorText}`);
      return NextResponse.json(
        { error: `Failed to check message status: ${response.status}` },
        { status: response.status }
      );
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error checking message status:', error);
    return NextResponse.json(
      { error: 'Failed to check message status' },
      { status: 500 }
    );
  }
}
