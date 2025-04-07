'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import CircleMember from './CircleMember';
import SpeakerBubble from './SpeakerBubble';

type Position = {
  left: string;
  top: string;
};

interface Member {
  id: string;
  name: string;
  weeksAtStart?: number;
  role?: string;
  color: string;
  isDotted?: boolean;
  onClick?: () => void;
}

interface CircleLayoutProps {
  activeSpeaker: string;
  onSpeakerChange: (speaker: string) => void;
  isPeekMode?: boolean;
  circleMembers?: Member[];
}

const memberVariants: Variants = {
  initial: { scale: 0, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  hover: { scale: 1.05, transition: { duration: 0.2 } }
};

export default function CircleLayout({ activeSpeaker, onSpeakerChange, isPeekMode, circleMembers = [] }: CircleLayoutProps) {
  // Add state for join modal
  const [showJoinModal, setShowJoinModal] = React.useState(false);

  // Create the members array with proper typing
  const members: Member[] = React.useMemo(() => {
    if (isPeekMode) {
      return circleMembers.map(member => 
        member.id === 'empty' 
          ? { ...member, onClick: () => setShowJoinModal(true) } 
          : member
      );
    } else {
      const youMember: Member = {
        id: 'you',
        name: 'You',
        weeksAtStart: 3,
        color: 'from-yellow-300 to-yellow-400'
      };
      return [youMember, ...circleMembers.filter(member => member.id !== 'empty')];
    }
  }, [isPeekMode, circleMembers]);

  // Calculate positions in a circle
  const getPosition = (index: number, total: number): Position => {
    const angle = (index * 2 * Math.PI / total) - Math.PI/2; // Start from top
    const radius = 180; // Reduced from 200 since we removed center member
    return {
      left: `calc(50% + ${Math.cos(angle) * radius}px)`,
      top: `calc(50% + ${Math.sin(angle) * radius}px)`
    };
  };

  // Log the members array to debug
  console.log('Members:', members);

  return (
    <div className="relative w-full h-full max-w-5xl mx-auto">
      {/* Add subtle connecting lines */}
      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
        <circle 
          cx="50%" 
          cy="50%" 
          r="180" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1" 
          className="opacity-10" 
        />
      </svg>


      {/* Circle members with animations */}
      {members.map((member, index) => {
        const position = getPosition(index, members.length);
        console.log(`Rendering member ${member.name} at position:`, position);
        
        return (
          <motion.div
            key={member.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
            style={position}
            variants={memberVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            transition={{ delay: index * 0.1 }}
          >
            <CircleMember
              name={member.name}
              weeksAtStart={member.weeksAtStart}
              role={member.role}
              color={member.color}
              size="medium"
              isActive={false}
              isDotted={member.isDotted}
              onClick={member.onClick}
            />
          </motion.div>
        );
      })}

      {/* Enhanced speech bubbles */}
      <SpeakerBubble
        speaker="Alex"
        message="I had a similar experience last month..."
        position="left"
      />
      <SpeakerBubble
        speaker="Maria"
        message="When I feel overwhelmed at work, I now try the breathing technique..."
        position="right"
      />
    </div>
  );
}
