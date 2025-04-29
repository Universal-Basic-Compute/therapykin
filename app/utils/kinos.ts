interface KinOSResponse {
  status?: string;
  message_id?: string;
  response?: string;
}

// Function to fetch messages from KinOS
export async function fetchMessagesFromKinOS(
  firstName: string,
  since?: string,
  specialist: string = 'generalist', // Add specialist parameter with default
  pseudonym?: string // Add pseudonym parameter
): Promise<Array<{role: string, content: string, timestamp: string}>> {
  try {
    // Import isValidSpecialist dynamically to avoid circular dependencies
    try {
      const { isValidSpecialist } = await import('./validation');
      if (specialist && !isValidSpecialist(specialist)) {
        console.warn(`Invalid specialist value: ${specialist}, defaulting to generalist`);
        specialist = 'generalist';
      }
    } catch (error) {
      console.error('Error validating specialist:', error);
      // Default to generalist if validation fails
      specialist = 'generalist';
    }
    
    // Check if pseudonym is provided
    if (!pseudonym) {
      console.error('Pseudonym is required for fetchMessagesFromKinOS');
      return []; // Return empty array if pseudonym is missing
    }
    
    console.log(`Fetching messages for pseudonym: ${pseudonym}${since ? ` since ${since}` : ''} (specialist: ${specialist})`);
    
    // Build the URL with query parameters - make pseudonym the primary parameter
    let url = `/api/kinos/messages?pseudonym=${encodeURIComponent(pseudonym)}&specialist=${encodeURIComponent(specialist)}`;
    
    // Add firstName as a secondary parameter if provided
    if (firstName) {
      url += `&firstName=${encodeURIComponent(firstName)}`;
    }
    
    if (since) {
      url += `&since=${encodeURIComponent(since)}`;
    }
    
    // Call our API endpoint
    const response = await fetch(url);
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error fetching messages:', errorData);
      throw new Error(errorData.error || `API request failed with status ${response.status}`);
    }
    
    const data = await response.json();
    console.log(`Fetched ${data.messages?.length || 0} messages from KinOS`);
    
    return data.messages || [];
  } catch (error) {
    console.error('Error fetching messages from KinOS:', error);
    return []; // Return empty array on error
  }
}

export async function sendMessageToKinOS(
  content: string, 
  firstName: string, 
  attachments: any[] = [],
  images: string[] = [],
  mode: string | null = null,
  specialist: string | null = null, // Add this parameter
  screenshot: string | null = null, // Add screenshot parameter
  pseudonym: string | null = null // Add pseudonym parameter
): Promise<string> {
  // Ensure pseudonym is provided
  if (!pseudonym) {
    console.error('Pseudonym is required for sendMessageToKinOS');
    throw new Error('Pseudonym is required for KinOS communication');
  }
  try {
    // Validate specialist value if provided
    if (specialist) {
      // Import isValidSpecialist dynamically to avoid circular dependencies
      const { isValidSpecialist } = await import('./validation');
      if (!isValidSpecialist(specialist)) {
        console.warn(`Invalid specialist value: ${specialist}, defaulting to generalist`);
        specialist = 'generalist';
      }
    }
    
    console.log(`Sending message to KinOS: "${content.substring(0, 50)}${content.length > 50 ? '...' : ''}"${mode ? `, mode: ${mode}` : ''}${specialist ? `, specialist: ${specialist}` : ''}${screenshot ? ', with screenshot' : ''}${pseudonym ? `, pseudonym: ${pseudonym}` : ''}`);
    
    // Log image information
    if (images && images.length > 0) {
      console.log(`Sending ${images.length} images to KinOS:`);
      images.forEach((img, index) => {
        console.log(`Image ${index + 1}: length ${img.length}, starts with: ${img.substring(0, 30)}...`);
      });
    } else {
      console.log('No images being sent to KinOS');
    }
    
    // Log screenshot information
    if (screenshot) {
      console.log(`Sending screenshot to KinOS: length ${screenshot.length}, starts with: ${screenshot.substring(0, 30)}...`);
    } else {
      console.log('No screenshot being sent to KinOS');
    }
    
    // Create the request body
    const requestBody: any = {
      content,
      firstName,
      attachments,
      images,
      pseudonym, // Include pseudonym in request body
    };
    
    // Add screenshot if it exists
    if (screenshot) {
      requestBody.screenshot = screenshot;
    }
    
    // Add mode if it exists
    if (mode) {
      requestBody.mode = mode;
    }
    
    // Add specialist if it exists
    if (specialist) {
      requestBody.specialist = specialist;
    }
    
    // Always use our API route - environment handling happens server-side
    console.log('Sending request to KinOS API with body:', JSON.stringify({
      ...requestBody,
      images: images ? `[${images.length} images]` : '[]', // Don't log the full image data
      screenshot: screenshot ? '[screenshot data]' : null // Don't log the full screenshot data
    }));
    
    // Use fetch with streaming support
    const response = await fetch('/api/kinos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API request failed with status ${response.status}: ${errorText}`);
      throw new Error(`API request failed with status ${response.status}`);
    }

    // Check if the response is a stream
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('text/event-stream')) {
      // Return a promise that resolves with the full text when streaming is complete
      // but also provides a callback for incremental updates
      return new Promise((resolve, reject) => {
        let fullText = '';
        let messageId = '';
        
        // Create a reader for the stream
        const reader = response.body?.getReader();
        const decoder = new TextDecoder();
      
        // Function to process the stream
        async function processStream() {
          if (!reader) {
            reject(new Error('Stream reader is null'));
            return;
          }
        
          let buffer = '';
          console.log(`Starting stream processing. Will use message ID: ${messageId || 'unknown'}`);
        
          let lastProcessedTime = Date.now();
          const MAX_PROCESSING_TIME = 10000; // 10 seconds timeout

          try {
            while (true) {
              // Check for timeout
              if (Date.now() - lastProcessedTime > MAX_PROCESSING_TIME) {
                console.warn('Stream processing timeout reached');
                resolve(fullText); // Resolve with what we have so far
                return;
              }

              const { done, value } = await reader.read();
              if (done) {
                console.log('Stream reading complete');
                
                // Process any remaining data in the buffer
                if (buffer.length > 0) {
                  console.log('Processing remaining buffer data');
                  try {
                    // Try to extract any complete events from the buffer
                    let eventEnd = buffer.indexOf("\n\n");
                    while (eventEnd > -1) {
                      // Process event...
                      buffer = buffer.substring(eventEnd + 2);
                      eventEnd = buffer.indexOf("\n\n");
                    }
                  } catch (error) {
                    console.error('Error processing final buffer:', error);
                  }
                }
                
                resolve(fullText);
                return;
              }

              // Update last processed time
              lastProcessedTime = Date.now();
              
              // Decode the chunk and add it to our buffer
              try {
                buffer += decoder.decode(value, { stream: true });
              } catch (decodeError) {
                console.error('Error decoding stream chunk:', decodeError);
                continue;
              }
            
              // Process complete events in the buffer
              try {
                let eventEnd = buffer.indexOf("\n\n");
                let processedEvents = 0;
                const MAX_EVENTS_PER_CYCLE = 100; // Prevent infinite loops
                
                while (eventEnd > -1 && processedEvents < MAX_EVENTS_PER_CYCLE) {
                  processedEvents++;
                  
                  const eventText = buffer.substring(0, eventEnd);
                  buffer = buffer.substring(eventEnd + 2);
                
                  // Parse the event
                  const eventLines = eventText.split('\n');
                  if (eventLines.length < 2) continue;
                
                  const eventTypeLine = eventLines[0];
                  const eventDataLine = eventLines[1];
                
                  if (!eventTypeLine.startsWith('event: ') || !eventDataLine.startsWith('data: ')) continue;
                
                  const eventType = eventTypeLine.substring(7); // Remove "event: "
                  let eventData;
                  try {
                    eventData = JSON.parse(eventDataLine.substring(6)); // Remove "data: "
                  } catch (error) {
                    console.error('Error parsing event data:', error, eventDataLine);
                    continue; // Skip this event if parsing fails
                  }
                  
                  // Handle different event types
                  if (eventType === 'message_start' && eventData.message && eventData.message.id) {
                    messageId = eventData.message.id;
                    console.log(`Streaming started with message ID: ${messageId}`);
                  } else if (eventType === 'content_block_delta' && 
                             eventData.delta && 
                             eventData.delta.type === 'text_delta') {
                    // Append the text chunk
                    const textChunk = eventData.delta.text;
                    fullText += textChunk;
                  
                    // Call the onChunk callback if provided
                    if (window.streamingCallbacks) {
                      // First try with the message ID from the API
                      if (messageId && window.streamingCallbacks[messageId]) {
                        try {
                          window.streamingCallbacks[messageId](textChunk, fullText);
                        } catch (callbackError) {
                          console.error('Error in streaming callback with message ID:', callbackError);
                        }
                      } 
                      // Then try with the streaming message ID format
                      else {
                        // Look for a callback with the streaming- prefix
                        const streamingCallbackKeys = Object.keys(window.streamingCallbacks);
                        const streamingKey = streamingCallbackKeys.find(key => key.startsWith('streaming-'));
                        
                        if (streamingKey) {
                          try {
                            console.log(`Using fallback streaming key: ${streamingKey}`);
                            window.streamingCallbacks[streamingKey](textChunk, fullText);
                          } catch (callbackError) {
                            console.error('Error in streaming callback with fallback key:', callbackError);
                          }
                        } else {
                          console.warn('No suitable streaming callback found. Available keys:', streamingCallbackKeys);
                        }
                      }
                    }
                  } else if (eventType === 'message_stop') {
                    // Streaming is complete
                    console.log(`Streaming completed for message ID: ${messageId}`);
                    
                    // Clean up all possible callbacks
                    if (window.streamingCallbacks) {
                      // Clean up the callback with the message ID from the API
                      if (messageId && window.streamingCallbacks[messageId]) {
                        // Call the callback one last time with a special flag to indicate completion
                        try {
                          window.streamingCallbacks[messageId]('', fullText, true);
                        } catch (callbackError) {
                          console.error('Error in final streaming callback:', callbackError);
                        }
                        delete window.streamingCallbacks[messageId];
                      }
                      
                      // Also clean up any streaming- prefixed callbacks
                      const streamingCallbackKeys = Object.keys(window.streamingCallbacks);
                      streamingCallbackKeys.forEach(key => {
                        if (key.startsWith('streaming-')) {
                          try {
                            // Call the callback one last time with a special flag to indicate completion
                            window.streamingCallbacks[key]('', fullText, true);
                          } catch (callbackError) {
                            console.error('Error in final streaming callback:', callbackError);
                          }
                          delete window.streamingCallbacks[key];
                        }
                      });
                    }
                    
                    resolve(fullText);
                    return;
                  } else if (eventType === 'error') {
                    console.error('Stream error event received:', eventData);
                    reject(new Error(eventData.error || 'Unknown streaming error'));
                    return;
                  }
                  
                  eventEnd = buffer.indexOf("\n\n");
                }
                
                if (processedEvents >= MAX_EVENTS_PER_CYCLE) {
                  console.warn('Reached maximum events per processing cycle');
                }
              } catch (processingError) {
                console.error('Error processing events:', processingError);
              }
            }
            
            // If we get here, the stream ended without a message_stop event
            resolve(fullText);
          } catch (error) {
            console.error('Error processing stream:', error);
            reject(error);
          }
        }
        
        // Start processing the stream
        processStream();
      });
    } else {
      // For non-streaming responses, handle as before
      const data: KinOSResponse = await response.json();
      console.log('KinOS response data:', data);
      
      // Check if the response contains the expected data
      if (data.status === 'completed' && data.response) {
        return data.response;
      } else if (data.response) {
        // If we have a response but status isn't 'completed', still use the response
        console.log('KinOS returned response with unexpected status:', data.status);
        return data.response;
      } else if (typeof data === 'string') {
        // Handle case where the response might be a direct string
        return data;
      } else if (data.message_id) {
        // If we only have a message_id, try to fetch the response
        return await pollForResponse(data.message_id, firstName, 10, 1000, specialist || 'generalist', pseudonym);
      } else {
        // For development/testing, provide a mock response when the API doesn't return expected format
        console.log('KinOS API returned unexpected data format:', data);
        
        // Simple mock responses based on user input
        if (content.toLowerCase().includes('hello') || content.toLowerCase().includes('hi')) {
          return "Hello! I'm TherapyKin. How are you feeling today?";
        } else if (content.toLowerCase().includes('anxious') || content.toLowerCase().includes('anxiety')) {
          return "I'm sorry to hear you're feeling anxious. Let's explore that a bit. Can you tell me more about what's causing your anxiety?";
        } else if (content.toLowerCase().includes('sad') || content.toLowerCase().includes('depressed')) {
          return "I understand that feeling sad can be really difficult. Would you like to talk about what's contributing to these feelings?";
        } else {
          return "Thank you for sharing that with me. Can you tell me more about how that's been affecting you?";
        }
      }
    }
  } catch (error) {
    console.error('Error sending message to KinOS:', error);
    
    // Provide a fallback response
    return "I'm sorry, I'm having trouble connecting right now. Let me try to help anyway. Could you tell me more about what's on your mind?";
  }
}

// Function to poll for a response if we only get a message_id
async function pollForResponse(
  messageId: string,
  firstName: string,
  maxAttempts = 10,
  delayMs = 1000,
  specialist = 'generalist', // Add specialist parameter with default
  pseudonym: string | null = null // Add pseudonym parameter
): Promise<string> {
  // Validate specialist value
  try {
    // Import isValidSpecialist dynamically to avoid circular dependencies
    const { isValidSpecialist } = await import('./validation');
    if (!isValidSpecialist(specialist)) {
      console.warn(`Invalid specialist value for polling: ${specialist}, defaulting to generalist`);
      specialist = 'generalist';
    }
  } catch (error) {
    console.error('Error validating specialist:', error);
    // Default to generalist if validation fails
    specialist = 'generalist';
  }
  
  console.log(`Polling for response to message ID: ${messageId} (specialist: ${specialist})`);
  
  // Always use our API route - environment handling happens server-side
  const statusEndpoint = `/api/kinos/status`;
  
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      // Wait for the specified delay
      await new Promise(resolve => setTimeout(resolve, delayMs));
      
      // Try to fetch the response using our API route
      const response = await fetch(`${statusEndpoint}?messageId=${messageId}&firstName=${firstName}&specialist=${specialist}${pseudonym ? `&pseudonym=${pseudonym}` : ''}`);
      
      if (!response.ok) {
        console.log(`Polling attempt ${attempt} failed with status ${response.status}`);
        continue;
      }
      
      const data = await response.json();
      
      if (data.status === 'completed' && data.response) {
        console.log(`Received response after ${attempt} polling attempts`);
        return data.response;
      }
      
      console.log(`Polling attempt ${attempt}: Status is ${data.status}`);
      
      // If still processing, increase the delay for the next attempt
      delayMs = Math.min(delayMs * 1.5, 5000);
    } catch (error) {
      console.error(`Error during polling attempt ${attempt}:`, error);
    }
  }
  
  // If we've exhausted all attempts, return a fallback message
  return "I'm still thinking about your message. Please give me a moment and try again.";
}
