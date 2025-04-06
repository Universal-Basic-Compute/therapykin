interface CircleMemberProps {
  name: string;
  week?: number;
  role?: string;
  color: string;
  size: 'small' | 'medium' | 'large';
  isActive: boolean;
}

export default function CircleMember({ name, week, role, color, size, isActive }: CircleMemberProps) {
  const sizeClasses = {
    small: 'w-12 h-12 text-sm',
    medium: 'w-16 h-16 text-base',
    large: 'w-24 h-24 text-lg'
  };

  return (
    <div className="flex flex-col items-center">
      <div 
        className={`
          ${sizeClasses[size]} 
          bg-gradient-to-br ${color}
          rounded-full 
          flex 
          items-center 
          justify-center 
          font-medium 
          text-white
          shadow-lg
          ${isActive ? 'ring-4 ring-[var(--primary)] ring-opacity-50' : ''}
          transition-all
          duration-300
          hover:shadow-xl
          backdrop-blur-sm
        `}
      >
        {name[0]}
      </div>
      <div className="mt-3 text-center">
        <div className="font-medium text-foreground/90">{name}</div>
        {week && (
          <div className="text-xs text-foreground/60 mt-0.5">
            Week {week}
          </div>
        )}
        {role && (
          <div className="text-xs px-2 py-0.5 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] mt-1">
            {role}
          </div>
        )}
      </div>
    </div>
  );
}
