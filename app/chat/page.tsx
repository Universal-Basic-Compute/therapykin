'use client';

import React, { useState, useRef, useEffect, Suspense } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { sendMessageToKinOS, fetchMessagesFromKinOS } from '../utils/kinos';
import { createSession, getOngoingSession } from '../utils/airtable';
import { fetchSpecialists, isValidSpecialist } from '../utils/client-specialists';
import { generatePseudonymFromEmail } from '../utils/pseudonyms';

// Add global type for streaming callbacks
declare global {
  interface Window {
    streamingCallbacks: {
      [key: string]: (chunk: string, fullText: string, isComplete?: boolean) => void;
    };
  }
}

// Initialize the streaming callbacks object
if (typeof window !== 'undefined') {
  window.streamingCallbacks = window.streamingCallbacks || {};
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  id?: string;
  loading?: boolean;
  audio?: string; // Add this to store audio URL
  image?: string; // Add this to store image URL
  generatingImage?: boolean; // Add this to track if an image is being generated
  imageLoaded?: boolean; // Add this to track when the image has loaded
  skipAutoIllustrate?: boolean; // Add this to skip auto-illustration for certain messages
  animating?: boolean; // Add this to track if the message is currently animating
  lastChunk?: string; // Add this to store the last chunk of text for animation
}

// Component that uses useSearchParams
function ChatSessionWithSearchParams() {
  const { user, loading } = useAuth();
  const searchParams = useSearchParams();
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [voiceMode, setVoiceMode] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPlayingId, setCurrentPlayingId] = useState<string | null>(null);
  const [selectedVoice, setSelectedVoice] = useState('L0Dsvb3SLTyegXwtm47J'); // Default to Archer - Calm British
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recordingTimerRef = useRef<number | null>(null); // Change to number type for browser compatibility
  
  
  // Session tracking
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [sessionStartTime, setSessionStartTime] = useState<Date | null>(null);
  const [sessionMode, setSessionMode] = useState<string | null>(null);
  const [minutesActive, setMinutesActive] = useState(0);
  const [sessionEnded, setSessionEnded] = useState(false);
  const [sessionLength, setSessionLength] = useState<number>(30); // Default to 30 minutes
  const [showSettings, setShowSettings] = useState<boolean>(false); // For settings modal
  const [settingsCollapsed, setSettingsCollapsed] = useState(true); // Default to collapsed
  const [hasSessionsRemaining, setHasSessionsRemaining] = useState<boolean | null>(null);
  const [isCheckingSubscription, setIsCheckingSubscription] = useState(true);
  const [isUpdatingPreference, setIsUpdatingPreference] = useState(false);
  const [halfwayMessageSent, setHalfwayMessageSent] = useState(false);
  const [closingMessageSent, setClosingMessageSent] = useState(false);
  const [isInitialMessageLoading, setIsInitialMessageLoading] = useState(false);
  const [selectedSpecialist, setSelectedSpecialist] = useState<string>("generalist");
  const [specialists, setSpecialists] = useState<Array<{id: string, name: string, description: string, hidden?: boolean}>>([
    { id: 'generalist', name: 'General Therapist', description: 'General therapeutic support for various concerns' },
    { id: 'therapykindouble', name: 'Therapeutic Double (you)', description: 'A therapeutic reflection of yourself, helping you explore your thoughts from a new perspective' },
    { id: 'welcome', name: 'Welcome Specialist', description: 'Helps new users get started with TherapyKin', hidden: true }
  ]);
  // Add state for session summary image
  const [sessionImageRequested, setSessionImageRequested] = useState(false);
  const [sessionImage, setSessionImage] = useState<string | null>(null);
  const [autoIllustrate, setAutoIllustrate] = useState<boolean>(false);
  
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

  // Additional voices for reference:
  // Clara (Casual Conversational) - EIsgvJT3rwoPvRFG6c4n
  // Cassidy (Confident Female Podcaster) - 56AoDkrOh6qfVPDXZ7Pt  
  // Kevin (Career & Life Coach) - 1fz2mW1imKTf5Ryjk5su
  
  // Add a ref for the chat container
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.onplay = () => setIsPlaying(true);
    audioRef.current.onended = () => {
      setIsPlaying(false);
      setCurrentPlayingId(null);
    };
    audioRef.current.onerror = () => {
      setIsPlaying(false);
      setCurrentPlayingId(null);
    };
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);
  
  // Add a state to track if preferences have been loaded
  const [preferencesLoaded, setPreferencesLoaded] = useState(false);
  
  // Fetch available specialists
  useEffect(() => {
    async function loadSpecialists() {
      try {
        const specialistsList = await fetchSpecialists();
        // Make sure to preserve the welcome specialist's hidden property
        const updatedSpecialists = specialistsList.map(specialist => {
          if (specialist.id === 'welcome') {
            return { ...specialist, hidden: true };
          }
          return specialist;
        });
        setSpecialists(updatedSpecialists);
        console.log('Loaded specialists:', updatedSpecialists);
      } catch (error) {
        console.error('Error loading specialists:', error);
      }
    }
    
    loadSpecialists();
  }, []);

  // Check if user has sessions remaining and fetch preferred session length
  useEffect(() => {
    async function checkRemainingSession() {
      if (!user) return;
      
      setIsCheckingSubscription(true);
      try {
        // First, fetch the session stats to get the accurate count of used sessions
        const statsResponse = await fetch('/api/sessions/stats');
        
        if (!statsResponse.ok) {
          console.error('Failed to fetch session stats:', statsResponse.status, statsResponse.statusText);
          setHasSessionsRemaining(false);
          return;
        }
        
        const statsData = await statsResponse.json();
        console.log('Session stats received:', statsData);
        
        // Get the total sessions used from the stats, but exclude ongoing sessions
        let totalSessionsUsed = statsData.stats?.totalSessions || 0;
        
        // Check if there are any ongoing sessions in the stats
        if (statsData.stats?.ongoingSessions && statsData.stats.ongoingSessions > 0) {
          // Subtract ongoing sessions from the total count
          totalSessionsUsed -= statsData.stats.ongoingSessions;
          console.log(`Excluding ${statsData.stats.ongoingSessions} ongoing sessions from the count`);
        }
        
        console.log('Total completed sessions used according to stats:', totalSessionsUsed);
        
        // Then fetch the subscription data
        const response = await fetch('/api/users/subscription');
        
        if (!response.ok) {
          console.error('Failed to fetch subscription data:', response.status, response.statusText);
          setHasSessionsRemaining(false);
          return;
        }
        
        const data = await response.json();
        console.log('Subscription data received:', data);
        
        if (data.subscription) {
          // If premium plan, they always have sessions
          if (data.subscription.plan.toLowerCase() === 'premium') {
            setHasSessionsRemaining(true);
            console.log('User has premium plan with unlimited sessions');
          } else {
            // Use the exact same calculation as in the dashboard
            // Define sessions per plan
            const sessionsPerPlan: {[key: string]: number} = {
              'free': 3,
              'basic': 8,
              'standard': 30,
              'premium': Infinity
            };
            
            // Get total sessions allowed for the plan
            const totalAllowed = sessionsPerPlan[data.subscription.plan.toLowerCase()] || 0;
            
            // Calculate remaining sessions using the same logic as the dashboard
            // but with the accurate totalSessionsUsed from the stats API
            let remainingSessions = 0;
            if (data.subscription.plan.toLowerCase() === 'free') {
              remainingSessions = Math.max(0, totalAllowed - totalSessionsUsed);
            } else {
              // For paid plans, it's a monthly allocation
              remainingSessions = Math.max(0, totalAllowed);
            }
            
            console.log(`Plan: ${data.subscription.plan}, Total allowed: ${totalAllowed}, Used: ${totalSessionsUsed}, Remaining: ${remainingSessions}`);
            
            const hasRemaining = remainingSessions > 0;
            console.log(`User has ${remainingSessions} sessions remaining. Can start session: ${hasRemaining}`);
            setHasSessionsRemaining(hasRemaining);
            
            // Force a re-render if no sessions remaining
            if (!hasRemaining) {
              console.log('No sessions remaining, forcing re-render');
              // This will cause the component to re-render with the "out of sessions" UI
              setSessionId(null);
            }
          }
        } else {
          console.error('No subscription data found');
          setHasSessionsRemaining(false);
        }
      } catch (error) {
        console.error('Error fetching subscription data:', error);
        setHasSessionsRemaining(false);
      } finally {
        setIsCheckingSubscription(false);
      }
    }

    checkRemainingSession();
  }, [user]);
  
  // Fetch user's preferences
  useEffect(() => {
    async function fetchUserPreferences() {
      if (!user) return;
      
      try {
        console.log('Fetching user preferences...', user);
        console.log('User pseudonym:', user.pseudonym || 'none');
        const response = await fetch('/api/users/preferences');
        
        if (response.ok) {
          const data = await response.json();
          if (data.preferences) {
            // Set the session length to the user's preference
            if (data.preferences.preferredSessionLength) {
              setSessionLength(data.preferences.preferredSessionLength);
              console.log(`Loaded user's preferred session length: ${data.preferences.preferredSessionLength} minutes`);
            }
            
            // Set the voice to the user's preference
            if (data.preferences.preferredVoice) {
              setSelectedVoice(data.preferences.preferredVoice);
              console.log(`Loaded user's preferred voice: ${data.preferences.preferredVoice}`);
            }
            
            // Check URL parameter first, then fall back to user preference
            const specialistParam = searchParams.get('specialist');
            if (specialistParam && isValidSpecialist(specialistParam)) {
              // Just set the selected specialist without calling updateSelectedSpecialist
              setSelectedSpecialist(specialistParam);
              console.log(`Using specialist from URL parameter: ${specialistParam}`);
              
              // Update the user's preference in the background without resetting the conversation
              fetch('/api/users/preferences', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  preferredSpecialist: specialistParam,
                }),
              }).then(response => {
                if (!response.ok) {
                  console.error(`Failed to update specialist preference: ${response.status}`);
                } else {
                  console.log(`Updated specialist preference to: ${specialistParam}`);
                }
              }).catch(error => {
                console.error('Error updating specialist preference:', error);
              });
            } else if (data.preferences.preferredSpecialist) {
              setSelectedSpecialist(data.preferences.preferredSpecialist);
              console.log(`Loaded user's preferred specialist: ${data.preferences.preferredSpecialist}`);
            }
            
            // Set camera preference if available
            if (data.preferences.cameraEnabled !== undefined) {
              setCameraEnabled(data.preferences.cameraEnabled);
              console.log(`Loaded user's camera preference: ${data.preferences.cameraEnabled}`);
              
              // If camera should be enabled, initialize it
              if (data.preferences.cameraEnabled) {
                // We'll initialize camera after component is fully mounted
                setTimeout(() => {
                  toggleCamera();
                }, 1000);
              }
            }
            
            // Set auto-illustrate preference if available
            if (data.preferences.autoIllustrate !== undefined) {
              setAutoIllustrate(data.preferences.autoIllustrate);
              console.log(`Loaded user's auto-illustrate preference: ${data.preferences.autoIllustrate}`);
            }
          }
        } else {
          console.error('Failed to fetch user preferences:', response.status);
        }
      } catch (error) {
        console.error('Error fetching user preferences:', error);
      } finally {
        // Mark preferences as loaded, even if there was an error
        setPreferencesLoaded(true);
        console.log('Preferences loading complete');
      }
    }
    
    fetchUserPreferences();
  }, [user, searchParams]); // Add searchParams as a dependency

  // Create a session when the component mounts
  useEffect(() => {
    async function initializeSession() {
      // Add an explicit check here to prevent session creation if no sessions remain
      if (!user) {
        console.log('Cannot initialize session: user is null');
        return;
      }
      
      // Wait for preferences to be loaded
      if (!preferencesLoaded) {
        console.log('Waiting for preferences to be loaded before initializing session');
        return;
      }
      
      // Strict check for sessions remaining
      if (hasSessionsRemaining !== true) {
        console.log('Cannot initialize session: no sessions remaining');
        return;
      }
      
      if (!sessionId) {
        try {
          // First, check if there's an ongoing session
          const ongoingSession = await getOngoingSession(user.email);
          
          if (ongoingSession) {
            // Check if the session is still active based on its creation time and length
            const startTime = new Date(ongoingSession.createdAt);
            const now = new Date();
            const elapsedMinutes = Math.floor((now.getTime() - startTime.getTime()) / (60 * 1000));
            const sessionLengthValue = ongoingSession.sessionLength || sessionLength;
            
            // If the session is still active (hasn't exceeded its length)
            if (elapsedMinutes < sessionLengthValue) {
              // Use the existing session
              setSessionId(ongoingSession.id);
              setSessionStartTime(startTime);
              console.log('Using existing session:', ongoingSession.id, 'started at', startTime);
              
              // Set the session length from the ongoing session
              if (ongoingSession.sessionLength) {
                setSessionLength(ongoingSession.sessionLength);
              }
              
              // Set the specialist from the ongoing session
              if (ongoingSession.specialist) {
                setSelectedSpecialist(ongoingSession.specialist);
                console.log(`Using specialist from ongoing session: ${ongoingSession.specialist}`);
              }
              
              // Check if rating has been submitted for this session
              if (ongoingSession.ratingSubmitted) {
                setRatingSubmitted(true);
                console.log('Rating already submitted for this session');
              }
              
              // Calculate how many minutes have already passed
              setMinutesActive(elapsedMinutes);
              console.log(`Session already active for ${elapsedMinutes} minutes of ${sessionLengthValue} minutes total`);
            } else {
              // Session has expired, create a new one
              console.log(`Previous session expired (${elapsedMinutes} minutes elapsed, limit was ${sessionLengthValue})`);
              
              // Double-check that the user still has sessions remaining before creating a new one
              if (hasSessionsRemaining === true) {
                await createNewSession();
              } else {
                console.log('Cannot create new session: no sessions remaining');
              }
            }
          } else {
            // No previous session found, create a new one
            if (hasSessionsRemaining === true) {
              await createNewSession();
            } else {
              console.log('Cannot create new session: no sessions remaining');
            }
          }
        } catch (error) {
          console.error('Failed to initialize session:', error);
        }
      }
    }
    
    // Extract the new session creation logic to a separate function
    async function createNewSession() {
      // Add null check for user
      if (!user) {
        console.error('Cannot create session: user is null');
        return;
      }
      
      // Add a strict check for sessions remaining
      if (hasSessionsRemaining !== true) {
        console.error('Cannot create session: no sessions remaining');
        return;
      }
      
      try {
        console.log(`Creating new session for ${user.email} with length ${sessionLength} and specialist ${selectedSpecialist}`);
        
        // Pass the selectedSpecialist to the createSession function
        const session = await createSession(user.email, sessionLength, selectedSpecialist);
        
        if (!session || !session.id) {
          throw new Error('Invalid session data returned');
        }
        
        console.log('Session created successfully:', session);
        
        setSessionId(session.id);
        const startTime = new Date(session.createdAt);
        setSessionStartTime(startTime);
        setMinutesActive(0);
        setHalfwayMessageSent(false); // Reset the halfway message flag
        setClosingMessageSent(false); // Reset the closing message flag
      } catch (error) {
        console.error('Failed to create new session:', error);
        
        // Show an error message to the user
        alert('There was a problem starting your session. Please try again or contact support if the issue persists.');
      }
      
      // Show loading indicator
      setIsInitialMessageLoading(true);
      setChatHistory([
        { 
          role: 'assistant', 
          content: '...', 
          id: 'initial-loading',
          loading: true
        }
      ]);
      
      // Send the "New session started" message to the API
      const welcomeMessage = `<system>New ${sessionLength} minute session started</system>`;
      // Use the user's pseudonym or generate one if missing
      let userPseudonym = user?.pseudonym;
      if (!userPseudonym) {
        console.log('Pseudonym missing for user:', user?.email);
        // Generate a pseudonym from the email
        const generatedPseudonym = generatePseudonymFromEmail(user?.email || '');
        userPseudonym = generatedPseudonym.name;
        console.log(`Generated pseudonym for user: ${userPseudonym}`);
        
        // Save this pseudonym to the user's record
        try {
          const response = await fetch('/api/users/update-pseudonym', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              pseudonym: userPseudonym
            }),
          });
          
          if (response.ok) {
            console.log('Saved generated pseudonym to user record');
          } else {
            console.error('Failed to save generated pseudonym');
          }
        } catch (error) {
          console.error('Error saving generated pseudonym:', error);
        }
      }
      console.log(`Using pseudonym for welcome message: ${userPseudonym}`);
          
      const response = await sendMessageToKinOS(
        welcomeMessage,
        user.firstName,
        [], // attachments
        [], // images
        'session_opening', // Use session_opening mode
        selectedSpecialist, // Add selected specialist
        null, // No screenshot
        userPseudonym // Use the generated or existing pseudonym
      );
      
      // Update chat history with the response
      setIsInitialMessageLoading(false);
      const audioUrl = voiceMode ? await textToSpeech(response) : '';
      setChatHistory([
        { 
          role: 'assistant', 
          content: response,
          id: 'initial-' + Date.now(),
          audio: audioUrl
        }
      ]);
        
      // Play audio if voice mode is enabled
      if (voiceMode && audioUrl) {
        playAudio(audioUrl, 'initial-' + Date.now());
      }
      
      console.log('New session created successfully');
    }

    // Only run initializeSession when user, hasSessionsRemaining, and preferencesLoaded are all set
    if (user && hasSessionsRemaining !== null && preferencesLoaded) {
      console.log('All conditions met, initializing session');
      initializeSession();
    }
  }, [user, sessionId, hasSessionsRemaining, preferencesLoaded]); // Add preferencesLoaded as a dependency
  
  // Add state to track if a message is being sent
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  
  // Add state for session rating
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [ratingSubmitted, setRatingSubmitted] = useState(false);
  const [overallRating, setOverallRating] = useState(3);
  const [understandingEmpathy, setUnderstandingEmpathy] = useState(3);
  const [helpfulnessOfAdvice, setHelpfulnessOfAdvice] = useState(3);
  const [sessionFlow, setSessionFlow] = useState(3);
  const [rememberingContext, setRememberingContext] = useState(3);
  const [feedbackComments, setFeedbackComments] = useState('');
  const [isSubmittingRating, setIsSubmittingRating] = useState(false);
  
  // Add camera state
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  // Fetch previous messages when entering an existing session
  useEffect(() => {
    async function fetchPreviousMessages() {
      if (!user || !sessionId || !sessionStartTime) return;
      
      try {
        // Only fetch messages if this is an existing session (not a new one)
        // And not currently sending a message
        if (minutesActive > 0 && !isSendingMessage) {
          console.log('Fetching previous messages for existing session...');
          
          // Use the user's pseudonym or generate one if missing
          let userPseudonym = user?.pseudonym;
          if (!userPseudonym) {
            console.log('Pseudonym missing for user:', user.email);
            console.log('User object structure:', JSON.stringify(user, null, 2));
            // Generate a pseudonym from the email
            const generatedPseudonym = generatePseudonymFromEmail(user.email || '');
            userPseudonym = generatedPseudonym.name;
            console.log(`Generated pseudonym for user: ${userPseudonym}`);
            
            // Save this pseudonym to the user's record
            try {
              const response = await fetch('/api/users/update-pseudonym', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  pseudonym: userPseudonym
                }),
              });
              
              if (response.ok) {
                console.log('Saved generated pseudonym to user record');
              } else {
                console.error('Failed to save generated pseudonym');
              }
            } catch (error) {
              console.error('Error saving generated pseudonym:', error);
            }
          }
          console.log(`Using pseudonym for fetching messages: ${userPseudonym}`);
          
          // Get messages from KinOS
          const messages = await fetchMessagesFromKinOS(
            user.firstName,
            undefined, // No since parameter
            selectedSpecialist, // Pass the selected specialist
            userPseudonym // Ensure pseudonym is passed
          );
          
          if (messages.length > 0) {
            // Only update chat history if it's empty or if we have more messages than before
            // This prevents overwriting recent messages
            if (chatHistory.length === 0 || messages.length > chatHistory.length) {
              // Convert KinOS messages to our chat format
              const formattedMessages: ChatMessage[] = messages.map((msg, index) => ({
                role: msg.role as 'user' | 'assistant',
                content: msg.content,
                id: `${msg.role}-${index}-${new Date(msg.timestamp).getTime()}`
              }));
              
              // Update chat history with fetched messages
              setChatHistory(formattedMessages);
              console.log(`Loaded ${formattedMessages.length} messages from previous session`);
            } else {
              console.log(`Skipped loading ${messages.length} messages as we already have ${chatHistory.length} messages`);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching previous messages:', error);
      }
    }
    
    fetchPreviousMessages();
  }, [user, sessionId, sessionStartTime, minutesActive, isSendingMessage, chatHistory.length]);

  // Update the session mode based on timing
  useEffect(() => {
    if (!sessionStartTime || !user) return;

    // Create a stable reference to the session length
    const currentSessionLength = sessionLength;
    
    const updateSessionMode = () => {
      const now = new Date();
      const sessionDuration = (now.getTime() - sessionStartTime.getTime()) / 1000 / 60; // in minutes
      
      // Use the dynamic session length
      const SESSION_DURATION = currentSessionLength;
      
      // Only log every 30 seconds to reduce console noise
      if (Math.round(sessionDuration * 2) % 1 === 0) {
        console.log(`Session status: ${sessionDuration.toFixed(1)}/${SESSION_DURATION} minutes elapsed`);
      }
      
      // Scale opening and closing phases based on session length
      const openingPhaseEnd = Math.max(1, Math.floor(SESSION_DURATION * 0.08)); // ~8% of session
      const halfwayPoint = SESSION_DURATION / 2; // 50% of session
      const closingPhaseStart = SESSION_DURATION - 2; // 2 minutes before the end
    
      // Calculate the time point 5 minutes before the end
      const imageGenerationPoint = SESSION_DURATION - 5;
      
      // Check if we're at the halfway point (within a small margin to avoid missing it)
      const isAtHalfway = sessionDuration >= halfwayPoint - 0.5 && sessionDuration <= halfwayPoint + 0.5;
      
      // Check if we're at the closing phase start (within a small margin)
      const isAtClosingPhase = sessionDuration >= closingPhaseStart - 0.5 && sessionDuration <= closingPhaseStart + 0.5;
      
      // Check if we're at the image generation point (within a small margin)
      // Increase the margin to make sure we don't miss it
      const isAtImageGenerationPoint = sessionDuration >= imageGenerationPoint - 1.0 && sessionDuration <= imageGenerationPoint + 0.5;
      
      // Send halfway message if we're at the halfway point and haven't sent it yet
      if (isAtHalfway && !halfwayMessageSent && !sessionEnded) {
        console.log(`Sending halfway message at ${sessionDuration.toFixed(1)} minutes`);
          
        // Send the halfway message
        // Use the user's pseudonym or generate one if missing
        let userPseudonym = user?.pseudonym || '';
        if (!userPseudonym) {
          console.log('Pseudonym missing for user:', user.email);
          // Generate a pseudonym from the email
          const generatedPseudonym = generatePseudonymFromEmail(user?.email || '');
          userPseudonym = generatedPseudonym.name;
          console.log(`Generated pseudonym for user: ${userPseudonym}`);
        }
        console.log(`Using pseudonym for halfway message: ${userPseudonym}`);
        
        sendMessageToKinOS(
          "<system>Info: Session halfway</system>",
          user.firstName,
          [], // attachments
          [], // images
          "journey", // Use journey mode
          selectedSpecialist, // Add selected specialist
          null, // No screenshot
          userPseudonym // Use the generated or existing pseudonym
        ).then(async (response) => {
          console.log("Halfway message sent successfully");
          setHalfwayMessageSent(true);
            
          // If the response is visible to the user, add it to chat and play TTS
          if (!response.includes("<system>")) {
            const messageId = `halfway-${Date.now()}`;
            let audioUrl = '';
            if (voiceMode) {
              audioUrl = await textToSpeech(response);
            }
              
            setChatHistory(prev => [
              ...prev,
              { 
                role: 'assistant', 
                content: response,
                id: messageId,
                audio: audioUrl
              }
            ]);
              
            // Play audio if voice mode is enabled
            if (voiceMode && audioUrl) {
              playAudio(audioUrl, messageId);
            }
          }
        }).catch(error => {
          console.error("Error sending halfway message:", error);
        });
      }
      
      // Send closing message if we're at the closing phase start and haven't sent it yet
      if (isAtClosingPhase && !closingMessageSent && !sessionEnded) {
        console.log(`Sending closing message at ${sessionDuration.toFixed(1)} minutes`);
          
        // Send the closing message
        // Use the user's pseudonym or generate one if missing
        let userPseudonym = user?.pseudonym || '';
        if (!userPseudonym) {
          console.log('Pseudonym missing for user:', user?.email || '');
          // Generate a pseudonym from the email
          const generatedPseudonym = generatePseudonymFromEmail(user.email || '');
          userPseudonym = generatedPseudonym.name;
          console.log(`Generated pseudonym for user: ${userPseudonym}`);
        }
        console.log(`Using pseudonym for closing message: ${userPseudonym}`);
        
        sendMessageToKinOS(
          "<system>Info: Session is closing soon</system>",
          user.firstName,
          [], // attachments
          [], // images
          "journey", // Use journey mode
          selectedSpecialist, // Add selected specialist
          null, // No screenshot
          userPseudonym // Use the generated or existing pseudonym
        ).then(async (response) => {
          console.log("Closing message sent successfully");
          setClosingMessageSent(true);
            
          // If the response is visible to the user, add it to chat and play TTS
          if (!response.includes("<system>")) {
            const messageId = `closing-${Date.now()}`;
            let audioUrl = '';
            if (voiceMode) {
              audioUrl = await textToSpeech(response);
            }
              
            setChatHistory(prev => [
              ...prev,
              { 
                role: 'assistant', 
                content: response,
                id: messageId,
                audio: audioUrl
              }
            ]);
              
            // Play audio if voice mode is enabled
            if (voiceMode && audioUrl) {
              playAudio(audioUrl, messageId);
            }
          }
        }).catch(error => {
          console.error("Error sending closing message:", error);
        });
      }
      
      // Request session summary image if we're at the image generation point and haven't requested it yet
      if (isAtImageGenerationPoint && !sessionImageRequested && !sessionEnded) {
        console.log(`Requesting session summary image at ${sessionDuration.toFixed(1)} minutes (5 minutes before end)`);
        requestSessionSummaryImage();
      }
      
      // First part of the session
      if (sessionDuration <= openingPhaseEnd) {
        setSessionMode('session_opening');
        setSessionEnded(false);
      } 
      // Last part of the session
      else if (sessionDuration >= closingPhaseStart && sessionDuration < SESSION_DURATION) {
        setSessionMode('session_closing');
        setSessionEnded(false);
      }
      // Session has ended
      else if (sessionDuration >= SESSION_DURATION) {
        setSessionMode('session_ended');
        setSessionEnded(true);
        console.log(`Session has ended after ${sessionDuration.toFixed(1)} minutes (limit: ${SESSION_DURATION} minutes)`);
        
        // Show rating modal when session ends if rating hasn't been submitted yet
        if (!ratingSubmitted) {
          setShowRatingModal(true);
        }
      }
      // Middle of the session
      else {
        setSessionMode(null);
        setSessionEnded(false);
      }
    };

    // Update immediately and then every 15 seconds to ensure we don't miss the image generation point
    // Change from 30 seconds to 15 seconds to make it more precise
    updateSessionMode();
    const intervalId = setInterval(updateSessionMode, 15000); // check every 15 seconds
  
    return () => clearInterval(intervalId);
  }, [sessionStartTime, sessionLength, halfwayMessageSent, closingMessageSent, user, sessionEnded, ratingSubmitted, sessionImageRequested]); // Add sessionImageRequested as a dependency
  

  // Add a session-ended message to the chat when the session ends
  useEffect(() => {
    if (sessionEnded) {
      // Only add the message if it doesn't already exist
      const hasEndMessage = chatHistory.some(msg => 
        msg.role === 'assistant' && msg.id === 'session-ended-message'
      );
      
      if (!hasEndMessage) {
        const endMessage = `Our ${sessionLength}-minute session time has ended for today. I hope our conversation was helpful. You can review our discussion, but new messages can't be sent until your next session. I look forward to continuing our conversation in your next session!`;
        
        // Generate audio for the end message if voice mode is on
        (async () => {
          let audioUrl = '';
          if (voiceMode) {
            audioUrl = await textToSpeech(endMessage);
          }
          
          setChatHistory(prev => [
            ...prev,
            { 
              role: 'assistant', 
              content: endMessage,
              id: 'session-ended-message',
              audio: audioUrl
            }
          ]);
          
          // Add a system message with rate button
          if (!ratingSubmitted) {
            setChatHistory(prev => [
              ...prev,
              { 
                role: 'assistant', 
                content: 'Would you like to rate your session experience?',
                id: 'rate-session-prompt'
              }
            ]);
          }
          
          // Play audio if voice mode is enabled
          if (voiceMode && audioUrl) {
            playAudio(audioUrl, 'session-ended-message');
          }
        })();
      }
    }
  }, [sessionEnded, chatHistory, sessionLength, voiceMode, ratingSubmitted]); // Add ratingSubmitted as a dependency

  // Track and update minutes active
  useEffect(() => {
    if (!sessionId || !sessionStartTime) return;
    
    // Calculate elapsed minutes based on session start time
    const calculateElapsedMinutes = () => {
      const now = new Date();
      return Math.floor((now.getTime() - sessionStartTime.getTime()) / (60 * 1000));
    };
    
    // Set initial minutes
    const initialMinutes = calculateElapsedMinutes();
    setMinutesActive(initialMinutes);
    
    console.log(`Initial minutes active: ${initialMinutes}`);
    
    // Set up interval to recalculate minutes directly from the start time
    const minuteInterval = setInterval(async () => {
      const currentMinutes = calculateElapsedMinutes();
      setMinutesActive(currentMinutes);
      
      // Update the session in Airtable
      try {
        fetch('/api/sessions/update-minutes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sessionId,
            minutesActive: currentMinutes,
            sessionLength: sessionLength // Pass the session length
          }),
        }).then(response => {
          if (!response.ok) {
            console.error(`Failed to update session minutes: ${response.status}`);
          } else {
            console.log(`Updated session minutes: ${currentMinutes}`);
          }
        });
      } catch (error) {
        console.error('Failed to update session minutes:', error);
      }
    }, 60000); // Run every minute (60000 ms)
    
    // Clean up interval on unmount
    return () => clearInterval(minuteInterval);
  }, [sessionId, sessionStartTime]); // Only depend on sessionId and sessionStartTime

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
  }, [message]); // Re-run when message changes
  
  // Helper function to determine the session phase based on dynamic session length
  const getSessionPhase = (startTime: Date) => {
    const now = new Date();
    const elapsedMinutes = Math.floor((now.getTime() - startTime.getTime()) / (60 * 1000));
    const totalLength = sessionLength;
    
    // Scale the phase transitions based on session length
    const openingPhaseEnd = Math.max(1, Math.floor(totalLength * 0.08)); // ~8% of session
    const firstHalfEnd = Math.floor(totalLength * 0.5); // 50% of session
    const closingPhaseStart = Math.floor(totalLength * 0.92); // ~92% of session
    
    if (elapsedMinutes <= openingPhaseEnd) {
      return { phase: "Session Opening", color: "bg-[var(--accent)]/10 text-[var(--accent)]" };
    } else if (elapsedMinutes < firstHalfEnd) {
      return { phase: "First Half", color: "bg-[var(--primary)]/10 text-[var(--primary)]" };
    } else if (elapsedMinutes < closingPhaseStart) {
      return { phase: "Second Half", color: "bg-[var(--primary-dark)]/10 text-[var(--primary-dark)]" };
    } else if (elapsedMinutes < totalLength) {
      return { phase: "Session Closing", color: "bg-[var(--warm)]/10 text-[var(--warm)]" };
    } else {
      return { phase: "Session Ended", color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300" };
    }
  };

  // Function to convert text to speech using our proxy API
  const textToSpeech = async (text: string): Promise<string> => {
    try {
      console.log(`Requesting TTS for text: "${text.substring(0, 30)}..."`);
      console.log(`Sending TTS request with voiceId: ${selectedVoice}`);
      
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          voiceId: selectedVoice, // Use the selected voice
          model: 'eleven_flash_v2_5'
        })
      });
      
      // Check if the response is JSON (error) or binary (audio)
      const contentType = response.headers.get('content-type');
      console.log(`TTS response content type: ${contentType}`);
      
      if (contentType && contentType.includes('application/json')) {
        // This is an error response
        const errorData = await response.json();
        console.error('TTS API returned JSON instead of audio:', errorData);
        throw new Error(errorData.error || 'Failed to get audio');
      }
      
      if (!response.ok) {
        throw new Error(`TTS request failed with status ${response.status}`);
      }
      
      const blob = await response.blob();
      console.log(`Received blob of size: ${blob.size} bytes, type: ${blob.type}`);
      
      if (blob.size === 0) {
        throw new Error('Received empty audio response');
      }
      
      // Create a URL for the blob
      const audioUrl = URL.createObjectURL(blob);
      console.log(`Created audio URL: ${audioUrl}`);
      
      return audioUrl;
    } catch (error) {
      console.error('Error converting text to speech:', error);
      return '';
    }
  };

  // Function to play audio
  const playAudio = (audioUrl: string, messageId: string) => {
    if (audioRef.current) {
      // Stop any currently playing audio
      audioRef.current.pause();
      audioRef.current.src = audioUrl;
      setCurrentPlayingId(messageId);
      audioRef.current.play().catch(err => {
        console.error('Error playing audio:', err);
        setIsPlaying(false);
        setCurrentPlayingId(null);
      });
    }
  };

  // Add state to check if MediaRecorder is supported
  const [isMediaRecorderSupported, setIsMediaRecorderSupported] = useState(true);
  
  // Check for MediaRecorder support
  useEffect(() => {
    // Check if MediaRecorder is supported
    if (typeof MediaRecorder === 'undefined') {
      setIsMediaRecorderSupported(false);
      console.warn('MediaRecorder API is not supported in this browser');
    }
  }, []);
  
  // Function to start recording with better iOS compatibility
  const startRecording = async () => {
    try {
      // Reset audio chunks
      audioChunksRef.current = [];
      
      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Check for supported MIME types
      const mimeTypes = [
        'audio/webm',
        'audio/mp4',
        'audio/aac',
        'audio/wav',
        'audio/ogg'
      ];
      
      let selectedType = '';
      for (const type of mimeTypes) {
        if (MediaRecorder.isTypeSupported(type)) {
          selectedType = type;
          console.log(`Using supported audio MIME type: ${type}`);
          break;
        }
      }
      
      // If no supported type found, use default
      if (!selectedType) {
        console.warn('No tested MIME types supported, using browser default');
      }
      
      // Create media recorder with options
      const options = selectedType ? { mimeType: selectedType } : {};
      const mediaRecorder = new MediaRecorder(stream, options);
      mediaRecorderRef.current = mediaRecorder;
      
      // Set up event handlers
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      mediaRecorder.onstop = handleRecordingStop;
      
      // Start recording
      mediaRecorder.start();
      setIsRecording(true);
      
      // Reset recording time
      setRecordingTime(0);
      
      // Clear any existing timer
      if (recordingTimerRef.current) {
        window.clearInterval(recordingTimerRef.current);
      }
      
      // Start a new timer using window.setInterval
      // Store the interval ID as a number
      recordingTimerRef.current = window.setInterval(() => {
        setRecordingTime((prevTime) => prevTime + 1);
      }, 1000);
      
      console.log('Recording started with new timer');
    } catch (error) {
      console.error('Error starting recording:', error);
      alert('Could not access microphone. Please check permissions and try again.');
    }
  };

  // Function to stop recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      
      // Stop all tracks in the stream
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      
      // Clear timer
      if (recordingTimerRef.current) {
        window.clearInterval(recordingTimerRef.current);
        recordingTimerRef.current = null;
      }
      
      console.log('Recording stopped, timer cleared');
    }
  };

  // Function to handle recording stop event
  const handleRecordingStop = async () => {
    try {
      setIsRecording(false);
      // Reset recording time after we're done processing
      const recordedTime = recordingTime;
      setRecordingTime(0);
      
      // Get the MIME type from the MediaRecorder if available
      const mimeType = mediaRecorderRef.current?.mimeType || 'audio/webm';
      console.log(`Using MIME type for blob: ${mimeType}`);
      
      // Create audio blob from chunks with the detected MIME type
      const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });
      console.log(`Audio recording complete, size: ${audioBlob.size} bytes, type: ${audioBlob.type}`);
      
      if (audioBlob.size > 0) {
        // Send to STT API
        await sendAudioForTranscription(audioBlob);
      } else {
        console.error('Empty audio recording detected');
        alert('No audio was recorded. Please try again and speak clearly.');
      }
    } catch (error) {
      console.error('Error handling recording stop:', error);
    }
  };

  // Function to send audio to STT API
  const sendAudioForTranscription = async (audioBlob: Blob) => {
    try {
      // Set sending flag to prevent message fetching during transcription and response
      setIsSendingMessage(true);
      
      // Create form data
      const formData = new FormData();
      
      // For iOS compatibility, check and log the blob type
      console.log(`Audio blob type: ${audioBlob.type}, size: ${audioBlob.size} bytes`);
      
      // If the blob has no type or is empty, show an error
      if (audioBlob.size === 0) {
        throw new Error('Empty audio recording detected');
      }
      
      // Append with explicit filename and type for better server handling
      const fileExtension = audioBlob.type.includes('webm') ? 'webm' : 
                           audioBlob.type.includes('mp4') ? 'mp4' : 
                           audioBlob.type.includes('wav') ? 'wav' : 'audio';
      
      formData.append('file', audioBlob, `recording.${fileExtension}`);
      formData.append('model', 'whisper-1');
      formData.append('language', 'en'); // Default to English
      
      // Show loading message
      setChatHistory(prev => [
        ...prev,
        { 
          role: 'user', 
          content: 'Transcribing audio...', 
          id: 'transcribing-' + Date.now(),
          loading: true 
        }
      ]);
      
      console.log(`Sending audio for transcription (${fileExtension} format)...`);
    
      // Store the captured image for sending
      const screenshot = capturedImage;
      if (capturedImage) {
        console.log(`Using existing captured image in voice message. Image data length: ${capturedImage.length}`);
      } else if (cameraEnabled) {
        // Capture a new image if camera is enabled but no image is captured yet
        const newScreenshot = await captureImage();
        if (newScreenshot) {
          console.log(`Captured new image for voice message. Image data length: ${newScreenshot.length}`);
        } else {
          console.log('Failed to capture image for voice message');
        }
      }
      
      // Send to STT API
      const response = await fetch('/api/stt', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error(`STT API returned status ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Transcription received:', data);
      
      if (data.text && data.text.trim()) {
        // Remove the loading message
        setChatHistory(prev => prev.filter(msg => !msg.id?.startsWith('transcribing-')));
        
        // Create a user message with the transcribed text and image if available
        const userMessageId = `user-${Date.now()}`;
        setChatHistory(prev => [
          ...prev,
          { 
            role: 'user', 
            content: screenshot ? `${data.text} [Image attached]` : data.text, 
            id: userMessageId 
          }
        ]);
        
        
        // Clear the captured image after sending
        setCapturedImage(null);
        
        // Create a unique ID for the loading message
        const loadingId = Date.now().toString();
      
        // Set loading state for assistant response
        setChatHistory(prev => [
          ...prev,
          { role: 'assistant', content: '', id: loadingId, loading: true }
        ]);
      
        // Create a unique message ID for this streaming response
        const streamingMessageId = `streaming-${loadingId}`;
      
        try {
          // Use the user's pseudonym or generate one if missing
          let userPseudonym = user?.pseudonym || '';
          if (!userPseudonym) {
            console.log('Pseudonym missing for user:', user?.email);
            // Generate a pseudonym from the email
            const generatedPseudonym = generatePseudonymFromEmail(user?.email || '');
            userPseudonym = generatedPseudonym.name;
            console.log(`Generated pseudonym for user: ${userPseudonym}`);
          
            // Save this pseudonym to the user's record
            try {
              const response = await fetch('/api/users/update-pseudonym', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  pseudonym: userPseudonym
                }),
              });
            
              if (response.ok) {
                console.log('Saved generated pseudonym to user record');
              } else {
                console.error('Failed to save generated pseudonym');
              }
            } catch (error) {
              console.error('Error saving generated pseudonym:', error);
            }
          }
          console.log(`Using pseudonym for voice message: ${userPseudonym}`);
        
          // Create a unique message ID for this streaming response
          const streamingMessageId = `streaming-${loadingId}`;
          
          // Set up the streaming callback
          if (typeof window !== 'undefined') {
            // Set a timeout to clean up the callback if streaming takes too long
            const streamingTimeout = setTimeout(() => {
              if (window.streamingCallbacks && window.streamingCallbacks[streamingMessageId]) {
                console.warn('Streaming timeout reached, cleaning up callback');
                delete window.streamingCallbacks[streamingMessageId];
                
                // Update the UI to show that we're no longer waiting for streaming
                setChatHistory(prev => 
                  prev.map(msg => 
                    msg.id === loadingId 
                      ? { 
                          role: 'assistant', 
                          content: msg.content || 'I apologize, but there was an issue with my response. Please try again.', 
                          id: loadingId, 
                          loading: false
                        }
                      : msg
                  )
                );
              }
            }, 30000); // 30 second timeout
            
            window.streamingCallbacks[streamingMessageId] = (chunk, fullText, isComplete) => {
              // Clear the timeout on each chunk received
              clearTimeout(streamingTimeout);
              
              console.log(`Received chunk: ${chunk.substring(0, 20)}... (${chunk.length} chars)`);
              console.log(`Full text so far: ${fullText.length} chars`);
              
              // Update the chat history with each chunk
              setChatHistory(prev => {
                // Find the message to update
                const messageToUpdate = prev.find(msg => msg.id === loadingId);
                if (!messageToUpdate) {
                  console.warn(`Message with ID ${loadingId} not found in chat history`);
                  return prev;
                }
                
                return prev.map(msg => 
                  msg.id === loadingId 
                    ? { 
                        role: 'assistant', 
                        content: fullText, 
                        id: loadingId, 
                        loading: false,
                        skipAutoIllustrate: true, // Add flag to prevent duplicate illustration
                        animating: !isComplete, // Stop animating when complete
                        lastChunk: isComplete ? '' : chunk // Clear the chunk when complete
                      }
                    : msg
                );
              });
            };
          }
          
          // Send message to KinOS API with streaming
          const response = await sendMessageToKinOS(
            data.text,
            user?.firstName || 'Guest',
            [], // attachments
            [], // empty images array
            sessionMode, // Add session mode
            selectedSpecialist, // Add selected specialist
            screenshot, // Add screenshot as a separate parameter
            userPseudonym // Use the generated or existing pseudonym
          );
          
          // Generate TTS in the background after streaming is complete
          if (voiceMode) {
            textToSpeech(response).then(audioUrl => {
              if (audioUrl) {
                // Update the message with the audio URL when it's ready
                setChatHistory(prev => 
                  prev.map(msg => 
                    msg.id === loadingId 
                      ? { 
                          ...msg,
                          audio: audioUrl
                        }
                      : msg
                  )
                );
                
                // Play audio when it's ready
                playAudio(audioUrl, loadingId);
              }
            }).catch(error => {
              console.error('Error generating TTS:', error);
            });
          }
          
          // The UI is already updated by the streaming callback, so we don't need to update it again
          // Just save the conversation to local storage or your backend
          saveConversation([
            ...chatHistory,
            { 
              role: 'user', 
              content: screenshot ? `${data.text} [Image attached]` : data.text, 
              id: userMessageId 
            },
            { role: 'assistant', content: response, id: loadingId, loading: false }
          ]);
        } catch (error) {
          console.error('Error getting response:', error);
          
          // Update with error message
          setChatHistory(prev => 
            prev.map(msg => 
              msg.id === loadingId 
                ? { role: 'assistant', content: "I'm sorry, I encountered an error. Please try again.", id: loadingId, loading: false }
                : msg
            )
          );
        }
      } else {
        // If no text was transcribed or it was empty
        setChatHistory(prev => prev.filter(msg => !msg.id?.startsWith('transcribing-')));
        alert('No speech detected. Please try again.');
      }
    } catch (error) {
      console.error('Error transcribing audio:', error);
      
      // Remove the loading message and show error
      setChatHistory(prev => [
        ...prev.filter(msg => !msg.id?.startsWith('transcribing-')),
        { 
          role: 'assistant', 
          content: 'Sorry, I couldn\'t transcribe your audio. Please try again or type your message.',
          id: 'error-' + Date.now()
        }
      ]);
    } finally {
      // Reset sending flag when done
      setIsSendingMessage(false);
    
      // Clean up the streaming callback
      if (typeof window !== 'undefined' && window.streamingCallbacks) {
        const loadingId = Date.now().toString();
        const streamingMessageId = `streaming-${loadingId}`;
        if (window.streamingCallbacks[streamingMessageId]) {
          delete window.streamingCallbacks[streamingMessageId];
        }
      }
    }
  };

  // Format recording time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  // Toggle voice mode
  const toggleVoiceMode = () => {
    setVoiceMode(!voiceMode);
  };
  
  // Update session length and save as preference
  const updateSessionLength = async (length: number) => {
    if (!sessionId) return;
    
    setIsUpdatingPreference(true);
    
    try {
      // First update the current session length
      const sessionResponse = await fetch('/api/sessions/update-length', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId,
          sessionLength: length,
        }),
      });
      
      if (!sessionResponse.ok) {
        throw new Error(`Failed to update session length: ${sessionResponse.status}`);
      }
      
      // Then update the user's preference
      const preferenceResponse = await fetch('/api/users/preferences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          preferredSessionLength: length,
        }),
      });
      
      if (!preferenceResponse.ok) {
        throw new Error(`Failed to update preference: ${preferenceResponse.status}`);
      }
      
      console.log(`Session length updated to ${length} minutes and saved as preference`);
      setSessionLength(length);
    } catch (error) {
      console.error('Error updating session length or preference:', error);
      // Optionally show an error message to the user
    } finally {
      setIsUpdatingPreference(false);
    }
  };
  
  // Update preferred voice
  const updatePreferredVoice = async (voiceId: string) => {
    try {
      setSelectedVoice(voiceId);
      
      // Update the user's preference
      const response = await fetch('/api/users/preferences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          preferredVoice: voiceId,
        }),
      });
      
      if (!response.ok) {
        throw new Error(`Failed to update voice preference: ${response.status}`);
      }
      
      console.log(`Voice preference updated to: ${voiceId}`);
    } catch (error) {
      console.error('Error updating voice preference:', error);
    }
  };
  
  // Toggle camera function
  const toggleCamera = async () => {
    try {
      if (cameraEnabled) {
        // Turn off camera
        if (cameraStream) {
          cameraStream.getTracks().forEach(track => track.stop());
          setCameraStream(null);
        }
        setCameraEnabled(false);
        setCameraError(null);
        // Clear any captured image when turning off camera
        setCapturedImage(null);
      } else {
        // Turn on camera
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { 
            width: { ideal: 640 },
            height: { ideal: 480 },
            facingMode: "user"
          } 
        });
        
        setCameraStream(stream);
        setCameraEnabled(true);
        setCameraError(null);
        
        // Add a small delay to ensure the video element is in the DOM
        setTimeout(() => {
          // If we have a video element reference, set its source to the stream
          if (videoRef.current) {
            console.log('Setting video source to camera stream');
            videoRef.current.srcObject = stream;
            
            // Add event listeners to debug video loading
            videoRef.current.onloadedmetadata = () => {
              console.log('Video metadata loaded');
              videoRef.current?.play().catch(e => console.error('Error playing video:', e));
            };
            
            videoRef.current.onerror = (e) => {
              console.error('Video element error:', e);
            };
          } else {
            console.error('Video element reference not found');
          }
        }, 100);
        
        // Auto-close settings panel when enabling camera
        setSettingsCollapsed(true);
      }
      
      // Save the camera preference
      updateCameraPreference(!cameraEnabled);
    } catch (error) {
      console.error('Error accessing camera:', error);
      setCameraError('Could not access camera. Please check permissions and try again.');
      setCameraEnabled(false);
    }
  };
  
  // Function to resize image before sending
  const resizeImageForUpload = (imageDataUrl: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      try {
        const img = new Image();
        img.onload = () => {
          // Create a canvas for resizing
          const canvas = document.createElement('canvas');
          
          // Calculate new dimensions while maintaining aspect ratio
          let width = img.width;
          let height = img.height;
          const maxDimension = 800; // Changed from 512 to 800
          
          if (width > height && width > maxDimension) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else if (height > maxDimension) {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
          
          // Set canvas dimensions
          canvas.width = width;
          canvas.height = height;
          
          // Draw resized image on canvas
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            reject(new Error('Could not get canvas context'));
            return;
          }
          
          ctx.drawImage(img, 0, 0, width, height);
          
          // Convert to JPEG with 80% quality
          const resizedImageDataUrl = canvas.toDataURL('image/jpeg', 0.8);
          console.log(`Image resized from ${img.width}x${img.height} to ${width}x${height}, new size: ${resizedImageDataUrl.length} bytes`);
          
          resolve(resizedImageDataUrl);
        };
        
        img.onerror = () => {
          reject(new Error('Failed to load image for resizing'));
        };
        
        img.src = imageDataUrl;
      } catch (error) {
        console.error('Error resizing image:', error);
        reject(error);
      }
    });
  };

  // Function to capture image from camera
  const captureImage = async () => {
    if (!videoRef.current || !cameraStream) {
      console.error('Cannot capture image: video element or camera stream not available');
      return null;
    }
    
    try {
      // Create canvas if it doesn't exist
      if (!canvasRef.current) {
        const canvas = document.createElement('canvas');
        canvasRef.current = canvas;
      }
      
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      console.log(`Canvas dimensions set to ${canvas.width}x${canvas.height}`);
      
      // Draw the current video frame to the canvas
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        throw new Error('Could not get canvas context');
      }
      
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Convert canvas to data URL (base64 encoded image)
      const originalImageDataUrl = canvas.toDataURL('image/jpeg', 1.0);
      console.log(`Image captured successfully. Original data URL length: ${originalImageDataUrl.length}`);
      
      // Resize the image to 512px max dimension with 80% JPEG quality
      const resizedImageDataUrl = await resizeImageForUpload(originalImageDataUrl);
      console.log(`Image resized. New data URL length: ${resizedImageDataUrl.length}`);
      
      setCapturedImage(resizedImageDataUrl);
      return resizedImageDataUrl;
    } catch (error) {
      console.error('Error capturing image:', error);
      setCameraError('Failed to capture image. Please try again.');
      return null;
    }
  };
  
  // Function to discard captured image
  const discardImage = () => {
    setCapturedImage(null);
  };
  
  // Update camera preference
  const updateCameraPreference = async (enabled: boolean) => {
    try {
      // Update the user's preference
      const response = await fetch('/api/users/preferences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cameraEnabled: enabled,
        }),
      });
      
      if (!response.ok) {
        throw new Error(`Failed to update camera preference: ${response.status}`);
      }
      
      console.log(`Camera preference updated to: ${enabled}`);
    } catch (error) {
      console.error('Error updating camera preference:', error);
    }
  };
  
  // Update auto-illustrate preference
  const updateAutoIllustratePreference = async (enabled: boolean) => {
    try {
      setAutoIllustrate(enabled);
      
      // Update the user's preference
      const response = await fetch('/api/users/preferences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          autoIllustrate: enabled,
        }),
      });
      
      if (!response.ok) {
        throw new Error(`Failed to update auto-illustrate preference: ${response.status}`);
      }
      
      console.log(`Auto-illustrate preference updated to: ${enabled}`);
    } catch (error) {
      console.error('Error updating auto-illustrate preference:', error);
    }
  };
  
  // Update selected specialist
  const updateSelectedSpecialist = async (specialist: string) => {
    try {
      // Only proceed with conversation reset if the specialist is actually changing
      if (selectedSpecialist !== specialist) {
        setSelectedSpecialist(specialist);
        
        // Update the user's preference
        const response = await fetch('/api/users/preferences', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            preferredSpecialist: specialist,
          }),
        });
        
        if (!response.ok) {
          throw new Error(`Failed to update specialist preference: ${response.status}`);
        }
        
        // If we have an active session, update the session in Airtable
        if (sessionId) {
          const sessionResponse = await fetch('/api/sessions/update-specialist', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              sessionId,
              specialist,
            }),
          });
          
          if (!sessionResponse.ok) {
            throw new Error(`Failed to update session specialist: ${sessionResponse.status}`);
          }
          
          console.log(`Session specialist updated to: ${specialist}`);
          
          // Clear the current chat history
          setChatHistory([]);
          
          // Show loading indicator
          setIsInitialMessageLoading(true);
          setChatHistory([
            { 
              role: 'assistant', 
              content: '...', 
              id: 'specialist-change-loading',
              loading: true
            }
          ]);
          
          // Send the correct system message format
          const welcomeMessage = `<system>New ${sessionLength} minute session starting with ${user?.firstName || 'Guest'}</system>`;
          // Use the user's pseudonym or generate one if missing
          let userPseudonym = user?.pseudonym || '';
          if (!userPseudonym) {
            console.log('Pseudonym missing for user:', user?.email);
            // Generate a pseudonym from the email
            const generatedPseudonym = generatePseudonymFromEmail(user?.email || '');
            userPseudonym = generatedPseudonym.name;
            console.log(`Generated pseudonym for user: ${userPseudonym}`);
            
            // Save this pseudonym to the user's record
            try {
              const response = await fetch('/api/users/update-pseudonym', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  pseudonym: userPseudonym
                }),
              });
              
              if (response.ok) {
                console.log('Saved generated pseudonym to user record');
              } else {
                console.error('Failed to save generated pseudonym');
              }
            } catch (error) {
              console.error('Error saving generated pseudonym:', error);
            }
          }
          console.log(`Using pseudonym for specialist change: ${userPseudonym}`);
          
          const response = await sendMessageToKinOS(
            welcomeMessage,
            user?.firstName || 'Guest',
            [], // attachments
            [], // images
            'session_opening', // Use session_opening mode
            specialist, // Add selected specialist
            null, // No screenshot
            userPseudonym // Use the generated or existing pseudonym
          );
          
          // Update chat history with the response
          setIsInitialMessageLoading(false);
          const audioUrl = voiceMode ? await textToSpeech(response) : '';
          setChatHistory([
            { 
              role: 'assistant', 
              content: response,
              id: 'specialist-change-' + Date.now(),
              audio: audioUrl
            }
          ]);
            
          // Play audio if voice mode is enabled
          if (voiceMode && audioUrl) {
            playAudio(audioUrl, 'specialist-change-' + Date.now());
          }
        }
        
        console.log(`Specialist preference updated to: ${specialist}`);
      }
    } catch (error) {
      console.error('Error updating specialist preference:', error);
    }
  };

  // Add cleanup for recording resources
  useEffect(() => {
    return () => {
      // Stop recording if component unmounts while recording
      if (isRecording && mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
        
        // Stop all tracks in the stream
        if (mediaRecorderRef.current.stream) {
          mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
        }
      }
      
      // Clear any timers
      if (recordingTimerRef.current) {
        window.clearInterval(recordingTimerRef.current);
        recordingTimerRef.current = null;
      }
    };
  }, [isRecording]);
  
  // Function to request session summary image
  const requestSessionSummaryImage = async () => {
    if (!user || !sessionId || sessionImageRequested) return;
    
    try {
      console.log('Requesting session summary image...');
      // Set this flag immediately to prevent multiple requests
      setSessionImageRequested(true);
      
      // Get the user's pseudonym
      let userPseudonym = user?.pseudonym || '';
      if (!userPseudonym) {
        console.log('Pseudonym missing for user:', user.email);
        // Generate a pseudonym from the email
        const generatedPseudonym = generatePseudonymFromEmail(user.email || '');
        userPseudonym = generatedPseudonym.name;
        console.log(`Generated pseudonym for user: ${userPseudonym}`);
      }
      console.log(`Using pseudonym for session image: ${userPseudonym}`);
      
      // Create a prompt for the image based on the session with specific style requirements
      const prompt = `<system>Please generate an image that captures the essence of this therapy session. Create a visual representation that reflects the themes, emotions, and progress we've discussed. The image should be abstract enough to maintain privacy while still being meaningful to the client.

Important style requirements:
- Use a soothing pencil style illustration
- Incorporate the site's color palette: white, teal, light green, purple, violet, yellow, and orange
- Keep the style clean, modern, and therapeutic
- Ensure the image feels calming and supportive</system>`;
      
      // Send the request to KinOS
      const response = await fetch('/api/kinos/image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: prompt,
          firstName: user.firstName,
          specialist: selectedSpecialist,
          pseudonym: userPseudonym
        }),
      });
      
      if (!response.ok) {
        throw new Error(`Failed to request image: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Image generation response:', data);
      
      // Check if we have a valid image URL
      if (data.result?.data?.[0]?.url) {
        const imageUrl = data.result.data[0].url;
        console.log(`Successfully received image URL: ${imageUrl}`);
        setSessionImage(imageUrl);
        
        // Save the image URL to Airtable
        try {
          const saveResponse = await fetch('/api/sessions/update-image', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              sessionId,
              imageUrl
            }),
          });
          
          if (saveResponse.ok) {
            console.log('Session image URL saved to Airtable successfully');
          } else {
            console.error('Failed to save session image URL to Airtable:', saveResponse.status);
          }
        } catch (saveError) {
          console.error('Error saving session image URL to Airtable:', saveError);
        }
        
        // Add the image to the chat
        const messageId = `session-image-${Date.now()}`;
        const message = "Here's a visual representation of our session today. I hope it captures some of the themes we've explored together.";
        
        // Add to chat history without audio
        setChatHistory(prev => [
          ...prev,
          { 
            role: 'assistant', 
            content: message,
            id: messageId,
            image: imageUrl
          }
        ]);
        
        console.log('Session summary image added to chat');
      } else {
        console.error('No valid image URL in the response:', data);
      }
    } catch (error) {
      console.error('Error generating session summary image:', error);
      // Don't set sessionImageRequested back to false on error to prevent repeated failures
    }
  };

  // Add effect to auto-illustrate new assistant messages
  useEffect(() => {
    // Only run if auto-illustrate is enabled and we have chat history
    if (!autoIllustrate || chatHistory.length === 0 || !user) return;
    
    // Get the last message in the chat
    const lastMessage = chatHistory[chatHistory.length - 1];
    
    // Only illustrate assistant messages that don't already have an image or are being generated
    if (
      lastMessage.role === 'assistant' && 
      !lastMessage.loading && 
      !lastMessage.image && 
      !lastMessage.generatingImage && 
      !lastMessage.skipAutoIllustrate && // Skip if flagged
      lastMessage.id !== 'rate-session-prompt' && 
      lastMessage.id !== 'session-ended-message' &&
      !lastMessage.id?.startsWith('initial-') // Skip the initial welcome message
    ) {
      console.log(`Auto-illustrating message: ${lastMessage.id}`);
      generateIllustrationForMessage(lastMessage.content, lastMessage.id || 'unknown');
    }
  }, [chatHistory, autoIllustrate, user]);

  // Add cleanup for camera resources
  useEffect(() => {
    return () => {
      // Stop camera stream if component unmounts while camera is on
      if (cameraStream) {
        cameraStream.getTracks().forEach(track => {
          try {
            track.stop();
          } catch (error) {
            console.error('Error stopping camera track:', error);
          }
        });
      }
      
      // Clear any captured image when unmounting
      if (capturedImage) {
        URL.revokeObjectURL(capturedImage);
      }
    };
  }, [cameraStream, capturedImage]);

  if (loading || isCheckingSubscription) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow pt-24 pb-16 px-4 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p>Loading your session...</p>
          </div>
        </main>
      </div>
    );
  }

  // Show "out of sessions" message if user has no sessions remaining
  if (hasSessionsRemaining === false) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-grow pt-24 pb-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="card p-8 text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-[var(--background-alt)] rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              
              <h1 className="text-3xl font-bold mb-4">You're Out of Sessions</h1>
              
              <p className="text-foreground/70 mb-6 max-w-2xl mx-auto">
                You've used all your available therapy sessions for this period. Upgrade your plan to continue your therapeutic journey and unlock additional sessions.
              </p>
              
              <div className="mb-8 p-6 bg-[var(--background-alt)] rounded-lg max-w-xl mx-auto">
                <h2 className="text-xl font-semibold mb-3">Why Upgrade Your TherapyKin Plan?</h2>
                <ul className="text-left space-y-3">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong>Continuous Support:</strong> Access therapy whenever you need it, without session limits</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong>Deeper Relationship:</strong> TherapyKin learns and adapts to you with each session</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong>Progress Tracking:</strong> Visualize your therapeutic journey and growth over time</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong>Privacy-First:</strong> All plans include our core privacy and security features</span>
                  </li>
                </ul>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/pricing" className="btn-primary px-8 py-3">
                  Upgrade My Plan
                </Link>
                <Link href="/dashboard" className="btn-secondary px-8 py-3">
                  Return to Dashboard
                </Link>
              </div>
            </div>
          </div>
          
        </main>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if ((!message.trim() && !capturedImage) || sessionEnded) return;
    
    // Set sending flag to prevent message fetching during send
    setIsSendingMessage(true);
    
    // Capture image from camera if enabled and no image is already captured
    let screenshot = capturedImage;
    if (cameraEnabled && !capturedImage) {
      const capturedImg = await captureImage();
      screenshot = capturedImg || null; // Ensure it's either string or null, not undefined
      console.log(`Auto-captured image for message. Image data length: ${screenshot ? screenshot.length : 0}`);
    }
    
    // Add user message to chat with image if available
    const userMessageId = `user-${Date.now()}`;
    setChatHistory([...chatHistory, { 
      role: 'user', 
      content: message || (screenshot ? '[Image sent]' : ''), 
      id: userMessageId 
    }]);
    
    
    // Store the message to clear the input field
    const userMessage = message;
    setMessage('');
    
    // Clear the captured image after sending
    setCapturedImage(null);
    
    // Set loading state
    const loadingId = Date.now().toString();
    setChatHistory(prev => [
      ...prev,
      { role: 'assistant', content: '', id: loadingId, loading: true }
    ]);
    
    try {
      console.log(`Sending message to KinOS${screenshot ? ' with screenshot' : ''}`);
      
      // Use the user's pseudonym or generate one if missing
      let userPseudonym = user?.pseudonym;
      if (!userPseudonym) {
        console.log('Pseudonym missing for user:', user?.email);
        // Generate a pseudonym from the email
        const generatedPseudonym = generatePseudonymFromEmail(user?.email || '');
        userPseudonym = generatedPseudonym.name;
        console.log(`Generated pseudonym for user: ${userPseudonym}`);
        
        // Save this pseudonym to the user's record
        try {
          const response = await fetch('/api/users/update-pseudonym', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              pseudonym: userPseudonym
            }),
          });
          
          if (response.ok) {
            console.log('Saved generated pseudonym to user record');
          } else {
            console.error('Failed to save generated pseudonym');
          }
        } catch (error) {
          console.error('Error saving generated pseudonym:', error);
        }
      }
      console.log(`Using pseudonym for message: ${userPseudonym}`);
      
      // Create a unique message ID for this streaming response
      const streamingMessageId = `streaming-${loadingId}`;
      
      // Set up the streaming callback
      if (typeof window !== 'undefined') {
        // Set a timeout to clean up the callback if streaming takes too long
        const streamingTimeout = setTimeout(() => {
          if (window.streamingCallbacks && window.streamingCallbacks[streamingMessageId]) {
            console.warn('Streaming timeout reached, cleaning up callback');
            delete window.streamingCallbacks[streamingMessageId];
            
            // Update the UI to show that we're no longer waiting for streaming
            setChatHistory(prev => 
              prev.map(msg => 
                msg.id === loadingId 
                  ? { 
                      role: 'assistant', 
                      content: msg.content || 'I apologize, but there was an issue with my response. Please try again.', 
                      id: loadingId, 
                      loading: false
                    }
                  : msg
              )
            );
          }
        }, 30000); // 30 second timeout
        
        // Make sure the callback is registered with the correct ID
        console.log(`Registering streaming callback for message ID: ${streamingMessageId}`);
        window.streamingCallbacks[streamingMessageId] = (chunk, fullText, isComplete) => {
          // Clear the timeout on each chunk received
          clearTimeout(streamingTimeout);
          
          console.log(`Received chunk: ${chunk.substring(0, 20)}... (${chunk.length} chars)`);
          console.log(`Full text so far: ${fullText.length} chars`);
          
          // Update the chat history with each chunk
          setChatHistory(prev => {
            // Find the message to update
            const messageToUpdate = prev.find(msg => msg.id === loadingId);
            if (!messageToUpdate) {
              console.warn(`Message with ID ${loadingId} not found in chat history`);
              return prev;
            }
            
            return prev.map(msg => 
              msg.id === loadingId 
                ? { 
                    role: 'assistant', 
                    content: fullText, 
                    id: loadingId, 
                    loading: false,
                    skipAutoIllustrate: true, // Add flag to prevent duplicate illustration
                    animating: !isComplete, // Stop animating when complete
                    lastChunk: isComplete ? '' : chunk // Clear the chunk when complete
                  }
                : msg
            );
          });
        };
      }
      
      // Send message to KinOS API with streaming
      const response = await sendMessageToKinOS(
        userMessage,
        user?.firstName || 'Guest',
        [], // attachments
        [], // empty images array
        sessionMode, // Add session mode
        selectedSpecialist, // Add selected specialist
        screenshot, // Add screenshot as a separate parameter
        userPseudonym // Use the generated or existing pseudonym
      );
      
      console.log(`Received complete response from KinOS after sending message${screenshot ? ' with screenshot' : ''}`);
      
      // If voice mode is enabled, convert response to speech
      // But don't wait for this to update the UI
      if (voiceMode) {
        // Generate TTS in the background
        textToSpeech(response).then(audioUrl => {
          if (audioUrl) {
            // Update the message with the audio URL when it's ready
            setChatHistory(prev => 
              prev.map(msg => 
                msg.id === loadingId 
                  ? { 
                      ...msg,
                      audio: audioUrl
                    }
                  : msg
              )
            );
            
            // Play audio when it's ready
            playAudio(audioUrl, loadingId);
          }
        }).catch(error => {
          console.error('Error generating TTS:', error);
        });
      }
      
      // The UI is already updated by the streaming callback, so we don't need to update it again
      // Just save the conversation to local storage or your backend
      saveConversation([
        ...chatHistory.filter(msg => msg.id !== loadingId),
        { role: 'user', content: userMessage || (screenshot ? '[Image sent]' : ''), id: userMessageId },
        { role: 'assistant', content: response, id: loadingId, loading: false }
      ]);
    } catch (error) {
      console.error('Error getting response:', error);
      
      // Update with error message
      setChatHistory(prev => 
        prev.map(msg => 
          msg.id === loadingId 
            ? { role: 'assistant', content: "I'm sorry, I encountered an error. Please try again.", id: loadingId, loading: false }
            : msg
        )
      );
    } finally {
      // Reset sending flag when done
      setIsSendingMessage(false);
        
      // Clean up the streaming callback
      if (typeof window !== 'undefined' && window.streamingCallbacks) {
        const streamingMessageId = `streaming-${loadingId}`;
        if (window.streamingCallbacks[streamingMessageId]) {
          delete window.streamingCallbacks[streamingMessageId];
        }
      }
    }
  };

  // Helper function to save conversations (you can implement this as needed)
  const saveConversation = (conversation: ChatMessage[]) => {
    // This is a placeholder - implement as needed
  };
  
  // Function to submit session rating
  const submitRating = async () => {
    if (!sessionId) return;
    
    setIsSubmittingRating(true);
    
    try {
      const response = await fetch('/api/sessions/submit-rating', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId,
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
      
      console.log('Session rating submitted successfully');
      setRatingSubmitted(true);
      setShowRatingModal(false);
    } catch (error) {
      console.error('Error submitting session rating:', error);
      alert('Failed to submit your feedback. Please try again.');
    } finally {
      setIsSubmittingRating(false);
    }
  };

  // Function to generate an illustration for a message
  const generateIllustrationForMessage = async (messageContent: string, messageId: string) => {
    try {
      // Make sure we have the user object
      if (!user) {
        console.error('Cannot generate illustration: user is not authenticated');
        return;
      }
      
      // Store the current scroll position before updating the UI
      const chatContainer = document.querySelector('.overflow-y-auto');
      const scrollPosition = chatContainer?.scrollTop || 0;
      
      // Immediately update the UI to show the loading animation
      setChatHistory(prev => 
        prev.map(msg => 
          msg.id === messageId 
            ? { ...msg, generatingImage: true, imageLoaded: false }
            : msg
        )
      );
      
      // Restore the scroll position after the UI update
      setTimeout(() => {
        if (chatContainer) {
          chatContainer.scrollTop = scrollPosition;
        }
      }, 50);
      
      // Check if pseudonym exists, if not try to get it or generate it
      let userPseudonym = user.pseudonym;
      if (!userPseudonym) {
        console.log('Pseudonym missing for user:', user.email);
        
        // Generate a pseudonym from the email
        const generatedPseudonym = generatePseudonymFromEmail(user.email || '');
        userPseudonym = generatedPseudonym.name;
        console.log(`Generated pseudonym for user: ${userPseudonym}`);
        
        // Save this pseudonym to the user's record
        try {
          const response = await fetch('/api/users/update-pseudonym', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              pseudonym: userPseudonym
            }),
          });
          
          if (response.ok) {
            console.log('Saved generated pseudonym to user record');
          } else {
            console.error('Failed to save generated pseudonym');
          }
        } catch (error) {
          console.error('Error saving generated pseudonym:', error);
        }
      }
      
      if (!userPseudonym) {
        console.error('Cannot generate illustration: unable to get or generate pseudonym');
        return;
      }
      
      console.log(`Requesting illustration for message: ${messageId} with pseudonym: ${userPseudonym}`);
      
      // Create a prompt for the image based on the message content
      const prompt = `<system>Please generate an illustration based on this text: ${messageContent}

Important style requirements:
- Use a soothing pencil style illustration
- Incorporate the site's color palette: white, teal, light green, purple, violet, yellow, and orange
- Keep the style clean, modern, and therapeutic
- Ensure the image feels calming and supportive</system>`;
      
      // Log the pseudonym being used
      console.log(`Using pseudonym for illustration: ${userPseudonym}`);
      
      // Send the request to KinOS
      const response = await fetch('/api/kinos/image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: prompt,
          firstName: user.firstName,
          specialist: selectedSpecialist,
          pseudonym: userPseudonym // Use the correct pseudonym
        }),
      });
      
      if (!response.ok) {
        throw new Error(`Failed to generate illustration: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Image generation response:', data);
      
      // Check if we have a valid image URL
      if (data.result?.data?.[0]?.url) {
        const imageUrl = data.result.data[0].url;
        console.log(`Successfully received image URL: ${imageUrl}`);
        
        // Store the current scroll position again before updating
        const currentScrollPosition = chatContainer?.scrollTop || 0;
        
        // Update the message with the generated image but keep generatingImage true until it loads
        setChatHistory(prev => 
          prev.map(msg => 
            msg.id === messageId 
              ? { ...msg, image: imageUrl, generatingImage: false }
              : msg
          )
        );
        
        // Restore the scroll position after the UI update
        setTimeout(() => {
          if (chatContainer) {
            chatContainer.scrollTop = currentScrollPosition;
          }
        }, 50);
        
        console.log(`Added illustration to message: ${messageId}`);
      } else {
        // If there's an error, remove the loading state
        setChatHistory(prev => 
          prev.map(msg => 
            msg.id === messageId 
              ? { ...msg, generatingImage: false }
              : msg
          )
        );
        console.error('No valid image URL in the response:', data);
      }
    } catch (error) {
      // If there's an error, remove the loading state
      setChatHistory(prev => 
        prev.map(msg => 
          msg.id === messageId 
            ? { ...msg, generatingImage: false }
            : msg
        )
      );
      console.error('Error generating illustration:', error);
      alert('Failed to generate illustration. Please try again.');
    }
  };

  // Function to play audio for a specific message
  const playMessageAudio = async (msg: ChatMessage) => {
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

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      {/* Rating Modal */}
      {showRatingModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-[var(--background)] rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-[var(--primary)]">Rate Your Session</h2>
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
                Your feedback helps us improve your therapy experience. All ratings are confidential.
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
                       helpfulnessOfAdvice === 3 ? 'Moderately Helpful' :
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
      
      <main className="flex-grow pt-24 pb-24 px-4 relative">
        <div className="max-w-7xl mx-auto flex flex-col gap-4">
          
          <div className="flex flex-col md:flex-row gap-4 h-[calc(100vh-200px)]">
            {/* Main Chat Area - Takes most of the width */}
            <div className={`flex-grow flex flex-col ${settingsCollapsed ? 'md:w-3/4' : 'md:w-2/3'}`}>
            
            {/* Chat history */}
            <div className="flex-grow card overflow-hidden">
              
              <div className="h-full overflow-y-auto p-4 pb-16" style={{ scrollbarWidth: 'thin' }}>
                <div className="space-y-4">
                {chatHistory
                  .filter(msg => !msg.content.includes('<system>')) // Filter out system messages
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
                        <div className="text-sm text-foreground/60 loading-dots py-2">
                          <span>.</span><span>.</span><span>.</span>
                        </div>
                      ) : (
                        <div>
                          {msg.role === 'assistant' && msg.animating ? (
                            <p className="text-bubble whitespace-pre-wrap typing-container">
                              {/* Split the content into already displayed text and new chunk */}
                              {msg.content.substring(0, msg.content.length - (msg.lastChunk?.length || 0))}
                              {/* Animate each character in the new chunk */}
                              {msg.lastChunk?.split('').map((char, i) => (
                                <span 
                                  key={`${msg.id}-${msg.content.length}-${i}`}
                                  className="animate-typing-char"
                                  style={{ animationDelay: `${i * 15}ms` }}
                                >
                                  {char}
                                </span>
                              ))}
                              <span className="typing-cursor"></span>
                            </p>
                          ) : (
                            <p className="text-bubble whitespace-pre-wrap">{msg.content}</p>
                          )}
                      
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
                                  setChatHistory(prev => 
                                    prev.map(m => 
                                      m.id === msg.id 
                                        ? { ...m, imageLoaded: true }
                                        : m
                                    )
                                  );
                                }}
                              />
                            </div>
                          )}
                          
                    
                          {/* Add Rate Session button for the rate-session-prompt message */}
                          {msg.id === 'rate-session-prompt' && !ratingSubmitted && (
                            <div className="mt-3">
                              <button 
                                onClick={() => setShowRatingModal(true)}
                                className="px-4 py-2 bg-[var(--primary)] text-white rounded-lg hover:bg-[var(--primary-dark)] transition-colors"
                              >
                                Rate Your Session
                              </button>
                            </div>
                          )}
                        
                          {msg.role === 'assistant' && msg.id !== 'rate-session-prompt' && (
                            <div className="mt-2 flex justify-end space-x-2">
                              {currentPlayingId === msg.id ? (
                                <button 
                                  onClick={() => {
                                    if (audioRef.current) {
                                      audioRef.current.pause();
                                      setIsPlaying(false);
                                      setCurrentPlayingId(null);
                                    }
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
          </div>
          
          {/* Right Column - Always visible, contains session phase and settings toggle */}
          <div className="md:w-1/4 md:max-w-xs flex flex-col gap-4">
            {/* Session Phase Indicator - Always visible */}
            {sessionStartTime && (
              <div className="card p-4 bg-white dark:bg-[var(--background-alt)]/90 border border-[var(--primary)]/10">
                <h3 className="text-sm font-medium mb-2">Session Phase</h3>
                <div className={`w-full p-3 rounded-lg text-center font-medium ${getSessionPhase(sessionStartTime).color}`}>
                  {getSessionPhase(sessionStartTime).phase}
                </div>
                <div className="w-full bg-[var(--background)] rounded-full h-2 mt-2">
                  <div 
                    className="bg-[var(--primary)] h-2 rounded-full" 
                    style={{ width: `${Math.min(100, (minutesActive / sessionLength) * 100)}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs mt-1 text-foreground/70">
                  <span>{minutesActive} min</span>
                  <span>{sessionLength} min</span>
                </div>
                
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
              </div>
            )}
            
            {/* Settings Panel - Shown/hidden based on settingsCollapsed state */}
            <div className={`card h-full overflow-hidden bg-[var(--background-alt)]/50 border-l border-[var(--primary)]/10 ${
              settingsCollapsed ? 'hidden' : 'block'
            }`} style={{ maxHeight: 'calc(100vh - 350px)' }}>
              {/* Add a header with close button - keep this outside the scrollable area */}
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
              
              {/* Make this div scrollable */}
              <div className="p-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 410px)' }}>
              
              {/* Specialist Selection - First setting now */}
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-2">Specialist Type</h3>
                <div className="grid grid-cols-2 gap-2">
                  {specialists
                    .filter(specialist => !specialist.hidden)
                    .map(specialist => (
                      <button
                        key={specialist.id}
                        onClick={() => updateSelectedSpecialist(specialist.id)}
                        className={`p-2 rounded-lg border text-sm ${
                          selectedSpecialist === specialist.id 
                            ? (specialist.id === "herosjourney" 
                                ? 'bg-[var(--accent)]/10 border-[var(--accent)] text-[var(--accent)]'
                                : 'bg-[var(--primary)]/10 border-[var(--primary)] text-[var(--primary)]')
                            : 'border-black/10 dark:border-white/10 hover:bg-[var(--background-alt)]'
                        }`}
                      >
                        {specialist.name}
                      </button>
                    ))}
                </div>
                <p className="text-xs text-foreground/60 mt-2">
                  {specialists.find(s => s.id === selectedSpecialist)?.description || 
                   "General therapeutic support for various concerns"}
                </p>
              </div>
              
              {/* Session Length Selection - Third setting */}
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-2">Session Length</h3>
                <div className="grid grid-cols-3 gap-2">
                  {[15, 30, 45].map((length) => (
                    <button
                      key={length}
                      onClick={() => updateSessionLength(length)}
                      disabled={isUpdatingPreference}
                      className={`p-2 rounded-lg border text-sm ${
                        sessionLength === length 
                          ? 'bg-[var(--primary)]/10 border-[var(--primary)] text-[var(--primary)]' 
                          : 'border-black/10 dark:border-white/10 hover:bg-[var(--background-alt)]'
                      } ${isUpdatingPreference ? 'opacity-50 cursor-wait' : ''}`}
                    >
                      {length} min
                    </button>
                  ))}
                </div>
                {isUpdatingPreference && (
                  <div className="text-xs text-foreground/60 mt-2 flex items-center">
                    <div className="w-3 h-3 border-2 border-[var(--primary)] border-t-transparent rounded-full animate-spin mr-2"></div>
                    Saving...
                  </div>
                )}
              </div>
              
              {/* Voice Mode Toggle - Fourth setting */}
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
                  When enabled, TherapyKin will automatically generate illustrations for messages.
                </p>
              </div>
              
              {/* Voice Selection - Only show if voice mode is on */}
              {voiceMode && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium mb-2">Voice Selection</h3>
                  <select
                    className="w-full p-2 text-sm border border-black/10 dark:border-white/10 rounded-lg bg-[var(--background)]"
                    value={selectedVoice}
                    onChange={(e) => updatePreferredVoice(e.target.value)}
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
                    <strong>Voice Recording:</strong> Use the microphone button to speak directly to TherapyKin.
                  </p>
                  <p>
                    <strong>Voice Playback:</strong> Click "Listen" on any message to hear it read aloud.
                  </p>
                  <p>
                    <strong>Session Length:</strong> Your session will automatically end after the selected duration.
                  </p>
                </div>
              </div>
              </div>
            </div>
            
            {/* Camera Display - Updated section */}
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
                      style={{ display: 'block' }} // Ensure video is displayed as block
                      onLoadedMetadata={() => {
                        console.log('Video metadata loaded');
                        if (videoRef.current) {
                          videoRef.current.play().catch(e => console.error('Error playing video:', e));
                        }
                      }}
                    />
                  )}
                  
                  {/* Fallback message if video isn't showing - only show when stream is null */}
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
                          onClick={handleSubmit}
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
                        {/* Only show the close camera button, removed the capture button */}
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
        </div>
        
        {/* Message input - fixed to bottom */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-[var(--background)] border-t border-black/10 dark:border-white/10 z-10">
          <div className="max-w-7xl mx-auto flex">
            {/* This div creates the same layout as the chat area above */}
            <div className={`flex-grow ${settingsCollapsed ? 'md:w-3/4' : 'md:w-2/3'}`}>
              <form onSubmit={handleSubmit} className="w-full flex shadow-sm rounded-lg overflow-hidden border border-black/10 dark:border-white/10 hover:shadow-md transition-shadow duration-200">
            {/* Camera button */}
            <button 
              type="button"
              onClick={toggleCamera}
              className={`p-3 self-end transition-colors ${
                cameraEnabled 
                  ? 'bg-[var(--primary-dark)] text-white' 
                  : 'bg-[var(--background-alt)] text-foreground/70 hover:bg-[var(--primary)]/10'
              } ${sessionEnded ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={sessionEnded}
              aria-label={cameraEnabled ? "Turn camera off" : "Turn camera on"}
              aria-pressed={cameraEnabled}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
            
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                // Send on Enter, but allow Shift+Enter for newlines
                if (e.key === 'Enter' && !e.shiftKey && !sessionEnded) {
                  e.preventDefault();
                  handleSubmit(e as any);
                }
                // Keep the existing Ctrl+Enter or Cmd+Enter functionality as an alternative
                else if ((e.ctrlKey || e.metaKey) && e.key === 'Enter' && !sessionEnded) {
                  e.preventDefault();
                  handleSubmit(e as any);
                }
              }}
              placeholder={sessionEnded 
                ? "This session has ended. Please return for your next session." 
                : "Type your message here... (Enter to send, Shift+Enter for new line)"}
              className={`flex-grow p-3 focus:outline-none focus:ring-1 focus:ring-[var(--primary)] bg-[var(--card-bg)] resize-none min-h-[50px] max-h-[150px] overflow-y-auto ${
                sessionEnded ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              style={{ height: 'auto' }}
              rows={1}
              disabled={isRecording || sessionEnded}
            />
            
            {/* Warning for unsupported browsers */}
            {!isMediaRecorderSupported && (
              <div className="absolute bottom-16 left-0 right-0 mx-auto w-full max-w-md text-yellow-600 text-sm p-2 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-300 rounded-lg mb-2 text-center">
                Voice recording is not supported in your browser. Please type your message instead.
              </div>
            )}
            
            {/* Microphone button */}
            <button 
              type="button"
              onClick={isRecording ? stopRecording : startRecording}
              className={`p-3 self-end transition-colors ${
                isRecording 
                  ? 'bg-[var(--primary-dark)] text-white animate-pulse' 
                  : 'bg-[var(--background-alt)] text-foreground/70 hover:bg-[var(--primary)]/10'
              } ${sessionEnded || !isMediaRecorderSupported ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={sessionEnded || !isMediaRecorderSupported}
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
            
            {/* Send button */}
            <button 
              type="submit" 
              className={`bg-[var(--primary)] text-white p-3 hover:opacity-90 transition-opacity self-end ${
                sessionEnded ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={isRecording || sessionEnded}
              aria-label="Send message"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
              </form>
            </div>
            
            {/* Empty div to maintain the same layout as above */}
            <div className="hidden md:block md:w-1/4 md:max-w-xs"></div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Import ErrorBoundary
import ErrorBoundary from '../components/ErrorBoundary';

// Main component with Suspense boundary and ErrorBoundary
export default function ChatPage() {
  return (
    <ErrorBoundary>
      <Suspense fallback={
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow pt-24 pb-16 px-4 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p>Loading your session...</p>
            </div>
          </main>
        </div>
      }>
        <ChatSessionWithSearchParams />
      </Suspense>
    </ErrorBoundary>
  );
}
