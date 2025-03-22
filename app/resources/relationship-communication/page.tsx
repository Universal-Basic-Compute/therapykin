'use client';

import React, { useState } from "react";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ShareButtons from "../../components/ShareButtons";
import PDFDownloadButton from "../../components/PDFDownloadButton";

// Communication styles
const communicationStyles = [
  {
    id: "passive",
    name: "Passive Communication",
    description: "Avoiding expressing your honest feelings, needs, or opinions while allowing others to express themselves. Often leads to feeling victimized, resentful, and misunderstood.",
    examples: [
      "\"Whatever you want is fine with me.\"",
      "\"I'm sorry for bothering you with this...\"",
      "Avoiding eye contact and speaking softly",
      "Prioritizing others' needs at the expense of your own"
    ]
  },
  {
    id: "aggressive",
    name: "Aggressive Communication",
    description: "Expressing feelings and needs in a way that violates the rights of others. May involve dominating, controlling, or humiliating others.",
    examples: [
      "\"You never listen to me!\"",
      "\"That's a stupid idea.\"",
      "Speaking loudly or yelling",
      "Using threatening body language"
    ]
  },
  {
    id: "passive-aggressive",
    name: "Passive-Aggressive Communication",
    description: "Appearing passive on the surface but actually acting out anger indirectly. Involves a disconnect between what is said and what is done.",
    examples: [
      "\"Fine, whatever.\"",
      "Giving someone the silent treatment",
      "Making sarcastic or subtle digs",
      "Agreeing to do something but then \"forgetting\" to do it"
    ]
  },
  {
    id: "assertive",
    name: "Assertive Communication",
    description: "Clearly expressing your feelings, needs, and opinions while respecting the rights of others. The healthiest form of communication in relationships.",
    examples: [
      "\"I feel frustrated when our plans change at the last minute.\"",
      "\"I'd like to share my perspective on this.\"",
      "Speaking in a calm, clear voice",
      "Using confident body language while remaining respectful"
    ]
  }
];

// Active listening techniques
const listeningTechniques = [
  {
    id: "attention",
    name: "Give Full Attention",
    description: "Focus completely on the speaker without distractions.",
    tips: [
      "Put away electronic devices",
      "Make appropriate eye contact",
      "Notice the speaker's body language and tone",
      "Avoid planning your response while they're speaking"
    ]
  },
  {
    id: "paraphrase",
    name: "Paraphrase and Reflect",
    description: "Restate what you've heard in your own words to confirm understanding.",
    tips: [
      "\"So what you're saying is...\"",
      "\"It sounds like you feel...\"",
      "\"If I understand correctly...\"",
      "Focus on the main points and emotions expressed"
    ]
  },
  {
    id: "questions",
    name: "Ask Clarifying Questions",
    description: "Seek more information to ensure you fully understand.",
    tips: [
      "\"Could you tell me more about...?\"",
      "\"What do you mean when you say...?\"",
      "\"How did that make you feel?\"",
      "Ask open-ended questions that can't be answered with yes or no"
    ]
  },
  {
    id: "validate",
    name: "Validate Feelings",
    description: "Acknowledge the other person's emotions and perspective as valid.",
    tips: [
      "\"I can see why you would feel that way.\"",
      "\"That must have been difficult for you.\"",
      "\"Your feelings make sense given the situation.\"",
      "Validate even if you don't agree with their perspective"
    ]
  },
  {
    id: "nonverbal",
    name: "Use Supportive Non-Verbal Cues",
    description: "Show you're engaged through body language.",
    tips: [
      "Nod occasionally",
      "Maintain an open posture",
      "Lean slightly toward the speaker",
      "Use facial expressions that match the conversation"
    ]
  }
];

// Conflict resolution strategies
const conflictStrategies = [
  {
    id: "timing",
    name: "Choose the Right Time and Place",
    description: "Address conflicts in a private, neutral setting when both parties are calm and have time to talk.",
    steps: [
      "Ask if now is a good time to discuss something important",
      "If emotions are running high, agree to revisit the conversation later",
      "Find a private space free from distractions",
      "Set aside enough time for a complete discussion"
    ]
  },
  {
    id: "i-statements",
    name: "Use \"I\" Statements",
    description: "Express your feelings without blaming or accusing the other person.",
    steps: [
      "Start with \"I feel...\" rather than \"You always...\" or \"You never...\"",
      "Describe the specific behavior or situation, not the person",
      "Explain the impact it has on you",
      "Suggest what you would prefer in the future"
    ]
  },
  {
    id: "listen",
    name: "Listen to Understand, Not to Respond",
    description: "Focus on truly understanding the other person's perspective before formulating your response.",
    steps: [
      "Practice active listening techniques",
      "Resist the urge to interrupt",
      "Ask questions to clarify their perspective",
      "Acknowledge their feelings and point of view"
    ]
  },
  {
    id: "focus",
    name: "Focus on the Issue, Not the Person",
    description: "Address the specific problem rather than attacking character or bringing up past issues.",
    steps: [
      "Stick to one issue at a time",
      "Avoid generalizations like \"always\" and \"never\"",
      "Separate the person from the problem",
      "Focus on finding solutions rather than assigning blame"
    ]
  },
  {
    id: "compromise",
    name: "Look for Compromise and Common Ground",
    description: "Seek solutions that address the needs and concerns of both parties.",
    steps: [
      "Identify what's most important to each person",
      "Be willing to give a little to get a little",
      "Brainstorm multiple possible solutions",
      "Focus on mutual goals and shared values"
    ]
  }
];

// Relationship types and specific communication strategies
const relationshipTypes = [
  {
    id: "romantic",
    name: "Romantic Relationships",
    strategies: [
      "Schedule regular check-ins to discuss the relationship",
      "Express appreciation and affection daily",
      "Discuss expectations about communication frequency and style",
      "Create rituals for reconnecting after conflicts",
      "Balance talking about problems with positive interactions (aim for a 5:1 ratio of positive to negative)"
    ]
  },
  {
    id: "family",
    name: "Family Relationships",
    strategies: [
      "Respect generational differences in communication styles",
      "Establish clear boundaries while maintaining connection",
      "Create family meetings for important discussions",
      "Acknowledge family patterns and work to change unhealthy ones",
      "Practice patience with long-established dynamics"
    ]
  },
  {
    id: "friends",
    name: "Friendships",
    strategies: [
      "Be honest but tactful when giving feedback",
      "Respect different communication preferences and frequencies",
      "Address issues promptly before resentment builds",
      "Balance serious conversations with fun and enjoyment",
      "Check in during major life transitions"
    ]
  },
  {
    id: "work",
    name: "Work Relationships",
    strategies: [
      "Clarify expectations and deliverables",
      "Adapt your communication style to different colleagues",
      "Keep emotions in check while still being authentic",
      "Document important agreements and decisions",
      "Balance directness with diplomacy"
    ]
  }
];

// Communication barriers
const communicationBarriers = [
  {
    id: "assumptions",
    name: "Making Assumptions",
    description: "Believing you know what others are thinking or feeling without verification.",
    solutions: [
      "Ask clarifying questions instead of assuming",
      "Check your interpretations with the other person",
      "Be aware of projection (assuming others think like you)",
      "Remember that even people close to you can't read your mind"
    ]
  },
  {
    id: "defensiveness",
    name: "Defensiveness",
    description: "Reacting to feedback or criticism by protecting yourself rather than listening.",
    solutions: [
      "Take a deep breath before responding",
      "Look for the grain of truth in feedback",
      "Ask yourself why you feel threatened",
      "Respond with curiosity instead of counterattacks"
    ]
  },
  {
    id: "criticism",
    name: "Criticism and Contempt",
    description: "Attacking someone's character rather than addressing specific behaviors.",
    solutions: [
      "Focus on the behavior, not the person",
      "Use specific examples rather than generalizations",
      "Express how behaviors affect you rather than labeling them",
      "Remember you're on the same team, not opponents"
    ]
  },
  {
    id: "stonewalling",
    name: "Stonewalling",
    description: "Withdrawing from interaction, shutting down, or giving the silent treatment.",
    solutions: [
      "Recognize when you're feeling flooded and need a break",
      "Take time-outs but commit to returning to the conversation",
      "Practice self-soothing techniques",
      "Signal that you're listening even if you need time to respond"
    ]
  },
  {
    id: "distractions",
    name: "Environmental Distractions",
    description: "Physical or digital interruptions that prevent focused communication.",
    solutions: [
      "Choose appropriate times and places for important conversations",
      "Put away phones and turn off notifications",
      "Close doors or find private spaces when needed",
      "Postpone discussions if the environment isn't conducive"
    ]
  }
];

export default function RelationshipCommunication() {
  // State for active section (for mobile accordion view)
  const [activeSection, setActiveSection] = useState<string | null>("introduction");
  
  // State for expanded items
  const [expandedStyle, setExpandedStyle] = useState<string | null>(null);
  const [expandedTechnique, setExpandedTechnique] = useState<string | null>(null);
  const [expandedStrategy, setExpandedStrategy] = useState<string | null>(null);
  const [expandedBarrier, setExpandedBarrier] = useState<string | null>(null);
  
  // Toggle section visibility (for mobile)
  const toggleSection = (sectionId: string) => {
    if (activeSection === sectionId) {
      setActiveSection(null);
    } else {
      setActiveSection(sectionId);
    }
  };
  
  // Toggle expanded items
  const toggleStyle = (styleId: string) => {
    if (expandedStyle === styleId) {
      setExpandedStyle(null);
    } else {
      setExpandedStyle(styleId);
    }
  };
  
  const toggleTechnique = (techniqueId: string) => {
    if (expandedTechnique === techniqueId) {
      setExpandedTechnique(null);
    } else {
      setExpandedTechnique(techniqueId);
    }
  };
  
  const toggleStrategy = (strategyId: string) => {
    if (expandedStrategy === strategyId) {
      setExpandedStrategy(null);
    } else {
      setExpandedStrategy(strategyId);
    }
  };
  
  const toggleBarrier = (barrierId: string) => {
    if (expandedBarrier === barrierId) {
      setExpandedBarrier(null);
    } else {
      setExpandedBarrier(barrierId);
    }
  };
  
  // Get the current URL for sharing
  const currentUrl = typeof window !== 'undefined' 
    ? window.location.href 
    : 'https://therapykin.ai/resources/relationship-communication';
  
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
                      Relationship Communication
                    </span>
                  </div>
                </li>
              </ol>
            </nav>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div id="relationship-communication-content" className="lg:w-2/3">
              {/* Resource Header */}
              <div className="mb-8">
                <span className="px-3 py-1 bg-[var(--primary)]/10 text-[var(--primary)] rounded-full text-sm font-medium">
                  Relationships
                </span>
                <h1 className="text-3xl md:text-4xl font-bold mt-4 mb-4">Building Healthy Relationships: Communication Skills</h1>
                <p className="text-xl text-foreground/70 mb-6">
                  Learn effective communication techniques to improve your relationships with partners, family, friends, and colleagues.
                </p>
              </div>
              
              {/* Featured Image */}
              <div className="mb-8 rounded-xl overflow-hidden">
                <div className="aspect-w-16 aspect-h-9 bg-[var(--primary)]/10">
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-[var(--primary)]/20 to-[var(--accent)]/20">
                    <span className="text-[var(--primary)] font-medium">Relationship Communication Image</span>
                  </div>
                </div>
              </div>
              
              {/* Introduction */}
              <section id="introduction" className="mb-12">
                <h2 className="text-2xl font-bold mb-4">The Foundation of Healthy Relationships</h2>
                <p className="mb-4">
                  Communication is the cornerstone of all relationships. How we express ourselves, listen to others, and navigate conflicts largely determines the health and longevity of our connections with others. Yet effective communication is a skill that many of us were never explicitly taught.
                </p>
                <p className="mb-4">
                  Whether you're looking to strengthen a romantic partnership, improve family dynamics, build stronger friendships, or enhance workplace relationships, developing strong communication skills can transform your interactions and deepen your connections.
                </p>
                
                <div className="my-8 p-6 bg-[var(--primary)]/5 rounded-xl">
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="w-16 h-16 md:w-20 md:h-20 flex-shrink-0 rounded-full bg-[var(--primary)]/10 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-2">Why Communication Matters</h4>
                      <ul className="text-foreground/80 space-y-2">
                        <li>• Creates emotional safety and trust</li>
                        <li>• Prevents misunderstandings and conflicts</li>
                        <li>• Allows for deeper connection and intimacy</li>
                        <li>• Helps resolve problems effectively</li>
                        <li>• Supports personal growth and mutual understanding</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <p className="mb-4">
                  This guide will help you understand different communication styles, develop essential skills like active listening and assertiveness, navigate conflicts constructively, and adapt your approach to different types of relationships.
                </p>
                
                <div className="card p-6 shadow-depth mb-8">
                  <h3 className="text-xl font-semibold mb-4">The Communication Cycle</h3>
                  <p className="text-foreground/80 mb-4">
                    Effective communication involves a continuous cycle of:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3 mt-0.5">
                        <span className="font-semibold">1</span>
                      </div>
                      <div>
                        <h4 className="font-medium">Sending clear messages</h4>
                        <p className="text-sm text-foreground/70">Expressing thoughts and feelings clearly and respectfully</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3 mt-0.5">
                        <span className="font-semibold">2</span>
                      </div>
                      <div>
                        <h4 className="font-medium">Receiving messages</h4>
                        <p className="text-sm text-foreground/70">Listening actively and attentively</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3 mt-0.5">
                        <span className="font-semibold">3</span>
                      </div>
                      <div>
                        <h4 className="font-medium">Processing information</h4>
                        <p className="text-sm text-foreground/70">Understanding and interpreting what was communicated</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3 mt-0.5">
                        <span className="font-semibold">4</span>
                      </div>
                      <div>
                        <h4 className="font-medium">Responding thoughtfully</h4>
                        <p className="text-sm text-foreground/70">Providing feedback that moves the conversation forward</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              
              {/* Communication Styles */}
              <section id="communication-styles" className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Understanding Communication Styles</h2>
                
                <p className="mb-6">
                  We all have default communication patterns that we've developed over time. Recognizing your own style and understanding others' styles can help you adapt your approach for more effective interactions.
                </p>
                
                <div className="space-y-6">
                  {communicationStyles.map(style => (
                    <div key={style.id} className="card p-6 hover:shadow-depth transition-all">
                      <button 
                        className="flex justify-between items-center w-full text-left"
                        onClick={() => toggleStyle(style.id)}
                      >
                        <h3 className="text-xl font-semibold">{style.name}</h3>
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className={`h-5 w-5 transition-transform ${expandedStyle === style.id ? 'rotate-180' : ''}`} 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      
                      <p className="mt-2 text-foreground/70">{style.description}</p>
                      
                      {expandedStyle === style.id && (
                        <div className="mt-4 bg-[var(--background-alt)] p-4 rounded-lg">
                          <h4 className="font-medium mb-2">Examples:</h4>
                          <ul className="list-disc pl-5 space-y-1 text-foreground/70">
                            {style.examples.map((example, index) => (
                              <li key={index}>{example}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 p-6 bg-[var(--primary)]/5 rounded-xl">
                  <h3 className="text-xl font-semibold mb-4">Developing an Assertive Communication Style</h3>
                  <p className="mb-4">
                    Of the four communication styles, assertive communication is the healthiest approach for building strong relationships. Here's how to develop this skill:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-foreground/80">
                    <li>Use "I" statements to express your feelings and needs</li>
                    <li>Be specific about behaviors rather than making generalizations</li>
                    <li>Express both positive and negative feelings honestly</li>
                    <li>Maintain appropriate eye contact and confident body language</li>
                    <li>Respect others' right to have different opinions</li>
                    <li>Set clear boundaries while respecting others' boundaries</li>
                    <li>Be willing to compromise and find mutually beneficial solutions</li>
                  </ul>
                </div>
              </section>
              
              {/* Active Listening */}
              <section id="active-listening" className="mb-12">
                <h2 className="text-2xl font-bold mb-6">The Art of Active Listening</h2>
                
                <p className="mb-6">
                  Listening is perhaps the most important yet often overlooked aspect of communication. Active listening goes beyond simply hearing words—it involves fully engaging with the speaker and demonstrating that you value what they're saying.
                </p>
                
                <div className="space-y-6">
                  {listeningTechniques.map(technique => (
                    <div key={technique.id} className="card p-6 hover:shadow-depth transition-all">
                      <button 
                        className="flex justify-between items-center w-full text-left"
                        onClick={() => toggleTechnique(technique.id)}
                      >
                        <h3 className="text-xl font-semibold">{technique.name}</h3>
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className={`h-5 w-5 transition-transform ${expandedTechnique === technique.id ? 'rotate-180' : ''}`} 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      
                      <p className="mt-2 text-foreground/70">{technique.description}</p>
                      
                      {expandedTechnique === technique.id && (
                        <div className="mt-4 bg-[var(--background-alt)] p-4 rounded-lg">
                          <h4 className="font-medium mb-2">How to practice this:</h4>
                          <ul className="list-disc pl-5 space-y-1 text-foreground/70">
                            {technique.tips.map((tip, index) => (
                              <li key={index}>{tip}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 card p-6 shadow-depth">
                  <h3 className="text-xl font-semibold mb-4">Active Listening Exercise</h3>
                  <p className="mb-4">
                    Practice this exercise with a friend, family member, or partner to strengthen your active listening skills:
                  </p>
                  <ol className="list-decimal pl-5 space-y-3 text-foreground/80">
                    <li>
                      <strong>Speaker's Turn (3-5 minutes):</strong> One person speaks about something meaningful to them—a challenge they're facing, a goal they have, or something they're excited about.
                    </li>
                    <li>
                      <strong>Listener's Role:</strong> The other person listens without interrupting. Their only job is to understand, not to solve problems or share their own experiences.
                    </li>
                    <li>
                      <strong>Reflection:</strong> After the speaker finishes, the listener summarizes what they heard, including the feelings expressed.
                    </li>
                    <li>
                      <strong>Verification:</strong> The speaker confirms if the listener understood correctly or clarifies any misunderstandings.
                    </li>
                    <li>
                      <strong>Switch Roles:</strong> Reverse positions and repeat the exercise.
                    </li>
                  </ol>
                  <p className="mt-4 text-sm text-foreground/70">
                    Practice this regularly to build your listening muscle. Many people are surprised at how challenging it can be to truly listen without planning a response or relating the conversation back to themselves.
                  </p>
                </div>
              </section>
              
              {/* Expressing Needs and Feelings */}
              <section id="expressing-needs" className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Expressing Needs and Feelings Effectively</h2>
                
                <p className="mb-6">
                  Clearly expressing your needs, feelings, and boundaries is essential for healthy relationships. When done skillfully, it helps others understand you better without creating defensiveness.
                </p>
                
                <div className="card p-6 shadow-depth mb-8">
                  <h3 className="text-xl font-semibold mb-4">The Components of an Effective "I" Statement</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3 mt-0.5">
                        <span className="font-semibold">1</span>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Observation</h4>
                        <p className="text-foreground/70">
                          Describe the specific behavior or situation without judgment or interpretation.
                        </p>
                        <p className="text-sm text-foreground/60 mt-1 italic">
                          "When meetings start 15 minutes late..."
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3 mt-0.5">
                        <span className="font-semibold">2</span>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Feeling</h4>
                        <p className="text-foreground/70">
                          Express your emotion about the situation using feeling words.
                        </p>
                        <p className="text-sm text-foreground/60 mt-1 italic">
                          "...I feel frustrated and rushed..."
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3 mt-0.5">
                        <span className="font-semibold">3</span>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Impact</h4>
                        <p className="text-foreground/70">
                          Explain how the situation affects you or others.
                        </p>
                        <p className="text-sm text-foreground/60 mt-1 italic">
                          "...because I have to compress my presentation and might miss important points..."
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3 mt-0.5">
                        <span className="font-semibold">4</span>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Need/Request</h4>
                        <p className="text-foreground/70">
                          Clearly state what you need or would like to happen.
                        </p>
                        <p className="text-sm text-foreground/60 mt-1 italic">
                          "...I'd appreciate it if we could start our meetings on time."
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-[var(--background-alt)] rounded-lg">
                    <h4 className="font-medium mb-2">Complete Example:</h4>
                    <p className="text-foreground/80">
                      "When meetings start 15 minutes late, I feel frustrated and rushed because I have to compress my presentation and might miss important points. I'd appreciate it if we could start our meetings on time."
                    </p>
                    <p className="text-sm text-foreground/60 mt-2">
                      Compare this to: "You're always late for meetings and it's really inconsiderate!" The "I" statement focuses on the impact of the behavior rather than attacking the person.
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="card p-6">
                    <h3 className="text-xl font-semibold mb-3">Expressing Difficult Emotions</h3>
                    <ul className="list-disc pl-5 space-y-2 text-foreground/70">
                      <li>Take time to identify what you're really feeling</li>
                      <li>Use specific emotion words beyond just "good," "bad," "fine"</li>
                      <li>Own your emotions rather than blaming others for them</li>
                      <li>Consider timing—find an appropriate moment</li>
                      <li>Start with less intense emotions if the conversation is difficult</li>
                      <li>Be willing to be vulnerable</li>
                    </ul>
                  </div>
                  
                  <div className="card p-6">
                    <h3 className="text-xl font-semibold mb-3">Setting Healthy Boundaries</h3>
                    <ul className="list-disc pl-5 space-y-2 text-foreground/70">
                      <li>Identify your physical, emotional, and time boundaries</li>
                      <li>Communicate boundaries clearly and directly</li>
                      <li>Use simple, straightforward language</li>
                      <li>Don't over-explain or apologize for your boundaries</li>
                      <li>Be consistent in enforcing boundaries</li>
                      <li>Respect others' boundaries as you want yours respected</li>
                    </ul>
                  </div>
                </div>
                
                <div className="p-6 bg-[var(--primary)]/5 rounded-xl">
                  <h3 className="text-xl font-semibold mb-4">Expanding Your Emotional Vocabulary</h3>
                  <p className="mb-4">
                    Many of us default to basic terms like "angry," "sad," or "happy" when describing our emotions. Expanding your emotional vocabulary helps you communicate your feelings with more precision.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <h4 className="font-medium mb-2">Instead of "Angry"</h4>
                      <ul className="text-sm text-foreground/70 space-y-1">
                        <li>Frustrated</li>
                        <li>Irritated</li>
                        <li>Resentful</li>
                        <li>Annoyed</li>
                        <li>Furious</li>
                        <li>Exasperated</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Instead of "Sad"</h4>
                      <ul className="text-sm text-foreground/70 space-y-1">
                        <li>Disappointed</li>
                        <li>Discouraged</li>
                        <li>Lonely</li>
                        <li>Melancholy</li>
                        <li>Heartbroken</li>
                        <li>Hopeless</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Instead of "Happy"</h4>
                      <ul className="text-sm text-foreground/70 space-y-1">
                        <li>Content</li>
                        <li>Joyful</li>
                        <li>Excited</li>
                        <li>Grateful</li>
                        <li>Proud</li>
                        <li>Peaceful</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Instead of "Afraid"</h4>
                      <ul className="text-sm text-foreground/70 space-y-1">
                        <li>Anxious</li>
                        <li>Nervous</li>
                        <li>Worried</li>
                        <li>Insecure</li>
                        <li>Overwhelmed</li>
                        <li>Vulnerable</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>
              
              {/* Conflict Resolution */}
              <section id="conflict-resolution" className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Navigating Conflict Constructively</h2>
                
                <p className="mb-6">
                  Conflict is a natural part of all relationships. The goal isn't to eliminate conflict but to handle it in ways that strengthen rather than damage your connections. Healthy conflict resolution can actually deepen understanding and trust.
                </p>
                
                <div className="space-y-6">
                  {conflictStrategies.map(strategy => (
                    <div key={strategy.id} className="card p-6 hover:shadow-depth transition-all">
                      <button 
                        className="flex justify-between items-center w-full text-left"
                        onClick={() => toggleStrategy(strategy.id)}
                      >
                        <h3 className="text-xl font-semibold">{strategy.name}</h3>
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className={`h-5 w-5 transition-transform ${expandedStrategy === strategy.id ? 'rotate-180' : ''}`} 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      
                      <p className="mt-2 text-foreground/70">{strategy.description}</p>
                      
                      {expandedStrategy === strategy.id && (
                        <div className="mt-4 bg-[var(--background-alt)] p-4 rounded-lg">
                          <h4 className="font-medium mb-2">How to implement this:</h4>
                          <ul className="list-disc pl-5 space-y-1 text-foreground/70">
                            {strategy.steps.map((step, index) => (
                              <li key={index}>{step}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 card p-6 shadow-depth">
                  <h3 className="text-xl font-semibold mb-4">The Repair Attempt: A Relationship Lifesaver</h3>
                  <p className="mb-4">
                    Relationship researcher Dr. John Gottman identified "repair attempts" as one of the most important factors in successful relationships. A repair attempt is any statement or action that prevents negativity from escalating during conflict.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2">Examples of Repair Attempts:</h4>
                      <ul className="list-disc pl-5 space-y-1 text-foreground/70">
                        <li>"I need to take a break. Can we talk about this in 30 minutes?"</li>
                        <li>"I'm feeling defensive. Can you rephrase that?"</li>
                        <li>"That came out wrong. Let me try again."</li>
                        <li>"I'm sorry for raising my voice."</li>
                        <li>"We're getting off track. Let's focus on the main issue."</li>
                        <li>Using humor to lighten the tension (when appropriate)</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">How to Make Repair Attempts Work:</h4>
                      <ul className="list-disc pl-5 space-y-1 text-foreground/70">
                        <li>Make repair attempts early, before emotions escalate</li>
                        <li>Be receptive when your partner makes a repair attempt</li>
                        <li>Practice identifying and using repair attempts that work for your relationship</li>
                        <li>Remember that even clumsy repair attempts are better than none</li>
                        <li>Acknowledge when your partner makes a repair attempt</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>
              
              {/* Communication in Different Relationships */}
              <section id="relationship-types" className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Adapting Communication to Different Relationships</h2>
                
                <p className="mb-6">
                  While the core principles of effective communication apply to all relationships, different types of relationships may require specific approaches. Here are strategies for common relationship types:
                </p>
                
                <div className="space-y-6">
                  {relationshipTypes.map(type => (
                    <div key={type.id} className="card p-6 shadow-sm hover:shadow-depth transition-all">
                      <h3 className="text-xl font-semibold mb-3">{type.name}</h3>
                      <ul className="list-disc pl-5 space-y-2 text-foreground/70">
                        {type.strategies.map((strategy, index) => (
                          <li key={index}>{strategy}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 p-6 bg-[var(--primary)]/5 rounded-xl">
                  <h3 className="text-xl font-semibold mb-4">Digital Communication Considerations</h3>
                  <p className="mb-4">
                    In today's world, much of our communication happens through digital channels, which present unique challenges:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-foreground/80">
                    <li>
                      <strong>Missing nonverbal cues:</strong> Without tone of voice, facial expressions, and body language, messages can be easily misinterpreted. Use emojis, GIFs, or explicit statements about your tone when needed.
                    </li>
                    <li>
                      <strong>Asynchronous timing:</strong> Delayed responses can create anxiety or misunderstandings. Set expectations about response times and don't assume negative intentions based on timing.
                    </li>
                    <li>
                      <strong>Platform appropriateness:</strong> Consider which medium is best for your message—complex or emotional topics are usually better discussed in person or via video call rather than text.
                    </li>
                    <li>
                      <strong>Permanence:</strong> Written communications create a record that can be revisited. Be thoughtful about what you put in writing, especially when emotions are high.
                    </li>
                    <li>
                      <strong>Multitasking:</strong> Digital communication often happens alongside other activities, reducing attention and comprehension. For important conversations, give your full attention.
                    </li>
                  </ul>
                </div>
              </section>
              
              {/* Communication Barriers */}
              <section id="barriers" className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Overcoming Common Communication Barriers</h2>
                
                <p className="mb-6">
                  Even with the best intentions, certain patterns and behaviors can block effective communication. Recognizing these barriers is the first step to overcoming them.
                </p>
                
                <div className="space-y-6">
                  {communicationBarriers.map(barrier => (
                    <div key={barrier.id} className="card p-6 hover:shadow-depth transition-all">
                      <button 
                        className="flex justify-between items-center w-full text-left"
                        onClick={() => toggleBarrier(barrier.id)}
                      >
                        <h3 className="text-xl font-semibold">{barrier.name}</h3>
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className={`h-5 w-5 transition-transform ${expandedBarrier === barrier.id ? 'rotate-180' : ''}`} 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      
                      <p className="mt-2 text-foreground/70">{barrier.description}</p>
                      
                      {expandedBarrier === barrier.id && (
                        <div className="mt-4 bg-[var(--background-alt)] p-4 rounded-lg">
                          <h4 className="font-medium mb-2">How to overcome this:</h4>
                          <ul className="list-disc pl-5 space-y-1 text-foreground/70">
                            {barrier.solutions.map((solution, index) => (
                              <li key={index}>{solution}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 card p-6 shadow-depth">
                  <h3 className="text-xl font-semibold mb-4">The Four Horsemen: Communication Patterns That Predict Relationship Failure</h3>
                  <p className="mb-4">
                    Dr. John Gottman's research identified four communication patterns that can predict the end of a relationship with over 90% accuracy if they occur regularly:
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3 mt-0.5">
                        <span className="font-semibold">1</span>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Criticism</h4>
                        <p className="text-foreground/70">
                          Attacking someone's character rather than addressing specific behaviors.
                        </p>
                        <p className="text-sm text-foreground/60 mt-1">
                          <strong>Antidote:</strong> Use "I" statements to express how specific behaviors affect you.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3 mt-0.5">
                        <span className="font-semibold">2</span>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Contempt</h4>
                        <p className="text-foreground/70">
                          Treating others with disrespect, mockery, ridicule, or disgust.
                        </p>
                        <p className="text-sm text-foreground/60 mt-1">
                          <strong>Antidote:</strong> Build a culture of appreciation and respect; focus on what you value about the other person.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3 mt-0.5">
                        <span className="font-semibold">3</span>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Defensiveness</h4>
                        <p className="text-foreground/70">
                          Seeing yourself as the victim and rejecting responsibility.
                        </p>
                        <p className="text-sm text-foreground/60 mt-1">
                          <strong>Antidote:</strong> Accept responsibility for your part in the issue, even if it's just a small part.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3 mt-0.5">
                        <span className="font-semibold">4</span>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Stonewalling</h4>
                        <p className="text-foreground/70">
                          Withdrawing from interaction, shutting down, or giving the silent treatment.
                        </p>
                        <p className="text-sm text-foreground/60 mt-1">
                          <strong>Antidote:</strong> Practice physiological self-soothing; take a break but commit to returning to the conversation.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              
              {/* Putting It All Together */}
              <section id="practice" className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Putting It All Together: Practice Makes Progress</h2>
                
                <p className="mb-4">
                  Effective communication is a skill that develops with practice. Don't expect perfection—aim for progress and be patient with yourself and others as you work to improve your communication patterns.
                </p>
                
                <div className="card p-6 shadow-depth mb-8">
                  <h3 className="text-xl font-semibold mb-4">A Weekly Communication Practice Plan</h3>
                  <p className="mb-4">
                    Here's a simple weekly plan to help you systematically improve your communication skills:
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3 mt-0.5">
                        <span className="font-semibold">1</span>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Monday: Self-Awareness</h4>
                        <p className="text-foreground/70">
                          Notice your communication patterns. What's your default style? When do you struggle most to communicate effectively?
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3 mt-0.5">
                        <span className="font-semibold">2</span>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Tuesday: Active Listening</h4>
                        <p className="text-foreground/70">
                          Focus on being fully present in conversations. Practice paraphrasing and asking clarifying questions.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3 mt-0.5">
                        <span className="font-semibold">3</span>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Wednesday: Assertive Expression</h4>
                        <p className="text-foreground/70">
                          Practice using "I" statements to express your needs and feelings in at least one conversation.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3 mt-0.5">
                        <span className="font-semibold">4</span>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Thursday: Conflict Navigation</h4>
                        <p className="text-foreground/70">
                          Address a small issue using the conflict resolution strategies. Focus on understanding before problem-solving.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3 mt-0.5">
                        <span className="font-semibold">5</span>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Friday: Barrier Identification</h4>
                        <p className="text-foreground/70">
                          Reflect on any communication barriers that arose during the week. How might you overcome them next time?
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3 mt-0.5">
                        <span className="font-semibold">6</span>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Weekend: Connection Building</h4>
                        <p className="text-foreground/70">
                          Have a meaningful conversation with someone important to you. Practice combining all the skills you've worked on.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 bg-[var(--primary)]/5 rounded-xl">
                  <h3 className="text-xl font-semibold mb-4">Remember:</h3>
                  <ul className="list-disc pl-5 space-y-2 text-foreground/80">
                    <li>
                      <strong>Progress, not perfection:</strong> Communication skills develop over time with consistent practice.
                    </li>
                    <li>
                      <strong>Different relationships, different approaches:</strong> Adapt your communication style to the specific relationship and context.
                    </li>
                    <li>
                      <strong>Self-compassion matters:</strong> Be kind to yourself when you make mistakes—they're opportunities to learn.
                    </li>
                    <li>
                      <strong>Repair is powerful:</strong> How you recover from communication missteps is often more important than avoiding them entirely.
                    </li>
                    <li>
                      <strong>Continuous learning:</strong> Communication is a lifelong skill that can always be refined and improved.
                    </li>
                  </ul>
                </div>
              </section>
              
              {/* Conclusion */}
              <section id="conclusion" className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Conclusion</h2>
                <p className="mb-4">
                  Effective communication is the foundation of healthy, fulfilling relationships. By developing skills in active listening, assertive expression, conflict resolution, and overcoming communication barriers, you can transform your connections with others.
                </p>
                <p className="mb-4">
                  Remember that communication is a two-way process that requires both speaking and listening. The most meaningful connections happen when both parties feel heard, understood, and respected.
                </p>
                <p>
                  As you practice these skills, you'll likely notice improvements not just in your relationships with others, but also in your relationship with yourself—greater self-awareness, confidence in expressing your needs, and resilience in navigating life's challenges.
                </p>
              </section>
              
              {/* Share Links */}
              <div className="mb-12">
                <h3 className="font-semibold mb-4">Share this resource</h3>
                <ShareButtons 
                  title="Building Healthy Relationships: Communication Skills" 
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
                  <a href="#introduction" className="block text-foreground/70 hover:text-[var(--primary)] py-1 border-l-2 border-transparent hover:border-[var(--primary)] pl-3 transition-all">
                    The Foundation of Healthy Relationships
                  </a>
                  <a href="#communication-styles" className="block text-foreground/70 hover:text-[var(--primary)] py-1 border-l-2 border-transparent hover:border-[var(--primary)] pl-3 transition-all">
                    Understanding Communication Styles
                  </a>
                  <a href="#active-listening" className="block text-foreground/70 hover:text-[var(--primary)] py-1 border-l-2 border-transparent hover:border-[var(--primary)] pl-3 transition-all">
                    The Art of Active Listening
                  </a>
                  <a href="#expressing-needs" className="block text-foreground/70 hover:text-[var(--primary)] py-1 border-l-2 border-transparent hover:border-[var(--primary)] pl-3 transition-all">
                    Expressing Needs and Feelings
                  </a>
                  <a href="#conflict-resolution" className="block text-foreground/70 hover:text-[var(--primary)] py-1 border-l-2 border-transparent hover:border-[var(--primary)] pl-3 transition-all">
                    Navigating Conflict Constructively
                  </a>
                  <a href="#relationship-types" className="block text-foreground/70 hover:text-[var(--primary)] py-1 border-l-2 border-transparent hover:border-[var(--primary)] pl-3 transition-all">
                    Communication in Different Relationships
                  </a>
                  <a href="#barriers" className="block text-foreground/70 hover:text-[var(--primary)] py-1 border-l-2 border-transparent hover:border-[var(--primary)] pl-3 transition-all">
                    Overcoming Communication Barriers
                  </a>
                  <a href="#practice" className="block text-foreground/70 hover:text-[var(--primary)] py-1 border-l-2 border-transparent hover:border-[var(--primary)] pl-3 transition-all">
                    Putting It All Together
                  </a>
                  <a href="#conclusion" className="block text-foreground/70 hover:text-[var(--primary)] py-1 border-l-2 border-transparent hover:border-[var(--primary)] pl-3 transition-all">
                    Conclusion
                  </a>
                </nav>
              </div>
              
              {/* Related Resources */}
              <div className="card p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">Related Resources</h3>
                <div className="space-y-4">
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
                  
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-[var(--primary)]/10 rounded flex items-center justify-center mr-3 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Mindfulness Guide</h4>
                      <p className="text-sm text-foreground/70 mb-2">A step-by-step guide to starting a mindfulness practice</p>
                      <Link href="/resources/mindfulness-guide" className="text-xs text-[var(--primary)] font-medium hover:underline">
                        View Resource →
                      </Link>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-[var(--primary)]/10 rounded flex items-center justify-center mr-3 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Stress Management</h4>
                      <p className="text-sm text-foreground/70 mb-2">Science-based strategies for reducing stress</p>
                      <Link href="/resources/stress-science" className="text-xs text-[var(--primary)] font-medium hover:underline">
                        View Resource →
                      </Link>
                    </div>
                  </div>
                </div>
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
                  Get a PDF version of this guide to read offline or share with others.
                </p>
                <PDFDownloadButton
                  title="Building Healthy Relationships: Communication Skills"
                  subtitle="TherapyKin Resource Library"
                  filename="TherapyKin-Relationship-Communication-Guide.pdf"
                  contentId="relationship-communication-content"
                  className="w-full btn-primary text-sm py-2"
                />
              </div>
              
              {/* Quick Tips */}
              <div className="card p-6">
                <h3 className="text-lg font-semibold mb-4">Quick Communication Tips</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-sm text-foreground/70">Listen to understand, not to respond</p>
                  </div>
                  
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-sm text-foreground/70">Use "I" statements instead of "You" statements</p>
                  </div>
                  
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-sm text-foreground/70">Be specific about behaviors rather than making generalizations</p>
                  </div>
                  
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-sm text-foreground/70">Take a pause before responding when emotions are high</p>
                  </div>
                  
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-sm text-foreground/70">Ask clarifying questions instead of making assumptions</p>
                  </div>
                  
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-sm text-foreground/70">Focus on one issue at a time during difficult conversations</p>
                  </div>
                  
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-sm text-foreground/70">Express appreciation and gratitude regularly</p>
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
