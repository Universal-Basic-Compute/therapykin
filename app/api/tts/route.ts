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
    
    console.log(`TTS request: Converting text to speech (${text.length} chars)`);
    console.log(`TTS request params: voiceId=${voiceId}, model=${model}`);
    
    // Determine the base URL based on environment
    const baseUrl = process.env.KINOS_TTS_API_URL || (
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:5000/tts'  // Use local server in development
        : 'https://api.kinos-engine.ai/tts'  // Use KinOS API in production
    );
    
    console.log(`TTS API URL: ${baseUrl}`);
    
    // Log the request we're about to make
    console.log(`Received voiceId parameter: ${voiceId}`);
    console.log('TTS API request body:', JSON.stringify({
      text: text.substring(0, 50) + (text.length > 50 ? '...' : ''),
      voice_id: voiceId,
      model
    }));
    
    // Call TTS API
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'audio/mpeg, audio/*',  // Accept multiple audio formats
        // Add any API keys if needed
        ...(process.env.KINOS_API_KEY && { 'Authorization': `Bearer ${process.env.KINOS_API_KEY}` })
      },
      body: JSON.stringify({
        text,
        voice_id: voiceId, // This should be voice_id, not voiceId - confirmed correct
        model
      })
    });
    
    // Log response status and headers
    console.log(`TTS API response status: ${response.status}`);
    console.log('TTS API response headers:', Object.fromEntries(response.headers.entries()));
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`TTS API error (${response.status}): ${errorText}`);
      return NextResponse.json(
        { error: `TTS API returned status ${response.status}: ${errorText}` },
        { status: response.status }
      );
    }
    
    // Check content type to ensure we're getting audio
    const contentType = response.headers.get('content-type');
    console.log(`TTS API response content type: ${contentType}`);
    
    if (contentType && contentType.includes('application/json')) {
      // If we got JSON instead of audio, it's likely an error
      const jsonData = await response.json();
      console.error('TTS API returned JSON instead of audio:', jsonData);
      return NextResponse.json(
        { error: 'TTS API returned JSON instead of audio', details: jsonData },
        { status: 500 }
      );
    }
    
    // Get the audio data
    const audioData = await response.arrayBuffer();
    
    // Log audio data details
    console.log(`TTS API response audio data size: ${audioData.byteLength} bytes`);
    
    // Log the first few bytes of the audio data (as hex) to check format
    const dataView = new DataView(audioData);
    let hexBytes = [];
    for (let i = 0; i < Math.min(audioData.byteLength, 32); i++) {
      hexBytes.push(dataView.getUint8(i).toString(16).padStart(2, '0'));
    }
    console.log(`TTS API response first ${hexBytes.length} bytes: ${hexBytes.join(' ')}`);
    
    // Verify we have actual data
    if (audioData.byteLength === 0) {
      console.error('TTS API returned empty audio data');
      return NextResponse.json(
        { error: 'TTS API returned empty audio data' },
        { status: 500 }
      );
    }
    
    if (audioData.byteLength < 100) {
      console.error(`TTS API returned very small audio data: ${audioData.byteLength} bytes`);
      // Continue anyway, but log the warning
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
