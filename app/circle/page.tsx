'use client';

import { useState, useEffect } from 'react';
import CircleLayout from '../components/CircleLayout';
import { useAuth } from '../contexts/AuthContext';
import { useSearchParams } from 'next/navigation';

// Import circle data
import addictionCircle from '../data/circles/addiction.json';
import anxietyCircle from '../data/circles/anxiety.json';
import bodyImageCircle from '../data/circles/body-image.json';
import careerCircle from '../data/circles/career.json';
import chronicIllnessCircle from '../data/circles/chronic-illness.json';
import depressionCircle from '../data/circles/depression.json';
import griefCircle from '../data/circles/grief.json';
import lgbtqCircle from '../data/circles/lgbtq.json';
import lifePurposeCircle from '../data/circles/life-purpose.json';
import parentingCircle from '../data/circles/parenting.json';
import perfectionismCircle from '../data/circles/perfectionism.json';
import relationshipsCircle from '../data/circles/relationships.json';
import socialAnxietyCircle from '../data/circles/social-anxiety.json';

export default function CirclePage() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const circleName = searchParams.get('name') || '';
  const [activeSpeaker, setActiveSpeaker] = useState('Maria');
  const [isPeekMode, setIsPeekMode] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [circleData, setCircleData] = useState<any>(null);
  const [message, setMessage] = useState('');

  // Add useEffect to load circle data
  useEffect(() => {
    const circleName = searchParams.get('name');
    if (circleName) {
      // Map circle name to data
      const circleDataMap: { [key: string]: any } = {
        'addiction': addictionCircle,
        'anxiety': anxietyCircle,
        'body-image': bodyImageCircle,
        'career': careerCircle,
        'chronic-illness': chronicIllnessCircle,
        'depression': depressionCircle,
        'grief': griefCircle,
        'lgbtq': lgbtqCircle,
        'life-purpose': lifePurposeCircle,
        'parenting': parentingCircle,
        'perfectionism': perfectionismCircle,
        'relationships': relationshipsCircle,
        'social-anxiety': socialAnxietyCircle
      };
      
      setCircleData(circleDataMap[circleName]);
    }
  }, [searchParams]);

  // Prevent scrolling on this page
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);


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
      
      {/* Header with minimal styling */}
      <div className="absolute top-6 left-6 z-10">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] bg-clip-text text-transparent flex items-center">
          <span className="mr-2">{circleData?.name || 'Circle Chat'}</span>
          <span className="text-sm px-2 py-1 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] font-normal">
            Beta
          </span>
        </h1>
      </div>

      {/* Main Circle Layout with enhanced container */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full h-full max-w-6xl mx-auto">
          {/* Add a subtle glow behind the circle */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-radial from-[var(--primary)]/5 to-transparent rounded-full blur-2xl"></div>
          
          <CircleLayout 
            activeSpeaker={activeSpeaker}
            onSpeakerChange={setActiveSpeaker}
            isPeekMode={false}
            circleId={circleName}
            circleMembers={circleData?.members || []}
            circleData={circleData}
            message={message}
            onMessageChange={setMessage}
          />
        </div>
      </div>

    </div>
  );
}
