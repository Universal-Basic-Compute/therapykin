'use client';

import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Link from "next/link";

interface TherapistStats {
  activeClients: number;
  sessionsThisWeek: number;
  clientSatisfaction: string;
  recentActivity: Array<{
    id: string;
    type: string;
    clientId: string;
    clientColor: string;
    timestamp: string;
    minutesActive: number;
  }>;
}

interface ClientData {
  id: string;
  name: string;
  color: string;
  totalSessions: number;
  recentSessions: number;
  totalMinutes: number;
  lastSession: string | null;
  status: 'Active' | 'On Hold' | 'Inactive';
}

interface InsightsModalState {
  isOpen: boolean;
  clientId: string;
  clientName: string;
  loading: boolean;
  insights: string;
  error: string;
}

interface SessionData {
  id: string;
  clientId: string;
  clientColor: string;
  timestamp: string;
  minutesActive: number;
  rating: number | null;
}

export default function TherapistDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<TherapistStats | null>(null);
  const [clients, setClients] = useState<ClientData[]>([]);
  const [loadingClients, setLoadingClients] = useState(false);
  const [sessions, setSessions] = useState<{
    pastSessions: SessionData[];
  }>({
    pastSessions: []
  });
  const [loadingSessions, setLoadingSessions] = useState(false);
  const [insightsModal, setInsightsModal] = useState<InsightsModalState>({
    isOpen: false,
    clientId: '',
    clientName: '',
    loading: false,
    insights: '',
    error: ''
  });
  
  // Check if user is authorized to view this page
  useEffect(() => {
    console.log('Therapist dashboard - user object:', user);
    console.log('Therapist dashboard - isTherapist value:', user?.isTherapist);
    console.log('Therapist dashboard - isTherapist type:', typeof user?.isTherapist);
    
    if (user) {
      // Allow specific emails to access the dashboard
      if (user.isAdmin || user.email === 'nlr@universalbasiccompute.ai' || user.email === 'theherosjourneyteam@gmail.com') {
        console.log('User is admin or has authorized email, granting access');
        setAuthorized(true);
      } else if (user.isTherapist) {
        try {
          // Parse the JSON string to get the array of specialist types
          console.log('Attempting to parse isTherapist:', user.isTherapist);
          const therapistTypes = JSON.parse(user.isTherapist);
          console.log('Parsed therapistTypes:', therapistTypes);
          // Check if the user is authorized for any specialist type
          if (Array.isArray(therapistTypes) && therapistTypes.length > 0) {
            console.log('Valid therapist types found');
            setAuthorized(true);
          } else {
            console.log('No valid therapist types found');
            setAuthorized(false);
          }
        } catch (error) {
          console.error('Error parsing therapist types:', error);
          // If parsing fails, check if it's a string that contains "herosjourney"
          if (typeof user.isTherapist === 'string' && user.isTherapist.includes('herosjourney')) {
            console.log('String contains herosjourney, granting access');
            setAuthorized(true);
          } else {
            setAuthorized(false);
          }
        }
      } else {
        console.log('User is not admin or therapist');
        setAuthorized(false);
      }
    } else {
      console.log('No user found');
      setAuthorized(false);
    }
  }, [user]);

  // Fetch therapist stats
  useEffect(() => {
    async function fetchTherapistStats() {
      if (!user) return;
      
      let isAuthorized = false;
      
      if (user.isAdmin || user.email === 'nlr@universalbasiccompute.ai' || user.email === 'theherosjourneyteam@gmail.com') {
        console.log('User is admin or has authorized email, authorized to fetch stats');
        isAuthorized = true;
      } else if (user.isTherapist) {
        try {
          console.log('Checking therapist types for stats fetch:', user.isTherapist);
          const therapistTypes = JSON.parse(user.isTherapist);
          isAuthorized = Array.isArray(therapistTypes) && therapistTypes.length > 0;
          console.log('Authorized based on parsed therapist types:', isAuthorized);
        } catch (error) {
          console.error('Error parsing therapist types for stats fetch:', error);
          // If parsing fails, check if it's a string that contains "herosjourney"
          if (typeof user.isTherapist === 'string' && user.isTherapist.includes('herosjourney')) {
            console.log('String contains herosjourney, authorized to fetch stats');
            isAuthorized = true;
          }
        }
      }
      
      if (!isAuthorized) {
        console.log('Not authorized to fetch therapist stats');
        return;
      }
      
      setLoading(true);
      try {
        const response = await fetch('/api/sessions/therapist-stats');
        
        if (!response.ok) {
          console.error('Failed to fetch therapist stats:', response.status, response.statusText);
          setLoading(false);
          return;
        }
        
        const data = await response.json();
        setStats(data.stats);
      } catch (error) {
        console.error('Error fetching therapist stats:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchTherapistStats();
  }, [user]);
  
  // Fetch client data
  useEffect(() => {
    async function fetchClientData() {
      if (!user) return;
      
      let isAuthorized = false;
      
      if (user.isAdmin || user.email === 'nlr@universalbasiccompute.ai' || user.email === 'theherosjourneyteam@gmail.com') {
        console.log('User is admin or has authorized email, authorized to fetch client data');
        isAuthorized = true;
      } else if (user.isTherapist) {
        try {
          console.log('Checking therapist types for client fetch:', user.isTherapist);
          const therapistTypes = JSON.parse(user.isTherapist);
          isAuthorized = Array.isArray(therapistTypes) && therapistTypes.length > 0;
          console.log('Authorized based on parsed therapist types:', isAuthorized);
        } catch (error) {
          console.error('Error parsing therapist types for client fetch:', error);
          // If parsing fails, check if it's a string that contains "herosjourney"
          if (typeof user.isTherapist === 'string' && user.isTherapist.includes('herosjourney')) {
            console.log('String contains herosjourney, authorized to fetch client data');
            isAuthorized = true;
          }
        }
      }
      
      if (!isAuthorized) {
        console.log('Not authorized to fetch client data');
        return;
      }
      
      setLoadingClients(true);
      try {
        const response = await fetch('/api/sessions/therapist-clients');
        
        if (!response.ok) {
          console.error('Failed to fetch client data:', response.status, response.statusText);
          setLoadingClients(false);
          return;
        }
        
        const data = await response.json();
        setClients(data.clients);
      } catch (error) {
        console.error('Error fetching client data:', error);
      } finally {
        setLoadingClients(false);
      }
    }

    if (activeTab === 'clients') {
      fetchClientData();
    }
  }, [user, activeTab]);
  
  // Fetch session data
  useEffect(() => {
    async function fetchSessionData() {
      if (!user) return;
      
      let isAuthorized = false;
      
      if (user.isAdmin || user.email === 'nlr@universalbasiccompute.ai' || user.email === 'theherosjourneyteam@gmail.com') {
        console.log('User is admin or has authorized email, authorized to fetch session data');
        isAuthorized = true;
      } else if (user.isTherapist) {
        try {
          console.log('Checking therapist types for session fetch:', user.isTherapist);
          const therapistTypes = JSON.parse(user.isTherapist);
          isAuthorized = Array.isArray(therapistTypes) && therapistTypes.length > 0;
          console.log('Authorized based on parsed therapist types:', isAuthorized);
        } catch (error) {
          console.error('Error parsing therapist types for session fetch:', error);
          // If parsing fails, check if it's a string that contains "herosjourney"
          if (typeof user.isTherapist === 'string' && user.isTherapist.includes('herosjourney')) {
            console.log('String contains herosjourney, authorized to fetch session data');
            isAuthorized = true;
          }
        }
      }
      
      if (!isAuthorized) {
        console.log('Not authorized to fetch session data');
        return;
      }
      
      setLoadingSessions(true);
      try {
        const response = await fetch('/api/sessions/therapist-sessions');
        
        if (!response.ok) {
          console.error('Failed to fetch session data:', response.status, response.statusText);
          setLoadingSessions(false);
          return;
        }
        
        const data = await response.json();
        setSessions(data.sessions);
      } catch (error) {
        console.error('Error fetching session data:', error);
      } finally {
        setLoadingSessions(false);
      }
    }

    if (activeTab === 'sessions') {
      fetchSessionData();
    }
  }, [user, activeTab]);

  // Generate client insights using KinOS engine
  const generateClientInsights = async (clientId: string, clientName: string) => {
    setInsightsModal({
      isOpen: true,
      clientId,
      clientName,
      loading: true,
      insights: '',
      error: ''
    });
    
    try {
      // Update to the correct endpoint format
      const response = await fetch(`/projects/therapykinherosjourney/${clientName.replace(/\s+/g, '')}/analysis`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `Please provide a comprehensive analysis of client ${clientName}. Include: 
          1. An overview of their recent therapy sessions
          2. A detailed psychological profile based on session content
          3. Key patterns in their communication and emotional responses
          4. Potential therapeutic approaches that might be effective
          5. Areas of progress and concern to monitor`,
          model: 'claude-3-7-sonnet-latest'
        })
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const data = await response.json();
      
      setInsightsModal(prev => ({
        ...prev,
        loading: false,
        insights: data.response
      }));
    } catch (error) {
      console.error('Error generating client insights:', error);
      setInsightsModal(prev => ({
        ...prev,
        loading: false,
        error: 'Failed to generate insights. Please try again later.'
      }));
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Therapist Dashboard</h1>
          
          {!authorized ? (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-6 mt-6">
              <h2 className="text-xl font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Restricted Access</h2>
              <p className="text-yellow-700 dark:text-yellow-300">
                This dashboard is only available to authorized therapists. If you are a therapist working with TherapyKin, 
                please contact our team to get access.
              </p>
              <div className="mt-4">
                <Link href="/resources/for-therapists" className="text-[var(--primary)] hover:underline">
                  Learn more about partnering with TherapyKin
                </Link>
              </div>
            </div>
          ) : loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--primary)]"></div>
            </div>
          ) : (
            <>
              {/* Tabs navigation */}
              <div className="border-b border-foreground/10 mb-6">
                <nav className="flex space-x-8">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`py-4 px-1 font-medium text-sm border-b-2 ${
                      activeTab === 'overview'
                        ? 'border-[var(--primary)] text-[var(--primary)]'
                        : 'border-transparent text-foreground/60 hover:text-foreground/80 hover:border-foreground/30'
                    }`}
                  >
                    Overview
                  </button>
                  <button
                    onClick={() => setActiveTab('clients')}
                    className={`py-4 px-1 font-medium text-sm border-b-2 ${
                      activeTab === 'clients'
                        ? 'border-[var(--primary)] text-[var(--primary)]'
                        : 'border-transparent text-foreground/60 hover:text-foreground/80 hover:border-foreground/30'
                    }`}
                  >
                    Clients
                  </button>
                  <button
                    onClick={() => setActiveTab('sessions')}
                    className={`py-4 px-1 font-medium text-sm border-b-2 ${
                      activeTab === 'sessions'
                        ? 'border-[var(--primary)] text-[var(--primary)]'
                        : 'border-transparent text-foreground/60 hover:text-foreground/80 hover:border-foreground/30'
                    }`}
                  >
                    Sessions
                  </button>
                  <button
                    onClick={() => setActiveTab('insights')}
                    className={`py-4 px-1 font-medium text-sm border-b-2 opacity-50 cursor-not-allowed ${
                      activeTab === 'insights'
                        ? 'border-[var(--primary)] text-[var(--primary)]'
                        : 'border-transparent text-foreground/60'
                    }`}
                    disabled
                  >
                    AI Insights (Coming Soon)
                  </button>
                  <button
                    onClick={() => setActiveTab('settings')}
                    className={`py-4 px-1 font-medium text-sm border-b-2 opacity-50 cursor-not-allowed ${
                      activeTab === 'settings'
                        ? 'border-[var(--primary)] text-[var(--primary)]'
                        : 'border-transparent text-foreground/60'
                    }`}
                    disabled
                  >
                    Settings (Coming Soon)
                  </button>
                </nav>
              </div>
              
              {/* Tab content */}
              <div className="mt-6">
                {activeTab === 'overview' && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Dashboard Overview</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      <div className="bg-[var(--background-alt)] p-6 rounded-lg">
                        <h3 className="text-lg font-medium mb-2">Active Clients</h3>
                        <p className="text-3xl font-bold">{stats?.activeClients || 0}</p>
                      </div>
                      <div className="bg-[var(--background-alt)] p-6 rounded-lg">
                        <h3 className="text-lg font-medium mb-2">Sessions This Week</h3>
                        <p className="text-3xl font-bold">{stats?.sessionsThisWeek || 0}</p>
                      </div>
                      <div className="bg-[var(--background-alt)] p-6 rounded-lg">
                        <h3 className="text-lg font-medium mb-2">Client Satisfaction</h3>
                        <p className="text-3xl font-bold">{stats?.clientSatisfaction || '0.0'}/5</p>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-semibold mb-3">Recent Activity</h3>
                    <div className="bg-[var(--background-alt)] rounded-lg overflow-hidden">
                      {stats?.recentActivity && stats.recentActivity.length > 0 ? (
                        stats.recentActivity.map((activity, index) => (
                          <div key={activity.id} className={`p-4 ${index < stats.recentActivity.length - 1 ? 'border-b border-foreground/10' : ''}`}>
                            <p className="font-medium">
                              {activity.type === 'assessment' ? 'New client assessment completed' : 
                               activity.type === 'notes' ? 'Session notes updated' :
                               'Session completed'}
                            </p>
                            <p className="text-foreground/60 text-sm mt-1">
                              Client: <span style={{ color: activity.clientColor, fontWeight: 'bold' }}>{activity.clientId}</span> • {formatDate(activity.timestamp)}
                              {activity.minutesActive > 0 && ` • ${activity.minutesActive} minutes`}
                            </p>
                          </div>
                        ))
                      ) : (
                        <div className="p-4 text-center text-foreground/60">
                          No recent activity found
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                {activeTab === 'clients' && (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-semibold">Client Management</h2>
                      <button className="btn-primary text-sm px-4 py-2">Add New Client</button>
                    </div>
                    
                    {loadingClients ? (
                      <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--primary)]"></div>
                      </div>
                    ) : clients.length === 0 ? (
                      <div className="bg-[var(--background-alt)] rounded-lg p-8 text-center">
                        <p className="text-foreground/70">No clients found.</p>
                      </div>
                    ) : (
                      <div className="bg-[var(--background-alt)] rounded-lg overflow-hidden">
                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y divide-foreground/10">
                            <thead className="bg-foreground/5">
                              <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-foreground/70 uppercase tracking-wider">Client</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-foreground/70 uppercase tracking-wider">Status</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-foreground/70 uppercase tracking-wider">Last Session</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-foreground/70 uppercase tracking-wider">Recent Sessions</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-foreground/70 uppercase tracking-wider">Total Minutes</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-foreground/70 uppercase tracking-wider">Actions</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-foreground/10">
                              {clients.map((client) => (
                                <tr key={client.id}>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                      <div className="text-sm font-medium" style={{ color: client.color }}>
                                        {client.name}
                                      </div>
                                    </div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                      client.status === 'Active' 
                                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                                        : client.status === 'On Hold'
                                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                                          : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                                    }`}>
                                      {client.status}
                                    </span>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    {client.lastSession ? formatDate(client.lastSession) : 'Never'}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    {client.recentSessions} <span className="text-foreground/50 text-xs">(last 30 days)</span>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    {client.totalMinutes}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <button 
                                      onClick={() => generateClientInsights(client.id, client.name)}
                                      className="text-sm px-3 py-1 border border-[var(--primary)]/50 text-[var(--primary)] rounded hover:bg-[var(--primary)]/10"
                                    >
                                      AI Insights
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                
                {activeTab === 'sessions' && (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-semibold">Session Management</h2>
                      <button className="btn-primary text-sm px-4 py-2">Schedule Session</button>
                    </div>
                    
                    <h3 className="text-lg font-medium mb-3">Past Sessions</h3>
                    {loadingSessions ? (
                      <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--primary)]"></div>
                      </div>
                    ) : sessions.pastSessions.length === 0 ? (
                      <div className="bg-[var(--background-alt)] rounded-lg p-8 text-center">
                        <p className="text-foreground/70">No past sessions found.</p>
                      </div>
                    ) : (
                      <div className="bg-[var(--background-alt)] rounded-lg overflow-hidden">
                        {sessions.pastSessions.map((session) => (
                          <div key={session.id} className="p-4 border-b border-foreground/10 flex justify-between items-center">
                            <div>
                              <p className="font-medium">
                                <span style={{ color: session.clientColor }}>{session.clientId}</span>
                              </p>
                              <p className="text-foreground/60 text-sm mt-1">
                                {formatDate(session.timestamp)} • {session.minutesActive} minutes
                              </p>
                            </div>
                            <div className="flex space-x-2 items-center">
                              {session.rating && (
                                <div className="flex items-center mr-4">
                                  <span className="text-yellow-500 mr-1">★</span>
                                  <span className="text-sm font-medium">{session.rating}</span>
                                </div>
                              )}
                              <button className="text-sm px-3 py-1 border border-foreground/20 rounded hover:bg-foreground/5">View Notes</button>
                              <button className="text-sm px-3 py-1 border border-[var(--primary)]/50 text-[var(--primary)] rounded hover:bg-[var(--primary)]/10">AI Analysis</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
                
                {activeTab === 'insights' && (
                  <div className="text-center py-16">
                    <div className="inline-block p-6 bg-[var(--background-alt)] rounded-lg shadow-md">
                      <h2 className="text-2xl font-semibold mb-4">AI Insights Coming Soon</h2>
                      <p className="text-foreground/70 mb-6 max-w-md mx-auto">
                        We're working on advanced AI analytics to help you gain deeper insights into your client sessions.
                        This feature will be available in an upcoming update.
                      </p>
                      <div className="w-16 h-16 border-4 border-[var(--primary)]/30 border-t-[var(--primary)] rounded-full animate-spin mx-auto"></div>
                    </div>
                  </div>
                )}
                
                {activeTab === 'settings' && (
                  <div className="text-center py-16">
                    <div className="inline-block p-6 bg-[var(--background-alt)] rounded-lg shadow-md">
                      <h2 className="text-2xl font-semibold mb-4">Settings Coming Soon</h2>
                      <p className="text-foreground/70 mb-6 max-w-md mx-auto">
                        Account settings and preferences will be available in an upcoming update.
                        You'll be able to customize your profile, notification preferences, and more.
                      </p>
                      <div className="w-16 h-16 border-4 border-[var(--primary)]/30 border-t-[var(--primary)] rounded-full animate-spin mx-auto"></div>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </main>
      
      <Footer />
      
      {/* AI Insights Modal */}
      {insightsModal.isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[var(--background)] rounded-lg shadow-xl w-full max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
            <div className="p-4 border-b border-foreground/10 flex justify-between items-center">
              <h3 className="text-xl font-semibold">
                AI Insights: <span style={{ color: clients.find(c => c.id === insightsModal.clientId)?.color }}>
                  {insightsModal.clientName}
                </span>
              </h3>
              <button 
                onClick={() => setInsightsModal(prev => ({ ...prev, isOpen: false }))}
                className="text-foreground/60 hover:text-foreground"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-grow">
              {insightsModal.loading ? (
                <div className="flex flex-col items-center justify-center h-64">
                  <div className="w-12 h-12 border-4 border-[var(--primary)]/30 border-t-[var(--primary)] rounded-full animate-spin mb-4"></div>
                  <p className="text-foreground/70">Generating insights...</p>
                </div>
              ) : insightsModal.error ? (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg p-4 text-red-700 dark:text-red-300">
                  {insightsModal.error}
                </div>
              ) : (
                <div className="prose dark:prose-invert max-w-none">
                  {insightsModal.insights.split('\n').map((paragraph, index) => (
                    paragraph.trim() ? <p key={index}>{paragraph}</p> : <br key={index} />
                  ))}
                </div>
              )}
            </div>
            
            <div className="p-4 border-t border-foreground/10 flex justify-end">
              <button 
                onClick={() => setInsightsModal(prev => ({ ...prev, isOpen: false }))}
                className="btn-secondary mr-2"
              >
                Close
              </button>
              {!insightsModal.loading && !insightsModal.error && (
                <button 
                  onClick={() => {/* Add functionality to save insights */}}
                  className="btn-primary"
                >
                  Save to Client Notes
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
