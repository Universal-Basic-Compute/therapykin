'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import CircleMember from './CircleMember';

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

export default function CircleLayout({ activeSpeaker, onSpeakerChange, isPeekMode, circleMembers = [], circleId, circleData }: CircleLayoutProps) {
  const [showJoinModal, setShowJoinModal] = React.useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPlayingId, setCurrentPlayingId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [talkerStack, setTalkerStack] = useState<Talker[]>([]);
  const [isProcessingTalk, setIsProcessingTalk] = useState(false);

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

  // Function to convert text to speech
  const textToSpeech = async (text: string, retries = 3): Promise<string> => {
    try {
      console.log(`Requesting TTS for text (attempt ${4-retries}/3): "${text.substring(0, 30)}..."`);
      
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          voiceId: 'L0Dsvb3SLTyegXwtm47J', // Archer - Calm British
          model: 'eleven_flash_v2_5'
        })
      });
      
      if (!response.ok) {
        throw new Error(`TTS request failed with status ${response.status}`);
      }
      
      const blob = await response.blob();
      console.log(`Received blob of size: ${blob.size} bytes, type: ${blob.type}`);
      
      if (blob.size === 0) {
        throw new Error('Received empty audio response');
      }
      
      const audioUrl = URL.createObjectURL(blob);
      console.log(`Created audio URL: ${audioUrl}`);
      
      return audioUrl;
    } catch (error) {
      console.error('Error converting text to speech:', error);
      
      // Retry logic
      if (retries > 0) {
        console.log(`Retrying TTS request. ${retries-1} attempts remaining`);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second before retry
        return textToSpeech(text, retries - 1);
      }
      
      return ''; // Return empty string if all retries fail
    }
  };

  // Function to play audio
  const playAudio = (audioUrl: string, messageId: string) => {
    if (audioRef.current) {
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

  // Add more detailed logging
  console.log('CircleLayout props:', {
    activeSpeaker,
    isPeekMode,
    circleMembers,
    circleId,
    memberCount: circleMembers.length
  });

  // Log each member's details
  circleMembers.forEach(member => {
    console.log('Member details:', {
      id: member.id,
      name: member.name,
      role: member.role,
      isTherapist: member.id === 'therapist'
    });
  });

  // Define members FIRST before using in useEffect
  const members: Member[] = React.useMemo(() => {
    // Get the therapist from the circle data
    const therapist = circleData?.therapist;
    console.log('CircleData:', circleData);
    console.log('Found therapist from circle data:', therapist);

    // Transform therapist data to match Member interface if it exists
    const therapistMember = therapist ? {
      id: 'therapist',
      name: therapist.name,
      role: therapist.role || 'Circle Facilitator',
      color: therapist.color || 'from-teal-300 to-teal-400',
      weeksAtStart: therapist.weeksAtStart || 520
    } : null;

    if (!therapistMember) {
      console.warn('No therapist found in circle data');
    }

    if (isPeekMode) {
      // For peek mode, put therapist first, then other members
      const peekMembers = [
        ...(therapist ? [therapist] : []),
        ...circleMembers.filter(member => member.id !== 'empty'),
        ...circleMembers.filter(member => member.id === 'empty').map(member => ({
          ...member,
          onClick: () => setShowJoinModal(true)
        }))
      ];
      console.log('Peek mode members:', peekMembers);
      return peekMembers;
    } else {
      // For regular mode, put therapist first, then you, then other members
      const youMember: Member = {
        id: 'you',
        name: 'You',
        weeksAtStart: 3,
        color: 'from-yellow-300 to-yellow-400'
      };
      
      const regularMembers = [
        ...(therapist ? [therapist] : []),
        youMember,
        ...circleMembers.filter(member => 
          member.id !== 'empty' &&
          member.id !== 'you'
        )
      ];
      console.log('Regular mode members:', regularMembers);
      return regularMembers;
    }
  }, [isPeekMode, circleMembers, circleData?.therapist]);

  // Now we can use members in useEffect
  useEffect(() => {
    const sendInitialMessage = async () => {
      try {
        setIsLoading(true);
        
        // Create the system message listing all present members
        const presentMembers = members
          .filter(m => !m.isDotted)
          .map(m => `${m.name}${m.role ? ` (${m.role})` : ''}`);
        
        const systemMessage = `<system>New group therapy session started. Present members: ${presentMembers.join(', ')}</system>`;
        
        // Send the message to the kinos API endpoint
        const response = await fetch('/api/kinos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            content: systemMessage,
            firstName: 'Circle',
            specialist: circleData?.specialist || 'generalist',
            pseudonym: `circle-${circleId}` // Use a unique pseudonym for each circle
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to send message');
        }

        const data = await response.json();
        
        // Generate audio for the response
        const audioUrl = await textToSpeech(data.response);
        const messageId = `msg-${Date.now()}`;

        // Add the therapist's response to the chat
        setMessages([{
          role: 'assistant',
          content: data.response,
          id: messageId,
          sender: circleData?.therapist?.name || 'Therapist',
          memberId: 'therapist',
          audio: audioUrl
        }]);

        // Play the audio
        if (audioUrl) {
          playAudio(audioUrl, messageId);
        }
      } catch (error) {
        console.error('Error sending initial message:', error);
      } finally {
        setIsLoading(false);
      }
    };

    sendInitialMessage();
  }, [members, circleId, circleData]);

  // Initialize talker stack
  useEffect(() => {
    // Initialize stack with all members except 'you', 'therapist', and empty slots
    const initialTalkers = members
      .filter(member => 
        member.id !== 'you' && 
        member.id !== 'therapist' && 
        !member.isDotted
      )
      .map(member => ({
        id: member.id,
        name: member.name,
        role: member.role
      }));

    console.log('Initializing talker stack with:', initialTalkers);
    setTalkerStack(initialTalkers);
  }, [members]);

  // Function to check for mentions and questions
  const checkForMentionsAndQuestions = (message: string) => {
    // Get all members except 'you' and empty slots
    const potentialTalkers = members.filter(member => 
      member.id !== 'you' && !member.isDotted
    );

    // Split message into paragraphs
    const paragraphs = message.split('\n');

    paragraphs.forEach(paragraph => {
      // Check each member
      potentialTalkers.forEach(member => {
        // If paragraph contains member's name and a question mark
        if (paragraph.includes(member.name) && paragraph.includes('?')) {
          // 50% chance to add to stack
          if (Math.random() < 0.5) {
            console.log(`Adding ${member.name} to talker stack due to mention in question`);
            setTalkerStack(prev => [{
              id: member.id,
              name: member.name,
              role: member.role
            }, ...prev]); // Add to top of stack (FILO)
          }
        }
      });
    });
  };

  // Average reading speed constant
  const CHARS_PER_SECOND = 25; // About 300 words per minute

  // Function to process the next talker
  const processNextTalker = async () => {
    if (isProcessingTalk) return;

    try {
      setIsProcessingTalk(true);

      // Get next talker (either from stack or therapist)
      let nextTalker = talkerStack.length > 0 
        ? talkerStack[0] 
        : null;

      // Add debug logging
      console.log('Next talker selection:', {
        stackLength: talkerStack.length,
        nextTalker,
        therapist: circleData?.therapist,
        currentStack: talkerStack // Add this to see full stack
      });

      // If no next talker in stack, try to use therapist
      if (!nextTalker && circleData?.therapist) {
        nextTalker = {
          id: 'therapist',
          name: circleData.therapist.name,
          role: circleData.therapist.role || 'Circle Facilitator'
        };
        console.log('Using therapist as next talker:', nextTalker);
      }

      // If still no talker, log error and return
      if (!nextTalker) {
        console.error('No next talker available and no therapist found in circleData');
        setIsProcessingTalk(false);
        return;
      }

      console.log(`Processing next talker: ${nextTalker.name}`);

      // Remove talker from stack if it's not the therapist
      if (talkerStack.length > 0) {
        setTalkerStack(prev => prev.slice(1));
      }

      // Get conversation history since last message from this talker
      const relevantHistory = messages
        .slice()
        .reverse() // Start from most recent
        .slice(0, messages.findIndex(msg => msg.sender === nextTalker.name)) // Stop at last message from this talker
        .reverse() // Put back in chronological order
        .map(msg => `${msg.sender}: ${msg.content}`) // Format messages
        .join('\n'); // Join with newlines

      // Create the system message with context
      const systemMessage = `<system>You are ${nextTalker.name}${nextTalker.role ? `, ${nextTalker.role}` : ''}. 
Here is the recent conversation since you last spoke:

${relevantHistory}

Respond to the ongoing conversation.</system>`;

      // Send message to get response from the talker
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

      if (!response.ok) throw new Error('Failed to get talker response');

      const data = await response.json();
      
      // Generate audio for the response (keep this for playback, but don't wait for it)
      const audioUrl = await textToSpeech(data.response);
      const messageId = `msg-${Date.now()}`;

      // Add message to chat
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.response,
        id: messageId,
        sender: nextTalker.name,
        memberId: nextTalker.id,
        audio: audioUrl
      }]);

      // Check for new mentions and questions in the response
      checkForMentionsAndQuestions(data.response);

      // Calculate reading time based on character count
      const charCount = data.response.length;
      const readingTimeMs = (charCount / CHARS_PER_SECOND) * 1000;
      console.log(`Message length: ${charCount} chars, estimated reading time: ${readingTimeMs}ms`);

      // Play audio if available (but don't wait for it)
      if (audioUrl) {
        playAudio(audioUrl, messageId);
      }

      // Wait for estimated reading time, then process next talker
      setTimeout(() => {
        setIsProcessingTalk(false);
        if (talkerStack.length > 0) {
          processNextTalker();
        }
      }, readingTimeMs + 1000); // Add 1 second buffer between messages

    } catch (error) {
      console.error('Error processing next talker:', error);
      setIsProcessingTalk(false);
    }
  };

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
                      {/* Profile picture */}
                      <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                        <Image
                          src={`/members/${circleId}-${message.memberId}.jpg`}
                          alt={message.sender || ''}
                          fill
                          className="object-cover"
                          sizes="32px"
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
                <div className="relative w-12 h-12 flex-shrink-0">
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
                        sizes="48px"
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
                      <div className={`absolute inset-0 bg-gradient-to-br ${member.color} opacity-30`}></div>
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
