'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useSearchParams } from 'next/navigation';
import Header from '../../components/Header';
import ChatContainer from '../../components/chat/ChatContainer';
import MessageInput from '../../components/chat/MessageInput';
import ChatHeader from '../../components/chat/ChatHeader';
import ChatSettings from '../../components/chat/ChatSettings';
import { useChat } from '../../hooks/useChat';
import { useVoiceRecording } from '../../hooks/useVoiceRecording';
import { useTextToSpeech } from '../../hooks/useTextToSpeech';
import { useCamera } from '../../hooks/useCamera';
import ErrorBoundary from '../../components/ErrorBoundary';
import { Suspense } from 'react';

// Voice options
const voiceOptions = [
  { id: 'UgBBYS2sOqTuMpoF3BR0', name: 'Mark - Natural (default)' },
  { id: 'g6xIsTj2HwM6VR4iXFCw', name: 'Jessica' },
  { id: 'TbMNBJ27fH2U0VgpSNko', name: 'Lori - Happy & Sweet' },
  { id: 'OYTbf65OHHFELVut7v2H', name: 'Hope - Natural' },
  { id: 'L0Dsvb3SLTyegXwtm47J', name: 'Archer - Calm British' },
  { id: 'kENkNtk0xyzG09WW40xE', name: 'Marcel - French' },
  { id: 'IKne3meq5aSn9XLyUdCD', name: 'Sara - Spanish' },
  { id: 'pBZVCk298iJlHAcHQwLr', name: 'Leoni - Warm & Soothing' },
  { id: 'wgHvco1wiREKN0BdyVx5', name: 'Drew - Meditative' },
  { id: 'zQzvQBubVkDWYuqJYMFn', name: 'Oxley - Intimate Baritone' },
  { id: 'A9evEp8yGjv4c3WsIKuY', name: 'Ralf - Clear & Wise' },
  { id: 'BL7YSL1bAkmW8U0JnU8o', name: 'Jen - Calm & Reflective' },
  { id: 'TTtB1x9U8PF0Vgf20IAP', name: 'Adrien - Deep & Comforting (French)' },
  { id: 'oeFgBesnArgN0SVGZu8Z', name: 'Daphné - Warm & Engaging (French)' }
];

function BridgeChatSession() {
  const { user, loading } = useAuth();
  const searchParams = useSearchParams();
  const bridgeId = searchParams.get('bridgeId');
  
  // State for settings
  const [settingsCollapsed, setSettingsCollapsed] = useState(true);
  const [voiceMode, setVoiceMode] = useState(true);
  const [autoIllustrate, setAutoIllustrate] = useState(false);
  
  // Add effect to debug settings state
  useEffect(() => {
    console.log('Settings collapsed state:', settingsCollapsed);
  }, [settingsCollapsed]);
  
  // Use our custom hooks
  const { 
    chatHistory, 
    setChatHistory,
    sendMessage: sendChatMessage,
    isSendingMessage,
    sessionStartTime,
    minutesActive
  } = useChat({
    mode: 'bridge',
    specialist: 'mediator',
    bridgeId
  });
  
  const {
    isRecording,
    recordingTime,
    isMediaRecorderSupported,
    startRecording,
    stopRecording
  } = useVoiceRecording({
    onTranscriptionComplete: (text) => {
      handleSendMessage(text);
    }
  });
  
  const {
    isPlaying,
    currentPlayingId,
    selectedVoice,
    setSelectedVoice,
    textToSpeech,
    playAudio,
    stopAudio
  } = useTextToSpeech();
  
  const {
    cameraEnabled,
    cameraError,
    capturedImage,
    videoRef,
    toggleCamera,
    captureImage,
    discardImage
  } = useCamera();
  
  // Message input state
  const [message, setMessage] = useState('');
  
  
  // Function to handle sending a message
  const handleSendMessage = async (text: string) => {
    // Capture image if camera is enabled
    let screenshot = capturedImage;
    if (cameraEnabled && !capturedImage) {
      screenshot = await captureImage();
    }
    
    // Send the message
    await sendChatMessage(text || '', screenshot);
    
    // Clear the message input and captured image
    setMessage('');
    discardImage();
  };
  
  // Function to play message audio
  const playMessageAudio = async (msg: any) => {
    if (msg.audio) {
      playAudio(msg.audio, msg.id || 'unknown');
    } else if (msg.role === 'assistant' && !msg.loading) {
      // Generate audio on-demand if not already available
      const audioUrl = await textToSpeech(msg.content);
      if (audioUrl) {
        // Update the message with the audio URL
        setChatHistory(prev => 
          prev.map(m => 
            m.id === msg.id 
              ? { ...m, audio: audioUrl }
              : m
          )
        );
        playAudio(audioUrl, msg.id || 'unknown');
      }
    }
  };
  
  // Function to generate illustration for a message
  const generateIllustrationForMessage = async (content: string, id: string) => {
    // This would be implemented similar to the chat page
    // For now, we'll just log it
    console.log(`Generating illustration for message: ${id}`);
    console.log(`Content: ${content}`);
  };
  
  // Toggle voice mode
  const toggleVoiceMode = () => {
    setVoiceMode(!voiceMode);
  };
  
  // Update auto-illustrate preference
  const updateAutoIllustratePreference = (enabled: boolean) => {
    setAutoIllustrate(enabled);
  };
  
  
  // Loading state
  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow pt-24 pb-16 px-4 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p>Loading your bridge session...</p>
          </div>
        </main>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <ChatHeader 
        title="Bridge Session" 
        subtitle="AI-facilitated communication bridge"
        sessionStartTime={sessionStartTime}
        minutesActive={minutesActive}
        sessionLength={60} // Bridges can have longer sessions
        backLink="/bridges"
        backText="Back to Bridges"
      />
      
      <main className="flex-grow pt-24 pb-24 px-4 relative">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 h-[calc(100vh-200px)]">
          {/* Main Chat Area */}
          <div className={`flex-grow flex flex-col ${settingsCollapsed ? 'md:w-3/4' : 'md:w-2/3'}`}>
            <ChatContainer 
              chatHistory={chatHistory}
              playMessageAudio={playMessageAudio}
              generateIllustrationForMessage={generateIllustrationForMessage}
              currentPlayingId={currentPlayingId}
              isPlaying={isPlaying}
            />
          </div>
          
          {/* Right Column - Settings only */}
          <div className="md:w-1/4 md:max-w-xs flex flex-col gap-4">
            
            {/* Settings toggle button */}
            <button 
              onClick={() => setSettingsCollapsed(!settingsCollapsed)}
              className="w-full p-2 rounded-lg bg-[var(--primary)]/20 hover:bg-[var(--primary)]/30 transition-colors flex items-center justify-center text-sm font-medium text-[var(--primary)]"
            >
              {settingsCollapsed ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  </svg>
                  Show Settings
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Hide Settings
                </>
              )}
            </button>
            
            {/* Settings Panel - Shown/hidden based on settingsCollapsed state */}
            {!settingsCollapsed && (
              <div className="card h-full overflow-hidden bg-[var(--background-alt)]/50 border-l border-[var(--primary)]/10">
                <div className="flex justify-between items-center p-4 border-b border-[var(--primary)]/10">
                  <h2 className="text-lg font-semibold text-[var(--primary)]">Session Settings</h2>
                  <button 
                    onClick={() => setSettingsCollapsed(true)}
                    className="p-1 rounded-full hover:bg-[var(--background-alt)] transition-colors"
                    aria-label="Close settings"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-foreground/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="p-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 410px)' }}>
                  {/* Voice Mode Toggle */}
                  <div className="mb-6">
                    <h3 className="text-sm font-medium mb-2">Voice Mode</h3>
                    <button 
                      className={`w-full btn-secondary text-sm flex items-center justify-center ${voiceMode ? 'bg-[var(--primary)]/10 border-[var(--primary)]/30' : ''}`}
                      onClick={toggleVoiceMode}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                      </svg>
                      {voiceMode ? 'Voice Mode: On' : 'Voice Mode: Off'}
                    </button>
                  </div>
                  
                  {/* Camera Mode Toggle */}
                  <div className="mb-6">
                    <h3 className="text-sm font-medium mb-2">Camera Mode</h3>
                    <button 
                      className={`w-full btn-secondary text-sm flex items-center justify-center ${cameraEnabled ? 'bg-[var(--primary)]/10 border-[var(--primary)]/30' : ''}`}
                      onClick={toggleCamera}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      {cameraEnabled ? 'Camera Mode: On' : 'Camera Mode: Off'}
                    </button>
                  </div>
                  
                  {/* Auto-Illustrate Toggle */}
                  <div className="mb-6">
                    <h3 className="text-sm font-medium mb-2">Illustrate Messages</h3>
                    <button 
                      className={`w-full btn-secondary text-sm flex items-center justify-center ${autoIllustrate ? 'bg-[var(--primary)]/10 border-[var(--primary)]/30' : ''}`}
                      onClick={() => updateAutoIllustratePreference(!autoIllustrate)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {autoIllustrate ? 'Auto-Illustrate: On' : 'Auto-Illustrate: Off'}
                    </button>
                    <p className="text-xs text-foreground/60 mt-2">
                      When enabled, messages will automatically generate illustrations.
                    </p>
                  </div>
                  
                  {/* Voice Selection - Only show if voice mode is on */}
                  {voiceMode && (
                    <div className="mb-6">
                      <h3 className="text-sm font-medium mb-2">Voice Selection</h3>
                      <select
                        className="w-full p-2 text-sm border border-black/10 dark:border-white/10 rounded-lg bg-[var(--background)]"
                        value={selectedVoice}
                        onChange={(e) => setSelectedVoice(e.target.value)}
                      >
                        {voiceOptions.map(voice => (
                          <option key={voice.id} value={voice.id}>
                            {voice.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                  
                  {/* Help Section - Last section */}
                  <div>
                    <h3 className="text-sm font-medium mb-2">Help</h3>
                    <div className="text-xs text-foreground/70 space-y-2">
                      <p>
                        <strong>Voice Recording:</strong> Use the microphone button to speak directly.
                      </p>
                      <p>
                        <strong>Voice Playback:</strong> Click "Listen" on any message to hear it read aloud.
                      </p>
                      <p>
                        <strong>Camera:</strong> Enable camera to share visual context during your conversation.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Camera Display */}
            {cameraEnabled && (
              <div className="card overflow-hidden bg-black rounded-lg mt-4">
                <div className="relative aspect-[4/3]">
                  {capturedImage ? (
                    // Show captured image
                    <img 
                      src={capturedImage} 
                      alt="Captured" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    // Show live camera feed
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-full object-cover"
                      style={{ display: 'block' }}
                    />
                  )}
                  
                  {/* Fallback message if video isn't showing */}
                  {!capturedImage && (
                    <div className="absolute inset-0 flex items-center justify-center text-white">
                      <span className="text-sm">Camera initializing...</span>
                    </div>
                  )}
                  
                  {/* Camera controls overlay */}
                  <div className="absolute bottom-2 right-2 flex space-x-2">
                    {capturedImage ? (
                      <>
                        {/* Discard button */}
                        <button
                          onClick={discardImage}
                          className="p-2 bg-red-500/70 rounded-full text-white hover:bg-red-500/90 transition-colors"
                          title="Discard image"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                        
                        {/* Send button */}
                        <button
                          onClick={() => handleSendMessage('')}
                          className="p-2 bg-[var(--primary)]/70 rounded-full text-white hover:bg-[var(--primary)]/90 transition-colors"
                          title="Send image"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                        </button>
                      </>
                    ) : (
                      <>
                        {/* Close camera button */}
                        <button
                          onClick={toggleCamera}
                          className="p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
                          title="Close camera"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
            
            {/* Show camera error if any */}
            {cameraError && (
              <div className="card p-3 bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 mt-2">
                <p className="text-sm">{cameraError}</p>
                <button 
                  onClick={() => setCameraError(null)} 
                  className="text-xs underline mt-1"
                >
                  Dismiss
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
      
      {/* Message Input */}
      <MessageInput 
        onSendMessage={handleSendMessage}
        onStartRecording={startRecording}
        onStopRecording={stopRecording}
        isRecording={isRecording}
        recordingTime={recordingTime}
        message={message}
        setMessage={setMessage}
        disabled={isSendingMessage}
        cameraEnabled={cameraEnabled}
        toggleCamera={toggleCamera}
        capturedImage={capturedImage}
        discardImage={discardImage}
        placeholder="Type your message here..."
        isMediaRecorderSupported={isMediaRecorderSupported}
      />
    </div>
  );
}

// Main component with Suspense boundary and ErrorBoundary
export default function BridgeChatPage() {
  return (
    <ErrorBoundary>
      <Suspense fallback={
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow pt-24 pb-16 px-4 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p>Loading your bridge session...</p>
            </div>
          </main>
        </div>
      }>
        <BridgeChatSession />
      </Suspense>
    </ErrorBoundary>
  );
}
