'use client';

import React, { useState, useRef, useEffect, Suspense } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { sendMessageToKinOS, fetchMessagesFromKinOS } from '../utils/kinos';
import { createSession, getOngoingSession } from '../utils/airtable';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  id?: string;
  loading?: boolean;
  audio?: string; // Add this to store audio URL
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
  const [selectedVoice, setSelectedVoice] = useState('UgBBYS2sOqTuMpoF3BR0'); // Default to Mark - Natural
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
  const [lastUserMessageTime, setLastUserMessageTime] = useState<Date | null>(null);
  const [silenceMessageSent, setSilenceMessageSent] = useState(false);
  const [isTabActive, setIsTabActive] = useState(true);
  const [selectedSpecialist, setSelectedSpecialist] = useState<string>("generalist");
  
  // Voice options
  const voiceOptions = [
    { id: 'UgBBYS2sOqTuMpoF3BR0', name: 'Mark - Natural (default)' },
    { id: 'g6xIsTj2HwM6VR4iXFCw', name: 'Jessica' },
    { id: 'TbMNBJ27fH2U0VgpSNko', name: 'Lori - Happy & Sweet' },
    { id: 'OYTbf65OHHFELVut7v2H', name: 'Hope - Natural' },
    { id: 'L0Dsvb3SLTyegXwtm47J', name: 'Archer - Calm British' },
    { id: 'kENkNtk0xyzG09WW40xE', name: 'Marcel - French' },
    { id: 'IKne3meq5aSn9XLyUdCD', name: 'Sara - Spanish' }
  ];
  
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
        console.log('Fetching user preferences...');
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
            if (specialistParam && (specialistParam === 'generalist' || specialistParam === 'crypto' || specialistParam === 'athletes' || specialistParam === 'executives')) {
              setSelectedSpecialist(specialistParam);
              console.log(`Using specialist from URL parameter: ${specialistParam}`);
    
              // Optionally update the user's preference to match the URL parameter
              updateSelectedSpecialist(specialistParam);
            } else if (data.preferences.preferredSpecialist) {
              setSelectedSpecialist(data.preferences.preferredSpecialist);
              console.log(`Loaded user's preferred specialist: ${data.preferences.preferredSpecialist}`);
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
      
      // Pass the selectedSpecialist to the createSession function
      const session = await createSession(user.email, sessionLength, selectedSpecialist);
      setSessionId(session.id);
      const startTime = new Date(session.createdAt);
      setSessionStartTime(startTime);
      setMinutesActive(0);
      setHalfwayMessageSent(false); // Reset the halfway message flag
      setClosingMessageSent(false); // Reset the closing message flag
      
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
      const response = await sendMessageToKinOS(
        welcomeMessage,
        user.firstName,
        user.lastName,
        [], // attachments
        [], // images
        'session_opening', // Use session_opening mode
        selectedSpecialist // Add selected specialist
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
      
      console.log('New session created:', session.id, 'at', startTime);
    }

    // Only run initializeSession when user, hasSessionsRemaining, and preferencesLoaded are all set
    if (user && hasSessionsRemaining !== null && preferencesLoaded) {
      console.log('All conditions met, initializing session');
      initializeSession();
    }
  }, [user, sessionId, hasSessionsRemaining, preferencesLoaded]); // Add preferencesLoaded as a dependency
  
  // Fetch previous messages when entering an existing session
  useEffect(() => {
    async function fetchPreviousMessages() {
      if (!user || !sessionId || !sessionStartTime) return;
      
      try {
        // Only fetch messages if this is an existing session (not a new one)
        if (minutesActive > 0) {
          console.log('Fetching previous messages for existing session...');
          
          // Get messages from KinOS
          const messages = await fetchMessagesFromKinOS(
            user.firstName,
            user.lastName,
            undefined, // No since parameter
            selectedSpecialist // Pass the selected specialist
          );
          
          if (messages.length > 0) {
            // Convert KinOS messages to our chat format
            const formattedMessages: ChatMessage[] = messages.map((msg, index) => ({
              role: msg.role as 'user' | 'assistant',
              content: msg.content,
              id: `${msg.role}-${index}-${new Date(msg.timestamp).getTime()}`
            }));
            
            // Update chat history with fetched messages
            setChatHistory(formattedMessages);
            console.log(`Loaded ${formattedMessages.length} messages from previous session`);
          }
        }
      } catch (error) {
        console.error('Error fetching previous messages:', error);
      }
    }
    
    fetchPreviousMessages();
  }, [user, sessionId, sessionStartTime, minutesActive]);

  // Update the session mode based on timing
  useEffect(() => {
    if (!sessionStartTime || !user) return;

    const updateSessionMode = () => {
      const now = new Date();
      const sessionDuration = (now.getTime() - sessionStartTime.getTime()) / 1000 / 60; // in minutes
      
      // Use the dynamic session length (default 30 minutes)
      const SESSION_DURATION = sessionLength;
      
      // Log the current session status
      console.log(`Session status: ${sessionDuration.toFixed(1)}/${SESSION_DURATION} minutes elapsed`);
      
      // Scale opening and closing phases based on session length
      const openingPhaseEnd = Math.max(1, Math.floor(SESSION_DURATION * 0.08)); // ~8% of session
      const halfwayPoint = SESSION_DURATION / 2; // 50% of session
      const closingPhaseStart = Math.floor(SESSION_DURATION * 0.92); // ~92% of session
      
      // Check if we're at the halfway point (within a small margin to avoid missing it)
      const isAtHalfway = sessionDuration >= halfwayPoint - 0.5 && sessionDuration <= halfwayPoint + 0.5;
      
      // Check if we're at the closing phase start (within a small margin)
      const isAtClosingPhase = sessionDuration >= closingPhaseStart - 0.5 && sessionDuration <= closingPhaseStart + 0.5;
      
      // Send halfway message if we're at the halfway point and haven't sent it yet
      if (isAtHalfway && !halfwayMessageSent && !sessionEnded) {
        console.log(`Sending halfway message at ${sessionDuration.toFixed(1)} minutes`);
          
        // Send the halfway message
        sendMessageToKinOS(
          "<system>Info: Session halfway</system>",
          user.firstName,
          user.lastName,
          [], // attachments
          [], // images
          "journey", // Use journey mode
          selectedSpecialist // Add selected specialist
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
        sendMessageToKinOS(
          "<system>Info: Session is closing soon</system>",
          user.firstName,
          user.lastName,
          [], // attachments
          [], // images
          "journey", // Use journey mode
          selectedSpecialist // Add selected specialist
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
      }
      // Middle of the session
      else {
        setSessionMode(null);
        setSessionEnded(false);
      }
    };

    // Update immediately and then every 30 seconds to ensure we don't miss the halfway point
    updateSessionMode();
    const intervalId = setInterval(updateSessionMode, 30000); // check every 30 seconds
    
    return () => clearInterval(intervalId);
  }, [sessionStartTime, sessionLength, halfwayMessageSent, closingMessageSent, user, sessionEnded]); // Add closingMessageSent as a dependency
  
  // Add effect to track tab visibility
  useEffect(() => {
    // Function to handle visibility change
    const handleVisibilityChange = () => {
      setIsTabActive(!document.hidden);
      console.log(`Tab visibility changed: ${!document.hidden ? 'active' : 'inactive'}`);
    };

    // Set up event listener
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Initial state
    setIsTabActive(!document.hidden);
    
    // Clean up
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Add effect to monitor user silence
  useEffect(() => {
    if (!user || !sessionStartTime || sessionEnded) return;
    
    // Initialize the last message time if not set
    if (!lastUserMessageTime) {
      // Find the last user message
      const userMessages = chatHistory.filter(msg => msg.role === 'user');
      if (userMessages.length > 0) {
        // If there are user messages, use the current time (assuming we just loaded existing messages)
        setLastUserMessageTime(new Date());
        console.log('Set initial last message time based on existing messages');
      } else {
        // If no user messages yet, set to session start time
        setLastUserMessageTime(sessionStartTime);
        console.log('Set initial last message time to session start time');
      }
    }
    
    // Check for silence every 30 seconds
    const silenceCheckInterval = setInterval(() => {
      if (!lastUserMessageTime || silenceMessageSent || !isTabActive) return;
      
      const now = new Date();
      const silenceDuration = (now.getTime() - lastUserMessageTime.getTime()) / 1000; // in seconds
      
      console.log(`Checking silence: ${silenceDuration.toFixed(0)} seconds since last user message (tab ${isTabActive ? 'active' : 'inactive'})`);
      
      // If user has been silent for 2:30 minutes (150 seconds)
      if (silenceDuration >= 150) {
        console.log(`User has been silent for ${silenceDuration.toFixed(0)} seconds, sending silence notification`);
        
        // Send the silence message
        sendMessageToKinOS(
          "<system>Info: The user stayed silent, maybe try to drive the conversation elsewhere? (make sure you don't repeat yourself)</system>",
          user.firstName,
          user.lastName,
          [], // attachments
          [], // images
          "journey", // Use journey mode
          selectedSpecialist // Add selected specialist
        ).then(async (response) => {
          console.log("Silence notification sent successfully");
          setSilenceMessageSent(true);
          
          // If the response is visible to the user, add it to chat and play TTS
          if (!response.includes("<system>")) {
            const messageId = `silence-${Date.now()}`;
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
          
          // Reset after 1 minute to allow another silence message if needed
          setTimeout(() => {
            setSilenceMessageSent(false);
          }, 60000);
        }).catch(error => {
          console.error("Error sending silence notification:", error);
        });
      }
    }, 30000); // Check every 30 seconds
    
    return () => clearInterval(silenceCheckInterval);
  }, [user, sessionStartTime, sessionEnded, lastUserMessageTime, silenceMessageSent, isTabActive]);

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
          
          // Play audio if voice mode is enabled
          if (voiceMode && audioUrl) {
            playAudio(audioUrl, 'session-ended-message');
          }
        })();
      }
    }
  }, [sessionEnded, chatHistory, sessionLength, voiceMode]); // Add voiceMode as a dependency

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
    if (chatContainerRef.current) {
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
      // Return empty string but show a notification to the user
      alert(`Voice playback error: ${error instanceof Error ? error.message : 'Unknown error'}`);
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

  // Function to start recording
  const startRecording = async () => {
    try {
      // Reset audio chunks
      audioChunksRef.current = [];
      
      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Create media recorder
      const mediaRecorder = new MediaRecorder(stream);
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
      
      // Create audio blob from chunks
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
      console.log(`Audio recording complete, size: ${audioBlob.size} bytes`);
      
      if (audioBlob.size > 0) {
        // Send to STT API
        await sendAudioForTranscription(audioBlob);
      }
    } catch (error) {
      console.error('Error handling recording stop:', error);
    }
  };

  // Function to send audio to STT API
  const sendAudioForTranscription = async (audioBlob: Blob) => {
    try {
      // Create form data
      const formData = new FormData();
      formData.append('file', audioBlob, 'recording.webm');
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
      
      console.log('Sending audio for transcription...');
      
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
        
        // Create a user message with the transcribed text
        const userMessageId = `user-${Date.now()}`;
        setChatHistory(prev => [
          ...prev,
          { role: 'user', content: data.text, id: userMessageId }
        ]);
        
        // Reset silence timer
        setLastUserMessageTime(new Date());
        setSilenceMessageSent(false);
        
        // Reset silence timer
        setLastUserMessageTime(new Date());
        setSilenceMessageSent(false);
        
        // Set loading state for assistant response
        const loadingId = Date.now().toString();
        setChatHistory(prev => [
          ...prev,
          { role: 'assistant', content: '...', id: loadingId, loading: true }
        ]);
        
        try {
          // Send message to KinOS API
          const response = await sendMessageToKinOS(
            data.text,
            user?.firstName || 'Guest',
            user?.lastName || 'User',
            [], // attachments
            [], // images
            sessionMode, // Add session mode
            selectedSpecialist // Add selected specialist
          );
          
          // If voice mode is enabled, convert response to speech
          let audioUrl = '';
          if (voiceMode) {
            audioUrl = await textToSpeech(response);
          }
          
          // Update chat history with the response
          setChatHistory(prev => 
            prev.map(msg => 
              msg.id === loadingId 
                ? { role: 'assistant', content: response, id: loadingId, loading: false, audio: audioUrl }
                : msg
            )
          );
          
          // Play audio if voice mode is enabled
          if (voiceMode && audioUrl) {
            playAudio(audioUrl, loadingId);
          }
          
          // Save the conversation to local storage or your backend if needed
          saveConversation([
            ...chatHistory,
            { role: 'user', content: data.text, id: userMessageId },
            { role: 'assistant', content: response, id: loadingId, loading: false, audio: audioUrl }
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
  
  // Update selected specialist
  const updateSelectedSpecialist = async (specialist: string) => {
    try {
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
      }
      
      console.log(`Specialist preference updated to: ${specialist}`);
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
    
    if (!message.trim() || sessionEnded) return;
    
    // Add user message to chat
    const userMessageId = `user-${Date.now()}`;
    setChatHistory([...chatHistory, { role: 'user', content: message, id: userMessageId }]);
    
    // Reset silence timer
    setLastUserMessageTime(new Date());
    setSilenceMessageSent(false);
    
    // Store the message to clear the input field
    const userMessage = message;
    setMessage('');
    
    // Set loading state
    const loadingId = Date.now().toString();
    setChatHistory(prev => [
      ...prev,
      { role: 'assistant', content: '...', id: loadingId, loading: true }
    ]);
    
    try {
      // Send message to KinOS API
      const response = await sendMessageToKinOS(
        userMessage,
        user?.firstName || 'Guest',
        user?.lastName || 'User',
        [], // attachments
        [], // images
        sessionMode, // Add session mode
        selectedSpecialist // Add selected specialist
      );
      
      // If voice mode is enabled, convert response to speech
      let audioUrl = '';
      if (voiceMode) {
        audioUrl = await textToSpeech(response);
      }
      
      // Update chat history with the response
      setChatHistory(prev => 
        prev.map(msg => 
          msg.id === loadingId 
            ? { role: 'assistant', content: response, id: loadingId, loading: false, audio: audioUrl }
            : msg
        )
      );
      
      // Play audio if voice mode is enabled
      if (voiceMode && audioUrl) {
        playAudio(audioUrl, loadingId);
      }
      
      // Save the conversation to local storage or your backend if needed
      saveConversation([
        ...chatHistory.filter(msg => msg.id !== loadingId),
        { role: 'user', content: userMessage, id: userMessageId },
        { role: 'assistant', content: response, id: loadingId, loading: false, audio: audioUrl }
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
  };

  // Helper function to save conversations (you can implement this as needed)
  const saveConversation = (conversation: ChatMessage[]) => {
    // This is a placeholder - implement as needed
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
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                      ) : (
                        <div>
                          <p className="text-bubble whitespace-pre-wrap">{msg.content}</p>
                          {msg.role === 'assistant' && (
                            <div className="mt-2 flex justify-end">
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
                  <button
                    onClick={() => updateSelectedSpecialist("generalist")}
                    className={`p-2 rounded-lg border text-sm ${
                      selectedSpecialist === "generalist" 
                        ? 'bg-[var(--primary)]/10 border-[var(--primary)] text-[var(--primary)]' 
                        : 'border-black/10 dark:border-white/10 hover:bg-[var(--background-alt)]'
                    }`}
                  >
                    Generalist
                  </button>
                  <button
                    onClick={() => updateSelectedSpecialist("crypto")}
                    className={`p-2 rounded-lg border text-sm ${
                      selectedSpecialist === "crypto" 
                        ? 'bg-[var(--primary)]/10 border-[var(--primary)] text-[var(--primary)]' 
                        : 'border-black/10 dark:border-white/10 hover:bg-[var(--background-alt)]'
                    }`}
                  >
                    Crypto
                  </button>
                  <button
                    onClick={() => updateSelectedSpecialist("athletes")}
                    className={`p-2 rounded-lg border text-sm ${
                      selectedSpecialist === "athletes" 
                        ? 'bg-[var(--primary)]/10 border-[var(--primary)] text-[var(--primary)]' 
                        : 'border-black/10 dark:border-white/10 hover:bg-[var(--background-alt)]'
                    }`}
                  >
                    Athletes
                  </button>
                  <button
                    onClick={() => updateSelectedSpecialist("executives")}
                    className={`p-2 rounded-lg border text-sm ${
                      selectedSpecialist === "executives" 
                        ? 'bg-[var(--primary)]/10 border-[var(--primary)] text-[var(--primary)]' 
                        : 'border-black/10 dark:border-white/10 hover:bg-[var(--background-alt)]'
                    }`}
                  >
                    Executives
                  </button>
                </div>
                <p className="text-xs text-foreground/60 mt-2">
                  {selectedSpecialist === "generalist" 
                    ? "General therapeutic support for various concerns" 
                    : selectedSpecialist === "crypto"
                    ? "Specialized support for crypto traders and investors"
                    : selectedSpecialist === "athletes"
                    ? "Mental performance support for athletes and competitors"
                    : "Leadership and executive performance support"}
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
          </div>
          </div>
        </div>
        
        {/* Message input - fixed to bottom */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-[var(--background)] border-t border-black/10 dark:border-white/10 z-10">
          <div className="max-w-7xl mx-auto flex">
            {/* This div creates the same layout as the chat area above */}
            <div className={`flex-grow ${settingsCollapsed ? 'md:w-3/4' : 'md:w-2/3'}`}>
              <form onSubmit={handleSubmit} className="w-full flex shadow-sm rounded-lg overflow-hidden border border-black/10 dark:border-white/10 hover:shadow-md transition-shadow duration-200">
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
            
            {/* Microphone button */}
            <button 
              type="button"
              onClick={isRecording ? stopRecording : startRecording}
              className={`p-3 self-end transition-colors ${
                isRecording 
                  ? 'bg-[var(--primary-dark)] text-white animate-pulse' 
                  : 'bg-[var(--background-alt)] text-foreground/70 hover:bg-[var(--primary)]/10'
              } ${sessionEnded ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={sessionEnded}
            >
              {isRecording ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
                  </svg>
                  <span className="sr-only">Stop Recording</span>
                  {recordingTime > 0 && (
                    <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-500 text-white text-xs rounded-full px-1">
                      {formatTime(recordingTime)}
                    </span>
                  )}
                </>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

// Main component with Suspense boundary
export default function ChatPage() {
  return (
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
  );
}
