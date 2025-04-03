import { NextResponse } from 'next/server';
import { getActiveSpecialists } from '@/app/utils/airtable';

export async function GET() {
  try {
    const specialists = await getActiveSpecialists();
    
    // Always ensure generalist is included
    if (!specialists.some(s => s.id === 'generalist')) {
      specialists.unshift({
        id: 'generalist',
        name: 'General Therapist',
        description: 'A general-purpose therapist for all needs',
        sortOrder: 0
      });
    }
    
    // Sort specialists alphabetically by name, but keep generalist first
    specialists.sort((a, b) => {
      if (a.id === 'generalist') return -1;
      if (b.id === 'generalist') return 1;
      return String(a.name || '').localeCompare(String(b.name || ''));
    });
    
    return NextResponse.json({ specialists });
  } catch (error) {
    console.error('Error in specialists API:', error);
    
    // Return at least the generalist as a fallback
    return NextResponse.json({
      specialists: [
        {
          id: 'generalist',
          name: 'General Therapist',
          description: 'A general-purpose therapist for all needs'
        }
      ]
    });
  }
}
