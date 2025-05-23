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
    
    // Use sanitized bridge ID as the kinId
    const sanitizedBridgeId = bridgeId.replace(/[^a-zA-Z0-9-]/g, '');
    const kinId = sanitizedBridgeId;
    
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
      bridgeId,
      addContext: "channels/" // Add this line to include all channel messages in context
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
    
    // Formatez correctement la réponse pour l'affichage
    const formattedResponse = {
      role: 'assistant',
      content: data.content || data.text || data.message || 'No response content',
      id: `assistant-${Date.now()}`,
      loading: false,
      timestamp: new Date().toISOString()
    };
    
    // Return the formatted response to the client
    return NextResponse.json(formattedResponse);
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
    
    // Use sanitized bridge ID as the kinId
    const sanitizedBridgeId = bridgeId.replace(/[^a-zA-Z0-9-]/g, '');
    const kinId = sanitizedBridgeId;
    
    // Create the KinOS API URL directly
    let baseUrl = `${process.env.KINOS_API_URL}/v2/blueprints/therapykinbridge/kins/${encodeURIComponent(kinId)}/channels/${encodeURIComponent(pseudonym || 'default')}/messages`;
    
    // Add query parameters
    const queryParams = new URLSearchParams();
    queryParams.append('bridgeId', bridgeId);
    queryParams.append('addContext', 'channels/'); // Add this line to include all channel messages in context
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
    
    // Formatez les messages pour l'affichage
    const formattedMessages = Array.isArray(data.messages) 
      ? data.messages.map((msg: any) => ({
          role: msg.role || (msg.sender === 'user' ? 'user' : 'assistant'),
          content: msg.content || msg.text || msg.message || '',
          id: msg.id || `msg-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
          timestamp: msg.timestamp || new Date().toISOString()
        }))
      : [];
    
    return NextResponse.json({ messages: formattedMessages });
  } catch (error) {
    console.error('Error fetching messages from KinOS Bridge API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bridge messages' },
      { status: 500 }
    );
  }
}
