'use client';

import { useState, useEffect } from 'react';
import CircleLayout from '../components/CircleLayout';
import { useAuth } from '../contexts/AuthContext';

export default function CirclePage() {
  const { user } = useAuth();
  const [message, setMessage] = useState('');
  const [activeSpeaker, setActiveSpeaker] = useState('Maria');

  // Prevent scrolling on this page
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    // Handle message submission here
    console.log('Message submitted:', message);
    setMessage('');
  };

  return (
    <div className="h-screen w-screen bg-gradient-radial from-[var(--background)] via-[var(--background-alt)] to-[var(--background)] overflow-hidden relative">
      {/* Add subtle animated background pattern */}
      <div className="absolute inset-0 bg-pattern-dots opacity-5"></div>
      
      {/* Header with improved styling */}
      <div className="absolute top-6 left-6 z-10">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] bg-clip-text text-transparent flex items-center">
          <span className="mr-2">TherapyKin Circle</span>
          <span className="text-sm px-2 py-1 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] font-normal">
            Beta
          </span>
        </h1>
      </div>

      {/* Main Circle Layout with enhanced container */}
      <div className="absolute inset-0 flex items-center justify-center">
        <CircleLayout 
          activeSpeaker={activeSpeaker}
          onSpeakerChange={setActiveSpeaker}
        />
      </div>

      {/* Enhanced chat input */}
      <div className="absolute bottom-6 left-6 right-6">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
          <div className="flex gap-3">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Share your thoughts or ask a question..."
              className="flex-grow px-6 py-4 rounded-full border border-[var(--primary)]/20 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] shadow-lg"
            />
            <button
              type="submit"
              className="px-8 py-4 rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] text-white hover:opacity-90 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
