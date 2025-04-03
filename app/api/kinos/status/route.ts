import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const messageId = searchParams.get('messageId');
    const firstName = searchParams.get('firstName');
    const lastName = searchParams.get('lastName');
    const specialist = searchParams.get('specialist') || 'generalist'; // Get specialist parameter with default
    
    if (!messageId || !firstName || !lastName) {
      return NextResponse.json(
        { error: 'Missing required parameters: messageId, firstName, lastName' },
        { status: 400 }
      );
    }
    
    const projectId = `${firstName}${lastName}`;
    
    // Determine the base URL based on environment and specialist
    let baseUrl;
    
    // Create the blueprint name based on specialist
    const blueprintName = specialist === 'generalist' ? 'therapykin' : `therapykin${specialist}`;
    
    // Use the new v2 API path structure
    baseUrl = process.env.KINOS_API_URL 
      ? `${process.env.KINOS_API_URL}/v2/blueprints/${blueprintName}/kins/${projectId}/messages/${messageId}`
      : process.env.NODE_ENV === 'development'
        ? `http://localhost:5000/v2/blueprints/${blueprintName}/kins/${projectId}/messages/${messageId}`
        : `https://api.kinos-engine.ai/v2/blueprints/${blueprintName}/kins/${projectId}/messages/${messageId}`;
    
    // Call the appropriate API to check the status of the message
    const response = await fetch(baseUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': process.env.KINOS_API_KEY || '', // Add the API key
      },
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`KinOS API status check error (${response.status}): ${errorText}`);
      return NextResponse.json(
        { error: `Failed to check message status: ${response.status}` },
        { status: response.status }
      );
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error checking message status:', error);
    return NextResponse.json(
      { error: 'Failed to check message status' },
      { status: 500 }
    );
  }
}
