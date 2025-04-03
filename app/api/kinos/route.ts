import { NextRequest, NextResponse } from 'next/server';
import { generatePseudonymFromEmail } from '@/app/utils/pseudonyms';

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
      screenshot = null // Add screenshot parameter
    } = await request.json();
    
    // Validate specialist value if provided
    if (specialist && !['generalist', 'crypto', 'athletes', 'executives', 'herosjourney', 'sexologist'].includes(specialist)) {
      return NextResponse.json(
        { error: 'Invalid specialist value' },
        { status: 400 }
      );
    }
    
    console.log(`Sending message to KinOS for user: ${firstName} ${lastName}${mode ? `, mode: ${mode}` : ''}${specialist ? `, specialist: ${specialist}` : ''}${screenshot ? ', with screenshot' : ''}`);
    
    // Generate a pseudonym from email or firstName+lastName
    const identifier = email || `${firstName}${lastName}`;
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
    
    console.log(`Using API endpoint: ${baseUrl}`);
    
    // Create the request body
    const requestBody: any = {
      content,
      attachments,
      images,
      model: "claude-3-7-sonnet-latest", // Add the specified model
      history_length: 50 // Add the specified history length
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
