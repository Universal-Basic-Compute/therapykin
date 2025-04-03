import { NextRequest, NextResponse } from 'next/server';
import { generatePseudonymFromEmail } from '@/app/utils/pseudonyms';

export async function POST(request: NextRequest) {
  try {
    const { 
      message, 
      firstName, 
      lastName,
      specialist = null,
      pseudonym = null // Add pseudonym parameter
    } = await request.json();
    
    // Validate specialist value if provided
    if (specialist && !['generalist', 'crypto', 'athletes', 'executives', 'herosjourney', 'sexologist'].includes(specialist)) {
      return NextResponse.json(
        { error: 'Invalid specialist value' },
        { status: 400 }
      );
    }
    
    console.log(`Requesting image generation for user: ${firstName} ${lastName}${specialist ? `, specialist: ${specialist}` : ''}`);
    console.log(`Using API key: ${process.env.KINOS_API_KEY ? 'Key is set (not showing for security)' : 'Key is NOT set!'}`);
    
    // Use the provided pseudonym or generate one if not provided
    const projectId = pseudonym || `${firstName}${lastName}`;
    
    // Determine the base URL based on environment and specialist
    let baseUrl;
    
    // Create the blueprint name based on specialist
    const blueprintName = specialist === 'generalist' ? 'therapykin' : `therapykin${specialist}`;
    
    // Use the new v2 API path structure
    baseUrl = process.env.KINOS_API_URL 
      ? `${process.env.KINOS_API_URL}/v2/blueprints/${blueprintName}/kins/${projectId}/image`
      : process.env.NODE_ENV === 'development'
        ? `http://localhost:5000/v2/blueprints/${blueprintName}/kins/${projectId}/image`
        : `https://api.kinos-engine.ai/v2/blueprints/${blueprintName}/kins/${projectId}/image`;
    
    console.log(`Using API endpoint for image generation: ${baseUrl}`);
    
    // Create the request body
    const requestBody = {
      message,
      aspect_ratio: "ASPECT_1_1", // Square aspect ratio
      model: "V_2",
      magic_prompt_option: "AUTO"
    };
    
    // Log the request details (excluding sensitive data)
    console.log('Sending image generation request to:', baseUrl);
    console.log('Request body:', JSON.stringify({
      ...requestBody,
      message: requestBody.message.length > 50 ? requestBody.message.substring(0, 50) + '...' : requestBody.message
    }));
    
    // Forward the request to the KinOS API
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
      console.error(`Request failed with status: ${response.status}, headers:`, response.headers);
      throw new Error(`KinOS API returned status ${response.status}: ${errorText.substring(0, 200)}`);
    }

    // Get the response from KinOS API
    const data = await response.json();
    console.log('KinOS API image generation response received:', JSON.stringify(data).substring(0, 200) + '...');

    // Check if the response contains the expected data structure
    if (data.result?.data?.[0]?.url) {
      console.log(`Successfully generated image URL: ${data.result.data[0].url}`);
    } else {
      console.warn('Image generation response does not contain expected URL structure:', JSON.stringify(data).substring(0, 200) + '...');
    }
    
    // Return the response to the client
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error proxying request to KinOS for image generation:', error);
    
    // Return a more detailed error response
    return NextResponse.json(
      { 
        error: 'Failed to generate image',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
