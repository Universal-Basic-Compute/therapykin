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
      specialist = null,
      screenshot = null,
      pseudonym = null,
      min_files = 1,
      max_files = 2,
      addSystem = null
    } = await request.json();
    
    // Validate specialist value if provided
    if (specialist && !isValidSpecialist(specialist)) {
      return NextResponse.json(
        { error: 'Invalid specialist value' },
        { status: 400 }
      );
    }
    
    console.log(`Sending analysis request to KinOS for user: ${firstName}${mode ? `, mode: ${mode}` : ''}${specialist ? `, specialist: ${specialist}` : ''}`);
    
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
    
    console.log(`Using API endpoint for analysis: ${baseUrl}`);
    
    // Create the request body
    const requestBody: any = {
      content,
      attachments: attachments || [],
      images: images || [],
      model: "claude-3-5-haiku-latest",
      history_length: 25,
      min_files,
      max_files
    };
    
    // Add addSystem if it exists
    if (addSystem) {
      requestBody.addSystem = addSystem;
    }
    
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
    console.log('KinOS API analysis response:', data);
    
    // Return the response to the client, but ensure we're only returning the necessary data
    // This prevents the raw analysis response from being displayed in the UI
    return NextResponse.json({
      response: data.response,
      isAnalysis: true // Add a flag to indicate this is an analysis response
    });
  } catch (error) {
    console.error('Error proxying analysis request to KinOS:', error);
    
    // Return a more detailed error response
    return NextResponse.json(
      { 
        error: 'Failed to communicate with KinOS API for analysis',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
