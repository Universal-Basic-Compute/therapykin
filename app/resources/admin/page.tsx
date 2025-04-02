'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/app/contexts/AuthContext';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { useRouter } from 'next/navigation';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';

// Define types for our session data
interface SessionStats {
  totalSessions: number;
  daysActive: number;
  ongoingSessions: number;
}

interface DailyStats {
  date: string;
  regularSessions: number;
  welcomeSessions: number;
  totalMinutesActive: number;
}

interface RatingStats {
  averageOverall: number;
  averageUnderstanding: number;
  averageHelpfulness: number;
  averageFlow: number;
  averageRemembering: number;
  totalRatings: number;
}

interface SpecialistStat {
  name: string;
  value: number;
}

export default function AdminPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [sessionStats, setSessionStats] = useState<SessionStats | null>(null);
  const [dailyStats, setDailyStats] = useState<DailyStats[]>([]);
  const [ratingStats, setRatingStats] = useState<RatingStats | null>(null);
  const [specialistStats, setSpecialistStats] = useState<SpecialistStat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#8dd1e1', '#a4de6c', '#d0ed57'];

  useEffect(() => {
    // Check if user is authorized
    if (user && user.email !== 'nlr@universalbasiccompute.ai') {
      router.push('/');
      return;
    }

    // Fetch session stats
    const fetchStats = async () => {
      try {
        setLoading(true);
        
        // Fetch basic session stats
        const statsResponse = await fetch('/api/sessions/stats');
        if (!statsResponse.ok) {
          throw new Error('Failed to fetch session statistics');
        }
        const statsData = await statsResponse.json();
        setSessionStats(statsData.stats);
        
        // Fetch daily stats (this would be a new API endpoint)
        const dailyResponse = await fetch('/api/sessions/daily-stats');
        if (!dailyResponse.ok) {
          throw new Error('Failed to fetch daily statistics');
        }
        const dailyData = await dailyResponse.json();
        setDailyStats(dailyData.dailyStats);
        
        // Fetch rating stats (this would be a new API endpoint)
        const ratingResponse = await fetch('/api/sessions/rating-stats');
        if (!ratingResponse.ok) {
          throw new Error('Failed to fetch rating statistics');
        }
        const ratingData = await ratingResponse.json();
        setRatingStats(ratingData.ratingStats);
        
        // Fetch specialist stats
        const specialistResponse = await fetch('/api/sessions/specialist-stats');
        if (!specialistResponse.ok) {
          throw new Error('Failed to fetch specialist statistics');
        }
        const specialistData = await specialistResponse.json();
        setSpecialistStats(specialistData.specialistStats);
        
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        setLoading(false);
      }
    };

    if (user && user.email === 'nlr@universalbasiccompute.ai') {
      fetchStats();
    }
  }, [user, router]);

  // If user is not authorized, don't render the page content
  if (!user || user.email !== 'nlr@universalbasiccompute.ai') {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow pt-24 pb-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Unauthorized Access</h1>
            <p>You do not have permission to view this page.</p>
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
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--primary)]"></div>
            </div>
          ) : error ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              <p>{error}</p>
            </div>
          ) : (
            <>
              {/* Session Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white dark:bg-[var(--background-alt)] p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-2">Total Sessions</h3>
                  <p className="text-3xl font-bold text-[var(--primary)]">{sessionStats?.totalSessions || 0}</p>
                </div>
                <div className="bg-white dark:bg-[var(--background-alt)] p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-2">Days Active</h3>
                  <p className="text-3xl font-bold text-[var(--primary)]">{sessionStats?.daysActive || 0}</p>
                </div>
                <div className="bg-white dark:bg-[var(--background-alt)] p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-2">Ongoing Sessions</h3>
                  <p className="text-3xl font-bold text-[var(--primary)]">{sessionStats?.ongoingSessions || 0}</p>
                </div>
              </div>
              
              {/* Daily Sessions Chart */}
              <div className="bg-white dark:bg-[var(--background-alt)] p-6 rounded-lg shadow mb-8">
                <h2 className="text-xl font-semibold mb-4">Sessions Per Day</h2>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={dailyStats}
                      margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="date" 
                        tickFormatter={(date) => {
                          const d = new Date(date);
                          return `${d.getDate()} ${d.toLocaleString('default', { month: 'short' })}`;
                        }}
                        angle={-45}
                        textAnchor="end"
                        height={60}
                      />
                      <YAxis />
                      <Tooltip 
                        labelFormatter={(date) => {
                          const d = new Date(date);
                          return d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
                        }}
                      />
                      <Legend />
                      <Bar dataKey="regularSessions" name="Regular Sessions" fill="#0088FE" />
                      <Bar dataKey="welcomeSessions" name="Welcome Sessions" fill="#00C49F" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              {/* Minutes Active Chart */}
              <div className="bg-white dark:bg-[var(--background-alt)] p-6 rounded-lg shadow mb-8">
                <h2 className="text-xl font-semibold mb-4">Minutes Active Per Day</h2>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={dailyStats}
                      margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="date" 
                        tickFormatter={(date) => {
                          const d = new Date(date);
                          return `${d.getDate()} ${d.toLocaleString('default', { month: 'short' })}`;
                        }}
                        angle={-45}
                        textAnchor="end"
                        height={60}
                      />
                      <YAxis />
                      <Tooltip 
                        labelFormatter={(date) => {
                          const d = new Date(date);
                          return d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
                        }}
                      />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="totalMinutesActive" 
                        name="Total Minutes Active" 
                        stroke="#8884d8" 
                        activeDot={{ r: 8 }} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              {/* Specialist Distribution Chart */}
              <div className="bg-white dark:bg-[var(--background-alt)] p-6 rounded-lg shadow mb-8">
                <h2 className="text-xl font-semibold mb-4">Sessions per Specialist</h2>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={specialistStats}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {specialistStats.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value, name, props) => [`${value} sessions`, name]} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              {/* Rating Statistics */}
              {ratingStats && (
                <>
                  <h2 className="text-2xl font-semibold mb-4">Rating Statistics</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
                    <div className="bg-white dark:bg-[var(--background-alt)] p-4 rounded-lg shadow">
                      <h3 className="text-sm font-semibold mb-1">Overall</h3>
                      <p className="text-2xl font-bold text-[var(--primary)]">
                        {ratingStats.averageOverall.toFixed(1)}
                      </p>
                    </div>
                    <div className="bg-white dark:bg-[var(--background-alt)] p-4 rounded-lg shadow">
                      <h3 className="text-sm font-semibold mb-1">Understanding</h3>
                      <p className="text-2xl font-bold text-[var(--primary)]">
                        {ratingStats.averageUnderstanding.toFixed(1)}
                      </p>
                    </div>
                    <div className="bg-white dark:bg-[var(--background-alt)] p-4 rounded-lg shadow">
                      <h3 className="text-sm font-semibold mb-1">Helpfulness</h3>
                      <p className="text-2xl font-bold text-[var(--primary)]">
                        {ratingStats.averageHelpfulness.toFixed(1)}
                      </p>
                    </div>
                    <div className="bg-white dark:bg-[var(--background-alt)] p-4 rounded-lg shadow">
                      <h3 className="text-sm font-semibold mb-1">Flow</h3>
                      <p className="text-2xl font-bold text-[var(--primary)]">
                        {ratingStats.averageFlow.toFixed(1)}
                      </p>
                    </div>
                    <div className="bg-white dark:bg-[var(--background-alt)] p-4 rounded-lg shadow">
                      <h3 className="text-sm font-semibold mb-1">Remembering</h3>
                      <p className="text-2xl font-bold text-[var(--primary)]">
                        {ratingStats.averageRemembering.toFixed(1)}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
