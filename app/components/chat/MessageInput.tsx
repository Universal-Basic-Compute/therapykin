'use client';

import React, { useState, useRef, useEffect } from 'react';

interface MessageInputProps {
  onSendMessage: (message: string, screenshot?: string | null) => Promise<void>;
  onStartRecording?: () => void;
  onStopRecording?: () => void;
  isRecording?: boolean;
  recordingTime?: number;
  message?: string;
  setMessage?: (message: string) => void;
  disabled?: boolean;
  cameraEnabled?: boolean;
  toggleCamera?: () => void;
  capturedImage?: string | null;
  discardImage?: () => void;
  placeholder?: string;
  isMediaRecorderSupported?: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({
  onSendMessage,
  onStartRecording,
  onStopRecording,
  isRecording = false,
  recordingTime = 0,
  message = '',
  setMessage,
  disabled = false,
  cameraEnabled = false,
  toggleCamera,
  capturedImage = null,
  discardImage,
  placeholder = "Type your message here... (Enter to send, Shift+Enter for new line)",
  isMediaRecorderSupported = true
}) => {
  const [localMessage, setLocalMessage] = useState(message);
  
  // Use the provided setMessage function or the local state
  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newMessage = e.target.value;
    if (setMessage) {
      setMessage(newMessage);
    } else {
      setLocalMessage(newMessage);
    }
  };

  // Format recording time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const currentMessage = setMessage ? message : localMessage;
    if ((!currentMessage.trim() && !capturedImage) || disabled) return;
    
    await onSendMessage(currentMessage, capturedImage);
    
    // Clear the message input
    if (setMessage) {
      setMessage('');
    } else {
      setLocalMessage('');
    }
  };

  // Auto-resize textarea based on content
  useEffect(() => {
    const textarea = document.querySelector('textarea');
    if (!textarea) return;

    const resizeTextarea = () => {
      textarea.style.height = 'auto';
      const scrollHeight = textarea.scrollHeight;
      textarea.style.height = `${Math.min(scrollHeight, 150)}px`; // Cap at 150px
    };

    textarea.addEventListener('input', resizeTextarea);
    
    // Initial resize
    resizeTextarea();
    
    return () => {
      textarea.removeEventListener('input', resizeTextarea);
    };
  }, [message, localMessage]);

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-[var(--background)] border-t border-black/10 dark:border-white/10 z-10">
      <div className="max-w-7xl mx-auto">
        <form onSubmit={handleSubmit} className="w-full flex shadow-sm rounded-lg overflow-hidden border border-black/10 dark:border-white/10 hover:shadow-md transition-shadow duration-200">
          {/* Camera button */}
          {toggleCamera && (
            <button 
              type="button"
              onClick={toggleCamera}
              className={`p-3 self-end transition-colors ${
                cameraEnabled 
                  ? 'bg-[var(--primary-dark)] text-white' 
                  : 'bg-[var(--background-alt)] text-foreground/70 hover:bg-[var(--primary)]/10'
              } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={disabled}
              aria-label={cameraEnabled ? "Turn camera off" : "Turn camera on"}
              aria-pressed={cameraEnabled}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
          )}
          
          <textarea
            value={setMessage ? message : localMessage}
            onChange={handleMessageChange}
            onKeyDown={(e) => {
              // Send on Enter, but allow Shift+Enter for newlines
              if (e.key === 'Enter' && !e.shiftKey && !disabled) {
                e.preventDefault();
                handleSubmit(e as any);
              }
              // Keep the existing Ctrl+Enter or Cmd+Enter functionality as an alternative
              else if ((e.ctrlKey || e.metaKey) && e.key === 'Enter' && !disabled) {
                e.preventDefault();
                handleSubmit(e as any);
              }
            }}
            placeholder={disabled ? "This session has ended. Please return for your next session." : placeholder}
            className={`flex-grow p-3 focus:outline-none focus:ring-1 focus:ring-[var(--primary)] bg-[var(--card-bg)] resize-none min-h-[50px] max-h-[150px] overflow-y-auto ${
              disabled ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            style={{ height: 'auto' }}
            rows={1}
            disabled={isRecording || disabled}
          />
          
          {/* Warning for unsupported browsers */}
          {!isMediaRecorderSupported && onStartRecording && (
            <div className="absolute bottom-16 left-0 right-0 mx-auto w-full max-w-md text-yellow-600 text-sm p-2 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-300 rounded-lg mb-2 text-center">
              Voice recording is not supported in your browser. Please type your message instead.
            </div>
          )}
          
          {/* Microphone button */}
          {onStartRecording && onStopRecording && (
            <button 
              type="button"
              onClick={isRecording ? onStopRecording : onStartRecording}
              className={`p-3 self-end transition-colors ${
                isRecording 
                  ? 'bg-[var(--primary-dark)] text-white animate-pulse' 
                  : 'bg-[var(--background-alt)] text-foreground/70 hover:bg-[var(--primary)]/10'
              } ${disabled || !isMediaRecorderSupported ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={disabled || !isMediaRecorderSupported}
              aria-label={isRecording ? "Stop recording" : "Start voice recording"}
              aria-pressed={isRecording}
            >
              {isRecording ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
                  </svg>
                  <span className="sr-only">Stop Recording</span>
                  {recordingTime > 0 && (
                    <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-500 text-white text-xs rounded-full px-1" aria-live="polite">
                      {formatTime(recordingTime)}
                    </span>
                  )}
                </>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              )}
            </button>
          )}
          
          {/* Send button */}
          <button 
            type="submit" 
            className={`bg-[var(--primary)] text-white p-3 hover:opacity-90 transition-opacity self-end ${
              disabled ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isRecording || disabled}
            aria-label="Send message"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default MessageInput;
