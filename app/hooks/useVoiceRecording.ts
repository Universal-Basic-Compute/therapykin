'use client';

import { useState, useRef, useCallback, useEffect } from 'react';

interface UseVoiceRecordingOptions {
  onTranscriptionComplete?: (text: string) => void;
}

export function useVoiceRecording({ onTranscriptionComplete }: UseVoiceRecordingOptions = {}) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isMediaRecorderSupported, setIsMediaRecorderSupported] = useState(true);
  const [isTranscribing, setIsTranscribing] = useState(false);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recordingTimerRef = useRef<number | null>(null);
  
  // Check for MediaRecorder support
  useEffect(() => {
    if (typeof MediaRecorder === 'undefined') {
      setIsMediaRecorderSupported(false);
      console.warn('MediaRecorder API is not supported in this browser');
    }
  }, []);
  
  // Function to start recording
  const startRecording = useCallback(async () => {
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
      
      mediaRecorder.onstop = async () => {
        setIsRecording(false);
        
        // Store the recorded time before resetting
        const recordedTime = recordingTime;
        setRecordingTime(0);
        
        // Get the MIME type from the MediaRecorder
        const mimeType = mediaRecorderRef.current?.mimeType || 'audio/webm';
        
        // Create audio blob from chunks
        const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });
        
        if (audioBlob.size > 0) {
          // Send to STT API
          await sendAudioForTranscription(audioBlob);
        } else {
          console.error('Empty audio recording detected');
          alert('No audio was recorded. Please try again and speak clearly.');
        }
      };
      
      // Start recording
      mediaRecorder.start();
      setIsRecording(true);
      
      // Reset recording time
      setRecordingTime(0);
      
      // Clear any existing timer
      if (recordingTimerRef.current) {
        window.clearInterval(recordingTimerRef.current);
      }
      
      // Start a new timer
      recordingTimerRef.current = window.setInterval(() => {
        setRecordingTime((prevTime) => prevTime + 1);
      }, 1000);
      
    } catch (error) {
      console.error('Error starting recording:', error);
      alert('Could not access microphone. Please check permissions and try again.');
    }
  }, [recordingTime]);
  
  // Function to stop recording
  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      
      // Stop all tracks in the stream
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      
      // Clear timer
      if (recordingTimerRef.current) {
        window.clearInterval(recordingTimerRef.current);
        recordingTimerRef.current = null;
      }
    }
  }, []);
  
  // Function to send audio to STT API
  const sendAudioForTranscription = async (audioBlob: Blob) => {
    try {
      setIsTranscribing(true);
      
      // Create form data
      const formData = new FormData();
      
      // Append with explicit filename and type
      const fileExtension = audioBlob.type.includes('webm') ? 'webm' : 
                           audioBlob.type.includes('mp4') ? 'mp4' : 
                           audioBlob.type.includes('wav') ? 'wav' : 'audio';
      
      formData.append('file', audioBlob, `recording.${fileExtension}`);
      formData.append('model', 'whisper-1');
      formData.append('language', 'en');
      
      // Send to STT API
      const response = await fetch('/api/stt', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error(`STT API returned status ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.text && data.text.trim()) {
        // Call the callback with the transcribed text
        if (onTranscriptionComplete) {
          onTranscriptionComplete(data.text);
        }
      } else {
        alert('No speech detected. Please try again.');
      }
    } catch (error) {
      console.error('Error transcribing audio:', error);
      alert('Sorry, I couldn\'t transcribe your audio. Please try again or type your message.');
    } finally {
      setIsTranscribing(false);
    }
  };
  
  // Cleanup on unmount
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
  
  return {
    isRecording,
    recordingTime,
    isMediaRecorderSupported,
    isTranscribing,
    startRecording,
    stopRecording
  };
}
