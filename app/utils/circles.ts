import fs from 'fs';
import path from 'path';

export interface CircleMember {
  id: string;
  name: string;
  week?: number;
  color: string;
  role?: string;
  isDotted?: boolean;
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

export function getAllCircles(): Circle[] {
  const circlesDirectory = path.join(process.cwd(), 'app/data/circles');
  const filenames = fs.readdirSync(circlesDirectory);
  
  const circles = filenames
    .filter(filename => filename.endsWith('.json'))
    .map(filename => {
      const filePath = path.join(circlesDirectory, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(fileContents) as Circle;
    });

  return circles;
}

export function getCircleById(id: string): Circle | null {
  const filePath = path.join(process.cwd(), 'app/data/circles', `${id}.json`);
  
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents) as Circle;
  } catch (error) {
    console.error(`Error loading circle ${id}:`, error);
    return null;
  }
}
