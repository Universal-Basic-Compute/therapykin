'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface SessionStats {
  totalSessions: number;
  daysActive: number;
}

// Helper function to get sessions per month based on plan
const getSessionsPerMonth = (plan: string): string => {
  const sessionsMap: {[key: string]: string} = {
    'free': '3 total',
    'basic': '8 per month',
    'standard': '30 per month',
    'premium': 'Unlimited'
  };
  
  return sessionsMap[plan.toLowerCase()] || 'Unknown';
};

interface SubscriptionData {
  plan: string;
  status: string;
  isAnnual: boolean;
  currentPeriodEnd: string | null;
  sessionsRemaining: number;
  totalSessions: number;
  daysActive: number;
}

export default function Dashboard() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const [isLoadingSubscription, setIsLoadingSubscription] = useState(false);
  const [sessionStats, setSessionStats] = useState<SessionStats | null>(null);
  const [isLoadingStats, setIsLoadingStats] = useState(false);

  // Fetch subscription data
  useEffect(() => {
    async function fetchSubscriptionData() {
      if (!user) return;
      
      setIsLoadingSubscription(true);
      try {
        console.log('Fetching subscription data...');
        const response = await fetch('/api/users/subscription');
        
        if (!response.ok) {
          console.error('Failed to fetch subscription data:', response.status, response.statusText);
          // Set default subscription data on error
          setSubscription({
            plan: 'free',
            status: 'active',
            isAnnual: false,
            currentPeriodEnd: null,
            sessionsRemaining: 3,
            totalSessions: 0,
            daysActive: 1
          });
          return;
        }
        
        const data = await response.json();
        console.log('Subscription data received:', data);
        
        if (data.subscription) {
          setSubscription(data.subscription);
        } else {
          console.error('Subscription data missing in response:', data);
          // Set default subscription data if missing
          setSubscription({
            plan: 'free',
            status: 'active',
            isAnnual: false,
            currentPeriodEnd: null,
            sessionsRemaining: 3,
            totalSessions: 0,
            daysActive: 1
          });
        }
      } catch (error) {
        console.error('Error fetching subscription data:', error);
        // Set default subscription data on error
        setSubscription({
          plan: 'free',
          status: 'active',
          isAnnual: false,
          currentPeriodEnd: null,
          sessionsRemaining: 3,
          totalSessions: 0,
          daysActive: 1
        });
      } finally {
        setIsLoadingSubscription(false);
      }
    }

    fetchSubscriptionData();
  }, [user]);
  
  // Fetch session stats
  useEffect(() => {
    async function fetchSessionStats() {
      if (!user) return;
      
      setIsLoadingStats(true);
      try {
        console.log('Fetching session statistics...');
        const response = await fetch('/api/sessions/stats');
        
        if (!response.ok) {
          console.error('Failed to fetch session stats:', response.status, response.statusText);
          setSessionStats({
            totalSessions: 0,
            daysActive: 1
          });
          return;
        }
        
        const data = await response.json();
        console.log('Session stats received:', data);
        
        if (data.stats) {
          setSessionStats(data.stats);
        } else {
          console.error('Session stats missing in response:', data);
          setSessionStats({
            totalSessions: 0,
            daysActive: 1
          });
        }
      } catch (error) {
        console.error('Error fetching session stats:', error);
        setSessionStats({
          totalSessions: 0,
          daysActive: 1
        });
      } finally {
        setIsLoadingStats(false);
      }
    }

    fetchSessionStats();
  }, [user]);

  // Format date for display
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  // Calculate sessions remaining based on plan and usage
  const calculateSessionsRemaining = (
    subscription: SubscriptionData | null, 
    totalSessionsUsed: number
  ): number => {
    if (!subscription) return 0;
    
    // Define sessions per plan
    const sessionsPerPlan: {[key: string]: number} = {
      'free': 3,
      'basic': 8,
      'standard': 30,
      'premium': Infinity
    };
    
    // Get total sessions allowed for the plan
    const totalAllowed = sessionsPerPlan[subscription.plan.toLowerCase()] || 0;
    
    // For free plan, it's a one-time allocation
    if (subscription.plan.toLowerCase() === 'free') {
      return Math.max(0, totalAllowed - totalSessionsUsed);
    }
    
    // For paid plans, it's a monthly allocation
    // We're just showing the current month's allocation
    return Math.max(0, totalAllowed);
  };

  // Get plan display name
  const getPlanDisplayName = (plan: string) => {
    const planMap: {[key: string]: string} = {
      'free': 'Free Plan',
      'basic': 'Basic Plan',
      'standard': 'Standard Plan',
      'premium': 'Premium Plan'
    };
    
    return planMap[plan.toLowerCase()] || plan;
  };

  if (loading || isLoadingSubscription || isLoadingStats) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow pt-24 pb-16 px-4 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p>Loading your dashboard...</p>
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
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Welcome, {user?.firstName}!</h1>
            <button 
              onClick={() => logout()} 
              className="btn-secondary"
            >
              Log Out
            </button>
          </div>
          
          <div className="card p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Your TherapyKin Journey</h2>
            <p className="text-foreground/70 mb-4">
              This is your personal dashboard where you can track your progress, access your conversations, and manage your account.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="card p-4 bg-[var(--primary)]/5 text-center">
                <h3 className="font-medium mb-1">Sessions Remaining</h3>
                <p className="text-2xl font-bold">
                  {subscription?.plan.toLowerCase() === 'premium' 
                    ? 'Unlimited' 
                    : calculateSessionsRemaining(subscription, sessionStats?.totalSessions || 0)}
                </p>
              </div>
              <div className="card p-4 bg-[var(--primary)]/5 text-center">
                <h3 className="font-medium mb-1">Days Active</h3>
                <p className="text-2xl font-bold">{sessionStats?.daysActive || 1}</p>
              </div>
              <div className="card p-4 bg-[var(--primary)]/5 text-center">
                <h3 className="font-medium mb-1">Total Sessions</h3>
                <p className="text-2xl font-bold">{sessionStats?.totalSessions || 0}</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card p-6">
              <h2 className="text-xl font-semibold mb-4">Start a Conversation</h2>
              <p className="text-foreground/70 mb-4">
                Connect with TherapyKin whenever you need support or want to work on your mental wellbeing.
              </p>
              <button 
                onClick={() => router.push('/chat')} 
                className="btn-primary w-full"
              >
                Begin Session
              </button>
              <div className="mt-4 text-center">
                <Link href="/timeline" className="text-[var(--primary)] hover:underline text-sm">
                  View your therapeutic journey timeline
                </Link>
              </div>
            </div>
            
            <div className="card p-6 border border-[var(--primary)]/20 hover:border-[var(--primary)]/40 transition-all">
              <h2 className="text-xl font-semibold mb-4">Your Subscription</h2>
              {subscription ? (
                <>
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="font-medium text-lg">{getPlanDisplayName(subscription.plan)}</h3>
                      <p className="text-foreground/70 text-sm">
                        {subscription.isAnnual ? 'Annual billing' : 'Monthly billing'}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      subscription.status === 'active' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                    }`}>
                      {subscription.status === 'active' ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-[var(--background-alt)] rounded-lg p-3 text-center">
                      <p className="text-sm text-foreground/70 mb-1">Sessions</p>
                      <p className="font-bold text-lg">{getSessionsPerMonth(subscription.plan)}</p>
                    </div>
                    <div className="bg-[var(--background-alt)] rounded-lg p-3 text-center">
                      <p className="text-sm text-foreground/70 mb-1">Next Billing</p>
                      <p className="font-bold text-lg">
                        {subscription.currentPeriodEnd 
                          ? formatDate(subscription.currentPeriodEnd).split(' ').slice(0, 2).join(' ') 
                          : 'N/A'}
                      </p>
                    </div>
                  </div>
                  
                  {subscription.plan.toLowerCase() === 'free' ? (
                    <Link href="/pricing" className="btn-primary block text-center w-full">
                      Upgrade Now
                    </Link>
                  ) : (
                    <div className="flex space-x-4">
                      <Link href="/account" className="btn-secondary flex-1 text-center">
                        Manage Plan
                      </Link>
                      <Link href="/account?tab=billing" className="btn-secondary flex-1 text-center">
                        Billing History
                      </Link>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className="bg-[var(--background-alt)] rounded-lg p-4 mb-4 text-center">
                    <p className="text-foreground/70 mb-2">
                      You're currently on the Free Plan
                    </p>
                    <p className="font-bold mb-2">3 sessions total</p>
                    <p className="text-sm text-foreground/70">
                      Upgrade to get more sessions and features
                    </p>
                  </div>
                  <Link href="/pricing" className="btn-primary block text-center w-full">
                    Upgrade Now
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
