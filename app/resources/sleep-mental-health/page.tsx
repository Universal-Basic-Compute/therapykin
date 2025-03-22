'use client';

import React, { useState } from "react";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ShareButtons from "../../components/ShareButtons";
import PDFDownloadButton from "../../components/PDFDownloadButton";

// Sleep hygiene tips
const sleepHygieneTips = [
  {
    id: "schedule",
    title: "Maintain a Consistent Sleep Schedule",
    description: "Go to bed and wake up at the same time every day, even on weekends. This helps regulate your body's internal clock.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    id: "environment",
    title: "Create a Sleep-Conducive Environment",
    description: "Keep your bedroom cool, quiet, and dark. Consider using earplugs, eye shades, or white noise machines if needed.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
    )
  },
  {
    id: "comfort",
    title: "Ensure Your Bed is Comfortable",
    description: "Use a comfortable mattress and pillows. Replace them if they're older than 9-10 years or if they're no longer comfortable.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
      </svg>
    )
  },
  {
    id: "screens",
    title: "Limit Screen Time Before Bed",
    description: "The blue light emitted by phones, tablets, and computers can interfere with your ability to fall asleep. Try to avoid screens 1-2 hours before bedtime.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    id: "caffeine",
    title: "Watch Your Caffeine and Alcohol Intake",
    description: "Avoid caffeine late in the day and limit alcohol consumption, which can disrupt sleep patterns and quality.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    )
  },
  {
    id: "exercise",
    title: "Exercise Regularly",
    description: "Regular physical activity can help you fall asleep faster and enjoy deeper sleep. Just avoid vigorous exercise close to bedtime.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  },
  {
    id: "routine",
    title: "Establish a Relaxing Bedtime Routine",
    description: "Engage in calming activities before bed, such as reading, gentle stretching, or taking a warm bath.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    id: "worry",
    title: "Manage Worry and Stress",
    description: "Try relaxation techniques, journaling, or setting aside 'worry time' earlier in the day to process concerns before bedtime.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  }
];

// Sleep disorders
const sleepDisorders = [
  {
    id: "insomnia",
    name: "Insomnia",
    description: "Difficulty falling asleep, staying asleep, or both, despite having the opportunity for adequate sleep.",
    mentalHealthImpacts: [
      "Increased risk of depression and anxiety",
      "Impaired cognitive function and decision-making",
      "Heightened emotional reactivity",
      "Reduced stress resilience"
    ]
  },
  {
    id: "sleep-apnea",
    name: "Sleep Apnea",
    description: "A disorder characterized by pauses in breathing or periods of shallow breathing during sleep, leading to fragmented sleep.",
    mentalHealthImpacts: [
      "Increased risk of depression",
      "Cognitive impairment and memory problems",
      "Irritability and mood changes",
      "Potential exacerbation of ADHD symptoms"
    ]
  },
  {
    id: "restless-legs",
    name: "Restless Legs Syndrome (RLS)",
    description: "An urge to move the legs, usually accompanied by uncomfortable sensations that worsen during periods of rest or inactivity.",
    mentalHealthImpacts: [
      "Higher rates of depression and anxiety",
      "Increased stress levels",
      "Reduced quality of life",
      "Potential for medication interactions with psychiatric medications"
    ]
  },
  {
    id: "narcolepsy",
    name: "Narcolepsy",
    description: "A chronic sleep disorder characterized by overwhelming daytime drowsiness and sudden attacks of sleep.",
    mentalHealthImpacts: [
      "Increased risk of depression",
      "Social isolation and relationship difficulties",
      "Reduced quality of life",
      "Potential misdiagnosis as psychiatric disorders"
    ]
  },
  {
    id: "circadian-rhythm",
    name: "Circadian Rhythm Sleep Disorders",
    description: "Disruptions in the timing of sleep due to misalignment between a person's internal clock and the external environment.",
    mentalHealthImpacts: [
      "Strong association with mood disorders, especially bipolar disorder",
      "Increased risk of depression and anxiety",
      "Cognitive impairment",
      "Potential trigger for manic or depressive episodes"
    ]
  }
];

// Mental health conditions affected by sleep
const mentalHealthConditions = [
  {
    id: "depression",
    name: "Depression",
    sleepRelationship: "Depression and sleep have a bidirectional relationship. Sleep problems are both a symptom and a risk factor for depression. About 75% of people with depression experience insomnia, while hypersomnia (excessive sleep) is also common.",
    researchFindings: "Studies show that treating insomnia with cognitive behavioral therapy can reduce depression symptoms. People with persistent insomnia have a significantly higher risk of developing depression."
  },
  {
    id: "anxiety",
    name: "Anxiety Disorders",
    sleepRelationship: "Anxiety can make it difficult to fall asleep and stay asleep, while sleep deprivation can worsen anxiety symptoms, creating a negative cycle. Racing thoughts and worry often intensify at bedtime.",
    researchFindings: "Research indicates that people with insomnia are 17 times more likely to have clinical anxiety. Sleep disruption can lower the threshold for anxiety-producing stimuli, making people more reactive to potential threats."
  },
  {
    id: "bipolar",
    name: "Bipolar Disorder",
    sleepRelationship: "Sleep disturbances are core features of both manic and depressive episodes in bipolar disorder. Reduced need for sleep often precedes manic episodes, while insomnia or hypersomnia are common during depressive phases.",
    researchFindings: "Studies show that sleep disruption can trigger mood episodes in people with bipolar disorder. Maintaining regular sleep patterns is a key component of bipolar disorder management."
  },
  {
    id: "adhd",
    name: "ADHD",
    sleepRelationship: "Many people with ADHD have difficulty falling asleep, staying asleep, and waking up. Sleep problems can worsen ADHD symptoms like inattention and impulsivity.",
    researchFindings: "Research suggests that treating sleep problems in people with ADHD can improve attention and reduce hyperactivity. Some ADHD symptoms may be exacerbated by or confused with symptoms of sleep deprivation."
  },
  {
    id: "ptsd",
    name: "PTSD",
    sleepRelationship: "Sleep disturbances, including insomnia and nightmares, are hallmark symptoms of PTSD. Many people with PTSD avoid sleep due to fear of nightmares or feeling vulnerable while sleeping.",
    researchFindings: "Studies indicate that sleep disruption following trauma exposure may contribute to PTSD development. Treatments targeting nightmares and insomnia can improve overall PTSD symptoms."
  }
];

export default function SleepMentalHealth() {
  // State for active section (for mobile accordion view)
  const [activeSection, setActiveSection] = useState<string | null>("introduction");
  
  // State for expanded sleep disorder
  const [expandedDisorder, setExpandedDisorder] = useState<string | null>(null);
  
  // Toggle section visibility (for mobile)
  const toggleSection = (sectionId: string) => {
    if (activeSection === sectionId) {
      setActiveSection(null);
    } else {
      setActiveSection(sectionId);
    }
  };
  
  // Toggle sleep disorder expansion
  const toggleDisorder = (disorderId: string) => {
    if (expandedDisorder === disorderId) {
      setExpandedDisorder(null);
    } else {
      setExpandedDisorder(disorderId);
    }
  };
  
  // Get the current URL for sharing
  const currentUrl = typeof window !== 'undefined' 
    ? window.location.href 
    : 'https://therapykin.ai/resources/sleep-mental-health';
  
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
                      Sleep and Mental Health
                    </span>
                  </div>
                </li>
              </ol>
            </nav>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div id="sleep-mental-health-content" className="lg:w-2/3">
              {/* Resource Header */}
              <div className="mb-8">
                <span className="px-3 py-1 bg-[var(--primary)]/10 text-[var(--primary)] rounded-full text-sm font-medium">
                  Self-Care
                </span>
                <h1 className="text-3xl md:text-4xl font-bold mt-4 mb-4">The Connection Between Sleep and Mental Health</h1>
                <p className="text-xl text-foreground/70 mb-6">
                  Research-based insights into how sleep affects your mental health and practical tips for improving sleep quality.
                </p>
              </div>
              
              {/* Featured Image */}
              <div className="mb-8 rounded-xl overflow-hidden">
                <div className="aspect-w-16 aspect-h-9 bg-[var(--primary)]/10">
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-[var(--primary)]/20 to-[var(--accent)]/20">
                    <span className="text-[var(--primary)] font-medium">Sleep and Mental Health Image</span>
                  </div>
                </div>
              </div>
              
              {/* Introduction */}
              <section id="introduction" className="mb-12">
                <h2 className="text-2xl font-bold mb-4">The Vital Connection</h2>
                <p className="mb-4">
                  Sleep and mental health are intimately connected. The relationship between them is bidirectional—mental health conditions can disrupt sleep, and sleep problems can contribute to the development and persistence of mental health issues. Understanding this connection is crucial for maintaining both good sleep and positive mental wellbeing.
                </p>
                <p className="mb-4">
                  Historically, sleep problems were viewed primarily as symptoms of mental health disorders. However, research now suggests that sleep disruption may actually contribute to the development and maintenance of different mental health conditions. In other words, sleep problems aren't just a consequence of mental health issues—they may be a causal factor.
                </p>
                
                <div className="my-8 p-6 bg-[var(--primary)]/5 rounded-xl">
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="w-16 h-16 md:w-20 md:h-20 flex-shrink-0 rounded-full bg-[var(--primary)]/10 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-2">Sleep By The Numbers</h4>
                      <ul className="text-foreground/80 space-y-2">
                        <li>• 50-80% of patients in psychiatric care have chronic sleep problems</li>
                        <li>• People with insomnia are 10 times more likely to develop depression</li>
                        <li>• Sleep deprivation can increase anxiety by up to 30%</li>
                        <li>• 70-90% of people with PTSD report sleep disturbances</li>
                        <li>• Improving sleep can lead to a 50% improvement in depression symptoms</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <p className="mb-4">
                  This guide explores the complex relationship between sleep and mental health, drawing on current research to explain how they influence each other. We'll also provide practical, evidence-based strategies to improve your sleep quality and, by extension, support your mental wellbeing.
                </p>
              </section>
              
              {/* How Sleep Affects the Brain */}
              <section id="brain-effects" className="mb-12">
                <h2 className="text-2xl font-bold mb-6">How Sleep Affects the Brain</h2>
                
                <p className="mb-6">
                  Sleep is not simply a passive state of rest—it's an active process during which the brain performs essential functions that support mental health and cognitive performance. Understanding these processes helps explain why disrupted sleep can have such profound effects on mental wellbeing.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="card p-6 hover:shadow-depth transition-all">
                    <h3 className="text-xl font-semibold mb-3">Emotional Processing</h3>
                    <p className="text-foreground/70">
                      During REM sleep, the brain processes emotional experiences from the day. This helps regulate mood and emotional reactivity. Without adequate REM sleep, emotional regulation becomes impaired, potentially leading to:
                    </p>
                    <ul className="list-disc pl-5 mt-3 space-y-1 text-foreground/70">
                      <li>Increased negative emotional responses</li>
                      <li>Decreased positive emotional responses</li>
                      <li>Difficulty identifying emotions accurately</li>
                      <li>Impaired emotional memory processing</li>
                    </ul>
                  </div>
                  
                  <div className="card p-6 hover:shadow-depth transition-all">
                    <h3 className="text-xl font-semibold mb-3">Stress Hormone Regulation</h3>
                    <p className="text-foreground/70">
                      Sleep helps regulate stress hormones like cortisol. Poor sleep disrupts this balance, leading to:
                    </p>
                    <ul className="list-disc pl-5 mt-3 space-y-1 text-foreground/70">
                      <li>Elevated cortisol levels throughout the day</li>
                      <li>Heightened stress reactivity</li>
                      <li>Increased inflammation in the body and brain</li>
                      <li>Disruption of the HPA axis (hypothalamic-pituitary-adrenal), a key stress response system</li>
                    </ul>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="card p-6 hover:shadow-depth transition-all">
                    <h3 className="text-xl font-semibold mb-3">Neurotransmitter Balance</h3>
                    <p className="text-foreground/70">
                      Sleep influences the production and regulation of neurotransmitters that affect mood, including:
                    </p>
                    <ul className="list-disc pl-5 mt-3 space-y-1 text-foreground/70">
                      <li>Serotonin: involved in mood regulation and happiness</li>
                      <li>Dopamine: affects motivation, pleasure, and reward</li>
                      <li>GABA: the brain's main inhibitory neurotransmitter that calms neural activity</li>
                      <li>Norepinephrine: influences attention and response to stress</li>
                    </ul>
                  </div>
                  
                  <div className="card p-6 hover:shadow-depth transition-all">
                    <h3 className="text-xl font-semibold mb-3">Memory Consolidation</h3>
                    <p className="text-foreground/70">
                      During sleep, the brain strengthens important neural connections and prunes unnecessary ones. This process is crucial for:
                    </p>
                    <ul className="list-disc pl-5 mt-3 space-y-1 text-foreground/70">
                      <li>Converting short-term memories to long-term storage</li>
                      <li>Processing emotional memories appropriately</li>
                      <li>Learning and skill development</li>
                      <li>Cognitive flexibility and problem-solving abilities</li>
                    </ul>
                  </div>
                </div>
                
                <div className="card p-6 hover:shadow-depth transition-all">
                  <h3 className="text-xl font-semibold mb-3">Brain Cleaning and Repair</h3>
                  <p className="text-foreground/70 mb-4">
                    Recent research has revealed that during sleep, the brain's glymphatic system—a waste clearance system—becomes more active. This process:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-foreground/70">
                    <li>Removes toxic proteins and metabolic waste products that accumulate during wakefulness</li>
                    <li>Clears beta-amyloid, a protein associated with Alzheimer's disease</li>
                    <li>Reduces neuroinflammation</li>
                    <li>Supports overall brain health and function</li>
                  </ul>
                  <p className="mt-4 text-foreground/70">
                    This "cleaning" process is primarily active during deep sleep, highlighting why quality sleep—not just quantity—is essential for mental health.
                  </p>
                </div>
              </section>
              
              {/* Sleep and Mental Health Conditions */}
              <section id="mental-health-conditions" className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Sleep and Specific Mental Health Conditions</h2>
                
                <p className="mb-6">
                  Different mental health conditions have unique relationships with sleep. Understanding these specific connections can help in developing targeted approaches for both sleep improvement and mental health management.
                </p>
                
                <div className="space-y-6">
                  {mentalHealthConditions.map(condition => (
                    <div key={condition.id} className="card p-6 hover:shadow-depth transition-all">
                      <h3 className="text-xl font-semibold mb-3">{condition.name}</h3>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-1">Relationship with Sleep:</h4>
                          <p className="text-foreground/70">{condition.sleepRelationship}</p>
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">Research Findings:</h4>
                          <p className="text-foreground/70">{condition.researchFindings}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 p-6 bg-[var(--background-alt)] rounded-lg">
                  <h3 className="text-lg font-semibold mb-3">The Transdiagnostic Perspective</h3>
                  <p className="text-foreground/70">
                    Recent research suggests that sleep disturbances may be a "transdiagnostic" factor—meaning they cut across multiple psychiatric diagnoses and may represent a common mechanism underlying various mental health conditions. This perspective highlights the importance of addressing sleep problems as part of mental health treatment, regardless of the specific diagnosis.
                  </p>
                </div>
              </section>
              
              {/* Sleep Disorders and Mental Health */}
              <section id="sleep-disorders" className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Sleep Disorders and Their Impact on Mental Health</h2>
                
                <p className="mb-6">
                  Sleep disorders are medical conditions that disrupt sleep patterns and quality. They can significantly impact mental health and are often comorbid with psychiatric disorders. Understanding these disorders and their relationship to mental health is crucial for comprehensive treatment.
                </p>
                
                <div className="space-y-6">
                  {sleepDisorders.map(disorder => (
                    <div key={disorder.id} className="card p-6 shadow-sm">
                      <button 
                        className="flex justify-between items-center w-full text-left"
                        onClick={() => toggleDisorder(disorder.id)}
                      >
                        <h3 className="text-xl font-semibold">{disorder.name}</h3>
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className={`h-5 w-5 transition-transform ${expandedDisorder === disorder.id ? 'rotate-180' : ''}`} 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      
                      <p className="text-foreground/70 mt-2">{disorder.description}</p>
                      
                      {expandedDisorder === disorder.id && (
                        <div className="mt-4 bg-[var(--background-alt)] p-4 rounded-lg">
                          <h4 className="font-medium mb-2">Mental Health Impacts:</h4>
                          <ul className="list-disc pl-5 space-y-1 text-foreground/70">
                            {disorder.mentalHealthImpacts.map((impact, index) => (
                              <li key={index}>{impact}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 p-6 bg-[var(--primary)]/5 rounded-xl">
                  <h3 className="text-xl font-semibold mb-4">When to Seek Professional Help</h3>
                  <p className="mb-4">
                    Consider consulting a healthcare provider about potential sleep disorders if you experience:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-foreground/80">
                    <li>Persistent difficulty falling or staying asleep despite good sleep habits</li>
                    <li>Excessive daytime sleepiness or fatigue despite adequate sleep time</li>
                    <li>Loud snoring, gasping, or stopping breathing during sleep (reported by a sleep partner)</li>
                    <li>Uncomfortable sensations in your legs or an irresistible urge to move them at night</li>
                    <li>Sleep problems that interfere with daily functioning</li>
                    <li>Using sleep medications for more than a few weeks</li>
                  </ul>
                </div>
              </section>
              
              {/* Sleep Hygiene */}
              <section id="sleep-hygiene" className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Evidence-Based Sleep Hygiene Practices</h2>
                
                <p className="mb-6">
                  Sleep hygiene refers to habits and practices that are conducive to sleeping well on a regular basis. Research shows that implementing good sleep hygiene can significantly improve sleep quality and, by extension, mental health. Here are evidence-based practices to improve your sleep:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {sleepHygieneTips.map(tip => (
                    <div key={tip.id} className="card p-5 hover:shadow-depth transition-all">
                      <div className="flex items-start">
                        <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3">
                          {tip.icon}
                        </div>
                        <div>
                          <h3 className="font-medium mb-2">{tip.title}</h3>
                          <p className="text-foreground/70">{tip.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="card p-6 bg-[var(--background-alt)]">
                  <h3 className="text-lg font-semibold mb-3">Creating a Sleep-Friendly Environment</h3>
                  <p className="mb-4">
                    Your sleep environment plays a crucial role in sleep quality. Consider these factors:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <div>
                        <h4 className="font-medium">Temperature</h4>
                        <p className="text-sm text-foreground/70">Keep your bedroom cool (65-68°F or 18-20°C)</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <div>
                        <h4 className="font-medium">Light</h4>
                        <p className="text-sm text-foreground/70">Use blackout curtains or an eye mask to block light</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <div>
                        <h4 className="font-medium">Sound</h4>
                        <p className="text-sm text-foreground/70">Use earplugs or white noise to mask disruptive sounds</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <div>
                        <h4 className="font-medium">Bedding</h4>
                        <p className="text-sm text-foreground/70">Invest in comfortable, breathable bedding materials</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              
              {/* Cognitive Techniques */}
              <section id="cognitive-techniques" className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Cognitive Techniques for Better Sleep</h2>
                
                <p className="mb-6">
                  Mental approaches can be just as important as physical habits when it comes to improving sleep. These cognitive techniques can help address the mental barriers to good sleep:
                </p>
                
                <div className="space-y-6">
                  <div className="card p-6 hover:shadow-depth transition-all">
                    <h3 className="text-xl font-semibold mb-3">Cognitive Restructuring for Sleep Worry</h3>
                    <p className="mb-4">
                      Many people with sleep problems develop anxiety about sleep itself, creating a cycle of worry that makes sleep even more difficult. Cognitive restructuring helps identify and challenge unhelpful thoughts about sleep.
                    </p>
                    <div className="bg-[var(--background-alt)] p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Practice:</h4>
                      <ol className="list-decimal pl-5 space-y-1 text-foreground/70">
                        <li>Identify sleep-related thoughts that cause anxiety (e.g., "If I don't get 8 hours of sleep, I'll be useless tomorrow")</li>
                        <li>Challenge these thoughts with evidence (e.g., "I've functioned well on less sleep before")</li>
                        <li>Replace with more balanced thoughts (e.g., "I might be tired, but I can still manage my essential tasks")</li>
                      </ol>
                    </div>
                  </div>
                  
                  <div className="card p-6 hover:shadow-depth transition-all">
                    <h3 className="text-xl font-semibold mb-3">Mindfulness for Sleep</h3>
                    <p className="mb-4">
                      Mindfulness involves paying attention to the present moment without judgment. This practice can help quiet the mind and reduce the rumination that often interferes with sleep.
                    </p>
                    <div className="bg-[var(--background-alt)] p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Practice:</h4>
                      <ol className="list-decimal pl-5 space-y-1 text-foreground/70">
                        <li>Focus on your breath, noticing the sensation of breathing in and out</li>
                        <li>When your mind wanders (which is normal), gently bring your attention back to your breath</li>
                        <li>Expand awareness to include bodily sensations, noticing areas of tension and relaxation</li>
                        <li>Practice accepting whatever state you're in without trying to force sleep</li>
                      </ol>
                    </div>
                  </div>
                  
                  <div className="card p-6 hover:shadow-depth transition-all">
                    <h3 className="text-xl font-semibold mb-3">Stimulus Control Therapy</h3>
                    <p className="mb-4">
                      This technique helps rebuild the association between your bed and sleep, which can be weakened when you spend a lot of time in bed awake.
                    </p>
                    <div className="bg-[var(--background-alt)] p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Practice:</h4>
                      <ol className="list-decimal pl-5 space-y-1 text-foreground/70">
                        <li>Only go to bed when you're sleepy</li>
                        <li>If you can't fall asleep within about 20 minutes, get up and do something relaxing in another room</li>
                        <li>Return to bed only when you feel sleepy again</li>
                        <li>Repeat as necessary throughout the night</li>
                        <li>Wake up at the same time every day, regardless of how much you slept</li>
                        <li>Avoid napping during the day</li>
                      </ol>
                    </div>
                  </div>
                  
                  <div className="card p-6 hover:shadow-depth transition-all">
                    <h3 className="text-xl font-semibold mb-3">Worry Time</h3>
                    <p className="mb-4">
                      Many people find that worries and to-do lists surface as soon as they try to sleep. Scheduled worry time helps manage this.
                    </p>
                    <div className="bg-[var(--background-alt)] p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Practice:</h4>
                      <ol className="list-decimal pl-5 space-y-1 text-foreground/70">
                        <li>Set aside 15-20 minutes earlier in the day (not right before bed) as designated "worry time"</li>
                        <li>During this time, write down all your concerns, problems, and to-do items</li>
                        <li>For each worry, briefly note a next step or potential solution</li>
                        <li>When worries arise at bedtime, remind yourself that you've already addressed them during worry time and can return to them tomorrow</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </section>
              
              {/* Technology and Sleep */}
              <section id="technology" className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Technology and Sleep: Finding Balance</h2>
                
                <p className="mb-6">
                  Technology has transformed our lives, but it has also introduced new challenges for sleep. Understanding how to manage technology use is essential for protecting sleep quality in the digital age.
                </p>
                
                <div className="card p-6 shadow-depth mb-8">
                  <h3 className="text-xl font-semibold mb-4">How Technology Affects Sleep</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Blue Light Exposure</h4>
                        <p className="text-foreground/70">
                          Screens emit blue light that suppresses melatonin production, the hormone that regulates sleep-wake cycles. This can delay sleep onset and reduce sleep quality.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Mental Stimulation</h4>
                        <p className="text-foreground/70">
                          Engaging with content (social media, news, games) activates the brain, making it harder to wind down for sleep.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Time Displacement</h4>
                        <p className="text-foreground/70">
                          The "just one more" phenomenon can lead to delayed bedtimes as we continue scrolling, watching, or playing.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Notifications and Alerts</h4>
                        <p className="text-foreground/70">
                          Even when not actively using devices, notifications can disrupt sleep by triggering alertness.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="card p-6 hover:shadow-depth transition-all">
                  <h3 className="text-xl font-semibold mb-4">Strategies for Healthy Technology Use</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <div>
                        <h4 className="font-medium">Digital Sunset</h4>
                        <p className="text-sm text-foreground/70">Establish a "digital sunset" 1-2 hours before bedtime, when you turn off all screens</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <div>
                        <h4 className="font-medium">Blue Light Filters</h4>
                        <p className="text-sm text-foreground/70">Use night mode or blue light filtering apps on devices in the evening</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <div>
                        <h4 className="font-medium">Notification Management</h4>
                        <p className="text-sm text-foreground/70">Use Do Not Disturb mode during sleep hours</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <div>
                        <h4 className="font-medium">Bedroom Technology Ban</h4>
                        <p className="text-sm text-foreground/70">Keep phones, tablets, and laptops out of the bedroom</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <div>
                        <h4 className="font-medium">App Limits</h4>
                        <p className="text-sm text-foreground/70">Use screen time management tools to set limits on app usage</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <div>
                        <h4 className="font-medium">Analog Alternatives</h4>
                        <p className="text-sm text-foreground/70">Replace evening screen time with reading physical books, journaling, or other screen-free activities</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-[var(--background-alt)] rounded-lg">
                  <h4 className="font-medium mb-2">Helpful Technology:</h4>
                  <p className="text-sm text-foreground/70 mb-3">
                    Not all technology is detrimental to sleep. Some tech tools can actually support better sleep:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-foreground/70">
                    <li>Sleep tracking apps that provide insights into your sleep patterns</li>
                    <li>White noise or nature sound apps that mask disruptive noises</li>
                    <li>Meditation and relaxation apps with sleep-focused content</li>
                    <li>Smart lighting that dims gradually as bedtime approaches</li>
                    <li>Alarm clocks designed to wake you during lighter sleep phases</li>
                  </ul>
                </div>
              </section>
              
              {/* Sleep and Stress */}
              <section id="sleep-stress" className="mb-12">
                <h2 className="text-2xl font-bold mb-6">The Sleep-Stress Cycle</h2>
                
                <p className="mb-6">
                  Sleep and stress have a bidirectional relationship—stress can disrupt sleep, and poor sleep can increase stress reactivity. Understanding and breaking this cycle is crucial for both better sleep and improved mental wellbeing.
                </p>
                
                <div className="card p-6 shadow-depth mb-8">
                  <h3 className="text-xl font-semibold mb-4">How Stress Affects Sleep</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Physiological Arousal</h4>
                        <p className="text-foreground/70">
                          Stress activates the sympathetic nervous system ("fight or flight"), increasing heart rate, blood pressure, and alertness—all counterproductive to sleep.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Cortisol Dysregulation</h4>
                        <p className="text-foreground/70">
                          Chronic stress disrupts the normal cortisol rhythm, which should be low at night. Elevated evening cortisol interferes with sleep onset and quality.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Rumination and Worry</h4>
                        <p className="text-foreground/70">
                          Stress often triggers repetitive thought patterns about problems or concerns, making it difficult to quiet the mind for sleep.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="card p-6 shadow-depth mb-8">
                  <h3 className="text-xl font-semibold mb-4">How Poor Sleep Increases Stress</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Heightened Stress Reactivity</h4>
                        <p className="text-foreground/70">
                          Sleep deprivation amplifies the brain's response to stressors. Research shows that after poor sleep, the amygdala (the brain's threat detector) becomes hyperactive while the prefrontal cortex (involved in emotional regulation) becomes less effective.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Increased Cortisol Production</h4>
                        <p className="text-foreground/70">
                          Sleep loss leads to increased cortisol production the following day, creating a physiological stress state even in the absence of stressors.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Reduced Coping Resources</h4>
                        <p className="text-foreground/70">
                          Sleep deprivation depletes the cognitive and emotional resources needed to cope effectively with stress, making even minor challenges feel overwhelming.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="card p-6 hover:shadow-depth transition-all">
                  <h3 className="text-xl font-semibold mb-4">Breaking the Sleep-Stress Cycle</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 010-7.072m12.728 0l-3.536 3.536M6.414 8.464l3.536 3.536" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Relaxation Techniques</h4>
                        <p className="text-foreground/70">
                          Practices like progressive muscle relaxation, deep breathing, and guided imagery can activate the parasympathetic nervous system ("rest and digest"), counteracting stress and promoting sleep.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Mindfulness Meditation</h4>
                        <p className="text-foreground/70">
                          Regular mindfulness practice has been shown to reduce stress reactivity and improve sleep quality. Even short sessions (5-10 minutes) can be beneficial.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Stress Management During the Day</h4>
                        <p className="text-foreground/70">
                          Addressing stress during waking hours can prevent it from affecting sleep. Techniques include time management, setting boundaries, regular breaks, and physical activity.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Wind-Down Routine</h4>
                        <p className="text-foreground/70">
                          A consistent pre-sleep routine signals to your body that it's time to relax. Include calming activities like reading, gentle stretching, or a warm bath.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              
              {/* Conclusion */}
              <section id="conclusion" className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Conclusion: Prioritizing Sleep for Mental Wellbeing</h2>
                <p className="mb-4">
                  The relationship between sleep and mental health is complex and bidirectional. Poor sleep can contribute to mental health problems, while mental health conditions can disrupt sleep. This creates either a vicious cycle of deterioration or, with the right approaches, a virtuous cycle of improvement.
                </p>
                <p className="mb-4">
                  By understanding the science behind this connection and implementing evidence-based strategies to improve sleep, you can support your mental wellbeing in profound ways. Remember that small, consistent changes often lead to the most sustainable improvements in both sleep quality and mental health.
                </p>
                <p className="mb-4">
                  If you're struggling with persistent sleep problems or mental health concerns, consider reaching out to a healthcare provider. Sometimes, addressing one aspect (either sleep or mental health) can create positive ripple effects that improve the other.
                </p>
                <p>
                  Prioritizing sleep isn't a luxury or an indulgence—it's a fundamental aspect of mental health care and overall wellbeing. Your brain and body do important work while you sleep, and giving them the time and conditions to do this work is one of the most powerful ways to support your mental health.
                </p>
              </section>
              
              {/* Share Links */}
              <div className="mb-12">
                <h3 className="font-semibold mb-4">Share this resource</h3>
                <ShareButtons 
                  title="The Connection Between Sleep and Mental Health" 
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
                    The Vital Connection
                  </a>
                  <a href="#brain-effects" className="block text-foreground/70 hover:text-[var(--primary)] py-1 border-l-2 border-transparent hover:border-[var(--primary)] pl-3 transition-all">
                    How Sleep Affects the Brain
                  </a>
                  <a href="#mental-health-conditions" className="block text-foreground/70 hover:text-[var(--primary)] py-1 border-l-2 border-transparent hover:border-[var(--primary)] pl-3 transition-all">
                    Sleep and Mental Health Conditions
                  </a>
                  <a href="#sleep-disorders" className="block text-foreground/70 hover:text-[var(--primary)] py-1 border-l-2 border-transparent hover:border-[var(--primary)] pl-3 transition-all">
                    Sleep Disorders and Mental Health
                  </a>
                  <a href="#sleep-hygiene" className="block text-foreground/70 hover:text-[var(--primary)] py-1 border-l-2 border-transparent hover:border-[var(--primary)] pl-3 transition-all">
                    Sleep Hygiene Practices
                  </a>
                  <a href="#cognitive-techniques" className="block text-foreground/70 hover:text-[var(--primary)] py-1 border-l-2 border-transparent hover:border-[var(--primary)] pl-3 transition-all">
                    Cognitive Techniques
                  </a>
                  <a href="#technology" className="block text-foreground/70 hover:text-[var(--primary)] py-1 border-l-2 border-transparent hover:border-[var(--primary)] pl-3 transition-all">
                    Technology and Sleep
                  </a>
                  <a href="#sleep-stress" className="block text-foreground/70 hover:text-[var(--primary)] py-1 border-l-2 border-transparent hover:border-[var(--primary)] pl-3 transition-all">
                    The Sleep-Stress Cycle
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
                  title="The Connection Between Sleep and Mental Health"
                  subtitle="TherapyKin Resource"
                  filename="TherapyKin-Sleep-Mental-Health.pdf"
                  contentId="sleep-mental-health-content"
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
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Stress Management Guide</h4>
                      <p className="text-sm text-foreground/70 mb-2">Learn effective strategies to manage stress and improve wellbeing</p>
                      <Link href="/resources/stress-science" className="text-xs text-[var(--primary)] font-medium hover:underline">
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
                      <h4 className="font-medium mb-1">Progressive Muscle Relaxation</h4>
                      <p className="text-sm text-foreground/70 mb-2">Audio guide for a relaxation technique that can improve sleep</p>
                      <Link href="/resources/muscle-relaxation-audio" className="text-xs text-[var(--primary)] font-medium hover:underline">
                        View Resource →
                      </Link>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-[var(--primary)]/10 rounded flex items-center justify-center mr-3 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Self-Care Assessment</h4>
                      <p className="text-sm text-foreground/70 mb-2">Evaluate your self-care practices including sleep habits</p>
                      <Link href="/resources/self-care-assessment" className="text-xs text-[var(--primary)] font-medium hover:underline">
                        View Resource →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Quick Facts */}
              <div className="card p-6">
                <h3 className="text-lg font-semibold mb-4">Sleep Quick Facts</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sm text-foreground/70">Adults need 7-9 hours of sleep per night for optimal mental health</p>
                  </div>
                  
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sm text-foreground/70">REM sleep plays a crucial role in emotional processing and memory consolidation</p>
                  </div>
                  
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sm text-foreground/70">Just one night of poor sleep can increase anxiety levels by up to 30%</p>
                  </div>
                  
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sm text-foreground/70">Consistent sleep schedules help regulate your body's internal clock</p>
                  </div>
                  
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sm text-foreground/70">Blue light from screens can suppress melatonin production by up to 50%</p>
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
