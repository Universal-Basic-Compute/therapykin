import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { text, voiceId = 'UgBBYS2sOqTuMpoF3BR0', model = 'eleven_flash_v2_5' } = await request.json();
    
    // Validate input
    if (!text) {
      console.log('TTS API error: Missing required text parameter');
      return NextResponse.json(
        { error: 'Missing required text parameter' },
        { status: 400 }
      );
    }
    
    // Log minimal information in production, more in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`TTS request: Converting text to speech (${text.length} chars)`);
      console.log(`TTS request params: voiceId=${voiceId}, model=${model}`);
    } else {
      console.log(`TTS request: ${text.length} chars, voice=${voiceId}`);
    }
    
    // Determine the base URL based on environment
    const baseUrl = process.env.KINOS_TTS_API_URL || (
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:5000/v2/tts'
        : 'https://api.kinos-engine.ai/v2/tts'
    );
    
    // Call TTS API
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'audio/mpeg, audio/*',  // Accept multiple audio formats
        // Add API key
        'X-API-Key': process.env.KINOS_API_KEY || ''
      },
      body: JSON.stringify({
        text,
        voice_id: voiceId, // This should be voice_id, not voiceId - confirmed correct
        model
      })
    });
    
    // Log minimal response info
    console.log(`TTS API response status: ${response.status}`);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`TTS API error (${response.status}): ${errorText}`);
      return NextResponse.json(
        { error: `Failed to convert text to speech` },
        { status: response.status }
      );
    }
    
    // Check content type to ensure we're getting audio
    const contentType = response.headers.get('content-type');
    
    if (contentType && contentType.includes('application/json')) {
      // If we got JSON instead of audio, it's likely an error
      const jsonData = await response.json();
      console.error('TTS API returned JSON instead of audio');
      return NextResponse.json(
        { error: 'Failed to convert text to speech' },
        { status: 500 }
      );
    }
    
    // Get the audio data
    const audioData = await response.arrayBuffer();
    
    // Verify we have actual data
    if (audioData.byteLength === 0) {
      console.error('TTS API returned empty audio data');
      return NextResponse.json(
        { error: 'Failed to convert text to speech' },
        { status: 500 }
      );
    }
    
    // Return the audio stream with explicit content type
    const responseObj = new NextResponse(audioData, {
      headers: {
        'Content-Type': contentType || 'audio/mpeg',
        'Content-Length': audioData.byteLength.toString()
      }
    });
    
    console.log('TTS API returning response with headers:', Object.fromEntries(responseObj.headers.entries()));
    return responseObj;
  } catch (error) {
    console.error('TTS API error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to convert text to speech',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
