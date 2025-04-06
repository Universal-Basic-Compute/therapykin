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
          ${color} 
          rounded-full 
          flex 
          items-center 
          justify-center 
          font-medium 
          ${isActive ? 'ring-4 ring-[var(--primary)]' : ''}
          transition-all
          duration-300
        `}
      >
        {name[0]}
      </div>
      <div className="mt-2 text-center">
        <div className="font-medium">{name}</div>
        {week && <div className="text-xs text-gray-600">Week {week}</div>}
        {role && <div className="text-xs text-gray-600">{role}</div>}
      </div>
    </div>
  );
}
