'use client';

import React, { useRef, useEffect } from 'react';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  id?: string;
  loading?: boolean;
  audio?: string;
  image?: string;
  generatingImage?: boolean;
  imageLoaded?: boolean;
  skipAutoIllustrate?: boolean;
  timestamp?: string;
}

interface ChatContainerProps {
  chatHistory: ChatMessage[];
  playMessageAudio?: (msg: ChatMessage) => void;
  generateIllustrationForMessage?: (content: string, id: string) => void;
  currentPlayingId?: string | null;
  isPlaying?: boolean;
  collapsed?: boolean;
}

const ChatContainer: React.FC<ChatContainerProps> = ({
  chatHistory,
  playMessageAudio,
  generateIllustrationForMessage,
  currentPlayingId,
  isPlaying,
  collapsed = false
}) => {
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when chat history changes
  useEffect(() => {
    // Only auto-scroll when a new message is added, not when an existing message is updated
    const shouldScroll = chatHistory.length > 0 && 
      // Check if the last message is new (not just updated with generatingImage flag)
      (chatHistory[chatHistory.length - 1].id !== 'initial-loading' && 
       !chatHistory[chatHistory.length - 1].id?.includes('transcribing-'));
    
    if (shouldScroll && chatContainerRef.current) {
      const scrollOptions: ScrollIntoViewOptions = {
        behavior: 'smooth',
        block: 'end',
      };
      
      // Use setTimeout to ensure the DOM has updated
      setTimeout(() => {
        chatContainerRef.current?.scrollIntoView(scrollOptions);
      }, 100);
    }
  }, [chatHistory]);

  return (
    <div className={`flex-grow card overflow-hidden ${collapsed ? 'md:w-full' : ''}`}>
      <div className="h-full overflow-y-auto p-4 pb-16" style={{ scrollbarWidth: 'thin' }}>
        <div className="space-y-4">
          {chatHistory
            .filter(msg => typeof msg.content === 'string' && !msg.content.includes('<system>')) // Filter out system messages and ensure content is a string
            .map((msg) => (
              <div key={msg.id || Math.random()} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[80%] p-3 rounded-lg transition-all duration-200 hover:shadow-lg ${
                    msg.role === 'user' 
                      ? 'user-message-bubble rounded-br-none' 
                      : 'assistant-message-bubble rounded-bl-none'
                  }`}
                >
                  {msg.loading ? (
                    <div className="flex items-center space-x-1 py-1">
                      <div className="w-2 h-2 bg-[var(--primary)]/60 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-[var(--primary)]/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-[var(--primary)]/60 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  ) : (
                    <div>
                      <p className="text-bubble whitespace-pre-wrap">{msg.content}</p>
                  
                      {/* Display image if available with slide-down animation */}
                      {msg.image && (
                        <div className={`mt-3 overflow-hidden transition-all duration-500 ease-in-out ${
                          msg.imageLoaded ? 'max-h-[500px]' : 'max-h-0'
                        }`}>
                          <img 
                            src={msg.image} 
                            alt="Session visualization" 
                            className="w-full h-auto rounded-lg shadow-md opacity-0 transition-opacity duration-500"
                            loading="lazy"
                            onLoad={(e) => {
                              // When image loads, set imageLoaded to true and fade it in
                              e.currentTarget.classList.remove('opacity-0');
                              e.currentTarget.classList.add('opacity-100');
                            }}
                          />
                        </div>
                      )}
                      
                      {/* Add Rate Session button for the rate-session-prompt message */}
                      {msg.id === 'rate-session-prompt' && (
                        <div className="mt-3">
                          <button 
                            onClick={() => {}}
                            className="px-4 py-2 bg-[var(--primary)] text-white rounded-lg hover:bg-[var(--primary-dark)] transition-colors"
                          >
                            Rate Your Session
                          </button>
                        </div>
                      )}
                    
                      {msg.role === 'assistant' && msg.id !== 'rate-session-prompt' && playMessageAudio && generateIllustrationForMessage && (
                        <div className="mt-2 flex justify-end space-x-2">
                          {currentPlayingId === msg.id ? (
                            <button 
                              onClick={() => {
                                // Stop audio logic would be handled by the parent component
                              }}
                              className="text-xs opacity-70 hover:opacity-100 flex items-center"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
                              </svg>
                              Stop
                            </button>
                          ) : (
                            <button 
                              onClick={() => playMessageAudio(msg)}
                              className="text-xs opacity-70 hover:opacity-100 flex items-center"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              Listen
                            </button>
                          )}
                          
                          {/* Add Illustrate button */}
                          {!msg.image && !msg.generatingImage && (
                            <button 
                              onClick={() => generateIllustrationForMessage(msg.content, msg.id || 'unknown')}
                              className="text-xs opacity-70 hover:opacity-100 flex items-center"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              Illustrate
                            </button>
                          )}
                          {msg.generatingImage && (
                            <span className="text-xs opacity-70 flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              Creating...
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
          ))}
          {/* Add an invisible element at the bottom to scroll to */}
          <div ref={chatContainerRef} />
        </div>
      </div>
    </div>
  );
};

export default ChatContainer;
