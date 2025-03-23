'use client';

import React, { useState } from "react";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ShareButtons from "../../components/ShareButtons";
import PDFDownloadButton from "../../components/PDFDownloadButton";

export default function AnxietyGuide() {
  // State for active section (for mobile accordion view)
  const [activeSection, setActiveSection] = useState<string | null>("overview");
  
  // Toggle section visibility (for mobile)
  const toggleSection = (sectionId: string) => {
    if (activeSection === sectionId) {
      setActiveSection(null);
    } else {
      setActiveSection(sectionId);
    }
  };
  
  // Get the current URL for sharing
  const currentUrl = typeof window !== 'undefined' 
    ? window.location.href 
    : 'https://therapykin.ai/resources/anxiety-guide';
  
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
                      Understanding Anxiety
                    </span>
                  </div>
                </li>
              </ol>
            </nav>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div id="anxiety-guide-content" className="lg:w-2/3">
              {/* Resource Header */}
              <div className="mb-8">
                <span className="px-3 py-1 bg-[var(--primary)]/10 text-[var(--primary)] rounded-full text-sm font-medium">
                  Anxiety
                </span>
                <h1 className="text-3xl md:text-4xl font-bold mt-4 mb-4">Understanding Anxiety: A Comprehensive Guide</h1>
                <p className="text-xl text-foreground/70 mb-6">
                  Learn about the different types of anxiety disorders, their symptoms, and evidence-based treatment approaches.
                </p>
              </div>
              
              {/* Featured Image */}
              <div className="mb-8 rounded-xl overflow-hidden">
                <div className="aspect-w-16 aspect-h-9 bg-[var(--primary)]/10">
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-[var(--primary)]/20 to-[var(--accent)]/20">
                    <span className="text-[var(--primary)] font-medium">Anxiety Guide Image</span>
                  </div>
                </div>
              </div>
              
              {/* Introduction */}
              <section id="overview" className="mb-12">
                <h2 className="text-2xl font-bold mb-4">What is Anxiety?</h2>
                <p className="mb-4">
                  Anxiety is a natural human response to stress or perceived threats. It's characterized by feelings of tension, worried thoughts, and physical changes like increased blood pressure. While everyone experiences anxiety occasionally, anxiety disorders involve excessive fear or worry that interferes with daily activities.
                </p>
                <p className="mb-4">
                  This guide will help you understand the different types of anxiety disorders, recognize their symptoms, and explore evidence-based approaches for managing anxiety. Whether you're dealing with anxiety yourself or supporting someone who is, this resource provides a foundation for understanding this common but often misunderstood condition.
                </p>
                
                <div className="my-8 p-6 bg-[var(--primary)]/5 rounded-xl">
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="w-16 h-16 md:w-20 md:h-20 flex-shrink-0 rounded-full bg-[var(--primary)]/10 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-2">Important Note</h4>
                      <p className="text-foreground/80">
                        This guide is for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. If you're experiencing severe anxiety symptoms, please consult with a healthcare professional.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
              
              {/* Types of Anxiety Disorders */}
              <section id="types" className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Types of Anxiety Disorders</h2>
                
                <div className="space-y-6">
                  <div className="card p-6 hover:shadow-depth transition-all">
                    <h3 className="text-xl font-semibold mb-3">Generalized Anxiety Disorder (GAD)</h3>
                    <p className="mb-4">
                      Characterized by persistent and excessive worry about various things. People with GAD find it difficult to control their worry, which often interferes with daily activities.
                    </p>
                    <div className="bg-[var(--background-alt)] p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Common Symptoms:</h4>
                      <ul className="list-disc pl-5 space-y-1 text-foreground/70">
                        <li>Persistent worrying about many areas (health, work, etc.)</li>
                        <li>Overthinking plans and solutions to worst-case scenarios</li>
                        <li>Difficulty handling uncertainty</li>
                        <li>Inability to relax or feeling restless</li>
                        <li>Difficulty concentrating</li>
                        <li>Physical symptoms like fatigue, muscle tension, and sleep problems</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="card p-6 hover:shadow-depth transition-all">
                    <h3 className="text-xl font-semibold mb-3">Panic Disorder</h3>
                    <p className="mb-4">
                      Involves recurring unexpected panic attacks—sudden periods of intense fear that come on quickly and reach their peak within minutes.
                    </p>
                    <div className="bg-[var(--background-alt)] p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Common Symptoms:</h4>
                      <ul className="list-disc pl-5 space-y-1 text-foreground/70">
                        <li>Sudden and repeated attacks of intense fear</li>
                        <li>Feelings of being out of control during a panic attack</li>
                        <li>Intense worry about when the next attack will happen</li>
                        <li>Fear or avoidance of places where panic attacks have occurred</li>
                        <li>Physical symptoms like heart palpitations, shortness of breath, dizziness</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="card p-6 hover:shadow-depth transition-all">
                    <h3 className="text-xl font-semibold mb-3">Social Anxiety Disorder</h3>
                    <p className="mb-4">
                      Involves high levels of anxiety, fear, and avoidance of social situations due to feelings of embarrassment, self-consciousness, and concern about being judged or viewed negatively by others.
                    </p>
                    <div className="bg-[var(--background-alt)] p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Common Symptoms:</h4>
                      <ul className="list-disc pl-5 space-y-1 text-foreground/70">
                        <li>Intense fear of social situations where you might be judged</li>
                        <li>Worry about embarrassing or humiliating yourself</li>
                        <li>Intense anxiety about interacting with strangers</li>
                        <li>Fear that others will notice you're anxious</li>
                        <li>Avoidance of activities or speaking to people out of fear</li>
                        <li>Physical symptoms like blushing, sweating, trembling, nausea</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="card p-6 hover:shadow-depth transition-all">
                    <h3 className="text-xl font-semibold mb-3">Specific Phobias</h3>
                    <p className="mb-4">
                      Marked fear or anxiety about a specific object or situation that causes immediate anxiety and is actively avoided.
                    </p>
                    <div className="bg-[var(--background-alt)] p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Common Types:</h4>
                      <ul className="list-disc pl-5 space-y-1 text-foreground/70">
                        <li>Animal phobias (spiders, dogs, snakes)</li>
                        <li>Natural environment phobias (heights, storms, water)</li>
                        <li>Situational phobias (flying, elevators, enclosed spaces)</li>
                        <li>Blood-injection-injury phobias (needles, invasive medical procedures)</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="card p-6 hover:shadow-depth transition-all">
                    <h3 className="text-xl font-semibold mb-3">Obsessive-Compulsive Disorder (OCD)</h3>
                    <p className="mb-4">
                      Characterized by unreasonable thoughts and fears (obsessions) that lead to repetitive behaviors (compulsions). These obsessions and compulsions interfere with daily activities and cause significant distress.
                    </p>
                    <div className="bg-[var(--background-alt)] p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Common Symptoms:</h4>
                      <ul className="list-disc pl-5 space-y-1 text-foreground/70">
                        <li>Unwanted, intrusive thoughts or images that trigger distress</li>
                        <li>Repetitive behaviors or mental acts aimed at reducing anxiety</li>
                        <li>Rigid rules or patterns that must be followed</li>
                        <li>Excessive time spent on rituals that interfere with daily life</li>
                        <li>Recognition that the obsessive thoughts are unreasonable</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="card p-6 hover:shadow-depth transition-all">
                    <h3 className="text-xl font-semibold mb-3">Post-Traumatic Stress Disorder (PTSD)</h3>
                    <p className="mb-4">
                      Develops in some people who have experienced a shocking, scary, or dangerous event. People with PTSD may feel stressed or frightened even when they are no longer in danger.
                    </p>
                    <div className="bg-[var(--background-alt)] p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Common Symptoms:</h4>
                      <ul className="list-disc pl-5 space-y-1 text-foreground/70">
                        <li>Flashbacks, nightmares, or intrusive memories of the traumatic event</li>
                        <li>Avoidance of situations that remind you of the event</li>
                        <li>Negative changes in thinking and mood</li>
                        <li>Being easily startled or feeling tense</li>
                        <li>Difficulty sleeping or concentrating</li>
                        <li>Irritability, angry outbursts, or aggressive behavior</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>
              
              {/* Physical Symptoms */}
              <section id="physical-symptoms" className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Physical Symptoms of Anxiety</h2>
                
                <p className="mb-6">
                  Anxiety isn't just a mental experience—it produces very real physical symptoms. Understanding these physical manifestations can help you recognize when you're experiencing anxiety and take appropriate steps to manage it.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  <div className="card p-4 border border-foreground/10">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium">Cardiovascular</h4>
                        <p className="text-sm text-foreground/70">Increased heart rate, palpitations, chest pain</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="card p-4 border border-foreground/10">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium">Respiratory</h4>
                        <p className="text-sm text-foreground/70">Shortness of breath, rapid breathing, feeling of choking</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="card p-4 border border-foreground/10">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium">Digestive</h4>
                        <p className="text-sm text-foreground/70">Nausea, stomach pain, diarrhea, loss of appetite</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="card p-4 border border-foreground/10">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium">Neurological</h4>
                        <p className="text-sm text-foreground/70">Dizziness, lightheadedness, headaches, tingling sensations</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="card p-4 border border-foreground/10">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium">Muscular</h4>
                        <p className="text-sm text-foreground/70">Muscle tension, trembling, shaking, fatigue</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="card p-4 border border-foreground/10">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium">Other</h4>
                        <p className="text-sm text-foreground/70">Sweating, hot flashes, chills, sleep disturbances</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="card p-6 bg-[var(--background-alt)]">
                  <h3 className="text-lg font-semibold mb-3">The Anxiety Cycle</h3>
                  <p className="mb-4">
                    Physical symptoms of anxiety can create a feedback loop that intensifies anxiety. For example:
                  </p>
                  <ol className="list-decimal pl-5 space-y-2">
                    <li>You feel anxious about a situation</li>
                    <li>This triggers physical symptoms like a racing heart</li>
                    <li>You notice these symptoms and become worried about them</li>
                    <li>This worry increases your anxiety</li>
                    <li>The increased anxiety intensifies the physical symptoms</li>
                  </ol>
                  <p className="mt-4">
                    Breaking this cycle is an important part of managing anxiety. Recognizing that these physical sensations are symptoms of anxiety—not signs of a medical emergency—can help reduce the fear response to the symptoms themselves.
                  </p>
                </div>
              </section>
              
              {/* Treatment Approaches */}
              <section id="treatments" className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Evidence-Based Treatment Approaches</h2>
                
                <p className="mb-6">
                  Anxiety disorders are highly treatable, and many people experience significant improvement with appropriate treatment. Here are some of the most effective approaches:
                </p>
                
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Cognitive Behavioral Therapy (CBT)</h3>
                    <p className="mb-4">
                      CBT is one of the most effective treatments for anxiety disorders. It focuses on identifying, challenging, and changing unhelpful thought patterns and behaviors that trigger and maintain anxiety.
                    </p>
                    <div className="card p-5 shadow-sm hover:shadow-md transition-all">
                      <h4 className="font-medium mb-3">Key Components of CBT for Anxiety:</h4>
                      <ul className="list-disc pl-5 space-y-2 text-foreground/70">
                        <li>
                          <span className="font-medium text-foreground">Cognitive restructuring:</span> Identifying and challenging negative thought patterns and cognitive distortions
                        </li>
                        <li>
                          <span className="font-medium text-foreground">Exposure therapy:</span> Gradually facing feared situations or objects in a controlled, safe environment
                        </li>
                        <li>
                          <span className="font-medium text-foreground">Behavioral experiments:</span> Testing the validity of anxious predictions
                        </li>
                        <li>
                          <span className="font-medium text-foreground">Relaxation techniques:</span> Learning methods to reduce physical tension and promote calm
                        </li>
                        <li>
                          <span className="font-medium text-foreground">Mindfulness practices:</span> Developing awareness of thoughts without judgment
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Medication</h3>
                    <p className="mb-4">
                      Several types of medications have been found effective in treating anxiety disorders. These are typically prescribed by a psychiatrist or primary care physician.
                    </p>
                    <div className="card p-5 shadow-sm hover:shadow-md transition-all">
                      <h4 className="font-medium mb-3">Common Medications for Anxiety:</h4>
                      <ul className="list-disc pl-5 space-y-2 text-foreground/70">
                        <li>
                          <span className="font-medium text-foreground">Selective Serotonin Reuptake Inhibitors (SSRIs):</span> Often the first-line medication treatment for anxiety (e.g., sertraline, escitalopram)
                        </li>
                        <li>
                          <span className="font-medium text-foreground">Serotonin-Norepinephrine Reuptake Inhibitors (SNRIs):</span> Another class of antidepressants used for anxiety (e.g., venlafaxine, duloxetine)
                        </li>
                        <li>
                          <span className="font-medium text-foreground">Benzodiazepines:</span> Fast-acting medications for acute anxiety, but with potential for dependence (e.g., alprazolam, clonazepam)
                        </li>
                        <li>
                          <span className="font-medium text-foreground">Buspirone:</span> An anti-anxiety medication that works differently than benzodiazepines
                        </li>
                        <li>
                          <span className="font-medium text-foreground">Beta-blockers:</span> Can help manage physical symptoms of anxiety in specific situations
                        </li>
                      </ul>
                      <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                        <p className="text-sm text-yellow-800 dark:text-yellow-200">
                          <strong>Important:</strong> Medication should always be taken under the supervision of a healthcare provider. Never start or stop medication without consulting your doctor.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Mindfulness and Relaxation Techniques</h3>
                    <p className="mb-4">
                      These approaches help reduce the physical and psychological symptoms of anxiety by promoting relaxation and present-moment awareness.
                    </p>
                    <div className="card p-5 shadow-sm hover:shadow-md transition-all">
                      <h4 className="font-medium mb-3">Effective Techniques:</h4>
                      <ul className="list-disc pl-5 space-y-2 text-foreground/70">
                        <li>
                          <span className="font-medium text-foreground">Deep breathing exercises:</span> Slow, diaphragmatic breathing to reduce physical arousal
                        </li>
                        <li>
                          <span className="font-medium text-foreground">Progressive muscle relaxation:</span> Systematically tensing and relaxing muscle groups
                        </li>
                        <li>
                          <span className="font-medium text-foreground">Mindfulness meditation:</span> Focusing attention on the present moment without judgment
                        </li>
                        <li>
                          <span className="font-medium text-foreground">Guided imagery:</span> Visualizing peaceful scenes or situations
                        </li>
                        <li>
                          <span className="font-medium text-foreground">Body scan meditation:</span> Bringing attention to each part of the body sequentially
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Lifestyle Changes</h3>
                    <p className="mb-4">
                      Certain lifestyle modifications can significantly reduce anxiety symptoms and improve overall wellbeing.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="card p-4 border border-foreground/10">
                        <div className="flex items-start">
                          <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium">Regular Exercise</h4>
                            <p className="text-sm text-foreground/70">Physical activity reduces stress hormones and increases endorphins</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="card p-4 border border-foreground/10">
                        <div className="flex items-start">
                          <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium">Adequate Sleep</h4>
                            <p className="text-sm text-foreground/70">Poor sleep increases anxiety; aim for 7-9 hours of quality sleep</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="card p-4 border border-foreground/10">
                        <div className="flex items-start">
                          <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium">Balanced Nutrition</h4>
                            <p className="text-sm text-foreground/70">Limit caffeine, alcohol, and sugar; eat regular, balanced meals</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="card p-4 border border-foreground/10">
                        <div className="flex items-start">
                          <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium">Social Support</h4>
                            <p className="text-sm text-foreground/70">Maintain connections with supportive friends and family</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="card p-4 border border-foreground/10">
                        <div className="flex items-start">
                          <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium">Time Management</h4>
                            <p className="text-sm text-foreground/70">Set realistic goals, prioritize tasks, and include breaks</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="card p-4 border border-foreground/10">
                        <div className="flex items-start">
                          <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium">Limit Stimulants</h4>
                            <p className="text-sm text-foreground/70">Reduce or eliminate caffeine, nicotine, and other stimulants</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              
              {/* Self-Help Strategies */}
              <section id="self-help" className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Self-Help Strategies for Managing Anxiety</h2>
                
                <p className="mb-6">
                  While professional treatment is important for anxiety disorders, there are many effective strategies you can use on your own to reduce anxiety symptoms and improve your quality of life.
                </p>
                
                <div className="space-y-6">
                  <div className="card p-6 hover:shadow-depth transition-all">
                    <h3 className="text-xl font-semibold mb-3">Practice Deep Breathing</h3>
                    <p className="mb-4">
                      Deep breathing activates your parasympathetic nervous system, which helps calm your body's stress response.
                    </p>
                    <div className="bg-[var(--background-alt)] p-4 rounded-lg">
                      <h4 className="font-medium mb-2">4-7-8 Breathing Technique:</h4>
                      <ol className="list-decimal pl-5 space-y-1 text-foreground/70">
                        <li>Sit comfortably with your back straight</li>
                        <li>Inhale quietly through your nose for 4 seconds</li>
                        <li>Hold your breath for 7 seconds</li>
                        <li>Exhale completely through your mouth for 8 seconds</li>
                        <li>Repeat 3-4 times</li>
                      </ol>
                    </div>
                  </div>
                  
                  <div className="card p-6 hover:shadow-depth transition-all">
                    <h3 className="text-xl font-semibold mb-3">Challenge Negative Thoughts</h3>
                    <p className="mb-4">
                      Anxiety often involves catastrophic thinking and overestimation of threats. Learning to identify and challenge these thoughts can reduce anxiety.
                    </p>
                    <div className="bg-[var(--background-alt)] p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Thought Challenge Process:</h4>
                      <ol className="list-decimal pl-5 space-y-1 text-foreground/70">
                        <li>Identify the anxious thought (e.g., "I'll definitely fail this presentation")</li>
                        <li>Examine the evidence for and against this thought</li>
                        <li>Consider alternative perspectives (e.g., "I've prepared well and succeeded in similar situations")</li>
                        <li>Develop a more balanced thought (e.g., "I might be nervous, but I can still deliver an effective presentation")</li>
                      </ol>
                    </div>
                  </div>
                  
                  <div className="card p-6 hover:shadow-depth transition-all">
                    <h3 className="text-xl font-semibold mb-3">Practice Mindfulness</h3>
                    <p className="mb-4">
                      Mindfulness involves paying attention to the present moment without judgment. Regular practice can reduce anxiety by helping you disengage from worries about the future.
                    </p>
                    <div className="bg-[var(--background-alt)] p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Simple Mindfulness Exercise:</h4>
                      <ol className="list-decimal pl-5 space-y-1 text-foreground/70">
                        <li>Find a quiet place to sit comfortably</li>
                        <li>Focus your attention on your breath</li>
                        <li>When your mind wanders (which is normal), gently bring your attention back to your breath</li>
                        <li>Start with 5 minutes daily and gradually increase</li>
                      </ol>
                    </div>
                  </div>
                  
                  <div className="card p-6 hover:shadow-depth transition-all">
                    <h3 className="text-xl font-semibold mb-3">Gradual Exposure</h3>
                    <p className="mb-4">
                      Avoiding anxiety-provoking situations reinforces anxiety. Gradually facing feared situations can help reduce anxiety over time.
                    </p>
                    <div className="bg-[var(--background-alt)] p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Creating an Exposure Hierarchy:</h4>
                      <ol className="list-decimal pl-5 space-y-1 text-foreground/70">
                        <li>Make a list of situations that trigger your anxiety, from least to most anxiety-provoking</li>
                        <li>Start with the least anxiety-provoking situation</li>
                        <li>Stay in the situation until your anxiety begins to decrease</li>
                        <li>Repeat until that situation no longer causes significant anxiety</li>
                        <li>Gradually work your way up the hierarchy</li>
                      </ol>
                    </div>
                  </div>
                  
                  <div className="card p-6 hover:shadow-depth transition-all">
                    <h3 className="text-xl font-semibold mb-3">Limit Information Consumption</h3>
                    <p className="mb-4">
                      Constant exposure to news and social media can increase anxiety. Setting boundaries around information consumption can help.
                    </p>
                    <div className="bg-[var(--background-alt)] p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Media Consumption Guidelines:</h4>
                      <ul className="list-disc pl-5 space-y-1 text-foreground/70">
                        <li>Set specific times to check news and social media</li>
                        <li>Limit consumption to 30 minutes or less per day</li>
                        <li>Use apps that limit screen time</li>
                        <li>Choose reputable sources of information</li>
                        <li>Take regular "digital detox" periods</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="card p-6 hover:shadow-depth transition-all">
                    <h3 className="text-xl font-semibold mb-3">Maintain a Worry Journal</h3>
                    <p className="mb-4">
                      Writing down worries can help externalize them and reduce their power. It also creates space between you and your thoughts.
                    </p>
                    <div className="bg-[var(--background-alt)] p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Journaling Process:</h4>
                      <ol className="list-decimal pl-5 space-y-1 text-foreground/70">
                        <li>Set aside 15-20 minutes for "worry time" each day</li>
                        <li>Write down all your worries and concerns</li>
                        <li>For each worry, note whether it's within your control</li>
                        <li>For controllable worries, brainstorm potential solutions</li>
                        <li>For uncontrollable worries, practice acceptance</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </section>
              
              {/* When to Seek Professional Help */}
              <section id="professional-help" className="mb-12">
                <h2 className="text-2xl font-bold mb-6">When to Seek Professional Help</h2>
                
                <p className="mb-6">
                  While self-help strategies can be effective for mild anxiety, it's important to know when professional help is needed. Consider seeking professional support if:
                </p>
                
                <div className="card p-6 bg-[var(--primary)]/5 mb-8">
                  <ul className="list-disc pl-5 space-y-3">
                    <li>Your anxiety interferes with daily activities, work, or relationships</li>
                    <li>You experience panic attacks or intense, overwhelming anxiety</li>
                    <li>You avoid important activities or situations because of anxiety</li>
                    <li>You use alcohol or drugs to cope with anxiety</li>
                    <li>You experience both anxiety and depression</li>
                    <li>You have thoughts of harming yourself or feelings that life isn't worth living</li>
                    <li>Self-help strategies haven't provided sufficient relief</li>
                  </ul>
                </div>
                
                <div className="card p-6 shadow-depth">
                  <h3 className="text-xl font-semibold mb-4">Types of Mental Health Professionals</h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium">Psychiatrists</h4>
                        <p className="text-sm text-foreground/70">Medical doctors who can diagnose mental health conditions and prescribe medication</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium">Psychologists</h4>
                        <p className="text-sm text-foreground/70">Mental health professionals who provide therapy and psychological testing</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium">Licensed Therapists or Counselors</h4>
                        <p className="text-sm text-foreground/70">Mental health professionals who provide therapy and counseling (e.g., LPC, LMFT, LCSW)</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium">Primary Care Physicians</h4>
                        <p className="text-sm text-foreground/70">Can provide initial assessment and referrals to specialists</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              
              {/* Supporting Someone with Anxiety */}
              <section id="supporting-others" className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Supporting Someone with Anxiety</h2>
                
                <p className="mb-6">
                  If someone you care about is experiencing anxiety, there are ways you can provide support while encouraging them to seek appropriate help.
                </p>
                
                <div className="space-y-6">
                  <div className="card p-5 shadow-sm hover:shadow-md transition-all">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium mb-2">Educate Yourself</h3>
                        <p className="text-foreground/70">
                          Learn about anxiety disorders to better understand what your loved one is experiencing. This guide is a good starting point.
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
                        <h3 className="font-medium mb-2">Listen Without Judgment</h3>
                        <p className="text-foreground/70">
                          Create a safe space for them to express their feelings without fear of criticism or dismissal. Avoid saying things like "just relax" or "don't worry about it."
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="card p-5 shadow-sm hover:shadow-md transition-all">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium mb-2">Ask How You Can Help</h3>
                        <p className="text-foreground/70">
                          Different people need different kinds of support. Ask what would be most helpful rather than assuming you know what they need.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="card p-5 shadow-sm hover:shadow-md transition-all">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium mb-2">Encourage Professional Help</h3>
                        <p className="text-foreground/70">
                          Gently suggest seeking professional support if their anxiety is interfering with daily life. Offer to help them find resources or accompany them to appointments if needed.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="card p-5 shadow-sm hover:shadow-md transition-all">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium mb-2">Be Patient</h3>
                        <p className="text-foreground/70">
                          Recovery from anxiety takes time. Be patient and celebrate small victories along the way.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="card p-5 shadow-sm hover:shadow-md transition-all">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium mb-2">Take Care of Yourself</h3>
                        <p className="text-foreground/70">
                          Supporting someone with anxiety can be challenging. Make sure to attend to your own mental health and seek support if needed.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              
              {/* Conclusion */}
              <section id="conclusion" className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Conclusion</h2>
                <p className="mb-4">
                  Anxiety disorders are common but treatable conditions. With the right combination of professional help, self-care strategies, and support, most people can significantly reduce their anxiety symptoms and improve their quality of life.
                </p>
                <p className="mb-4">
                  Remember that seeking help for anxiety is a sign of strength, not weakness. If you're struggling with anxiety, you're not alone, and effective support is available.
                </p>
                <p>
                  This guide provides general information about anxiety disorders, but everyone's experience is unique. Working with healthcare professionals can help you develop a personalized approach to managing your specific anxiety symptoms.
                </p>
              </section>
              
              {/* Additional Resources */}
              <section id="resources" className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Additional Resources</h2>
                
                <div className="space-y-4">
                  <div className="card p-4 hover:shadow-depth transition-all">
                    <h3 className="font-semibold mb-2">National Organizations</h3>
                    <ul className="list-disc pl-5 space-y-1 text-foreground/70">
                      <li>
                        <a href="https://adaa.org/" target="_blank" rel="noopener noreferrer" className="text-[var(--primary)] hover:underline">
                          Anxiety and Depression Association of America (ADAA)
                        </a>
                      </li>
                      <li>
                        <a href="https://www.nimh.nih.gov/health/topics/anxiety-disorders" target="_blank" rel="noopener noreferrer" className="text-[var(--primary)] hover:underline">
                          National Institute of Mental Health (NIMH)
                        </a>
                      </li>
                      <li>
                        <a href="https://www.nami.org/About-Mental-Illness/Mental-Health-Conditions/Anxiety-Disorders" target="_blank" rel="noopener noreferrer" className="text-[var(--primary)] hover:underline">
                          National Alliance on Mental Illness (NAMI)
                        </a>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="card p-4 hover:shadow-depth transition-all">
                    <h3 className="font-semibold mb-2">Crisis Support</h3>
                    <ul className="list-disc pl-5 space-y-1 text-foreground/70">
                      <li>
                        <strong>National Suicide Prevention Lifeline:</strong> 1-800-273-8255
                      </li>
                      <li>
                        <strong>Crisis Text Line:</strong> Text HOME to 741741
                      </li>
                    </ul>
                  </div>
                  
                  <div className="card p-4 hover:shadow-depth transition-all">
                    <h3 className="font-semibold mb-2">Books on Anxiety Management</h3>
                    <ul className="list-disc pl-5 space-y-1 text-foreground/70">
                      <li>"The Anxiety and Worry Workbook" by David A. Clark and Aaron T. Beck</li>
                      <li>"Dare: The New Way to End Anxiety and Stop Panic Attacks" by Barry McDonagh</li>
                      <li>"The Anxiety and Phobia Workbook" by Edmund J. Bourne</li>
                      <li>"Hope and Help for Your Nerves" by Claire Weekes</li>
                    </ul>
                  </div>
                  
                  <div className="card p-4 hover:shadow-depth transition-all">
                    <h3 className="font-semibold mb-2">Apps for Anxiety Management</h3>
                    <ul className="list-disc pl-5 space-y-1 text-foreground/70">
                      <li>Calm</li>
                      <li>Headspace</li>
                      <li>Woebot</li>
                      <li>MindShift CBT</li>
                      <li>TherapyKin</li>
                    </ul>
                  </div>
                  
                  <div className="card p-4 hover:shadow-depth transition-all">
                    <h3 className="font-semibold mb-2">Related Resources in Our Library</h3>
                    <ul className="list-disc pl-5 space-y-1 text-foreground/70">
                      <li>
                        <Link href="/resources/mindfulness-guide" className="text-[var(--primary)] hover:underline">
                          Mindfulness Meditation for Beginners
                        </Link>
                      </li>
                      <li>
                        <Link href="/resources/cbt-worksheets" className="text-[var(--primary)] hover:underline">
                          Cognitive Behavioral Therapy Worksheets
                        </Link>
                      </li>
                      <li>
                        <Link href="/resources/muscle-relaxation-audio" className="text-[var(--primary)] hover:underline">
                          Guided Progressive Muscle Relaxation
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>
              
              {/* Share Links */}
              <div className="mb-12">
                <h3 className="font-semibold mb-4">Share this resource</h3>
                <ShareButtons 
                  title="Understanding Anxiety: A Comprehensive Guide" 
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
                  <a href="#overview" className="block text-foreground/70 hover:text-[var(--primary)] py-1 border-l-2 border-transparent hover:border-[var(--primary)] pl-3 transition-all">
                    What is Anxiety?
                  </a>
                  <a href="#types" className="block text-foreground/70 hover:text-[var(--primary)] py-1 border-l-2 border-transparent hover:border-[var(--primary)] pl-3 transition-all">
                    Types of Anxiety Disorders
                  </a>
                  <a href="#physical-symptoms" className="block text-foreground/70 hover:text-[var(--primary)] py-1 border-l-2 border-transparent hover:border-[var(--primary)] pl-3 transition-all">
                    Physical Symptoms
                  </a>
                  <a href="#treatments" className="block text-foreground/70 hover:text-[var(--primary)] py-1 border-l-2 border-transparent hover:border-[var(--primary)] pl-3 transition-all">
                    Treatment Approaches
                  </a>
                  <a href="#self-help" className="block text-foreground/70 hover:text-[var(--primary)] py-1 border-l-2 border-transparent hover:border-[var(--primary)] pl-3 transition-all">
                    Self-Help Strategies
                  </a>
                  <a href="#professional-help" className="block text-foreground/70 hover:text-[var(--primary)] py-1 border-l-2 border-transparent hover:border-[var(--primary)] pl-3 transition-all">
                    When to Seek Professional Help
                  </a>
                  <a href="#supporting-others" className="block text-foreground/70 hover:text-[var(--primary)] py-1 border-l-2 border-transparent hover:border-[var(--primary)] pl-3 transition-all">
                    Supporting Someone with Anxiety
                  </a>
                  <a href="#conclusion" className="block text-foreground/70 hover:text-[var(--primary)] py-1 border-l-2 border-transparent hover:border-[var(--primary)] pl-3 transition-all">
                    Conclusion
                  </a>
                  <a href="#resources" className="block text-foreground/70 hover:text-[var(--primary)] py-1 border-l-2 border-transparent hover:border-[var(--primary)] pl-3 transition-all">
                    Additional Resources
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
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">CBT Worksheets</h4>
                      <p className="text-sm text-foreground/70 mb-2">Printable worksheets to help identify and challenge negative thoughts</p>
                      <Link href="/resources/cbt-worksheets" className="text-xs text-[var(--primary)] font-medium hover:underline">
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
                      <h4 className="font-medium mb-1">Guided Relaxation</h4>
                      <p className="text-sm text-foreground/70 mb-2">Audio guide for progressive muscle relaxation technique</p>
                      <Link href="/resources/muscle-relaxation-audio" className="text-xs text-[var(--primary)] font-medium hover:underline">
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
                  title="Understanding Anxiety: A Comprehensive Guide"
                  subtitle="TherapyKin Resource Library"
                  filename="TherapyKin-Anxiety-Guide.pdf"
                  contentId="anxiety-guide-content"
                  className="w-full btn-primary text-sm py-2"
                />
              </div>
              
              {/* Need Help? */}
              <div className="card p-6">
                <h3 className="text-lg font-semibold mb-4">Need Help Now?</h3>
                <p className="text-sm text-foreground/70 mb-4">
                  If you're experiencing severe anxiety or having thoughts of harming yourself, please reach out for immediate support.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="font-medium">National Suicide Prevention Lifeline:</span>
                  </div>
                  <p className="pl-7">1-800-273-8255</p>
                  
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                    <span className="font-medium">Crisis Text Line:</span>
                  </div>
                  <p className="pl-7">Text HOME to 741741</p>
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
