'use client';

import React, { useState } from "react";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ShareButtons from "../../components/ShareButtons";
import PDFDownloadButton from "../../components/PDFDownloadButton";

// Define the self-care categories and their items
const selfCareCategories = [
  {
    id: "physical",
    name: "Physical Self-Care",
    description: "Activities that improve your physical wellbeing",
    items: [
      { id: "sleep", text: "I get 7-9 hours of quality sleep most nights" },
      { id: "nutrition", text: "I eat nutritious, balanced meals regularly" },
      { id: "water", text: "I stay hydrated throughout the day" },
      { id: "exercise", text: "I engage in physical activity that I enjoy" },
      { id: "checkups", text: "I attend regular health check-ups" },
      { id: "rest", text: "I take breaks when I'm tired" },
      { id: "hygiene", text: "I maintain personal hygiene practices that make me feel good" }
    ]
  },
  {
    id: "emotional",
    name: "Emotional Self-Care",
    description: "Activities that help you connect with, process, and express your feelings",
    items: [
      { id: "express", text: "I have healthy ways to express my emotions" },
      { id: "positive", text: "I make time for activities that bring me joy" },
      { id: "compassion", text: "I practice self-compassion when I make mistakes" },
      { id: "boundaries", text: "I set and maintain healthy emotional boundaries" },
      { id: "stress", text: "I have effective strategies to manage stress" },
      { id: "feelings", text: "I allow myself to feel and process difficult emotions" },
      { id: "praise", text: "I acknowledge my accomplishments and strengths" }
    ]
  },
  {
    id: "mental",
    name: "Mental Self-Care",
    description: "Activities that stimulate your mind and help you stay mentally sharp",
    items: [
      { id: "learning", text: "I make time for learning new things" },
      { id: "creativity", text: "I engage in creative activities that I enjoy" },
      { id: "stimulation", text: "I seek mental stimulation and challenges" },
      { id: "media", text: "I'm mindful about the media I consume" },
      { id: "organization", text: "I have strategies to stay organized" },
      { id: "mindfulness", text: "I practice mindfulness or other mental relaxation techniques" },
      { id: "reflection", text: "I take time to reflect on my experiences" }
    ]
  },
  {
    id: "social",
    name: "Social Self-Care",
    description: "Activities that help you maintain healthy relationships and feel connected",
    items: [
      { id: "connection", text: "I regularly connect with people who support me" },
      { id: "boundaries", text: "I set and maintain healthy social boundaries" },
      { id: "meaningful", text: "I make time for meaningful social interactions" },
      { id: "ask", text: "I ask for help when I need it" },
      { id: "reciprocal", text: "I nurture reciprocal relationships" },
      { id: "community", text: "I participate in community or group activities" },
      { id: "conflict", text: "I address conflicts in relationships constructively" }
    ]
  },
  {
    id: "spiritual",
    name: "Spiritual Self-Care",
    description: "Activities that nurture your spirit and help you find meaning",
    items: [
      { id: "nature", text: "I spend time in nature or other environments that inspire me" },
      { id: "meaning", text: "I engage in activities that give me a sense of meaning or purpose" },
      { id: "values", text: "I make choices aligned with my core values" },
      { id: "practices", text: "I engage in spiritual practices that resonate with me" },
      { id: "gratitude", text: "I regularly practice gratitude" },
      { id: "inspiration", text: "I seek out inspiration through various sources" },
      { id: "reflection", text: "I reflect on what gives my life meaning" }
    ]
  },
  {
    id: "professional",
    name: "Professional Self-Care",
    description: "Activities that help you maintain wellbeing at work",
    items: [
      { id: "breaks", text: "I take breaks during the workday" },
      { id: "boundaries", text: "I maintain healthy boundaries between work and personal life" },
      { id: "environment", text: "I create a comfortable and supportive work environment" },
      { id: "support", text: "I seek support from colleagues when needed" },
      { id: "development", text: "I pursue professional development opportunities" },
      { id: "realistic", text: "I set realistic work expectations and goals" },
      { id: "balance", text: "I strive for work-life balance" }
    ]
  }
];

// Rating options
const ratingOptions = [
  { value: 0, label: "Never" },
  { value: 1, label: "Rarely" },
  { value: 2, label: "Sometimes" },
  { value: 3, label: "Often" },
  { value: 4, label: "Consistently" }
];

export default function SelfCareAssessment() {
  // Check if we're in the browser
  const isBrowser = typeof window !== 'undefined';
  
  // State for active section (for mobile accordion view)
  const [activeSection, setActiveSection] = useState<string | null>("introduction");
  
  // State for assessment responses
  const [responses, setResponses] = useState<Record<string, number>>({});
  
  // State for action plan
  const [actionPlan, setActionPlan] = useState<Record<string, string[]>>({
    physical: [""],
    emotional: [""],
    mental: [""],
    social: [""],
    spiritual: [""],
    professional: [""]
  });
  
  // State for tracking which step the user is on
  const [currentStep, setCurrentStep] = useState<"assessment" | "results" | "planning">("assessment");
  
  // Toggle section visibility (for mobile)
  const toggleSection = (sectionId: string) => {
    if (activeSection === sectionId) {
      setActiveSection(null);
    } else {
      setActiveSection(sectionId);
    }
  };
  
  // Handle rating change
  const handleRatingChange = (categoryId: string, itemId: string, value: number) => {
    setResponses({
      ...responses,
      [`${categoryId}-${itemId}`]: value
    });
  };
  
  // Handle action plan change
  const handleActionPlanChange = (category: string, index: number, value: string) => {
    const updatedPlan = { ...actionPlan };
    
    // If this is the last item and it's not empty, add a new empty item
    if (index === updatedPlan[category].length - 1 && value.trim() !== "") {
      updatedPlan[category].push("");
    }
    
    // Update the value
    updatedPlan[category][index] = value;
    
    // Remove empty items (except the last one)
    if (value.trim() === "" && index !== updatedPlan[category].length - 1) {
      updatedPlan[category].splice(index, 1);
    }
    
    setActionPlan(updatedPlan);
  };
  
  // Calculate category scores
  const calculateCategoryScores = () => {
    const scores: Record<string, { score: number, maxScore: number, percentage: number }> = {};
    
    selfCareCategories.forEach(category => {
      let categoryScore = 0;
      let itemsAnswered = 0;
      
      category.items.forEach(item => {
        const responseKey = `${category.id}-${item.id}`;
        if (responses[responseKey] !== undefined) {
          categoryScore += responses[responseKey];
          itemsAnswered++;
        }
      });
      
      const maxScore = itemsAnswered * 4; // 4 is the max rating value
      const percentage = maxScore > 0 ? Math.round((categoryScore / maxScore) * 100) : 0;
      
      scores[category.id] = {
        score: categoryScore,
        maxScore,
        percentage
      };
    });
    
    return scores;
  };
  
  // Get color based on percentage
  const getColorForPercentage = (percentage: number) => {
    if (percentage >= 75) return "bg-green-500 dark:bg-green-600";
    if (percentage >= 50) return "bg-yellow-500 dark:bg-yellow-600";
    if (percentage >= 25) return "bg-orange-500 dark:bg-orange-600";
    return "bg-red-500 dark:bg-red-600";
  };
  
  // Get text color based on percentage
  const getTextColorForPercentage = (percentage: number) => {
    if (percentage >= 75) return "text-green-600 dark:text-green-400";
    if (percentage >= 50) return "text-yellow-600 dark:text-yellow-400";
    if (percentage >= 25) return "text-orange-600 dark:text-orange-400";
    return "text-red-600 dark:text-red-400";
  };
  
  // Get recommendation based on percentage
  const getRecommendation = (percentage: number) => {
    if (percentage >= 75) {
      return "You're doing well in this area. Continue your current practices and consider sharing what works with others.";
    }
    if (percentage >= 50) {
      return "You have a good foundation in this area. Consider adding 1-2 more practices to strengthen your self-care routine.";
    }
    if (percentage >= 25) {
      return "This area needs attention. Try to incorporate at least 2-3 new practices into your routine.";
    }
    return "This is a priority area for improvement. Start with small, manageable changes and build gradually.";
  };
  
  // Calculate overall scores
  const categoryScores = calculateCategoryScores();
  
  // Calculate overall percentage
  const calculateOverallPercentage = () => {
    let totalScore = 0;
    let totalMaxScore = 0;
    
    Object.values(categoryScores).forEach(({ score, maxScore }) => {
      totalScore += score;
      totalMaxScore += maxScore;
    });
    
    return totalMaxScore > 0 ? Math.round((totalScore / totalMaxScore) * 100) : 0;
  };
  
  const overallPercentage = calculateOverallPercentage();
  
  // Get the current URL for sharing
  const currentUrl = typeof window !== 'undefined' 
    ? window.location.href 
    : 'https://therapykin.ai/resources/self-care-assessment';
  
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
                      Self-Care Assessment
                    </span>
                  </div>
                </li>
              </ol>
            </nav>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div id="self-care-assessment-content" className="lg:w-2/3">
              {/* Resource Header */}
              <div className="mb-8">
                <span className="px-3 py-1 bg-[var(--primary)]/10 text-[var(--primary)] rounded-full text-sm font-medium">
                  Self-Care
                </span>
                <h1 className="text-3xl md:text-4xl font-bold mt-4 mb-4">Self-Care Assessment and Planning Tool</h1>
                <p className="text-xl text-foreground/70 mb-6">
                  Evaluate your current self-care practices and create a personalized plan to better support your mental wellbeing.
                </p>
              </div>
              
              {/* Step Navigation */}
              <div className="mb-8">
                <div className="flex flex-col sm:flex-row justify-between items-center p-4 bg-[var(--background-alt)] rounded-lg">
                  <div className="flex items-center mb-4 sm:mb-0">
                    <button 
                      className={`px-4 py-2 rounded-full text-sm font-medium mr-2 ${
                        currentStep === "assessment" 
                          ? "bg-[var(--primary)] text-white" 
                          : "bg-[var(--background)] hover:bg-[var(--primary)]/10"
                      }`}
                      onClick={() => setCurrentStep("assessment")}
                    >
                      1. Assessment
                    </button>
                    <button 
                      className={`px-4 py-2 rounded-full text-sm font-medium mr-2 ${
                        currentStep === "results" 
                          ? "bg-[var(--primary)] text-white" 
                          : "bg-[var(--background)] hover:bg-[var(--primary)]/10"
                      }`}
                      onClick={() => setCurrentStep("results")}
                      disabled={Object.keys(responses).length === 0}
                    >
                      2. Results
                    </button>
                    <button 
                      className={`px-4 py-2 rounded-full text-sm font-medium ${
                        currentStep === "planning" 
                          ? "bg-[var(--primary)] text-white" 
                          : "bg-[var(--background)] hover:bg-[var(--primary)]/10"
                      }`}
                      onClick={() => setCurrentStep("planning")}
                      disabled={Object.keys(responses).length === 0}
                    >
                      3. Planning
                    </button>
                  </div>
                  <div>
                    <PDFDownloadButton
                      title="Self-Care Assessment and Plan"
                      subtitle="TherapyKin Resource"
                      filename="TherapyKin-Self-Care-Assessment.pdf"
                      contentId="self-care-assessment-content"
                      className="btn-secondary text-sm px-4 py-2"
                    />
                  </div>
                </div>
              </div>
              
              {/* Introduction */}
              {currentStep === "assessment" && (
                <section id="introduction" className="mb-12">
                  <h2 className="text-2xl font-bold mb-4">Introduction</h2>
                  <p className="mb-4">
                    Self-care is any activity that we deliberately do to take care of our mental, emotional, physical, and spiritual health. While it might seem simple, many of us struggle to incorporate regular self-care into our lives.
                  </p>
                  <p className="mb-4">
                    This assessment will help you evaluate your current self-care practices across six key dimensions. By identifying areas of strength and opportunities for growth, you can create a more balanced and sustainable self-care routine.
                  </p>
                  
                  <div className="my-8 p-6 bg-[var(--primary)]/5 rounded-xl">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                      <div className="w-16 h-16 md:w-20 md:h-20 flex-shrink-0 rounded-full bg-[var(--primary)]/10 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold mb-2">How to Use This Tool</h4>
                        <p className="text-foreground/80 mb-2">
                          For each statement, rate how frequently you engage in the described self-care practice using the scale from "Never" to "Consistently." Be honest with yourself—this assessment is for your benefit.
                        </p>
                        <p className="text-foreground/80">
                          After completing the assessment, you'll receive personalized results and have the opportunity to create an action plan based on your identified needs.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="card p-6 shadow-depth mb-8">
                    <h3 className="text-xl font-semibold mb-4">The Six Dimensions of Self-Care</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selfCareCategories.map(category => (
                        <div key={category.id} className="flex items-start">
                          <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3 mt-0.5">
                            <span className="font-semibold">{category.name.charAt(0)}</span>
                          </div>
                          <div>
                            <h4 className="font-medium">{category.name}</h4>
                            <p className="text-sm text-foreground/70">{category.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-center">
                    <button 
                      className="btn-primary px-6 py-3"
                      onClick={() => {
                        setActiveSection("physical");
                        document.getElementById("assessment-section")?.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      Begin Assessment
                    </button>
                  </div>
                </section>
              )}
              
              {/* Assessment */}
              {currentStep === "assessment" && (
                <section id="assessment-section" className="mb-12">
                  <h2 className="text-2xl font-bold mb-6">Self-Care Assessment</h2>
                  
                  <div className="space-y-12">
                    {selfCareCategories.map(category => (
                      <div key={category.id} className="card p-6 shadow-sm">
                        <button 
                          className="flex justify-between items-center w-full text-left"
                          onClick={() => toggleSection(category.id)}
                        >
                          <h3 className="text-xl font-semibold">{category.name}</h3>
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className={`h-5 w-5 transition-transform ${activeSection === category.id ? 'rotate-180' : ''}`} 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        
                        {(activeSection === category.id || (isBrowser && window.innerWidth >= 1024)) && (
                          <div className="mt-4">
                            <p className="text-foreground/70 mb-4">{category.description}</p>
                            
                            <div className="overflow-x-auto">
                              <table className="w-full">
                                <thead>
                                  <tr>
                                    <th className="text-left py-2 px-4 w-1/2">Self-Care Practice</th>
                                    {ratingOptions.map(option => (
                                      <th key={option.value} className="text-center py-2 px-2">
                                        {option.label}
                                      </th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody>
                                  {category.items.map(item => (
                                    <tr key={item.id} className="border-t border-foreground/10">
                                      <td className="py-3 px-4">{item.text}</td>
                                      {ratingOptions.map(option => (
                                        <td key={option.value} className="text-center py-3 px-2">
                                          <input 
                                            type="radio" 
                                            name={`${category.id}-${item.id}`}
                                            value={option.value}
                                            checked={responses[`${category.id}-${item.id}`] === option.value}
                                            onChange={() => handleRatingChange(category.id, item.id, option.value)}
                                            className="w-4 h-4 text-[var(--primary)] focus:ring-[var(--primary)]"
                                          />
                                        </td>
                                      ))}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8 flex justify-center">
                    <button 
                      className="btn-primary px-6 py-3"
                      onClick={() => setCurrentStep("results")}
                      disabled={Object.keys(responses).length === 0}
                    >
                      View Results
                    </button>
                  </div>
                </section>
              )}
              
              {/* Results */}
              {currentStep === "results" && (
                <section id="results" className="mb-12">
                  <h2 className="text-2xl font-bold mb-6">Your Self-Care Assessment Results</h2>
                  
                  {Object.keys(responses).length === 0 ? (
                    <div className="card p-8 text-center">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--background-alt)] flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-foreground/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold mb-2">No Assessment Data</h3>
                      <p className="text-foreground/70 mb-4">Please complete the assessment first to view your results.</p>
                      <button 
                        className="btn-primary text-sm px-4 py-2"
                        onClick={() => setCurrentStep("assessment")}
                      >
                        Go to Assessment
                      </button>
                    </div>
                  ) : (
                    <>
                      {/* Overall Score */}
                      <div className="card p-6 shadow-depth mb-8">
                        <h3 className="text-xl font-semibold mb-4 text-center">Overall Self-Care Score</h3>
                        <div className="flex justify-center mb-4">
                          <div className="w-32 h-32 rounded-full border-8 border-[var(--background-alt)] flex items-center justify-center relative">
                            <div 
                              className="absolute inset-0 rounded-full"
                              style={{
                                background: `conic-gradient(${getColorForPercentage(overallPercentage)} ${overallPercentage}%, transparent 0)`,
                                clipPath: 'circle(50% at 50% 50%)'
                              }}
                            ></div>
                            <div className="bg-[var(--background)] rounded-full w-24 h-24 flex items-center justify-center z-10">
                              <span className={`text-3xl font-bold ${getTextColorForPercentage(overallPercentage)}`}>
                                {overallPercentage}%
                              </span>
                            </div>
                          </div>
                        </div>
                        <p className="text-center text-foreground/70 mb-2">
                          Based on your responses, your overall self-care score is <strong>{overallPercentage}%</strong>.
                        </p>
                        <p className="text-center text-foreground/70">
                          {overallPercentage >= 75 ? (
                            "You have a strong self-care practice across multiple dimensions. Keep up the good work!"
                          ) : overallPercentage >= 50 ? (
                            "You have a moderate self-care practice with room for improvement in some areas."
                          ) : overallPercentage >= 25 ? (
                            "Your self-care practice needs attention in several areas. Consider making self-care more of a priority."
                          ) : (
                            "Your self-care practice needs significant improvement. Start with small, consistent changes."
                          )}
                        </p>
                      </div>
                      
                      {/* Category Scores */}
                      <div className="mb-8">
                        <h3 className="text-xl font-semibold mb-4">Dimension Breakdown</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {selfCareCategories.map(category => {
                            const score = categoryScores[category.id];
                            return (
                              <div key={category.id} className="card p-5 hover:shadow-depth transition-all">
                                <div className="flex justify-between items-center mb-3">
                                  <h4 className="font-semibold">{category.name}</h4>
                                  <span className={`font-bold ${getTextColorForPercentage(score.percentage)}`}>
                                    {score.percentage}%
                                  </span>
                                </div>
                                <div className="w-full bg-[var(--background-alt)] rounded-full h-2.5 mb-4">
                                  <div 
                                    className={`h-2.5 rounded-full ${getColorForPercentage(score.percentage)}`}
                                    style={{ width: `${score.percentage}%` }}
                                  ></div>
                                </div>
                                <p className="text-sm text-foreground/70 mb-3">
                                  {getRecommendation(score.percentage)}
                                </p>
                                <button 
                                  className="text-[var(--primary)] text-sm font-medium hover:underline"
                                  onClick={() => {
                                    setCurrentStep("planning");
                                    setTimeout(() => {
                                      document.getElementById(`plan-${category.id}`)?.scrollIntoView({ behavior: "smooth" });
                                    }, 100);
                                  }}
                                >
                                  Create Action Plan →
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      
                      {/* Interpretation */}
                      <div className="card p-6 bg-[var(--background-alt)] mb-8">
                        <h3 className="text-xl font-semibold mb-4">Understanding Your Results</h3>
                        <p className="mb-4">
                          Your assessment results show your current self-care practices across six dimensions. Higher percentages indicate areas where you're already practicing good self-care, while lower percentages highlight opportunities for growth.
                        </p>
                        <p className="mb-4">
                          Remember that self-care is highly personal—what works for someone else might not work for you. The goal isn't to score 100% in every category, but to create a balanced self-care practice that supports your unique needs and circumstances.
                        </p>
                        <p>
                          Use these results to guide your self-care planning, focusing first on dimensions with lower scores or those that feel most important to you right now.
                        </p>
                      </div>
                      
                      <div className="flex justify-center">
                        <button 
                          className="btn-primary px-6 py-3"
                          onClick={() => setCurrentStep("planning")}
                        >
                          Create Your Self-Care Plan
                        </button>
                      </div>
                    </>
                  )}
                </section>
              )}
              
              {/* Planning */}
              {currentStep === "planning" && (
                <section id="planning" className="mb-12">
                  <h2 className="text-2xl font-bold mb-6">Your Self-Care Action Plan</h2>
                  
                  {Object.keys(responses).length === 0 ? (
                    <div className="card p-8 text-center">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--background-alt)] flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-foreground/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold mb-2">No Assessment Data</h3>
                      <p className="text-foreground/70 mb-4">Please complete the assessment first to create your action plan.</p>
                      <button 
                        className="btn-primary text-sm px-4 py-2"
                        onClick={() => setCurrentStep("assessment")}
                      >
                        Go to Assessment
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="card p-6 shadow-depth mb-8">
                        <h3 className="text-xl font-semibold mb-4">Creating Your Plan</h3>
                        <p className="mb-4">
                          Based on your assessment results, you can now create a personalized self-care action plan. For each dimension, identify specific activities or practices you want to incorporate into your routine.
                        </p>
                        <p className="mb-4">
                          Focus on activities that are:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 mb-4">
                          <li><strong>Realistic:</strong> Choose activities you can actually fit into your life</li>
                          <li><strong>Enjoyable:</strong> Self-care should feel good, not like another chore</li>
                          <li><strong>Varied:</strong> Include a mix of quick practices and deeper experiences</li>
                          <li><strong>Sustainable:</strong> Start small and build gradually</li>
                        </ul>
                        <p>
                          Remember, this plan is flexible—revisit and adjust it as your needs and circumstances change.
                        </p>
                      </div>
                      
                      <div className="space-y-8">
                        {selfCareCategories.map(category => {
                          const score = categoryScores[category.id];
                          return (
                            <div key={category.id} id={`plan-${category.id}`} className="card p-6 shadow-sm">
                              <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-semibold">{category.name}</h3>
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTextColorForPercentage(score.percentage)} bg-${getColorForPercentage(score.percentage).split(' ')[0]}/10`}>
                                  {score.percentage}%
                                </span>
                              </div>
                              
                              <p className="text-foreground/70 mb-4">
                                {getRecommendation(score.percentage)}
                              </p>
                              
                              <div className="mb-4">
                                <h4 className="font-medium mb-2">Suggested Activities:</h4>
                                <ul className="list-disc pl-5 space-y-1 text-foreground/70">
                                  {category.items
                                    .filter(item => {
                                      const responseKey = `${category.id}-${item.id}`;
                                      return !responses[responseKey] || responses[responseKey] < 3;
                                    })
                                    .slice(0, 3)
                                    .map(item => (
                                      <li key={item.id}>{item.text}</li>
                                    ))}
                                </ul>
                              </div>
                              
                              <div>
                                <h4 className="font-medium mb-2">Your Action Items:</h4>
                                <p className="text-sm text-foreground/70 mb-2">
                                  List specific self-care activities you'll incorporate into your routine:
                                </p>
                                
                                {actionPlan[category.id].map((item, index) => (
                                  <div key={index} className="mb-2">
                                    <div className="flex items-center">
                                      <span className="w-6 h-6 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-2">
                                        {index + 1}
                                      </span>
                                      <input 
                                        type="text" 
                                        value={item}
                                        onChange={(e) => handleActionPlanChange(category.id, index, e.target.value)}
                                        placeholder="e.g., Take a 10-minute walk each morning"
                                        className="flex-grow px-3 py-2 rounded-lg border border-foreground/10 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                                      />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      
                      <div className="mt-8 card p-6 bg-[var(--primary)]/5 rounded-xl">
                        <h3 className="text-xl font-semibold mb-4">Implementing Your Plan</h3>
                        <div className="space-y-4">
                          <div className="flex items-start">
                            <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3 mt-0.5">
                              <span className="font-semibold">1</span>
                            </div>
                            <div>
                              <h4 className="font-medium">Start Small</h4>
                              <p className="text-sm text-foreground/70">Begin with 1-2 activities from each dimension that feel most manageable.</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3 mt-0.5">
                              <span className="font-semibold">2</span>
                            </div>
                            <div>
                              <h4 className="font-medium">Schedule It</h4>
                              <p className="text-sm text-foreground/70">Add self-care activities to your calendar to ensure they happen.</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3 mt-0.5">
                              <span className="font-semibold">3</span>
                            </div>
                            <div>
                              <h4 className="font-medium">Track Progress</h4>
                              <p className="text-sm text-foreground/70">Keep notes on how different activities affect your wellbeing.</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3 mt-0.5">
                              <span className="font-semibold">4</span>
                            </div>
                            <div>
                              <h4 className="font-medium">Adjust as Needed</h4>
                              <p className="text-sm text-foreground/70">Revisit this assessment monthly and update your plan based on what's working.</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mr-3 mt-0.5">
                              <span className="font-semibold">5</span>
                            </div>
                            <div>
                              <h4 className="font-medium">Be Compassionate</h4>
                              <p className="text-sm text-foreground/70">Treat yourself with kindness if you miss a day or need to change your approach.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-8 flex justify-center">
                        <PDFDownloadButton
                          title="Self-Care Assessment and Plan"
                          subtitle="TherapyKin Resource"
                          filename="TherapyKin-Self-Care-Assessment.pdf"
                          contentId="self-care-assessment-content"
                          className="btn-primary px-6 py-3"
                        />
                      </div>
                    </>
                  )}
                </section>
              )}
              
              {/* Share Links */}
              <div className="mb-12">
                <h3 className="font-semibold mb-4">Share this resource</h3>
                <ShareButtons 
                  title="Self-Care Assessment and Planning Tool" 
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
                <h3 className="text-lg font-semibold mb-4">In This Tool</h3>
                <nav className="space-y-2">
                  <button 
                    onClick={() => {
                      setCurrentStep("assessment");
                      setActiveSection("introduction");
                    }}
                    className={`block text-foreground/70 hover:text-[var(--primary)] py-1 border-l-2 ${currentStep === "assessment" && activeSection === "introduction" ? "border-[var(--primary)] text-[var(--primary)]" : "border-transparent hover:border-[var(--primary)]"} pl-3 transition-all w-full text-left`}
                  >
                    Introduction
                  </button>
                  <button 
                    onClick={() => {
                      setCurrentStep("assessment");
                      document.getElementById("assessment-section")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className={`block text-foreground/70 hover:text-[var(--primary)] py-1 border-l-2 ${currentStep === "assessment" && activeSection !== "introduction" ? "border-[var(--primary)] text-[var(--primary)]" : "border-transparent hover:border-[var(--primary)]"} pl-3 transition-all w-full text-left`}
                  >
                    Self-Care Assessment
                  </button>
                  <button 
                    onClick={() => setCurrentStep("results")}
                    className={`block text-foreground/70 hover:text-[var(--primary)] py-1 border-l-2 ${currentStep === "results" ? "border-[var(--primary)] text-[var(--primary)]" : "border-transparent hover:border-[var(--primary)]"} pl-3 transition-all w-full text-left`}
                    disabled={Object.keys(responses).length === 0}
                  >
                    Your Results
                  </button>
                  <button 
                    onClick={() => setCurrentStep("planning")}
                    className={`block text-foreground/70 hover:text-[var(--primary)] py-1 border-l-2 ${currentStep === "planning" ? "border-[var(--primary)] text-[var(--primary)]" : "border-transparent hover:border-[var(--primary)]"} pl-3 transition-all w-full text-left`}
                    disabled={Object.keys(responses).length === 0}
                  >
                    Action Planning
                  </button>
                </nav>
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
                      <h4 className="font-medium mb-1">Sleep and Mental Health</h4>
                      <p className="text-sm text-foreground/70 mb-2">Research on sleep's impact on mental wellbeing</p>
                      <Link href="/resources/sleep-mental-health" className="text-xs text-[var(--primary)] font-medium hover:underline">
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
                  <h3 className="text-lg font-semibold">Download This Tool</h3>
                </div>
                <p className="text-sm text-foreground/70 mb-4">
                  Get a PDF version of this assessment and your personalized plan to reference offline.
                </p>
                <PDFDownloadButton
                  title="Self-Care Assessment and Plan"
                  subtitle="TherapyKin Resource"
                  filename="TherapyKin-Self-Care-Assessment.pdf"
                  contentId="self-care-assessment-content"
                  className="w-full btn-primary text-sm py-2"
                />
              </div>
              
              {/* Quick Tips */}
              <div className="card p-6">
                <h3 className="text-lg font-semibold mb-4">Quick Self-Care Tips</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-sm text-foreground/70">Start with just 5 minutes of self-care daily</p>
                  </div>
                  
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-sm text-foreground/70">Pair new self-care habits with existing routines</p>
                  </div>
                  
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-sm text-foreground/70">Set reminders on your phone for self-care activities</p>
                  </div>
                  
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-sm text-foreground/70">Keep a self-care journal to track what works for you</p>
                  </div>
                  
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-sm text-foreground/70">Celebrate small wins in your self-care journey</p>
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
