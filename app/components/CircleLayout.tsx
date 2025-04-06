import React from 'react';
import React from 'react';
import { motion } from 'framer-motion';
import CircleMember from './CircleMember';
import SpeakerBubble from './SpeakerBubble';

// Add animation variants
const memberVariants = {
  initial: { scale: 0, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  hover: { scale: 1.05, transition: { duration: 0.2 } }
};

interface CircleLayoutProps {
  activeSpeaker: string;
  onSpeakerChange: (speaker: string) => void;
}

export default function CircleLayout({ activeSpeaker, onSpeakerChange }: CircleLayoutProps) {
  const members = [
    { id: 'you', name: 'You', week: 3, color: 'from-yellow-300 to-yellow-400' },
    { id: 'tina', name: 'Tina', week: 2, color: 'from-blue-300 to-blue-400' },
    { id: 'alex', name: 'Alex', week: 6, color: 'from-rose-300 to-rose-400' },
    { id: 'lee', name: 'Lee', week: 5, color: 'from-green-300 to-green-400' },
    { id: 'sam', name: 'Sam', week: 8, color: 'from-purple-300 to-purple-400' },
    { id: 'drj', name: 'Dr. J', role: 'Facilitator', color: 'from-blue-500 to-blue-600' }
  ];

  // Calculate positions in a circle
  const getPosition = (index: number, total: number) => {
    const angle = (index * 2 * Math.PI / total) - Math.PI/2; // Start from top
    const radius = 200; // Adjust this value to change circle size
    return {
      left: `calc(50% + ${Math.cos(angle) * radius}px)`,
      top: `calc(50% + ${Math.sin(angle) * radius}px)`
    };
  };

  return (
    <div className="relative w-full h-full max-w-5xl mx-auto">
      {/* Add subtle connecting lines */}
      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
        <circle 
          cx="50%" 
          cy="50%" 
          r="200" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1" 
          className="opacity-10" 
        />
      </svg>

      {/* Center speaker with enhanced styling */}
      <motion.div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", bounce: 0.4 }}
      >
        <CircleMember
          name="Maria"
          role="Speaking"
          color="bg-teal-500"
          size="large"
          isActive={true}
        />
      </div>

      {/* Circle members */}
      {members.map((member, index) => {
        const position = getPosition(index, members.length);
        return (
          <motion.div
            key={member.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={position}
            variants={memberVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            transition={{ delay: index * 0.1 }}
          >
            <CircleMember
              name={member.name}
              week={member.week}
              role={member.role}
              color={member.color}
              size="medium"
              isActive={false}
            />
          </motion.div>
        );
      })}

      {/* Speech bubbles */}
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
