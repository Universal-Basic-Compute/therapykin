'use client';

import React, { useState } from "react";
// Type guard helper function
const hasProperty = <T extends object, K extends string>(obj: T, key: K): obj is T & Record<K, unknown> => {
  return key in obj;
};
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ShareButtons from "../../components/ShareButtons";
import PDFDownloadButton from "../../components/PDFDownloadButton";

// CBT Worksheet categories and their descriptions
const cbtWorksheetCategories = [
  {
    id: "thought-records",
    name: "Thought Records",
    description: "Tools to identify and challenge negative automatic thoughts",
    worksheets: [
      {
        id: "basic-thought-record",
        title: "Basic Thought Record",
        description: "A simple worksheet to identify situations, thoughts, emotions, and behaviors",
        difficulty: "Beginner",
        instructions: [
          "Identify a situation that triggered negative emotions",
          "Write down your automatic thoughts in that moment",
          "Rate how strongly you believed those thoughts (0-100%)",
          "Identify the emotions you felt and rate their intensity (0-100%)",
          "Look for evidence that supports and contradicts your automatic thoughts",
          "Develop a more balanced alternative thought",
          "Re-rate your belief in the original thought and the intensity of your emotions"
        ],
        example: {
          situation: "Gave a presentation at work and noticed a colleague yawning",
          automaticThoughts: "My presentation was boring. Everyone thinks I'm incompetent.",
          beliefRating: "85%",
          emotions: "Embarrassment (90%), Anxiety (80%), Sadness (70%)",
          supportingEvidence: "One person was yawning. A few people were looking at their phones.",
          contradictingEvidence: "Several people asked questions afterward. My boss complimented specific points. The yawning person mentioned they were up all night with a sick child.",
          alternativeThought: "One person yawning doesn't mean my presentation was boring. There could be many reasons for it. Several people seemed engaged and interested.",
          newBeliefRating: "30%",
          newEmotionRating: "Embarrassment (40%), Anxiety (35%), Sadness (25%)"
        }
      },
      {
        id: "cognitive-distortions",
        title: "Cognitive Distortions Worksheet",
        description: "Helps identify specific thinking errors that contribute to negative emotions",
        difficulty: "Intermediate",
        instructions: [
          "Identify a negative thought you've been having",
          "Review the list of common cognitive distortions",
          "Identify which distortions are present in your thinking",
          "Reframe your thought in a more balanced way, free from distortions"
        ],
        example: {
          negativeThought: "I made a mistake on the report, so I'm going to get fired. I'm terrible at my job.",
          distortions: [
            "Catastrophizing: Assuming the worst possible outcome (getting fired)",
            "All-or-nothing thinking: Seeing the situation in black and white terms",
            "Overgeneralization: Using one instance to draw a broad conclusion about overall ability"
          ],
          reframedThought: "I made a mistake on the report, which is disappointing, but everyone makes mistakes sometimes. I can correct it and learn from it. One mistake doesn't define my overall job performance."
        }
      },
      {
        id: "evidence-worksheet",
        title: "Evidence For and Against Worksheet",
        description: "A detailed approach to evaluating the evidence supporting and contradicting negative thoughts",
        difficulty: "Intermediate",
        instructions: [
          "Write down a troubling thought or belief",
          "List all evidence that supports this thought",
          "List all evidence that contradicts this thought",
          "Evaluate the evidence objectively, as if you were a detective",
          "Create a balanced thought based on all the evidence",
          "Rate how much you believe the original thought and the new balanced thought"
        ],
        example: {
          troublingThought: "I'm unlikable and people don't enjoy my company",
          supportingEvidence: "Wasn't invited to a colleague's party. Sometimes people don't respond to my messages right away. Had an awkward conversation yesterday.",
          contradictingEvidence: "Have several close friends who regularly make plans with me. Received positive feedback about being a good listener. Was invited to three social events last month.",
          balancedThought: "While I sometimes experience social awkwardness, there is substantial evidence that many people do enjoy my company. Not being invited to every event or having occasional awkward interactions is normal and doesn't mean I'm unlikable.",
          originalBeliefRating: "85%",
          newBeliefRating: "30%"
        }
      }
    ]
  },
  {
    id: "behavioral-activation",
    name: "Behavioral Activation",
    description: "Worksheets to help increase engagement in positive activities",
    worksheets: [
      {
        id: "activity-scheduling",
        title: "Activity Scheduling Worksheet",
        description: "Plan and track mood-boosting activities to combat depression and inactivity",
        difficulty: "Beginner",
        instructions: [
          "Create a list of activities that you enjoy or that give you a sense of accomplishment",
          "Rate each activity for pleasure and mastery (sense of achievement) on a scale of 0-10",
          "Schedule these activities into your week, starting with small, manageable tasks",
          "After completing each activity, rate your mood before and after (0-10)",
          "Reflect on what you learned and adjust your schedule for next week"
        ],
        example: {
          activities: [
            "Morning walk (Pleasure: 7, Mastery: 6)",
            "Calling a friend (Pleasure: 8, Mastery: 4)",
            "Cooking a new recipe (Pleasure: 6, Mastery: 8)",
            "Reading for 30 minutes (Pleasure: 8, Mastery: 5)"
          ],
          schedule: "Monday 8am: Morning walk, Tuesday 7pm: Call Sarah, Wednesday 6pm: Try new pasta recipe, Thursday 9pm: Read new novel",
          moodRatings: "Morning walk: Before (4), After (7); Calling friend: Before (3), After (8)",
          reflection: "I noticed my mood improved significantly after social contact. Even when I didn't feel like walking, my mood improved afterward. Will add more social activities next week."
        }
      },
      {
        id: "values-activities",
        title: "Values and Activities Worksheet",
        description: "Connect meaningful activities to your core values to increase motivation",
        difficulty: "Intermediate",
        instructions: [
          "Identify 3-5 core values that are important to you (e.g., connection, health, creativity)",
          "For each value, list activities that would allow you to live in accordance with that value",
          "Rate how consistently you've been engaging in these activities (0-10)",
          "Select activities to focus on in the coming week",
          "Track your progress and reflect on how these activities align with your values"
        ],
        example: {
          values: [
            {
              value: "Connection",
              activities: "Weekly calls with family, Coffee with a friend, Volunteering at community center",
              consistencyRating: "4/10"
            },
            {
              value: "Health",
              activities: "Regular exercise, Cooking nutritious meals, Getting adequate sleep",
              consistencyRating: "6/10"
            },
            {
              value: "Learning",
              activities: "Reading non-fiction, Taking online courses, Attending workshops",
              consistencyRating: "3/10"
            }
          ],
          selectedActivities: "Schedule two 30-minute family calls, Plan one coffee date, Take a 20-minute walk 3 times this week, Read for 15 minutes before bed",
          reflection: "When I connect my activities to my values, I feel more motivated to do them even when I don't feel like it. I noticed that even small steps toward living my values improved my sense of purpose."
        }
      }
    ]
  },
  {
    id: "core-beliefs",
    name: "Core Beliefs Work",
    description: "Tools to identify and modify deeply held beliefs about yourself, others, and the world",
    worksheets: [
      {
        id: "belief-identification",
        title: "Core Belief Identification Worksheet",
        description: "Techniques to uncover underlying core beliefs that drive negative thoughts and feelings",
        difficulty: "Advanced",
        instructions: [
          "Identify a recurring negative thought or pattern",
          "Use the downward arrow technique: ask yourself 'If this thought were true, what would it mean about me/others/the world?'",
          "Continue asking this question until you reach a fundamental belief",
          "Identify themes in your core beliefs (e.g., helplessness, unlovability, unworthiness)",
          "Rate how strongly you believe each core belief (0-100%)"
        ],
        example: {
          recurringThought: "My colleague didn't acknowledge my contribution to the project",
          downwardArrow: [
            "If true, what does that mean? → My work isn't valuable",
            "If my work isn't valuable, what does that mean? → I don't have anything worthwhile to contribute",
            "If I don't have anything worthwhile to contribute, what does that mean? → I'm inadequate"
          ],
          coreBeliefIdentified: "I'm inadequate",
          beliefRating: "75%"
        }
      },
      {
        id: "belief-challenging",
        title: "Core Belief Challenging Worksheet",
        description: "Systematically examine and restructure deeply held negative beliefs",
        difficulty: "Advanced",
        instructions: [
          "Write down the core belief you want to challenge",
          "List evidence that appears to support this belief",
          "Examine each piece of supporting evidence critically, looking for alternative explanations",
          "List evidence that contradicts this belief",
          "Develop a new, more balanced core belief",
          "Create a plan to reinforce this new belief through thoughts and actions"
        ],
        example: {
          coreBeliefToChallenge: "I'm unlovable",
          supportingEvidence: "My last relationship ended. Sometimes friends are too busy to meet up. My parent was often critical of me.",
          criticalExamination: "Relationships end for many reasons, not just because someone is 'unlovable.' Friends have their own lives and responsibilities. My parent's criticism may reflect their own issues rather than my worth.",
          contradictingEvidence: "I have maintained several long-term friendships. My colleague said they appreciate my supportiveness. My current partner expresses love and affection regularly.",
          newBeliefDeveloped: "I am worthy of love, even though not every relationship will work out, and not everyone will express love in the way I expect.",
          reinforcementPlan: "Keep a daily log of expressions of care from others. Practice self-compassion meditation. Challenge thoughts of being unlovable when they arise."
        }
      }
    ]
  },
  {
    id: "emotional-regulation",
    name: "Emotional Regulation",
    description: "Techniques to identify, understand, and manage difficult emotions",
    worksheets: [
      {
        id: "emotion-tracking",
        title: "Emotion Tracking Log",
        description: "Monitor emotions to identify patterns and triggers",
        difficulty: "Beginner",
        instructions: [
          "Throughout the day, pause to note your emotional state",
          "Record the situation, the emotion(s) felt, the intensity (0-10), and any physical sensations",
          "Identify what triggered the emotion and any thoughts associated with it",
          "Note how you responded to the emotion",
          "Review your log to identify patterns in your emotional responses"
        ],
        example: {
          entries: [
            {
              time: "9:30 AM",
              situation: "Received critical email from boss",
              emotions: "Anxiety (8), Shame (6)",
              physicalSensations: "Tight chest, racing heart, sweaty palms",
              thoughts: "I've messed up. My boss thinks I'm incompetent.",
              response: "Avoided responding to email. Procrastinated on other tasks."
            },
            {
              time: "1:15 PM",
              situation: "Lunch with coworker who complimented my work",
              emotions: "Pride (7), Happiness (6)",
              physicalSensations: "Relaxed shoulders, smiled, energetic",
              thoughts: "Maybe I am good at some aspects of my job.",
              response: "Felt motivated to tackle the difficult email and other tasks."
            }
          ],
          patterns: "Criticism tends to trigger anxiety and avoidance behaviors. Social support improves confidence and motivation. Physical anxiety symptoms often precede procrastination."
        }
      },
      {
        id: "distress-tolerance",
        title: "Distress Tolerance Skills Worksheet",
        description: "Develop strategies to cope with overwhelming emotions without making the situation worse",
        difficulty: "Intermediate",
        instructions: [
          "Identify situations that typically trigger emotional distress",
          "For each situation, rate the typical distress level (0-10)",
          "List healthy coping strategies you could use in the moment (e.g., deep breathing, grounding techniques)",
          "Create a personalized distress tolerance plan with specific steps",
          "Practice these skills regularly, even when not in distress",
          "After using these skills during distress, reflect on their effectiveness"
        ],
        example: {
          triggers: [
            "Conflict with partner (Distress level: 8)",
            "Making mistakes at work (Distress level: 7)",
            "Social gatherings with strangers (Distress level: 6)"
          ],
          copingStrategies: [
            "TIPP skills: Temperature change (cold water on face), Intense exercise, Paced breathing, Progressive muscle relaxation",
            "5-4-3-2-1 grounding technique: 5 things I can see, 4 things I can touch, 3 things I can hear, 2 things I can smell, 1 thing I can taste",
            "Brief mindfulness meditation",
            "Temporary distraction with a healthy activity"
          ],
          personalPlan: "When I notice my distress reaching a 6/10: 1) Remove myself from the situation if possible, 2) Take 5 deep breaths, 3) Use the 5-4-3-2-1 grounding technique, 4) Text my support person if needed, 5) Return to the situation when my distress is below 4/10",
          effectiveness: "The grounding technique was very helpful during a work conflict, reducing my distress from 8 to 4. The breathing technique alone wasn't enough during an argument with my partner; adding cold water on my face helped significantly."
        }
      }
    ]
  },
  {
    id: "problem-solving",
    name: "Problem-Solving",
    description: "Structured approaches to addressing life challenges effectively",
    worksheets: [
      {
        id: "problem-solving-steps",
        title: "Problem-Solving Steps Worksheet",
        description: "A systematic approach to tackling problems rather than avoiding them",
        difficulty: "Intermediate",
        instructions: [
          "Clearly define the problem in specific, concrete terms",
          "Brainstorm all possible solutions without judging them",
          "Evaluate the pros and cons of each potential solution",
          "Select the most promising solution or combination of solutions",
          "Create a detailed implementation plan with specific steps",
          "Execute the plan and monitor the results",
          "Evaluate the outcome and adjust as needed"
        ],
        example: {
          problemDefinition: "I'm consistently missing deadlines at work, which is causing stress and affecting my performance reviews.",
          possibleSolutions: [
            "Ask for an extension on all projects",
            "Reduce my workload by speaking with my manager",
            "Improve my time management skills",
            "Create a structured schedule with specific time blocks for each task",
            "Eliminate distractions during work hours",
            "Seek help from colleagues on certain tasks"
          ],
          evaluation: [
            "Asking for extensions: Pros - Immediate relief. Cons - Doesn't solve the underlying issue, may harm reputation.",
            "Reducing workload: Pros - More manageable responsibilities. Cons - May not be possible, could appear incapable.",
            "Improving time management: Pros - Addresses root cause, beneficial skill. Cons - Takes time to develop.",
            "Creating structured schedule: Pros - Concrete action I can take immediately. Cons - Requires discipline to maintain."
          ],
          selectedSolution: "Create a structured schedule with time blocks AND eliminate distractions during work hours",
          implementationPlan: "1) Review upcoming deadlines and break projects into smaller tasks, 2) Allocate specific time blocks for each task in my calendar, 3) Turn off email and phone notifications during focused work periods, 4) Work in 25-minute intervals with 5-minute breaks, 5) Review and adjust the schedule daily",
          outcome: "After two weeks, I completed 80% of tasks on time, compared to 40% previously. The structured schedule helped me realize I was underestimating how long tasks would take. I've adjusted my estimates and am continuing to refine the system."
        }
      }
    ]
  }
];

// Common cognitive distortions
const cognitiveDistortions = [
  {
    name: "All-or-Nothing Thinking",
    description: "Seeing things in black-and-white categories, with no middle ground",
    example: "If I don't get an A on this test, I'm a complete failure.",
    reframe: "Getting a B doesn't make me a failure. It's just one grade, and I can learn from my mistakes."
  },
  {
    name: "Overgeneralization",
    description: "Viewing a single negative event as a never-ending pattern of defeat",
    example: "I got rejected for one job. I'll never find employment.",
    reframe: "This was just one job application. Many qualified people face rejection, and I only need one yes to succeed."
  },
  {
    name: "Mental Filter",
    description: "Focusing exclusively on negative aspects while filtering out all positive aspects",
    example: "My presentation had one awkward moment, so it was a disaster.",
    reframe: "While there was one awkward moment, many parts of my presentation went well, including the Q&A section."
  },
  {
    name: "Discounting the Positive",
    description: "Rejecting positive experiences by insisting they \"don't count\"",
    example: "My boss complimented my work, but she was just being nice.",
    reframe: "My boss is busy and wouldn't take time to give insincere compliments. I should accept that my work was genuinely good."
  },
  {
    name: "Jumping to Conclusions",
    description: "Making negative interpretations despite having little or no evidence",
    example: "My friend didn't text back right away. She must be mad at me.",
    reframe: "There are many reasons why someone might not respond immediately. She could be busy, driving, or her phone might be off."
  },
  {
    name: "Magnification or Minimization",
    description: "Exaggerating the importance of problems or shortcomings, or minimizing positive attributes",
    example: "Making this mistake proves I'm incompetent. My years of successful work don't matter.",
    reframe: "This mistake doesn't erase my track record of success. Everyone makes mistakes occasionally, and they don't define my overall competence."
  },
  {
    name: "Emotional Reasoning",
    description: "Assuming that negative emotions reflect the way things really are",
    example: "I feel inadequate, so I must be inadequate.",
    reframe: "Feelings aren't always facts. I can feel inadequate while still being competent and valuable."
  },
  {
    name: "Should Statements",
    description: "Having rigid rules about how you or others \"should\" behave",
    example: "I should never make mistakes. I should always be productive.",
    reframe: "It's unrealistic to expect perfection. Making mistakes is part of being human, and rest is necessary for wellbeing."
  },
  {
    name: "Labeling",
    description: "Attaching a negative label to yourself or others instead of describing the specific behavior",
    example: "I'm a loser. They're incompetent.",
    reframe: "I made a mistake, but that doesn't define who I am. They struggled with this task, but that doesn't mean they're incompetent in all areas."
  },
  {
    name: "Personalization",
    description: "Seeing yourself as the cause of some negative external event for which you were not primarily responsible",
    example: "The project failed because of me.",
    reframe: "Many factors contributed to the project's outcome, including timeline constraints and resource limitations. I was just one part of a complex situation."
  }
];

export default function CBTWorksheets() {
  // State for active section (for mobile accordion view)
  const [activeSection, setActiveSection] = useState<string | null>("introduction");
  
  // State for expanded worksheet
  const [expandedWorksheet, setExpandedWorksheet] = useState<string | null>(null);
  
  // State for expanded distortion
  const [expandedDistortion, setExpandedDistortion] = useState<string | null>(null);
  
  // Toggle section visibility (for mobile)
  const toggleSection = (sectionId: string) => {
    if (activeSection === sectionId) {
      setActiveSection(null);
    } else {
      setActiveSection(sectionId);
    }
  };
  
  // Safe check for window object to avoid SSR issues
  const isBrowser = typeof window !== 'undefined';
  
  // Toggle worksheet expansion
  const toggleWorksheet = (worksheetId: string) => {
    if (expandedWorksheet === worksheetId) {
      setExpandedWorksheet(null);
    } else {
      setExpandedWorksheet(worksheetId);
    }
  };
  
  // Toggle distortion expansion
  const toggleDistortion = (distortionName: string) => {
    if (expandedDistortion === distortionName) {
      setExpandedDistortion(null);
    } else {
      setExpandedDistortion(distortionName);
    }
  };
  
  // Get the current URL for sharing
  const currentUrl = 'https://therapykin.ai/resources/cbt-worksheets';
  
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
                      CBT Worksheets
                    </span>
                  </div>
                </li>
              </ol>
            </nav>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div id="cbt-worksheets-content" className="lg:w-2/3">
              {/* Resource Header */}
              <div className="mb-8">
                <span className="px-3 py-1 bg-[var(--primary)]/10 text-[var(--primary)] rounded-full text-sm font-medium">
                  CBT Resources
                </span>
                <h1 className="text-3xl md:text-4xl font-bold mt-4 mb-4">Cognitive Behavioral Therapy Worksheets</h1>
                <p className="text-xl text-foreground/70 mb-6">
                  Printable worksheets to help you identify negative thought patterns and develop healthier thinking habits.
                </p>
              </div>
              
              {/* Introduction */}
              <section id="introduction" className="mb-12">
                <h2 className="text-2xl font-bold mb-4">What is Cognitive Behavioral Therapy?</h2>
                <p className="mb-4">
                  Cognitive Behavioral Therapy (CBT) is one of the most effective and widely-used forms of psychotherapy. It focuses on identifying and changing negative thought patterns that can lead to emotional distress and problematic behaviors.
                </p>
                <p className="mb-4">
                  The core principle of CBT is that our thoughts, feelings, and behaviors are interconnected, and that changing our thinking patterns can positively impact our emotions and actions. By learning to recognize and challenge unhelpful thoughts, we can develop more balanced perspectives and healthier coping strategies.
                </p>
                
                <div className="my-8 p-6 bg-[var(--primary)]/5 rounded-xl">
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="w-16 h-16 md:w-20 md:h-20 flex-shrink-0 rounded-full bg-[var(--primary)]/10 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-2">The CBT Model</h4>
                      <p className="text-foreground/80 mb-3">
                        CBT is based on the understanding that our thoughts, feelings, and behaviors are connected in a cycle:
                      </p>
                      <ul className="text-foreground/80 space-y-2">
                        <li>• <strong>Situation:</strong> An event occurs</li>
                        <li>• <strong>Thoughts:</strong> We interpret the event</li>
                        <li>• <strong>Feelings:</strong> Our interpretation leads to emotions</li>
                        <li>• <strong>Behaviors:</strong> Our emotions influence our actions</li>
                        <li>• <strong>Consequences:</strong> Our actions affect future situations</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <p className="mb-4">
                  The worksheets in this resource are designed to help you apply CBT principles to your own life. They provide structured ways to identify, challenge, and change negative thought patterns, ultimately leading to improved emotional wellbeing and more effective behaviors.
                </p>
                
                <div className="card p-6 shadow-depth mb-8">
                  <h3 className="text-xl font-semibold mb-4">How to Use These Worksheets</h3>
                  <ol className="list-decimal pl-5 space-y-2 text-foreground/80">
                    <li>Start with the worksheets labeled "Beginner" if you're new to CBT</li>
                    <li>Read through the instructions and examples before completing a worksheet</li>
                    <li>Be honest with yourself—these worksheets are for your benefit</li>
                    <li>Practice regularly, as CBT skills improve with consistent use</li>
                    <li>Consider working with a therapist who can provide guidance and feedback</li>
                  </ol>
                  <div className="mt-4 p-4 bg-[var(--background-alt)] rounded-lg">
                    <p className="text-sm text-foreground/70">
                      <strong>Note:</strong> While these worksheets can be valuable self-help tools, they are not a substitute for professional mental health treatment. If you're experiencing significant distress, please consult with a qualified healthcare provider.
                    </p>
                  </div>
                </div>
              </section>
              
              {/* Understanding Cognitive Distortions */}
              <section id="cognitive-distortions" className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Understanding Cognitive Distortions</h2>
                
                <p className="mb-6">
                  Cognitive distortions are patterns of thinking that are inaccurate or exaggerated, often reinforcing negative thoughts or emotions. Recognizing these distortions is the first step toward challenging and changing them.
                </p>
                
                <div className="space-y-6">
                  {cognitiveDistortions.map(distortion => (
                    <div key={distortion.name} className="card p-6 shadow-sm hover:shadow-depth transition-all">
                      <button 
                        className="flex justify-between items-center w-full text-left"
                        onClick={() => toggleDistortion(distortion.name)}
                      >
                        <h3 className="text-xl font-semibold">{distortion.name}</h3>
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className={`h-5 w-5 transition-transform ${expandedDistortion === distortion.name ? 'rotate-180' : ''}`} 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      
                      <p className="text-foreground/70 mt-2">{distortion.description}</p>
                      
                      {expandedDistortion === distortion.name && (
                        <div className="mt-4 space-y-4">
                          <div className="p-4 bg-[var(--background-alt)] rounded-lg">
                            <h4 className="font-medium mb-2">Example:</h4>
                            <p className="text-foreground/70 italic">"{distortion.example}"</p>
                          </div>
                          
                          <div className="p-4 bg-[var(--primary)]/5 rounded-lg">
                            <h4 className="font-medium mb-2">Healthier Perspective:</h4>
                            <p className="text-foreground/70 italic">"{distortion.reframe}"</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-[var(--background-alt)] rounded-lg">
                  <p className="text-sm text-foreground/70">
                    <strong>Tip:</strong> Start by simply noticing when these distortions appear in your thinking. Awareness is the first step toward change. Many of the worksheets below will help you challenge these distortions more effectively.
                  </p>
                </div>
              </section>
              
              {/* Worksheet Categories */}
              {cbtWorksheetCategories.map(category => (
                <section id={category.id} key={category.id} className="mb-12">
                  <h2 className="text-2xl font-bold mb-6">{category.name}</h2>
                  <p className="mb-6">{category.description}</p>
                  
                  <div className="space-y-8">
                    {category.worksheets.map(worksheet => (
                      <div key={worksheet.id} className="card p-6 shadow-sm">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-xl font-semibold">{worksheet.title}</h3>
                            <p className="text-foreground/70 mt-1">{worksheet.description}</p>
                          </div>
                          <span className="px-3 py-1 bg-[var(--background-alt)] rounded-full text-xs font-medium">
                            {worksheet.difficulty}
                          </span>
                        </div>
                        
                        <button 
                          className="flex items-center text-[var(--primary)] font-medium hover:underline"
                          onClick={() => toggleWorksheet(worksheet.id)}
                        >
                          {expandedWorksheet === worksheet.id ? 'Hide Details' : 'View Details'}
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className={`h-5 w-5 ml-1 transition-transform ${expandedWorksheet === worksheet.id ? 'rotate-180' : ''}`} 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        
                        {expandedWorksheet === worksheet.id && (
                          <div className="mt-6 space-y-6">
                            <div>
                              <h4 className="font-semibold mb-3">How to Complete This Worksheet:</h4>
                              <ol className="list-decimal pl-5 space-y-1 text-foreground/70">
                                {worksheet.instructions.map((instruction, index) => (
                                  <li key={index}>{instruction}</li>
                                ))}
                              </ol>
                            </div>
                            
                            <div className="p-6 bg-[var(--background-alt)] rounded-lg">
                              <h4 className="font-semibold mb-3">Example:</h4>
                              {worksheet.id === 'basic-thought-record' && (
                                <div className="space-y-3 text-foreground/70">
                                  {hasProperty(worksheet.example, 'situation') && (
                                    <p><strong>Situation:</strong> {String(worksheet.example.situation)}</p>
                                  )}
                                  {hasProperty(worksheet.example, 'automaticThoughts') && (
                                    <p><strong>Automatic Thoughts:</strong> {String(worksheet.example.automaticThoughts)}</p>
                                  )}
                                  {hasProperty(worksheet.example, 'beliefRating') && (
                                    <p><strong>Belief Rating:</strong> {String(worksheet.example.beliefRating)}</p>
                                  )}
                                  {hasProperty(worksheet.example, 'emotions') && (
                                    <p><strong>Emotions:</strong> {String(worksheet.example.emotions)}</p>
                                  )}
                                  {hasProperty(worksheet.example, 'supportingEvidence') && (
                                    <p><strong>Evidence Supporting Thoughts:</strong> {String(worksheet.example.supportingEvidence)}</p>
                                  )}
                                  {hasProperty(worksheet.example, 'contradictingEvidence') && (
                                    <p><strong>Evidence Contradicting Thoughts:</strong> {String(worksheet.example.contradictingEvidence)}</p>
                                  )}
                                  {hasProperty(worksheet.example, 'alternativeThought') && (
                                    <p><strong>Alternative Thought:</strong> {String(worksheet.example.alternativeThought)}</p>
                                  )}
                                  {hasProperty(worksheet.example, 'newBeliefRating') && (
                                    <p><strong>New Belief Rating:</strong> {String(worksheet.example.newBeliefRating)}</p>
                                  )}
                                  {hasProperty(worksheet.example, 'newEmotionRating') && (
                                    <p><strong>New Emotion Ratings:</strong> {String(worksheet.example.newEmotionRating)}</p>
                                  )}
                                </div>
                              )}
                              
                              {worksheet.id === 'cognitive-distortions' && (
                                <div className="space-y-3 text-foreground/70">
                                  {hasProperty(worksheet.example, 'negativeThought') && (
                                    <p><strong>Negative Thought:</strong> {String(worksheet.example.negativeThought)}</p>
                                  )}
                                  {hasProperty(worksheet.example, 'distortions') && (
                                    <div>
                                      <p className="mb-2"><strong>Cognitive Distortions Identified:</strong></p>
                                      <ul className="list-disc pl-5 space-y-1">
                                        {(worksheet.example.distortions as string[]).map((distortion, index) => (
                                          <li key={index}>{distortion}</li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                  {hasProperty(worksheet.example, 'reframedThought') && (
                                    <p><strong>Reframed Thought:</strong> {String(worksheet.example.reframedThought)}</p>
                                  )}
                                </div>
                              )}
                              
                              {worksheet.id === 'evidence-worksheet' && (
                                <div className="space-y-3 text-foreground/70">
                                  {hasProperty(worksheet.example, 'troublingThought') && (
                                    <p><strong>Troubling Thought:</strong> {String(worksheet.example.troublingThought)}</p>
                                  )}
                                  {hasProperty(worksheet.example, 'supportingEvidence') && (
                                    <p><strong>Evidence Supporting This Thought:</strong> {String(worksheet.example.supportingEvidence)}</p>
                                  )}
                                  {hasProperty(worksheet.example, 'contradictingEvidence') && (
                                    <p><strong>Evidence Contradicting This Thought:</strong> {String(worksheet.example.contradictingEvidence)}</p>
                                  )}
                                  {hasProperty(worksheet.example, 'balancedThought') && (
                                    <p><strong>Balanced Thought:</strong> {String(worksheet.example.balancedThought)}</p>
                                  )}
                                  {hasProperty(worksheet.example, 'originalBeliefRating') && (
                                    <p><strong>Original Belief Rating:</strong> {String(worksheet.example.originalBeliefRating)}</p>
                                  )}
                                  {hasProperty(worksheet.example, 'newBeliefRating') && (
                                    <p><strong>New Belief Rating:</strong> {String(worksheet.example.newBeliefRating)}</p>
                                  )}
                                </div>
                              )}
                              
                              {worksheet.id === 'activity-scheduling' && (
                                <div className="space-y-3 text-foreground/70">
                                  {hasProperty(worksheet.example, 'activities') && (
                                    <div>
                                      <p className="mb-2"><strong>Activities (with Pleasure and Mastery Ratings):</strong></p>
                                      <ul className="list-disc pl-5 space-y-1">
                                        {(worksheet.example.activities as string[]).map((activity, index) => (
                                          <li key={index}>{activity}</li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                  {hasProperty(worksheet.example, 'schedule') && (
                                    <p><strong>Weekly Schedule:</strong> {String(worksheet.example.schedule)}</p>
                                  )}
                                  {hasProperty(worksheet.example, 'moodRatings') && (
                                    <p><strong>Mood Ratings:</strong> {String(worksheet.example.moodRatings)}</p>
                                  )}
                                  {hasProperty(worksheet.example, 'reflection') && (
                                    <p><strong>Reflection:</strong> {String(worksheet.example.reflection)}</p>
                                  )}
                                </div>
                              )}
                              
                              {worksheet.id === 'values-activities' && (
                                <div className="space-y-3 text-foreground/70">
                                  {hasProperty(worksheet.example, 'values') && (
                                    <div>
                                      <p className="mb-2"><strong>Core Values and Related Activities:</strong></p>
                                      {(worksheet.example.values as Array<{value: string, consistencyRating: string, activities: string}>).map((value, index) => (
                                        <div key={index} className="mb-3">
                                          <p><strong>{value.value}</strong> (Consistency: {value.consistencyRating})</p>
                                          <p className="pl-4">Activities: {value.activities}</p>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                  {hasProperty(worksheet.example, 'selectedActivities') && (
                                    <p><strong>Selected Activities for the Week:</strong> {String(worksheet.example.selectedActivities)}</p>
                                  )}
                                  {hasProperty(worksheet.example, 'reflection') && (
                                    <p><strong>Reflection:</strong> {String(worksheet.example.reflection)}</p>
                                  )}
                                </div>
                              )}
                              
                              {worksheet.id === 'belief-identification' && (
                                <div className="space-y-3 text-foreground/70">
                                  {hasProperty(worksheet.example, 'recurringThought') && (
                                    <p><strong>Recurring Negative Thought:</strong> {String(worksheet.example.recurringThought)}</p>
                                  )}
                                  {hasProperty(worksheet.example, 'downwardArrow') && (
                                    <div>
                                      <p className="mb-2"><strong>Downward Arrow Technique:</strong></p>
                                      <ul className="list-disc pl-5 space-y-1">
                                        {(worksheet.example.downwardArrow as string[]).map((step, index) => (
                                          <li key={index}>{step}</li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                  {hasProperty(worksheet.example, 'coreBeliefIdentified') && (
                                    <p><strong>Core Belief Identified:</strong> {String(worksheet.example.coreBeliefIdentified)}</p>
                                  )}
                                  {hasProperty(worksheet.example, 'beliefRating') && (
                                    <p><strong>Belief Rating:</strong> {String(worksheet.example.beliefRating)}</p>
                                  )}
                                </div>
                              )}
                              
                              {worksheet.id === 'belief-challenging' && (
                                <div className="space-y-3 text-foreground/70">
                                  {hasProperty(worksheet.example, 'coreBeliefToChallenge') && (
                                    <p><strong>Core Belief to Challenge:</strong> {String(worksheet.example.coreBeliefToChallenge)}</p>
                                  )}
                                  {hasProperty(worksheet.example, 'supportingEvidence') && (
                                    <p><strong>Evidence That Appears to Support This Belief:</strong> {String(worksheet.example.supportingEvidence)}</p>
                                  )}
                                  {hasProperty(worksheet.example, 'criticalExamination') && (
                                    <p><strong>Critical Examination of Evidence:</strong> {String(worksheet.example.criticalExamination)}</p>
                                  )}
                                  {hasProperty(worksheet.example, 'contradictingEvidence') && (
                                    <p><strong>Evidence That Contradicts This Belief:</strong> {String(worksheet.example.contradictingEvidence)}</p>
                                  )}
                                  {hasProperty(worksheet.example, 'newBeliefDeveloped') && (
                                    <p><strong>New, More Balanced Belief:</strong> {String(worksheet.example.newBeliefDeveloped)}</p>
                                  )}
                                  {hasProperty(worksheet.example, 'reinforcementPlan') && (
                                    <p><strong>Plan to Reinforce New Belief:</strong> {String(worksheet.example.reinforcementPlan)}</p>
                                  )}
                                </div>
                              )}
                              
                              {worksheet.id === 'emotion-tracking' && (
                                <div className="space-y-3 text-foreground/70">
                                  {hasProperty(worksheet.example, 'entries') && (
                                    <>
                                      <p className="mb-2"><strong>Sample Emotion Log Entries:</strong></p>
                                      {(worksheet.example.entries as Array<{
                                        time: string;
                                        situation: string;
                                        emotions: string;
                                        physicalSensations: string;
                                        thoughts: string;
                                        response: string;
                                      }>).map((entry, index) => (
                                        <div key={index} className="p-3 bg-[var(--background)] rounded-lg mb-3">
                                          <p><strong>Time:</strong> {entry.time}</p>
                                          <p><strong>Situation:</strong> {entry.situation}</p>
                                          <p><strong>Emotions:</strong> {entry.emotions}</p>
                                          <p><strong>Physical Sensations:</strong> {entry.physicalSensations}</p>
                                          <p><strong>Thoughts:</strong> {entry.thoughts}</p>
                                          <p><strong>Response:</strong> {entry.response}</p>
                                        </div>
                                      ))}
                                    </>
                                  )}
                                  {hasProperty(worksheet.example, 'patterns') && (
                                    <p><strong>Patterns Identified:</strong> {String(worksheet.example.patterns)}</p>
                                  )}
                                </div>
                              )}
                              
                              {worksheet.id === 'distress-tolerance' && (
                                <div className="space-y-3 text-foreground/70">
                                  {hasProperty(worksheet.example, 'triggers') && (
                                    <div>
                                      <p className="mb-2"><strong>Emotional Distress Triggers:</strong></p>
                                      <ul className="list-disc pl-5 space-y-1">
                                        {(worksheet.example.triggers as string[]).map((trigger, index) => (
                                          <li key={index}>{trigger}</li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                  {hasProperty(worksheet.example, 'copingStrategies') && (
                                    <div>
                                      <p className="mb-2"><strong>Coping Strategies:</strong></p>
                                      <ul className="list-disc pl-5 space-y-1">
                                        {(worksheet.example.copingStrategies as string[]).map((strategy, index) => (
                                          <li key={index}>{strategy}</li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                  {hasProperty(worksheet.example, 'personalPlan') && (
                                    <p><strong>Personal Distress Tolerance Plan:</strong> {String(worksheet.example.personalPlan)}</p>
                                  )}
                                  {hasProperty(worksheet.example, 'effectiveness') && (
                                    <p><strong>Effectiveness Reflection:</strong> {String(worksheet.example.effectiveness)}</p>
                                  )}
                                </div>
                              )}
                              
                              {worksheet.id === 'problem-solving-steps' && (
                                <div className="space-y-3 text-foreground/70">
                                  {hasProperty(worksheet.example, 'problemDefinition') && (
                                    <p><strong>Problem Definition:</strong> {String(worksheet.example.problemDefinition)}</p>
                                  )}
                                  {hasProperty(worksheet.example, 'possibleSolutions') && (
                                    <div>
                                      <p className="mb-2"><strong>Possible Solutions:</strong></p>
                                      <ul className="list-disc pl-5 space-y-1">
                                        {(worksheet.example.possibleSolutions as string[]).map((solution, index) => (
                                          <li key={index}>{solution}</li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                  {hasProperty(worksheet.example, 'evaluation') && (
                                    <div>
                                      <p className="mb-2"><strong>Evaluation of Solutions:</strong></p>
                                      <ul className="list-disc pl-5 space-y-1">
                                        {(worksheet.example.evaluation as string[]).map((evalItem, index) => (
                                          <li key={index}>{evalItem}</li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                  {hasProperty(worksheet.example, 'selectedSolution') && (
                                    <p><strong>Selected Solution:</strong> {String(worksheet.example.selectedSolution)}</p>
                                  )}
                                  {hasProperty(worksheet.example, 'implementationPlan') && (
                                    <p><strong>Implementation Plan:</strong> {String(worksheet.example.implementationPlan)}</p>
                                  )}
                                  {hasProperty(worksheet.example, 'outcome') && (
                                    <p><strong>Outcome Evaluation:</strong> {String(worksheet.example.outcome)}</p>
                                  )}
                                </div>
                              )}
                            </div>
                            
                            <div className="flex justify-center">
                              <PDFDownloadButton
                                title={worksheet.title}
                                subtitle="CBT Worksheet"
                                filename={`${worksheet.id.replace(/-/g, '_')}.pdf`}
                                contentId={`${worksheet.id}-content`}
                                className="btn-primary px-6 py-2"
                              />
                            </div>
                            
                            {/* Hidden content for PDF generation */}
                            <div id={`${worksheet.id}-content`} className="hidden">
                              <h1>{worksheet.title}</h1>
                              <p>{worksheet.description}</p>
                              <h2>Instructions:</h2>
                              <ol>
                                {worksheet.instructions.map((instruction, index) => (
                                  <li key={index}>{instruction}</li>
                                ))}
                              </ol>
                              
                              {/* Worksheet template would go here - simplified for this example */}
                              <h2>Worksheet Template</h2>
                              {worksheet.id === 'basic-thought-record' && (
                                <div>
                                  <p><strong>Situation:</strong> _______________________________________________</p>
                                  <p><strong>Automatic Thoughts:</strong> _______________________________________________</p>
                                  <p><strong>Belief Rating (0-100%):</strong> _______________________________________________</p>
                                  <p><strong>Emotions and Intensity (0-100%):</strong> _______________________________________________</p>
                                  <p><strong>Evidence Supporting Thoughts:</strong> _______________________________________________</p>
                                  <p><strong>Evidence Contradicting Thoughts:</strong> _______________________________________________</p>
                                  <p><strong>Alternative Thought:</strong> _______________________________________________</p>
                                  <p><strong>New Belief Rating (0-100%):</strong> _______________________________________________</p>
                                  <p><strong>New Emotion Ratings (0-100%):</strong> _______________________________________________</p>
                                </div>
                              )}
                              
                              {/* Similar templates for other worksheet types would go here */}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              ))}
              
              {/* Tips for Effective CBT Practice */}
              <section id="tips" className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Tips for Effective CBT Practice</h2>
                
                <div className="space-y-6">
                  <div className="card p-5 shadow-sm hover:shadow-md transition-all">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium mb-2">Be Consistent</h3>
                        <p className="text-foreground/70">
                          CBT skills improve with regular practice. Try to work on these exercises consistently, even if it's just for a few minutes each day.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="card p-5 shadow-sm hover:shadow-md transition-all">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium mb-2">Practice Self-Compassion</h3>
                        <p className="text-foreground/70">
                          Be kind to yourself as you work through these exercises. Changing thought patterns takes time, and setbacks are a normal part of the process.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="card p-5 shadow-sm hover:shadow-md transition-all">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium mb-2">Start with Real Examples</h3>
                        <p className="text-foreground/70">
                          Use actual situations from your life rather than hypothetical scenarios. Working with real examples makes the exercises more relevant and effective.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="card p-5 shadow-sm hover:shadow-md transition-all">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium mb-2">Work in the Moment</h3>
                        <p className="text-foreground/70">
                          Try to complete these worksheets when emotions are active but not overwhelming. This helps you capture thoughts more accurately and practice skills when they're most relevant.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="card p-5 shadow-sm hover:shadow-md transition-all">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium mb-2">Track Your Progress</h3>
                        <p className="text-foreground/70">
                          Keep your completed worksheets and review them periodically. This helps you identify patterns and see your progress over time.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="card p-5 shadow-sm hover:shadow-md transition-all">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium mb-2">Consider Professional Guidance</h3>
                        <p className="text-foreground/70">
                          While these worksheets can be used independently, working with a therapist trained in CBT can provide valuable feedback and personalized guidance.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              
              {/* When to Seek Professional Help */}
              <section id="professional-help" className="mb-12">
                <h2 className="text-2xl font-bold mb-6">When to Seek Professional Help</h2>
                
                <p className="mb-6">
                  While CBT worksheets can be valuable self-help tools, there are times when professional support is necessary. Consider seeking help from a mental health professional if:
                </p>
                
                <div className="card p-6 bg-[var(--primary)]/5 mb-8">
                  <ul className="list-disc pl-5 space-y-3">
                    <li>Your symptoms are significantly interfering with your daily functioning, relationships, or work</li>
                    <li>You're experiencing persistent feelings of sadness, anxiety, or hopelessness</li>
                    <li>You're having thoughts of harming yourself or others</li>
                    <li>You're using substances to cope with difficult emotions</li>
                    <li>You've tried self-help strategies but aren't seeing improvement</li>
                    <li>You feel overwhelmed by the process of challenging your thoughts</li>
                    <li>You have a history of trauma or complex mental health conditions</li>
                  </ul>
                </div>
                
                <div className="card p-6 shadow-depth">
                  <h3 className="text-xl font-semibold mb-4">Finding a CBT Therapist</h3>
                  <p className="mb-4 text-foreground/70">
                    If you decide to work with a therapist, here are some resources to help you find someone trained in CBT:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-foreground/70">
                    <li>Ask your primary care physician for a referral</li>
                    <li>Contact your health insurance company for a list of in-network providers</li>
                    <li>Visit the <a href="https://www.psychologytoday.com/us/therapists" target="_blank" rel="noopener noreferrer" className="text-[var(--primary)] hover:underline">Psychology Today Therapist Directory</a></li>
                    <li>Check the <a href="https://www.abct.org/find-a-therapist/" target="_blank" rel="noopener noreferrer" className="text-[var(--primary)] hover:underline">Association for Behavioral and Cognitive Therapies</a> website</li>
                    <li>Consider online therapy platforms like BetterHelp or Talkspace, which can match you with licensed therapists</li>
                  </ul>
                </div>
              </section>
              
              {/* Conclusion */}
              <section id="conclusion" className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Conclusion</h2>
                <p className="mb-4">
                  Cognitive Behavioral Therapy offers powerful tools for changing negative thought patterns and improving emotional wellbeing. The worksheets provided in this resource can help you begin applying CBT principles to your own life, identifying cognitive distortions, challenging unhelpful thoughts, and developing healthier thinking habits.
                </p>
                <p className="mb-4">
                  Remember that changing thought patterns takes time and practice. Be patient with yourself as you work through these exercises, and celebrate your progress along the way. Even small shifts in your thinking can lead to significant improvements in how you feel and function.
                </p>
                <p>
                  Whether you're using these worksheets on your own or as a complement to therapy, they provide a structured approach to developing greater awareness of your thoughts and their impact on your emotions and behaviors. With consistent practice, you can build the skills needed to respond to life's challenges with greater resilience and emotional balance.
                </p>
              </section>
              
              {/* Share Links */}
              <div className="mb-12">
                <h3 className="font-semibold mb-4">Share this resource</h3>
                <ShareButtons 
                  title="Cognitive Behavioral Therapy Worksheets" 
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
                    What is CBT?
                  </a>
                  <a 
                    href="#cognitive-distortions" 
                    className="block text-foreground/70 hover:text-[var(--primary)] py-1 border-l-2 border-transparent hover:border-[var(--primary)] pl-3 transition-all"
                  >
                    Cognitive Distortions
                  </a>
                  {cbtWorksheetCategories.map(category => (
                    <a 
                      key={category.id}
                      href={`#${category.id}`} 
                      className="block text-foreground/70 hover:text-[var(--primary)] py-1 border-l-2 border-transparent hover:border-[var(--primary)] pl-3 transition-all"
                    >
                      {category.name}
                    </a>
                  ))}
                  <a 
                    href="#tips" 
                    className="block text-foreground/70 hover:text-[var(--primary)] py-1 border-l-2 border-transparent hover:border-[var(--primary)] pl-3 transition-all"
                  >
                    Tips for Practice
                  </a>
                  <a 
                    href="#professional-help" 
                    className="block text-foreground/70 hover:text-[var(--primary)] py-1 border-l-2 border-transparent hover:border-[var(--primary)] pl-3 transition-all"
                  >
                    When to Seek Help
                  </a>
                  <a 
                    href="#conclusion" 
                    className="block text-foreground/70 hover:text-[var(--primary)] py-1 border-l-2 border-transparent hover:border-[var(--primary)] pl-3 transition-all"
                  >
                    Conclusion
                  </a>
                </nav>
              </div>
              
              {/* Download All Worksheets */}
              <div className="card p-6 mb-6 bg-[var(--primary)]/5">
                <div className="flex items-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[var(--primary)] mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <h3 className="text-lg font-semibold">Download All Worksheets</h3>
                </div>
                <p className="text-sm text-foreground/70 mb-4">
                  Get a complete PDF package of all CBT worksheets to use offline or print for regular practice.
                </p>
                <PDFDownloadButton
                  title="CBT Worksheets Complete Package"
                  subtitle="TherapyKin Resource"
                  filename="TherapyKin-CBT-Worksheets-Package.pdf"
                  contentId="cbt-worksheets-content"
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
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Anxiety Guide</h4>
                      <p className="text-sm text-foreground/70 mb-2">Understanding anxiety disorders and evidence-based treatments</p>
                      <Link href="/resources/anxiety-guide" className="text-xs text-[var(--primary)] font-medium hover:underline">
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
                      <h4 className="font-medium mb-1">Depression Guide</h4>
                      <p className="text-sm text-foreground/70 mb-2">Comprehensive overview of depression symptoms and treatments</p>
                      <Link href="/resources/depression-guide" className="text-xs text-[var(--primary)] font-medium hover:underline">
                        View Resource →
                      </Link>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-[var(--primary)]/10 rounded flex items-center justify-center mr-3 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 010-7.072m12.728 0l-3.536 3.536M6.414 8.464l3.536 3.536" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Mindfulness Guide</h4>
                      <p className="text-sm text-foreground/70 mb-2">Step-by-step introduction to mindfulness meditation</p>
                      <Link href="/resources/mindfulness-guide" className="text-xs text-[var(--primary)] font-medium hover:underline">
                        View Resource →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* CBT Facts */}
              <div className="card p-6">
                <h3 className="text-lg font-semibold mb-4">CBT Quick Facts</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sm text-foreground/70">CBT is one of the most researched forms of psychotherapy, with strong evidence supporting its effectiveness</p>
                  </div>
                  
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sm text-foreground/70">CBT typically involves 12-20 sessions, making it a relatively short-term therapeutic approach</p>
                  </div>
                  
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sm text-foreground/70">Research shows CBT can be as effective as medication for treating certain conditions, including depression and anxiety</p>
                  </div>
                  
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sm text-foreground/70">CBT skills can help prevent relapse, with benefits often maintained long after therapy ends</p>
                  </div>
                  
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sm text-foreground/70">CBT has been adapted for various conditions, including depression, anxiety, PTSD, OCD, insomnia, and chronic pain</p>
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
