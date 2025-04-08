'use client';

import React from 'react';

interface Milestone {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  date?: string;
}

interface BridgeProgressProps {
  progress: number; // 0-100
  milestones: Milestone[];
  relationshipType: string;
  startDate: string;
  nextSteps?: string[];
}

const BridgeProgress: React.FC<BridgeProgressProps> = ({
  progress,
  milestones,
  relationshipType,
  startDate,
  nextSteps = []
}) => {
  return (
    <div className="card p-4">
      <h3 className="text-sm font-medium mb-3 text-foreground/70">Bridge Progress</h3>
      
      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-foreground/60 mb-1">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full bg-[var(--background-alt)] rounded-full h-2">
          <div 
            className="bg-[var(--primary)] h-2 rounded-full" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      
      {/* Relationship Info */}
      <div className="mb-4 p-3 bg-[var(--background-alt)]/50 rounded-lg">
        <div className="text-xs text-foreground/60">Relationship Type</div>
        <div className="font-medium">{relationshipType}</div>
        <div className="text-xs text-foreground/60 mt-2">Started On</div>
        <div className="text-sm">{new Date(startDate).toLocaleDateString()}</div>
      </div>
      
      {/* Milestones */}
      <div className="mb-4">
        <h4 className="text-xs font-medium uppercase text-foreground/60 mb-2">Milestones</h4>
        <div className="space-y-3">
          {milestones.map((milestone) => (
            <div key={milestone.id} className="flex items-start">
              <div className={`mt-0.5 w-4 h-4 rounded-full flex-shrink-0 ${
                milestone.completed 
                  ? 'bg-[var(--primary)]' 
                  : 'border-2 border-[var(--background-alt)]'
              }`}>
                {milestone.completed && (
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                  </svg>
                )}
              </div>
              <div className="ml-3">
                <div className="text-sm font-medium">{milestone.title}</div>
                <div className="text-xs text-foreground/60">{milestone.description}</div>
                {milestone.completed && milestone.date && (
                  <div className="text-xs text-[var(--primary)]">
                    Completed on {new Date(milestone.date).toLocaleDateString()}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Next Steps */}
      {nextSteps.length > 0 && (
        <div>
          <h4 className="text-xs font-medium uppercase text-foreground/60 mb-2">Suggested Next Steps</h4>
          <ul className="space-y-1">
            {nextSteps.map((step, index) => (
              <li key={index} className="text-sm flex items-start">
                <svg className="w-4 h-4 text-[var(--primary)] mr-1.5 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
                {step}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BridgeProgress;
