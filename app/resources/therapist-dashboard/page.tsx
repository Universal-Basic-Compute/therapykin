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

export default function TherapistDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<TherapistStats | null>(null);
  const [clients, setClients] = useState<ClientData[]>([]);
  const [loadingClients, setLoadingClients] = useState(false);
  
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
                    className={`py-4 px-1 font-medium text-sm border-b-2 ${
                      activeTab === 'insights'
                        ? 'border-[var(--primary)] text-[var(--primary)]'
                        : 'border-transparent text-foreground/60 hover:text-foreground/80 hover:border-foreground/30'
                    }`}
                  >
                    AI Insights
                  </button>
                  <button
                    onClick={() => setActiveTab('settings')}
                    className={`py-4 px-1 font-medium text-sm border-b-2 ${
                      activeTab === 'settings'
                        ? 'border-[var(--primary)] text-[var(--primary)]'
                        : 'border-transparent text-foreground/60 hover:text-foreground/80 hover:border-foreground/30'
                    }`}
                  >
                    Settings
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
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--primary)]">
                                    <button className="hover:underline">View Profile</button>
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
                    
                    <div className="mb-8">
                      <h3 className="text-lg font-medium mb-3">Upcoming Sessions</h3>
                      <div className="bg-[var(--background-alt)] rounded-lg overflow-hidden">
                        <div className="p-4 border-b border-foreground/10 flex justify-between items-center">
                          <div>
                            <p className="font-medium">Jane Smith (TK-2023-042)</p>
                            <p className="text-foreground/60 text-sm mt-1">Oct 22, 2023 • 10:00 AM - 11:00 AM</p>
                          </div>
                          <div className="flex space-x-2">
                            <button className="text-sm px-3 py-1 border border-foreground/20 rounded hover:bg-foreground/5">Reschedule</button>
                            <button className="text-sm px-3 py-1 bg-[var(--primary)] text-white rounded">Join</button>
                          </div>
                        </div>
                        <div className="p-4 border-b border-foreground/10 flex justify-between items-center">
                          <div>
                            <p className="font-medium">Michael Johnson (TK-2023-067)</p>
                            <p className="text-foreground/60 text-sm mt-1">Oct 23, 2023 • 2:00 PM - 3:00 PM</p>
                          </div>
                          <div className="flex space-x-2">
                            <button className="text-sm px-3 py-1 border border-foreground/20 rounded hover:bg-foreground/5">Reschedule</button>
                            <button className="text-sm px-3 py-1 bg-[var(--primary)] text-white rounded">Join</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-medium mb-3">Past Sessions</h3>
                    <div className="bg-[var(--background-alt)] rounded-lg overflow-hidden">
                      <div className="p-4 border-b border-foreground/10 flex justify-between items-center">
                        <div>
                          <p className="font-medium">Jane Smith (TK-2023-042)</p>
                          <p className="text-foreground/60 text-sm mt-1">Oct 15, 2023 • 10:00 AM - 11:00 AM</p>
                        </div>
                        <div className="flex space-x-2">
                          <button className="text-sm px-3 py-1 border border-foreground/20 rounded hover:bg-foreground/5">View Notes</button>
                          <button className="text-sm px-3 py-1 border border-[var(--primary)]/50 text-[var(--primary)] rounded hover:bg-[var(--primary)]/10">AI Analysis</button>
                        </div>
                      </div>
                      <div className="p-4 border-b border-foreground/10 flex justify-between items-center">
                        <div>
                          <p className="font-medium">Michael Johnson (TK-2023-067)</p>
                          <p className="text-foreground/60 text-sm mt-1">Oct 18, 2023 • 2:00 PM - 3:00 PM</p>
                        </div>
                        <div className="flex space-x-2">
                          <button className="text-sm px-3 py-1 border border-foreground/20 rounded hover:bg-foreground/5">View Notes</button>
                          <button className="text-sm px-3 py-1 border border-[var(--primary)]/50 text-[var(--primary)] rounded hover:bg-[var(--primary)]/10">AI Analysis</button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === 'insights' && (
                  <div>
                    <h2 className="text-xl font-semibold mb-6">AI Insights Dashboard</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="bg-[var(--background-alt)] p-6 rounded-lg">
                        <h3 className="text-lg font-medium mb-3">Sentiment Analysis</h3>
                        <p className="text-foreground/70 mb-4">Aggregate emotional trends across all client sessions</p>
                        <div className="h-40 bg-foreground/5 rounded flex items-center justify-center">
                          <p className="text-foreground/40">Sentiment chart visualization</p>
                        </div>
                      </div>
                      <div className="bg-[var(--background-alt)] p-6 rounded-lg">
                        <h3 className="text-lg font-medium mb-3">Topic Clustering</h3>
                        <p className="text-foreground/70 mb-4">Common themes emerging across client conversations</p>
                        <div className="h-40 bg-foreground/5 rounded flex items-center justify-center">
                          <p className="text-foreground/40">Topic cluster visualization</p>
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-medium mb-3">Recent AI-Generated Insights</h3>
                    <div className="bg-[var(--background-alt)] rounded-lg overflow-hidden">
                      <div className="p-4 border-b border-foreground/10">
                        <div className="flex justify-between">
                          <p className="font-medium">Client Progress Analysis</p>
                          <span className="text-xs text-foreground/60">Oct 19, 2023</span>
                        </div>
                        <p className="text-foreground/70 text-sm mt-2">Analysis of Jane Smith's progress over the last 3 months shows significant improvement in anxiety management techniques.</p>
                        <button className="text-[var(--primary)] text-sm mt-2 hover:underline">View Full Report</button>
                      </div>
                      <div className="p-4 border-b border-foreground/10">
                        <div className="flex justify-between">
                          <p className="font-medium">Treatment Recommendation</p>
                          <span className="text-xs text-foreground/60">Oct 17, 2023</span>
                        </div>
                        <p className="text-foreground/70 text-sm mt-2">Based on Michael Johnson's recent sessions, AI suggests exploring mindfulness-based cognitive therapy approaches.</p>
                        <button className="text-[var(--primary)] text-sm mt-2 hover:underline">View Full Report</button>
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between">
                          <p className="font-medium">Risk Assessment Alert</p>
                          <span className="text-xs text-foreground/60">Oct 16, 2023</span>
                        </div>
                        <p className="text-foreground/70 text-sm mt-2">Potential increased risk factors detected in Sarah Williams' recent session transcripts.</p>
                        <button className="text-[var(--primary)] text-sm mt-2 hover:underline">View Full Report</button>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === 'settings' && (
                  <div>
                    <h2 className="text-xl font-semibold mb-6">Therapist Settings</h2>
                    
                    <div className="bg-[var(--background-alt)] rounded-lg p-6 mb-6">
                      <h3 className="text-lg font-medium mb-4">Profile Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-foreground/70 mb-1">Full Name</label>
                          <input 
                            type="text" 
                            className="w-full p-2 border border-foreground/20 rounded bg-background"
                            defaultValue="Dr. Nicole Richards"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground/70 mb-1">Email Address</label>
                          <input 
                            type="email" 
                            className="w-full p-2 border border-foreground/20 rounded bg-background"
                            defaultValue="nlr@universalbasiccompute.ai"
                            disabled
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground/70 mb-1">Specialization</label>
                          <input 
                            type="text" 
                            className="w-full p-2 border border-foreground/20 rounded bg-background"
                            defaultValue="Cognitive Behavioral Therapy"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground/70 mb-1">License Number</label>
                          <input 
                            type="text" 
                            className="w-full p-2 border border-foreground/20 rounded bg-background"
                            defaultValue="PSY12345"
                          />
                        </div>
                      </div>
                      <button className="btn-primary text-sm px-4 py-2 mt-4">Save Changes</button>
                    </div>
                    
                    <div className="bg-[var(--background-alt)] rounded-lg p-6 mb-6">
                      <h3 className="text-lg font-medium mb-4">Notification Preferences</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Email Notifications</p>
                            <p className="text-sm text-foreground/60">Receive email alerts for new appointments</p>
                          </div>
                          <div className="relative inline-block w-10 mr-2 align-middle select-none">
                            <input type="checkbox" id="email-toggle" defaultChecked className="sr-only" />
                            <label htmlFor="email-toggle" className="block overflow-hidden h-6 rounded-full bg-gray-300 dark:bg-gray-700 cursor-pointer">
                              <span className="block h-6 w-6 rounded-full bg-white dark:bg-gray-200 transform translate-x-0 checked:translate-x-4 transition"></span>
                            </label>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">SMS Notifications</p>
                            <p className="text-sm text-foreground/60">Receive text messages for appointment reminders</p>
                          </div>
                          <div className="relative inline-block w-10 mr-2 align-middle select-none">
                            <input type="checkbox" id="sms-toggle" defaultChecked className="sr-only" />
                            <label htmlFor="sms-toggle" className="block overflow-hidden h-6 rounded-full bg-gray-300 dark:bg-gray-700 cursor-pointer">
                              <span className="block h-6 w-6 rounded-full bg-white dark:bg-gray-200 transform translate-x-0 checked:translate-x-4 transition"></span>
                            </label>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">AI Insight Alerts</p>
                            <p className="text-sm text-foreground/60">Get notified when AI generates new insights</p>
                          </div>
                          <div className="relative inline-block w-10 mr-2 align-middle select-none">
                            <input type="checkbox" id="ai-toggle" defaultChecked className="sr-only" />
                            <label htmlFor="ai-toggle" className="block overflow-hidden h-6 rounded-full bg-gray-300 dark:bg-gray-700 cursor-pointer">
                              <span className="block h-6 w-6 rounded-full bg-white dark:bg-gray-200 transform translate-x-0 checked:translate-x-4 transition"></span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg p-6">
                      <h3 className="text-lg font-medium text-red-800 dark:text-red-200 mb-2">Danger Zone</h3>
                      <p className="text-red-700 dark:text-red-300 mb-4">These actions cannot be undone.</p>
                      <div className="flex space-x-4">
                        <button className="px-4 py-2 bg-white dark:bg-background border border-red-300 dark:border-red-700 text-red-600 dark:text-red-400 rounded hover:bg-red-50 dark:hover:bg-red-900/30 text-sm font-medium">
                          Archive All Client Data
                        </button>
                        <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm font-medium">
                          Delete Account
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
