'use client';

import { useState, useEffect } from 'react';
import CircleLayout from '../components/CircleLayout';
import { useAuth } from '../contexts/AuthContext';

export default function CirclePage() {
  const { user } = useAuth();
  const [message, setMessage] = useState('');
  const [activeSpeaker, setActiveSpeaker] = useState('Maria');
  const [isPeekMode, setIsPeekMode] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);

  // Prevent scrolling on this page and check for peek mode
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const searchParams = new URLSearchParams(window.location.search);
    const mode = searchParams.get('mode');
    setIsPeekMode(mode === 'peek');
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
      {showJoinModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-[var(--background)] rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-[var(--primary)]">Coming Soon!</h2>
              <button 
                onClick={() => setShowJoinModal(false)}
                className="text-foreground/60 hover:text-foreground"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-foreground/70 mb-6">
              The ability to create your own circle is coming soon! Stay tuned for updates.
            </p>
            <button
              onClick={() => setShowJoinModal(false)}
              className="w-full px-4 py-2 bg-[var(--primary)] text-white rounded-lg hover:bg-[var(--primary-dark)] transition-colors"
            >
              Got it
            </button>
          </div>
        </div>
      )}
      {/* Animated background patterns */}
      <div className="absolute inset-0 bg-pattern-dots opacity-5"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--primary)]/5 to-transparent"></div>
      
      {/* Floating shapes in the background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-64 h-64 rounded-full bg-gradient-to-br from-[var(--primary)]/10 to-transparent blur-3xl animate-float"></div>
        <div className="absolute bottom-[20%] right-[10%] w-96 h-96 rounded-full bg-gradient-to-bl from-[var(--primary-dark)]/10 to-transparent blur-3xl animate-float-delayed"></div>
        <div className="absolute top-[40%] right-[15%] w-48 h-48 rounded-full bg-gradient-to-tr from-[var(--accent)]/10 to-transparent blur-3xl animate-float-slow"></div>
      </div>
      
      {/* Header with improved styling */}
      <div className="absolute top-6 left-6 z-10">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] bg-clip-text text-transparent flex items-center">
          <span className="mr-2">Addiction Recovery Circle</span>
          <span className="text-sm px-2 py-1 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] font-normal">
            Beta
          </span>
        </h1>
        <p className="mt-2 text-sm text-foreground/60 max-w-md">
          A safe space for shared healing and growth in recovery. Feel free to participate or simply listen - there's no pressure to share until you're comfortable.
        </p>
        <div className="mt-2 inline-flex items-center px-2 py-1 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] text-xs">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M12 18a6 6 0 01-6-6 6 6 0 0112 0 6 6 0 01-6 6z" />
          </svg>
          Listen-only mode available
        </div>
      </div>

      {/* Main Circle Layout with enhanced container */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full h-full max-w-6xl mx-auto">
          {/* Add a subtle glow behind the circle */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-radial from-[var(--primary)]/5 to-transparent rounded-full blur-2xl"></div>
          
          <CircleLayout 
            activeSpeaker={activeSpeaker}
            onSpeakerChange={setActiveSpeaker}
            isPeekMode={isPeekMode}
          />
        </div>
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
              className="flex-grow px-6 py-4 rounded-full border border-[var(--primary)]/20 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] shadow-lg hover:shadow-xl transition-all duration-200"
            />
            <button
              type="submit"
              className="px-8 py-4 rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] text-white hover:opacity-90 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2"
            >
              <span>Send</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
