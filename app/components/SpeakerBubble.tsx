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
      bg-white 
      dark:bg-gray-800 
      rounded-lg 
      p-4 
      shadow-lg
    `}>
      <div className="font-medium mb-1">{speaker}</div>
      <p className="text-sm text-gray-600 dark:text-gray-300">{message}</p>
    </div>
  );
}
