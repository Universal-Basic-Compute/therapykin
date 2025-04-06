interface SpeakerBubbleProps {
  speaker: string;
  message: string;
  position: 'left' | 'right';
}

export default function SpeakerBubble({ speaker, message, position }: SpeakerBubbleProps) {
  return (
    <div className={`
      absolute 
      max-w-xs 
      ${position === 'left' ? 'left-24' : 'right-24'} 
      top-1/2 
      transform 
      -translate-y-1/2
      bg-white/80 
      dark:bg-gray-800/80 
      backdrop-blur-sm
      rounded-2xl 
      p-4 
      shadow-lg
      border
      border-white/20
      transition-all
      duration-200
      hover:shadow-xl
      hover:-translate-y-1
    `}>
      <div className="font-medium text-[var(--primary)] mb-1">{speaker}</div>
      <p className="text-sm text-foreground/80">{message}</p>
      
      {/* Add decorative elements */}
      <div className={`
        absolute top-1/2 ${position === 'left' ? '-left-2' : '-right-2'}
        w-4 h-4 bg-white/80 dark:bg-gray-800/80
        transform rotate-45
        border-t border-l border-white/20
      `}></div>
    </div>
  );
}
