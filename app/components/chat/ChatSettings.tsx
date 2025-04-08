'use client';

import React, { useState } from 'react';

interface VoiceOption {
  id: string;
  name: string;
}

interface SpecialistOption {
  id: string;
  name: string;
  description: string;
  hidden?: boolean;
}

interface ChatSettingsProps {
  voiceMode: boolean;
  toggleVoiceMode: () => void;
  selectedVoice: string;
  updatePreferredVoice: (voiceId: string) => void;
  voiceOptions: VoiceOption[];
  cameraEnabled: boolean;
  toggleCamera: () => void;
  autoIllustrate: boolean;
  updateAutoIllustratePreference: (enabled: boolean) => void;
  selectedSpecialist?: string;
  updateSelectedSpecialist?: (specialist: string) => void;
  specialists?: SpecialistOption[];
  sessionLength?: number;
  updateSessionLength?: (length: number) => void;
  isUpdatingPreference?: boolean;
  collapsed?: boolean;
  toggleCollapsed?: () => void;
}

const ChatSettings: React.FC<ChatSettingsProps> = ({
  voiceMode,
  toggleVoiceMode,
  selectedVoice,
  updatePreferredVoice,
  voiceOptions,
  cameraEnabled,
  toggleCamera,
  autoIllustrate,
  updateAutoIllustratePreference,
  selectedSpecialist,
  updateSelectedSpecialist,
  specialists = [],
  sessionLength,
  updateSessionLength,
  isUpdatingPreference = false,
  collapsed = true,
  toggleCollapsed = () => {}
}) => {
  return (
    <div className="card h-full overflow-hidden bg-[var(--background-alt)]/50 border-l border-[var(--primary)]/10">
      {/* Add a header with close button - keep this outside the scrollable area */}
      <div className="flex justify-between items-center p-4 border-b border-[var(--primary)]/10">
        <h2 className="text-lg font-semibold text-[var(--primary)]">Session Settings</h2>
        <button 
          onClick={toggleCollapsed}
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
      
        {/* Specialist Selection - if provided */}
        {selectedSpecialist && updateSelectedSpecialist && specialists.length > 0 && (
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
        )}
        
        {/* Session Length Selection - if provided */}
        {sessionLength && updateSessionLength && (
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
        )}
        
        {/* Voice Mode Toggle */}
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
  );
};

export default ChatSettings;
