'use client';

import React from 'react';
import Link from 'next/link';

interface ChatHeaderProps {
  title?: string;
  subtitle?: string;
  sessionStartTime?: Date | null;
  sessionLength?: number;
  minutesActive?: number;
  sessionEnded?: boolean;
  backLink?: string;
  backText?: string;
  className?: string; // Add this line to accept className prop
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  title = "Therapy Session",
  subtitle,
  sessionStartTime,
  sessionLength = 30,
  minutesActive = 0,
  sessionEnded = false,
  backLink = "/dashboard",
  backText = "Back to Dashboard",
  className
}) => {
  // Helper function to determine the session phase based on dynamic session length
  const getSessionPhase = (startTime: Date) => {
    const now = new Date();
    const elapsedMinutes = Math.floor((now.getTime() - startTime.getTime()) / (60 * 1000));
    const totalLength = sessionLength;
    
    // Scale the phase transitions based on session length
    const openingPhaseEnd = Math.max(1, Math.floor(totalLength * 0.08)); // ~8% of session
    const firstHalfEnd = Math.floor(totalLength * 0.5); // 50% of session
    const closingPhaseStart = Math.floor(totalLength * 0.92); // ~92% of session
    
    if (elapsedMinutes <= openingPhaseEnd) {
      return { phase: "Session Opening", color: "bg-[var(--accent)]/10 text-[var(--accent)]" };
    } else if (elapsedMinutes < firstHalfEnd) {
      return { phase: "First Half", color: "bg-[var(--primary)]/10 text-[var(--primary)]" };
    } else if (elapsedMinutes < closingPhaseStart) {
      return { phase: "Second Half", color: "bg-[var(--primary-dark)]/10 text-[var(--primary-dark)]" };
    } else if (elapsedMinutes < totalLength) {
      return { phase: "Session Closing", color: "bg-[var(--warm)]/10 text-[var(--warm)]" };
    } else {
      return { phase: "Session Ended", color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300" };
    }
  };

  return (
    <div className={`fixed top-16 left-0 right-0 z-10 bg-[var(--background)] border-b border-black/5 dark:border-white/5 p-4 ${className || ''}`}>
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-[var(--primary)]">{title}</h1>
          {subtitle && <p className="text-sm text-foreground/70">{subtitle}</p>}
        </div>
        
        {sessionStartTime && (
          <div className="flex items-center space-x-4 mt-2 sm:mt-0">
            <div>
              <div className={`px-3 py-1 rounded-lg text-sm font-medium ${getSessionPhase(sessionStartTime).color}`}>
                {getSessionPhase(sessionStartTime).phase}
              </div>
              <div className="w-full bg-[var(--background-alt)] rounded-full h-1.5 mt-1">
                <div 
                  className="bg-[var(--primary)] h-1.5 rounded-full" 
                  style={{ width: `${Math.min(100, (minutesActive / sessionLength) * 100)}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs mt-0.5 text-foreground/70">
                <span>{minutesActive} min</span>
                <span>{sessionLength} min</span>
              </div>
            </div>
            
            <Link 
              href={backLink}
              className="text-sm text-foreground/60 hover:text-foreground/80 transition-colors"
            >
              {backText}
            </Link>
          </div>
        )}
        
        {!sessionStartTime && (
          <Link 
            href={backLink}
            className="text-sm text-foreground/60 hover:text-foreground/80 transition-colors mt-2 sm:mt-0"
          >
            {backText}
          </Link>
        )}
      </div>
    </div>
  );
};

export default ChatHeader;
