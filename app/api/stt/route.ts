import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Check if the request is multipart/form-data
    const contentType = request.headers.get('content-type') || '';
    console.log('Received STT request with content type:', contentType);
    
    // More flexible content type checking
    if (!contentType.includes('multipart/form-data') && !contentType.includes('audio/')) {
      console.error('Invalid content type:', contentType);
      return NextResponse.json(
        { error: 'Content type must be multipart/form-data or audio/*' },
        { status: 400 }
      );
    }
    
    let audioBlob: Blob;
    
    // Handle different request formats
    if (contentType.includes('multipart/form-data')) {
      // Parse the form data
      try {
        const formData = await request.formData();
        console.log('Form data keys:', [...formData.keys()]);
        
        // Get the audio file
        const file = formData.get('file');
        if (!file || !(file instanceof Blob)) {
          console.error('No audio file provided or invalid file in form data');
          return NextResponse.json(
            { error: 'No audio file provided or invalid file' },
            { status: 400 }
          );
        }
        
        audioBlob = file;
      } catch (formError) {
        console.error('Error parsing form data:', formError);
        return NextResponse.json(
          { error: 'Failed to parse form data', details: formError instanceof Error ? formError.message : 'Unknown error' },
          { status: 400 }
        );
      }
    } else if (contentType.includes('audio/')) {
      // Direct audio content
      try {
        audioBlob = await request.blob();
        if (audioBlob.size === 0) {
          console.error('Empty audio blob received');
          return NextResponse.json(
            { error: 'Empty audio data received' },
            { status: 400 }
          );
        }
      } catch (blobError) {
        console.error('Error reading request as blob:', blobError);
        return NextResponse.json(
          { error: 'Failed to read audio data', details: blobError instanceof Error ? blobError.message : 'Unknown error' },
          { status: 400 }
        );
      }
    } else {
      // This shouldn't happen due to the earlier check, but just in case
      return NextResponse.json(
        { error: 'Unsupported content type' },
        { status: 400 }
      );
    }
    
    // Log audio blob details
    console.log(`Processing audio: size=${audioBlob.size} bytes, type=${audioBlob.type}`);
    
    // If file has no type or is octet-stream, try to infer the correct type
    let fileToSend: Blob = audioBlob;
    if (!audioBlob.type || audioBlob.type === 'audio/octet-stream') {
      // Try to determine the type from the request content-type
      if (contentType.includes('audio/webm')) {
        fileToSend = new Blob([await audioBlob.arrayBuffer()], { type: 'audio/webm' });
      } else if (contentType.includes('audio/mp4') || contentType.includes('audio/m4a')) {
        fileToSend = new Blob([await audioBlob.arrayBuffer()], { type: 'audio/mp4' });
      } else if (contentType.includes('audio/wav')) {
        fileToSend = new Blob([await audioBlob.arrayBuffer()], { type: 'audio/wav' });
      } else {
        // Default to webm for unknown types
        fileToSend = new Blob([await audioBlob.arrayBuffer()], { type: 'audio/webm' });
      }
      console.log(`Inferred audio type: ${fileToSend.type}`);
    }
    
    // Get optional parameters from query string for direct audio uploads
    const url = new URL(request.url);
    const model = url.searchParams.get('model') || 'whisper-1';
    const language = url.searchParams.get('language') || 'en';
    
    // Determine the base URL based on environment
    const baseUrl = process.env.KINOS_STT_API_URL || (
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:5000/v2/stt'
        : 'https://api.kinos-engine.ai/v2/stt'
    );
    
    // Create a new FormData object to send to the KinOS API
    const kinosFormData = new FormData();
    kinosFormData.append('file', fileToSend);
    kinosFormData.append('model', model);
    kinosFormData.append('language', language);
    
    console.log(`Sending STT request to ${baseUrl}`);
    
    // Call STT API
    const response = await fetch(baseUrl, {
      method: 'POST',
      body: kinosFormData,
      headers: {
        // Add API key
        'X-API-Key': process.env.KINOS_API_KEY || ''
      }
    });
    
    // Log response status
    console.log(`STT API response status: ${response.status}`);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`STT API error (${response.status}): ${errorText}`);
      return NextResponse.json(
        { error: 'Failed to transcribe audio', details: errorText },
        { status: response.status }
      );
    }
    
    // Get the transcription result
    const data = await response.json();
    console.log('Transcription result:', data);
    
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
