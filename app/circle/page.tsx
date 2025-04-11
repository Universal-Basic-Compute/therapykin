'use client';

import { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
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

// Create a client component that uses useSearchParams
function CircleContent() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const circleName = searchParams.get('name') || '';
  const [activeSpeaker, setActiveSpeaker] = useState('Maria');
  const [isPeekMode, setIsPeekMode] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(true);
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
    document.body.style.overflow = showWelcomeModal ? 'hidden' : 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showWelcomeModal]);

  return (
    <div className="h-screen w-screen bg-gradient-radial from-[var(--background)] via-[var(--background-alt)] to-[var(--background)] overflow-hidden relative">
      {/* Welcome Modal */}
      {showWelcomeModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-[var(--background)] rounded-lg shadow-xl max-w-2xl w-full p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-[var(--primary)] mb-2">
                Welcome to {circleData?.name || 'Circle Chat'}
              </h2>
              <div className="flex justify-center mb-4">
                <span className="px-2 py-1 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-sm">
                  AI Support Circle
                </span>
              </div>
            </div>
            
            <div className="mb-6">
              <p className="text-foreground/80 mb-4">
                {circleData?.description || 'Join this supportive circle to connect with others facing similar challenges.'}
              </p>
              
              <div className="bg-[var(--background-alt)] p-4 rounded-lg mb-4">
                <h3 className="font-medium mb-2 text-[var(--primary)]">How This Works:</h3>
                <ul className="space-y-2 text-foreground/70">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                    </svg>
                    <span>You can actively participate by typing messages in the chat</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                    </svg>
                    <span>Or you can simply listen to the conversation if you prefer</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                    </svg>
                    <span>Everything is completely private - no other humans will see your messages</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-[var(--accent)]/10 p-4 rounded-lg">
                <h3 className="font-medium mb-2 text-[var(--accent)]">Circle Members:</h3>
                <div className="flex flex-wrap gap-3 justify-center">
                  {circleData?.members?.filter((m: any) => !m.isDotted && m.id !== 'empty').map((member: any, index: number) => (
                    <div key={index} className="text-center">
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-[var(--primary)]/80 to-[var(--primary-dark)]/80 flex items-center justify-center text-white font-medium mx-auto mb-1 relative">
                        <Image
                          src={`/members/${circleName}-${member.id}.jpg`}
                          alt={member.name}
                          fill
                          className="object-cover"
                          sizes="48px"
                          onError={(e) => {
                            // Fallback to first letter if image fails to load
                            (e.target as HTMLImageElement).style.display = 'none';
                            (e.target as HTMLImageElement).parentElement!.innerHTML = member.name[0];
                          }}
                        />
                      </div>
                      <div className="text-xs font-medium">{member.name}</div>
                      {member.role && (
                        <div className="text-xs text-foreground/60">{member.role}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex justify-center">
              <button
                onClick={() => setShowWelcomeModal(false)}
                className="px-8 py-3 bg-[var(--primary)] text-white rounded-lg hover:bg-[var(--primary-dark)] transition-colors font-medium"
              >
                Start Circle
              </button>
            </div>
          </div>
        </div>
      )}
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

// Main page component with Suspense boundary
export default function CirclePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Suspense fallback={
        <div className="flex justify-center items-center h-[100vh]">
          <div className="w-16 h-16 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin"></div>
        </div>
      }>
        <CircleContent />
      </Suspense>
    </div>
  );
}
