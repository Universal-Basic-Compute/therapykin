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
  
  // State for ratings
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [ratingSubmitted, setRatingSubmitted] = useState(false);
  const [overallRating, setOverallRating] = useState(3);
  const [understandingEmpathy, setUnderstandingEmpathy] = useState(3);
  const [helpfulnessOfAdvice, setHelpfulnessOfAdvice] = useState(3);
  const [sessionFlow, setSessionFlow] = useState(3);
  const [rememberingContext, setRememberingContext] = useState(3);
  const [feedbackComments, setFeedbackComments] = useState('');
  const [isSubmittingRating, setIsSubmittingRating] = useState(false);
  
  // State for settings
  const [settingsCollapsed, setSettingsCollapsed] = useState(true);
  const [voiceMode, setVoiceMode] = useState(true);
  const [autoIllustrate, setAutoIllustrate] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  
  // Function to copy the current URL to clipboard
  const copyBridgeLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url)
      .then(() => {
        setLinkCopied(true);
        setTimeout(() => setLinkCopied(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy link: ', err);
      });
  };
  
  // Function to submit rating
  const submitRating = async () => {
    if (!bridgeId) return;
    
    setIsSubmittingRating(true);
    
    try {
      const response = await fetch('/api/bridges/submit-rating', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bridgeId,
          overallRating,
          understandingEmpathy,
          helpfulnessOfAdvice,
          sessionFlow,
          rememberingContext,
          comments: feedbackComments
        }),
      });
      
      if (!response.ok) {
        throw new Error(`Failed to submit rating: ${response.status}`);
      }
      
      console.log('Bridge session rating submitted successfully');
      setRatingSubmitted(true);
      setShowRatingModal(false);
      
      // Add a thank you message to the chat
      setChatHistory(prev => [
        ...prev,
        { 
          role: 'assistant', 
          content: "Thank you for your feedback! Your rating helps us improve the bridge experience.",
          id: 'rating-thanks-' + Date.now()
        }
      ]);
    } catch (error) {
      console.error('Error submitting bridge session rating:', error);
      alert('Failed to submit your feedback. Please try again.');
    } finally {
      setIsSubmittingRating(false);
    }
  };
  
  // Add effect to debug settings state
  useEffect(() => {
    console.log('Settings collapsed state:', settingsCollapsed);
  }, [settingsCollapsed]);
  
  // Message input state
  const [message, setMessage] = useState('');
  
  // Use our custom hooks - MUST BE BEFORE any useEffect that uses its values
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
  
  // Effect to show rating modal when session ends
  useEffect(() => {
    // Check if session has reached 60 minutes
    if (sessionStartTime && minutesActive >= 60 && !ratingSubmitted && !showRatingModal) {
      console.log('Session has ended, showing rating modal');
      setShowRatingModal(true);
    }
  }, [sessionStartTime, minutesActive, ratingSubmitted, showRatingModal]);
  
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
    setCameraError,
    capturedImage,
    videoRef,
    toggleCamera,
    captureImage,
    discardImage
  } = useCamera();
  
  // Add effect to automatically play audio for new assistant messages
  useEffect(() => {
    // Check if there are any messages and if voice mode is enabled
    if (chatHistory.length > 0 && voiceMode) {
      // Get the last message
      const lastMessage = chatHistory[chatHistory.length - 1];
      
      // Only auto-play if it's an assistant message, not loading, and doesn't already have audio
      if (lastMessage.role === 'assistant' && !lastMessage.loading && !lastMessage.audio) {
        // Generate and play audio for the message
        (async () => {
          try {
            const audioUrl = await textToSpeech(lastMessage.content);
            if (audioUrl) {
              // Update the message with the audio URL
              setChatHistory(prev => 
                prev.map(m => 
                  m.id === lastMessage.id 
                    ? { ...m, audio: audioUrl }
                    : m
                )
              );
              // Play the audio
              playAudio(audioUrl, lastMessage.id || 'unknown');
            }
          } catch (error) {
            console.error('Error auto-playing message audio:', error);
          }
        })();
      }
    }
  }, [chatHistory, voiceMode, textToSpeech, playAudio, setChatHistory]); // Dependencies
  
  // Add effect to send initial system message when entering a bridge session
  useEffect(() => {
    // Only send the initial message if we have a user, bridgeId, and chatHistory is empty
    if (user && bridgeId && chatHistory.length === 0 && !isSendingMessage) {
      console.log('Sending initial bridge session message');
      
      // Show loading indicator
      setChatHistory([
        { 
          role: 'assistant', 
          content: '...', 
          id: 'initial-loading',
          loading: true
        }
      ]);
      
      // Get the user's pseudonym or generate one if missing
      let userPseudonym = user?.pseudonym || '';
      if (!userPseudonym) {
        console.log('Pseudonym missing for user:', user.email);
        // You would need to import the generatePseudonymFromEmail function
        // const generatedPseudonym = generatePseudonymFromEmail(user.email || '');
        // userPseudonym = generatedPseudonym.name;
        userPseudonym = user.firstName || 'User'; // Fallback if no pseudonym generation function
        console.log(`Using fallback pseudonym for user: ${userPseudonym}`);
      }
      
      // Send the "New bridge session started" message
      (async () => {
        try {
          // Create a system message to start the session
          const systemMessage = `<system>New bridge session started with ${user.firstName}</system>`;
          
          // Send the message to the API
          const response = await fetch('/api/bridges/messages', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              content: systemMessage,
              firstName: user.firstName,
              pseudonym: userPseudonym,
              bridgeId: bridgeId,
              mode: 'bridge_opening'
            }),
          });
          
          if (!response.ok) {
            throw new Error(`Failed to send initial message: ${response.status}`);
          }
          
          const data = await response.json();
          console.log('Initial bridge message response:', data);
          
          // Update chat history with the response
          const audioUrl = voiceMode ? await textToSpeech(data.content) : '';
          setChatHistory([
            { 
              role: 'assistant', 
              content: data.content,
              id: 'initial-' + Date.now(),
              audio: audioUrl
            }
          ]);
            
          // Play audio if voice mode is enabled
          if (voiceMode && audioUrl) {
            playAudio(audioUrl, 'initial-' + Date.now());
          }
        } catch (error) {
          console.error('Error sending initial bridge message:', error);
          // Update with error message
          setChatHistory([
            { 
              role: 'assistant', 
              content: "I'm sorry, I encountered an error starting the bridge session. Please try again.",
              id: 'error-' + Date.now()
            }
          ]);
        }
      })();
    }
  }, [user, bridgeId, chatHistory.length, isSendingMessage, voiceMode, textToSpeech, playAudio]);
  
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
        backText=""
        className="fixed top-0 left-0 right-0 z-20 bg-[var(--background)]"
      />
      
      <main className="flex-grow pt-32 pb-24 px-4 relative">
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
            
            {/* Debug message - can be removed after fixing */}
            <div className="text-xs text-foreground/60 mb-2">
              Settings state: {settingsCollapsed ? 'Collapsed' : 'Expanded'}
            </div>
            
            {/* Settings toggle button */}
            <button 
              onClick={() => {
                console.log('Current state:', settingsCollapsed);
                setSettingsCollapsed(!settingsCollapsed);
                console.log('New state:', !settingsCollapsed);
              }}
              className="w-full p-2 mt-4 rounded-lg bg-[var(--primary)] hover:bg-[var(--primary-dark)] transition-colors flex items-center justify-center text-sm font-medium text-white"
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
            
            {/* Copy Link button */}
            <button 
              onClick={copyBridgeLink}
              className="w-full p-2 mt-2 rounded-lg bg-[var(--background-alt)] hover:bg-[var(--background-alt)]/80 border border-[var(--primary)]/20 transition-colors flex items-center justify-center text-sm font-medium text-foreground/80"
            >
              {linkCopied ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Link Copied!
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                  Copy Bridge Link
                </>
              )}
            </button>
            
            {/* Settings Panel - Shown/hidden based on settingsCollapsed state */}
            {!settingsCollapsed && (
              <div className="card bg-[var(--background-alt)] border border-[var(--primary)]/20 rounded-lg shadow-lg">
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
                  toggleCollapsed={() => setSettingsCollapsed(true)}
                />
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
      
      {/* Rating Modal */}
      {showRatingModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-[var(--background)] rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-[var(--primary)]">Rate Your Bridge Session</h2>
                <button 
                  onClick={() => setShowRatingModal(false)}
                  className="text-foreground/60 hover:text-foreground"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <p className="mb-6 text-foreground/70">
                Your feedback helps us improve the bridge experience. All ratings are confidential.
              </p>
              
              <div className="space-y-6">
                {/* Overall Rating */}
                <div>
                  <h3 className="text-lg font-medium mb-2">Overall Experience</h3>
                  <div className="flex gap-2 justify-center">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => setOverallRating(rating)}
                        className={`w-12 h-12 rounded-full flex items-center justify-center text-xl transition-all ${
                          rating <= overallRating
                            ? 'bg-yellow-400 text-yellow-900'
                            : 'bg-[var(--background-alt)] text-foreground/40'
                        }`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Understanding & Empathy */}
                <div>
                  <div className="flex justify-between mb-2">
                    <h3 className="text-lg font-medium">Understanding & Empathy</h3>
                    <span className="text-sm text-foreground/70">
                      {understandingEmpathy === 1 ? 'Poor' : 
                       understandingEmpathy === 2 ? 'Fair' :
                       understandingEmpathy === 3 ? 'Good' :
                       understandingEmpathy === 4 ? 'Very Good' : 'Excellent'}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={understandingEmpathy}
                    onChange={(e) => setUnderstandingEmpathy(parseInt(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-foreground/60">
                    <span>Poor</span>
                    <span>Excellent</span>
                  </div>
                </div>
                
                {/* Helpfulness of Advice */}
                <div>
                  <div className="flex justify-between mb-2">
                    <h3 className="text-lg font-medium">Helpfulness of Advice</h3>
                    <span className="text-sm text-foreground/70">
                      {helpfulnessOfAdvice === 1 ? 'Not Helpful' : 
                       helpfulnessOfAdvice === 2 ? 'Slightly Helpful' :
                       helpfulnessOfAdvice === 3 ? 'Helpful' :
                       helpfulnessOfAdvice === 4 ? 'Very Helpful' : 'Extremely Helpful'}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={helpfulnessOfAdvice}
                    onChange={(e) => setHelpfulnessOfAdvice(parseInt(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-foreground/60">
                    <span>Not Helpful</span>
                    <span>Very Helpful</span>
                  </div>
                </div>
                
                {/* Session Flow & Navigation */}
                <div>
                  <div className="flex justify-between mb-2">
                    <h3 className="text-lg font-medium">Session Flow & Navigation</h3>
                    <span className="text-sm text-foreground/70">
                      {sessionFlow === 1 ? 'Confusing' : 
                       sessionFlow === 2 ? 'Somewhat Clear' :
                       sessionFlow === 3 ? 'Clear' :
                       sessionFlow === 4 ? 'Very Clear' : 'Intuitive'}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={sessionFlow}
                    onChange={(e) => setSessionFlow(parseInt(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-foreground/60">
                    <span>Confusing</span>
                    <span>Intuitive</span>
                  </div>
                </div>
                
                {/* Remembering Previous Context */}
                <div>
                  <div className="flex justify-between mb-2">
                    <h3 className="text-lg font-medium">Remembering Previous Context</h3>
                    <span className="text-sm text-foreground/70">
                      {rememberingContext === 1 ? 'Poor Memory' : 
                       rememberingContext === 2 ? 'Some Memory' :
                       rememberingContext === 3 ? 'Good Memory' :
                       rememberingContext === 4 ? 'Very Good Memory' : 'Excellent Memory'}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={rememberingContext}
                    onChange={(e) => setRememberingContext(parseInt(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-foreground/60">
                    <span>Poor Memory</span>
                    <span>Excellent Memory</span>
                  </div>
                </div>
                
                {/* Additional Comments */}
                <div>
                  <h3 className="text-lg font-medium mb-2">Additional Comments</h3>
                  <textarea
                    value={feedbackComments}
                    onChange={(e) => setFeedbackComments(e.target.value)}
                    placeholder="What went well? What could be improved?"
                    className="w-full p-3 border border-black/10 dark:border-white/10 rounded-lg bg-[var(--background)] min-h-[100px]"
                  />
                </div>
                
                <div className="flex justify-end gap-4 mt-6">
                  <button
                    onClick={() => setShowRatingModal(false)}
                    className="btn-secondary"
                  >
                    Skip for Now
                  </button>
                  <button
                    onClick={submitRating}
                    disabled={isSubmittingRating}
                    className="btn-primary flex items-center"
                  >
                    {isSubmittingRating ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Submitting...
                      </>
                    ) : (
                      'Submit Feedback'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
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
