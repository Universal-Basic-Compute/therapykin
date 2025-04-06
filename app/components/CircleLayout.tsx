import { useState } from 'react';
import CircleMember from './CircleMember';
import SpeakerBubble from './SpeakerBubble';

interface CircleLayoutProps {
  activeSpeaker: string;
  onSpeakerChange: (speaker: string) => void;
}

export default function CircleLayout({ activeSpeaker, onSpeakerChange }: CircleLayoutProps) {
  const members = [
    { id: 'you', name: 'You', week: 3, color: 'bg-yellow-300' },
    { id: 'tina', name: 'Tina', week: 2, color: 'bg-blue-200' },
    { id: 'alex', name: 'Alex', week: 6, color: 'bg-coral-400' },
    { id: 'lee', name: 'Lee', week: 5, color: 'bg-green-300' },
    { id: 'sam', name: 'Sam', week: 8, color: 'bg-purple-300' },
    { id: 'drj', name: 'Dr. J', role: 'Facilitator', color: 'bg-blue-600' }
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
    <div className="relative w-full h-full">
      {/* Center speaker */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
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
          <div
            key={member.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={position}
          >
            <CircleMember
              name={member.name}
              week={member.week}
              role={member.role}
              color={member.color}
              size="medium"
              isActive={false}
            />
          </div>
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
