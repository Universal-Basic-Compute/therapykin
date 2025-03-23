import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Check if the request is multipart/form-data
    const contentType = request.headers.get('content-type') || '';
    if (!contentType.includes('multipart/form-data')) {
      console.error('Invalid content type:', contentType);
      return NextResponse.json(
        { error: 'Content type must be multipart/form-data' },
        { status: 400 }
      );
    }
    
    // Parse the form data
    const formData = await request.formData();
    
    // Get the audio file
    const file = formData.get('file');
    if (!file || !(file instanceof Blob)) {
      console.error('No audio file provided or invalid file');
      return NextResponse.json(
        { error: 'No audio file provided or invalid file' },
        { status: 400 }
      );
    }
    
    // Get optional parameters
    const model = formData.get('model') || 'whisper-1';
    const language = formData.get('language') || 'en';
    const prompt = formData.get('prompt') || '';
    const responseFormat = formData.get('response_format') || 'json';
    
    console.log(`STT request: Processing audio file of size ${file.size} bytes`);
    console.log(`STT request params: model=${model}, language=${language}`);
    
    // Determine the base URL based on environment
    const baseUrl = process.env.KINOS_STT_API_URL || (
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:5000/stt'  // Use local server in development
        : 'https://api.kinos-engine.ai/stt'  // Use KinOS API in production
    );
    
    console.log(`STT API URL: ${baseUrl}`);
    
    // Create a new FormData object to send to the KinOS API
    const kinosFormData = new FormData();
    kinosFormData.append('file', file);
    kinosFormData.append('model', model as string);
    kinosFormData.append('language', language as string);
    
    if (prompt) {
      kinosFormData.append('prompt', prompt as string);
    }
    
    if (responseFormat) {
      kinosFormData.append('response_format', responseFormat as string);
    }
    
    // Call STT API
    const response = await fetch(baseUrl, {
      method: 'POST',
      body: kinosFormData,
      headers: {
        // Add any API keys if needed
        ...(process.env.KINOS_API_KEY && { 'Authorization': `Bearer ${process.env.KINOS_API_KEY}` })
      }
    });
    
    // Log response status and headers
    console.log(`STT API response status: ${response.status}`);
    console.log('STT API response headers:', Object.fromEntries(response.headers.entries()));
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`STT API error (${response.status}): ${errorText}`);
      return NextResponse.json(
        { error: `STT API returned status ${response.status}: ${errorText}` },
        { status: response.status }
      );
    }
    
    // Get the transcription result
    const data = await response.json();
    console.log('STT API response:', data);
    
    // Return the transcription
    return NextResponse.json({
      text: data.text || ''
    });
  } catch (error) {
    console.error('STT API error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to transcribe audio',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Increase the limit for the request body size
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};
