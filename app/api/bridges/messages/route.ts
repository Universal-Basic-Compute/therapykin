import { NextRequest, NextResponse } from 'next/server';
import { isValidSpecialist, createKinOsApiUrl } from '@/app/utils/validation';

export async function POST(request: NextRequest) {
  try {
    const { 
      content, 
      firstName, 
      email = null,
      attachments = [], 
      images = [], 
      mode = null, 
      specialist = 'mediator',
      screenshot = null,
      pseudonym = null,
      bridgeId = null
    } = await request.json();
    
    // Validate required parameters
    if (!pseudonym) {
      return NextResponse.json(
        { error: 'Pseudonym is required' },
        { status: 400 }
      );
    }
    
    if (!bridgeId) {
      return NextResponse.json(
        { error: 'Bridge ID is required' },
        { status: 400 }
      );
    }
    
    // Validate specialist value if provided
    if (specialist && !isValidSpecialist(specialist)) {
      return NextResponse.json(
        { error: 'Invalid specialist value' },
        { status: 400 }
      );
    }
    
    console.log(`Sending bridge message for user: ${firstName}, bridge: ${bridgeId}`);
    
    // Use pseudonym directly as kinId
    const kinId = pseudonym;
    
    // Create the KinOS API URL directly
    const baseUrl = `${process.env.KINOS_API_URL}/v2/blueprints/therapykinbridge/kins/${encodeURIComponent(kinId)}/channels/${encodeURIComponent(pseudonym)}/messages`;
    
    console.log(`Using API endpoint: ${baseUrl}`);
    
    // Create the request body
    const requestBody: any = {
      content,
      attachments: attachments || [],
      images: images || [],
      model: "claude-3-7-sonnet-latest",
      history_length: 50,
      bridgeId
    };
    
    // Add mode if it exists
    if (mode) {
      requestBody.mode = mode;
    }
    
    // Add screenshot if it exists
    if (screenshot) {
      requestBody.screenshot = screenshot;
    }
    
    // Forward the request to the appropriate API with the additional parameters
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': process.env.KINOS_API_KEY || '', // Add the API key
      },
      body: JSON.stringify(requestBody),
    });

    // Check if the response is OK
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`KinOS API error (${response.status}): ${errorText}`);
      throw new Error(`KinOS API returned status ${response.status}`);
    }

    // Get the response from KinOS API
    const data = await response.json();
    console.log('KinOS Bridge API response:', data);
    
    // Return the response to the client
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error proxying request to KinOS Bridge API:', error);
    
    // Return a more detailed error response
    return NextResponse.json(
      { 
        error: 'Failed to communicate with KinOS Bridge API',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const bridgeId = searchParams.get('bridgeId');
    const pseudonym = searchParams.get('pseudonym');
    const since = searchParams.get('since'); // Optional timestamp
    
    // Validate required parameters
    if (!bridgeId) {
      return NextResponse.json(
        { error: 'Bridge ID is required' },
        { status: 400 }
      );
    }
    
    // Use pseudonym if provided, otherwise use a default
    const kinId = pseudonym || 'bridge-user';
    
    // Create the KinOS API URL directly
    let baseUrl = `${process.env.KINOS_API_URL}/v2/blueprints/therapykinbridge/kins/${encodeURIComponent(kinId)}/channels/${encodeURIComponent(pseudonym)}/messages`;
    
    // Add query parameters
    const queryParams = new URLSearchParams();
    queryParams.append('bridgeId', bridgeId);
    if (since) {
      queryParams.append('since', since);
    }
    baseUrl += `?${queryParams.toString()}`;
    
    console.log(`Using API endpoint for bridge messages: ${baseUrl}`);
    
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
      console.error(`KinOS Bridge API error (${response.status}): ${errorText}`);
      return NextResponse.json(
        { error: `Failed to fetch bridge messages: ${response.status}` },
        { status: response.status }
      );
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching messages from KinOS Bridge API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bridge messages' },
      { status: 500 }
    );
  }
}
