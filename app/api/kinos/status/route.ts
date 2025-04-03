import { NextRequest, NextResponse } from 'next/server';
import { isValidSpecialist, createKinId, createKinOsApiUrl } from '@/app/utils/validation';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const messageId = searchParams.get('messageId');
    const firstName = searchParams.get('firstName');
    const specialist = searchParams.get('specialist') || 'generalist';
    const pseudonym = searchParams.get('pseudonym');
    
    if (!messageId || !firstName) {
      return NextResponse.json(
        { error: 'Missing required parameters: messageId, firstName' },
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
      specialist,
      kinId,
      messageId
    });
    
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
