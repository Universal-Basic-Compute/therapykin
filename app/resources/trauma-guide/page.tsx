'use client';

import React, { useState } from "react";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ShareButtons from "../../components/ShareButtons";
import PDFDownloadButton from "../../components/PDFDownloadButton";

// Trauma symptoms checklist
const traumaSymptoms = [
  { id: "flashbacks", text: "Flashbacks or intrusive memories of the traumatic event" },
  { id: "nightmares", text: "Recurrent nightmares related to the trauma" },
  { id: "avoidance", text: "Avoiding people, places, or situations that remind you of the trauma" },
  { id: "memory", text: "Gaps in memory about aspects of the traumatic event" },
  { id: "negative", text: "Persistent negative beliefs about yourself, others, or the world" },
  { id: "blame", text: "Excessive self-blame or blame of others for the traumatic event" },
  { id: "detached", text: "Feeling detached or estranged from others" },
  { id: "emotions", text: "Difficulty experiencing positive emotions" },
  { id: "irritable", text: "Irritable behavior or angry outbursts" },
  { id: "hypervigilance", text: "Hypervigilance (being constantly on alert)" },
  { id: "startle", text: "Exaggerated startle response" },
  { id: "concentration", text: "Problems with concentration or focus" },
  { id: "sleep", text: "Difficulty falling or staying asleep" },
  { id: "physical", text: "Physical symptoms like headaches, digestive issues, or chronic pain" },
  { id: "dissociation", text: "Feeling disconnected from yourself or your surroundings (dissociation)" }
];

// Types of trauma
const traumaTypes = [
  {
    id: "acute",
    name: "Acute Trauma",
    description: "Results from a single distressing event such as an accident, natural disaster, or violent attack. The impact can be immediate and overwhelming but may resolve with proper support and time."
  },
  {
    id: "chronic",
    name: "Chronic Trauma",
    description: "Stems from repeated and prolonged exposure to highly stressful events, such as ongoing domestic violence, child abuse, or living in a war zone. The effects tend to be cumulative and deeply ingrained."
  },
  {
    id: "complex",
    name: "Complex Trauma",
    description: "Occurs from exposure to multiple traumatic events, often of an invasive, interpersonal nature, and frequently early in life. This can affect attachment, identity development, and emotional regulation."
  },
  {
    id: "developmental",
    name: "Developmental Trauma",
    description: "Happens during critical developmental periods in childhood, disrupting normal neurological, psychological, and cognitive development. This can have profound effects on a child's sense of self and ability to form healthy relationships."
  },
  {
    id: "historical",
    name: "Historical or Intergenerational Trauma",
    description: "Refers to the collective trauma experienced by a group of people who share an identity, affiliation, or circumstance, which can be transmitted across generations through biological, psychological, and social means."
  },
  {
    id: "vicarious",
    name: "Vicarious or Secondary Trauma",
    description: "Develops from witnessing or hearing about traumatic events experienced by others. This can affect helping professionals, family members of trauma survivors, or those repeatedly exposed to traumatic stories or images."
  },
  {
    id: "medical",
    name: "Medical Trauma",
    description: "Results from invasive medical procedures, life-threatening illness, or medical emergencies. The experience of feeling helpless, in pain, or facing mortality in a medical context can be deeply traumatic."
  }
];

// Treatment approaches
const treatmentApproaches = [
  {
    id: "psychotherapy",
    name: "Trauma-Focused Psychotherapy",
    description: "Evidence-based therapeutic approaches specifically designed to address trauma and its effects.",
    types: [
      { name: "Cognitive Processing Therapy (CPT)", description: "Helps individuals learn to challenge and modify unhelpful beliefs related to the trauma that affect how they see themselves, others, and the world." },
      { name: "Prolonged Exposure Therapy (PE)", description: "Gradually and safely helps people confront trauma-related memories, feelings, and situations they've been avoiding, reducing their power over time." },
      { name: "Eye Movement Desensitization and Reprocessing (EMDR)", description: "Combines exposure to distressing trauma memories with bilateral sensory stimulation to help the brain process traumatic memories." },
      { name: "Trauma-Focused Cognitive Behavioral Therapy (TF-CBT)", description: "Particularly effective for children and adolescents, addressing trauma-related thoughts and behaviors while involving caregivers in the healing process." },
      { name: "Narrative Exposure Therapy (NET)", description: "Helps individuals construct a coherent narrative of their life, including traumatic experiences, particularly useful for those who have experienced multiple traumas." }
    ]
  },
  {
    id: "somatic",
    name: "Somatic (Body-Based) Approaches",
    description: "Therapeutic methods that recognize the connection between mind and body in trauma healing.",
    types: [
      { name: "Somatic Experiencing", description: "Focuses on bodily sensations to help release trauma-related energy and tension stored in the body." },
      { name: "Sensorimotor Psychotherapy", description: "Integrates sensorimotor processing with cognitive and emotional processing to address the physical symptoms of trauma." },
      { name: "Yoga for Trauma Recovery", description: "Specialized yoga practices that help trauma survivors reconnect with their bodies in a safe, controlled manner." },
      { name: "Tension and Trauma Releasing Exercises (TRE)", description: "A series of exercises that assist the body in releasing deep muscular patterns of stress and tension." }
    ]
  },
  {
    id: "medication",
    name: "Medication",
    description: "Pharmaceutical interventions that can help manage trauma symptoms, particularly when they're severe.",
    types: [
      { name: "Selective Serotonin Reuptake Inhibitors (SSRIs)", description: "Antidepressants that can help reduce symptoms of PTSD, depression, and anxiety that often accompany trauma." },
      { name: "Prazosin", description: "Sometimes prescribed specifically for trauma-related nightmares and sleep disturbances." },
      { name: "Anti-anxiety medications", description: "May be used short-term to help manage severe anxiety symptoms while other treatments take effect." }
    ]
  },
  {
    id: "group",
    name: "Group-Based Approaches",
    description: "Healing modalities that leverage the power of shared experience and community support.",
    types: [
      { name: "Trauma Support Groups", description: "Provide validation, connection, and reduced isolation through sharing with others who have similar experiences." },
      { name: "Skills Training in Affective and Interpersonal Regulation (STAIR)", description: "Group therapy that focuses on emotional regulation and interpersonal skills before addressing trauma narratives." },
      { name: "Seeking Safety", description: "A present-focused therapy that addresses both trauma and substance abuse, focusing on safety as the priority." }
    ]
  },
  {
    id: "complementary",
    name: "Complementary and Integrative Approaches",
    description: "Additional methods that can support traditional trauma treatment.",
    types: [
      { name: "Mindfulness-Based Stress Reduction (MBSR)", description: "Teaches mindfulness practices to help individuals stay present and reduce reactivity to trauma triggers." },
      { name: "Art Therapy", description: "Uses creative expression to process traumatic experiences, particularly helpful when verbal expression is difficult." },
      { name: "Neurofeedback", description: "Provides real-time feedback on brain activity to help individuals learn to self-regulate brain function affected by trauma." },
      { name: "Acupuncture", description: "Some evidence suggests acupuncture may help reduce symptoms of anxiety, depression, and insomnia related to trauma." }
    ]
  }
];

export default function TraumaGuide() {
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
    : 'https://therapykin.ai/resources/trauma-guide';
  
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
                      Understanding Trauma
                    </span>
                  </div>
                </li>
              </ol>
            </nav>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div id="trauma-guide-content" className="lg:w-2/3">
              {/* Resource Header */}
              <div className="mb-8">
                <span className="px-3 py-1 bg-[var(--primary)]/10 text-[var(--primary)] rounded-full text-sm font-medium">
                  Trauma
                </span>
                <h1 className="text-3xl md:text-4xl font-bold mt-4 mb-4">Understanding Trauma and Its Effects</h1>
                <p className="text-xl text-foreground/70 mb-6">
                  An overview of trauma, its impact on the brain and body, and approaches to healing and recovery.
                </p>
              </div>
              
              {/* Introduction */}
              <section id="introduction" className="mb-12">
                <h2 className="text-2xl font-bold mb-4">What is Trauma?</h2>
                <p className="mb-4">
                  Trauma is the response to a deeply distressing or disturbing event that overwhelms an individual's ability to cope, causes feelings of helplessness, diminishes their sense of self and their ability to feel a full range of emotions and experiences. It's not the event itself that defines trauma, but rather the individual's experience of and response to that event.
                </p>
                <p className="mb-4">
                  Trauma can result from a one-time event, like an accident, natural disaster, or violent attack. It can also develop from ongoing, relentless stress, such as living in a crime-ridden neighborhood, battling a life-threatening illness, or experiencing traumatic events that occur repeatedly, such as domestic violence, bullying, or childhood abuse.
                </p>
                
                <div className="my-8 p-6 bg-[var(--primary)]/5 rounded-xl">
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="w-16 h-16 md:w-20 md:h-20 flex-shrink-0 rounded-full bg-[var(--primary)]/10 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-2">Trauma By The Numbers</h4>
                      <ul className="text-foreground/80 space-y-2">
                        <li>• Approximately 70% of adults worldwide have experienced at least one traumatic event in their lifetime</li>
                        <li>• In the U.S., about 6% of the population will experience PTSD at some point in their lives</li>
                        <li>• Women are twice as likely as men to develop PTSD</li>
                        <li>• Up to 43% of children experience at least one traumatic event</li>
                        <li>• With appropriate treatment and support, recovery from trauma is possible</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <p className="mb-4">
                  This guide will help you understand the different types of trauma, how trauma affects the brain and body, recognize its symptoms, and explore effective approaches to healing and recovery.
                </p>
                
                <div className="card p-6 shadow-depth mb-8">
                  <h3 className="text-xl font-semibold mb-4">Important Note</h3>
                  <p className="text-foreground/80 mb-4">
                    Reading about trauma can sometimes trigger distressing reactions, especially if you have experienced trauma yourself. As you read this guide:
                  </p>
                  <ul className="space-y-2 text-foreground/80">
                    <li>• Take breaks when needed</li>
                    <li>• Practice self-care and grounding techniques</li>
                    <li>• Reach out for support if you feel overwhelmed</li>
                    <li>• Remember that healing is possible and you are not alone</li>
                  </ul>
                </div>
              </section>
              
              {/* Types of Trauma */}
              <section id="types" className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Types of Trauma</h2>
                <p className="mb-6">
                  Trauma comes in many forms, and understanding the different types can help in recognizing and addressing its effects. While there is often overlap between these categories, each type of trauma may present unique challenges and considerations for healing.
                </p>
                
                <div className="space-y-6">
                  {traumaTypes.map(type => (
                    <div key={type.id} className="card p-6 shadow-sm hover:shadow-depth transition-all">
                      <h3 className="text-xl font-semibold mb-2">{type.name}</h3>
                      <p className="text-foreground/70">{type.description}</p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-[var(--background-alt)] rounded-lg">
                  <p className="text-sm text-foreground/70">
                    <strong>Note:</strong> Many people experience multiple types of trauma throughout their lives. The effects of trauma are cumulative, meaning that exposure to multiple traumatic events can compound the impact on an individual's wellbeing.
                  </p>
                </div>
              </section>
              
              {/* How Trauma Affects the Brain and Body */}
              <section id="effects" className="mb-12">
                <h2 className="text-2xl font-bold mb-6">How Trauma Affects the Brain and Body</h2>
                <p className="mb-6">
                  Trauma isn't just a psychological experience—it has profound effects on the brain's structure and function, as well as on the body's physiological systems. Understanding these neurobiological impacts helps explain many of the symptoms and behaviors associated with trauma.
                </p>
                
                <div className="card p-6 shadow-depth mb-8">
                  <h3 className="text-xl font-semibold mb-4">The Brain's Response to Trauma</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3 mt-0.5">
                        <span className="font-semibold">1</span>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Amygdala (Fear Center)</h4>
                        <p className="text-foreground/70">
                          Trauma can cause the amygdala—the brain's alarm system—to become hyperactive, leading to heightened fear responses and emotional reactivity. This explains why trauma survivors may be easily startled or feel anxious in situations that remind them of the trauma.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3 mt-0.5">
                        <span className="font-semibold">2</span>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Prefrontal Cortex (Thinking Brain)</h4>
                        <p className="text-foreground/70">
                          The prefrontal cortex, responsible for rational thinking and decision-making, can become less active after trauma. This can make it difficult to regulate emotions, plan for the future, or make sound judgments, especially when triggered.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3 mt-0.5">
                        <span className="font-semibold">3</span>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Hippocampus (Memory Center)</h4>
                        <p className="text-foreground/70">
                          Trauma can affect the hippocampus, which plays a crucial role in memory processing. This can lead to fragmented or incomplete memories of the traumatic event, or difficulty forming new memories. It may also explain why trauma memories often feel like they're happening in the present.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3 mt-0.5">
                        <span className="font-semibold">4</span>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Brain Connectivity</h4>
                        <p className="text-foreground/70">
                          Trauma can disrupt the communication between different parts of the brain, affecting how emotions are processed and integrated with thoughts and memories. This can lead to dissociation, emotional numbness, or feeling disconnected from oneself.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="card p-6 shadow-depth mb-8">
                  <h3 className="text-xl font-semibold mb-4">The Body's Response to Trauma</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3 mt-0.5">
                        <span className="font-semibold">1</span>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Nervous System Dysregulation</h4>
                        <p className="text-foreground/70">
                          Trauma can disrupt the balance between the sympathetic (fight-or-flight) and parasympathetic (rest-and-digest) branches of the autonomic nervous system. This can lead to a state of chronic hyperarousal or, alternatively, a shutdown response characterized by numbness and disconnection.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3 mt-0.5">
                        <span className="font-semibold">2</span>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Stress Hormone Changes</h4>
                        <p className="text-foreground/70">
                          Trauma can alter the production and regulation of stress hormones like cortisol and adrenaline. These changes can persist long after the traumatic event, affecting sleep, immune function, and overall health.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3 mt-0.5">
                        <span className="font-semibold">3</span>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Physical Health Impacts</h4>
                        <p className="text-foreground/70">
                          The chronic stress associated with trauma can contribute to a range of physical health problems, including cardiovascular issues, autoimmune disorders, chronic pain, digestive problems, and more. This connection between trauma and physical health is often referred to as the mind-body connection.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3 mt-0.5">
                        <span className="font-semibold">4</span>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Somatic Memories</h4>
                        <p className="text-foreground/70">
                          Trauma can be stored in the body as somatic (physical) memories. This means that even when conscious memories of trauma are limited, the body may react to triggers with physical sensations like tension, pain, or discomfort.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 bg-[var(--primary)]/5 rounded-xl">
                  <h3 className="text-xl font-semibold mb-4">The Window of Tolerance</h3>
                  <p className="mb-4">
                    An important concept in understanding trauma's effects is the "window of tolerance"—the optimal zone of arousal in which we can function effectively, managing emotions and thinking clearly.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="card p-4 bg-red-50 dark:bg-red-900/20">
                      <h4 className="font-medium text-red-700 dark:text-red-300 mb-2">Hyperarousal</h4>
                      <p className="text-sm text-red-600 dark:text-red-200">
                        Above the window: Fight or flight response, anxiety, panic, anger, overwhelm, racing thoughts
                      </p>
                    </div>
                    <div className="card p-4 bg-green-50 dark:bg-green-900/20">
                      <h4 className="font-medium text-green-700 dark:text-green-300 mb-2">Window of Tolerance</h4>
                      <p className="text-sm text-green-600 dark:text-green-200">
                        Optimal zone: Calm, present, able to think clearly and feel emotions without being overwhelmed
                      </p>
                    </div>
                    <div className="card p-4 bg-blue-50 dark:bg-blue-900/20">
                      <h4 className="font-medium text-blue-700 dark:text-blue-300 mb-2">Hypoarousal</h4>
                      <p className="text-sm text-blue-600 dark:text-blue-200">
                        Below the window: Freeze response, numbness, disconnection, exhaustion, depression, dissociation
                      </p>
                    </div>
                  </div>
                  <p className="text-foreground/80">
                    Trauma can narrow this window, making it easier to slip into states of either hyperarousal or hypoarousal. Many trauma recovery approaches focus on widening this window of tolerance, helping individuals stay regulated even when faced with triggers or stress.
                  </p>
                </div>
              </section>
              
              {/* Signs and Symptoms */}
              <section id="symptoms" className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Signs and Symptoms of Trauma</h2>
                <p className="mb-4">
                  Trauma responses can vary widely between individuals. Some people may experience symptoms immediately after a traumatic event, while others may not notice effects until weeks, months, or even years later. Recognizing these symptoms is an important step toward healing.
                </p>
                
                <div className="card p-6 shadow-depth mb-8">
                  <h3 className="text-xl font-semibold mb-4">Trauma Symptom Checklist</h3>
                  <p className="text-foreground/70 mb-4">
                    Check any symptoms you've been experiencing that interfere with your daily functioning:
                  </p>
                  
                  <div className="space-y-3">
                    {traumaSymptoms.map(symptom => (
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
                    ) : checkedSymptomsCount >= 6 ? (
                      <div>
                        <p className="font-medium mb-2">
                          You've checked {checkedSymptomsCount} symptoms, which may indicate significant trauma-related distress.
                        </p>
                        <p className="text-foreground/70">
                          Consider speaking with a trauma-informed healthcare provider about your symptoms. Remember, this is not a diagnostic tool, but it can help you have an informed conversation with a professional.
                        </p>
                      </div>
                    ) : checkedSymptomsCount >= 3 ? (
                      <div>
                        <p className="font-medium mb-2">
                          You've checked {checkedSymptomsCount} symptoms, which may indicate some trauma-related distress.
                        </p>
                        <p className="text-foreground/70">
                          If these symptoms are causing distress or interfering with your daily life, consider discussing them with a healthcare provider who understands trauma.
                        </p>
                      </div>
                    ) : (
                      <div>
                        <p className="font-medium mb-2">
                          You've checked {checkedSymptomsCount} {checkedSymptomsCount === 1 ? 'symptom' : 'symptoms'}.
                        </p>
                        <p className="text-foreground/70">
                          While this alone may not indicate significant trauma-related distress, pay attention to how it affects your life. If you're concerned, consider discussing it with a healthcare provider.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold mb-4">Common Trauma Responses</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="card p-5">
                    <h4 className="font-medium mb-2">Emotional Responses</h4>
                    <ul className="list-disc pl-5 space-y-1 text-foreground/70">
                      <li>Persistent sadness or depression</li>
                      <li>Anxiety and fear, even when safe</li>
                      <li>Emotional numbness or disconnection</li>
                      <li>Shame, guilt, or self-blame</li>
                      <li>Irritability or angry outbursts</li>
                      <li>Feeling overwhelmed by emotions</li>
                    </ul>
                  </div>
                  
                  <div className="card p-5">
                    <h4 className="font-medium mb-2">Cognitive Responses</h4>
                    <ul className="list-disc pl-5 space-y-1 text-foreground/70">
                      <li>Intrusive thoughts about the trauma</li>
                      <li>Difficulty concentrating or making decisions</li>
                      <li>Memory problems</li>
                      <li>Negative beliefs about self, others, or the world</li>
                      <li>Confusion or disorientation</li>
                      <li>Hypervigilance (constantly scanning for danger)</li>
                    </ul>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="card p-5">
                    <h4 className="font-medium mb-2">Physical Responses</h4>
                    <ul className="list-disc pl-5 space-y-1 text-foreground/70">
                      <li>Sleep disturbances (insomnia, nightmares)</li>
                      <li>Chronic fatigue or low energy</li>
                      <li>Muscle tension or pain</li>
                      <li>Digestive issues</li>
                      <li>Rapid heartbeat or breathing when triggered</li>
                      <li>Weakened immune system</li>
                    </ul>
                  </div>
                  
                  <div className="card p-5">
                    <h4 className="font-medium mb-2">Behavioral Responses</h4>
                    <ul className="list-disc pl-5 space-y-1 text-foreground/70">
                      <li>Avoiding people, places, or things that remind of trauma</li>
                      <li>Withdrawal from relationships or activities</li>
                      <li>Increased use of substances to cope</li>
                      <li>Self-destructive behaviors</li>
                      <li>Difficulty maintaining routines</li>
                      <li>Startling easily</li>
                    </ul>
                  </div>
                </div>
                
                <div className="card p-5">
                  <h4 className="font-medium mb-2">Relational Responses</h4>
                  <ul className="list-disc pl-5 space-y-1 text-foreground/70">
                    <li>Difficulty trusting others</li>
                    <li>Feeling disconnected or detached from others</li>
                    <li>Challenges with boundaries (too rigid or too porous)</li>
                    <li>Fear of abandonment or rejection</li>
                    <li>Difficulty with intimacy</li>
                    <li>Patterns of unhealthy relationships</li>
                  </ul>
                </div>
                
                <div className="mt-6 p-4 bg-[var(--background-alt)] rounded-lg">
                  <p className="text-sm text-foreground/70">
                    <strong>Note:</strong> Many trauma responses are normal reactions to abnormal situations—they are adaptive mechanisms that helped you survive. Recognizing these responses as normal can be an important part of the healing process.
                  </p>
                </div>
              </section>
              
              {/* Post-Traumatic Growth */}
              <section id="growth" className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Post-Traumatic Growth</h2>
                <p className="mb-4">
                  While trauma can have profound negative effects, many survivors also experience what psychologists call "post-traumatic growth"—positive psychological changes that can emerge from the struggle with highly challenging life circumstances.
                </p>
                <p className="mb-4">
                  Post-traumatic growth doesn't mean that trauma wasn't painful or that survivors don't continue to experience distress. Rather, it recognizes that growth and suffering can coexist, and that meaningful positive change can emerge from the process of healing.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="card p-6 hover:shadow-depth transition-all">
                    <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mb-4 text-[var(--primary)]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Greater Personal Strength</h3>
                    <p className="text-foreground/70">
                      Many trauma survivors discover inner resources and capabilities they didn't know they possessed. This can lead to increased confidence in their ability to handle life's challenges and a sense of being stronger despite—or because of—what they've endured.
                    </p>
                  </div>
                  
                  <div className="card p-6 hover:shadow-depth transition-all">
                    <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mb-4 text-[var(--primary)]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Deeper Relationships</h3>
                    <p className="text-foreground/70">
                      The experience of trauma and recovery can lead to more meaningful connections with others. Many survivors report greater compassion for others' suffering, increased appreciation for supportive relationships, and a willingness to be more vulnerable and authentic.
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="card p-6 hover:shadow-depth transition-all">
                    <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mb-4 text-[var(--primary)]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Greater Appreciation for Life</h3>
                    <p className="text-foreground/70">
                      Facing trauma can shift priorities and perspectives, leading to a deeper appreciation for life itself. Small joys may become more meaningful, and there may be a greater sense of living in the present rather than dwelling on the past or worrying about the future.
                    </p>
                  </div>
                  
                  <div className="card p-6 hover:shadow-depth transition-all">
                    <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mb-4 text-[var(--primary)]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-3">New Possibilities</h3>
                    <p className="text-foreground/70">
                      The process of rebuilding after trauma can open doors to new interests, activities, and life paths that might not have been considered before. Many survivors discover new purpose or meaning, often related to their traumatic experiences.
                    </p>
                  </div>
                </div>
                
                <div className="card p-6 hover:shadow-depth transition-all">
                  <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mb-4 text-[var(--primary)]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h.5A2.5 2.5 0 0020 5.5v-1.65M12 14.5V17m0 0v2.5M12 17h2.5M12 17h-2.5" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Spiritual or Existential Growth</h3>
                  <p className="text-foreground/70">
                    Trauma often challenges fundamental assumptions about life, safety, and meaning. Through the recovery process, many survivors develop a deeper understanding of themselves and their place in the world. This may include spiritual growth, a stronger connection to something greater than oneself, or a more developed personal philosophy of life.
                  </p>
                </div>
                
                <div className="mt-6 p-4 bg-[var(--primary)]/5 rounded-lg">
                  <p className="text-sm text-foreground/70">
                    <strong>Important:</strong> Post-traumatic growth is not an expectation or requirement for healing. It often emerges naturally as part of the recovery process, but its absence doesn't indicate failure. Each person's healing journey is unique, and all paths deserve respect and support.
                  </p>
                </div>
              </section>
              
              {/* Treatment Approaches */}
              <section id="treatment" className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Approaches to Trauma Healing</h2>
                <p className="mb-6">
                  Trauma healing is not one-size-fits-all. Effective treatment often involves a combination of approaches tailored to the individual's specific needs, experiences, and preferences. Here are some evidence-based approaches that have helped many trauma survivors on their healing journey.
                </p>
                
                <div className="space-y-8">
                  {treatmentApproaches.map(treatment => (
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
                  <h3 className="text-xl font-semibold mb-4">Principles of Trauma-Informed Care</h3>
                  <p className="mb-4">
                    When seeking help for trauma, look for providers who practice trauma-informed care, which is guided by these key principles:
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      <div>
                        <h4 className="font-medium">Safety</h4>
                        <p className="text-sm text-foreground/70">Creating physical and emotional safety throughout the treatment process</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      <div>
                        <h4 className="font-medium">Trustworthiness and Transparency</h4>
                        <p className="text-sm text-foreground/70">Building trust through clear communication and boundaries</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      <div>
                        <h4 className="font-medium">Peer Support</h4>
                        <p className="text-sm text-foreground/70">Recognizing the value of shared experiences and mutual support</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      <div>
                        <h4 className="font-medium">Collaboration and Mutuality</h4>
                        <p className="text-sm text-foreground/70">Sharing power and decision-making between provider and client</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      <div>
                        <h4 className="font-medium">Empowerment and Choice</h4>
                        <p className="text-sm text-foreground/70">Prioritizing individual agency and building on strengths</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      <div>
                        <h4 className="font-medium">Cultural, Historical, and Gender Considerations</h4>
                        <p className="text-sm text-foreground/70">Recognizing and addressing the impact of cultural context and identity</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              
              {/* Self-Help Strategies */}
              <section id="self-help" className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Self-Help Strategies for Trauma Recovery</h2>
                <p className="mb-6">
                  While professional support is often crucial for trauma healing, there are many practices you can incorporate into your daily life to support your recovery journey. These strategies can complement professional treatment and help you build resilience and self-regulation skills.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="card p-6">
                    <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mb-4 text-[var(--primary)]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 010-7.072m12.728 0l-3.536 3.536M6.414 8.464l3.536 3.536" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Grounding Techniques</h3>
                    <p className="mb-3 text-foreground/70">
                      Grounding techniques help you stay present when you're feeling overwhelmed, triggered, or dissociated.
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-foreground/70">
                      <li>
                        <strong>5-4-3-2-1 Technique:</strong> Name 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste
                      </li>
                      <li>
                        <strong>Physical grounding:</strong> Feel your feet on the floor, press your hands together, or hold a cold or textured object
                      </li>
                      <li>
                        <strong>Breathing exercises:</strong> Practice deep, slow breathing, focusing on the sensation of air moving in and out
                      </li>
                      <li>
                        <strong>Mental grounding:</strong> Count backwards from 100 by 7s, name animals alphabetically, or recite a poem or song lyrics
                      </li>
                    </ul>
                  </div>
                  
                  <div className="card p-6">
                    <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mb-4 text-[var(--primary)]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Self-Regulation Skills</h3>
                    <p className="mb-3 text-foreground/70">
                      Learning to regulate your nervous system can help you manage trauma responses and expand your window of tolerance.
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-foreground/70">
                      <li>
                        <strong>Body scan meditation:</strong> Systematically bring awareness to each part of your body, noticing sensations without judgment
                      </li>
                      <li>
                        <strong>Progressive muscle relaxation:</strong> Tense and then release each muscle group in your body
                      </li>
                      <li>
                        <strong>Rhythmic movement:</strong> Engage in activities with rhythm like walking, dancing, drumming, or rocking
                      </li>
                      <li>
                        <strong>Temperature regulation:</strong> Use cold water on your face or hands, or hold an ice cube when feeling overwhelmed
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="card p-6">
                    <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mb-4 text-[var(--primary)]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Emotional Processing</h3>
                    <p className="mb-3 text-foreground/70">
                      Finding safe ways to process and express emotions is an important part of trauma recovery.
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-foreground/70">
                      <li>
                        <strong>Journaling:</strong> Write about your experiences, feelings, and thoughts without judgment
                      </li>
                      <li>
                        <strong>Creative expression:</strong> Use art, music, dance, or other creative outlets to express emotions that may be difficult to put into words
                      </li>
                      <li>
                        <strong>Mindful emotion awareness:</strong> Practice noticing and naming your emotions without trying to change them
                      </li>
                      <li>
                        <strong>Self-compassion practices:</strong> Treat yourself with the same kindness you would offer a good friend
                      </li>
                    </ul>
                  </div>
                  
                  <div className="card p-6">
                    <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mb-4 text-[var(--primary)]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Building Connection</h3>
                    <p className="mb-3 text-foreground/70">
                      Safe, supportive relationships are powerful healing factors in trauma recovery.
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-foreground/70">
                      <li>
                        <strong>Identify safe people:</strong> Recognize who in your life feels safe and supportive
                      </li>
                      <li>
                        <strong>Set boundaries:</strong> Practice communicating your needs and limits in relationships
                      </li>
                      <li>
                        <strong>Seek community:</strong> Consider support groups, either in-person or online, with others who have similar experiences
                      </li>
                      <li>
                        <strong>Practice vulnerability:</strong> Gradually share your authentic self with trusted others
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="card p-6">
                    <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mb-4 text-[var(--primary)]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Lifestyle Foundations</h3>
                    <p className="mb-3 text-foreground/70">
                      Basic self-care practices create a foundation for healing and resilience.
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-foreground/70">
                      <li>
                        <strong>Sleep hygiene:</strong> Establish regular sleep patterns and a calming bedtime routine
                      </li>
                      <li>
                        <strong>Nutrition:</strong> Eat regular, balanced meals to support brain function and energy levels
                      </li>
                      <li>
                        <strong>Movement:</strong> Find forms of physical activity that feel good and safe in your body
                      </li>
                      <li>
                        <strong>Nature connection:</strong> Spend time outdoors, which can have calming effects on the nervous system
                      </li>
                      <li>
                        <strong>Limit substances:</strong> Be mindful of alcohol, caffeine, and other substances that can affect mood and sleep
                      </li>
                    </ul>
                  </div>
                  
                  <div className="card p-6">
                    <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mb-4 text-[var(--primary)]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Creating Safety</h3>
                    <p className="mb-3 text-foreground/70">
                      Establishing a sense of safety is fundamental to trauma recovery.
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-foreground/70">
                      <li>
                        <strong>Physical safety:</strong> Take practical steps to ensure your environment is safe
                      </li>
                      <li>
                        <strong>Emotional safety:</strong> Identify and limit exposure to people or situations that feel unsafe or triggering
                      </li>
                      <li>
                        <strong>Create a sanctuary:</strong> Designate a space in your home that feels calm and comforting
                      </li>
                      <li>
                        <strong>Develop a safety plan:</strong> Know what to do and who to contact if you feel overwhelmed or unsafe
                      </li>
                      <li>
                        <strong>Predictability:</strong> Establish routines that provide a sense of structure and predictability
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-8 p-6 bg-[var(--background-alt)] rounded-lg">
                  <h3 className="text-lg font-semibold mb-3">Important Reminder</h3>
                  <p className="text-foreground/70">
                    Self-help strategies are valuable complements to professional support, not replacements. Trauma healing often requires guidance from trained professionals, especially for complex or developmental trauma. Be patient with yourself—healing is not linear, and it's normal to have setbacks along the way.
                  </p>
                </div>
              </section>
              
              {/* When to Seek Help */}
              <section id="seek-help" className="mb-12">
                <h2 className="text-2xl font-bold mb-6">When to Seek Professional Help</h2>
                <p className="mb-6">
                  While self-help strategies can be valuable tools in trauma recovery, there are times when professional support is necessary. Recognizing when to seek help is an important part of taking care of yourself.
                </p>
                
                <div className="card p-6 shadow-depth mb-8">
                  <h3 className="text-xl font-semibold mb-4">Consider Professional Help If:</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Your symptoms are interfering with daily functioning</h4>
                        <p className="text-foreground/70">
                          If trauma symptoms are making it difficult to work, maintain relationships, or take care of basic needs, professional help can provide targeted support.
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
                        <h4 className="font-medium mb-1">You're using substances or unhealthy behaviors to cope</h4>
                        <p className="text-foreground/70">
                          If you find yourself relying on alcohol, drugs, self-harm, or other potentially harmful behaviors to manage trauma symptoms, professional support is important.
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
                        <h4 className="font-medium mb-1">You're experiencing suicidal thoughts or impulses</h4>
                        <p className="text-foreground/70">
                          If you're having thoughts of suicide or self-harm, please seek immediate help from a mental health professional or crisis service.
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
                        <h4 className="font-medium mb-1">Your trauma symptoms are persistent or worsening</h4>
                        <p className="text-foreground/70">
                          If symptoms aren't improving with time and self-help strategies, or if they're getting worse, professional treatment can help.
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
                        <h4 className="font-medium mb-1">You're experiencing severe dissociation or flashbacks</h4>
                        <p className="text-foreground/70">
                          If you're having episodes where you lose touch with reality, lose time, or feel like you're reliving the traumatic event, professional help is important for safety and recovery.
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
                        <h4 className="font-medium mb-1">You want to process specific traumatic experiences</h4>
                        <p className="text-foreground/70">
                          Working through specific traumatic memories is best done with the guidance of a trained trauma professional who can help you process these experiences safely.
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
                    <li>Severe dissociation where safety is at risk</li>
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
                
                <h3 className="text-xl font-semibold mb-4">Finding Trauma-Informed Help</h3>
                <p className="mb-4">
                  When seeking help for trauma, it's important to find providers who are specifically trained in trauma-informed care and trauma-specific treatments.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="card p-5">
                    <h4 className="font-medium mb-2">Types of Trauma-Informed Providers</h4>
                    <ul className="list-disc pl-5 space-y-1 text-foreground/70">
                      <li>Trauma-focused therapists (psychologists, social workers, counselors)</li>
                      <li>Psychiatrists with trauma specialization</li>
                      <li>Somatic practitioners (somatic experiencing practitioners, sensorimotor psychotherapists)</li>
                      <li>EMDR certified therapists</li>
                      <li>Trauma-informed yoga teachers or body workers</li>
                    </ul>
                  </div>
                  
                  <div className="card p-5">
                    <h4 className="font-medium mb-2">How to Find Help</h4>
                    <ul className="list-disc pl-5 space-y-1 text-foreground/70">
                      <li>Ask for referrals from trusted healthcare providers</li>
                      <li>Contact your insurance company for in-network providers</li>
                      <li>Use therapist directories like Psychology Today, filtering for trauma specialization</li>
                      <li>Reach out to trauma-specific organizations for referrals</li>
                      <li>Consider telehealth options if local resources are limited</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-[var(--background-alt)] rounded-lg">
                  <p className="text-sm text-foreground/70">
                    <strong>Finding the right fit:</strong> It's important to find a provider you feel comfortable with. It's okay to meet with several providers before deciding who to work with, and it's okay to change providers if the relationship doesn't feel right. The therapeutic relationship itself is a crucial part of trauma healing.
                  </p>
                </div>
              </section>
              
              {/* Supporting Someone with Trauma */}
              <section id="supporting-others" className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Supporting Someone with Trauma</h2>
                <p className="mb-6">
                  If someone you care about has experienced trauma, your support can make a significant difference in their healing journey. Here are some ways to be supportive while also respecting boundaries and taking care of yourself.
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
                          Learn about trauma and its effects. Understanding trauma responses can help you recognize that behaviors like withdrawal, irritability, or emotional numbness are often trauma responses, not personal choices or flaws.
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
                          Create space for the person to share their experiences if they choose to, without pressure to talk or expectations about how they "should" feel or heal. Avoid statements like "you should be over it by now" or "at least it wasn't as bad as..."
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
                        <h3 className="font-medium mb-2">Prioritize Safety and Trust</h3>
                        <p className="text-foreground/70">
                          Be reliable, consistent, and transparent in your interactions. Respect boundaries and ask before offering physical comfort like hugs. Recognize that building trust may take time, especially if the trauma involved betrayal or violation of trust.
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
                          Different people need different kinds of support. Ask what would be most helpful rather than assuming you know what they need. Sometimes practical support like helping with errands or accompanying them to appointments can be as valuable as emotional support.
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
                        <h3 className="font-medium mb-2">Encourage Professional Support</h3>
                        <p className="text-foreground/70">
                          Gently suggest professional help if appropriate, but avoid pressuring or making the person feel inadequate for needing support. Offer to help them find resources or accompany them to appointments if they'd like.
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
                          Healing from trauma takes time and isn't linear. There may be setbacks, and progress might not always be visible. Patience, consistency, and ongoing support are invaluable.
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
                          Supporting someone with trauma can be emotionally demanding. Maintain your own self-care practices, set healthy boundaries, and seek support for yourself when needed. You can't effectively support others if you're depleted.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 p-6 bg-[var(--primary)]/5 rounded-xl">
                  <h3 className="text-xl font-semibold mb-4">What Not to Do</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <div>
                        <h4 className="font-medium">Don't pressure them to talk</h4>
                        <p className="text-sm text-foreground/70">Forcing someone to discuss trauma can be retraumatizing</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <div>
                        <h4 className="font-medium">Don't minimize their experience</h4>
                        <p className="text-sm text-foreground/70">Avoid saying things like "it could have been worse" or "you'll get over it"</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <div>
                        <h4 className="font-medium">Don't take their reactions personally</h4>
                        <p className="text-sm text-foreground/70">Trauma responses aren't about you, even if they're triggered during interactions with you</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <div>
                        <h4 className="font-medium">Don't try to "fix" them</h4>
                        <p className="text-sm text-foreground/70">Healing is their journey; your role is to support, not to rescue or solve</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              
              {/* Resources and Support */}
              <section id="resources" className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Resources and Support</h2>
                <p className="mb-6">
                  There are many resources available to support trauma recovery. Here are some organizations, books, and tools that may be helpful on your healing journey.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="card p-6">
                    <h3 className="text-xl font-semibold mb-3">National Organizations</h3>
                    <ul className="space-y-3">
                      <li>
                        <a href="https://www.traumaresourceinstitute.com/" target="_blank" rel="noopener noreferrer" className="flex items-start hover:text-[var(--primary)]">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 015.656 0l4 4a4 4 0 01-5.656 5.656l-1.1-1.1" />
                          </svg>
                          <div>
                            <span className="font-medium">Trauma Resource Institute</span>
                            <p className="text-sm text-foreground/70">Resources and training for trauma resilience</p>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="https://www.ptsd.va.gov/" target="_blank" rel="noopener noreferrer" className="flex items-start hover:text-[var(--primary)]">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 015.656 0l4 4a4 4 0 01-5.656 5.656l-1.1-1.1" />
                          </svg>
                          <div>
                            <span className="font-medium">National Center for PTSD</span>
                            <p className="text-sm text-foreground/70">Research and educational resources on PTSD</p>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="https://www.thetraumainformedteacher.com/" target="_blank" rel="noopener noreferrer" className="flex items-start hover:text-[var(--primary)]">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 015.656 0l4 4a4 4 0 01-5.656 5.656l-1.1-1.1" />
                          </svg>
                          <div>
                            <span className="font-medium">International Society for Traumatic Stress Studies</span>
                            <p className="text-sm text-foreground/70">Professional organization dedicated to trauma research and treatment</p>
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
                    <h3 className="text-xl font-semibold mb-3">Recommended Books</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        <div>
                          <span className="font-medium">"The Body Keeps the Score" by Bessel van der Kolk</span>
                          <p className="text-sm text-foreground/70">Explores how trauma affects the body and brain, and approaches to healing</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        <div>
                          <span className="font-medium">"Trauma and Recovery" by Judith Herman</span>
                          <p className="text-sm text-foreground/70">A foundational text on understanding trauma and the recovery process</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        <div>
                          <span className="font-medium">"Waking the Tiger" by Peter Levine</span>
                          <p className="text-sm text-foreground/70">Introduces somatic experiencing approach to healing trauma</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        <div>
                          <span className="font-medium">"Complex PTSD: From Surviving to Thriving" by Pete Walker</span>
                          <p className="text-sm text-foreground/70">Focused on healing from childhood trauma and neglect</p>
                        </div>
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
                            <span className="font-medium">PTSD Coach</span>
                            <p className="text-sm text-foreground/70">Developed by the VA, provides education, self-assessment, and coping tools</p>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                          <div>
                            <span className="font-medium">Calm Harm</span>
                            <p className="text-sm text-foreground/70">Helps manage urges to self-harm with grounding and distraction techniques</p>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                          <div>
                            <span className="font-medium">Insight Timer</span>
                            <p className="text-sm text-foreground/70">Free meditation app with specific meditations for trauma and PTSD</p>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                          <div>
                            <span className="font-medium">TherapyKin</span>
                            <p className="text-sm text-foreground/70">AI-powered therapeutic support available whenever you need it</p>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-8 p-6 bg-[var(--primary)]/5 rounded-xl">
                  <h3 className="text-xl font-semibold mb-4">For Family and Friends</h3>
                  <p className="mb-4">
                    Supporting someone with trauma can be challenging. Here are some resources specifically for family members and friends:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-foreground/80">
                    <li>"Allies in Healing" by Laura Davis</li>
                    <li>"Loving Someone with PTSD" by Aphrodite T. Matsakis</li>
                    <li>NAMI Family-to-Family Education Program</li>
                    <li>Mental Health First Aid training</li>
                    <li>Support groups for families and loved ones of trauma survivors</li>
                  </ul>
                </div>
              </section>
              
              {/* Conclusion */}
              <section id="conclusion" className="mb-12">
                <h2 className="text-2xl font-bold mb-6">The Journey of Trauma Recovery</h2>
                <p className="mb-4">
                  Healing from trauma is not about erasing what happened or returning to who you were before the trauma. Rather, it's about integrating the experience into your life story in a way that allows you to move forward with greater resilience, self-awareness, and capacity for connection.
                </p>
                <p className="mb-4">
                  Recovery is rarely a linear process. There may be setbacks, triggers, and difficult periods along the way. This doesn't mean you're failing or that healing isn't happening. Each step of the journey—even the challenging ones—can contribute to your growth and healing.
                </p>
                <p className="mb-4">
                  Remember that you are not defined by what happened to you. Trauma is something you experienced, not who you are. With appropriate support, time, and compassionate self-care, it's possible to heal from even the most profound trauma and create a life of meaning, connection, and joy.
                </p>
                
                <div className="card p-6 shadow-depth mt-8">
                  <h3 className="text-xl font-semibold mb-4">Key Takeaways</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <p className="text-foreground/80">
                        Trauma affects both the brain and body, leading to a range of physical, emotional, cognitive, and behavioral responses.
                      </p>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <p className="text-foreground/80">
                        There are different types of trauma, including acute, chronic, complex, developmental, historical, vicarious, and medical trauma.
                      </p>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <p className="text-foreground/80">
                        Trauma responses are normal reactions to abnormal situations—they are adaptive mechanisms that helped you survive.
                      </p>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <p className="text-foreground/80">
                        Effective trauma treatment often involves a combination of approaches that address both the psychological and physiological aspects of trauma.
                      </p>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <p className="text-foreground/80">
                        Self-help strategies like grounding techniques, self-regulation skills, and building connection can complement professional treatment.
                      </p>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <p className="text-foreground/80">
                        Many trauma survivors experience post-traumatic growth—positive psychological changes that emerge from the struggle with highly challenging circumstances.
                      </p>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <p className="text-foreground/80">
                        Recovery is possible—with appropriate support, time, and compassionate self-care, it's possible to heal from even profound trauma.
                      </p>
                    </li>
                  </ul>
                </div>
              </section>
              
              {/* Share Links */}
              <div className="mb-12">
                <h3 className="font-semibold mb-4">Share this resource</h3>
                <ShareButtons 
                  title="Understanding Trauma and Its Effects" 
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
                    What is Trauma?
                  </a>
                  <a 
                    href="#types" 
                    className="block text-foreground/70 hover:text-[var(--primary)] py-1 border-l-2 border-transparent hover:border-[var(--primary)] pl-3 transition-all"
                  >
                    Types of Trauma
                  </a>
                  <a 
                    href="#effects" 
                    className="block text-foreground/70 hover:text-[var(--primary)] py-1 border-l-2 border-transparent hover:border-[var(--primary)] pl-3 transition-all"
                  >
                    How Trauma Affects the Brain and Body
                  </a>
                  <a 
                    href="#symptoms" 
                    className="block text-foreground/70 hover:text-[var(--primary)] py-1 border-l-2 border-transparent hover:border-[var(--primary)] pl-3 transition-all"
                  >
                    Signs and Symptoms
                  </a>
                  <a 
                    href="#growth" 
                    className="block text-foreground/70 hover:text-[var(--primary)] py-1 border-l-2 border-transparent hover:border-[var(--primary)] pl-3 transition-all"
                  >
                    Post-Traumatic Growth
                  </a>
                  <a 
                    href="#treatment" 
                    className="block text-foreground/70 hover:text-[var(--primary)] py-1 border-l-2 border-transparent hover:border-[var(--primary)] pl-3 transition-all"
                  >
                    Approaches to Trauma Healing
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
                    When to Seek Professional Help
                  </a>
                  <a 
                    href="#supporting-others" 
                    className="block text-foreground/70 hover:text-[var(--primary)] py-1 border-l-2 border-transparent hover:border-[var(--primary)] pl-3 transition-all"
                  >
                    Supporting Someone with Trauma
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
                    The Journey of Trauma Recovery
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
                  Get a PDF version of this comprehensive guide to read offline or share with others.
                </p>
                <PDFDownloadButton
                  title="Understanding Trauma and Its Effects"
                  subtitle="TherapyKin Resource"
                  filename="TherapyKin-Trauma-Guide.pdf"
                  contentId="trauma-guide-content"
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
              
              {/* Need Help? */}
              <div className="card p-6">
                <h3 className="text-lg font-semibold mb-4">Need Help Now?</h3>
                <p className="text-sm text-foreground/70 mb-4">
                  If you're experiencing severe distress or having thoughts of harming yourself, please reach out for immediate support.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="font-medium">National Suicide Prevention Lifeline:</span>
                  </div>
                  <p className="pl-7">988 or 1-800-273-8255</p>
                  
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
