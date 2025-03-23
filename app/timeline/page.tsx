'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Define types for our timeline entries
interface TimelineEntry {
  id: string;
  date: Date;
  title: string;
  content: string;
  type: 'conversation' | 'milestone' | 'technique' | 'implementation' | 'reflection';
  emotion?: 'positive' | 'neutral' | 'negative';
  expanded?: boolean;
  isPlaying?: boolean;
}

export default function Timeline() {
  const { user, loading } = useAuth();
  const [filter, setFilter] = useState<string>('all');
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentlyPlayingId, setCurrentlyPlayingId] = useState<string | null>(null);
  
  // Mock timeline data - in a real app, this would come from your backend
  const [timelineData, setTimelineData] = useState<TimelineEntry[]>([
    {
      id: '1',
      date: new Date(2023, 6, 15),
      title: 'First Session',
      content: 'We discussed your anxiety around work presentations and identified some potential triggers.',
      type: 'conversation',
      emotion: 'neutral',
      expanded: false
    },
    {
      id: '2',
      date: new Date(2023, 6, 18),
      title: 'Breathing Technique Introduction',
      content: 'I introduced the 4-7-8 breathing technique to help manage acute anxiety symptoms before presentations.',
      type: 'technique',
      emotion: 'neutral',
      expanded: false
    },
    {
      id: '3',
      date: new Date(2023, 6, 25),
      title: 'First Presentation Success',
      content: 'You successfully used the breathing technique before your presentation and reported feeling more in control.',
      type: 'implementation',
      emotion: 'positive',
      expanded: false
    },
    {
      id: '4',
      date: new Date(2023, 7, 2),
      title: 'Cognitive Restructuring Introduction',
      content: 'We began working on identifying and challenging negative thought patterns related to public speaking.',
      type: 'technique',
      emotion: 'neutral',
      expanded: false
    },
    {
      id: '5',
      date: new Date(2023, 7, 10),
      title: 'Difficult Team Meeting',
      content: 'You shared feeling overwhelmed during a team conflict but were able to use your breathing techniques in the moment.',
      type: 'conversation',
      emotion: 'negative',
      expanded: false
    },
    {
      id: '6',
      date: new Date(2023, 7, 15),
      title: 'One Month Milestone',
      content: 'We reviewed your progress over the first month. You\'ve consistently practiced breathing techniques and have started to notice your negative thought patterns.',
      type: 'milestone',
      emotion: 'positive',
      expanded: false
    },
    {
      id: '7',
      date: new Date(2023, 7, 22),
      title: 'Thought Record Practice',
      content: 'You completed your first thought record challenging the belief "My presentations are always terrible" with evidence to the contrary.',
      type: 'implementation',
      emotion: 'positive',
      expanded: false
    },
    {
      id: '8',
      date: new Date(2023, 8, 5),
      title: 'Reflection on Progress',
      content: 'How has your relationship with public speaking changed since we started working together? What techniques have been most helpful?',
      type: 'reflection',
      emotion: 'neutral',
      expanded: false
    },
    {
      id: '9',
      date: new Date(2023, 8, 12),
      title: 'Major Presentation Success',
      content: 'You delivered a presentation to the executive team and reported feeling confident and prepared. This represents significant progress from where you started.',
      type: 'milestone',
      emotion: 'positive',
      expanded: false
    },
    {
      id: '10',
      date: new Date(2023, 8, 20),
      title: 'Mindfulness Introduction',
      content: 'We introduced a daily 5-minute mindfulness practice to help build general resilience and emotional awareness.',
      type: 'technique',
      emotion: 'neutral',
      expanded: false
    },
    {
      id: '11',
      date: new Date(2023, 9, 3),
      title: 'Stress Management Discussion',
      content: 'We explored how work stress has been affecting your sleep and discussed strategies for setting better boundaries.',
      type: 'conversation',
      emotion: 'negative',
      expanded: false
    },
    {
      id: '12',
      date: new Date(2023, 9, 15),
      title: 'Three Month Milestone',
      content: 'We reviewed your progress over three months. Your anxiety around presentations has decreased significantly, and you\'re consistently using multiple coping strategies.',
      type: 'milestone',
      emotion: 'positive',
      expanded: false
    },
  ]);


  // Filter timeline entries based on selected filter
  const filteredTimeline = filter === 'all' 
    ? timelineData 
    : timelineData.filter(entry => entry.type === filter);

  // Sort timeline entries by date (newest first)
  const sortedTimeline = [...filteredTimeline].sort((a, b) => b.date.getTime() - a.date.getTime());

  // Get icon for timeline entry type
  const getEntryIcon = (type: string) => {
    switch(type) {
      case 'conversation':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        );
      case 'milestone':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
          </svg>
        );
      case 'technique':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        );
      case 'implementation':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
          </svg>
        );
      case 'reflection':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
    }
  };

  // Get color for timeline entry type - Update with more distinct colors
  const getEntryColor = (type: string, emotion?: string) => {
    // First check if there's an emotion specified
    if (emotion === 'positive') return 'bg-green-100 dark:bg-green-900/30 border-green-500';
    if (emotion === 'negative') return 'bg-red-100 dark:bg-red-900/30 border-red-500';
    
    // If no emotion or neutral, use type-based colors with more distinction
    switch(type) {
      case 'conversation':
        return 'bg-blue-100 dark:bg-blue-900/30 border-blue-500';
      case 'milestone':
        return 'bg-purple-100 dark:bg-purple-900/30 border-purple-500';
      case 'technique':
        return 'bg-yellow-100 dark:bg-yellow-900/30 border-yellow-500';
      case 'implementation':
        return 'bg-green-100 dark:bg-green-900/30 border-green-500';
      case 'reflection':
        return 'bg-indigo-100 dark:bg-indigo-900/30 border-indigo-500';
      default:
        return 'bg-gray-100 dark:bg-gray-800 border-gray-500';
    }
  };

  // Get dot color for timeline entry type - Update with more distinct colors
  const getDotColor = (type: string, emotion?: string) => {
    // First check if there's an emotion specified
    if (emotion === 'positive') return 'bg-green-500';
    if (emotion === 'negative') return 'bg-red-500';
    
    // If no emotion or neutral, use type-based colors with more distinction
    switch(type) {
      case 'conversation':
        return 'bg-blue-500';
      case 'milestone':
        return 'bg-purple-500';
      case 'technique':
        return 'bg-yellow-500';
      case 'implementation':
        return 'bg-green-500';
      case 'reflection':
        return 'bg-indigo-500';
      default:
        return 'bg-gray-500';
    }
  };

  // Format date for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Play text-to-speech for an entry
  const playTTS = async (entry: TimelineEntry) => {
    try {
      // If already playing this entry, stop it
      if (currentlyPlayingId === entry.id) {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }
        setCurrentlyPlayingId(null);
        
        // Update entry state
        setTimelineData(prevData => 
          prevData.map(item => 
            item.id === entry.id ? { ...item, isPlaying: false } : item
          )
        );
        return;
      }
      
      // Stop any currently playing audio
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      
      // Update all entries to not playing
      setTimelineData(prevData => 
        prevData.map(item => ({ ...item, isPlaying: item.id === entry.id }))
      );
      
      // Set currently playing ID
      setCurrentlyPlayingId(entry.id);
      
      // Prepare text for TTS
      const text = `${entry.title}. ${entry.content}`;
      
      // Call TTS API
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate speech');
      }
      
      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      
      // Play the audio
      if (!audioRef.current) {
        audioRef.current = new Audio();
      }
      
      audioRef.current.src = audioUrl;
      audioRef.current.onended = () => {
        setCurrentlyPlayingId(null);
        setTimelineData(prevData => 
          prevData.map(item => 
            item.id === entry.id ? { ...item, isPlaying: false } : item
          )
        );
      };
      
      audioRef.current.play();
    } catch (error) {
      console.error('Error playing TTS:', error);
      setCurrentlyPlayingId(null);
      setTimelineData(prevData => 
        prevData.map(item => ({ ...item, isPlaying: false }))
      );
      alert('Failed to play audio. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow pt-24 pb-16 px-4 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p>Loading your timeline...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-24 pb-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">My Therapeutic Journey</h1>
            
            {/* Filter controls */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-foreground/70">Filter:</span>
              <select 
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="p-2 border border-black/10 dark:border-white/10 rounded-lg bg-[var(--background)]"
              >
                <option value="all">All Entries</option>
                <option value="conversation">Conversations</option>
                <option value="milestone">Milestones</option>
                <option value="technique">Techniques</option>
                <option value="implementation">Implementations</option>
                <option value="reflection">Reflections</option>
              </select>
            </div>
          </div>
          
          {/* Timeline legend */}
          <div className="card p-4 mb-8">
            <h2 className="text-lg font-semibold mb-2">Timeline Legend</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
                <span className="text-sm">Conversations</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-purple-500 mr-2"></div>
                <span className="text-sm">Milestones</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-yellow-500 mr-2"></div>
                <span className="text-sm">Techniques</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
                <span className="text-sm">Implementations</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-indigo-500 mr-2"></div>
                <span className="text-sm">Reflections</span>
              </div>
            </div>
          </div>
          
          {/* Timeline visualization - alternating left and right */}
          <div className="relative max-w-5xl mx-auto">
            {/* Timeline line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-[var(--primary)]/20 transform -translate-x-1/2"></div>
            
            {/* Timeline entries */}
            <div className="space-y-12">
              {sortedTimeline.map((entry, index) => (
                <div key={entry.id} className="relative">
                  {/* Timeline dot */}
                  <div className={`absolute left-1/2 w-4 h-4 rounded-full ${getDotColor(entry.type, entry.emotion)} transform -translate-x-1/2 z-10`}></div>
                  
                  {/* Date display */}
                  <div className="flex justify-center mb-2">
                    <span className="bg-[var(--background)] px-2 py-1 text-xs rounded-full border border-[var(--primary)]/20 text-foreground/70 z-10">
                      {formatDate(entry.date)}
                    </span>
                  </div>
                  
                  {/* Entry card - alternating left and right */}
                  <div className={`flex ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                    <div className={`w-5/12 ${index % 2 === 0 ? 'mr-8' : 'ml-8'}`}>
                      <div className={`card p-4 border-l-4 shadow-depth transition-all hover:shadow-lg card-hover-lift ${getEntryColor(entry.type, entry.emotion)}`}>
                        <div className="flex items-start">
                          <div className="mr-3 text-[var(--primary)]">
                            {getEntryIcon(entry.type)}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg mb-2">{entry.title}</h3>
                            <p className="text-foreground/80">{entry.content}</p>
                            
                            {/* Action buttons */}
                            <div className="mt-4 flex justify-end space-x-2">
                              <button 
                                className={`btn-secondary text-sm flex items-center ${entry.isPlaying ? 'bg-[var(--primary)]/20' : ''}`}
                                onClick={() => playTTS(entry)}
                                aria-label={entry.isPlaying ? "Stop speaking" : "Speak entry"}
                              >
                                {entry.isPlaying ? (
                                  <>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
                                    </svg>
                                    Stop
                                  </>
                                ) : (
                                  <>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m2.828-9.9a9 9 0 012.728-2.728" />
                                    </svg>
                                    Listen
                                  </>
                                )}
                              </button>
                              
                              {entry.type === 'reflection' && (
                                <button className="btn-secondary text-sm">
                                  Respond
                                </button>
                              )}
                              {entry.type === 'technique' && (
                                <button className="btn-secondary text-sm">
                                  Practice Now
                                </button>
                              )}
                              <button className="btn-secondary text-sm">
                                Add Note
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Empty state */}
          {sortedTimeline.length === 0 && (
            <div className="card p-8 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-foreground/30 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-semibold mb-2">No entries found</h3>
              <p className="text-foreground/70 mb-4">
                {filter === 'all' 
                  ? "Your therapeutic journey timeline will appear here as you continue your sessions with TherapyKin."
                  : `No ${filter} entries found. Try changing the filter or continue your sessions to create more entries.`
                }
              </p>
              <Link href="/chat" className="btn-primary">
                Start a Session
              </Link>
            </div>
          )}
          
        </div>
      </main>
      
      <Footer />
      
      {/* Hidden audio element for accessibility */}
      <audio ref={audioRef} className="hidden" />
    </div>
  );
}
