'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import CircleMember from './CircleMember';

// Helper function to write strings to DataView
const writeString = (view: DataView, offset: number, string: string) => {
  for (let i = 0; i < string.length; i++) {
    view.setUint8(offset + i, string.charCodeAt(i));
  }
};

// Audio normalization function
const normalizeAudio = async (audioUrl: string): Promise<string> => {
  try {
    // Create audio context
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    // Fetch the audio data
    const response = await fetch(audioUrl);
    const arrayBuffer = await response.arrayBuffer();
    
    // Decode the audio data
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    
    // Create an offline context for processing
    const offlineContext = new OfflineAudioContext(
      audioBuffer.numberOfChannels,
      audioBuffer.length,
      audioBuffer.sampleRate
    );
    
    // Create buffer source
    const source = offlineContext.createBufferSource();
    source.buffer = audioBuffer;
    
    // Create gain node for volume adjustment
    const gainNode = offlineContext.createGain();
    
    // Calculate the root mean square (RMS) value
    let sum = 0;
    for (let i = 0; i < audioBuffer.length; i++) {
      sum += Math.pow(audioBuffer.getChannelData(0)[i], 2);
    }
    const rms = Math.sqrt(sum / audioBuffer.length);
    
    // Target RMS value (adjust this to change the overall volume)
    const targetRms = 0.2;
    
    // Calculate the required gain
    const gain = targetRms / rms;
    gainNode.gain.value = gain;
    
    // Connect nodes
    source.connect(gainNode);
    gainNode.connect(offlineContext.destination);
    
    // Start the source
    source.start(0);
    
    // Render the audio
    const normalizedBuffer = await offlineContext.startRendering();
    
    // Convert back to WAV/MP3
    const normalizedBlob = await new Promise<Blob>((resolve) => {
      const channels = normalizedBuffer.numberOfChannels;
      const length = normalizedBuffer.length * channels * 2;
      const buffer = new ArrayBuffer(44 + length);
      const view = new DataView(buffer);
      
      // Write WAV header
      writeString(view, 0, 'RIFF');
      view.setUint32(4, 36 + length, true);
      writeString(view, 8, 'WAVE');
      writeString(view, 12, 'fmt ');
      view.setUint32(16, 16, true);
      view.setUint16(20, 1, true);
      view.setUint16(22, channels, true);
      view.setUint32(24, normalizedBuffer.sampleRate, true);
      view.setUint32(28, normalizedBuffer.sampleRate * channels * 2, true);
      view.setUint16(32, channels * 2, true);
      view.setUint16(34, 16, true);
      writeString(view, 36, 'data');
      view.setUint32(40, length, true);
      
      // Write audio data
      const offset = 44;
      for (let i = 0; i < normalizedBuffer.length; i++) {
        for (let channel = 0; channel < channels; channel++) {
          const sample = normalizedBuffer.getChannelData(channel)[i];
          const int16 = Math.max(-1, Math.min(1, sample)) * 0x7FFF;
          view.setInt16(offset + (i * channels + channel) * 2, int16, true);
        }
      }
      
      resolve(new Blob([buffer], { type: 'audio/wav' }));
    });
    
    return URL.createObjectURL(normalizedBlob);
  } catch (error) {
    console.error('Error normalizing audio:', error);
    return audioUrl; // Return original URL if normalization fails
  }
};

interface Talker {
  id: string;
  name: string;
  role?: string;
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  id: string;
  sender?: string;
  memberId?: string;
  audio?: string;
  loading?: boolean;
}

interface Member {
  id: string;
  name: string;
  weeksAtStart?: number;
  role?: string;
  color: string;
  isDotted?: boolean;
  onClick?: () => void;
}

// Constants for message timing
const CHARS_PER_SECOND = 16.5; // Slightly faster reading pace
const MIN_MESSAGE_DELAY = 3600; // Minimum 3.6 seconds between messages
const AUDIO_BUFFER_TIME = 500; // Extra buffer time after audio finishes

interface CircleLayoutProps {
  message?: string;
  onMessageChange?: (message: string) => void;
  activeSpeaker: string;
  onSpeakerChange: (speaker: string) => void;
  isPeekMode?: boolean;
  circleMembers?: Member[];
  circleId: string;
  circleData?: any;
}

const memberVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  hover: { scale: 1.02, transition: { duration: 0.2 } }
};

// Debug logging helper - removed excessive logging

// Function to ask the therapist who should speak next
const askTherapistForNextSpeaker = async (members: Member[], messages: ChatMessage[], circleId: string, circleData: any) => {
  try {
    // Get the therapist from the members
    const therapist = members.find(m => m.id === 'therapist');
    if (!therapist) {
      console.error('No therapist found in members');
      return null;
    }
    
    // Create a list of available speakers (excluding empty slots and 'you')
    const availableSpeakers = members
      .filter(member => (
        member.id !== 'empty' &&
        member.id !== 'you' &&
        member.name && 
        !member.isDotted
      ))
      .map(member => ({
        id: member.id,
        name: member.name,
        role: member.role || null
      }));
    
    // Get the last message to include in the prompt
    const lastMessage = messages.length > 0 ? messages[messages.length - 1] : null;
    const lastMessageText = lastMessage ? `Last message was from ${lastMessage.sender}: "${lastMessage.content}"` : '';
    
    // Create the system message for the therapist - now asking for an explanation and including last message
    const systemMessage = `<system>Based on the conversation, who should talk next? First provide a brief explanation of your choice (1-2 sentences), then answer with the ID in a JSON format. ${lastMessageText} Available speakers: ${JSON.stringify(availableSpeakers)}</system>`;
    
    // Include all messages in the conversation history
    const conversationHistory = messages.map(msg => {
      const speaker = msg.memberId === 'you' ? 'You' : msg.sender;
      return `${speaker}: ${msg.content}`;
    }).join('\n\n');
    
    // Combine system message with conversation history
    const fullPrompt = `${systemMessage}\n\n${conversationHistory}`;
    
    // Keep this important log for tracking conversation flow
    console.log('Asking therapist who should speak next...');
    
    // Make API request to the analysis endpoint
    const response = await fetch('/api/kinos/analysis', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: fullPrompt,
        firstName: 'Circle',
        specialist: circleData?.specialist || 'generalist',
        pseudonym: `circle-${circleId}-therapist`,
        min_files: 1,
        max_files: 2
      }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to get next speaker analysis');
    }
    
    const data = await response.json();
    
    // Check if this is an analysis response (should have isAnalysis flag)
    if (!data.isAnalysis) {
      console.error('Response from analysis endpoint is missing isAnalysis flag');
    }
    
    // Log the raw response but don't display it in the chat
    console.log('Therapist analysis raw response:', data.response);
    
    // Parse the response to get the next speaker ID
    let nextSpeakerId = null;
    let explanation = '';
    
    try {
      // Extract the explanation part (everything before the JSON)
      const jsonStartIndex = data.response.indexOf('{');
      if (jsonStartIndex > 0) {
        explanation = data.response.substring(0, jsonStartIndex).trim();
        console.log('Therapist explanation:', explanation);
        
        // Parse the JSON part
        const jsonPart = data.response.substring(jsonStartIndex);
        const responseJson = JSON.parse(jsonPart);
        if (responseJson && responseJson.id) {
          nextSpeakerId = responseJson.id;
          console.log('Therapist chose next speaker (JSON format):', nextSpeakerId);
        }
      } else {
        // Try to parse the whole response as JSON (fallback)
        const responseJson = JSON.parse(data.response);
        if (responseJson && responseJson.id) {
          nextSpeakerId = responseJson.id;
          console.log('Therapist chose next speaker (JSON format, no explanation):', nextSpeakerId);
        }
      }
    } catch (parseError) {
      console.log('Could not parse response as JSON, trying regex...');
      // If parsing fails, try to extract the ID using regex
      const idMatch = data.response.match(/"id"\s*:\s*"([^"]+)"/);
      if (idMatch && idMatch[1]) {
        nextSpeakerId = idMatch[1];
        console.log('Therapist chose next speaker (regex match):', nextSpeakerId);
      }
    }
    
    // If we couldn't get a valid speaker ID, return a random one
    if (!nextSpeakerId) {
      console.warn('Could not determine next speaker from therapist response, selecting randomly');
      const randomIndex = Math.floor(Math.random() * availableSpeakers.length);
      nextSpeakerId = availableSpeakers[randomIndex].id;
      console.log('Randomly selected speaker:', nextSpeakerId);
    }
    
    // Log the chosen speaker's details
    const chosenSpeaker = availableSpeakers.find(s => s.id === nextSpeakerId);
    console.log('Next speaker details:', chosenSpeaker);
    
    return nextSpeakerId;
    
  } catch (error) {
    console.error('Error asking therapist for next speaker:', error);
    return null;
  }
};

export default function CircleLayout({ 
  activeSpeaker, 
  onSpeakerChange, 
  isPeekMode, 
  circleMembers = [], 
  circleId, 
  circleData,
  message = '',
  onMessageChange = () => {}
}: CircleLayoutProps) {
  const [isCircleDataLoaded, setIsCircleDataLoaded] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    // Set flag to cancel any pending AI message
    shouldCancelNextAiMessageRef.current = true;
    
    // Add the user message to the messages array
    const userMessageId = `user-${Date.now()}`;
    setMessages(prev => [
      ...prev,
      {
        role: 'user',
        content: message,
        id: userMessageId,
        sender: 'You',
        memberId: 'you'
      }
    ]);
    
    // Clear the input field
    onMessageChange('');
    
    // Reset the cancel flag after adding the user message
    shouldCancelNextAiMessageRef.current = false;
    
    // Continue with the normal conversation flow
    // If no audio is playing, ask the therapist who should speak next
    if (!isPlaying) {
      setTimeout(async () => {
        // Ask the therapist who should speak next
        const nextSpeakerId = await askTherapistForNextSpeaker(members, messages, circleId, circleData);
        
        if (nextSpeakerId) {
          // Find the index of the next speaker in the available members
          const availableMembers = members.filter(member => (
            member.id !== 'you' && 
            member.id !== 'empty' &&
            member.name && 
            !member.isDotted
          ));
          
          const nextSpeakerIndex = availableMembers.findIndex(m => m.id === nextSpeakerId);
          
          if (nextSpeakerIndex >= 0) {
            // Update the current speaker index
            setCurrentSpeakerIndex(nextSpeakerIndex);
            
            // Process the next talker - this will play the audio which will trigger the next speaker selection
            processNextTalkerRef.current?.();
          } else {
            console.error(`Next speaker ID ${nextSpeakerId} not found in available members`);
            // Fall back to the current speaker index
            processNextTalkerRef.current?.();
          }
        } else {
          // If we couldn't get a next speaker ID, just continue with the current index
          processNextTalkerRef.current?.();
        }
      }, 1000);
    }
    // If audio is playing, the next speaker will be prepared when the current audio ends
  };
  const [showJoinModal, setShowJoinModal] = React.useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingResponse, setIsLoadingResponse] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPlayingId, setCurrentPlayingId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentSpeakerIndex, setCurrentSpeakerIndex] = useState<number>(0);
  const [isProcessingTalk, setIsProcessingTalk] = useState(false);
  const initialMessageSentRef = useRef(false);
  // We're keeping these refs but they won't be used for forcing therapist responses
  const [userMessagePendingRef, userMessageContentRef] = [useRef(false), useRef('')];
  // Add a new ref to track if we should cancel the next AI message
  const shouldCancelNextAiMessageRef = useRef(false);
  // Add a ref to store the next prepared message
  const nextPreparedMessageRef = useRef<{
    messageId: string, 
    audioUrl: string,
    messageData?: {
      role: 'assistant',
      content: string,
      id: string,
      sender: string,
      memberId: string,
      audio: string
    }
  } | null>(null);

  // Define members at the top of component
  const members: Member[] = React.useMemo(() => {
    // Only create members array when we have circle data
    if (!circleData || circleMembers.length === 0) {
      return [];
    }

    const therapist = circleData?.therapist;

    // Filter out empty slots but keep regular members
    const regularMembers = circleMembers.filter(member => 
      member.id !== 'empty' && 
      member.name && // Ensure member has a name
      !member.isDotted // Ensure not a placeholder
    );

    if (isPeekMode) {
      const allMembers = [
        ...(therapist ? [therapist] : []),
        ...regularMembers,
        // Add empty slots last
        ...circleMembers.filter(member => member.id === 'empty').map(member => ({
          ...member,
          onClick: () => setShowJoinModal(true)
        }))
      ];
      return allMembers;
    } else {
      const youMember: Member = {
        id: 'you',
        name: 'You',
        weeksAtStart: 3,
        color: 'from-yellow-300 to-yellow-400'
      };
      
      const allMembers = [
        ...(therapist ? [therapist] : []),
        youMember,
        ...regularMembers
      ];
      return allMembers;
    }
  }, [isPeekMode, circleMembers, circleData?.therapist]);

  // Store members in a ref to access in callbacks
  const membersRef = useRef(members);
  useEffect(() => {
    membersRef.current = members;
  }, [members]);

  // Create refs to hold the function implementations
  const processNextTalkerRef = useRef<() => Promise<void>>(() => Promise.resolve());
  const checkForMentionsAndQuestionsRef = useRef<(message: string) => void>(() => {});
  
  // We're removing the processUserMessage function as we're no longer forcing
  // the therapist to respond immediately after a user message

  // Define checkForMentionsAndQuestions implementation
  checkForMentionsAndQuestionsRef.current = (message: string) => {
    const containsYouMention = /\byou\b/i.test(message);
    const containsQuestion = /\?/.test(message);

    if (containsYouMention || containsQuestion) {
      console.log('Message contains direct mention or question, using interactive timing');
      
      const readingTimeMs = Math.max(
        MIN_MESSAGE_DELAY,
        (message.length / CHARS_PER_SECOND) * 1000
      );
      
      const interactiveDelay = Math.max(readingTimeMs, 3000);
      
      if (!isPlaying && processNextTalkerRef.current) {
        setTimeout(() => {
          processNextTalkerRef.current?.();
        }, interactiveDelay);
      }
    }
  };

  processNextTalkerRef.current = async () => {
    // Check if we should cancel this message due to a user message
    if (shouldCancelNextAiMessageRef.current) {
      console.log('Canceling AI message because user sent a message');
      return;
    }

    if (isProcessingTalk || isPlaying) {
      console.log('Already processing talk or audio playing, skipping');
      return;
    }

    let retryCount = 0;

    try {
      setIsProcessingTalk(true);
      setIsLoadingResponse(true);

      // Get available members (excluding empty slots and 'you')
      const availableMembers = members.filter(member => (
        member.id !== 'you' && 
        member.id !== 'empty' &&
        member.name && 
        !member.isDotted
      ));

      if (availableMembers.length === 0) {
        console.error('No members available to talk. Current members:', members);
        setIsProcessingTalk(false);
        setIsLoadingResponse(false);
        return;
      }

      // Get next speaker using currentSpeakerIndex with modulo to stay in bounds
      const nextTalker = availableMembers[currentSpeakerIndex % availableMembers.length];
      console.log(`Processing next talker: ${nextTalker.name}`);

      // Construct the system message with the new format
      const systemMessage = `<system>You are ${nextTalker.name}${nextTalker.role ? `, ${nextTalker.role}` : ''}. \nRespond to the conversation naturally and briefly.</system>`;

      // Find the last message from this kin
      const lastMessageIndex = messages.findLastIndex(msg => msg.memberId === nextTalker.id);
    
      // Get all messages SINCE the last message from this kin (not including it)
      // If no previous message from this kin, include all messages
      const relevantMessages = lastMessageIndex >= 0 
        ? messages.slice(lastMessageIndex + 1) // Get messages AFTER the last message from this kin
        : messages;
    
      // Create a conversation history string from relevant messages
      const conversationHistory = relevantMessages.map(msg => {
        const speaker = msg.memberId === 'you' ? 'You' : msg.sender;
        return `${speaker}: ${msg.content}`;
      }).join('\n\n');

      // Combine system message with conversation history
      const fullPrompt = `${systemMessage}\n\n${conversationHistory}`;

      // Make API request and get response
      const response = await fetch('/api/kinos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: fullPrompt,
          firstName: 'Circle', 
          specialist: circleData?.specialist || 'generalist',
          pseudonym: `circle-${circleId}-${nextTalker.id}`
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      
      // Check again if we should cancel this message
      if (shouldCancelNextAiMessageRef.current) {
        console.log('Canceling AI message after API response because user sent a message');
        setIsProcessingTalk(false);
        setIsLoadingResponse(false);
        return;
      }
      
      // Generate audio for TTS
      const audioUrl = await textToSpeech(data.response, nextTalker.id);
      const messageId = `msg-${Date.now()}`;

      // If current audio is playing, wait for it to finish
      if (isPlaying && audioRef.current) {
        await new Promise(resolve => {
          audioRef.current!.addEventListener('ended', resolve, { once: true });
        });
      }

      // Check one more time if we should cancel this message
      if (shouldCancelNextAiMessageRef.current) {
        console.log('Canceling AI message before adding to UI because user sent a message');
        setIsProcessingTalk(false);
        setIsLoadingResponse(false);
        return;
      }

      // Now that previous audio is done, update messages and play new audio
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: data.response,
          id: messageId,
          sender: nextTalker.name,
          memberId: nextTalker.id,
          audio: audioUrl
        }
      ]);

      // Reset processing flags
      setIsProcessingTalk(false);
      setIsLoadingResponse(false);

      // Play the audio - this will trigger the next speaker selection
      if (audioUrl) {
        playAudio(audioUrl, messageId);
      }

    } catch (error) {
      console.error('[Circle] Error processing next talker:', error);
      setMessages(prev => [
        ...prev.filter(msg => !msg.loading),
        {
          role: 'assistant',
          content: 'I apologize, but I encountered a technical issue. Let me try again in a moment.',
          id: `error-${Date.now()}`,
          sender: 'System',
          memberId: 'system'
        }
      ]);
      setIsProcessingTalk(false);
      setIsLoadingResponse(false);

      if (retryCount === 0) {
        console.log('[Circle] Scheduling retry after error');
        setTimeout(() => {
          processNextTalkerRef.current?.();
        }, RETRY_DELAY * 2);
      }
    }
  };

  // Add a new function to prepare the next message without playing it
  const prepareNextMessage = async (speakerIndex: number, availableMembers: Member[]) => {
    // Check if we should cancel this message due to a user message
    if (shouldCancelNextAiMessageRef.current) {
      console.log('Canceling AI message preparation because user sent a message');
      return;
    }

    try {
      // Get next speaker using speakerIndex with modulo to stay in bounds
      const nextTalker = availableMembers[speakerIndex % availableMembers.length];
      console.log(`Preparing message for next talker: ${nextTalker.name}`);

      // Construct the system message with the new format
      const systemMessage = `<system>You are ${nextTalker.name}${nextTalker.role ? `, ${nextTalker.role}` : ''}. \nRespond to the conversation naturally and briefly.</system>`;

      // Find the last message from this kin
      const lastMessageIndex = messages.findLastIndex(msg => msg.memberId === nextTalker.id);
    
      // Get all messages SINCE the last message from this kin (not including it)
      // If no previous message from this kin, include all messages
      const relevantMessages = lastMessageIndex >= 0 
        ? messages.slice(lastMessageIndex + 1) // Get messages AFTER the last message from this kin
        : messages;
    
      // Create a conversation history string from relevant messages
      const conversationHistory = relevantMessages.map(msg => {
        const speaker = msg.memberId === 'you' ? 'You' : msg.sender;
        return `${speaker}: ${msg.content}`;
      }).join('\n\n');

      // Combine system message with conversation history
      const fullPrompt = `${systemMessage}\n\n${conversationHistory}`;

      // Make API request and get response
      const response = await fetch('/api/kinos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: fullPrompt,
          firstName: 'Circle', 
          specialist: circleData?.specialist || 'generalist',
          pseudonym: `circle-${circleId}-${nextTalker.id}`
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      
      // Check again if we should cancel this message
      if (shouldCancelNextAiMessageRef.current) {
        console.log('Canceling AI message after API response because user sent a message');
        return;
      }
      
      // Generate audio for TTS
      const audioUrl = await textToSpeech(data.response, nextTalker.id);
      const messageId = `msg-${Date.now()}`;

      // Check one more time if we should cancel this message
      if (shouldCancelNextAiMessageRef.current) {
        console.log('Canceling AI message before adding to UI because user sent a message');
        return;
      }

      // Check if audio is currently playing
      if (isPlaying) {
        // If audio is playing, store the prepared message for later display and playback
        nextPreparedMessageRef.current = {
          messageId,
          audioUrl,
          messageData: {
            role: 'assistant',
            content: data.response,
            id: messageId,
            sender: nextTalker.name,
            memberId: nextTalker.id,
            audio: audioUrl
          }
        };
        console.log(`Message prepared for ${nextTalker.name}, will display and play when current audio ends`);
      } else {
        // If no audio is playing, add to UI and play immediately
        setMessages(prev => [
          ...prev,
          {
            role: 'assistant',
            content: data.response,
            id: messageId,
            sender: nextTalker.name,
            memberId: nextTalker.id,
            audio: audioUrl
          }
        ]);
        
        console.log(`No audio playing, playing message from ${nextTalker.name} immediately`);
        playAudio(audioUrl, messageId);
      }

    } catch (error) {
      console.error('[Circle] Error preparing next message:', error);
    }
  };

  // Create a wrapper function to call processNextTalker
  const processNextTalker = useCallback(() => {
    return processNextTalkerRef.current?.();
  }, []);

  // Function to convert text to speech
  const textToSpeech = async (text: string, memberId?: string): Promise<string> => {
    try {
      // Get the member's voiceId from circleData
      let voiceId = 'L0Dsvb3SLTyegXwtm47J'; // Default to Archer

      if (memberId) {
        if (memberId === 'therapist' && circleData?.therapist?.voiceId) {
          voiceId = circleData.therapist.voiceId;
          console.log(`Using therapist voice ID: ${voiceId}`);
        } else {
          // Find the member in the circle data
          const member = circleData?.members?.find((m: any) => m.id === memberId);
          if (member?.voiceId) {
            voiceId = member.voiceId;
            console.log(`Using member voice ID: ${voiceId} for ${member.name}`);
          }
        }
      }

      console.log(`Requesting TTS for text: "${text.substring(0, 30)}..." with voice: ${voiceId}`);
    
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          voiceId: voiceId, // Explicitly use the correct voiceId
          model: 'eleven_flash_v2_5'
        })
      });

      if (!response.ok) {
        throw new Error(`TTS request failed with status ${response.status}`);
      }

      const blob = await response.blob();
      const audioUrl = URL.createObjectURL(blob);
      return audioUrl;
    } catch (error) {
      console.error('Error converting text to speech:', error);
      return '';
    }
  };

  const playAudio = async (audioUrl: string, messageId: string) => {
    if (audioRef.current) {
      try {
        // If something is already playing, wait for it to finish
        if (isPlaying) {
          await new Promise((resolve) => {
            audioRef.current!.addEventListener('ended', resolve, { once: true });
            audioRef.current!.addEventListener('error', resolve, { once: true });
          });
        }

        // Pause any current playback
        audioRef.current.pause();
        
        // Normalize the audio before playing
        const normalizedUrl = await normalizeAudio(audioUrl);
        
        audioRef.current.src = normalizedUrl;
        setCurrentPlayingId(messageId);
        
        // Set up event handlers
        audioRef.current.onplay = () => {
          setIsPlaying(true);
          
          // As soon as audio starts playing, ask for the next speaker
          console.log('Audio started playing, asking therapist who should speak next...');
          askTherapistForNextSpeaker(members, messages, circleId, circleData)
            .then(nextSpeakerId => {
              if (nextSpeakerId) {
                // Find the index of the next speaker in the available members
                const availableMembers = members.filter(member => (
                  member.id !== 'you' && 
                  member.id !== 'empty' &&
                  member.name && 
                  !member.isDotted
                ));
                
                const nextSpeakerIndex = availableMembers.findIndex(m => m.id === nextSpeakerId);
                
                if (nextSpeakerIndex >= 0) {
                  // Update the current speaker index
                  setCurrentSpeakerIndex(nextSpeakerIndex);
                  console.log(`Setting next speaker index to ${nextSpeakerIndex} (${availableMembers[nextSpeakerIndex].name})`);
                  
                  // Prepare the next message but don't play it yet
                  prepareNextMessage(nextSpeakerIndex, availableMembers);
                } else {
                  console.error(`Next speaker ID ${nextSpeakerId} not found in available members`);
                  // Fall back to the current speaker index
                  console.log(`Falling back to current speaker index: ${currentSpeakerIndex}`);
                  prepareNextMessage(currentSpeakerIndex, availableMembers);
                }
              } else {
                // If we couldn't get a next speaker ID, just continue with the current index
                console.log(`No next speaker ID returned, continuing with current index: ${currentSpeakerIndex}`);
                const availableMembers = members.filter(member => (
                  member.id !== 'you' && 
                  member.id !== 'empty' &&
                  member.name && 
                  !member.isDotted
                ));
                prepareNextMessage(currentSpeakerIndex, availableMembers);
              }
            });
        };

        audioRef.current.onended = () => {
          setIsPlaying(false);
          setCurrentPlayingId(null);
          URL.revokeObjectURL(normalizedUrl);
          
          console.log('Audio ended, playing next prepared message if available');
          
          // Play the next prepared message if available
          if (nextPreparedMessageRef.current) {
            const { messageId, audioUrl, messageData } = nextPreparedMessageRef.current;
            
            // Add the message to the UI now that the current audio has finished
            if (messageData) {
              setMessages(prev => [...prev, messageData]);
            }
            
            nextPreparedMessageRef.current = null; // Clear the prepared message
            
            // Play the prepared audio
            playAudio(audioUrl, messageId);
          }
        };

        audioRef.current.onerror = () => {
          setIsPlaying(false);
          setCurrentPlayingId(null);
          console.error('Error playing audio');
          URL.revokeObjectURL(normalizedUrl);
        };

        await audioRef.current.play();
      } catch (err) {
        console.error('Error playing audio:', err);
        setIsPlaying(false);
        setCurrentPlayingId(null);
      }
    }
  };


  // Maximum retries for API calls
  const MAX_RETRIES = 3;
  const RETRY_DELAY = 1000; // 1 second

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


  // Removed excessive logging


  // Add effect to wait for circle data
  useEffect(() => {
    if (circleData && circleMembers.length > 0) {
      setIsCircleDataLoaded(true);
      setIsInitialized(true);
    }
  }, [circleData, circleMembers]);

  useEffect(() => {
    const sendInitialMessage = async () => {
      // Add initialization check
      if (!isInitialized) {
        console.log('Waiting for initialization before sending initial message');
        return;
      }

      // Check if initial message was already sent
      if (initialMessageSentRef.current || messages.length > 0) {
        console.log('Initial message already sent, skipping');
        return;
      }

      // Check if we have members
      if (!members || members.length === 0) {
        console.log('No members available yet, waiting...');
        return;
      }

      try {
        setIsLoading(true);
        initialMessageSentRef.current = true;
        
        const presentMembers = members
          .filter(m => !m.isDotted && m.name && m.id !== 'empty')
          .map(m => `${m.name}${m.role ? ` (${m.role})` : ''}`);
        
        if (presentMembers.length === 0) {
          console.error('No valid members found for initial message');
          return;
        }

        const systemMessage = `<system>You are ${circleData?.therapist?.name || 'Therapist'}${circleData?.therapist?.role ? `, ${circleData?.therapist?.role}` : ''}. \nWelcome everyone to this group therapy session. Present members: ${presentMembers.join(', ')}</system>`;
        
        // Determine if this is a hero's journey circle
        const isHerosJourneyCircle = ['addiction', 'depression', 'ptsd', 'life-purpose'].includes(circleId);
    
        // Use the correct pseudonym format for the therapist
        const therapistPseudonym = `${circleId}-therapist`;
        
        const response = await fetch('/api/kinos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            content: systemMessage,
            firstName: 'Circle',
            specialist: isHerosJourneyCircle ? 'herosjourney' : 'generalist',
            pseudonym: therapistPseudonym // Use the correct therapist pseudonym
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to send message');
        }

        const data = await response.json();
        const audioUrl = await textToSpeech(data.response, 'therapist');
        const messageId = `initial-${Date.now()}`;

        setMessages([{
          role: 'assistant',
          content: data.response,
          id: messageId,
          sender: circleData?.therapist?.name || 'Therapist',
          memberId: 'therapist',
          audio: audioUrl
        }]);

        if (audioUrl) {
          playAudio(audioUrl, messageId);
        }

        // The audio playback will trigger the next speaker selection
        // We don't need to do anything else here as the flow will continue automatically

      } catch (error) {
        console.error('Error sending initial message:', error);
        initialMessageSentRef.current = false; // Reset on error
      } finally {
        setIsLoading(false);
      }
    };

    // Only proceed if we're initialized
    if (isInitialized) {
      sendInitialMessage();
    }
  }, [isInitialized, circleId]); // Remove other dependencies






  // Add check for empty members
  if (!circleMembers.length && !isPeekMode) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-foreground/60">Loading circle members...</p>
      </div>
    );
  }

  return (
    <div className="flex h-full gap-6">
      {/* Main Chat Area - Takes most of the width */}
      <div className="flex-grow">
        <div className="card h-full bg-white dark:bg-gray-800 shadow-lg p-6">
          <div className="h-full flex flex-col">
            <div className="flex-grow bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4 overflow-y-auto mb-4">
              {isLoading ? (
                <div className="flex justify-start">
                  <div className="assistant-message-bubble rounded-lg p-4 max-w-[80%] relative">
                    <span className="animate-pulse">...</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div key={message.id} className="flex items-start space-x-3">
                      {message.loading ? (
                        // Loading message display
                        <div className="flex items-start space-x-3 w-full">
                          <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0 bg-gray-200 animate-pulse"/>
                          <div className="flex-grow max-w-[80%]">
                            <div className="assistant-message-bubble p-4 rounded-lg rounded-tl-none">
                              <span className="animate-pulse">...</span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <>
                          {/* Profile picture */}
                          <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                            {message.memberId === 'you' ? (
                              // Show "Y" in a circle for user messages
                              <div className="w-full h-full rounded-full bg-gradient-to-br from-yellow-300 to-yellow-400 flex items-center justify-center text-white font-medium">
                                Y
                              </div>
                            ) : (
                              // Use image for AI members
                              <Image
                                src={`/members/${circleId}-${message.memberId}.jpg`}
                                alt={message.sender || ''}
                                fill
                                className="object-cover"
                                sizes="40px"
                              />
                            )}
                          </div>
                        
                          {/* Message content in a chat bubble */}
                          <div className="flex-grow max-w-[80%]">
                            <div className="font-medium text-sm text-[var(--primary)] mb-1">
                              {message.sender}
                            </div>
                            <div className="assistant-message-bubble p-4 rounded-lg rounded-tl-none">
                              <div className="text-bubble whitespace-pre-wrap">
                                {message.content}
                              </div>
                              {message.audio && (
                                <div className="mt-2 flex justify-end space-x-2">
                                  {currentPlayingId === message.id ? (
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
                                      onClick={() => playAudio(message.audio!, message.id)}
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
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="mt-4 border-t border-gray-200 dark:border-gray-700 pt-4">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => onMessageChange(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-grow px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                />
                <button
                  type="submit"
                  disabled={!message.trim()}
                  className={`px-4 py-2 rounded-full ${
                    !message.trim()
                      ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed'
                      : 'bg-[var(--primary)] hover:bg-[var(--primary-dark)]'
                  } text-white transition-colors`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Members Sidebar - Fixed width */}
      <div className="w-80 space-y-4">
        <h2 className="text-xl font-semibold mb-4">Circle Members</h2>
        {members.map((member, index) => {
          return (
            <motion.div
              key={member.id}
              className="card p-4 bg-white dark:bg-gray-800 shadow-lg"
              variants={memberVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center space-x-4">
                <div className="relative w-16 h-16 flex-shrink-0">
                  {member.isDotted ? (
                    <div className={`w-full h-full rounded-full border-2 border-dashed border-[var(--primary)]/50 flex items-center justify-center`}>
                      <span className="text-xs text-[var(--primary)]/70">Join?</span>
                    </div>
                  ) : member.id === 'you' ? (
                    // Use a styled div for the user avatar instead of an image
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-yellow-300 to-yellow-400 flex items-center justify-center text-white font-medium">
                      <span className="text-2xl">Y</span>
                    </div>
                  ) : (
                    <div className="relative w-full h-full rounded-full overflow-hidden">
                      <Image
                        src={`/members/${circleId}-${member.id}.jpg`}
                        alt={member.name}
                        fill
                        className="object-cover rounded-full"
                        sizes="64px"
                        onError={(e) => {
                          console.error('Error loading image for member:', member.id);
                        }}
                      />
                    </div>
                  )}
                </div>
                <div className="flex-grow min-w-0">
                  <h3 className="font-medium text-sm truncate">{member.name}</h3>
                  {member.role && (
                    <span className="inline-block px-2 py-0.5 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-xs">
                      {member.role}
                    </span>
                  )}
                </div>
              </div>
              {member.onClick && (
                <button
                  onClick={member.onClick}
                  className="mt-2 w-full px-3 py-1 bg-[var(--primary)] text-white rounded-full text-sm hover:bg-[var(--primary-dark)] transition-colors"
                >
                  Join Circle
                </button>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
