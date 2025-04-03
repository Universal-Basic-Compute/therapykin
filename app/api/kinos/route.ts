import { NextRequest, NextResponse } from 'next/server';
import { isValidSpecialist, createKinId, createKinOsApiUrl } from '@/app/utils/validation';

export async function POST(request: NextRequest) {
  try {
    const { 
      content, 
      firstName, 
      lastName, 
      email = null,
      attachments = [], 
      images = [], 
      mode = null, 
      specialist = null,
      screenshot = null,
      pseudonym = null
    } = await request.json();
    
    // Validate specialist value if provided
    if (specialist && !isValidSpecialist(specialist)) {
      return NextResponse.json(
        { error: 'Invalid specialist value' },
        { status: 400 }
      );
    }
    
    console.log(`Sending message to KinOS for user: ${firstName} ${lastName}${mode ? `, mode: ${mode}` : ''}${specialist ? `, specialist: ${specialist}` : ''}${screenshot ? ', with screenshot' : ''}`);
    
    // Ensure pseudonym is provided
    if (!pseudonym) {
      return NextResponse.json(
        { error: 'Pseudonym is required' },
        { status: 400 }
      );
    }
    
    // Use pseudonym directly as kinId
    const kinId = pseudonym;
    
    // Create the KinOS API URL
    const baseUrl = createKinOsApiUrl({
      endpoint: 'messages',
      specialist: specialist || 'generalist',
      kinId
    });
    
    console.log(`Using API endpoint: ${baseUrl}`);
    
    // Create the request body
    const requestBody: any = {
      content,
      attachments: attachments || [],
      images: images || [],
      model: "claude-3-7-sonnet-latest",
      history_length: 50
    };
    
    // Add screenshot if it exists
    if (screenshot) {
      requestBody.screenshot = screenshot;
    }
    
    // Add mode if it exists
    if (mode) {
      requestBody.mode = mode;
    }
    
    // Add specialist if it exists
    if (specialist) {
      requestBody.specialist = specialist;
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
    console.log('KinOS API response:', data);
    
    // Return the response to the client
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error proxying request to KinOS:', error);
    
    // Return a more detailed error response
    return NextResponse.json(
      { 
        error: 'Failed to communicate with KinOS API',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
