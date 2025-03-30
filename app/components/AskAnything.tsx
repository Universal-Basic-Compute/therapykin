'use client';

import { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { sendMessageToKinOS } from '../utils/kinos';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  id: string;
  loading?: boolean;
}

export default function AskAnything() {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    { 
      role: 'assistant', 
      content: "Hi there! I'm TherapyKin. Feel free to ask me anything about mental health, therapy, or how I can help you.", 
      id: 'intro-message' 
    }
  ]);
  const [projectId, setProjectId] = useState<string | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Initialize project ID from session storage or create a new one
  useEffect(() => {
    let storedId = sessionStorage.getItem('therapykin_demo_project_id');
    if (!storedId) {
      storedId = uuidv4();
      sessionStorage.setItem('therapykin_demo_project_id', storedId);
    }
    setProjectId(storedId);
  }, []);

  // Auto-scroll to bottom when chat history changes
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    
    // Add user message to chat
    const userMessageId = `user-${Date.now()}`;
    setChatHistory(prev => [...prev, { 
      role: 'user', 
      content: message, 
      id: userMessageId 
    }]);
    
    // Clear input
    setMessage('');
    
    // Set loading state
    const loadingId = Date.now().toString();
    setChatHistory(prev => [
      ...prev,
      { role: 'assistant', content: '...', id: loadingId, loading: true }
    ]);
    
    try {
      // Use first name and last name from project ID for demo purposes
      const firstName = 'Demo';
      const lastName = projectId || 'User';
      
      // Send message to KinOS API
      const response = await sendMessageToKinOS(
        message,
        firstName,
        lastName,
        [], // attachments
        [], // images
        null, // mode
        'generalist' // specialist
      );
      
      // Update chat history with the response
      setChatHistory(prev => 
        prev.map(msg => 
          msg.id === loadingId 
            ? { role: 'assistant', content: response, id: loadingId, loading: false }
            : msg
        )
      );
    } catch (error) {
      console.error('Error getting response:', error);
      
      // Update with error message
      setChatHistory(prev => 
        prev.map(msg => 
          msg.id === loadingId 
            ? { role: 'assistant', content: "I'm sorry, I encountered an error. Please try again.", id: loadingId, loading: false }
            : msg
        )
      );
    }
  };

  return (
    <section className="py-16 px-4 bg-[var(--background-alt)]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Ask Anything</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Try TherapyKin right now! Ask any question about mental health, therapy approaches, or how TherapyKin can support your well-being journey.
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Chat Interface */}
          <div className="lg:w-1/2 flex flex-col">
            <div 
              ref={chatContainerRef}
              className="card p-4 h-[400px] overflow-y-auto mb-4 flex-grow"
            >
              <div className="space-y-4">
                {chatHistory.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div 
                      className={`max-w-[80%] p-3 rounded-lg ${
                        msg.role === 'user' 
                          ? 'user-message-bubble rounded-br-none' 
                          : 'assistant-message-bubble rounded-bl-none'
                      }`}
                    >
                      {msg.loading ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                      ) : (
                        <p className="text-bubble whitespace-pre-wrap">{msg.content}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="flex shadow-sm rounded-lg overflow-hidden border border-black/10 dark:border-white/10">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your question here..."
                className="flex-grow p-3 focus:outline-none focus:ring-1 focus:ring-[var(--primary)] bg-[var(--card-bg)]"
              />
              <button 
                type="submit" 
                className="bg-[var(--primary)] text-white p-3 hover:opacity-90 transition-opacity"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </form>
          </div>
          
          {/* Information Panel */}
          <div className="lg:w-1/2">
            <div className="card p-6">
              <h3 className="text-xl font-semibold mb-4">Why Try TherapyKin?</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium">Instant Support</h4>
                    <p className="text-foreground/70">Get thoughtful responses to your questions right away, no waiting or scheduling required.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium">Privacy-First Design</h4>
                    <p className="text-foreground/70">Your conversations are private and secure. We prioritize your confidentiality at every step.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium">Evidence-Based Approaches</h4>
                    <p className="text-foreground/70">TherapyKin draws from established therapeutic techniques like CBT, ACT, and mindfulness practices.</p>
                  </div>
                </div>
                
                <div className="mt-8 p-4 bg-[var(--primary)]/5 rounded-lg">
                  <p className="text-sm text-foreground/70">
                    <strong>Note:</strong> This is just a preview. Create an account to experience the full capabilities of TherapyKin, including personalized sessions, progress tracking, and a companion that remembers your journey.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
