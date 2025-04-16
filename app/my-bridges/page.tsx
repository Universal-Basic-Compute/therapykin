'use client';

import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { useAuth } from '../contexts/AuthContext';
import Link from 'next/link';

interface Bridge {
  id: string;
  name: string;
  description: string;
  participants: string[];
  status: 'active' | 'pending' | 'completed';
  createdAt: string;
  lastActive: string;
  type: string;
}

export default function MyBridges() {
  const { user, loading } = useAuth();
  const [bridges, setBridges] = useState<Bridge[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // New bridge form state
  const [showNewBridgeForm, setShowNewBridgeForm] = useState(false);
  const [newBridgeName, setNewBridgeName] = useState('');
  const [newBridgeDescription, setNewBridgeDescription] = useState('');
  const [newBridgeType, setNewBridgeType] = useState('relationship');
  const [newParticipantEmail, setNewParticipantEmail] = useState('');
  const [isCreatingBridge, setIsCreatingBridge] = useState(false);
  
  // Edit bridge state
  const [editingBridge, setEditingBridge] = useState<Bridge | null>(null);
  const [isUpdatingBridge, setIsUpdatingBridge] = useState(false);
  
  // Add participant state
  const [addingParticipantToBridgeId, setAddingParticipantToBridgeId] = useState<string | null>(null);
  const [newParticipantEmailToAdd, setNewParticipantEmailToAdd] = useState('');
  const [isAddingParticipant, setIsAddingParticipant] = useState(false);

  // Fetch bridges
  useEffect(() => {
    async function fetchBridges() {
      if (!user) return;
      
      try {
        setIsLoading(true);
        const response = await fetch('/api/bridges');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch bridges: ${response.status}`);
        }
        
        const data = await response.json();
        setBridges(data.bridges || []);
      } catch (err) {
        console.error('Error fetching bridges:', err);
        setError('Failed to load your bridges. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    }
    
    if (user) {
      fetchBridges();
    }
  }, [user]);

  // Create new bridge
  const handleCreateBridge = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newBridgeName.trim()) {
      setError('Bridge name is required');
      return;
    }
    
    try {
      setIsCreatingBridge(true);
      setError(null);
      
      const response = await fetch('/api/bridges', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newBridgeName,
          description: newBridgeDescription,
          type: newBridgeType,
          participantEmail: newParticipantEmail || null,
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create bridge');
      }
      
      const data = await response.json();
      
      // Add the new bridge to the list
      setBridges(prev => [...prev, data.bridge]);
      
      // Reset form
      setNewBridgeName('');
      setNewBridgeDescription('');
      setNewBridgeType('relationship');
      setNewParticipantEmail('');
      setShowNewBridgeForm(false);
    } catch (err: any) {
      console.error('Error creating bridge:', err);
      setError(err.message || 'Failed to create bridge. Please try again.');
    } finally {
      setIsCreatingBridge(false);
    }
  };

  // Update bridge
  const handleUpdateBridge = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editingBridge || !editingBridge.name.trim()) {
      setError('Bridge name is required');
      return;
    }
    
    try {
      setIsUpdatingBridge(true);
      setError(null);
      
      // Use query parameter instead of path parameter
      const response = await fetch(`/api/bridges?bridgeId=${editingBridge.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: editingBridge.name,
          description: editingBridge.description,
          type: editingBridge.type,
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update bridge');
      }
      
      const data = await response.json();
      
      // Update the bridge in the list
      setBridges(prev => 
        prev.map(bridge => 
          bridge.id === editingBridge.id ? data.bridge : bridge
        )
      );
      
      // Reset form
      setEditingBridge(null);
    } catch (err: any) {
      console.error('Error updating bridge:', err);
      setError(err.message || 'Failed to update bridge. Please try again.');
    } finally {
      setIsUpdatingBridge(false);
    }
  };

  // Delete bridge
  const handleDeleteBridge = async (bridgeId: string) => {
    if (!confirm('Are you sure you want to delete this bridge? This action cannot be undone.')) {
      return;
    }
    
    try {
      setError(null);
      
      // Use query parameter instead of path parameter
      const response = await fetch(`/api/bridges?bridgeId=${bridgeId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete bridge');
      }
      
      // Remove the bridge from the list
      setBridges(prev => prev.filter(bridge => bridge.id !== bridgeId));
    } catch (err: any) {
      console.error('Error deleting bridge:', err);
      setError(err.message || 'Failed to delete bridge. Please try again.');
    }
  };

  // Add participant to bridge
  const handleAddParticipant = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!addingParticipantToBridgeId || !newParticipantEmailToAdd.trim()) {
      setError('Participant email is required');
      return;
    }
    
    try {
      setIsAddingParticipant(true);
      setError(null);
      
      const response = await fetch(`/api/bridges/${addingParticipantToBridgeId}/participants`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: newParticipantEmailToAdd,
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add participant');
      }
      
      const data = await response.json();
      
      // Update the bridge in the list
      setBridges(prev => 
        prev.map(bridge => 
          bridge.id === addingParticipantToBridgeId ? data.bridge : bridge
        )
      );
      
      // Reset form
      setAddingParticipantToBridgeId(null);
      setNewParticipantEmailToAdd('');
    } catch (err: any) {
      console.error('Error adding participant:', err);
      setError(err.message || 'Failed to add participant. Please try again.');
    } finally {
      setIsAddingParticipant(false);
    }
  };

  // Remove participant from bridge
  const handleRemoveParticipant = async (bridgeId: string, participantEmail: string) => {
    if (!confirm(`Are you sure you want to remove ${participantEmail} from this bridge?`)) {
      return;
    }
    
    try {
      setError(null);
      
      const response = await fetch(`/api/bridges/${bridgeId}/participants`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: participantEmail,
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to remove participant');
      }
      
      const data = await response.json();
      
      // Update the bridge in the list
      setBridges(prev => 
        prev.map(bridge => 
          bridge.id === bridgeId ? data.bridge : bridge
        )
      );
    } catch (err: any) {
      console.error('Error removing participant:', err);
      setError(err.message || 'Failed to remove participant. Please try again.');
    }
  };

  // Get status badge color
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'completed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  // Get bridge type label
  const getBridgeTypeLabel = (type: string) => {
    switch (type) {
      case 'relationship':
        return 'Relationship Renewal';
      case 'family':
        return 'Family Harmony';
      case 'workplace':
        return 'Workplace Resolution';
      case 'friendship':
        return 'Friendship Repair';
      default:
        return 'Custom Bridge';
    }
  };
  
  // Get bridge type color
  const getBridgeTypeColor = (type: string) => {
    switch (type) {
      case 'relationship':
        return 'border-t-4 border-t-[var(--primary)]'; // Teal for relationship bridges
      case 'family':
        return 'border-t-4 border-t-[var(--primary-light)]'; // Light green for family bridges
      case 'workplace':
        return 'border-t-4 border-t-[var(--primary-dark)]'; // Purple for workplace bridges
      case 'friendship':
        return 'border-t-4 border-t-[var(--accent)]'; // Yellow for friendship bridges
      default:
        return 'border-t-4 border-t-[var(--accent-light)]'; // Orange/pink for other types
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow pt-24 pb-16 px-4 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p>Loading your bridges...</p>
          </div>
        </main>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow pt-24 pb-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-6">My Bridges</h1>
            <div className="card p-8">
              <p className="mb-4">Please log in to view and manage your bridges.</p>
              <Link href="/login" className="btn-primary">
                Log In
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">My Bridges</h1>
            <button 
              onClick={() => setShowNewBridgeForm(true)}
              className="btn-primary"
            >
              Create New Bridge
            </button>
          </div>
          
          {error && (
            <div className="mb-6 p-4 bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 rounded-lg">
              {error}
            </div>
          )}
          
          {/* New Bridge Form */}
          {showNewBridgeForm && (
            <div className="card p-6 mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Create New Bridge</h2>
                <button 
                  onClick={() => setShowNewBridgeForm(false)}
                  className="text-foreground/60 hover:text-foreground"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <form onSubmit={handleCreateBridge}>
                <div className="mb-4">
                  <label htmlFor="bridgeName" className="block text-sm font-medium mb-1">Bridge Name*</label>
                  <input
                    type="text"
                    id="bridgeName"
                    value={newBridgeName}
                    onChange={(e) => setNewBridgeName(e.target.value)}
                    className="w-full p-2 border border-black/10 dark:border-white/10 rounded-lg bg-[var(--background)]"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="bridgeDescription" className="block text-sm font-medium mb-1">Description</label>
                  <textarea
                    id="bridgeDescription"
                    value={newBridgeDescription}
                    onChange={(e) => setNewBridgeDescription(e.target.value)}
                    className="w-full p-2 border border-black/10 dark:border-white/10 rounded-lg bg-[var(--background)] h-24"
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="bridgeType" className="block text-sm font-medium mb-1">Bridge Type</label>
                  <select
                    id="bridgeType"
                    value={newBridgeType}
                    onChange={(e) => setNewBridgeType(e.target.value)}
                    className="w-full p-2 border border-black/10 dark:border-white/10 rounded-lg bg-[var(--background)]"
                  >
                    <option value="relationship">Relationship Renewal</option>
                    <option value="family">Family Harmony</option>
                    <option value="workplace">Workplace Resolution</option>
                    <option value="friendship">Friendship Repair</option>
                  </select>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="participantEmail" className="block text-sm font-medium mb-1">Invite Participant (Optional)</label>
                  <input
                    type="email"
                    id="participantEmail"
                    value={newParticipantEmail}
                    onChange={(e) => setNewParticipantEmail(e.target.value)}
                    placeholder="Enter email address"
                    className="w-full p-2 border border-black/10 dark:border-white/10 rounded-lg bg-[var(--background)]"
                  />
                  <p className="text-xs text-foreground/60 mt-1">
                    You can add participants later if you prefer.
                  </p>
                </div>
                
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowNewBridgeForm(false)}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary"
                    disabled={isCreatingBridge}
                  >
                    {isCreatingBridge ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Creating...
                      </>
                    ) : (
                      'Create Bridge'
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
          
          {/* Edit Bridge Form */}
          {editingBridge && (
            <div className="card p-6 mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Edit Bridge</h2>
                <button 
                  onClick={() => setEditingBridge(null)}
                  className="text-foreground/60 hover:text-foreground"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <form onSubmit={handleUpdateBridge}>
                <div className="mb-4">
                  <label htmlFor="editBridgeName" className="block text-sm font-medium mb-1">Bridge Name*</label>
                  <input
                    type="text"
                    id="editBridgeName"
                    value={editingBridge.name}
                    onChange={(e) => setEditingBridge({...editingBridge, name: e.target.value})}
                    className="w-full p-2 border border-black/10 dark:border-white/10 rounded-lg bg-[var(--background)]"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="editBridgeDescription" className="block text-sm font-medium mb-1">Description</label>
                  <textarea
                    id="editBridgeDescription"
                    value={editingBridge.description}
                    onChange={(e) => setEditingBridge({...editingBridge, description: e.target.value})}
                    className="w-full p-2 border border-black/10 dark:border-white/10 rounded-lg bg-[var(--background)] h-24"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="editBridgeType" className="block text-sm font-medium mb-1">Bridge Type</label>
                  <select
                    id="editBridgeType"
                    value={editingBridge.type}
                    onChange={(e) => setEditingBridge({...editingBridge, type: e.target.value})}
                    className="w-full p-2 border border-black/10 dark:border-white/10 rounded-lg bg-[var(--background)]"
                  >
                    <option value="relationship">Relationship Renewal</option>
                    <option value="family">Family Harmony</option>
                    <option value="workplace">Workplace Resolution</option>
                    <option value="friendship">Friendship Repair</option>
                  </select>
                </div>
                
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setEditingBridge(null)}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary"
                    disabled={isUpdatingBridge}
                  >
                    {isUpdatingBridge ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Updating...
                      </>
                    ) : (
                      'Update Bridge'
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
          
          {/* Add Participant Form */}
          {addingParticipantToBridgeId && (
            <div className="card p-6 mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Add Participant</h2>
                <button 
                  onClick={() => setAddingParticipantToBridgeId(null)}
                  className="text-foreground/60 hover:text-foreground"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <form onSubmit={handleAddParticipant}>
                <div className="mb-6">
                  <label htmlFor="newParticipantEmail" className="block text-sm font-medium mb-1">Participant Email*</label>
                  <input
                    type="email"
                    id="newParticipantEmail"
                    value={newParticipantEmailToAdd}
                    onChange={(e) => setNewParticipantEmailToAdd(e.target.value)}
                    placeholder="Enter email address"
                    className="w-full p-2 border border-black/10 dark:border-white/10 rounded-lg bg-[var(--background)]"
                    required
                  />
                  <p className="text-xs text-foreground/60 mt-1">
                    An invitation will be sent to this email address.
                  </p>
                </div>
                
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setAddingParticipantToBridgeId(null)}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary"
                    disabled={isAddingParticipant}
                  >
                    {isAddingParticipant ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Adding...
                      </>
                    ) : (
                      'Add Participant'
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
          
          {/* Bridges List */}
          {isLoading ? (
            <div className="text-center py-12">
              <div className="w-12 h-12 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p>Loading your bridges...</p>
            </div>
          ) : bridges.length === 0 ? (
            <div className="card p-8 text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-[var(--background-alt)] rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-foreground/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold mb-2">No Bridges Yet</h2>
              <p className="text-foreground/70 mb-6">
                Create your first bridge to start building meaningful connections through AI-facilitated mediation.
              </p>
              <button 
                onClick={() => setShowNewBridgeForm(true)}
                className="btn-primary"
              >
                Create Your First Bridge
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {bridges.map(bridge => (
                <div key={bridge.id} className={`card p-6 hover:shadow-lg transition-shadow ${getBridgeTypeColor(bridge.type)}`}>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-xl font-semibold">{bridge.name}</h2>
                      <div className="flex items-center mt-1 space-x-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusBadgeColor(bridge.status)}`}>
                          {bridge.status.charAt(0).toUpperCase() + bridge.status.slice(1)}
                        </span>
                        <span className="text-xs text-foreground/60">
                          {getBridgeTypeLabel(bridge.type)}
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => setEditingBridge(bridge)}
                        className="p-1 text-foreground/60 hover:text-foreground"
                        title="Edit Bridge"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button 
                        onClick={() => handleDeleteBridge(bridge.id)}
                        className="p-1 text-foreground/60 hover:text-red-500"
                        title="Delete Bridge"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  {bridge.description && (
                    <p className="text-foreground/70 mb-4 text-sm">{bridge.description}</p>
                  )}
                  
                  <div className="mb-4">
                    <h3 className="text-sm font-medium mb-2">Participants</h3>
                    <div className="space-y-2">
                      {bridge.participants.length > 0 ? (
                        bridge.participants.map((participant, index) => (
                          <div key={index} className="flex justify-between items-center p-2 bg-[var(--background-alt)] rounded-lg">
                            <span className="text-sm">{participant}</span>
                            {/* Don't allow removing yourself */}
                            {participant !== user.email && (
                              <button 
                                onClick={() => handleRemoveParticipant(bridge.id, participant)}
                                className="text-foreground/60 hover:text-red-500"
                                title="Remove Participant"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            )}
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-foreground/60 italic">No participants yet</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <button 
                      onClick={() => {
                        setAddingParticipantToBridgeId(bridge.id);
                        setNewParticipantEmailToAdd('');
                      }}
                      className="text-sm text-[var(--primary)] hover:text-[var(--primary-dark)] flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Add Participant
                    </button>
                    
                    <Link 
                      href={`/bridges/chat?bridgeId=${bridge.id}`}
                      className="btn-primary text-sm px-4 py-2"
                    >
                      Enter Bridge
                    </Link>
                  </div>
                  
                  <div className="mt-4 pt-3 border-t border-black/5 dark:border-white/5 text-xs text-foreground/50 flex justify-between">
                    <span>Created: {new Date(bridge.createdAt).toLocaleDateString()}</span>
                    <span>Last active: {new Date(bridge.lastActive).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
