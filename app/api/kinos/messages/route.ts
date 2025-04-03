import { NextRequest, NextResponse } from 'next/server';
import { isValidSpecialist, createProjectId, createKinOsApiUrl } from '@/app/utils/validation';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const firstName = searchParams.get('firstName');
    const lastName = searchParams.get('lastName');
    const since = searchParams.get('since'); // Optional timestamp
    const specialist = searchParams.get('specialist') || 'generalist';
    const pseudonym = searchParams.get('pseudonym');
    
    if (!firstName || !lastName) {
      return NextResponse.json(
        { error: 'Missing required parameters: firstName, lastName' },
        { status: 400 }
      );
    }
    
    // Validate specialist value
    if (!isValidSpecialist(specialist)) {
      return NextResponse.json(
        { error: 'Invalid specialist value' },
        { status: 400 }
      );
    }
    
    // Create a consistent project ID
    const projectId = createProjectId({ pseudonym, firstName, lastName });
    
    // Create the KinOS API URL with query parameters
    const baseUrl = createKinOsApiUrl({
      endpoint: 'messages',
      specialist,
      projectId,
      queryParams: since ? { since } : undefined
    });
    
    console.log(`Using API endpoint for messages: ${baseUrl}`);
    
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
      console.error(`KinOS API error (${response.status}): ${errorText}`);
      return NextResponse.json(
        { error: `Failed to fetch messages: ${response.status}` },
        { status: response.status }
      );
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching messages from KinOS:', error);
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
      { status: 500 }
    );
  }
}
