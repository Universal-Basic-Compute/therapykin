import { NextRequest, NextResponse } from 'next/server';
import { isValidSpecialist, createProjectId, createKinOsApiUrl } from '@/app/utils/validation';

export async function POST(request: NextRequest) {
  try {
    const { 
      message, 
      firstName, 
      lastName,
      specialist = null,
      pseudonym = null
    } = await request.json();
    
    // Validate specialist value if provided
    if (specialist && !isValidSpecialist(specialist)) {
      return NextResponse.json(
        { error: 'Invalid specialist value' },
        { status: 400 }
      );
    }
    
    console.log(`Requesting image generation for user: ${firstName} ${lastName}${specialist ? `, specialist: ${specialist}` : ''}`);
    
    // Create a consistent project ID
    const projectId = createProjectId({ pseudonym, firstName, lastName });
    
    // Create the KinOS API URL
    const baseUrl = createKinOsApiUrl({
      endpoint: 'image',
      specialist: specialist || 'generalist',
      projectId
    });
    
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
