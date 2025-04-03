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
    
    // Log minimal information in production
    if (process.env.NODE_ENV === 'development') {
      console.log(`STT request: Processing audio file of type ${file.type}, size ${file.size} bytes`);
    } else {
      console.log(`STT request: Processing ${file.size} bytes audio file`);
    }
    
    // If file has no type, try to infer it from the filename
    let fileToSend: File | Blob = file;
    if (file instanceof File && !file.type) {
      const fileName = file.name || '';
      const fileExt = fileName.split('.').pop()?.toLowerCase();
      
      if (fileExt) {
        // Create a new blob with the correct type
        if (fileExt === 'webm') {
          fileToSend = new Blob([await file.arrayBuffer()], { type: 'audio/webm' });
        } else if (fileExt === 'mp4' || fileExt === 'm4a') {
          fileToSend = new Blob([await file.arrayBuffer()], { type: 'audio/mp4' });
        } else if (fileExt === 'wav') {
          fileToSend = new Blob([await file.arrayBuffer()], { type: 'audio/wav' });
        }
      }
    }
    
    // Get optional parameters
    const model = formData.get('model') || 'whisper-1';
    const language = formData.get('language') || 'en';
    const prompt = formData.get('prompt') || '';
    const responseFormat = formData.get('response_format') || 'json';
    
    // Determine the base URL based on environment
    const baseUrl = process.env.KINOS_STT_API_URL || (
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:5000/v2/stt'
        : 'https://api.kinos-engine.ai/v2/stt'
    );
    
    // Create a new FormData object to send to the KinOS API
    const kinosFormData = new FormData();
    kinosFormData.append('file', fileToSend);
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
        // Add API key
        'X-API-Key': process.env.KINOS_API_KEY || ''
      }
    });
    
    // Log minimal response info
    console.log(`STT API response status: ${response.status}`);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`STT API error (${response.status}): ${errorText}`);
      return NextResponse.json(
        { error: 'Failed to transcribe audio' },
        { status: response.status }
      );
    }
    
    // Get the transcription result
    const data = await response.json();
    
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
