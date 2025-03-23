'use client';

import React, { useState } from "react";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ShareButtons from "../../components/ShareButtons";
import PDFDownloadButton from "../../components/PDFDownloadButton";

// Depression symptoms checklist
const depressionSymptoms = [
  { id: "mood", text: "Persistent sad, anxious, or \"empty\" mood" },
  { id: "pleasure", text: "Loss of interest or pleasure in hobbies and activities" },
  { id: "sleep", text: "Sleep disturbances (insomnia, early-morning awakening, or oversleeping)" },
  { id: "appetite", text: "Changes in appetite or weight (decrease or increase)" },
  { id: "energy", text: "Decreased energy, fatigue, or feeling slowed down" },
  { id: "worthless", text: "Feelings of worthlessness, hopelessness, or helplessness" },
  { id: "guilt", text: "Excessive guilt" },
  { id: "concentration", text: "Difficulty concentrating, remembering, or making decisions" },
  { id: "restless", text: "Restlessness or irritability" },
  { id: "physical", text: "Persistent physical symptoms (headaches, digestive issues, pain)" },
  { id: "death", text: "Thoughts of death or suicide, or suicide attempts" }
];

// Types of depression
const depressionTypes = [
  {
    id: "mdd",
    name: "Major Depressive Disorder (MDD)",
    description: "Also known as clinical depression, characterized by persistent feelings of sadness, hopelessness, and loss of interest in activities for at least two weeks, significantly impacting daily functioning."
  },
  {
    id: "persistent",
    name: "Persistent Depressive Disorder",
    description: "Formerly known as dysthymia, this is a chronic form of depression where symptoms last for at least two years, though they may be less severe than in major depression."
  },
  {
    id: "bipolar",
    name: "Bipolar Depression",
    description: "The depressive phase of bipolar disorder, characterized by episodes of depression alternating with periods of abnormally elevated mood (mania or hypomania)."
  },
  {
    id: "seasonal",
    name: "Seasonal Affective Disorder (SAD)",
    description: "Depression that occurs during particular seasons, most commonly in winter months when there is less natural sunlight."
  },
  {
    id: "postpartum",
    name: "Postpartum Depression",
    description: "Depression that occurs after childbirth, characterized by feelings of extreme sadness, anxiety, and exhaustion that make it difficult for new mothers to care for themselves and their babies."
  },
  {
    id: "psychotic",
    name: "Depression with Psychotic Features",
    description: "Severe depression accompanied by psychosis, which may include delusions or hallucinations, often with depressive or negative themes."
  },
  {
    id: "situational",
    name: "Situational Depression",
    description: "A short-term form of depression that occurs in response to a traumatic event or significant life change, also known as adjustment disorder with depressed mood."
  }
];

// Treatment options
const treatmentOptions = [
  {
    id: "psychotherapy",
    name: "Psychotherapy",
    description: "Talk therapy approaches that help individuals understand and manage their depression.",
    types: [
      { name: "Cognitive Behavioral Therapy (CBT)", description: "Focuses on identifying and changing negative thought patterns and behaviors that contribute to depression." },
      { name: "Interpersonal Therapy (IPT)", description: "Addresses problems in personal relationships that may contribute to depression." },
      { name: "Psychodynamic Therapy", description: "Explores unconscious conflicts and patterns from the past that may influence current feelings and behaviors." },
      { name: "Acceptance and Commitment Therapy (ACT)", description: "Helps individuals accept difficult thoughts and feelings while committing to behaviors that improve and enrich life." }
    ]
  },
  {
    id: "medication",
    name: "Medication",
    description: "Antidepressant medications that help regulate brain chemistry affecting mood and emotions.",
    types: [
      { name: "Selective Serotonin Reuptake Inhibitors (SSRIs)", description: "The most commonly prescribed antidepressants, which increase levels of serotonin in the brain." },
      { name: "Serotonin and Norepinephrine Reuptake Inhibitors (SNRIs)", description: "Increase levels of both serotonin and norepinephrine in the brain." },
      { name: "Atypical Antidepressants", description: "Work differently than SSRIs and SNRIs but are also effective in treating depression." },
      { name: "Tricyclic Antidepressants", description: "Older medications that are effective but often have more side effects than newer options." },
      { name: "Monoamine Oxidase Inhibitors (MAOIs)", description: "Usually prescribed when other medications haven't worked, requiring dietary restrictions." }
    ]
  },
  {
    id: "brain-stimulation",
    name: "Brain Stimulation Therapies",
    description: "Procedures that stimulate the brain directly, typically used when other treatments haven't been effective.",
    types: [
      { name: "Electroconvulsive Therapy (ECT)", description: "Uses electrical currents to trigger a brief seizure, which causes changes in brain chemistry that can reverse symptoms of depression." },
      { name: "Transcranial Magnetic Stimulation (TMS)", description: "Uses magnetic fields to stimulate nerve cells in the brain to improve symptoms of depression." },
      { name: "Vagus Nerve Stimulation (VNS)", description: "Involves implanting a device that stimulates the vagus nerve with electrical impulses." }
    ]
  },
  {
    id: "lifestyle",
    name: "Lifestyle Changes",
    description: "Modifications to daily habits that can help manage depression symptoms.",
    types: [
      { name: "Regular Physical Activity", description: "Exercise can increase endorphins and other feel-good brain chemicals while decreasing stress hormones." },
      { name: "Healthy Diet", description: "Proper nutrition supports brain health and can influence mood regulation." },
      { name: "Sleep Hygiene", description: "Establishing regular sleep patterns helps regulate mood and energy levels." },
      { name: "Stress Reduction", description: "Practices like mindfulness, meditation, and deep breathing can help manage stress that contributes to depression." },
      { name: "Social Connection", description: "Maintaining relationships and avoiding isolation can provide emotional support and improve mood." }
    ]
  },
  {
    id: "complementary",
    name: "Complementary Approaches",
    description: "Additional therapies that may be used alongside conventional treatments.",
    types: [
      { name: "Light Therapy", description: "Exposure to artificial light, particularly helpful for seasonal affective disorder." },
      { name: "Acupuncture", description: "Traditional Chinese medicine practice that may help alleviate depression symptoms for some people." },
      { name: "Mindfulness-Based Cognitive Therapy", description: "Combines mindfulness practices with cognitive therapy to prevent depression relapse." },
      { name: "Yoga and Tai Chi", description: "Mind-body practices that combine physical postures, breathing exercises, and meditation." }
    ]
  }
];

export default function DepressionGuide() {
  // State for active section (for mobile accordion view)
  const [activeSection, setActiveSection] = useState<string | null>("introduction");
  
  // State for symptom checklist
  const [checkedSymptoms, setCheckedSymptoms] = useState<Record<string, boolean>>({});
  
  // State for expanded treatment types
  const [expandedTreatment, setExpandedTreatment] = useState<string | null>(null);
  
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
  
  // Toggle treatment expansion
  const toggleTreatment = (treatmentId: string) => {
    if (expandedTreatment === treatmentId) {
      setExpandedTreatment(null);
    } else {
      setExpandedTreatment(treatmentId);
    }
  };
  
  // Count checked symptoms
  const checkedSymptomsCount = Object.values(checkedSymptoms).filter(Boolean).length;
  
  // Get the current URL for sharing
  const currentUrl = typeof window !== 'undefined' 
    ? window.location.href 
    : 'https://therapykin.ai/resources/depression-guide';
  
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
                      Depression Guide
                    </span>
                  </div>
                </li>
              </ol>
            </nav>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div id="depression-guide-content" className="lg:w-2/3">
              {/* Resource Header */}
              <div className="mb-8">
                <span className="px-3 py-1 bg-[var(--primary)]/10 text-[var(--primary)] rounded-full text-sm font-medium">
                  Depression
                </span>
                <h1 className="text-3xl md:text-4xl font-bold mt-4 mb-4">Depression: Signs, Symptoms, and Treatment Options</h1>
                <p className="text-xl text-foreground/70 mb-6">
                  A comprehensive overview of depression, including how to recognize symptoms and the most effective treatment approaches.
                </p>
              </div>
              
              {/* Introduction */}
              <section id="introduction" className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Understanding Depression</h2>
                <p className="mb-4">
                  Depression (major depressive disorder) is a common and serious medical illness that negatively affects how you feel, think, and act. It is more than just feeling sad or going through a rough patch—it's a persistent condition that requires understanding, treatment, and support.
                </p>
                <p className="mb-4">
                  Unlike normal feelings of sadness or grief, clinical depression doesn't go away on its own and can lead to a variety of emotional and physical problems if left untreated. The good news is that depression is highly treatable, with most people who seek help experiencing significant improvement.
                </p>
                
                <div className="my-8 p-6 bg-[var(--primary)]/5 rounded-xl">
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="w-16 h-16 md:w-20 md:h-20 flex-shrink-0 rounded-full bg-[var(--primary)]/10 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-2">Depression By The Numbers</h4>
                      <ul className="text-foreground/80 space-y-2">
                        <li>• Depression affects approximately 280 million people worldwide</li>
                        <li>• It's a leading cause of disability globally</li>
                        <li>• About 1 in 6 people will experience depression at some point in their life</li>
                        <li>• Depression can affect anyone, regardless of age, gender, or background</li>
                        <li>• With proper treatment, 80-90% of people with depression eventually respond well</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <p className="mb-4">
                  This guide will help you understand the different types of depression, recognize its symptoms, learn about its causes, and explore the most effective treatment options available today.
                </p>
                
                <div className="card p-6 shadow-depth mb-8">
                  <h3 className="text-xl font-semibold mb-4">Important Note</h3>
                  <p className="text-foreground/80 mb-4">
                    If you're experiencing thoughts of harming yourself or others, please seek immediate help:
                  </p>
                  <ul className="space-y-2 text-foreground/80">
                    <li>• Call your local emergency number (911 in the US)</li>
                    <li>• Call the National Suicide Prevention Lifeline: 988 or 1-800-273-8255</li>
                    <li>• Text HOME to the Crisis Text Line at 741741</li>
                    <li>• Go to your nearest emergency room</li>
                  </ul>
                </div>
              </section>
              
              {/* Types of Depression */}
              <section id="types" className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Types of Depression</h2>
                <p className="mb-6">
                  Depression isn't a one-size-fits-all condition. There are several types of depression, each with its own characteristics, symptoms, and treatment considerations.
                </p>
                
                <div className="space-y-6">
                  {depressionTypes.map(type => (
                    <div key={type.id} className="card p-6 shadow-sm hover:shadow-depth transition-all">
                      <h3 className="text-xl font-semibold mb-2">{type.name}</h3>
                      <p className="text-foreground/70">{type.description}</p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-[var(--background-alt)] rounded-lg">
                  <p className="text-sm text-foreground/70">
                    <strong>Note:</strong> These categories aren't rigid, and many people may experience symptoms that overlap between different types of depression. A professional diagnosis is important for proper treatment.
                  </p>
                </div>
              </section>
              
              {/* Signs and Symptoms */}
              <section id="symptoms" className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Signs and Symptoms</h2>
                <p className="mb-4">
                  Depression affects different people in different ways. Symptoms can vary in severity, frequency, and duration. To be diagnosed with clinical depression, symptoms must be present for at least two weeks and represent a change from previous functioning.
                </p>
                
                <div className="card p-6 shadow-depth mb-8">
                  <h3 className="text-xl font-semibold mb-4">Depression Symptom Checklist</h3>
                  <p className="text-foreground/70 mb-4">
                    Check any symptoms you've been experiencing consistently for two weeks or longer:
                  </p>
                  
                  <div className="space-y-3">
                    {depressionSymptoms.map(symptom => (
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
                        Check the symptoms you've been experiencing to see a personalized message.
                      </p>
                    ) : checkedSymptomsCount >= 5 ? (
                      <div>
                        <p className="font-medium mb-2">
                          You've checked {checkedSymptomsCount} symptoms, which may indicate significant depressive symptoms.
                        </p>
                        <p className="text-foreground/70">
                          Consider speaking with a healthcare provider about your symptoms. Remember, this is not a diagnostic tool, but it can help you have an informed conversation with a professional.
                        </p>
                      </div>
                    ) : checkedSymptomsCount >= 2 ? (
                      <div>
                        <p className="font-medium mb-2">
                          You've checked {checkedSymptomsCount} symptoms, which may indicate some depressive symptoms.
                        </p>
                        <p className="text-foreground/70">
                          If these symptoms are causing distress or interfering with your daily life, consider discussing them with a healthcare provider.
                        </p>
                      </div>
                    ) : (
                      <div>
                        <p className="font-medium mb-2">
                          You've checked {checkedSymptomsCount} symptom.
                        </p>
                        <p className="text-foreground/70">
                          While this alone may not indicate depression, pay attention to how it affects your life. If you're concerned, consider discussing it with a healthcare provider.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold mb-4">How Depression Can Present Differently</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="card p-5">
                    <h4 className="font-medium mb-2">In Children and Teens</h4>
                    <ul className="list-disc pl-5 space-y-1 text-foreground/70">
                      <li>Irritability or anger rather than sadness</li>
                      <li>Physical complaints (stomachaches, headaches)</li>
                      <li>Social withdrawal</li>
                      <li>Changes in academic performance</li>
                      <li>Extreme sensitivity to rejection or failure</li>
                    </ul>
                  </div>
                  
                  <div className="card p-5">
                    <h4 className="font-medium mb-2">In Older Adults</h4>
                    <ul className="list-disc pl-5 space-y-1 text-foreground/70">
                      <li>Memory difficulties or personality changes</li>
                      <li>Physical aches and pains</li>
                      <li>Fatigue, loss of appetite, sleep problems</li>
                      <li>Less willingness to try new things</li>
                      <li>Suicidal thinking (especially in older men)</li>
                    </ul>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="card p-5">
                    <h4 className="font-medium mb-2">In Men</h4>
                    <ul className="list-disc pl-5 space-y-1 text-foreground/70">
                      <li>Anger, irritability, or aggressiveness</li>
                      <li>Feeling anxious, restless, or "on edge"</li>
                      <li>Loss of interest in work, family, or hobbies</li>
                      <li>Substance abuse</li>
                      <li>Engaging in high-risk activities</li>
                    </ul>
                  </div>
                  
                  <div className="card p-5">
                    <h4 className="font-medium mb-2">In Women</h4>
                    <ul className="list-disc pl-5 space-y-1 text-foreground/70">
                      <li>Pronounced feelings of guilt or worthlessness</li>
                      <li>Increased anxiety or rumination</li>
                      <li>Eating and weight changes</li>
                      <li>Sleep disturbances</li>
                      <li>Specific types like premenstrual, perinatal, or postpartum depression</li>
                    </ul>
                  </div>
                </div>
              </section>
              
              {/* Causes and Risk Factors */}
              <section id="causes" className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Causes and Risk Factors</h2>
                <p className="mb-6">
                  Depression is a complex condition that typically results from a combination of factors rather than a single cause. Understanding these factors can help in prevention, early intervention, and treatment.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="card p-6">
                    <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mb-4 text-[var(--primary)]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Biological Factors</h3>
                    <ul className="list-disc pl-5 space-y-2 text-foreground/70">
                      <li>
                        <strong>Brain Chemistry:</strong> Imbalances in neurotransmitters like serotonin, dopamine, and norepinephrine
                      </li>
                      <li>
                        <strong>Genetics:</strong> Family history of depression increases risk
                      </li>
                      <li>
                        <strong>Medical Conditions:</strong> Chronic illness, pain, or certain neurological disorders
                      </li>
                      <li>
                        <strong>Hormonal Changes:</strong> During pregnancy, postpartum, menopause, or thyroid problems
                      </li>
                    </ul>
                  </div>
                  
                  <div className="card p-6">
                    <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mb-4 text-[var(--primary)]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Psychological Factors</h3>
                    <ul className="list-disc pl-5 space-y-2 text-foreground/70">
                      <li>
                        <strong>Personality Traits:</strong> Low self-esteem, pessimism, or being easily overwhelmed by stress
                      </li>
                      <li>
                        <strong>Early Childhood Trauma:</strong> Adverse childhood experiences
                      </li>
                      <li>
                        <strong>Cognitive Patterns:</strong> Negative thinking styles and cognitive distortions
                      </li>
                      <li>
                        <strong>Other Mental Health Conditions:</strong> Anxiety disorders, eating disorders, or substance use disorders
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="card p-6">
                    <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mb-4 text-[var(--primary)]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Social and Environmental Factors</h3>
                    <ul className="list-disc pl-5 space-y-2 text-foreground/70">
                      <li>
                        <strong>Major Life Events:</strong> Loss of a loved one, divorce, or job loss
                      </li>
                      <li>
                        <strong>Chronic Stress:</strong> Work pressure, financial problems, or caregiving responsibilities
                      </li>
                      <li>
                        <strong>Social Isolation:</strong> Lack of social support or meaningful connections
                      </li>
                      <li>
                        <strong>Socioeconomic Factors:</strong> Poverty, unemployment, or housing insecurity
                      </li>
                    </ul>
                  </div>
                  
                  <div className="card p-6">
                    <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mb-4 text-[var(--primary)]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Other Risk Factors</h3>
                    <ul className="list-disc pl-5 space-y-2 text-foreground/70">
                      <li>
                        <strong>Substance Use:</strong> Alcohol or drug misuse can contribute to or worsen depression
                      </li>
                      <li>
                        <strong>Medications:</strong> Certain medications can have depression as a side effect
                      </li>
                      <li>
                        <strong>Chronic Pain or Illness:</strong> Ongoing physical health problems
                      </li>
                      <li>
                        <strong>Seasonal Changes:</strong> Reduced sunlight in fall and winter
                      </li>
                    </ul>
                  </div>
                </div>
              </section>
              
              {/* Diagnosis */}
              <section id="diagnosis" className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Diagnosis Process</h2>
                <p className="mb-6">
                  Getting an accurate diagnosis is the first step toward effective treatment. Depression is diagnosed through a comprehensive evaluation process that typically includes several components.
                </p>
                
                <div className="card p-6 shadow-depth mb-8">
                  <h3 className="text-xl font-semibold mb-4">The Diagnostic Process</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3 mt-0.5">
                        <span className="font-semibold">1</span>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Medical History and Physical Exam</h4>
                        <p className="text-foreground/70">
                          Your healthcare provider will gather information about your symptoms, medical history, family history, and any medications you're taking. A physical exam may be conducted to rule out physical conditions that could cause depressive symptoms.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3 mt-0.5">
                        <span className="font-semibold">2</span>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Laboratory Tests</h4>
                        <p className="text-foreground/70">
                          Blood tests may be ordered to check for medical conditions that can mimic or contribute to depression, such as thyroid disorders, vitamin deficiencies, or hormonal imbalances.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3 mt-0.5">
                        <span className="font-semibold">3</span>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Psychological Evaluation</h4>
                        <p className="text-foreground/70">
                          A mental health professional will discuss your thoughts, feelings, and behaviors to assess your symptoms and identify patterns. They may ask about your personal and family history of mental health conditions.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3 mt-0.5">
                        <span className="font-semibold">4</span>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Standardized Assessments</h4>
                        <p className="text-foreground/70">
                          Questionnaires and screening tools like the Patient Health Questionnaire-9 (PHQ-9) or the Beck Depression Inventory may be used to assess the severity of symptoms and track changes over time.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3 mt-0.5">
                        <span className="font-semibold">5</span>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Diagnostic Criteria</h4>
                        <p className="text-foreground/70">
                          Healthcare providers use criteria from the Diagnostic and Statistical Manual of Mental Disorders (DSM-5) to diagnose depression. This includes assessing the number, severity, and duration of symptoms.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 bg-[var(--primary)]/5 rounded-xl">
                  <h3 className="text-xl font-semibold mb-4">Who Can Diagnose Depression?</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <div>
                        <h4 className="font-medium">Primary Care Physicians</h4>
                        <p className="text-sm text-foreground/70">Often the first point of contact for mental health concerns</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <div>
                        <h4 className="font-medium">Psychiatrists</h4>
                        <p className="text-sm text-foreground/70">Medical doctors specializing in mental health</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <div>
                        <h4 className="font-medium">Psychologists</h4>
                        <p className="text-sm text-foreground/70">Mental health professionals with doctoral-level training</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <div>
                        <h4 className="font-medium">Licensed Counselors or Therapists</h4>
                        <p className="text-sm text-foreground/70">Mental health professionals with specialized training</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              
              {/* Treatment Options */}
              <section id="treatment" className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Treatment Options</h2>
                <p className="mb-6">
                  Depression is highly treatable, and most people who receive appropriate treatment experience significant improvement in their symptoms and quality of life. Treatment approaches are typically tailored to each individual's specific needs and may include a combination of different strategies.
                </p>
                
                <div className="space-y-8">
                  {treatmentOptions.map(treatment => (
                    <div key={treatment.id} className="card p-6 shadow-sm">
                      <button 
                        className="flex justify-between items-center w-full text-left"
                        onClick={() => toggleTreatment(treatment.id)}
                      >
                        <h3 className="text-xl font-semibold">{treatment.name}</h3>
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className={`h-5 w-5 transition-transform ${expandedTreatment === treatment.id ? 'rotate-180' : ''}`} 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      
                      <p className="text-foreground/70 mt-2">{treatment.description}</p>
                      
                      {expandedTreatment === treatment.id && (
                        <div className="mt-4 space-y-4">
                          {treatment.types.map((type, index) => (
                            <div key={index} className="p-4 bg-[var(--background-alt)] rounded-lg">
                              <h4 className="font-medium mb-1">{type.name}</h4>
                              <p className="text-sm text-foreground/70">{type.description}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 p-6 bg-[var(--primary)]/5 rounded-xl">
                  <h3 className="text-xl font-semibold mb-4">Treatment Considerations</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <h4 className="font-medium">Individualized Approach</h4>
                        <p className="text-foreground/70">
                          Treatment should be tailored to your specific symptoms, preferences, and circumstances. What works for one person may not work for another.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <h4 className="font-medium">Combined Approaches</h4>
                        <p className="text-foreground/70">
                          Many people benefit from a combination of treatments, such as medication plus psychotherapy, rather than a single approach.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <h4 className="font-medium">Time and Patience</h4>
                        <p className="text-foreground/70">
                          Treatment takes time to work. Antidepressants may take 2-4 weeks to show effects, and therapy often requires multiple sessions to see significant improvement.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <h4 className="font-medium">Ongoing Adjustment</h4>
                        <p className="text-foreground/70">
                          Treatment plans often need adjustment over time. If one approach isn't working, there are many alternatives to try.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              
              {/* Self-Help Strategies */}
              <section id="self-help" className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Self-Help Strategies</h2>
                <p className="mb-6">
                  While professional treatment is important for depression, there are many self-help strategies that can complement formal treatment and support recovery. These approaches can help you manage symptoms and improve your overall wellbeing.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="card p-6">
                    <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mb-4 text-[var(--primary)]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Physical Wellbeing</h3>
                    <ul className="list-disc pl-5 space-y-2 text-foreground/70">
                      <li>
                        <strong>Regular Exercise:</strong> Even moderate activity like walking can boost mood-enhancing chemicals in the brain
                      </li>
                      <li>
                        <strong>Balanced Diet:</strong> Nutritious foods support brain health and energy levels
                      </li>
                      <li>
                        <strong>Consistent Sleep:</strong> Establish a regular sleep schedule and practice good sleep hygiene
                      </li>
                      <li>
                        <strong>Limit Alcohol and Avoid Drugs:</strong> These can worsen depression and interact with medications
                      </li>
                    </ul>
                  </div>
                  
                  <div className="card p-6">
                    <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mb-4 text-[var(--primary)]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Psychological Strategies</h3>
                    <ul className="list-disc pl-5 space-y-2 text-foreground/70">
                      <li>
                        <strong>Mindfulness and Meditation:</strong> Practices that help you stay present and reduce rumination
                      </li>
                      <li>
                        <strong>Challenge Negative Thoughts:</strong> Learn to identify and question pessimistic or distorted thinking
                      </li>
                      <li>
                        <strong>Set Realistic Goals:</strong> Break tasks into small, achievable steps to avoid feeling overwhelmed
                      </li>
                      <li>
                        <strong>Journaling:</strong> Writing about your thoughts and feelings can provide perspective and release
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="card p-6">
                    <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mb-4 text-[var(--primary)]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Social Connection</h3>
                    <ul className="list-disc pl-5 space-y-2 text-foreground/70">
                      <li>
                        <strong>Reach Out:</strong> Stay connected with supportive friends and family, even when you don't feel like it
                      </li>
                      <li>
                        <strong>Consider Support Groups:</strong> Sharing with others who understand can reduce isolation
                      </li>
                      <li>
                        <strong>Volunteer:</strong> Helping others can provide purpose and perspective
                      </li>
                      <li>
                        <strong>Limit Social Media:</strong> Be mindful of how online interactions affect your mood
                      </li>
                    </ul>
                  </div>
                  
                  <div className="card p-6">
                    <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mb-4 text-[var(--primary)]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Daily Habits</h3>
                    <ul className="list-disc pl-5 space-y-2 text-foreground/70">
                      <li>
                        <strong>Establish Routine:</strong> Regular daily patterns provide structure and stability
                      </li>
                      <li>
                        <strong>Exposure to Sunlight:</strong> Natural light can help regulate mood and sleep cycles
                      </li>
                      <li>
                        <strong>Engage in Enjoyable Activities:</strong> Make time for things you used to enjoy, even if they don't seem appealing at first
                      </li>
                      <li>
                        <strong>Practice Relaxation Techniques:</strong> Deep breathing, progressive muscle relaxation, or guided imagery
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-8 p-6 bg-[var(--background-alt)] rounded-lg">
                  <h3 className="text-lg font-semibold mb-3">Important Reminder</h3>
                  <p className="text-foreground/70">
                    Self-help strategies are valuable complements to professional treatment, not replacements. If you're experiencing depression, it's important to work with healthcare providers to develop a comprehensive treatment plan.
                  </p>
                </div>
              </section>
              
              {/* When to Seek Help */}
              <section id="seek-help" className="mb-12">
                <h2 className="text-2xl font-bold mb-6">When to Seek Professional Help</h2>
                <p className="mb-6">
                  While everyone experiences sadness or low moods occasionally, there are clear signs that indicate when professional help is needed. Recognizing these signs is crucial for getting timely and effective treatment.
                </p>
                
                <div className="card p-6 shadow-depth mb-8">
                  <h3 className="text-xl font-semibold mb-4">Seek Help If You Experience:</h3>
                  
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
                          Depressive symptoms that last for more than two weeks and don't improve with self-help strategies.
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
                          Difficulty performing daily activities, going to work or school, or maintaining relationships.
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
                          Any thoughts of death, self-harm, or suicide require immediate professional attention.
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
                        <h4 className="font-medium mb-1">Co-occurring Issues</h4>
                        <p className="text-foreground/70">
                          Depression alongside substance use, anxiety, or other mental health conditions.
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
                        <h4 className="font-medium mb-1">Severe Symptoms</h4>
                        <p className="text-foreground/70">
                          Intense feelings of hopelessness, worthlessness, or guilt; significant changes in sleep or appetite; or inability to experience pleasure.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="card p-6 bg-[var(--primary)]/5 mb-8">
                  <h3 className="text-xl font-semibold mb-4">Emergency Situations</h3>
                  <p className="mb-4 font-medium">
                    Seek immediate help if you or someone you know is experiencing:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-foreground/80">
                    <li>Suicidal thoughts with a plan or intent</li>
                    <li>Severe inability to function or care for basic needs</li>
                    <li>Psychotic symptoms (hallucinations or delusions)</li>
                    <li>Risk of harm to self or others</li>
                  </ul>
                  <div className="mt-4 p-4 bg-[var(--background)] rounded-lg">
                    <p className="font-medium mb-2">Emergency Resources:</p>
                    <ul className="space-y-1 text-foreground/80">
                      <li>• Call 911 or go to your nearest emergency room</li>
                      <li>• National Suicide Prevention Lifeline: 988 or 1-800-273-8255</li>
                      <li>• Crisis Text Line: Text HOME to 741741</li>
                    </ul>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold mb-4">How to Find Help</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="card p-5">
                    <h4 className="font-medium mb-2">Start with Your Primary Care Provider</h4>
                    <p className="text-sm text-foreground/70">
                      They can assess your symptoms, rule out medical causes, provide initial treatment, or refer you to a mental health specialist.
                    </p>
                  </div>
                  
                  <div className="card p-5">
                    <h4 className="font-medium mb-2">Mental Health Specialists</h4>
                    <p className="text-sm text-foreground/70">
                      Psychiatrists, psychologists, licensed counselors, and clinical social workers specialize in diagnosing and treating depression.
                    </p>
                  </div>
                  
                  <div className="card p-5">
                    <h4 className="font-medium mb-2">Insurance Provider</h4>
                    <p className="text-sm text-foreground/70">
                      Contact your health insurance company for a list of covered mental health providers in your area.
                    </p>
                  </div>
                  
                  <div className="card p-5">
                    <h4 className="font-medium mb-2">Online Resources</h4>
                    <p className="text-sm text-foreground/70">
                      Websites like Psychology Today, the American Psychological Association, or the National Alliance on Mental Illness offer provider directories.
                    </p>
                  </div>
                </div>
              </section>
              
              {/* Resources and Support */}
              <section id="resources" className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Resources and Support</h2>
                <p className="mb-6">
                  Beyond professional treatment, many resources are available to support individuals with depression and their loved ones. These resources can provide education, community, and additional tools for managing depression.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="card p-6">
                    <h3 className="text-xl font-semibold mb-3">National Organizations</h3>
                    <ul className="space-y-3">
                      <li>
                        <a href="https://www.nami.org" target="_blank" rel="noopener noreferrer" className="flex items-start hover:text-[var(--primary)]">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 015.656 0l4 4a4 4 0 01-5.656 5.656l-1.1-1.1" />
                          </svg>
                          <div>
                            <span className="font-medium">National Alliance on Mental Illness (NAMI)</span>
                            <p className="text-sm text-foreground/70">Education, support groups, and advocacy</p>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="https://www.nimh.nih.gov" target="_blank" rel="noopener noreferrer" className="flex items-start hover:text-[var(--primary)]">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 015.656 0l4 4a4 4 0 01-5.656 5.656l-1.1-1.1" />
                          </svg>
                          <div>
                            <span className="font-medium">National Institute of Mental Health (NIMH)</span>
                            <p className="text-sm text-foreground/70">Research-based information on depression</p>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="https://www.dbsalliance.org" target="_blank" rel="noopener noreferrer" className="flex items-start hover:text-[var(--primary)]">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 015.656 0l4 4a4 4 0 01-5.656 5.656l-1.1-1.1" />
                          </svg>
                          <div>
                            <span className="font-medium">Depression and Bipolar Support Alliance</span>
                            <p className="text-sm text-foreground/70">Peer support and resources</p>
                          </div>
                        </a>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="card p-6">
                    <h3 className="text-xl font-semibold mb-3">Helplines and Crisis Support</h3>
                    <ul className="space-y-3">
                      <li>
                        <div className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          <div>
                            <span className="font-medium">988 Suicide & Crisis Lifeline</span>
                            <p className="text-sm text-foreground/70">Call or text 988 (24/7 support)</p>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                          </svg>
                          <div>
                            <span className="font-medium">Crisis Text Line</span>
                            <p className="text-sm text-foreground/70">Text HOME to 741741 (24/7 support)</p>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          <div>
                            <span className="font-medium">SAMHSA's National Helpline</span>
                            <p className="text-sm text-foreground/70">1-800-662-HELP (4357) for treatment referrals</p>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="card p-6">
                    <h3 className="text-xl font-semibold mb-3">Online Communities</h3>
                    <ul className="space-y-3">
                      <li>
                        <a href="https://www.reddit.com/r/depression/" target="_blank" rel="noopener noreferrer" className="flex items-start hover:text-[var(--primary)]">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          <div>
                            <span className="font-medium">Reddit r/depression</span>
                            <p className="text-sm text-foreground/70">Peer support community</p>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="https://www.7cups.com" target="_blank" rel="noopener noreferrer" className="flex items-start hover:text-[var(--primary)]">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          <div>
                            <span className="font-medium">7 Cups</span>
                            <p className="text-sm text-foreground/70">Free emotional support from trained listeners</p>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="https://www.supportgroups.com" target="_blank" rel="noopener noreferrer" className="flex items-start hover:text-[var(--primary)]">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          <div>
                            <span className="font-medium">SupportGroups.com</span>
                            <p className="text-sm text-foreground/70">Online support communities for various conditions</p>
                          </div>
                        </a>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="card p-6">
                    <h3 className="text-xl font-semibold mb-3">Apps and Digital Tools</h3>
                    <ul className="space-y-3">
                      <li>
                        <div className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                          <div>
                            <span className="font-medium">Mood tracking apps</span>
                            <p className="text-sm text-foreground/70">Daylio, MoodKit, Moodpath</p>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                          <div>
                            <span className="font-medium">Meditation and mindfulness apps</span>
                            <p className="text-sm text-foreground/70">Headspace, Calm, Insight Timer</p>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                          <div>
                            <span className="font-medium">Therapy-based apps</span>
                            <p className="text-sm text-foreground/70">Woebot, Wysa, MoodMission</p>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-8 p-6 bg-[var(--primary)]/5 rounded-xl">
                  <h3 className="text-xl font-semibold mb-4">For Family and Friends</h3>
                  <p className="mb-4">
                    Supporting someone with depression can be challenging. Here are some resources specifically for family members and friends:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-foreground/80">
                    <li>NAMI Family-to-Family Education Program</li>
                    <li>NAMI Family Support Group</li>
                    <li>Mental Health First Aid training</li>
                    <li>Books like "I'm Not Sick, I Don't Need Help!" by Xavier Amador or "When Someone You Love is Depressed" by Laura Epstein Rosen and Xavier Francisco Amador</li>
                  </ul>
                </div>
              </section>
              
              {/* Conclusion */}
              <section id="conclusion" className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Living With and Beyond Depression</h2>
                <p className="mb-4">
                  Depression is a serious but treatable condition. With proper diagnosis, treatment, and support, most people with depression can experience significant improvement in their symptoms and quality of life.
                </p>
                <p className="mb-4">
                  Recovery from depression is not always linear—there may be setbacks along the way. However, each step forward, no matter how small, is progress. Many people not only recover from depression but also develop greater resilience, self-awareness, and appreciation for life as a result of their journey.
                </p>
                <p className="mb-4">
                  Remember that seeking help for depression is a sign of strength, not weakness. If you or someone you know is struggling with depression, reach out for support. You don't have to face it alone.
                </p>
                
                <div className="card p-6 shadow-depth mt-8">
                  <h3 className="text-xl font-semibold mb-4">Key Takeaways</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <p className="text-foreground/80">
                        Depression is a common, serious, but treatable medical condition—not a personal weakness or character flaw.
                      </p>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <p className="text-foreground/80">
                        There are different types of depression, each with unique characteristics and treatment considerations.
                      </p>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <p className="text-foreground/80">
                        Depression results from a complex interaction of biological, psychological, and social factors.
                      </p>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <p className="text-foreground/80">
                        Effective treatments include psychotherapy, medication, lifestyle changes, and in some cases, brain stimulation therapies.
                      </p>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <p className="text-foreground/80">
                        Self-help strategies can complement professional treatment but are not substitutes for it.
                      </p>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <p className="text-foreground/80">
                        Seeking help early leads to better outcomes—don't wait until symptoms become severe.
                      </p>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <p className="text-foreground/80">
                        Recovery is possible—with proper treatment, most people with depression get better.
                      </p>
                    </li>
                  </ul>
                </div>
              </section>
              
              {/* Share Links */}
              <div className="mb-12">
                <h3 className="font-semibold mb-4">Share this resource</h3>
                <ShareButtons 
                  title="Depression: Signs, Symptoms, and Treatment Options" 
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
                    Understanding Depression
                  </a>
                  <a 
                    href="#types" 
                    className="block text-foreground/70 hover:text-[var(--primary)] py-1 border-l-2 border-transparent hover:border-[var(--primary)] pl-3 transition-all"
                  >
                    Types of Depression
                  </a>
                  <a 
                    href="#symptoms" 
                    className="block text-foreground/70 hover:text-[var(--primary)] py-1 border-l-2 border-transparent hover:border-[var(--primary)] pl-3 transition-all"
                  >
                    Signs and Symptoms
                  </a>
                  <a 
                    href="#causes" 
                    className="block text-foreground/70 hover:text-[var(--primary)] py-1 border-l-2 border-transparent hover:border-[var(--primary)] pl-3 transition-all"
                  >
                    Causes and Risk Factors
                  </a>
                  <a 
                    href="#diagnosis" 
                    className="block text-foreground/70 hover:text-[var(--primary)] py-1 border-l-2 border-transparent hover:border-[var(--primary)] pl-3 transition-all"
                  >
                    Diagnosis Process
                  </a>
                  <a 
                    href="#treatment" 
                    className="block text-foreground/70 hover:text-[var(--primary)] py-1 border-l-2 border-transparent hover:border-[var(--primary)] pl-3 transition-all"
                  >
                    Treatment Options
                  </a>
                  <a 
                    href="#self-help" 
                    className="block text-foreground/70 hover:text-[var(--primary)] py-1 border-l-2 border-transparent hover:border-[var(--primary)] pl-3 transition-all"
                  >
                    Self-Help Strategies
                  </a>
                  <a 
                    href="#seek-help" 
                    className="block text-foreground/70 hover:text-[var(--primary)] py-1 border-l-2 border-transparent hover:border-[var(--primary)] pl-3 transition-all"
                  >
                    When to Seek Help
                  </a>
                  <a 
                    href="#resources" 
                    className="block text-foreground/70 hover:text-[var(--primary)] py-1 border-l-2 border-transparent hover:border-[var(--primary)] pl-3 transition-all"
                  >
                    Resources and Support
                  </a>
                  <a 
                    href="#conclusion" 
                    className="block text-foreground/70 hover:text-[var(--primary)] py-1 border-l-2 border-transparent hover:border-[var(--primary)] pl-3 transition-all"
                  >
                    Living With and Beyond Depression
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
                  Get a PDF version of this comprehensive guide to reference offline or share with others.
                </p>
                <PDFDownloadButton
                  title="Depression: Signs, Symptoms, and Treatment Options"
                  subtitle="TherapyKin Resource"
                  filename="TherapyKin-Depression-Guide.pdf"
                  contentId="depression-guide-content"
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
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">CBT Worksheets</h4>
                      <p className="text-sm text-foreground/70 mb-2">Printable worksheets to help identify and change negative thought patterns</p>
                      <Link href="/resources/cbt-worksheets" className="text-xs text-[var(--primary)] font-medium hover:underline">
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
              
              {/* Quick Facts */}
              <div className="card p-6">
                <h3 className="text-lg font-semibold mb-4">Depression Quick Facts</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sm text-foreground/70">Depression affects approximately 280 million people worldwide</p>
                  </div>
                  
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sm text-foreground/70">Women are about twice as likely as men to experience depression</p>
                  </div>
                  
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sm text-foreground/70">Depression is the leading cause of disability worldwide</p>
                  </div>
                  
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sm text-foreground/70">With proper treatment, 80-90% of people with depression eventually respond well</p>
                  </div>
                  
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sm text-foreground/70">Depression often co-occurs with anxiety disorders, substance use disorders, and chronic health conditions</p>
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
