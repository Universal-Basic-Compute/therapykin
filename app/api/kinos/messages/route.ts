import { NextRequest, NextResponse } from 'next/server';
import { generatePseudonymFromEmail } from '@/app/utils/pseudonyms';

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
    
    // Validate specialist value
    if (!['generalist', 'crypto', 'athletes', 'executives', 'herosjourney', 'sexologist'].includes(specialist)) {
      return NextResponse.json(
        { error: 'Invalid specialist value' },
        { status: 400 }
      );
    }
    
    // Generate a pseudonym from firstName+lastName
    const identifier = `${firstName}${lastName}`;
    const pseudonym = generatePseudonymFromEmail(identifier);
    const projectId = pseudonym.name.replace(/\s+/g, ''); // Remove spaces from pseudonym
    
    // Determine the base URL based on environment and specialist
    let baseUrl;
    
    // Create the blueprint name based on specialist
    const blueprintName = specialist === 'generalist' ? 'therapykin' : `therapykin${specialist}`;
    
    // Use the new v2 API path structure
    baseUrl = process.env.KINOS_API_URL 
      ? `${process.env.KINOS_API_URL}/v2/blueprints/${blueprintName}/kins/${projectId}/messages`
      : process.env.NODE_ENV === 'development'
        ? `http://localhost:5000/v2/blueprints/${blueprintName}/kins/${projectId}/messages`
        : `https://api.kinos-engine.ai/v2/blueprints/${blueprintName}/kins/${projectId}/messages`;
    
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
