import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const firstName = searchParams.get('firstName');
    const lastName = searchParams.get('lastName');
    const since = searchParams.get('since'); // Optional timestamp
    const specialist = searchParams.get('specialist') || 'generalist'; // Get specialist parameter with default
    
    if (!firstName || !lastName) {
      return NextResponse.json(
        { error: 'Missing required parameters: firstName, lastName' },
        { status: 400 }
      );
    }
    
    // Create the project ID by combining firstName and lastName
    const projectId = `${firstName}${lastName}`;
    
    // Determine the base URL based on environment and specialist
    let baseUrl;
    
    // Use different project path based on specialist type
    if (specialist === 'crypto') {
      // For crypto specialist
      baseUrl = process.env.KINOS_API_URL 
        ? `${process.env.KINOS_API_URL}/projects/therapykincrypto/${projectId}/messages`
        : process.env.NODE_ENV === 'development'
          ? `http://localhost:5000/projects/therapykincrypto/${projectId}/messages`
          : `https://api.kinos-engine.ai/projects/therapykincrypto/${projectId}/messages`;
    } else if (specialist === 'athletes') {
      // For athletes specialist
      baseUrl = process.env.KINOS_API_URL 
        ? `${process.env.KINOS_API_URL}/projects/therapykinathletes/${projectId}/messages`
        : process.env.NODE_ENV === 'development'
          ? `http://localhost:5000/projects/therapykinathletes/${projectId}/messages`
          : `https://api.kinos-engine.ai/projects/therapykinathletes/${projectId}/messages`;
    } else if (specialist === 'executives') {
      // For executives specialist
      baseUrl = process.env.KINOS_API_URL 
        ? `${process.env.KINOS_API_URL}/projects/therapykinexecutives/${projectId}/messages`
        : process.env.NODE_ENV === 'development'
          ? `http://localhost:5000/projects/therapykinexecutives/${projectId}/messages`
          : `https://api.kinos-engine.ai/projects/therapykinexecutives/${projectId}/messages`;
    } else if (specialist === 'herosjourney') {
      // For Hero's Journey specialist
      baseUrl = process.env.KINOS_API_URL 
        ? `${process.env.KINOS_API_URL}/projects/therapykinherosjourney/${projectId}/messages`
        : process.env.NODE_ENV === 'development'
          ? `http://localhost:5000/projects/therapykinherosjourney/${projectId}/messages`
          : `https://api.kinos-engine.ai/projects/therapykinherosjourney/${projectId}/messages`;
    } else if (specialist === 'sexologist') {
      // For sexologist specialist
      baseUrl = process.env.KINOS_API_URL 
        ? `${process.env.KINOS_API_URL}/projects/therapykinsexologist/${projectId}/messages`
        : process.env.NODE_ENV === 'development'
          ? `http://localhost:5000/projects/therapykinsexologist/${projectId}/messages`
          : `https://api.kinos-engine.ai/projects/therapykinsexologist/${projectId}/messages`;
    } else if (specialist === 'welcome') {
      // For Welcome specialist
      baseUrl = process.env.KINOS_API_URL 
        ? `${process.env.KINOS_API_URL}/projects/therapykinwelcome/${projectId}/messages`
        : process.env.NODE_ENV === 'development'
          ? `http://localhost:5000/projects/therapykinwelcome/${projectId}/messages`
          : `https://api.kinos-engine.ai/projects/therapykinwelcome/${projectId}/messages`;
    } else {
      // For generalist (default)
      baseUrl = process.env.KINOS_API_URL 
        ? `${process.env.KINOS_API_URL}/projects/therapykin/${projectId}/messages`
        : process.env.NODE_ENV === 'development'
          ? `http://localhost:5000/projects/therapykin/${projectId}/messages`
          : `https://api.kinos-engine.ai/projects/therapykin/${projectId}/messages`;
    }
    
    console.log(`Using API endpoint for messages: ${baseUrl}`);
    
    // Add since parameter if provided
    if (since) {
      baseUrl += `?since=${encodeURIComponent(since)}`;
    }
    
    // Call the KinOS API to get messages
    const response = await fetch(baseUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': process.env.KINOS_API_KEY || '', // Add the API key
      },
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`KinOS API error (${response.status}): ${errorText}`);
      return NextResponse.json(
        { error: `Failed to fetch messages: ${response.status}` },
        { status: response.status }
      );
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching messages from KinOS:', error);
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
      { status: 500 }
    );
  }
}
