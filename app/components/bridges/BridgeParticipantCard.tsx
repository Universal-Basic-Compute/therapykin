'use client';

import React from 'react';

interface Participant {
  id: string;
  name: string;
  email?: string;
  status?: 'online' | 'offline' | 'typing' | 'reviewing';
  lastActive?: string;
  avatar?: string;
}

interface BridgeParticipantCardProps {
  participant: Participant | null;
  isLoading?: boolean;
}

const BridgeParticipantCard: React.FC<BridgeParticipantCardProps> = ({
  participant,
  isLoading = false
}) => {
  if (isLoading) {
    return (
      <div className="card p-4 animate-pulse">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-[var(--background-alt)] rounded-full"></div>
          <div className="flex-1">
            <div className="h-4 bg-[var(--background-alt)] rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-[var(--background-alt)] rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!participant) {
    return (
      <div className="card p-4">
        <div className="text-center text-foreground/60">
          <p>No participant connected yet</p>
          <button className="mt-2 text-sm text-[var(--primary)] hover:underline">
            Send Invitation
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="card p-4">
      <h3 className="text-sm font-medium mb-3 text-foreground/70">Bridge Participant</h3>
      <div className="flex items-center space-x-4">
        {participant.avatar ? (
          <img 
            src={participant.avatar} 
            alt={participant.name} 
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 bg-[var(--primary)]/20 rounded-full flex items-center justify-center">
            <span className="text-lg font-medium text-[var(--primary)]">
              {participant.name.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
        
        <div>
          <div className="font-medium">{participant.name}</div>
          <div className="flex items-center text-sm">
            <span className={`inline-block w-2 h-2 rounded-full mr-1.5 ${
              participant.status === 'online' ? 'bg-green-500' :
              participant.status === 'typing' ? 'bg-blue-500 animate-pulse' :
              participant.status === 'reviewing' ? 'bg-yellow-500' :
              'bg-gray-400'
            }`}></span>
            <span className="text-foreground/70">
              {participant.status === 'online' ? 'Online' :
               participant.status === 'typing' ? 'Typing...' :
               participant.status === 'reviewing' ? 'Reviewing...' :
               'Offline'}
            </span>
          </div>
        </div>
      </div>
      
      {participant.lastActive && (
        <div className="mt-3 text-xs text-foreground/60">
          Last active: {new Date(participant.lastActive).toLocaleString()}
        </div>
      )}
      
      <div className="mt-4 flex justify-between">
        <button className="text-sm text-[var(--primary)] hover:underline">
          Send Message
        </button>
        <button className="text-sm text-foreground/60 hover:text-foreground/80">
          View Profile
        </button>
      </div>
    </div>
  );
};

export default BridgeParticipantCard;
