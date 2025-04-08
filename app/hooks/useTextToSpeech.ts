'use client';

import { useState, useRef, useCallback } from 'react';

interface UseTextToSpeechOptions {
  defaultVoiceId?: string;
}

export function useTextToSpeech({ defaultVoiceId = 'UgBBYS2sOqTuMpoF3BR0' }: UseTextToSpeechOptions = {}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPlayingId, setCurrentPlayingId] = useState<string | null>(null);
  const [selectedVoice, setSelectedVoice] = useState(defaultVoiceId);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Initialize audio element
  useState(() => {
    if (typeof window !== 'undefined' && !audioRef.current) {
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
    }
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  });
  
  // Function to convert text to speech
  const textToSpeech = useCallback(async (text: string): Promise<string> => {
    try {
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          voiceId: selectedVoice,
          model: 'eleven_flash_v2_5'
        })
      });
      
      // Check if the response is JSON (error) or binary (audio)
      const contentType = response.headers.get('content-type');
      
      if (contentType && contentType.includes('application/json')) {
        // This is an error response
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get audio');
      }
      
      if (!response.ok) {
        throw new Error(`TTS request failed with status ${response.status}`);
      }
      
      const blob = await response.blob();
      
      if (blob.size === 0) {
        throw new Error('Received empty audio response');
      }
      
      // Create a URL for the blob
      const audioUrl = URL.createObjectURL(blob);
      
      return audioUrl;
    } catch (error) {
      console.error('Error converting text to speech:', error);
      return '';
    }
  }, [selectedVoice]);
  
  // Function to play audio
  const playAudio = useCallback((audioUrl: string, messageId: string) => {
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
  }, []);
  
  // Function to stop audio
  const stopAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      setCurrentPlayingId(null);
    }
  }, []);
  
  return {
    isPlaying,
    currentPlayingId,
    selectedVoice,
    setSelectedVoice,
    textToSpeech,
    playAudio,
    stopAudio
  };
}
