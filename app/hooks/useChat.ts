'use client';

import { useState, useCallback, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { generatePseudonymFromEmail } from '../utils/pseudonyms';

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
}

interface UseChatOptions {
  mode?: string | null;
  specialist?: string;
  bridgeId?: string | null;
  initialMessages?: ChatMessage[];
}

export function useChat({
  mode = null,
  specialist = 'generalist',
  bridgeId = null,
  initialMessages = []
}: UseChatOptions = {}) {
  const { user } = useAuth();
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>(initialMessages);
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [sessionStartTime, setSessionStartTime] = useState<Date | null>(null);
  const [sessionEnded, setSessionEnded] = useState(false);
  const [minutesActive, setMinutesActive] = useState(0);
  const [sessionLength, setSessionLength] = useState<number>(30);
  const [sessionMode, setSessionMode] = useState<string | null>(mode);
  const [lastUserMessageTime, setLastUserMessageTime] = useState<Date | null>(null);
  
  // Function to send a message to KinOS
  const sendMessage = useCallback(async (content: string, screenshot: string | null = null) => {
    if (!user || sessionEnded) return;
    
    setIsSendingMessage(true);
    
    // Add user message to chat
    const userMessageId = `user-${Date.now()}`;
    setChatHistory(prev => [...prev, { 
      role: 'user', 
      content: content || (screenshot ? '[Image sent]' : ''), 
      id: userMessageId 
    }]);
    
    // Reset silence timer
    setLastUserMessageTime(new Date());
    
    // Set loading state
    const loadingId = Date.now().toString();
    setChatHistory(prev => [
      ...prev,
      { role: 'assistant', content: '...', id: loadingId, loading: true }
    ]);
    
    try {
      // Get or generate pseudonym
      let userPseudonym = user?.pseudonym;
      if (!userPseudonym) {
        const generatedPseudonym = generatePseudonymFromEmail(user?.email || '');
        userPseudonym = generatedPseudonym.name;
        
        // Save pseudonym
        try {
          await fetch('/api/users/update-pseudonym', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ pseudonym: userPseudonym }),
          });
        } catch (error) {
          console.error('Error saving pseudonym:', error);
        }
      }
      
      // Determine the API endpoint based on whether this is a bridge or regular chat
      const endpoint = bridgeId ? '/api/bridges/messages' : '/api/kinos';
      
      // Create request body
      const requestBody: any = {
        content,
        firstName: user?.firstName || 'Guest',
        attachments: [],
        images: [],
        mode: sessionMode,
        specialist,
        screenshot,
        pseudonym: userPseudonym
      };
      
      // Add bridgeId if this is a bridge chat
      if (bridgeId) {
        requestBody.bridgeId = bridgeId;
      }
      
      // Send message to API
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });
      
      if (!response.ok) {
        throw new Error(`API returned status ${response.status}`);
      }
      
      const data = await response.json();
      
      // Update chat history with the response
      setChatHistory(prev => 
        prev.map(msg => 
          msg.id === loadingId 
            ? { 
                role: 'assistant', 
                content: data.text || data.content || data.message || data.result || data, 
                id: loadingId, 
                loading: false,
                skipAutoIllustrate: true
              }
            : msg
        )
      );
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Update with error message
      setChatHistory(prev => 
        prev.map(msg => 
          msg.id === loadingId 
            ? { role: 'assistant', content: "I'm sorry, I encountered an error. Please try again.", id: loadingId, loading: false }
            : msg
        )
      );
    } finally {
      setIsSendingMessage(false);
    }
  }, [user, sessionEnded, sessionMode, specialist, bridgeId]);
  
  // Function to fetch previous messages
  const fetchMessages = useCallback(async () => {
    if (!user || !sessionId || isSendingMessage) return;
    
    try {
      // Determine the API endpoint based on whether this is a bridge or regular chat
      const endpoint = bridgeId 
        ? `/api/bridges/messages?bridgeId=${bridgeId}` 
        : `/api/kinos/messages?firstName=${user.firstName}&specialist=${specialist}&pseudonym=${user.pseudonym}`;
      
      const response = await fetch(endpoint);
      
      if (!response.ok) {
        throw new Error(`API returned status ${response.status}`);
      }
      
      const data = await response.json();
      
      // Only update chat history if it's empty or if we have more messages than before
      if (chatHistory.length === 0 || data.length > chatHistory.length) {
        // Convert messages to our chat format
        const formattedMessages: ChatMessage[] = data.map((msg: any, index: number) => ({
          role: msg.role as 'user' | 'assistant',
          content: msg.content,
          id: `${msg.role}-${index}-${new Date(msg.timestamp).getTime()}`
        }));
        
        setChatHistory(formattedMessages);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  }, [user, sessionId, isSendingMessage, chatHistory.length, bridgeId, specialist]);
  
  // Initialize session
  useEffect(() => {
    if (!user) return;
    
    // For bridge chats, we don't need to create a session
    if (bridgeId) {
      setSessionStartTime(new Date());
      fetchMessages();
      return;
    }
    
    // For regular chats, create or fetch a session
    async function initializeSession() {
      try {
        // Check for ongoing session
        const response = await fetch('/api/sessions/ongoing');
        
        if (response.ok) {
          const session = await response.json();
          
          if (session && session.id) {
            setSessionId(session.id);
            setSessionStartTime(new Date(session.createdAt));
            setSessionLength(session.sessionLength || 30);
            setMinutesActive(Math.floor((new Date().getTime() - new Date(session.createdAt).getTime()) / (60 * 1000)));
          } else {
            // Create new session
            const createResponse = await fetch('/api/sessions/create', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                sessionLength,
                specialist
              }),
            });
            
            if (createResponse.ok) {
              const newSession = await createResponse.json();
              setSessionId(newSession.id);
              setSessionStartTime(new Date(newSession.createdAt));
              setMinutesActive(0);
            }
          }
        }
      } catch (error) {
        console.error('Error initializing session:', error);
      }
    }
    
    initializeSession();
  }, [user, bridgeId, sessionLength, specialist, fetchMessages]);
  
  // Update session mode based on timing
  useEffect(() => {
    if (!sessionStartTime) return;
    
    const updateSessionMode = () => {
      const now = new Date();
      const sessionDuration = (now.getTime() - sessionStartTime.getTime()) / 1000 / 60; // in minutes
      
      const SESSION_DURATION = sessionLength;
      const openingPhaseEnd = Math.max(1, Math.floor(SESSION_DURATION * 0.08));
      const closingPhaseStart = SESSION_DURATION - 2;
      
      if (sessionDuration <= openingPhaseEnd) {
        setSessionMode('session_opening');
        setSessionEnded(false);
      } 
      else if (sessionDuration >= closingPhaseStart && sessionDuration < SESSION_DURATION) {
        setSessionMode('session_closing');
        setSessionEnded(false);
      }
      else if (sessionDuration >= SESSION_DURATION) {
        setSessionMode('session_ended');
        setSessionEnded(true);
      }
      else {
        setSessionMode(null);
        setSessionEnded(false);
      }
      
      // Update minutes active
      setMinutesActive(Math.floor(sessionDuration));
    };
    
    updateSessionMode();
    const intervalId = setInterval(updateSessionMode, 30000); // check every 30 seconds
    
    return () => clearInterval(intervalId);
  }, [sessionStartTime, sessionLength]);
  
  return {
    chatHistory,
    setChatHistory,
    sendMessage,
    isSendingMessage,
    sessionId,
    sessionStartTime,
    sessionEnded,
    minutesActive,
    sessionLength,
    setSessionLength,
    sessionMode,
    fetchMessages,
    lastUserMessageTime,
    setLastUserMessageTime
  };
}
