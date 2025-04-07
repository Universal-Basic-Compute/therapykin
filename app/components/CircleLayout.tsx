'use client';

import React from 'react';
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
}

const memberVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  hover: { scale: 1.02, transition: { duration: 0.2 } }
};

export default function CircleLayout({ activeSpeaker, onSpeakerChange, isPeekMode, circleMembers = [] }: CircleLayoutProps) {
  const [showJoinModal, setShowJoinModal] = React.useState(false);

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

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map((member, index) => (
          <motion.div
            key={member.id}
            className="card p-6 bg-white dark:bg-gray-800 shadow-lg"
            variants={memberVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex flex-col items-center text-center">
              <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${member.color} mb-4 flex items-center justify-center text-white text-2xl font-semibold shadow-md`}>
                {member.isDotted ? (
                  <span className="text-sm">Join?</span>
                ) : (
                  member.name[0]
                )}
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">{member.name}</h3>
              {member.role && (
                <span className="px-3 py-1 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-sm mb-2">
                  {member.role}
                </span>
              )}
              {member.weeksAtStart && (
                <p className="text-sm text-foreground/60">
                  {member.weeksAtStart} weeks in circle
                </p>
              )}
              {member.onClick && (
                <button
                  onClick={member.onClick}
                  className="mt-4 px-4 py-2 bg-[var(--primary)] text-white rounded-full text-sm hover:bg-[var(--primary-dark)] transition-colors"
                >
                  Join Circle
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
