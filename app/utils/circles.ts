export interface CircleMember {
  id: string;
  name: string;
  week?: number;
  role?: string;
  color: string;
  isDotted?: boolean;
  onClick?: () => void;
}

export interface Circle {
  id: string;
  name: string;
  description: string;
  participants: number;
  maxParticipants: number;
  tags: string[];
  members: CircleMember[];
}

const circles: Circle[] = [
  {
    id: 'anxiety',
    name: 'Anxiety Management Circle',
    description: "A supportive space for managing anxiety and stress. You can actively participate or simply listen - there's no pressure to share until you're ready.",
    participants: 3,
    maxParticipants: 6,
    tags: ['Anxiety', 'Stress', 'Support', 'Listen Only'],
    members: [
      { id: 'maria', name: 'Maria', week: 8, color: 'from-[var(--primary)] to-[var(--primary-dark)]' },
      { id: 'alex', name: 'Alex', week: 6, color: 'from-blue-400 to-blue-500' },
      { id: 'sarah', name: 'Sarah', week: 4, color: 'from-purple-400 to-purple-500' },
      { id: 'empty', name: 'Join?', isDotted: true, color: 'from-transparent to-transparent' }
    ]
  },
  {
    id: 'addiction',
    name: 'Addiction Recovery Circle',
    description: "A supportive space for recovery and maintaining sobriety. You can actively participate or simply listen - there's no pressure to share until you're ready.",
    participants: 4,
    maxParticipants: 6,
    tags: ['Recovery', 'Addiction', 'Support', 'Listen Only'],
    members: [
      { id: 'james', name: 'James', week: 12, color: 'from-[var(--primary)] to-[var(--primary-dark)]' },
      { id: 'emma', name: 'Emma', week: 8, color: 'from-green-400 to-green-500' },
      { id: 'michael', name: 'Michael', week: 6, color: 'from-yellow-400 to-yellow-500' },
      { id: 'lisa', name: 'Lisa', week: 4, color: 'from-red-400 to-red-500' },
      { id: 'empty', name: 'Join?', isDotted: true, color: 'from-transparent to-transparent' }
    ]
  }
];

export function getAllCircles(): Circle[] {
  return circles;
}

export function getCircleById(id: string): Circle | null {
  return circles.find(circle => circle.id === id) || null;
}
