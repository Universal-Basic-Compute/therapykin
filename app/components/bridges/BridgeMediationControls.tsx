'use client';

import React, { useState } from 'react';

interface BridgeMediationControlsProps {
  mediationLevel: 'light' | 'balanced' | 'directive';
  onChangeMediationLevel: (level: 'light' | 'balanced' | 'directive') => void;
  onRequestClarification: () => void;
  onRequestPrivateSession: () => void;
  onFlagSensitiveTopic: (topic: string) => void;
}

const BridgeMediationControls: React.FC<BridgeMediationControlsProps> = ({
  mediationLevel = 'balanced',
  onChangeMediationLevel,
  onRequestClarification,
  onRequestPrivateSession,
  onFlagSensitiveTopic
}) => {
  const [showTopicInput, setShowTopicInput] = useState(false);
  const [sensitiveTopic, setSensitiveTopic] = useState('');

  const handleFlagTopic = () => {
    if (sensitiveTopic.trim()) {
      onFlagSensitiveTopic(sensitiveTopic);
      setSensitiveTopic('');
      setShowTopicInput(false);
    }
  };

  return (
    <div className="card p-4">
      <h3 className="text-sm font-medium mb-3 text-foreground/70">Mediation Controls</h3>
      
      {/* Mediation Level */}
      <div className="mb-4">
        <label className="text-xs text-foreground/60 block mb-2">Mediation Level</label>
        <div className="grid grid-cols-3 gap-1">
          <button
            onClick={() => onChangeMediationLevel('light')}
            className={`p-2 text-xs rounded-lg ${
              mediationLevel === 'light' 
                ? 'bg-[var(--primary)]/10 text-[var(--primary)] font-medium' 
                : 'bg-[var(--background-alt)] text-foreground/70 hover:bg-[var(--background-alt)]/80'
            }`}
          >
            Light
          </button>
          <button
            onClick={() => onChangeMediationLevel('balanced')}
            className={`p-2 text-xs rounded-lg ${
              mediationLevel === 'balanced' 
                ? 'bg-[var(--primary)]/10 text-[var(--primary)] font-medium' 
                : 'bg-[var(--background-alt)] text-foreground/70 hover:bg-[var(--background-alt)]/80'
            }`}
          >
            Balanced
          </button>
          <button
            onClick={() => onChangeMediationLevel('directive')}
            className={`p-2 text-xs rounded-lg ${
              mediationLevel === 'directive' 
                ? 'bg-[var(--primary)]/10 text-[var(--primary)] font-medium' 
                : 'bg-[var(--background-alt)] text-foreground/70 hover:bg-[var(--background-alt)]/80'
            }`}
          >
            Directive
          </button>
        </div>
        <p className="text-xs text-foreground/60 mt-1">
          {mediationLevel === 'light' 
            ? 'Minimal intervention, focus on facilitating direct communication' 
            : mediationLevel === 'balanced' 
            ? 'Moderate guidance with balanced perspective sharing' 
            : 'More active guidance with structured communication'}
        </p>
      </div>
      
      {/* Quick Actions */}
      <div className="space-y-2">
        <button
          onClick={onRequestClarification}
          className="w-full p-2 text-sm rounded-lg bg-[var(--background-alt)] text-foreground/70 hover:bg-[var(--background-alt)]/80 flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Request Clarification
        </button>
        
        <button
          onClick={onRequestPrivateSession}
          className="w-full p-2 text-sm rounded-lg bg-[var(--background-alt)] text-foreground/70 hover:bg-[var(--background-alt)]/80 flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          Private Session
        </button>
        
        <button
          onClick={() => setShowTopicInput(!showTopicInput)}
          className="w-full p-2 text-sm rounded-lg bg-[var(--background-alt)] text-foreground/70 hover:bg-[var(--background-alt)]/80 flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          Flag Sensitive Topic
        </button>
      </div>
      
      {/* Sensitive Topic Input */}
      {showTopicInput && (
        <div className="mt-3">
          <input
            type="text"
            value={sensitiveTopic}
            onChange={(e) => setSensitiveTopic(e.target.value)}
            placeholder="Describe the sensitive topic"
            className="w-full p-2 text-sm border border-black/10 dark:border-white/10 rounded-lg bg-[var(--background)] mb-2"
          />
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => setShowTopicInput(false)}
              className="px-3 py-1 text-xs rounded-lg bg-[var(--background-alt)] text-foreground/70"
            >
              Cancel
            </button>
            <button
              onClick={handleFlagTopic}
              className="px-3 py-1 text-xs rounded-lg bg-[var(--primary)] text-white"
              disabled={!sensitiveTopic.trim()}
            >
              Flag Topic
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BridgeMediationControls;
