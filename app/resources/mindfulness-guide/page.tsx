'use client';

import React, { useState } from "react";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ShareButtons from "../../components/ShareButtons";
import PDFDownloadButton from "../../components/PDFDownloadButton";

// Mindfulness exercises
const mindfulnessExercises = [
  {
    id: "breathing",
    name: "Mindful Breathing",
    duration: "5-10 minutes",
    description: "A foundational practice focusing on the breath as an anchor for attention.",
    steps: [
      "Find a comfortable seated position with your back straight but not rigid.",
      "Close your eyes or maintain a soft gaze downward.",
      "Bring your attention to your breath, noticing the sensation of air moving in and out of your body.",
      "Notice where you feel the breath most prominently—perhaps at the nostrils, chest, or abdomen.",
      "When your mind wanders (which is natural), gently bring your attention back to your breath without judgment.",
      "Continue for 5-10 minutes, gradually increasing the duration as you become more comfortable with the practice."
    ],
    benefits: [
      "Reduces stress and anxiety",
      "Improves focus and concentration",
      "Creates a foundation for other mindfulness practices",
      "Can be done anywhere, anytime"
    ]
  },
  {
    id: "body-scan",
    name: "Body Scan Meditation",
    duration: "10-15 minutes",
    description: "A practice that involves systematically bringing attention to different parts of the body, noticing sensations without judgment.",
    steps: [
      "Lie down or sit in a comfortable position where you won't be disturbed.",
      "Close your eyes and take a few deep breaths to settle in.",
      "Begin by bringing awareness to your feet, noticing any sensations present (warmth, coolness, tingling, pressure, etc.).",
      "Slowly move your attention upward through your body—ankles, calves, knees, thighs, and so on—pausing to notice sensations in each area.",
      "If you notice tension or discomfort, simply acknowledge it without trying to change it.",
      "Continue until you've scanned your entire body, ending with the top of your head.",
      "Take a moment to notice how your body feels as a whole before gently opening your eyes."
    ],
    benefits: [
      "Increases body awareness",
      "Helps identify and release physical tension",
      "Promotes relaxation and better sleep",
      "Develops the skill of non-judgmental awareness"
    ]
  },
  {
    id: "mindful-walking",
    name: "Mindful Walking",
    duration: "10-20 minutes",
    description: "A practice that brings mindful awareness to the everyday activity of walking.",
    steps: [
      "Find a quiet place where you can walk slowly without interruption (indoors or outdoors).",
      "Stand still, feeling your feet making contact with the ground.",
      "Begin walking at a slower pace than normal.",
      "Pay attention to the sensations in your feet and legs as you walk—the lifting, moving, and placing of each foot.",
      "Notice the shifting of weight and balance from one foot to the other.",
      "When your mind wanders, gently bring your attention back to the physical sensations of walking.",
      "Continue for 10-20 minutes, maintaining awareness of your movement and surroundings."
    ],
    benefits: [
      "Combines physical activity with mindfulness",
      "Helps bring mindfulness into everyday activities",
      "Improves balance and body awareness",
      "Can be practiced anywhere you can walk"
    ]
  },
  {
    id: "five-senses",
    name: "Five Senses Exercise",
    duration: "5 minutes",
    description: "A quick grounding practice that uses your five senses to bring you into the present moment.",
    steps: [
      "Pause wherever you are and take a deep breath.",
      "Notice 5 things you can see around you, paying attention to details you might normally overlook.",
      "Acknowledge 4 things you can feel or touch (the texture of your clothing, the temperature of the air, etc.).",
      "Listen for 3 things you can hear (nearby or in the distance).",
      "Identify 2 things you can smell (or like to smell).",
      "Notice 1 thing you can taste (or the current taste in your mouth).",
      "Take another deep breath to complete the exercise."
    ],
    benefits: [
      "Quick and effective for grounding during stressful moments",
      "Easy to remember and practice anywhere",
      "Helps interrupt anxiety or rumination",
      "Increases awareness of your environment"
    ]
  },
  {
    id: "loving-kindness",
    name: "Loving-Kindness Meditation",
    duration: "10-15 minutes",
    description: "A heart-centered practice that cultivates feelings of goodwill, kindness, and compassion toward yourself and others.",
    steps: [
      "Sit comfortably with your eyes closed or in a soft gaze.",
      "Begin by focusing on your breath, taking a few moments to center yourself.",
      "Bring to mind someone you care about deeply and who makes you smile.",
      "Silently repeat phrases such as: 'May you be happy. May you be healthy. May you be safe. May you live with ease.'",
      "Next, direct these same wishes toward yourself: 'May I be happy. May I be healthy. May I be safe. May I live with ease.'",
      "Gradually extend these wishes to others: a neutral person, someone you find difficult, and eventually all beings.",
      "Notice any feelings that arise without judgment."
    ],
    benefits: [
      "Cultivates compassion and empathy",
      "Reduces negative emotions like anger and resentment",
      "Improves relationships and social connection",
      "Increases positive emotions and overall wellbeing"
    ]
  },
  {
    id: "mindful-eating",
    name: "Mindful Eating",
    duration: "10 minutes",
    description: "A practice that brings full attention to the experience of eating, engaging all the senses.",
    steps: [
      "Choose a small piece of food (like a raisin, nut, or piece of chocolate).",
      "Look at the food as if you've never seen it before, noticing its colors, shapes, and textures.",
      "Feel the food between your fingers, noticing its weight and texture.",
      "Smell the food, paying attention to any aromas that arise.",
      "Slowly place the food in your mouth without chewing at first, noticing the sensations on your tongue.",
      "Begin chewing slowly, paying attention to the taste and texture as they change.",
      "Notice the impulse to swallow, and follow the sensation as you swallow.",
      "Pause to notice how you feel after eating mindfully."
    ],
    benefits: [
      "Enhances enjoyment and appreciation of food",
      "Promotes healthier eating habits",
      "Improves digestion",
      "Helps recognize hunger and fullness cues"
    ]
  }
];

// Common obstacles and solutions
const commonObstacles = [
  {
    obstacle: "Mind Wandering",
    description: "Your attention repeatedly drifts away from your intended focus.",
    solutions: [
      "Recognize that mind wandering is normal and part of the process, not a failure.",
      "Gently bring your attention back to your anchor (breath, body sensations, etc.) each time you notice wandering.",
      "Try counting breaths (1 to 10, then restart) to help maintain focus.",
      "Start with shorter sessions and gradually increase duration as your concentration improves."
    ]
  },
  {
    obstacle: "Restlessness or Impatience",
    description: "Feeling fidgety, uncomfortable, or eager for the practice to end.",
    solutions: [
      "Acknowledge the restlessness as a temporary sensation rather than trying to make it go away.",
      "Try a more active form of mindfulness, like mindful walking or gentle mindful movement.",
      "Experiment with shorter sessions until you build more comfort with the practice.",
      "Use the restlessness itself as an object of mindful attention, noticing where and how it manifests in your body."
    ]
  },
  {
    obstacle: "Sleepiness or Dullness",
    description: "Feeling drowsy, heavy, or mentally foggy during practice.",
    solutions: [
      "Practice with eyes open or in a brighter environment.",
      "Try practicing at different times of day when you're naturally more alert.",
      "Adjust your posture—sit up straighter or try standing meditation.",
      "If sleepiness is persistent, it might be a sign you need more rest in general."
    ]
  },
  {
    obstacle: "Strong Emotions",
    description: "Experiencing intense feelings like anxiety, sadness, or anger during practice.",
    solutions: [
      "Remember that mindfulness includes acknowledging all experiences, including difficult emotions.",
      "Try labeling the emotion silently (e.g., \"anxiety,\" \"sadness\") to create some space from it.",
      "If the emotion feels overwhelming, shift your attention to a neutral anchor like the sensation of your feet on the floor.",
      "Consider seeking guidance from a qualified mindfulness teacher if difficult emotions consistently arise."
    ]
  },
  {
    obstacle: "Self-Judgment",
    description: "Being critical of yourself for not \"doing it right\" or not experiencing immediate benefits.",
    solutions: [
      "Remind yourself that there is no \"perfect\" way to practice mindfulness—it's a continual process of beginning again.",
      "Set realistic expectations—mindfulness is a skill that develops gradually over time.",
      "Practice self-compassion by acknowledging your effort rather than focusing on perceived results.",
      "Remember that even experienced meditators face challenges in their practice."
    ]
  },
  {
    obstacle: "Finding Time",
    description: "Struggling to incorporate mindfulness practice into a busy schedule.",
    solutions: [
      "Start with just 5 minutes daily rather than longer, less frequent sessions.",
      "Attach mindfulness practice to an existing habit (e.g., after brushing teeth or before a meal).",
      "Use everyday activities (washing dishes, showering, waiting in line) as opportunities for informal practice.",
      "Schedule your practice time in advance and set reminders."
    ]
  }
];

export default function MindfulnessGuide() {
  // State for active section (for mobile accordion view)
  const [activeSection, setActiveSection] = useState<string | null>("introduction");
  
  // State for expanded exercise
  const [expandedExercise, setExpandedExercise] = useState<string | null>(null);
  
  // State for expanded obstacle
  const [expandedObstacle, setExpandedObstacle] = useState<string | null>(null);
  
  // Toggle section visibility (for mobile)
  const toggleSection = (sectionId: string) => {
    if (activeSection === sectionId) {
      setActiveSection(null);
    } else {
      setActiveSection(sectionId);
    }
  };
  
  // Toggle exercise expansion
  const toggleExercise = (exerciseId: string) => {
    if (expandedExercise === exerciseId) {
      setExpandedExercise(null);
    } else {
      setExpandedExercise(exerciseId);
    }
  };
  
  // Toggle obstacle expansion
  const toggleObstacle = (obstacleId: string) => {
    if (expandedObstacle === obstacleId) {
      setExpandedObstacle(null);
    } else {
      setExpandedObstacle(obstacleId);
    }
  };
  
  // Get the current URL for sharing
  const currentUrl = typeof window !== 'undefined' 
    ? window.location.href 
    : 'https://therapykin.ai/resources/mindfulness-guide';
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumbs */}
          <div className="mb-8">
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                  <Link href="/" className="text-sm font-medium text-foreground/60 hover:text-[var(--primary)]">
                    Home
                  </Link>
                </li>
                <li>
                  <div className="flex items-center">
                    <svg className="w-3 h-3 text-foreground/40 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                    </svg>
                    <Link href="/resources/library" className="text-sm font-medium text-foreground/60 hover:text-[var(--primary)] ml-1">
                      Resource Library
                    </Link>
                  </div>
                </li>
                <li aria-current="page">
                  <div className="flex items-center">
                    <svg className="w-3 h-3 text-foreground/40 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                    </svg>
                    <span className="text-sm font-medium text-foreground/40 ml-1">
                      Mindfulness Meditation
                    </span>
                  </div>
                </li>
              </ol>
            </nav>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div id="mindfulness-guide-content" className="lg:w-2/3">
              {/* Resource Header */}
              <div className="mb-8">
                <span className="px-3 py-1 bg-[var(--primary)]/10 text-[var(--primary)] rounded-full text-sm font-medium">
                  Mindfulness
                </span>
                <h1 className="text-3xl md:text-4xl font-bold mt-4 mb-4">Mindfulness Meditation for Beginners</h1>
                <p className="text-xl text-foreground/70 mb-6">
                  A step-by-step guide to starting a mindfulness practice, with simple exercises you can do in just 5-10 minutes a day.
                </p>
              </div>
              
              {/* Introduction */}
              <section id="introduction" className="mb-12">
                <h2 className="text-2xl font-bold mb-4">What is Mindfulness?</h2>
                <p className="mb-4">
                  Mindfulness is the practice of purposely focusing your attention on the present moment—and accepting it without judgment. It involves being fully aware of whatever is happening in the moment, including your thoughts, feelings, bodily sensations, and the surrounding environment.
                </p>
                <p className="mb-4">
                  Rather than dwelling on the past or worrying about the future, mindfulness encourages you to observe what's happening right now. This simple yet profound shift in perspective can have significant benefits for your mental and physical wellbeing.
                </p>
                
                <div className="my-8 p-6 bg-[var(--primary)]/5 rounded-xl">
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="w-16 h-16 md:w-20 md:h-20 flex-shrink-0 rounded-full bg-[var(--primary)]/10 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-2">Benefits of Mindfulness</h4>
                      <ul className="text-foreground/80 space-y-2">
                        <li>• Reduces stress, anxiety, and depression symptoms</li>
                        <li>• Improves focus, attention, and cognitive flexibility</li>
                        <li>• Enhances self-awareness and emotional regulation</li>
                        <li>• Promotes better sleep and overall wellbeing</li>
                        <li>• Supports better management of chronic pain and illness</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <p className="mb-4">
                  This guide will introduce you to the fundamentals of mindfulness meditation and provide simple, practical exercises to help you establish a regular practice. Whether you're looking to reduce stress, improve focus, or simply cultivate greater awareness in your daily life, mindfulness offers accessible tools that can be integrated into even the busiest schedule.
                </p>
                
                <div className="card p-6 shadow-depth mb-8">
                  <h3 className="text-xl font-semibold mb-4">The Science Behind Mindfulness</h3>
                  <p className="text-foreground/80 mb-4">
                    Research has shown that regular mindfulness practice can lead to measurable changes in the brain, including:
                  </p>
                  <ul className="space-y-2 text-foreground/80">
                    <li>• Increased gray matter density in areas associated with learning, memory, and emotion regulation</li>
                    <li>• Reduced activity in the amygdala, the brain's "fight or flight" center</li>
                    <li>• Strengthened connections in the prefrontal cortex, which handles executive function</li>
                    <li>• Changes in gene expression related to inflammation and stress response</li>
                  </ul>
                </div>
              </section>
              
              {/* Core Principles */}
              <section id="principles" className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Core Principles of Mindfulness</h2>
                <p className="mb-6">
                  Understanding these fundamental principles will help you approach mindfulness practice with the right mindset and expectations.
                </p>
                
                <div className="space-y-6">
                  <div className="card p-6 shadow-sm hover:shadow-depth transition-all">
                    <h3 className="text-xl font-semibold mb-2">Present Moment Awareness</h3>
                    <p className="text-foreground/70">
                      Mindfulness involves deliberately paying attention to what's happening right now, rather than being lost in thoughts about the past or future. This includes awareness of your body sensations, thoughts, emotions, and surroundings as they occur in real-time.
                    </p>
                  </div>
                  
                  <div className="card p-6 shadow-sm hover:shadow-depth transition-all">
                    <h3 className="text-xl font-semibold mb-2">Non-Judgmental Attitude</h3>
                    <p className="text-foreground/70">
                      Mindfulness encourages observing your experiences without labeling them as good or bad, right or wrong. Instead of criticizing yourself for having certain thoughts or feelings, you simply notice them with curiosity and acceptance.
                    </p>
                  </div>
                  
                  <div className="card p-6 shadow-sm hover:shadow-depth transition-all">
                    <h3 className="text-xl font-semibold mb-2">Beginner's Mind</h3>
                    <p className="text-foreground/70">
                      This principle involves approaching experiences with openness and curiosity, as if encountering them for the first time. It means setting aside preconceptions and being receptive to new possibilities, even in familiar situations.
                    </p>
                  </div>
                  
                  <div className="card p-6 shadow-sm hover:shadow-depth transition-all">
                    <h3 className="text-xl font-semibold mb-2">Patience and Persistence</h3>
                    <p className="text-foreground/70">
                      Mindfulness is a skill that develops gradually over time. Progress isn't always linear, and there will be days when practice feels more challenging. Cultivating patience with yourself and committing to regular practice are essential aspects of mindfulness.
                    </p>
                  </div>
                  
                  <div className="card p-6 shadow-sm hover:shadow-depth transition-all">
                    <h3 className="text-xl font-semibold mb-2">Non-Striving</h3>
                    <p className="text-foreground/70">
                      Unlike many activities that are goal-oriented, mindfulness practice emphasizes being rather than doing. Instead of trying to achieve a particular state or outcome, you simply observe what is already present in your experience.
                    </p>
                  </div>
                  
                  <div className="card p-6 shadow-sm hover:shadow-depth transition-all">
                    <h3 className="text-xl font-semibold mb-2">Self-Compassion</h3>
                    <p className="text-foreground/70">
                      Mindfulness includes treating yourself with the same kindness and understanding that you would offer to a good friend. When you notice self-criticism or difficult emotions arising, responding with compassion rather than judgment is an integral part of the practice.
                    </p>
                  </div>
                </div>
              </section>
              
              {/* Getting Started */}
              <section id="getting-started" className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Getting Started with Mindfulness</h2>
                <p className="mb-6">
                  Beginning a mindfulness practice doesn't require special equipment or extensive preparation. Here are some simple guidelines to help you start:
                </p>
                
                <div className="card p-6 shadow-depth mb-8">
                  <h3 className="text-xl font-semibold mb-4">Creating the Right Environment</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3 mt-0.5">
                        <span className="font-semibold">1</span>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Find a Quiet Space</h4>
                        <p className="text-foreground/70">
                          Choose a relatively quiet place where you won't be disturbed for the duration of your practice. This could be a corner of your bedroom, a comfortable chair, or even a park bench if you prefer practicing outdoors.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3 mt-0.5">
                        <span className="font-semibold">2</span>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Set a Time Limit</h4>
                        <p className="text-foreground/70">
                          For beginners, 5-10 minutes is a good starting point. It's better to practice for a shorter time consistently than to attempt longer sessions sporadically. You can gradually increase the duration as you become more comfortable.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3 mt-0.5">
                        <span className="font-semibold">3</span>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Find a Comfortable Position</h4>
                        <p className="text-foreground/70">
                          You can sit on a chair, cushion, or meditation bench. The key is to maintain a posture that is alert yet relaxed—back straight but not rigid, hands resting comfortably on your lap or knees. If sitting is uncomfortable, lying down is also an option, though it may increase the tendency to become sleepy.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3 mt-0.5">
                        <span className="font-semibold">4</span>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Minimize Distractions</h4>
                        <p className="text-foreground/70">
                          Turn off notifications on your phone or put it in another room. Let others in your household know you need a few minutes of uninterrupted time. Consider using a timer so you don't have to check the clock.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3 mt-0.5">
                        <span className="font-semibold">5</span>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Set an Intention</h4>
                        <p className="text-foreground/70">
                          Before you begin, take a moment to remind yourself why you're practicing mindfulness. Whether it's to reduce stress, improve focus, or simply be more present in your life, connecting with your intention can help motivate your practice.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 bg-[var(--primary)]/5 rounded-xl">
                  <h3 className="text-xl font-semibold mb-4">Helpful Tools for Beginners</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <div>
                        <h4 className="font-medium">Meditation Apps</h4>
                        <p className="text-sm text-foreground/70">Headspace, Calm, Insight Timer, or Waking Up offer guided meditations specifically for beginners</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <div>
                        <h4 className="font-medium">Meditation Timer</h4>
                        <p className="text-sm text-foreground/70">Simple timer apps with gentle sounds to mark the beginning and end of your practice</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <div>
                        <h4 className="font-medium">Meditation Cushion</h4>
                        <p className="text-sm text-foreground/70">A firm cushion or folded blanket can help maintain a comfortable seated position</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <div>
                        <h4 className="font-medium">Mindfulness Journal</h4>
                        <p className="text-sm text-foreground/70">A notebook to record your experiences, insights, and questions that arise during practice</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              
              {/* Mindfulness Exercises */}
              <section id="exercises" className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Mindfulness Exercises for Beginners</h2>
                <p className="mb-6">
                  Here are six simple mindfulness exercises that are perfect for beginners. Each exercise focuses on different aspects of mindfulness and can be practiced in just 5-15 minutes. Try each one to discover which resonates most with you.
                </p>
                
                <div className="space-y-8">
                  {mindfulnessExercises.map(exercise => (
                    <div key={exercise.id} className="card p-6 shadow-sm">
                      <button 
                        className="flex justify-between items-center w-full text-left"
                        onClick={() => toggleExercise(exercise.id)}
                      >
                        <div>
                          <h3 className="text-xl font-semibold">{exercise.name}</h3>
                          <p className="text-sm text-foreground/60">Duration: {exercise.duration}</p>
                        </div>
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className={`h-5 w-5 transition-transform ${expandedExercise === exercise.id ? 'rotate-180' : ''}`} 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      
                      <p className="text-foreground/70 mt-2">{exercise.description}</p>
                      
                      {expandedExercise === exercise.id && (
                        <div className="mt-4 space-y-4">
                          <div className="p-4 bg-[var(--background-alt)] rounded-lg">
                            <h4 className="font-medium mb-3">How to Practice:</h4>
                            <ol className="list-decimal pl-5 space-y-2 text-foreground/70">
                              {exercise.steps.map((step, index) => (
                                <li key={index}>{step}</li>
                              ))}
                            </ol>
                          </div>
                          
                          <div className="p-4 bg-[var(--primary)]/5 rounded-lg">
                            <h4 className="font-medium mb-3">Benefits:</h4>
                            <ul className="list-disc pl-5 space-y-1 text-foreground/70">
                              {exercise.benefits.map((benefit, index) => (
                                <li key={index}>{benefit}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 p-6 bg-[var(--background-alt)] rounded-lg">
                  <h3 className="text-lg font-semibold mb-3">Tips for Practice</h3>
                  <ul className="list-disc pl-5 space-y-2 text-foreground/70">
                    <li>Start with just one exercise and practice it daily for a week before trying others.</li>
                    <li>It's normal for your mind to wander during practice—simply notice when this happens and gently return your attention to your chosen focus.</li>
                    <li>Try practicing at the same time each day to establish a routine.</li>
                    <li>Remember that consistency is more important than duration—5 minutes daily is more beneficial than 30 minutes once a week.</li>
                    <li>Approach your practice with curiosity rather than expectation. Each session will be different.</li>
                  </ul>
                </div>
              </section>
              
              {/* Common Obstacles */}
              <section id="obstacles" className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Common Obstacles and How to Overcome Them</h2>
                <p className="mb-6">
                  Every mindfulness practitioner encounters challenges along the way. Recognizing these common obstacles and knowing how to work with them is an important part of developing a sustainable practice.
                </p>
                
                <div className="space-y-6">
                  {commonObstacles.map((obstacle, index) => (
                    <div key={index} className="card p-6 shadow-sm hover:shadow-depth transition-all">
                      <button 
                        className="flex justify-between items-center w-full text-left"
                        onClick={() => toggleObstacle(obstacle.obstacle)}
                      >
                        <h3 className="text-xl font-semibold">{obstacle.obstacle}</h3>
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className={`h-5 w-5 transition-transform ${expandedObstacle === obstacle.obstacle ? 'rotate-180' : ''}`} 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      
                      <p className="text-foreground/70 mt-2">{obstacle.description}</p>
                      
                      {expandedObstacle === obstacle.obstacle && (
                        <div className="mt-4 p-4 bg-[var(--background-alt)] rounded-lg">
                          <h4 className="font-medium mb-2">Solutions:</h4>
                          <ul className="list-disc pl-5 space-y-2 text-foreground/70">
                            {obstacle.solutions.map((solution, solutionIndex) => (
                              <li key={solutionIndex}>{solution}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
              
              {/* Building a Regular Practice */}
              <section id="regular-practice" className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Building a Regular Practice</h2>
                <p className="mb-6">
                  Consistency is key to experiencing the benefits of mindfulness. Here are strategies to help you establish and maintain a regular practice.
                </p>
                
                <div className="card p-6 shadow-depth mb-8">
                  <h3 className="text-xl font-semibold mb-4">Creating a Sustainable Routine</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3 mt-0.5">
                        <span className="font-semibold">1</span>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Start Small</h4>
                        <p className="text-foreground/70">
                          Begin with just 5 minutes daily rather than attempting longer sessions that might feel overwhelming. You can gradually increase the duration as your practice becomes more established.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3 mt-0.5">
                        <span className="font-semibold">2</span>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Link to Existing Habits</h4>
                        <p className="text-foreground/70">
                          Attach your mindfulness practice to something you already do daily, such as after brushing your teeth in the morning, before your first cup of coffee, or right after getting home from work. This "habit stacking" makes it easier to remember and integrate into your routine.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3 mt-0.5">
                        <span className="font-semibold">3</span>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Same Time, Same Place</h4>
                        <p className="text-foreground/70">
                          When possible, practice at the same time and in the same location each day. This consistency helps establish mindfulness as a non-negotiable part of your daily routine, like brushing your teeth.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3 mt-0.5">
                        <span className="font-semibold">4</span>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Use Reminders</h4>
                        <p className="text-foreground/70">
                          Set gentle reminders on your phone, place sticky notes in visible locations, or use a mindfulness app with notification features. These external cues can help you remember to practice, especially when you're first establishing the habit.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3 mt-0.5">
                        <span className="font-semibold">5</span>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Track Your Progress</h4>
                        <p className="text-foreground/70">
                          Keep a simple log of your practice sessions. This could be as basic as marking an X on a calendar or using a habit-tracking app. Seeing your consistency visually can be motivating and help you identify patterns.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="card p-6 bg-[var(--primary)]/5 mb-8">
                  <h3 className="text-xl font-semibold mb-4">Integrating Mindfulness into Daily Life</h3>
                  <p className="mb-4">
                    Formal meditation practice is just one aspect of mindfulness. You can also bring mindful awareness to everyday activities:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-foreground/80">
                    <li><strong>Mindful Eating:</strong> Take a few moments to fully experience the colors, smells, textures, and tastes of your food.</li>
                    <li><strong>Mindful Movement:</strong> Pay attention to physical sensations during exercise, walking, or stretching.</li>
                    <li><strong>Mindful Listening:</strong> Give your full attention when someone is speaking, noticing when your mind wanders.</li>
                    <li><strong>Mindful Transitions:</strong> Use the moments between activities (like waiting for an elevator or sitting at a red light) as opportunities for brief mindfulness practice.</li>
                    <li><strong>Mindful Technology Use:</strong> Take a conscious breath before checking your phone or opening your computer.</li>
                  </ul>
                </div>
                
                <div className="card p-6 shadow-sm">
                  <h3 className="text-xl font-semibold mb-4">When You Miss a Day (or Several)</h3>
                  <p className="mb-4">
                    Gaps in practice are normal and happen to everyone. Here's how to handle them:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-foreground/70">
                    <li>Practice self-compassion rather than self-criticism. Treat yourself with the same kindness you would offer a good friend.</li>
                    <li>Remember that mindfulness is not about perfection but about beginning again, as many times as needed.</li>
                    <li>Don't try to "make up" for missed sessions by meditating longer. Simply return to your regular schedule.</li>
                    <li>Reflect on what led to the gap in practice and consider whether adjustments to your routine might be helpful.</li>
                    <li>Use the experience as an opportunity to notice any judgments or expectations you hold about your practice.</li>
                  </ul>
                </div>
              </section>
              
              {/* Deepening Your Practice */}
              <section id="deepening" className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Deepening Your Practice</h2>
                <p className="mb-6">
                  Once you've established a consistent basic practice, you might be interested in exploring mindfulness more deeply. Here are some ways to expand your practice:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="card p-6">
                    <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mb-4 text-[var(--primary)]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Books and Resources</h3>
                    <ul className="list-disc pl-5 space-y-2 text-foreground/70">
                      <li>
                        <strong>"Wherever You Go, There You Are"</strong> by Jon Kabat-Zinn
                      </li>
                      <li>
                        <strong>"The Miracle of Mindfulness"</strong> by Thich Nhat Hanh
                      </li>
                      <li>
                        <strong>"Mindfulness in Plain English"</strong> by Bhante Henepola Gunaratana
                      </li>
                      <li>
                        <strong>"Real Happiness"</strong> by Sharon Salzberg
                      </li>
                      <li>
                        <strong>"Fully Present"</strong> by Susan L. Smalley and Diana Winston
                      </li>
                    </ul>
                  </div>
                  
                  <div className="card p-6">
                    <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mb-4 text-[var(--primary)]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Courses and Retreats</h3>
                    <ul className="list-disc pl-5 space-y-2 text-foreground/70">
                      <li>
                        <strong>Mindfulness-Based Stress Reduction (MBSR):</strong> An 8-week structured program developed by Jon Kabat-Zinn
                      </li>
                      <li>
                        <strong>Mindfulness-Based Cognitive Therapy (MBCT):</strong> Combines mindfulness with cognitive therapy approaches
                      </li>
                      <li>
                        <strong>Day-long or weekend retreats:</strong> Opportunities for deeper practice in a supportive environment
                      </li>
                      <li>
                        <strong>Online courses:</strong> Many reputable organizations offer structured online mindfulness training
                      </li>
                      <li>
                        <strong>Local meditation groups:</strong> Regular practice with others can provide motivation and community
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="card p-6 shadow-sm">
                  <h3 className="text-xl font-semibold mb-4">Advanced Practices</h3>
                  <p className="mb-4">
                    As your practice develops, you might explore these more advanced aspects of mindfulness:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-foreground/70">
                    <li><strong>Longer meditation sessions:</strong> Gradually extending your practice to 20, 30, or 45 minutes</li>
                    <li><strong>Self-guided practice:</strong> Moving from guided to unguided meditation as your confidence grows</li>
                    <li><strong>Insight practice:</strong> Investigating the nature of thoughts, emotions, and sensations more deeply</li>
                    <li><strong>Loving-kindness and compassion meditation:</strong> Cultivating positive emotions toward yourself and others</li>
                    <li><strong>Mindful inquiry:</strong> Asking questions like "What is this?" or "Who am I?" during meditation</li>
                  </ul>
                </div>
              </section>
              
              {/* Conclusion */}
              <section id="conclusion" className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Conclusion</h2>
                <p className="mb-4">
                  Mindfulness is a simple yet profound practice that can transform your relationship with yourself and the world around you. By cultivating present-moment awareness and a non-judgmental attitude, you can develop greater clarity, calm, and compassion in your daily life.
                </p>
                <p className="mb-4">
                  Remember that mindfulness is not about achieving a particular state or outcome but about being fully present with whatever arises. Each moment offers a new opportunity to begin again, regardless of how long you've been practicing or how many times your mind has wandered.
                </p>
                <p className="mb-4">
                  The exercises and guidance in this resource provide a foundation for beginning your mindfulness journey. As with any skill, progress comes through regular practice and a willingness to approach the process with patience and curiosity.
                </p>
                <p>
                  Whether you're seeking stress reduction, improved focus, or greater self-awareness, mindfulness offers accessible tools that can be integrated into even the busiest lifestyle. Start where you are, with what you have, and allow your practice to unfold naturally.
                </p>
                
                <div className="card p-6 shadow-depth mt-8">
                  <h3 className="text-xl font-semibold mb-4">Key Takeaways</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <p className="text-foreground/80">
                        Mindfulness is the practice of paying attention to the present moment with openness, curiosity, and acceptance.
                      </p>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <p className="text-foreground/80">
                        Regular practice, even for just a few minutes daily, can lead to significant benefits for mental and physical wellbeing.
                      </p>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <p className="text-foreground/80">
                        Mind wandering is normal and not a sign of failure—the practice is about noticing when the mind wanders and gently bringing it back.
                      </p>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <p className="text-foreground/80">
                        Consistency is more important than duration—5 minutes daily is more beneficial than 30 minutes once a week.
                      </p>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <p className="text-foreground/80">
                        Mindfulness can be practiced formally through meditation and informally by bringing awareness to everyday activities.
                      </p>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <p className="text-foreground/80">
                        Self-compassion is an essential component of mindfulness practice—treat yourself with kindness when challenges arise.
                      </p>
                    </li>
                  </ul>
                </div>
              </section>
              
              {/* Share Links */}
              <div className="mb-12">
                <h3 className="font-semibold mb-4">Share this resource</h3>
                <ShareButtons 
                  title="Mindfulness Meditation for Beginners" 
                  url={currentUrl}
                />
              </div>
              
              {/* Feedback */}
              <div className="card p-6 bg-[var(--background-alt)] mb-12">
                <h3 className="text-lg font-semibold mb-3">Was this resource helpful?</h3>
                <p className="mb-4 text-foreground/70">
                  We're constantly working to improve our resources. Your feedback helps us make them more useful.
                </p>
                <div className="flex flex-wrap gap-3">
                  <button className="px-4 py-2 bg-[var(--primary)]/10 hover:bg-[var(--primary)]/20 text-[var(--primary)] rounded-full text-sm font-medium transition-all">
                    Very Helpful
                  </button>
                  <button className="px-4 py-2 bg-[var(--primary)]/10 hover:bg-[var(--primary)]/20 text-[var(--primary)] rounded-full text-sm font-medium transition-all">
                    Somewhat Helpful
                  </button>
                  <button className="px-4 py-2 bg-[var(--primary)]/10 hover:bg-[var(--primary)]/20 text-[var(--primary)] rounded-full text-sm font-medium transition-all">
                    Not Helpful
                  </button>
                </div>
              </div>
              
              {/* CTA */}
              <div className="card p-8 shadow-depth text-center">
                <h2 className="text-2xl font-bold mb-4">Need Personalized Support?</h2>
                <p className="text-foreground/70 mb-8 max-w-2xl mx-auto">
                  TherapyKin provides personalized, AI-powered therapeutic support that adapts to your needs and is available whenever you need it.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link 
                    href="/signup?plan=free" 
                    className="btn-primary px-8 py-3"
                  >
                    Get 3 Free Sessions
                  </Link>
                  <Link 
                    href="/learn-more" 
                    className="btn-secondary px-8 py-3"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="lg:w-1/3">
              {/* Table of Contents */}
              <div className="card p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">In This Guide</h3>
                <nav className="space-y-2">
                  <a 
                    href="#introduction" 
                    className="block text-foreground/70 hover:text-[var(--primary)] py-1 border-l-2 border-transparent hover:border-[var(--primary)] pl-3 transition-all"
                  >
                    What is Mindfulness?
                  </a>
                  <a 
                    href="#principles" 
                    className="block text-foreground/70 hover:text-[var(--primary)] py-1 border-l-2 border-transparent hover:border-[var(--primary)] pl-3 transition-all"
                  >
                    Core Principles
                  </a>
                  <a 
                    href="#getting-started" 
                    className="block text-foreground/70 hover:text-[var(--primary)] py-1 border-l-2 border-transparent hover:border-[var(--primary)] pl-3 transition-all"
                  >
                    Getting Started
                  </a>
                  <a 
                    href="#exercises" 
                    className="block text-foreground/70 hover:text-[var(--primary)] py-1 border-l-2 border-transparent hover:border-[var(--primary)] pl-3 transition-all"
                  >
                    Mindfulness Exercises
                  </a>
                  <a 
                    href="#obstacles" 
                    className="block text-foreground/70 hover:text-[var(--primary)] py-1 border-l-2 border-transparent hover:border-[var(--primary)] pl-3 transition-all"
                  >
                    Common Obstacles
                  </a>
                  <a 
                    href="#regular-practice" 
                    className="block text-foreground/70 hover:text-[var(--primary)] py-1 border-l-2 border-transparent hover:border-[var(--primary)] pl-3 transition-all"
                  >
                    Building a Regular Practice
                  </a>
                  <a 
                    href="#deepening" 
                    className="block text-foreground/70 hover:text-[var(--primary)] py-1 border-l-2 border-transparent hover:border-[var(--primary)] pl-3 transition-all"
                  >
                    Deepening Your Practice
                  </a>
                  <a 
                    href="#conclusion" 
                    className="block text-foreground/70 hover:text-[var(--primary)] py-1 border-l-2 border-transparent hover:border-[var(--primary)] pl-3 transition-all"
                  >
                    Conclusion
                  </a>
                </nav>
              </div>
              
              {/* Download PDF */}
              <div className="card p-6 mb-6 bg-[var(--primary)]/5">
                <div className="flex items-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[var(--primary)] mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <h3 className="text-lg font-semibold">Download This Guide</h3>
                </div>
                <p className="text-sm text-foreground/70 mb-4">
                  Get a PDF version of this guide to read offline or reference during your practice.
                </p>
                <PDFDownloadButton
                  title="Mindfulness Meditation for Beginners"
                  subtitle="TherapyKin Resource"
                  filename="TherapyKin-Mindfulness-Guide.pdf"
                  contentId="mindfulness-guide-content"
                  className="w-full btn-primary text-sm py-2"
                />
              </div>
              
              {/* Related Resources */}
              <div className="card p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">Related Resources</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-[var(--primary)]/10 rounded flex items-center justify-center mr-3 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 010-7.072m12.728 0l-3.536 3.536M6.414 8.464l3.536 3.536" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Guided Relaxation</h4>
                      <p className="text-sm text-foreground/70 mb-2">Audio guide for progressive muscle relaxation technique</p>
                      <Link href="/resources/muscle-relaxation-audio" className="text-xs text-[var(--primary)] font-medium hover:underline">
                        View Resource →
                      </Link>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-[var(--primary)]/10 rounded flex items-center justify-center mr-3 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Breathing Techniques</h4>
                      <p className="text-sm text-foreground/70 mb-2">Video tutorial on mindful breathing exercises</p>
                      <Link href="/resources/breathing-techniques-video" className="text-xs text-[var(--primary)] font-medium hover:underline">
                        View Resource →
                      </Link>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-[var(--primary)]/10 rounded flex items-center justify-center mr-3 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Self-Care Assessment</h4>
                      <p className="text-sm text-foreground/70 mb-2">Evaluate your self-care practices and create a personalized plan</p>
                      <Link href="/resources/self-care-assessment" className="text-xs text-[var(--primary)] font-medium hover:underline">
                        View Resource →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Quick Tips */}
              <div className="card p-6">
                <h3 className="text-lg font-semibold mb-4">Quick Mindfulness Tips</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-sm text-foreground/70">Take three conscious breaths whenever you feel stressed</p>
                  </div>
                  
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-sm text-foreground/70">Use daily activities (brushing teeth, showering) as mindfulness opportunities</p>
                  </div>
                  
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-sm text-foreground/70">Set reminders to check in with your body and breath throughout the day</p>
                  </div>
                  
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-sm text-foreground/70">Practice the STOP technique: Stop, Take a breath, Observe, Proceed</p>
                  </div>
                  
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-sm text-foreground/70">When eating, put down your utensils between bites to slow down</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
