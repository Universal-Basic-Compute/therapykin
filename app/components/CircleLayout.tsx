'use client';

import React from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import CircleMember from './CircleMember';

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
  circleId: string;
  circleData?: any;
}

const memberVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  hover: { scale: 1.02, transition: { duration: 0.2 } }
};

export default function CircleLayout({ activeSpeaker, onSpeakerChange, isPeekMode, circleMembers = [], circleId }: CircleLayoutProps) {
  const [showJoinModal, setShowJoinModal] = React.useState(false);

  // Add more detailed logging
  console.log('CircleLayout props:', {
    activeSpeaker,
    isPeekMode,
    circleMembers,
    circleId,
    memberCount: circleMembers.length
  });

  // Log each member's details
  circleMembers.forEach(member => {
    console.log('Member details:', {
      id: member.id,
      name: member.name,
      role: member.role,
      isTherapist: member.id === 'therapist'
    });
  });

  const members: Member[] = React.useMemo(() => {
    // Get the therapist from the circle data
    const therapist = circleData?.therapist;
    console.log('Found therapist from circle data:', therapist);

    if (isPeekMode) {
      // For peek mode, put therapist first, then other members
      const peekMembers = [
        ...(therapist ? [therapist] : []),
        ...circleMembers.filter(member => member.id !== 'empty'),
        ...circleMembers.filter(member => member.id === 'empty').map(member => ({
          ...member,
          onClick: () => setShowJoinModal(true)
        }))
      ];
      console.log('Peek mode members:', peekMembers);
      return peekMembers;
    } else {
      // For regular mode, put therapist first, then you, then other members
      const youMember: Member = {
        id: 'you',
        name: 'You',
        weeksAtStart: 3,
        color: 'from-yellow-300 to-yellow-400'
      };
      
      const regularMembers = [
        ...(therapist ? [therapist] : []),
        youMember,
        ...circleMembers.filter(member => 
          member.id !== 'empty' &&
          member.id !== 'you'
        )
      ];
      console.log('Regular mode members:', regularMembers);
      return regularMembers;
    }
  }, [isPeekMode, circleMembers, circleData?.therapist]);

  // Add check for empty members
  if (!circleMembers.length && !isPeekMode) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-foreground/60">Loading circle members...</p>
      </div>
    );
  }

  return (
    <div className="flex h-full gap-6">
      {/* Main Chat Area - Takes most of the width */}
      <div className="flex-grow">
        <div className="card h-full bg-white dark:bg-gray-800 shadow-lg p-6">
          <div className="h-full flex flex-col">
            <div className="flex-grow bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4">
              {/* Chat messages will go here */}
              <p className="text-center text-gray-500 dark:text-gray-400">
                Chat messages will appear here
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Members Sidebar - Fixed width */}
      <div className="w-80 space-y-4">
        <h2 className="text-xl font-semibold mb-4">Circle Members</h2>
        {members.map((member, index) => {
          const imagePath = member.id === 'you' ? '/members/default.jpg' : `/members/${circleId}-${member.id}.jpg`;
          console.log('Loading image for member:', {
            memberId: member.id,
            memberName: member.name,
            imagePath,
            circleId
          });

          return (
            <motion.div
              key={member.id}
              className="card p-4 bg-white dark:bg-gray-800 shadow-lg"
              variants={memberVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center space-x-4">
                <div className="relative w-12 h-12 flex-shrink-0">
                  {member.isDotted ? (
                    <div className={`w-full h-full rounded-full border-2 border-dashed border-[var(--primary)]/50 flex items-center justify-center`}>
                      <span className="text-xs text-[var(--primary)]/70">Join?</span>
                    </div>
                  ) : (
                    <div className="relative w-full h-full rounded-full overflow-hidden">
                      <Image
                        src={imagePath}
                        alt={member.name}
                        fill
                        className="object-cover rounded-full"
                        sizes="48px"
                        onError={(e) => {
                          console.error('Error loading image:', {
                            memberId: member.id,
                            imagePath,
                            error: e
                          });
                        }}
                        onLoad={() => {
                          console.log('Successfully loaded image:', {
                            memberId: member.id,
                            imagePath
                          });
                        }}
                      />
                      <div className={`absolute inset-0 bg-gradient-to-br ${member.color} opacity-30`}></div>
                    </div>
                  )}
                </div>
                <div className="flex-grow min-w-0">
                  <h3 className="font-medium text-sm truncate">{member.name}</h3>
                  {member.role && (
                    <span className="inline-block px-2 py-0.5 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-xs">
                      {member.role}
                    </span>
                  )}
                </div>
              </div>
              {member.onClick && (
                <button
                  onClick={member.onClick}
                  className="mt-2 w-full px-3 py-1 bg-[var(--primary)] text-white rounded-full text-sm hover:bg-[var(--primary-dark)] transition-colors"
                >
                  Join Circle
                </button>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
