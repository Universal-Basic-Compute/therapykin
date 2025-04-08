'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useSearchParams } from 'next/navigation';
import Header from '../../components/Header';
import ChatContainer from '../../components/chat/ChatContainer';
import MessageInput from '../../components/chat/MessageInput';
import ChatHeader from '../../components/chat/ChatHeader';
import ChatSettings from '../../components/chat/ChatSettings';
import BridgeParticipantCard from '../../components/bridges/BridgeParticipantCard';
import BridgeMediationControls from '../../components/bridges/BridgeMediationControls';
import BridgeProgress from '../../components/bridges/BridgeProgress';
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
  
  // State for bridge-specific features
  const [otherParticipant, setOtherParticipant] = useState<any>(null);
  const [isLoadingParticipant, setIsLoadingParticipant] = useState(true);
  const [mediationLevel, setMediationLevel] = useState<'light' | 'balanced' | 'directive'>('balanced');
  const [bridgeProgress, setBridgeProgress] = useState(0);
  const [relationshipType, setRelationshipType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [milestones, setMilestones] = useState<any[]>([]);
  const [nextSteps, setNextSteps] = useState<string[]>([]);
  const [settingsCollapsed, setSettingsCollapsed] = useState(true);
  const [voiceMode, setVoiceMode] = useState(true);
  const [autoIllustrate, setAutoIllustrate] = useState(false);
  
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
  
  // Fetch bridge details
  useEffect(() => {
    if (!bridgeId || !user) return;
    
    async function fetchBridgeDetails() {
      setIsLoadingParticipant(true);
      try {
        // This would be a real API call in production
        // For now, we'll simulate it with a timeout
        setTimeout(() => {
          setOtherParticipant({
            id: 'participant-123',
            name: 'Alex Johnson',
            status: 'online',
            lastActive: new Date().toISOString()
          });
          
          setRelationshipType('Family Relationship');
          setStartDate(new Date().toISOString());
          setBridgeProgress(35);
          setMilestones([
            {
              id: 'milestone-1',
              title: 'Initial Connection',
              description: 'Both participants joined the bridge',
              completed: true,
              date: new Date().toISOString()
            },
            {
              id: 'milestone-2',
              title: 'Shared Perspectives',
              description: 'Each person shared their viewpoint',
              completed: true,
              date: new Date().toISOString()
            },
            {
              id: 'milestone-3',
              title: 'Common Ground',
              description: 'Identify areas of agreement',
              completed: false
            },
            {
              id: 'milestone-4',
              title: 'Action Plan',
              description: 'Create a plan for moving forward',
              completed: false
            }
          ]);
          
          setNextSteps([
            'Discuss a specific situation where you felt misunderstood',
            'Share what you appreciate about each other',
            'Identify one small change each person could make'
          ]);
          
          setIsLoadingParticipant(false);
        }, 1500);
      } catch (error) {
        console.error('Error fetching bridge details:', error);
        setIsLoadingParticipant(false);
      }
    }
    
    fetchBridgeDetails();
  }, [bridgeId, user]);
  
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
  
  // Handle mediation level change
  const handleChangeMediationLevel = (level: 'light' | 'balanced' | 'directive') => {
    setMediationLevel(level);
    // In a real implementation, we would send this to the API
    console.log(`Changed mediation level to: ${level}`);
  };
  
  // Handle request clarification
  const handleRequestClarification = () => {
    // In a real implementation, we would send this to the API
    console.log('Requested clarification');
  };
  
  // Handle request private session
  const handleRequestPrivateSession = () => {
    // In a real implementation, we would send this to the API
    console.log('Requested private session');
  };
  
  // Handle flag sensitive topic
  const handleFlagSensitiveTopic = (topic: string) => {
    // In a real implementation, we would send this to the API
    console.log(`Flagged sensitive topic: ${topic}`);
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
        subtitle={otherParticipant ? `Connected with ${otherParticipant.name}` : 'Loading participant...'}
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
          
          {/* Right Column - Bridge-specific components */}
          <div className="md:w-1/4 md:max-w-xs flex flex-col gap-4">
            {/* Bridge Participant Card */}
            <BridgeParticipantCard 
              participant={otherParticipant}
              isLoading={isLoadingParticipant}
            />
            
            {/* Bridge Mediation Controls */}
            <BridgeMediationControls 
              mediationLevel={mediationLevel}
              onChangeMediationLevel={handleChangeMediationLevel}
              onRequestClarification={handleRequestClarification}
              onRequestPrivateSession={handleRequestPrivateSession}
              onFlagSensitiveTopic={handleFlagSensitiveTopic}
            />
            
            {/* Bridge Progress */}
            <BridgeProgress 
              progress={bridgeProgress}
              milestones={milestones}
              relationshipType={relationshipType}
              startDate={startDate}
              nextSteps={nextSteps}
            />
            
            {/* Settings toggle button */}
            <button 
              onClick={() => setSettingsCollapsed(!settingsCollapsed)}
              className="w-full mt-3 p-2 rounded-lg bg-[var(--primary)]/20 hover:bg-[var(--primary)]/30 transition-colors flex items-center justify-center text-sm font-medium text-[var(--primary)]"
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
              <ChatSettings 
                voiceMode={voiceMode}
                toggleVoiceMode={toggleVoiceMode}
                selectedVoice={selectedVoice}
                updatePreferredVoice={setSelectedVoice}
                voiceOptions={voiceOptions}
                cameraEnabled={cameraEnabled}
                toggleCamera={toggleCamera}
                autoIllustrate={autoIllustrate}
                updateAutoIllustratePreference={updateAutoIllustratePreference}
                collapsed={settingsCollapsed}
                toggleCollapsed={() => setSettingsCollapsed(!settingsCollapsed)}
              />
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
                  {!cameraStream && !capturedImage && (
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
        placeholder="Type your message here... Your bridge partner will see a mediated version."
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
