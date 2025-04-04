import { NextRequest, NextResponse } from 'next/server';
import { isValidSpecialist, createKinId, createKinOsApiUrl } from '@/app/utils/validation';

export async function POST(request: NextRequest) {
  try {
    const { 
      message, 
      firstName, 
      specialist = null,
      pseudonym = null
    } = await request.json();
    
    // Log the full request for debugging
    console.log('Image generation request:', {
      message: message.substring(0, 50) + '...',
      firstName,
      specialist,
      pseudonym
    });
    
    // Validate specialist value if provided
    if (specialist && !isValidSpecialist(specialist)) {
      console.error(`Invalid specialist value: ${specialist}`);
      return NextResponse.json(
        { error: 'Invalid specialist value' },
        { status: 400 }
      );
    }
    
    console.log(`Requesting image generation for user: ${firstName}${specialist ? `, specialist: ${specialist}` : ''}${pseudonym ? `, pseudonym: ${pseudonym}` : ''}`);
    
    // Ensure pseudonym is provided
    if (!pseudonym) {
      console.error('Missing pseudonym in image generation request');
      return NextResponse.json(
        { error: 'Pseudonym is required' },
        { status: 400 }
      );
    }
    
    // Use pseudonym directly as kinId
    const kinId = pseudonym;
    console.log(`Using kinId for image generation: ${kinId}`);
    
    // Create the KinOS API URL
    const baseUrl = createKinOsApiUrl({
      endpoint: 'image',
      specialist: specialist || 'generalist',
      kinId
    });
    
    console.log(`Using API endpoint for image generation: ${baseUrl}`);
    
    // Use the provided specialist or default to generalist
    let effectiveSpecialist = specialist || 'generalist';
    
    // Create the request body
    const requestBody = {
      message: `${message}

Important style requirements:
- Use a soothing pencil style illustration
- Incorporate the site's color palette: white, teal, light green, purple, violet, yellow, and orange
- Keep the style clean, modern, and therapeutic
- Ensure the image feels calming and supportive`,
      aspect_ratio: "ASPECT_3_1", // Wide landscape format
      model: "V_2A_TURBO", // Change from V_2 to V_2A_TURBO
      magic_prompt_option: "AUTO"
    };
    
    // Add debug information to the message for troubleshooting
    if (process.env.NODE_ENV === 'development') {
      requestBody.message = `${requestBody.message}\n\nDebug Info: kinId=${kinId}, specialist=${specialist || 'generalist'}`;
    }
    
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
