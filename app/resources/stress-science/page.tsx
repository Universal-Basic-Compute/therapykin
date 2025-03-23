'use client';

import React, { useState } from "react";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ShareButtons from "../../components/ShareButtons";
import PDFDownloadButton from "../../components/PDFDownloadButton";

// Stress symptoms checklist
const stressSymptoms = [
  { id: "irritability", text: "Feeling irritable, angry, or impatient" },
  { id: "overwhelmed", text: "Feeling overwhelmed or unable to cope" },
  { id: "anxious", text: "Feeling anxious, nervous, or afraid" },
  { id: "racing", text: "Racing thoughts or constant worry" },
  { id: "concentration", text: "Difficulty concentrating or making decisions" },
  { id: "tired", text: "Feeling tired, low energy, or exhausted" },
  { id: "sleep", text: "Trouble sleeping or changes in sleep patterns" },
  { id: "appetite", text: "Changes in appetite (eating more or less than usual)" },
  { id: "aches", text: "Headaches, muscle tension, or other physical pain" },
  { id: "heart", text: "Rapid heartbeat or chest tightness" },
  { id: "stomach", text: "Digestive issues (stomachaches, nausea, diarrhea)" },
  { id: "immune", text: "Getting sick more often than usual" },
  { id: "avoiding", text: "Avoiding people or responsibilities" },
  { id: "nervous", text: "Nervous habits (nail biting, pacing, fidgeting)" },
  { id: "substances", text: "Increased use of alcohol, tobacco, or other substances" }
];

// Stress management techniques
const managementTechniques = [
  {
    id: "breathing",
    name: "Breathing Techniques",
    description: "Simple breathing exercises that can quickly reduce stress and promote relaxation.",
    techniques: [
      { 
        name: "Box Breathing", 
        steps: [
          "Inhale slowly through your nose for 4 seconds",
          "Hold your breath for 4 seconds",
          "Exhale slowly through your mouth for 4 seconds",
          "Hold your breath for 4 seconds",
          "Repeat for 5-10 cycles"
        ]
      },
      { 
        name: "4-7-8 Breathing", 
        steps: [
          "Inhale quietly through your nose for 4 seconds",
          "Hold your breath for 7 seconds",
          "Exhale completely through your mouth for 8 seconds",
          "Repeat 3-4 times"
        ]
      },
      { 
        name: "Diaphragmatic Breathing", 
        steps: [
          "Place one hand on your chest and the other on your abdomen",
          "Breathe in slowly through your nose, feeling your abdomen expand",
          "Exhale slowly through pursed lips, feeling your abdomen contract",
          "Focus on using your diaphragm, not your chest, to breathe",
          "Practice for 5-10 minutes"
        ]
      }
    ]
  },
  {
    id: "mindfulness",
    name: "Mindfulness and Meditation",
    description: "Practices that help you stay present and develop awareness of thoughts and feelings without judgment.",
    techniques: [
      { 
        name: "Basic Mindfulness Meditation", 
        steps: [
          "Find a quiet, comfortable place to sit",
          "Focus your attention on your breath",
          "When your mind wanders (which is normal), gently bring your attention back to your breath",
          "Start with 5 minutes and gradually increase your time",
          "Practice regularly for best results"
        ]
      },
      { 
        name: "Body Scan Meditation", 
        steps: [
          "Lie down or sit comfortably",
          "Bring awareness to each part of your body, starting from your toes and moving up to your head",
          "Notice any sensations without trying to change them",
          "If you notice tension, breathe into that area and imagine it relaxing",
          "Practice for 10-20 minutes"
        ]
      },
      { 
        name: "Mindful Walking", 
        steps: [
          "Walk slowly and deliberately",
          "Pay attention to the sensation of each step",
          "Notice the feeling of your feet touching the ground",
          "When your mind wanders, bring your attention back to the walking",
          "Practice for 10-15 minutes"
        ]
      }
    ]
  },
  {
    id: "physical",
    name: "Physical Activity",
    description: "Regular exercise is one of the most effective ways to reduce stress and improve mood.",
    techniques: [
      { 
        name: "Aerobic Exercise", 
        steps: [
          "Engage in activities like walking, jogging, swimming, or cycling",
          "Aim for at least 30 minutes of moderate activity most days",
          "Find activities you enjoy to increase consistency",
          "Start slowly if you're new to exercise",
          "Focus on the process rather than performance"
        ]
      },
      { 
        name: "Yoga", 
        steps: [
          "Practice gentle yoga poses that promote relaxation",
          "Focus on coordinating movement with breath",
          "Consider joining a class or following online videos",
          "Even 10-15 minutes can be beneficial",
          "Incorporate relaxation poses like Child's Pose or Legs Up The Wall"
        ]
      },
      { 
        name: "Progressive Muscle Relaxation", 
        steps: [
          "Tense each muscle group for 5-10 seconds",
          "Release the tension and notice the feeling of relaxation",
          "Work through major muscle groups from feet to head",
          "Practice in a comfortable position",
          "Repeat daily for best results"
        ]
      }
    ]
  },
  {
    id: "cognitive",
    name: "Cognitive Strategies",
    description: "Techniques that help you identify and change stress-inducing thought patterns.",
    techniques: [
      { 
        name: "Thought Challenging", 
        steps: [
          "Identify stressful thoughts",
          "Question the evidence for these thoughts",
          "Consider alternative perspectives",
          "Develop more balanced thoughts",
          "Practice regularly with a journal"
        ]
      },
      { 
        name: "Worry Time", 
        steps: [
          "Schedule a specific 15-30 minute period each day for worrying",
          "When worries arise outside this time, note them down",
          "During your designated worry time, review and address these concerns",
          "After worry time is over, return to your regular activities",
          "This helps contain worry rather than letting it dominate your day"
        ]
      },
      { 
        name: "Positive Reframing", 
        steps: [
          "Identify a stressful situation",
          "Look for potential benefits or opportunities for growth",
          "Consider what you might learn from the experience",
          "Think about how this might make you stronger",
          "Focus on aspects you can control rather than those you cannot"
        ]
      }
    ]
  },
  {
    id: "lifestyle",
    name: "Lifestyle Adjustments",
    description: "Changes to daily habits that can significantly reduce overall stress levels.",
    techniques: [
      { 
        name: "Sleep Hygiene", 
        steps: [
          "Maintain a consistent sleep schedule",
          "Create a relaxing bedtime routine",
          "Make your bedroom comfortable, dark, and quiet",
          "Limit screen time before bed",
          "Avoid caffeine and alcohol close to bedtime"
        ]
      },
      { 
        name: "Nutrition for Stress Management", 
        steps: [
          "Eat regular, balanced meals",
          "Limit caffeine, alcohol, and sugar",
          "Stay hydrated throughout the day",
          "Include foods rich in B vitamins, magnesium, and omega-3 fatty acids",
          "Avoid using food as a coping mechanism for stress"
        ]
      },
      { 
        name: "Time Management", 
        steps: [
          "Prioritize tasks based on importance and urgency",
          "Break large projects into smaller, manageable steps",
          "Learn to delegate when possible",
          "Schedule regular breaks throughout the day",
          "Set realistic goals and expectations"
        ]
      }
    ]
  },
  {
    id: "social",
    name: "Social Connection",
    description: "Maintaining supportive relationships is crucial for stress resilience.",
    techniques: [
      { 
        name: "Building Support Networks", 
        steps: [
          "Identify supportive people in your life",
          "Schedule regular time to connect with friends and family",
          "Join groups or communities with shared interests",
          "Practice being vulnerable and asking for help when needed",
          "Reciprocate support for others"
        ]
      },
      { 
        name: "Effective Communication", 
        steps: [
          "Express your needs and feelings clearly",
          "Practice active listening",
          "Use 'I' statements rather than accusatory language",
          "Set and respect boundaries",
          "Address conflicts directly but respectfully"
        ]
      },
      { 
        name: "Helping Others", 
        steps: [
          "Volunteer for causes you care about",
          "Offer practical support to friends or neighbors",
          "Share your knowledge or skills with others",
          "Practice random acts of kindness",
          "Focus on how you can contribute to your community"
        ]
      }
    ]
  }
];

export default function StressScience() {
  // State for active section (for mobile accordion view)
  const [activeSection, setActiveSection] = useState<string | null>("introduction");
  
  // State for symptom checklist
  const [checkedSymptoms, setCheckedSymptoms] = useState<Record<string, boolean>>({});
  
  // State for expanded technique
  const [expandedTechnique, setExpandedTechnique] = useState<string | null>(null);
  
  // Toggle section visibility (for mobile)
  const toggleSection = (sectionId: string) => {
    if (activeSection === sectionId) {
      setActiveSection(null);
    } else {
      setActiveSection(sectionId);
    }
  };
  
  // Handle symptom checkbox change
  const handleSymptomCheck = (symptomId: string) => {
    setCheckedSymptoms({
      ...checkedSymptoms,
      [symptomId]: !checkedSymptoms[symptomId]
    });
  };
  
  // Toggle technique expansion
  const toggleTechnique = (techniqueId: string) => {
    if (expandedTechnique === techniqueId) {
      setExpandedTechnique(null);
    } else {
      setExpandedTechnique(techniqueId);
    }
  };
  
  // Count checked symptoms
  const checkedSymptomsCount = Object.values(checkedSymptoms).filter(Boolean).length;
  
  // Get the current URL for sharing
  const currentUrl = typeof window !== 'undefined' 
    ? window.location.href 
    : 'https://therapykin.ai/resources/stress-science';
  
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
                      The Science of Stress
                    </span>
                  </div>
                </li>
              </ol>
            </nav>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div id="stress-science-content" className="lg:w-2/3">
              {/* Resource Header */}
              <div className="mb-8">
                <span className="px-3 py-1 bg-[var(--primary)]/10 text-[var(--primary)] rounded-full text-sm font-medium">
                  Stress Management
                </span>
                <h1 className="text-3xl md:text-4xl font-bold mt-4 mb-4">The Science of Stress and How to Manage It</h1>
                <p className="text-xl text-foreground/70 mb-6">
                  An in-depth look at how stress affects your body and mind, with practical strategies for stress reduction.
                </p>
              </div>
              
              {/* Featured Image */}
              <div className="mb-8 rounded-xl overflow-hidden">
                <div className="aspect-w-16 aspect-h-9 bg-[var(--primary)]/10">
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-[var(--primary)]/20 to-[var(--accent)]/20">
                    <span className="text-[var(--primary)] font-medium">Stress Science Image</span>
                  </div>
                </div>
              </div>
              
              {/* Introduction */}
              <section id="introduction" className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Understanding Stress: Friend and Foe</h2>
                <p className="mb-4">
                  Stress is your body's natural response to challenges or demands. It's a normal part of life that can be both positive and negative. In small doses, stress can be beneficial—helping you stay alert, motivated, and ready to avoid danger. However, when stress becomes chronic or overwhelming, it can take a serious toll on your physical and mental health.
                </p>
                <p className="mb-4">
                  This guide explores the science behind stress, its effects on your body and mind, and evidence-based strategies to manage it effectively. Whether you're dealing with everyday pressures or significant life challenges, understanding stress and developing healthy coping mechanisms can help you build resilience and improve your overall wellbeing.
                </p>
                
                <div className="my-8 p-6 bg-[var(--primary)]/5 rounded-xl">
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="w-16 h-16 md:w-20 md:h-20 flex-shrink-0 rounded-full bg-[var(--primary)]/10 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-2">Stress By The Numbers</h4>
                      <ul className="text-foreground/80 space-y-2">
                        <li>• 77% of people regularly experience physical symptoms caused by stress</li>
                        <li>• 73% regularly experience psychological symptoms from stress</li>
                        <li>• 33% report living with extreme stress</li>
                        <li>• Work, money, and health concerns are the top reported sources of stress</li>
                        <li>• Chronic stress is linked to the six leading causes of death</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>
              
              {/* The Science of Stress */}
              <section id="science" className="mb-12">
                <h2 className="text-2xl font-bold mb-6">The Science of Stress: What Happens in Your Body</h2>
                
                <p className="mb-6">
                  When you encounter a stressor—whether it's a physical threat or a psychological challenge—your body activates a complex stress response system. Understanding this process can help you recognize and manage your stress reactions more effectively.
                </p>
                
                <div className="card p-6 shadow-depth mb-8">
                  <h3 className="text-xl font-semibold mb-4">The Stress Response: Fight, Flight, or Freeze</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3 mt-0.5">
                        <span className="font-semibold">1</span>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Alarm Phase</h4>
                        <p className="text-foreground/70">
                          When your brain perceives a threat, it signals your adrenal glands to release stress hormones, primarily adrenaline and cortisol. These hormones prepare your body for immediate action by:
                        </p>
                        <ul className="list-disc pl-5 mt-2 space-y-1 text-foreground/70">
                          <li>Increasing heart rate and blood pressure</li>
                          <li>Accelerating breathing to take in more oxygen</li>
                          <li>Releasing glucose and fatty acids for energy</li>
                          <li>Sharpening senses and alertness</li>
                          <li>Diverting blood from digestive system to muscles</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3 mt-0.5">
                        <span className="font-semibold">2</span>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Resistance Phase</h4>
                        <p className="text-foreground/70">
                          If the stressor persists, your body attempts to adapt while remaining on high alert. During this phase:
                        </p>
                        <ul className="list-disc pl-5 mt-2 space-y-1 text-foreground/70">
                          <li>Cortisol levels remain elevated</li>
                          <li>Blood pressure stays high</li>
                          <li>Blood sugar regulation may be impaired</li>
                          <li>Immune function may be suppressed</li>
                          <li>Energy is diverted from non-essential functions</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3 mt-0.5">
                        <span className="font-semibold">3</span>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Exhaustion Phase</h4>
                        <p className="text-foreground/70">
                          When stress continues for an extended period, your body's resources become depleted, leading to:
                        </p>
                        <ul className="list-disc pl-5 mt-2 space-y-1 text-foreground/70">
                          <li>Fatigue and energy depletion</li>
                          <li>Weakened immune system</li>
                          <li>Hormonal imbalances</li>
                          <li>Increased vulnerability to illness</li>
                          <li>Mental and physical breakdown</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="card p-6 mb-8">
                  <h3 className="text-xl font-semibold mb-4">Key Stress Hormones and Their Effects</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-4 bg-[var(--background-alt)] rounded-lg">
                      <h4 className="font-medium mb-2">Adrenaline (Epinephrine)</h4>
                      <ul className="list-disc pl-5 space-y-1 text-foreground/70">
                        <li>Triggers the immediate "fight or flight" response</li>
                        <li>Increases heart rate and blood pressure</li>
                        <li>Expands airways for better oxygen intake</li>
                        <li>Sharpens senses and mental focus</li>
                        <li>Provides a quick burst of energy</li>
                      </ul>
                    </div>
                    
                    <div className="p-4 bg-[var(--background-alt)] rounded-lg">
                      <h4 className="font-medium mb-2">Cortisol</h4>
                      <ul className="list-disc pl-5 space-y-1 text-foreground/70">
                        <li>Sustains the stress response over time</li>
                        <li>Regulates blood pressure and inflammation</li>
                        <li>Controls blood sugar levels</li>
                        <li>Affects sleep-wake cycles</li>
                        <li>Suppresses non-essential functions during stress</li>
                      </ul>
                    </div>
                    
                    <div className="p-4 bg-[var(--background-alt)] rounded-lg">
                      <h4 className="font-medium mb-2">Norepinephrine</h4>
                      <ul className="list-disc pl-5 space-y-1 text-foreground/70">
                        <li>Works with adrenaline to prepare for action</li>
                        <li>Increases alertness and focus</li>
                        <li>Redirects blood to muscles and vital organs</li>
                        <li>Helps maintain blood pressure</li>
                        <li>Affects mood and attention</li>
                      </ul>
                    </div>
                    
                    <div className="p-4 bg-[var(--background-alt)] rounded-lg">
                      <h4 className="font-medium mb-2">Dopamine and Serotonin</h4>
                      <ul className="list-disc pl-5 space-y-1 text-foreground/70">
                        <li>Neurotransmitters affected by chronic stress</li>
                        <li>Regulate mood, motivation, and pleasure</li>
                        <li>Influence sleep and appetite</li>
                        <li>Help with emotional regulation</li>
                        <li>Can become depleted during prolonged stress</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="card p-6 bg-[var(--primary)]/5 rounded-xl">
                  <h3 className="text-xl font-semibold mb-4">The Brain-Body Connection</h3>
                  <p className="mb-4">
                    Stress affects multiple systems in your body through complex interactions between your brain, nervous system, and endocrine (hormone) system:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-foreground/80">
                    <li>
                      <strong>Hypothalamic-Pituitary-Adrenal (HPA) Axis:</strong> The control center for stress responses, regulating hormone release
                    </li>
                    <li>
                      <strong>Autonomic Nervous System:</strong> Controls involuntary functions like heart rate, digestion, and breathing
                    </li>
                    <li>
                      <strong>Immune System:</strong> Affected by stress hormones, which can suppress immune function during prolonged stress
                    </li>
                    <li>
                      <strong>Digestive System:</strong> Highly sensitive to stress, leading to various gastrointestinal symptoms
                    </li>
                    <li>
                      <strong>Cardiovascular System:</strong> Responds to stress hormones with increased heart rate and blood pressure
                    </li>
                  </ul>
                </div>
              </section>
              
              {/* Types of Stress */}
              <section id="types" className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Types of Stress: Not All Stress Is Created Equal</h2>
                
                <p className="mb-6">
                  Understanding the different types of stress can help you recognize what you're experiencing and choose appropriate management strategies.
                </p>
                
                <div className="space-y-6">
                  <div className="card p-6 hover:shadow-depth transition-all">
                    <h3 className="text-xl font-semibold mb-3">Acute Stress</h3>
                    <p className="mb-4">
                      Short-term stress that comes and goes quickly. This is the most common form of stress and can be beneficial in small doses.
                    </p>
                    <div className="bg-[var(--background-alt)] p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Characteristics:</h4>
                      <ul className="list-disc pl-5 space-y-1 text-foreground/70">
                        <li>Temporary response to immediate challenges</li>
                        <li>Can improve performance and focus</li>
                        <li>Typically resolves once the stressor passes</li>
                        <li>Examples: public speaking, meeting a deadline, athletic competition</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="card p-6 hover:shadow-depth transition-all">
                    <h3 className="text-xl font-semibold mb-3">Episodic Acute Stress</h3>
                    <p className="mb-4">
                      Frequent occurrences of acute stress, often due to ongoing pressures or a chaotic lifestyle.
                    </p>
                    <div className="bg-[var(--background-alt)] p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Characteristics:</h4>
                      <ul className="list-disc pl-5 space-y-1 text-foreground/70">
                        <li>Repeated episodes of acute stress</li>
                        <li>Often experienced by people who take on too many responsibilities</li>
                        <li>Can lead to persistent physical symptoms</li>
                        <li>Examples: constant work deadlines, ongoing financial worries</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="card p-6 hover:shadow-depth transition-all">
                    <h3 className="text-xl font-semibold mb-3">Chronic Stress</h3>
                    <p className="mb-4">
                      Long-term stress that persists over an extended period and can have serious health consequences.
                    </p>
                    <div className="bg-[var(--background-alt)] p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Characteristics:</h4>
                      <ul className="list-disc pl-5 space-y-1 text-foreground/70">
                        <li>Ongoing stress that doesn't resolve</li>
                        <li>Often feels inescapable or beyond your control</li>
                        <li>Can significantly impact physical and mental health</li>
                        <li>Examples: toxic relationships, chronic illness, poverty, discrimination</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="card p-6 hover:shadow-depth transition-all">
                    <h3 className="text-xl font-semibold mb-3">Eustress (Positive Stress)</h3>
                    <p className="mb-4">
                      Beneficial stress that motivates and focuses energy, enhancing performance and meaning.
                    </p>
                    <div className="bg-[var(--background-alt)] p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Characteristics:</h4>
                      <ul className="list-disc pl-5 space-y-1 text-foreground/70">
                        <li>Feels exciting and energizing rather than threatening</li>
                        <li>Associated with positive events or challenges</li>
                        <li>Improves focus, performance, and growth</li>
                        <li>Examples: starting a new job, getting married, learning a new skill</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="card p-6 hover:shadow-depth transition-all">
                    <h3 className="text-xl font-semibold mb-3">Traumatic Stress</h3>
                    <p className="mb-4">
                      Stress resulting from experiencing or witnessing traumatic events that overwhelm one's ability to cope.
                    </p>
                    <div className="bg-[var(--background-alt)] p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Characteristics:</h4>
                      <ul className="list-disc pl-5 space-y-1 text-foreground/70">
                        <li>Results from exposure to actual or threatened death, serious injury, or violence</li>
                        <li>Can lead to post-traumatic stress disorder (PTSD) in some cases</li>
                        <li>May cause lasting changes in stress response systems</li>
                        <li>Examples: natural disasters, accidents, assault, combat experiences</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>
              
              {/* Effects of Stress */}
              <section id="effects" className="mb-12">
                <h2 className="text-2xl font-bold mb-6">How Stress Affects Your Health</h2>
                
                <p className="mb-6">
                  While short-term stress is a normal part of life, chronic stress can have wide-ranging effects on your physical and mental health. Understanding these impacts can motivate you to prioritize stress management.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="card p-6">
                    <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mb-4 text-[var(--primary)]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Cardiovascular System</h3>
                    <ul className="list-disc pl-5 space-y-2 text-foreground/70">
                      <li>Increased risk of high blood pressure</li>
                      <li>Higher risk of heart attack and stroke</li>
                      <li>Irregular heart rhythms</li>
                      <li>Increased cholesterol and triglycerides</li>
                      <li>Inflammation of blood vessels and heart</li>
                    </ul>
                  </div>
                  
                  <div className="card p-6">
                    <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mb-4 text-[var(--primary)]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Immune System</h3>
                    <ul className="list-disc pl-5 space-y-2 text-foreground/70">
                      <li>Suppressed immune function</li>
                      <li>Increased susceptibility to infections</li>
                      <li>Slower wound healing</li>
                      <li>Exacerbation of autoimmune conditions</li>
                      <li>Chronic inflammation throughout the body</li>
                    </ul>
                  </div>
                  
                  <div className="card p-6">
                    <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mb-4 text-[var(--primary)]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Digestive System</h3>
                    <ul className="list-disc pl-5 space-y-2 text-foreground/70">
                      <li>Stomach pain, nausea, and indigestion</li>
                      <li>Changes in appetite (increased or decreased)</li>
                      <li>Irritable bowel syndrome (IBS) symptoms</li>
                      <li>Acid reflux and ulcers</li>
                      <li>Changes in gut microbiome</li>
                    </ul>
                  </div>
                  
                  <div className="card p-6">
                    <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mb-4 text-[var(--primary)]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Endocrine System</h3>
                    <ul className="list-disc pl-5 space-y-2 text-foreground/70">
                      <li>Blood sugar dysregulation</li>
                      <li>Increased risk of diabetes</li>
                      <li>Thyroid function changes</li>
                      <li>Reproductive hormone imbalances</li>
                      <li>Weight gain, especially around the abdomen</li>
                    </ul>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="card p-6">
                    <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mb-4 text-[var(--primary)]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Brain and Mental Health</h3>
                    <ul className="list-disc pl-5 space-y-2 text-foreground/70">
                      <li>Increased risk of anxiety and depression</li>
                      <li>Memory and concentration problems</li>
                      <li>Changes in brain structure and function</li>
                      <li>Sleep disturbances</li>
                      <li>Increased risk of cognitive decline</li>
                    </ul>
                  </div>
                  
                  <div className="card p-6">
                    <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mb-4 text-[var(--primary)]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Behavioral Effects</h3>
                    <ul className="list-disc pl-5 space-y-2 text-foreground/70">
                      <li>Increased use of alcohol, tobacco, or drugs</li>
                      <li>Changes in eating patterns (overeating or undereating)</li>
                      <li>Social withdrawal</li>
                      <li>Decreased physical activity</li>
                      <li>Procrastination and avoidance behaviors</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-8 p-6 bg-[var(--primary)]/5 rounded-xl">
                  <h3 className="text-xl font-semibold mb-4">The Stress-Health Connection</h3>
                  <p className="mb-4">
                    Research has established clear links between chronic stress and many health conditions, including:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <span className="text-foreground/80">Heart disease</span>
                    </div>
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <span className="text-foreground/80">Hypertension</span>
                    </div>
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <span className="text-foreground/80">Diabetes</span>
                    </div>
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <span className="text-foreground/80">Obesity</span>
                    </div>
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <span className="text-foreground/80">Depression</span>
                    </div>
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <span className="text-foreground/80">Anxiety disorders</span>
                    </div>
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <span className="text-foreground/80">Autoimmune disorders</span>
                    </div>
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <span className="text-foreground/80">Digestive disorders</span>
                    </div>
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <span className="text-foreground/80">Sleep disorders</span>
                    </div>
                  </div>
                </div>
              </section>
              
              {/* Stress Assessment */}
              <section id="assessment" className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Recognizing Your Stress: A Self-Assessment</h2>
                
                <p className="mb-6">
                  Awareness is the first step in managing stress effectively. This assessment can help you identify your stress symptoms and gauge their impact on your life.
                </p>
                
                <div className="card p-6 shadow-depth mb-8">
                  <h3 className="text-xl font-semibold mb-4">Stress Symptom Checklist</h3>
                  <p className="text-foreground/70 mb-4">
                    Check any symptoms you've been experiencing regularly over the past month:
                  </p>
                  
                  <div className="space-y-3">
                    {stressSymptoms.map(symptom => (
                      <div key={symptom.id} className="flex items-center">
                        <input 
                          type="checkbox" 
                          id={symptom.id} 
                          checked={checkedSymptoms[symptom.id] || false}
                          onChange={() => handleSymptomCheck(symptom.id)}
                          className="w-4 h-4 text-[var(--primary)] focus:ring-[var(--primary)] mr-3"
                        />
                        <label htmlFor={symptom.id} className="text-foreground/80">
                          {symptom.text}
                        </label>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 p-4 bg-[var(--primary)]/5 rounded-lg">
                    {checkedSymptomsCount === 0 ? (
                      <p className="text-foreground/70">
                        Check the symptoms you've been experiencing to see a personalized assessment.
                      </p>
                    ) : checkedSymptomsCount >= 8 ? (
                      <div>
                        <p className="font-medium mb-2">
                          You've checked {checkedSymptomsCount} symptoms, which may indicate high levels of stress.
                        </p>
                        <p className="text-foreground/70">
                          Your stress appears to be affecting multiple aspects of your wellbeing. Consider prioritizing stress management strategies and consulting with a healthcare provider if these symptoms are interfering with your daily life.
                        </p>
                      </div>
                    ) : checkedSymptomsCount >= 4 ? (
                      <div>
                        <p className="font-medium mb-2">
                          You've checked {checkedSymptomsCount} symptoms, which may indicate moderate stress levels.
                        </p>
                        <p className="text-foreground/70">
                          You're experiencing several stress symptoms that could benefit from regular stress management practices. Pay attention to these signs and incorporate stress reduction techniques into your routine.
                        </p>
                      </div>
                    ) : (
                      <div>
                        <p className="font-medium mb-2">
                          You've checked {checkedSymptomsCount} symptom(s), which may indicate mild stress.
                        </p>
                        <p className="text-foreground/70">
                          While your stress levels appear to be relatively low, it's still beneficial to practice stress management techniques regularly to maintain your wellbeing.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="card p-6 bg-[var(--background-alt)]">
                  <h3 className="text-lg font-semibold mb-3">Identifying Your Stress Triggers</h3>
                  <p className="mb-4">
                    Understanding what triggers your stress can help you develop targeted management strategies. Common stress triggers include:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      <div>
                        <h4 className="font-medium">Work Pressure</h4>
                        <p className="text-xs text-foreground/70">Deadlines, workload, conflicts</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <div>
                        <h4 className="font-medium">Financial Concerns</h4>
                        <p className="text-xs text-foreground/70">Debt, expenses, job security</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <div>
                        <h4 className="font-medium">Relationships</h4>
                        <p className="text-xs text-foreground/70">Conflicts, expectations, changes</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      <div>
                        <h4 className="font-medium">Health Concerns</h4>
                        <p className="text-xs text-foreground/70">Illness, aging, medical issues</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <h4 className="font-medium">Time Pressure</h4>
                        <p className="text-xs text-foreground/70">Overcommitment, poor boundaries</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      <div>
                        <h4 className="font-medium">Major Life Changes</h4>
                        <p className="text-xs text-foreground/70">Moving, job changes, family shifts</p>
                      </div>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-foreground/70">
                    Take a moment to reflect on which of these triggers most affect you, and consider how you might address them specifically.
                  </p>
                </div>
              </section>
              
              {/* Management Techniques */}
              <section id="techniques" className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Evidence-Based Stress Management Techniques</h2>
                
                <p className="mb-6">
                  Research has identified numerous effective approaches for managing stress. The key is finding techniques that work for you and practicing them consistently.
                </p>
                
                <div className="space-y-8">
                  {managementTechniques.map(technique => (
                    <div key={technique.id} className="card p-6 shadow-sm">
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
                      
                      <p className="text-foreground/70 mt-2">{technique.description}</p>
                      
                      {expandedTechnique === technique.id && (
                        <div className="mt-4 space-y-4">
                          {technique.techniques.map((specificTechnique, index) => (
                            <div key={index} className="p-4 bg-[var(--background-alt)] rounded-lg">
                              <h4 className="font-medium mb-2">{specificTechnique.name}</h4>
                              <ol className="list-decimal pl-5 space-y-1 text-foreground/70">
                                {specificTechnique.steps.map((step, stepIndex) => (
                                  <li key={stepIndex}>{step}</li>
                                ))}
                              </ol>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 p-6 bg-[var(--primary)]/5 rounded-xl">
                  <h3 className="text-xl font-semibold mb-4">Creating Your Personal Stress Management Plan</h3>
                  <p className="mb-4">
                    The most effective approach to stress management combines multiple techniques tailored to your specific needs and preferences. Consider these steps:
                  </p>
                  <ol className="list-decimal pl-5 space-y-3 text-foreground/80">
                    <li>
                      <strong>Identify your stress triggers</strong> using the assessment above
                    </li>
                    <li>
                      <strong>Select 2-3 techniques</strong> from different categories that appeal to you
                    </li>
                    <li>
                      <strong>Start small</strong> with just 5-10 minutes of practice daily
                    </li>
                    <li>
                      <strong>Track your progress</strong> by noting how you feel before and after practice
                    </li>
                    <li>
                      <strong>Adjust as needed</strong>, trying different approaches until you find what works best
                    </li>
                    <li>
                      <strong>Build consistency</strong> by incorporating techniques into your daily routine
                    </li>
                    <li>
                      <strong>Be patient</strong> as it takes time to develop new habits and see results
                    </li>
                  </ol>
                </div>
              </section>
              
              {/* Lifestyle Factors */}
              <section id="lifestyle" className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Lifestyle Factors That Affect Stress</h2>
                
                <p className="mb-6">
                  Your daily habits and lifestyle choices can either increase your resilience to stress or make you more vulnerable to its effects. Understanding these factors can help you create an environment that supports stress management.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="card p-6 hover:shadow-depth transition-all">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium mb-2">Sleep</h3>
                        <p className="text-foreground/70 text-sm mb-3">
                          Quality sleep is essential for stress resilience. Poor sleep increases stress hormones and reduces your ability to cope with challenges.
                        </p>
                        <div className="bg-[var(--background-alt)] p-3 rounded-lg">
                          <h4 className="text-sm font-medium mb-1">Improvement Strategies:</h4>
                          <ul className="list-disc pl-4 text-xs space-y-1 text-foreground/70">
                            <li>Maintain a consistent sleep schedule</li>
                            <li>Create a relaxing bedtime routine</li>
                            <li>Keep your bedroom cool, dark, and quiet</li>
                            <li>Limit screen time before bed</li>
                            <li>Avoid caffeine and alcohol close to bedtime</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="card p-6 hover:shadow-depth transition-all">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium mb-2">Nutrition</h3>
                        <p className="text-foreground/70 text-sm mb-3">
                          What you eat affects your body's stress response. Some foods can increase inflammation and stress, while others support resilience.
                        </p>
                        <div className="bg-[var(--background-alt)] p-3 rounded-lg">
                          <h4 className="text-sm font-medium mb-1">Improvement Strategies:</h4>
                          <ul className="list-disc pl-4 text-xs space-y-1 text-foreground/70">
                            <li>Eat regular, balanced meals</li>
                            <li>Include complex carbohydrates for serotonin production</li>
                            <li>Consume foods rich in omega-3 fatty acids</li>
                            <li>Limit caffeine, alcohol, and refined sugars</li>
                            <li>Stay hydrated throughout the day</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="card p-6 hover:shadow-depth transition-all">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium mb-2">Physical Activity</h3>
                        <p className="text-foreground/70 text-sm mb-3">
                          Regular exercise is one of the most effective stress reducers, releasing endorphins and reducing stress hormones.
                        </p>
                        <div className="bg-[var(--background-alt)] p-3 rounded-lg">
                          <h4 className="text-sm font-medium mb-1">Improvement Strategies:</h4>
                          <ul className="list-disc pl-4 text-xs space-y-1 text-foreground/70">
                            <li>Aim for at least 30 minutes of moderate activity most days</li>
                            <li>Choose activities you enjoy to increase consistency</li>
                            <li>Include both aerobic exercise and strength training</li>
                            <li>Consider mind-body exercises like yoga or tai chi</li>
                            <li>Even short walks can help reduce stress</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="card p-6 hover:shadow-depth transition-all">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium mb-2">Social Connections</h3>
                        <p className="text-foreground/70 text-sm mb-3">
                          Strong social support is linked to greater stress resilience and better health outcomes.
                        </p>
                        <div className="bg-[var(--background-alt)] p-3 rounded-lg">
                          <h4 className="text-sm font-medium mb-1">Improvement Strategies:</h4>
                          <ul className="list-disc pl-4 text-xs space-y-1 text-foreground/70">
                            <li>Prioritize time with supportive friends and family</li>
                            <li>Join groups or communities with shared interests</li>
                            <li>Practice vulnerability and asking for help</li>
                            <li>Set boundaries with toxic relationships</li>
                            <li>Consider volunteering to build new connections</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="card p-6 hover:shadow-depth transition-all">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium mb-2">Time Management</h3>
                        <p className="text-foreground/70 text-sm mb-3">
                          Poor time management can create unnecessary stress. Effective planning can help you feel more in control.
                        </p>
                        <div className="bg-[var(--background-alt)] p-3 rounded-lg">
                          <h4 className="text-sm font-medium mb-1">Improvement Strategies:</h4>
                          <ul className="list-disc pl-4 text-xs space-y-1 text-foreground/70">
                            <li>Prioritize tasks based on importance and urgency</li>
                            <li>Break large projects into smaller, manageable steps</li>
                            <li>Use time-blocking techniques</li>
                            <li>Build in buffer time between activities</li>
                            <li>Learn to say no to non-essential commitments</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="card p-6 hover:shadow-depth transition-all">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium mb-2">Digital Habits</h3>
                        <p className="text-foreground/70 text-sm mb-3">
                          Constant connectivity and information overload can contribute significantly to stress levels.
                        </p>
                        <div className="bg-[var(--background-alt)] p-3 rounded-lg">
                          <h4 className="text-sm font-medium mb-1">Improvement Strategies:</h4>
                          <ul className="list-disc pl-4 text-xs space-y-1 text-foreground/70">
                            <li>Set boundaries around email and social media use</li>
                            <li>Create tech-free zones or times in your home</li>
                            <li>Turn off non-essential notifications</li>
                            <li>Practice regular digital detoxes</li>
                            <li>Be mindful of news consumption, especially before bed</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 p-6 bg-[var(--background-alt)] rounded-lg">
                  <h3 className="text-lg font-semibold mb-3">The Compound Effect of Lifestyle Changes</h3>
                  <p className="text-foreground/70">
                    Small changes across multiple lifestyle factors can have a powerful cumulative effect on your stress levels. Rather than trying to overhaul everything at once, focus on making gradual improvements in one or two areas at a time. As these changes become habits, you can build on them with additional adjustments.
                  </p>
                </div>
              </section>
              
              {/* When to Seek Help */}
              <section id="professional-help" className="mb-12">
                <h2 className="text-2xl font-bold mb-6">When to Seek Professional Help</h2>
                
                <p className="mb-6">
                  While self-help strategies are effective for managing everyday stress, there are times when professional support is necessary. Recognizing when to seek help is an important part of stress management.
                </p>
                
                <div className="card p-6 shadow-depth mb-8">
                  <h3 className="text-xl font-semibold mb-4">Signs That You May Need Professional Support:</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Persistent Symptoms</h4>
                        <p className="text-foreground/70">
                          Stress symptoms that don't improve despite your efforts to manage them, or that persist for more than a few weeks.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Functional Impairment</h4>
                        <p className="text-foreground/70">
                          Stress that interferes with your ability to function in daily life, including work, relationships, or self-care.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Mental Health Symptoms</h4>
                        <p className="text-foreground/70">
                          Signs of depression, anxiety, or other mental health conditions alongside stress, such as persistent sadness, excessive worry, or panic attacks.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Physical Health Concerns</h4>
                        <p className="text-foreground/70">
                          New or worsening physical symptoms that may be related to stress, such as high blood pressure, digestive issues, or chronic pain.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Unhealthy Coping Mechanisms</h4>
                        <p className="text-foreground/70">
                          Relying on alcohol, drugs, or other harmful behaviors to manage stress.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Suicidal Thoughts</h4>
                        <p className="text-foreground/70">
                          Any thoughts of harming yourself or feeling that life isn't worth living require immediate professional attention.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="card p-6 bg-[var(--primary)]/5 mb-8">
                  <h3 className="text-xl font-semibold mb-4">Types of Professional Support</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Primary Care Physician</h4>
                        <p className="text-foreground/70">
                          Can assess physical symptoms related to stress, rule out medical conditions, and provide referrals to specialists.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Mental Health Professionals</h4>
                        <p className="text-foreground/70">
                          Therapists, psychologists, and counselors can provide evidence-based treatments for stress, such as cognitive-behavioral therapy, mindfulness-based stress reduction, or acceptance and commitment therapy.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Psychiatrists</h4>
                        <p className="text-foreground/70">
                          Medical doctors who can prescribe medications if needed for stress-related conditions like anxiety or depression.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Support Groups</h4>
                        <p className="text-foreground/70">
                          Groups focused on stress management, specific stressors (like caregiving or chronic illness), or related conditions can provide valuable support and practical strategies.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="card p-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600 dark:text-yellow-400 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <div>
                      <h3 className="text-lg font-semibold mb-2 text-yellow-800 dark:text-yellow-300">Emergency Situations</h3>
                      <p className="text-yellow-800 dark:text-yellow-200 mb-4">
                        If you're experiencing a mental health emergency, such as thoughts of harming yourself or others, seek immediate help:
                      </p>
                      <ul className="list-disc pl-5 space-y-1 text-yellow-800 dark:text-yellow-200">
                        <li>Call your local emergency number (911 in the US)</li>
                        <li>Call the National Suicide Prevention Lifeline: 988 or 1-800-273-8255</li>
                        <li>Text HOME to the Crisis Text Line at 741741</li>
                        <li>Go to your nearest emergency room</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>
              
              {/* Conclusion */}
              <section id="conclusion" className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Conclusion: Building Stress Resilience</h2>
                <p className="mb-4">
                  Stress is an inevitable part of life, but its impact on your health and wellbeing largely depends on how you respond to it. By understanding the science of stress and implementing effective management strategies, you can build resilience and even use stress as a catalyst for growth.
                </p>
                <p className="mb-4">
                  Remember that stress management is not about eliminating stress completely—some stress is necessary and beneficial. Instead, it's about creating a healthy relationship with stress and developing the skills to prevent it from becoming overwhelming or chronic.
                </p>
                <p className="mb-4">
                  The most effective approach to stress management combines multiple strategies, including physical techniques (like breathing exercises and regular physical activity), psychological approaches (like mindfulness and cognitive reframing), and lifestyle adjustments (like improving sleep and nutrition).
                </p>
                <p>
                  With practice and persistence, these strategies can help you not only manage stress more effectively but also enhance your overall resilience, wellbeing, and quality of life.
                </p>
              </section>
              
              {/* Share Links */}
              <div className="mb-12">
                <h3 className="font-semibold mb-4">Share this resource</h3>
                <ShareButtons 
                  title="The Science of Stress and How to Manage It" 
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
                    Understanding Stress
                  </a>
                  <a href="#science" className="block text-foreground/70 hover:text-[var(--primary)] py-1 border-l-2 border-transparent hover:border-[var(--primary)] pl-3 transition-all">
                    The Science of Stress
                  </a>
                  <a href="#types" className="block text-foreground/70 hover:text-[var(--primary)] py-1 border-l-2 border-transparent hover:border-[var(--primary)] pl-3 transition-all">
                    Types of Stress
                  </a>
                  <a href="#effects" className="block text-foreground/70 hover:text-[var(--primary)] py-1 border-l-2 border-transparent hover:border-[var(--primary)] pl-3 transition-all">
                    Health Effects
                  </a>
                  <a href="#assessment" className="block text-foreground/70 hover:text-[var(--primary)] py-1 border-l-2 border-transparent hover:border-[var(--primary)] pl-3 transition-all">
                    Stress Assessment
                  </a>
                  <a href="#techniques" className="block text-foreground/70 hover:text-[var(--primary)] py-1 border-l-2 border-transparent hover:border-[var(--primary)] pl-3 transition-all">
                    Management Techniques
                  </a>
                  <a href="#lifestyle" className="block text-foreground/70 hover:text-[var(--primary)] py-1 border-l-2 border-transparent hover:border-[var(--primary)] pl-3 transition-all">
                    Lifestyle Factors
                  </a>
                  <a href="#professional-help" className="block text-foreground/70 hover:text-[var(--primary)] py-1 border-l-2 border-transparent hover:border-[var(--primary)] pl-3 transition-all">
                    When to Seek Help
                  </a>
                  <a href="#conclusion" className="block text-foreground/70 hover:text-[var(--primary)] py-1 border-l-2 border-transparent hover:border-[var(--primary)] pl-3 transition-all">
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
                  Get a PDF version of this guide to read offline or share with others.
                </p>
                <PDFDownloadButton
                  title="The Science of Stress and How to Manage It"
                  subtitle="TherapyKin Resource"
                  filename="TherapyKin-Stress-Science.pdf"
                  contentId="stress-science-content"
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
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Mindfulness Guide</h4>
                      <p className="text-sm text-foreground/70 mb-2">Step-by-step guide to starting a mindfulness practice</p>
                      <Link href="/resources/mindfulness-guide" className="text-xs text-[var(--primary)] font-medium hover:underline">
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
                <h3 className="text-lg font-semibold mb-4">Quick Stress Relief Techniques</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-sm text-foreground/70">Take 5 deep breaths, inhaling for 4 counts and exhaling for 6</p>
                  </div>
                  
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-sm text-foreground/70">Use the 5-4-3-2-1 grounding technique: notice 5 things you see, 4 things you feel, 3 things you hear, 2 things you smell, and 1 thing you taste</p>
                  </div>
                  
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-sm text-foreground/70">Take a 5-minute walk, focusing on the sensation of your feet touching the ground</p>
                  </div>
                  
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-sm text-foreground/70">Tense and then relax each muscle group in your body, starting from your toes and moving up</p>
                  </div>
                  
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-sm text-foreground/70">Place your hand on your heart and speak kindly to yourself, as you would to a friend</p>
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
