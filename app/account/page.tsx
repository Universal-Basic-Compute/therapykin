'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DarkModeToggle from '../components/DarkModeToggle';

export default function Account() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('profile');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow pt-24 pb-16 px-4 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p>Loading your account...</p>
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
          <h1 className="text-3xl font-bold mb-8">Account Settings</h1>
          
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <div className="md:w-64 shrink-0">
              <div className="card p-4">
                <ul className="space-y-1">
                  <li>
                    <button
                      className={`w-full text-left px-4 py-2 rounded-lg ${
                        activeTab === 'profile' 
                          ? 'bg-[var(--primary)] text-white' 
                          : 'hover:bg-[var(--background-alt)]'
                      }`}
                      onClick={() => setActiveTab('profile')}
                    >
                      Profile
                    </button>
                  </li>
                  <li>
                    <button
                      className={`w-full text-left px-4 py-2 rounded-lg ${
                        activeTab === 'subscription' 
                          ? 'bg-[var(--primary)] text-white' 
                          : 'hover:bg-[var(--background-alt)]'
                      }`}
                      onClick={() => setActiveTab('subscription')}
                    >
                      Subscription
                    </button>
                  </li>
                  <li>
                    <button
                      className={`w-full text-left px-4 py-2 rounded-lg ${
                        activeTab === 'privacy' 
                          ? 'bg-[var(--primary)] text-white' 
                          : 'hover:bg-[var(--background-alt)]'
                      }`}
                      onClick={() => setActiveTab('privacy')}
                    >
                      Privacy & Data
                    </button>
                  </li>
                  <li>
                    <button
                      className={`w-full text-left px-4 py-2 rounded-lg ${
                        activeTab === 'security' 
                          ? 'bg-[var(--primary)] text-white' 
                          : 'hover:bg-[var(--background-alt)]'
                      }`}
                      onClick={() => setActiveTab('security')}
                    >
                      Security
                    </button>
                  </li>
                  <li>
                    <button
                      className={`w-full text-left px-4 py-2 rounded-lg ${
                        activeTab === 'preferences' 
                          ? 'bg-[var(--primary)] text-white' 
                          : 'hover:bg-[var(--background-alt)]'
                      }`}
                      onClick={() => setActiveTab('preferences')}
                    >
                      Preferences
                    </button>
                  </li>
                  <li>
                    <button
                      className="w-full text-left px-4 py-2 rounded-lg text-purple-600 hover:bg-purple-100 dark:hover:bg-purple-900/20"
                      onClick={async () => {
                        await logout();
                        router.push('/');
                      }}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Main content */}
            <div className="flex-1">
              {activeTab === 'profile' && (
                <div className="card p-6">
                  <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        defaultValue={user?.firstName}
                        className="w-full p-2 border border-black/10 dark:border-white/10 rounded-lg"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        defaultValue={user?.lastName}
                        className="w-full p-2 border border-black/10 dark:border-white/10 rounded-lg"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        defaultValue={user?.email}
                        className="w-full p-2 border border-black/10 dark:border-white/10 rounded-lg"
                        disabled
                      />
                      <p className="text-xs text-foreground/60 mt-1">
                        To change your email, please contact support.
                      </p>
                    </div>
                    
                    <div className="pt-4">
                      <button className="btn-primary">
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'subscription' && (
                <div className="card p-6">
                  <h2 className="text-xl font-semibold mb-4">Subscription Details</h2>
                  
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">Current Plan</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user?.subscription?.status === 'active' 
                          ? 'bg-[var(--primary)]/10 text-[var(--primary)]' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {user?.subscription?.status === 'active' ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <p className="text-2xl font-bold mb-1">{user?.subscription?.plan || 'Standard'} Plan</p>
                    <p className="text-foreground/70">{user?.subscription?.isAnnual ? 'Annual' : 'Monthly'} billing</p>
                  
                    {user?.subscription?.currentPeriodEnd && (
                      <p className="text-sm text-foreground/60 mt-2">
                        Next billing date: {new Date(user.subscription.currentPeriodEnd).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button 
                      className="btn-primary"
                      onClick={() => window.open('/api/payments/portal', '_blank')}
                    >
                      Manage Billing
                    </button>
                    <button className="btn-secondary">
                      Change Plan
                    </button>
                  </div>
                </div>
              )}
              
              {activeTab === 'privacy' && (
                <div className="card p-6">
                  <h2 className="text-xl font-semibold mb-4">Privacy & Data</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-2">Data Storage</h3>
                      <div className="flex items-center mb-2">
                        <input
                          type="checkbox"
                          id="localStorage"
                          className="mr-2"
                        />
                        <label htmlFor="localStorage">
                          Enable local-only storage (Premium feature)
                        </label>
                      </div>
                      <p className="text-sm text-foreground/60">
                        When enabled, your conversation data will only be stored on your device.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Data Retention</h3>
                      <select className="w-full p-2 border border-black/10 dark:border-white/10 rounded-lg">
                        <option>Keep data indefinitely</option>
                        <option>Delete data after 1 year</option>
                        <option>Delete data after 6 months</option>
                        <option>Delete data after 3 months</option>
                        <option>Delete data after 1 month</option>
                      </select>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Data Export</h3>
                      <button className="btn-secondary">
                        Export All My Data
                      </button>
                      <p className="text-sm text-foreground/60 mt-1">
                        Receive a complete copy of all your data in a downloadable format.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2 text-purple-600">Danger Zone</h3>
                      <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
                        Delete All My Data
                      </button>
                      <p className="text-sm text-foreground/60 mt-1">
                        This action cannot be undone. All your data will be permanently deleted.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'security' && (
                <div className="card p-6">
                  <h2 className="text-xl font-semibold mb-4">Security Settings</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-2">Change Password</h3>
                      
                      {passwordSuccess && (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                          {passwordSuccess}
                        </div>
                      )}
                      
                      {passwordError && (
                        <div className="bg-purple-100 border border-purple-400 text-purple-700 px-4 py-3 rounded mb-4">
                          {passwordError}
                        </div>
                      )}
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Current Password
                          </label>
                          <input
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="w-full p-2 border border-black/10 dark:border-white/10 rounded-lg"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            New Password
                          </label>
                          <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full p-2 border border-black/10 dark:border-white/10 rounded-lg"
                          />
                          <p className="text-xs text-foreground/60 mt-1">
                            Must be at least 8 characters
                          </p>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Confirm New Password
                          </label>
                          <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className={`w-full p-2 border ${
                              passwordError && newPassword !== confirmPassword 
                                ? 'border-red-500' 
                                : 'border-black/10 dark:border-white/10'
                            } rounded-lg`}
                          />
                          {passwordError && newPassword !== confirmPassword && (
                            <p className="text-xs text-purple-500 mt-1">Passwords do not match</p>
                          )}
                        </div>
                        
                        <div>
                          <button 
                            className="btn-primary"
                            disabled={isSubmitting}
                            onClick={async () => {
                              // Reset messages
                              setPasswordError('');
                              setPasswordSuccess('');
                              
                              // Validate inputs
                              if (!currentPassword) {
                                setPasswordError('Current password is required');
                                return;
                              }
                              
                              if (!newPassword) {
                                setPasswordError('New password is required');
                                return;
                              }
                              
                              if (newPassword.length < 8) {
                                setPasswordError('New password must be at least 8 characters');
                                return;
                              }
                              
                              if (newPassword !== confirmPassword) {
                                setPasswordError('New passwords do not match');
                                return;
                              }
                              
                              // Submit the form
                              setIsSubmitting(true);
                              
                              try {
                                const response = await fetch('/api/auth/change-password', {
                                  method: 'POST',
                                  headers: {
                                    'Content-Type': 'application/json',
                                  },
                                  body: JSON.stringify({
                                    currentPassword,
                                    newPassword,
                                  }),
                                });
                                
                                const data = await response.json();
                                
                                if (!response.ok) {
                                  throw new Error(data.error || 'Failed to change password');
                                }
                                
                                // Clear form and show success message
                                setCurrentPassword('');
                                setNewPassword('');
                                setConfirmPassword('');
                                setPasswordSuccess('Password updated successfully');
                              } catch (error: any) {
                                setPasswordError(error.message);
                              } finally {
                                setIsSubmitting(false);
                              }
                            }}
                          >
                            {isSubmitting ? 'Updating...' : 'Update Password'}
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Two-Factor Authentication</h3>
                      <button className="btn-secondary">
                        Enable 2FA
                      </button>
                      <p className="text-sm text-foreground/60 mt-1">
                        Add an extra layer of security to your account.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Active Sessions</h3>
                      <div className="card p-4 bg-[var(--background-alt)]">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">Current Session</p>
                            <p className="text-sm text-foreground/60">Chrome on Windows • San Francisco, CA</p>
                          </div>
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                            Active Now
                          </span>
                        </div>
                      </div>
                      <button className="btn-secondary mt-4">
                        Log Out All Other Devices
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'preferences' && (
                <div className="card p-6">
                  <h2 className="text-xl font-semibold mb-4">Preferences</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-2">Appearance</h3>
                      <div className="flex items-center justify-between mb-2">
                        <span>Dark Mode</span>
                        <DarkModeToggle />
                      </div>
                      <p className="text-sm text-foreground/60">
                        Switch between light and dark themes. Your preference will be saved.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Language</h3>
                      <select className="w-full p-2 border border-black/10 dark:border-white/10 rounded-lg">
                        <option>English (US)</option>
                        <option>Spanish</option>
                        <option>French</option>
                        <option>German</option>
                      </select>
                      <p className="text-sm text-foreground/60 mt-1">
                        Choose your preferred language for the interface.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Notifications</h3>
                      <div className="flex items-center mb-2">
                        <input
                          type="checkbox"
                          id="emailNotifications"
                          className="mr-2"
                        />
                        <label htmlFor="emailNotifications">
                          Email notifications
                        </label>
                      </div>
                      <p className="text-sm text-foreground/60">
                        Receive email notifications about your account and sessions.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
