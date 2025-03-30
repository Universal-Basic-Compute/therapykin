import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { 
      message, 
      firstName, 
      lastName,
      specialist = null
    } = await request.json();
    
    console.log(`Requesting image generation for user: ${firstName} ${lastName}${specialist ? `, specialist: ${specialist}` : ''}`);
    
    // Create the project ID by combining firstName and lastName
    const projectId = `${firstName}${lastName}`;
    
    // Determine the base URL based on environment and specialist
    let baseUrl;
    
    // Use different project path based on specialist type
    if (specialist === 'crypto') {
      baseUrl = process.env.KINOS_API_URL 
        ? `${process.env.KINOS_API_URL}/projects/therapykincrypto/${projectId}/image`
        : process.env.NODE_ENV === 'development'
          ? `http://localhost:5000/projects/therapykincrypto/${projectId}/image`
          : `https://api.kinos-engine.ai/projects/therapykincrypto/${projectId}/image`;
    } else if (specialist === 'athletes') {
      baseUrl = process.env.KINOS_API_URL 
        ? `${process.env.KINOS_API_URL}/projects/therapykinathletes/${projectId}/image`
        : process.env.NODE_ENV === 'development'
          ? `http://localhost:5000/projects/therapykinathletes/${projectId}/image`
          : `https://api.kinos-engine.ai/projects/therapykinathletes/${projectId}/image`;
    } else if (specialist === 'executives') {
      baseUrl = process.env.KINOS_API_URL 
        ? `${process.env.KINOS_API_URL}/projects/therapykinexecutives/${projectId}/image`
        : process.env.NODE_ENV === 'development'
          ? `http://localhost:5000/projects/therapykinexecutives/${projectId}/image`
          : `https://api.kinos-engine.ai/projects/therapykinexecutives/${projectId}/image`;
    } else if (specialist === 'herosjourney') {
      baseUrl = process.env.KINOS_API_URL 
        ? `${process.env.KINOS_API_URL}/projects/therapykinherosjourney/${projectId}/image`
        : process.env.NODE_ENV === 'development'
          ? `http://localhost:5000/projects/therapykinherosjourney/${projectId}/image`
          : `https://api.kinos-engine.ai/projects/therapykinherosjourney/${projectId}/image`;
    } else {
      baseUrl = process.env.KINOS_API_URL 
        ? `${process.env.KINOS_API_URL}/projects/therapykin/${projectId}/image`
        : process.env.NODE_ENV === 'development'
          ? `http://localhost:5000/projects/therapykin/${projectId}/image`
          : `https://api.kinos-engine.ai/projects/therapykin/${projectId}/image`;
    }
    
    console.log(`Using API endpoint for image generation: ${baseUrl}`);
    
    // Create the request body
    const requestBody = {
      message,
      aspect_ratio: "ASPECT_1_1", // Square aspect ratio
      model: "V_2",
      magic_prompt_option: "AUTO"
    };
    
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
      throw new Error(`KinOS API returned status ${response.status}`);
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
