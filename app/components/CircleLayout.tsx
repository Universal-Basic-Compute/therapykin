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

// Debug logging helper
const logMembersAndStack = (members: Member[], stack: Talker[]) => {
  console.log('Current members:', members.map(m => ({
    id: m.id,
    name: m.name,
    role: m.role,
    isDotted: m.isDotted
  })));
  console.log('Current talker stack:', stack);
};

export default function CircleLayout({ activeSpeaker, onSpeakerChange, isPeekMode, circleMembers = [], circleId, circleData }: CircleLayoutProps) {
  const [isCircleDataLoaded, setIsCircleDataLoaded] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
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

  // Define members at the top of component
  const members: Member[] = React.useMemo(() => {
    // Only create members array when we have circle data
    if (!circleData || circleMembers.length === 0) {
      console.log('Waiting for circle data before creating members array');
      return [];
    }

    const therapist = circleData?.therapist;
    console.log('Creating members array with:', {
      therapist,
      circleMembers,
      isPeekMode
    });

    // Filter out empty slots but keep regular members
    const regularMembers = circleMembers.filter(member => 
      member.id !== 'empty' && 
      member.name && // Ensure member has a name
      !member.isDotted // Ensure not a placeholder
    );
    
    console.log('Regular members:', regularMembers);

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
      console.log('Final members array (peek mode):', allMembers);
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
      console.log('Final members array (regular mode):', allMembers);
      return allMembers;
    }
  }, [isPeekMode, circleMembers, circleData?.therapist]);

  // Store members in a ref to access in callbacks
  const membersRef = useRef(members);
  useEffect(() => {
    membersRef.current = members;
  }, [members]);

  // Create refs to hold the function implementations
  const processNextTalkerRef = useRef<() => Promise<void>>();
  const checkForMentionsAndQuestionsRef = useRef<(message: string) => void>();

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
    if (isProcessingTalk || isPlaying) {
      console.log('Already processing talk or audio playing, skipping');
      return;
    }

    let retryCount = 0;

    try {
      setIsProcessingTalk(true);
      setIsLoadingResponse(true);

      // Get available members (excluding empty slots and 'you')
      const availableMembers = members.filter(member => {
        console.log('Filtering member:', member);
        
        return (
          member.id !== 'you' && 
          member.id !== 'empty' &&
          member.name && 
          !member.isDotted
        );
      });

      if (availableMembers.length === 0) {
        console.error('No members available to talk. Current members:', members);
        setIsProcessingTalk(false);
        setIsLoadingResponse(false);
        return;
      }

      // Get next speaker using currentSpeakerIndex with modulo to stay in bounds
      const nextTalker = availableMembers[currentSpeakerIndex % availableMembers.length];
      console.log(`Processing next talker: ${nextTalker.name}`);

      // Construct the system message
      const systemMessage = `<system>Continuing group therapy conversation. Current speaker: ${nextTalker.name}${nextTalker.role ? ` (${nextTalker.role})` : ''}</system>`;

      // Make API request and get response
      const response = await fetch('/api/kinos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: systemMessage,
          firstName: 'Circle', 
          specialist: circleData?.specialist || 'generalist',
          pseudonym: `circle-${circleId}-${nextTalker.id}`
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      
      // Generate audio for TTS
      const audioUrl = await textToSpeech(data.response, nextTalker.id);
      const messageId = `msg-${Date.now()}`;

      // If current audio is playing, wait for it to finish
      if (isPlaying && audioRef.current) {
        await new Promise(resolve => {
          audioRef.current!.addEventListener('ended', resolve, { once: true });
        });
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

      // Update speaker index for next turn
      setCurrentSpeakerIndex((prevIndex) => 
        (prevIndex + 1) % availableMembers.length
      );

      // Reset processing flags
      setIsProcessingTalk(false);
      setIsLoadingResponse(false);

      // Play the audio, and when it starts, trigger the next message preparation
      if (audioUrl) {
        playAudio(audioUrl, messageId);
        // Start preparing the next message as soon as this one starts playing
        processNextTalkerRef.current?.();
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
        audioRef.current.pause();
        
        // Normalize the audio before playing
        const normalizedUrl = await normalizeAudio(audioUrl);
        
        audioRef.current.src = normalizedUrl;
        setCurrentPlayingId(messageId);
        
        // Set up event handlers
        audioRef.current.onplay = () => {
          setIsPlaying(true);
          // Start preparing the next message when this one starts playing
          processNextTalkerRef.current?.();
        };

        audioRef.current.onended = () => {
          setIsPlaying(false);
          setCurrentPlayingId(null);
          // Clean up the normalized audio URL
          URL.revokeObjectURL(normalizedUrl);
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


  // Add more detailed logging
  console.log('CircleLayout props:', {
    activeSpeaker,
    isPeekMode,
    circleMembers,
    circleId,
    circleData,
    memberCount: circleMembers?.length || 0
  });

  // Log each member's details
  circleMembers?.forEach(member => {
    console.log('Member details:', {
      id: member.id,
      name: member.name,
      role: member.role,
      isTherapist: member.id === 'therapist'
    });
  });

  // Log members array after processing
  console.log('Processed members array:', members.map(m => ({
    id: m.id,
    name: m.name,
    role: m.role,
    isDotted: m.isDotted,
    color: m.color
  })));


  // Add effect to wait for circle data
  useEffect(() => {
    if (circleData && circleMembers.length > 0) {
      console.log('Circle data and members loaded:', {
        circleData,
        memberCount: circleMembers.length
      });
      setIsCircleDataLoaded(true);
      setIsInitialized(true);
    } else {
      console.log('Waiting for circle data and members:', {
        hasCircleData: !!circleData,
        memberCount: circleMembers.length
      });
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
        
        // Log the members we're working with
        console.log('Sending initial message with members:', members);
        
        const presentMembers = members
          .filter(m => {
            console.log('Filtering member:', m);
            return !m.isDotted && m.name && m.id !== 'empty'; // Only include valid members
          })
          .map(m => {
            console.log('Mapping member:', m);
            return `${m.name}${m.role ? ` (${m.role})` : ''}`;
          });

        console.log('Present members for initial message:', presentMembers);
        
        if (presentMembers.length === 0) {
          console.error('No valid members found for initial message');
          return;
        }

        const systemMessage = `<system>New group therapy session started. Present members: ${presentMembers.join(', ')}</system>`;
        
        // Determine if this is a hero's journey circle
        const isHerosJourneyCircle = ['addiction', 'depression', 'ptsd', 'life-purpose'].includes(circleId);
        
        // Use the correct pseudonym format for the therapist
        const therapistPseudonym = `${circleId}-therapist`;
        
        console.log(`Sending initial message for ${isHerosJourneyCircle ? 'Hero\'s Journey' : 'regular'} circle: ${circleId}`);
        console.log('Using system message:', systemMessage);
        
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

        // Add delay before starting conversation
        setTimeout(() => {
          processNextTalkerRef.current?.();
        }, 2000);

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
            <div className="flex-grow bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4 overflow-y-auto">
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
                            <Image
                              src={`/members/${circleId}-${message.memberId}.jpg`}
                              alt={message.sender || ''}
                              fill
                              className="object-cover"
                              sizes="40px"
                            />
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
          </div>
        </div>
      </div>

      {/* Members Sidebar - Fixed width */}
      <div className="w-80 space-y-4">
        <h2 className="text-xl font-semibold mb-4">Circle Members</h2>
        {members.map((member, index) => {
          const imagePath = member.id === 'you' ? '/members/default.jpg' : `/members/${circleId}-${member.id}.jpg`;
          console.log('Loading image for member:', {
            memberId: member.id,
            memberName: member.name,
            imagePath,
            circleId
          });

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
                  ) : (
                    <div className="relative w-full h-full rounded-full overflow-hidden">
                      <Image
                        src={imagePath}
                        alt={member.name}
                        fill
                        className="object-cover rounded-full"
                        sizes="64px"
                        onError={(e) => {
                          console.error('Error loading image:', {
                            memberId: member.id,
                            imagePath,
                            error: e
                          });
                        }}
                        onLoad={() => {
                          console.log('Successfully loaded image:', {
                            memberId: member.id,
                            imagePath
                          });
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
