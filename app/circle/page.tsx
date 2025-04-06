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
    <div className="h-screen w-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      {/* Header */}
      <div className="absolute top-4 left-4 z-10">
        <h1 className="text-xl font-semibold text-[var(--primary)]">TherapyKin Circle</h1>
      </div>

      {/* Main Circle Layout */}
      <CircleLayout 
        activeSpeaker={activeSpeaker}
        onSpeakerChange={setActiveSpeaker}
      />

      {/* Chat Input */}
      <div className="absolute bottom-4 left-4 right-4">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
          <div className="flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Share your thoughts or ask a question..."
              className="flex-grow px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
            />
            <button
              type="submit"
              className="px-6 py-2 rounded-full bg-[var(--primary)] text-white hover:bg-[var(--primary-dark)] transition-colors"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
