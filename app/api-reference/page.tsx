'use client';

import React, { useState } from 'react';
import Header from '../components/Header';
import Link from 'next/link';

export default function ApiReference() {
  const [activeCategory, setActiveCategory] = useState('authentication');
  const [expandedEndpoint, setExpandedEndpoint] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [testEndpoint, setTestEndpoint] = useState('/api/auth/me');
  const [testRequestBody, setTestRequestBody] = useState('{}');
  const [testResponse, setTestResponse] = useState(null);

  const toggleEndpoint = (endpoint: string) => {
    if (expandedEndpoint === endpoint) {
      setExpandedEndpoint(null);
    } else {
      setExpandedEndpoint(endpoint);
    }
  };

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleTestRequest = async () => {
    try {
      const isGet = testEndpoint.startsWith('GET ');
      const endpoint = isGet ? testEndpoint.substring(4) : testEndpoint;
      
      const response = await fetch(endpoint, {
        method: isGet ? 'GET' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: isGet ? undefined : testRequestBody,
      });
      
      const data = await response.json();
      setTestResponse(data);
    } catch (error) {
      setTestResponse({ error: (error as Error).message });
    }
  };

  // Filter endpoints based on search query
  const filterEndpoints = (endpoints: any[]) => {
    if (!searchQuery) return endpoints;
    return endpoints.filter(endpoint => 
      endpoint.path.toLowerCase().includes(searchQuery.toLowerCase()) ||
      endpoint.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">TherapyKin API Reference</h1>
            <p className="text-foreground/70">
              Complete documentation for the TherapyKin API. Use these endpoints to integrate with our platform.
            </p>
          </div>

          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search API endpoints..."
                className="w-full p-3 pl-10 border border-black/10 dark:border-white/10 rounded-lg bg-[var(--background)]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-3.5 text-foreground/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <div className="card p-4 mb-6">
            <h3 className="text-lg font-semibold mb-2">API Versioning</h3>
            <p className="text-foreground/70">
              The current version of the TherapyKin API is <code className="bg-[var(--background-alt)] px-1 py-0.5 rounded">v1</code>. 
              All endpoints are prefixed with <code className="bg-[var(--background-alt)] px-1 py-0.5 rounded">/api</code>.
              We will notify users of any breaking changes and provide migration guides when new versions are released.
            </p>
          </div>

          <div className="card p-4 mb-6">
            <h3 className="text-lg font-semibold mb-2">Common Status Codes</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 mr-2">200</span>
                <span>Success - The request was successful</span>
              </div>
              <div className="flex items-center">
                <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 mr-2">201</span>
                <span>Created - A new resource was successfully created</span>
              </div>
              <div className="flex items-center">
                <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 mr-2">400</span>
                <span>Bad Request - The request was malformed or had invalid parameters</span>
              </div>
              <div className="flex items-center">
                <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 mr-2">401</span>
                <span>Unauthorized - Authentication is required or failed</span>
              </div>
              <div className="flex items-center">
                <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 mr-2">403</span>
                <span>Forbidden - You don't have permission to access this resource</span>
              </div>
              <div className="flex items-center">
                <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 mr-2">404</span>
                <span>Not Found - The requested resource was not found</span>
              </div>
              <div className="flex items-center">
                <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 mr-2">500</span>
                <span>Internal Server Error - Something went wrong on the server</span>
              </div>
            </div>
          </div>

          <div className="card p-4 mb-6">
            <h3 className="text-lg font-semibold mb-2">Rate Limiting</h3>
            <p className="text-foreground/70 mb-2">
              To ensure service stability, the TherapyKin API implements rate limiting. Limits vary by endpoint:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-foreground/70">
              <li>Authentication endpoints: 10 requests per minute</li>
              <li>KinOS integration endpoints: 60 requests per minute</li>
              <li>Media endpoints (TTS/STT): 30 requests per minute</li>
              <li>Other endpoints: 120 requests per minute</li>
            </ul>
            <p className="text-foreground/70 mt-2">
              When rate limits are exceeded, the API will return a <code className="bg-[var(--background-alt)] px-1 py-0.5 rounded">429 Too Many Requests</code> status code.
            </p>
          </div>

          <div className="card p-4 mb-6">
            <h3 className="text-lg font-semibold mb-2">Client SDKs</h3>
            <p className="text-foreground/70 mb-4">
              We provide official client libraries to make integrating with the TherapyKin API easier:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-black/10 dark:border-white/10 rounded-lg">
                <div className="flex items-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <h4 className="font-medium">JavaScript/TypeScript</h4>
                </div>
                <div className="bg-[var(--background-alt)] p-2 rounded-lg font-mono text-xs mb-2">
                  npm install therapykin-js
                </div>
                <a href="#" className="text-[var(--primary)] text-sm hover:underline">View Documentation →</a>
              </div>
              <div className="p-4 border border-black/10 dark:border-white/10 rounded-lg">
                <div className="flex items-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <h4 className="font-medium">Python</h4>
                </div>
                <div className="bg-[var(--background-alt)] p-2 rounded-lg font-mono text-xs mb-2">
                  pip install therapykin-python
                </div>
                <a href="#" className="text-[var(--primary)] text-sm hover:underline">View Documentation →</a>
              </div>
            </div>
          </div>

          <div className="card p-4 mb-6">
            <h3 className="text-lg font-semibold mb-4">API Tester</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Endpoint</label>
                <select 
                  className="w-full p-2 border border-black/10 dark:border-white/10 rounded-lg bg-[var(--background)]"
                  value={testEndpoint}
                  onChange={(e) => setTestEndpoint(e.target.value)}
                >
                  <option value="/api/auth/me">GET /api/auth/me</option>
                  <option value="/api/users/preferences">GET /api/users/preferences</option>
                  <option value="/api/sessions/stats">GET /api/sessions/stats</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Request Body (JSON)</label>
                <textarea
                  className="w-full p-2 border border-black/10 dark:border-white/10 rounded-lg bg-[var(--background)] font-mono text-sm h-32"
                  value={testRequestBody}
                  onChange={(e) => setTestRequestBody(e.target.value)}
                  placeholder="{}"
                />
              </div>
              
              <button 
                className="btn-primary"
                onClick={handleTestRequest}
              >
                Send Request
              </button>
              
              {testResponse && (
                <div>
                  <h4 className="text-sm font-medium mb-1">Response</h4>
                  <div className="bg-[var(--background-alt)] p-3 rounded-lg font-mono text-sm overflow-x-auto max-h-64 overflow-y-auto">
                    {JSON.stringify(testResponse, null, 2)}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6">
            {/* Sidebar Navigation */}
            <div className="md:w-64 shrink-0">
              <div className="card p-4 sticky top-24">
                <h2 className="font-semibold mb-3 text-lg">Categories</h2>
                <nav className="space-y-1">
                  <button 
                    className={`w-full text-left px-3 py-2 rounded-lg ${activeCategory === 'authentication' ? 'bg-[var(--primary)] text-white' : 'hover:bg-[var(--background-alt)]'}`}
                    onClick={() => setActiveCategory('authentication')}
                  >
                    Authentication
                  </button>
                  <button 
                    className={`w-full text-left px-3 py-2 rounded-lg ${activeCategory === 'sessions' ? 'bg-[var(--primary)] text-white' : 'hover:bg-[var(--background-alt)]'}`}
                    onClick={() => setActiveCategory('sessions')}
                  >
                    Sessions
                  </button>
                  <button 
                    className={`w-full text-left px-3 py-2 rounded-lg ${activeCategory === 'bridges' ? 'bg-[var(--primary)] text-white' : 'hover:bg-[var(--background-alt)]'}`}
                    onClick={() => setActiveCategory('bridges')}
                  >
                    Bridges
                  </button>
                  <button 
                    className={`w-full text-left px-3 py-2 rounded-lg ${activeCategory === 'kinos' ? 'bg-[var(--primary)] text-white' : 'hover:bg-[var(--background-alt)]'}`}
                    onClick={() => setActiveCategory('kinos')}
                  >
                    KinOS Integration
                  </button>
                  <button 
                    className={`w-full text-left px-3 py-2 rounded-lg ${activeCategory === 'payments' ? 'bg-[var(--primary)] text-white' : 'hover:bg-[var(--background-alt)]'}`}
                    onClick={() => setActiveCategory('payments')}
                  >
                    Payments
                  </button>
                  <button 
                    className={`w-full text-left px-3 py-2 rounded-lg ${activeCategory === 'users' ? 'bg-[var(--primary)] text-white' : 'hover:bg-[var(--background-alt)]'}`}
                    onClick={() => setActiveCategory('users')}
                  >
                    Users
                  </button>
                  <button 
                    className={`w-full text-left px-3 py-2 rounded-lg ${activeCategory === 'media' ? 'bg-[var(--primary)] text-white' : 'hover:bg-[var(--background-alt)]'}`}
                    onClick={() => setActiveCategory('media')}
                  >
                    Media
                  </button>
                  <button 
                    className={`w-full text-left px-3 py-2 rounded-lg ${activeCategory === 'webhooks' ? 'bg-[var(--primary)] text-white' : 'hover:bg-[var(--background-alt)]'}`}
                    onClick={() => setActiveCategory('webhooks')}
                  >
                    Webhooks
                  </button>
                </nav>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="flex-grow">
              {/* Authentication API */}
              {activeCategory === 'authentication' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Authentication API</h2>
                  
                  <div className="mb-4">
                    <p className="text-foreground/70">
                      TherapyKin uses JWT (JSON Web Token) authentication. Most endpoints require a valid authentication token, 
                      which can be obtained by logging in or registering. The token is automatically stored as an HTTP-only cookie.
                    </p>
                  </div>
                  
                  {/* Login Endpoint */}
                  <div className="card mb-6 overflow-hidden">
                    <div 
                      className="flex justify-between items-center p-4 cursor-pointer hover:bg-[var(--background-alt)] border-b border-black/5 dark:border-white/5"
                      onClick={() => toggleEndpoint('auth-login')}
                    >
                      <div className="flex items-center">
                        <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 mr-3">POST</span>
                        <span className="font-mono text-sm">/api/auth/login</span>
                      </div>
                      <div>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform ${expandedEndpoint === 'auth-login' ? 'transform rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                    
                    {expandedEndpoint === 'auth-login' && (
                      <div className="p-4 border-t border-black/5 dark:border-white/5">
                        <p className="mb-4 text-foreground/70">Authenticate a user with email and password.</p>
                        
                        <h3 className="text-lg font-semibold mb-2">Request Headers</h3>
                        <div className="bg-[var(--background-alt)] p-3 rounded-lg mb-4 font-mono text-sm overflow-x-auto">
                          {`Content-Type: application/json
Authorization: Bearer {token} // Automatically handled by cookies`}
                        </div>
                        
                        <h3 className="text-lg font-semibold mb-2">Request Body</h3>
                        <div className="relative bg-[var(--background-alt)] p-3 rounded-lg mb-4 font-mono text-sm overflow-x-auto">
                          <button 
                            onClick={() => copyToClipboard(`{
  "email": "user@example.com",
  "password": "password123"
}`, 'auth-login-body')}
                            className="absolute top-2 right-2 p-1 rounded-md bg-[var(--background)] hover:bg-[var(--primary)]/10 transition-colors"
                            aria-label="Copy code"
                          >
                            {copiedCode === 'auth-login-body' ? (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-foreground/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                            )}
                          </button>
                          {`{
  "email": "user@example.com",
  "password": "password123"
}`}
                        </div>
                        
                        <h3 className="text-lg font-semibold mb-2">Response</h3>
                        <div className="relative bg-[var(--background-alt)] p-3 rounded-lg mb-4 font-mono text-sm overflow-x-auto">
                          <button 
                            onClick={() => copyToClipboard(`{
  "message": "Login successful",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "firstName": "John"
  }
}`, 'auth-login-response')}
                            className="absolute top-2 right-2 p-1 rounded-md bg-[var(--background)] hover:bg-[var(--primary)]/10 transition-colors"
                            aria-label="Copy code"
                          >
                            {copiedCode === 'auth-login-response' ? (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-foreground/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                            )}
                          </button>
                          {`{
  "message": "Login successful",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "firstName": "John"
  }
}`}
                        </div>
                        
                        <h3 className="text-lg font-semibold mb-2">Error Responses</h3>
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 mr-2">400</span>
                            <span>Email and password are required</span>
                          </div>
                          <div className="flex items-center">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 mr-2">401</span>
                            <span>Invalid credentials</span>
                          </div>
                          <div className="flex items-center">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 mr-2">500</span>
                            <span>Login failed</span>
                          </div>
                        </div>
                        
                        <h3 className="text-lg font-semibold mb-2">Example</h3>
                        <div className="relative bg-[var(--background-alt)] p-3 rounded-lg font-mono text-sm overflow-x-auto">
                          <button 
                            onClick={() => copyToClipboard(`fetch('/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'password123'
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`, 'auth-login-example')}
                            className="absolute top-2 right-2 p-1 rounded-md bg-[var(--background)] hover:bg-[var(--primary)]/10 transition-colors"
                            aria-label="Copy code"
                          >
                            {copiedCode === 'auth-login-example' ? (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-foreground/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                            )}
                          </button>
                          {`fetch('/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'password123'
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Register Endpoint */}
                  <div className="card mb-6 overflow-hidden">
                    <div 
                      className="flex justify-between items-center p-4 cursor-pointer hover:bg-[var(--background-alt)] border-b border-black/5 dark:border-white/5"
                      onClick={() => toggleEndpoint('auth-register')}
                    >
                      <div className="flex items-center">
                        <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 mr-3">POST</span>
                        <span className="font-mono text-sm">/api/auth/register</span>
                      </div>
                      <div>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform ${expandedEndpoint === 'auth-register' ? 'transform rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                    
                    {expandedEndpoint === 'auth-register' && (
                      <div className="p-4 border-t border-black/5 dark:border-white/5">
                        <p className="mb-4 text-foreground/70">Register a new user account.</p>
                        
                        <h3 className="text-lg font-semibold mb-2">Request Body</h3>
                        <div className="bg-[var(--background-alt)] p-3 rounded-lg mb-4 font-mono text-sm overflow-x-auto">
                          {`{
  "email": "user@example.com",
  "firstName": "John",
  "password": "password123",
  "specialist": "generalist" // Optional
}`}
                        </div>
                        
                        <h3 className="text-lg font-semibold mb-2">Response</h3>
                        <div className="bg-[var(--background-alt)] p-3 rounded-lg mb-4 font-mono text-sm overflow-x-auto">
                          {`{
  "message": "User registered successfully",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "firstName": "John"
  }
}`}
                        </div>
                        
                        <h3 className="text-lg font-semibold mb-2">Error Responses</h3>
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 mr-2">400</span>
                            <span>Email, first name, and password are required</span>
                          </div>
                          <div className="flex items-center">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 mr-2">409</span>
                            <span>User with this email already exists</span>
                          </div>
                          <div className="flex items-center">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 mr-2">500</span>
                            <span>Registration failed</span>
                          </div>
                        </div>
                        
                        <h3 className="text-lg font-semibold mb-2">Example</h3>
                        <div className="bg-[var(--background-alt)] p-3 rounded-lg font-mono text-sm overflow-x-auto">
                          {`fetch('/api/auth/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'user@example.com',
    firstName: 'John',
    password: 'password123',
    specialist: 'generalist'
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Logout Endpoint */}
                  <div className="card mb-6 overflow-hidden">
                    <div 
                      className="flex justify-between items-center p-4 cursor-pointer hover:bg-[var(--background-alt)] border-b border-black/5 dark:border-white/5"
                      onClick={() => toggleEndpoint('auth-logout')}
                    >
                      <div className="flex items-center">
                        <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 mr-3">POST</span>
                        <span className="font-mono text-sm">/api/auth/logout</span>
                      </div>
                      <div>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform ${expandedEndpoint === 'auth-logout' ? 'transform rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                    
                    {expandedEndpoint === 'auth-logout' && (
                      <div className="p-4 border-t border-black/5 dark:border-white/5">
                        <p className="mb-4 text-foreground/70">Log out the current user by clearing the authentication cookie.</p>
                        
                        <h3 className="text-lg font-semibold mb-2">Response</h3>
                        <div className="bg-[var(--background-alt)] p-3 rounded-lg mb-4 font-mono text-sm overflow-x-auto">
                          {`{
  "message": "Logout successful"
}`}
                        </div>
                        
                        <h3 className="text-lg font-semibold mb-2">Error Responses</h3>
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 mr-2">500</span>
                            <span>Logout failed</span>
                          </div>
                        </div>
                        
                        <h3 className="text-lg font-semibold mb-2">Example</h3>
                        <div className="bg-[var(--background-alt)] p-3 rounded-lg font-mono text-sm overflow-x-auto">
                          {`fetch('/api/auth/logout', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Me Endpoint */}
                  <div className="card mb-6 overflow-hidden">
                    <div 
                      className="flex justify-between items-center p-4 cursor-pointer hover:bg-[var(--background-alt)] border-b border-black/5 dark:border-white/5"
                      onClick={() => toggleEndpoint('auth-me')}
                    >
                      <div className="flex items-center">
                        <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 mr-3">GET</span>
                        <span className="font-mono text-sm">/api/auth/me</span>
                      </div>
                      <div>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform ${expandedEndpoint === 'auth-me' ? 'transform rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                    
                    {expandedEndpoint === 'auth-me' && (
                      <div className="p-4 border-t border-black/5 dark:border-white/5">
                        <p className="mb-4 text-foreground/70">Get the currently authenticated user's information.</p>
                        
                        <h3 className="text-lg font-semibold mb-2">Response</h3>
                        <div className="bg-[var(--background-alt)] p-3 rounded-lg mb-4 font-mono text-sm overflow-x-auto">
                          {`{
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "firstName": "John"
  }
}`}
                        </div>
                        
                        <h3 className="text-lg font-semibold mb-2">Error Responses</h3>
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 mr-2">401</span>
                            <span>Not authenticated</span>
                          </div>
                          <div className="flex items-center">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 mr-2">500</span>
                            <span>Authentication check failed</span>
                          </div>
                        </div>
                        
                        <h3 className="text-lg font-semibold mb-2">Example</h3>
                        <div className="bg-[var(--background-alt)] p-3 rounded-lg font-mono text-sm overflow-x-auto">
                          {`fetch('/api/auth/me', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Change Password Endpoint */}
                  <div className="card mb-6 overflow-hidden">
                    <div 
                      className="flex justify-between items-center p-4 cursor-pointer hover:bg-[var(--background-alt)] border-b border-black/5 dark:border-white/5"
                      onClick={() => toggleEndpoint('auth-change-password')}
                    >
                      <div className="flex items-center">
                        <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 mr-3">POST</span>
                        <span className="font-mono text-sm">/api/auth/change-password</span>
                      </div>
                      <div>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform ${expandedEndpoint === 'auth-change-password' ? 'transform rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                    
                    {expandedEndpoint === 'auth-change-password' && (
                      <div className="p-4 border-t border-black/5 dark:border-white/5">
                        <p className="mb-4 text-foreground/70">Change the password for the currently authenticated user.</p>
                        
                        <h3 className="text-lg font-semibold mb-2">Request Body</h3>
                        <div className="bg-[var(--background-alt)] p-3 rounded-lg mb-4 font-mono text-sm overflow-x-auto">
                          {`{
  "currentPassword": "oldPassword123",
  "newPassword": "newPassword456"
}`}
                        </div>
                        
                        <h3 className="text-lg font-semibold mb-2">Response</h3>
                        <div className="bg-[var(--background-alt)] p-3 rounded-lg mb-4 font-mono text-sm overflow-x-auto">
                          {`{
  "message": "Password updated successfully"
}`}
                        </div>
                        
                        <h3 className="text-lg font-semibold mb-2">Error Responses</h3>
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 mr-2">400</span>
                            <span>Current password and new password are required</span>
                          </div>
                          <div className="flex items-center">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 mr-2">401</span>
                            <span>Current password is incorrect</span>
                          </div>
                          <div className="flex items-center">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 mr-2">404</span>
                            <span>User not found</span>
                          </div>
                          <div className="flex items-center">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 mr-2">500</span>
                            <span>Failed to change password</span>
                          </div>
                        </div>
                        
                        <h3 className="text-lg font-semibold mb-2">Example</h3>
                        <div className="bg-[var(--background-alt)] p-3 rounded-lg font-mono text-sm overflow-x-auto">
                          {`fetch('/api/auth/change-password', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    currentPassword: 'oldPassword123',
    newPassword: 'newPassword456'
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {/* Sessions API */}
              {activeCategory === 'sessions' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Sessions API</h2>
                  
                  {/* Create Session Endpoint */}
                  <div className="card mb-6 overflow-hidden">
                    <div 
                      className="flex justify-between items-center p-4 cursor-pointer hover:bg-[var(--background-alt)] border-b border-black/5 dark:border-white/5"
                      onClick={() => toggleEndpoint('sessions-create-demo')}
                    >
                      <div className="flex items-center">
                        <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 mr-3">POST</span>
                        <span className="font-mono text-sm">/api/sessions/create-demo</span>
                      </div>
                      <div>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform ${expandedEndpoint === 'sessions-create-demo' ? 'transform rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                    
                    {expandedEndpoint === 'sessions-create-demo' && (
                      <div className="p-4 border-t border-black/5 dark:border-white/5">
                        <p className="mb-4 text-foreground/70">Create a demo therapy session.</p>
                        
                        <h3 className="text-lg font-semibold mb-2">Request Body</h3>
                        <div className="bg-[var(--background-alt)] p-3 rounded-lg mb-4 font-mono text-sm overflow-x-auto">
                          {`{
  "email": "user@example.com", // Optional
  "sessionLength": 15, // Optional, defaults to 15
  "specialist": "welcome", // Optional, defaults to "welcome"
  "kinId": "required-kin-id",
  "pseudonym": "UserPseudonym" // Optional
}`}
                        </div>
                        
                        <h3 className="text-lg font-semibold mb-2">Response</h3>
                        <div className="bg-[var(--background-alt)] p-3 rounded-lg mb-4 font-mono text-sm overflow-x-auto">
                          {`{
  "success": true,
  "session": {
    "id": "session_id",
    "createdAt": "2023-06-01T12:00:00Z"
  }
}`}
                        </div>
                        
                        <h3 className="text-lg font-semibold mb-2">Error Responses</h3>
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 mr-2">400</span>
                            <span>KinId is required</span>
                          </div>
                          <div className="flex items-center">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 mr-2">400</span>
                            <span>Invalid specialist value</span>
                          </div>
                          <div className="flex items-center">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 mr-2">500</span>
                            <span>Failed to create demo session</span>
                          </div>
                        </div>
                        
                        <h3 className="text-lg font-semibold mb-2">Example</h3>
                        <div className="bg-[var(--background-alt)] p-3 rounded-lg font-mono text-sm overflow-x-auto">
                          {`fetch('/api/sessions/create-demo', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    kinId: 'user-kin-id-123',
    specialist: 'welcome',
    sessionLength: 15
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Submit Rating Endpoint */}
                  <div className="card mb-6 overflow-hidden">
                    <div 
                      className="flex justify-between items-center p-4 cursor-pointer hover:bg-[var(--background-alt)] border-b border-black/5 dark:border-white/5"
                      onClick={() => toggleEndpoint('sessions-submit-rating')}
                    >
                      <div className="flex items-center">
                        <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 mr-3">POST</span>
                        <span className="font-mono text-sm">/api/sessions/submit-rating</span>
                      </div>
                      <div>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform ${expandedEndpoint === 'sessions-submit-rating' ? 'transform rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                    
                    {expandedEndpoint === 'sessions-submit-rating' && (
                      <div className="p-4 border-t border-black/5 dark:border-white/5">
                        <p className="mb-4 text-foreground/70">Submit a rating for a completed therapy session.</p>
                        
                        <h3 className="text-lg font-semibold mb-2">Request Body</h3>
                        <div className="bg-[var(--background-alt)] p-3 rounded-lg mb-4 font-mono text-sm overflow-x-auto">
                          {`{
  "sessionId": "session_id",
  "overallRating": 4,
  "understandingEmpathy": 5,
  "helpfulnessOfAdvice": 4,
  "sessionFlow": 4,
  "rememberingContext": 3,
  "comments": "Great session, very helpful!" // Optional
}`}
                        </div>
                        
                        <h3 className="text-lg font-semibold mb-2">Response</h3>
                        <div className="bg-[var(--background-alt)] p-3 rounded-lg mb-4 font-mono text-sm overflow-x-auto">
                          {`{
  "success": true
}`}
                        </div>
                        
                        <h3 className="text-lg font-semibold mb-2">Error Responses</h3>
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 mr-2">400</span>
                            <span>Session ID is required</span>
                          </div>
                          <div className="flex items-center">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 mr-2">400</span>
                            <span>All ratings must be numbers between 1 and 5</span>
                          </div>
                          <div className="flex items-center">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 mr-2">401</span>
                            <span>Not authenticated</span>
                          </div>
                          <div className="flex items-center">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 mr-2">500</span>
                            <span>Failed to submit rating</span>
                          </div>
                        </div>
                        
                        <h3 className="text-lg font-semibold mb-2">Example</h3>
                        <div className="bg-[var(--background-alt)] p-3 rounded-lg font-mono text-sm overflow-x-auto">
                          {`fetch('/api/sessions/submit-rating', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    sessionId: 'session_id',
    overallRating: 4,
    understandingEmpathy: 5,
    helpfulnessOfAdvice: 4,
    sessionFlow: 4,
    rememberingContext: 3,
    comments: 'Great session, very helpful!'
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Update Session Length Endpoint */}
                  <div className="card mb-6 overflow-hidden">
                    <div 
                      className="flex justify-between items-center p-4 cursor-pointer hover:bg-[var(--background-alt)] border-b border-black/5 dark:border-white/5"
                      onClick={() => toggleEndpoint('sessions-update-length')}
                    >
                      <div className="flex items-center">
                        <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 mr-3">POST</span>
                        <span className="font-mono text-sm">/api/sessions/update-length</span>
                      </div>
                      <div>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform ${expandedEndpoint === 'sessions-update-length' ? 'transform rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                    
                    {expandedEndpoint === 'sessions-update-length' && (
                      <div className="p-4 border-t border-black/5 dark:border-white/5">
                        <p className="mb-4 text-foreground/70">Update the length of a therapy session.</p>
                        
                        <h3 className="text-lg font-semibold mb-2">Request Body</h3>
                        <div className="bg-[var(--background-alt)] p-3 rounded-lg mb-4 font-mono text-sm overflow-x-auto">
                          {`{
  "sessionId": "session_id",
  "sessionLength": 30 // Must be 15, 30, or 45
}`}
                        </div>
                        
                        <h3 className="text-lg font-semibold mb-2">Response</h3>
                        <div className="bg-[var(--background-alt)] p-3 rounded-lg mb-4 font-mono text-sm overflow-x-auto">
                          {`{
  "success": true,
  "sessionLength": 30
}`}
                        </div>
                        
                        <h3 className="text-lg font-semibold mb-2">Error Responses</h3>
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 mr-2">400</span>
                            <span>Session ID is required</span>
                          </div>
                          <div className="flex items-center">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 mr-2">400</span>
                            <span>Valid sessionLength is required (15, 30, or 45)</span>
                          </div>
                          <div className="flex items-center">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 mr-2">401</span>
                            <span>Not authenticated</span>
                          </div>
                          <div className="flex items-center">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 mr-2">500</span>
                            <span>Failed to update session length</span>
                          </div>
                        </div>
                        
                        <h3 className="text-lg font-semibold mb-2">Example</h3>
                        <div className="bg-[var(--background-alt)] p-3 rounded-lg font-mono text-sm overflow-x-auto">
                          {`fetch('/api/sessions/update-length', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    sessionId: 'session_id',
    sessionLength: 30
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Update Session Specialist Endpoint */}
                  <div className="card mb-6 overflow-hidden">
                    <div 
                      className="flex justify-between items-center p-4 cursor-pointer hover:bg-[var(--background-alt)] border-b border-black/5 dark:border-white/5"
                      onClick={() => toggleEndpoint('sessions-update-specialist')}
                    >
                      <div className="flex items-center">
                        <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 mr-3">POST</span>
                        <span className="font-mono text-sm">/api/sessions/update-specialist</span>
                      </div>
                      <div>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform ${expandedEndpoint === 'sessions-update-specialist' ? 'transform rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                    
                    {expandedEndpoint === 'sessions-update-specialist' && (
                      <div className="p-4 border-t border-black/5 dark:border-white/5">
                        <p className="mb-4 text-foreground/70">Update the specialist for a therapy session.</p>
                        
                        <h3 className="text-lg font-semibold mb-2">Request Body</h3>
                        <div className="bg-[var(--background-alt)] p-3 rounded-lg mb-4 font-mono text-sm overflow-x-auto">
                          {`{
  "sessionId": "session_id",
  "specialist": "generalist" // Must be a valid specialist
}`}
                        </div>
                        
                        <h3 className="text-lg font-semibold mb-2">Response</h3>
                        <div className="bg-[var(--background-alt)] p-3 rounded-lg mb-4 font-mono text-sm overflow-x-auto">
                          {`{
  "success": true,
  "message": "Specialist updated to generalist"
}`}
                        </div>
                        
                        <h3 className="text-lg font-semibold mb-2">Error Responses</h3>
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 mr-2">400</span>
                            <span>Session ID and specialist are required</span>
                          </div>
                          <div className="flex items-center">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 mr-2">400</span>
                            <span>Invalid specialist value</span>
                          </div>
                          <div className="flex items-center">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 mr-2">401</span>
                            <span>Not authenticated</span>
                          </div>
                          <div className="flex items-center">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 mr-2">500</span>
                            <span>Failed to update specialist</span>
                          </div>
                        </div>
                        
                        <h3 className="text-lg font-semibold mb-2">Example</h3>
                        <div className="bg-[var(--background-alt)] p-3 rounded-lg font-mono text-sm overflow-x-auto">
                          {`fetch('/api/sessions/update-specialist', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    sessionId: 'session_id',
    specialist: 'generalist'
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Get Session Stats Endpoint */}
                  <div className="card mb-6 overflow-hidden">
                    <div 
                      className="flex justify-between items-center p-4 cursor-pointer hover:bg-[var(--background-alt)] border-b border-black/5 dark:border-white/5"
                      onClick={() => toggleEndpoint('sessions-stats')}
                    >
                      <div className="flex items-center">
                        <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 mr-3">GET</span>
                        <span className="font-mono text-sm">/api/sessions/stats</span>
                      </div>
                      <div>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform ${expandedEndpoint === 'sessions-stats' ? 'transform rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                    
                    {expandedEndpoint === 'sessions-stats' && (
                      <div className="p-4 border-t border-black/5 dark:border-white/5">
                        <p className="mb-4 text-foreground/70">Get statistics about the user's therapy sessions.</p>
                        
                        <h3 className="text-lg font-semibold mb-2">Response</h3>
                        <div className="bg-[var(--background-alt)] p-3 rounded-lg mb-4 font-mono text-sm overflow-x-auto">
                          {`{
  "stats": {
    "totalSessions": 10,
    "daysActive": 5,
    "ongoingSessions": 1
  }
}`}
                        </div>
                        
                        <h3 className="text-lg font-semibold mb-2">Error Responses</h3>
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 mr-2">401</span>
                            <span>Not authenticated</span>
                          </div>
                          <div className="flex items-center">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 mr-2">500</span>
                            <span>Failed to fetch session statistics</span>
                          </div>
                        </div>
                        
                        <h3 className="text-lg font-semibold mb-2">Example</h3>
                        <div className="bg-[var(--background-alt)] p-3 rounded-lg font-mono text-sm overflow-x-auto">
                          {`fetch('/api/sessions/stats', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {/* Bridges API */}
              {activeCategory === 'bridges' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Bridges API</h2>
                  
                  {/* Get Bridges Endpoint */}
                  <div className="card mb-6 overflow-hidden">
                    <div 
                      className="flex justify-between items-center p-4 cursor-pointer hover:bg-[var(--background-alt)] border-b border-black/5 dark:border-white/5"
                      onClick={() => toggleEndpoint('bridges-get')}
                    >
                      <div className="flex items-center">
                        <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 mr-3">GET</span>
                        <span className="font-mono text-sm">/api/bridges</span>
                      </div>
                      <div>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform ${expandedEndpoint === 'bridges-get' ? 'transform rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                    
                    {expandedEndpoint === 'bridges-get' && (
                      <div className="p-4 border-t border-black/5 dark:border-white/5">
                        <p className="mb-4 text-foreground/70">Get all bridges for the current user.</p>
                        
                        <h3 className="text-lg font-semibold mb-2">Response</h3>
                        <div className="bg-[var(--background-alt)] p-3 rounded-lg mb-4 font-mono text-sm overflow-x-auto">
                          {`{
  "bridges": [
    {
      "id": "bridge_id",
      "name": "Bridge Name",
      "description": "Bridge Description",
      "participants": ["user1@example.com", "user2@example.com"],
      "status": "active",
      "createdAt": "2023-06-01T12:00:00Z",
      "lastActive": "2023-06-02T14:30:00Z",
      "type": "relationship"
    }
  ]
}`}
                        </div>
                        
                        <h3 className="text-lg font-semibold mb-2">Error Responses</h3>
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 mr-2">401</span>
                            <span>Unauthorized</span>
                          </div>
                          <div className="flex items-center">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 mr-2">500</span>
                            <span>Failed to fetch bridges</span>
                          </div>
                        </div>
                        
                        <h3 className="text-lg font-semibold mb-2">Example</h3>
                        <div className="bg-[var(--background-alt)] p-3 rounded-lg font-mono text-sm overflow-x-auto">
                          {`fetch('/api/bridges', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Create Bridge Endpoint */}
                  <div className="card mb-6 overflow-hidden">
                    <div 
                      className="flex justify-between items-center p-4 cursor-pointer hover:bg-[var(--background-alt)] border-b border-black/5 dark:border-white/5"
                      onClick={() => toggleEndpoint('bridges-create')}
                    >
                      <div className="flex items-center">
                        <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 mr-3">POST</span>
                        <span className="font-mono text-sm">/api/bridges</span>
                      </div>
                      <div>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform ${expandedEndpoint === 'bridges-create' ? 'transform rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                    
                    {expandedEndpoint === 'bridges-create' && (
                      <div className="p-4 border-t border-black/5 dark:border-white/5">
                        <p className="mb-4 text-foreground/70">Create a new bridge.</p>
                        
                        <h3 className="text-lg font-semibold mb-2">Request Body</h3>
                        <div className="bg-[var(--background-alt)] p-3 rounded-lg mb-4 font-mono text-sm overflow-x-auto">
                          {`{
  "name": "Bridge Name",
  "description": "Bridge Description",
  "type": "relationship",
  "participantEmail": "participant@example.com" // Optional
}`}
                        </div>
                        
                        <h3 className="text-lg font-semibold mb-2">Response</h3>
                        <div className="bg-[var(--background-alt)] p-3 rounded-lg mb-4 font-mono text-sm overflow-x-auto">
                          {`{
  "bridge": {
    "id": "bridge_id",
    "name": "Bridge Name",
    "description": "Bridge Description",
    "participants": ["creator@example.com", "participant@example.com"],
    "status": "active",
    "createdAt": "2023-06-01T12:00:00Z",
    "lastActive": "2023-06-01T12:00:00Z",
    "type": "relationship"
  }
}`}
                        </div>
                        
                        <h3 className="text-lg font-semibold mb-2">Error Responses</h3>
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 mr-2">400</span>
                            <span>Bridge name is required</span>
                          </div>
                          <div className="flex items-center">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 mr-2">401</span>
                            <span>Unauthorized</span>
                          </div>
                          <div className="flex items-center">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 mr-2">500</span>
                            <span>Failed to create bridge</span>
                          </div>
                        </div>
                        
                        <h3 className="text-lg font-semibold mb-2">Example</h3>
                        <div className="bg-[var(--background-alt)] p-3 rounded-lg font-mono text-sm overflow-x-auto">
                          {`fetch('/api/bridges', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'Family Bridge',
    description: 'Bridge for family communication',
    type: 'relationship',
    participantEmail: 'family@example.com'
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Get Bridge by ID Endpoint */}
                  <div className="card mb-6 overflow-hidden">
                    <div 
                      className="flex justify-between items-center p-4 cursor-pointer hover:bg-[var(--background-alt)] border-b border-black/5 dark:border-white/5"
                      onClick={() => toggleEndpoint('bridges-get-by-id')}
                    >
                      <div className="flex items-center">
                        <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 mr-3">GET</span>
                        <span className="font-mono text-sm">/api/bridges/[id]</span>
                      </div>
                      <div>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform ${expandedEndpoint === 'bridges-get-by-id' ? 'transform rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                    
                    {expandedEndpoint === 'bridges-get-by-id' && (
                      <div className="p-4 border-t border-black/5 dark:border-white/5">
                        <p className="mb-4 text-foreground/70">Get a specific bridge by ID.</p>
                        
                        <h3 className="text-lg font-semibold mb-2">Query Parameters</h3>
                        <div className="bg-[var(--background-alt)] p-3 rounded-lg mb-4 font-mono text-sm overflow-x-auto">
                          {`bridgeId: string // Required`}
                        </div>
                        
                        <h3 className="text-lg font-semibold mb-2">Response</h3>
                        <div className="bg-[var(--background-alt)] p-3 rounded-lg mb-4 font-mono text-sm overflow-x-auto">
                          {`{
  "bridge": {
    "id": "bridge_id",
    "name": "Bridge Name",
    "description": "Bridge Description",
    "participants": ["user1@example.com", "user2@example.com"],
    "status": "active",
    "createdAt": "2023-06-01T12:00:00Z",
    "lastActive": "2023-06-02T14:30:00Z",
    "type": "relationship"
  }
}`}
                        </div>
                        
                        <h3 className="text-lg font-semibold mb-2">Error Responses</h3>
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 mr-2">400</span>
                            <span>Bridge ID is required</span>
                          </div>
                          <div className="flex items-center">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 mr-2">401</span>
                            <span>Unauthorized</span>
                          </div>
                          <div className="flex items-center">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 mr-2">403</span>
                            <span>You do not have access to this bridge</span>
                          </div>
                          <div className="flex items-center">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 mr-2">404</span>
                            <span>Bridge not found</span>
                          </div>
                          <div className="flex items-center">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 mr-2">500</span>
                            <span>Failed to fetch bridge</span>
                          </div>
                        </div>
                        
                        <h3 className="text-lg font-semibold mb-2">Example</h3>
                        <div className="bg-[var(--background-alt)] p-3 rounded-lg font-mono text-sm overflow-x-auto">
                          {`fetch('/api/bridges/[id]?bridgeId=bridge_id', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Bridge Messages Endpoint */}
                  <div className="card mb-6 overflow-hidden">
                    <div 
                      className="flex justify-between items-center p-4 cursor-pointer hover:bg-[var(--background-alt)] border-b border-black/5 dark:border-white/5"
                      onClick={() => toggleEndpoint('bridges-messages')}
                    >
                      <div className="flex items-center">
                        <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 mr-3">POST</span>
                        <span className="font-mono text-sm">/api/bridges/messages</span>
                      </div>
                      <div>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform ${expandedEndpoint === 'bridges-messages' ? 'transform rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                    
                    {expandedEndpoint === 'bridges-messages' && (
                      <div className="p-4 border-t border-black/5 dark:border-white/5">
                        <p className="mb-4 text-foreground/70">Send a message in a bridge.</p>
                        
                        <h3 className="text-lg font-semibold mb-2">Request Body</h3>
                        <div className="bg-[var(--background-alt)] p-3 rounded-lg mb-4 font-mono text-sm overflow-x-auto">
                          {`{
  "content": "Message content",
  "firstName": "John",
  "email": "user@example.com", // Optional
  "attachments": [], // Optional
  "images": [], // Optional
  "mode": null, // Optional
  "specialist": "mediator", // Optional, defaults to "mediator"
  "screenshot": null, // Optional
  "pseudonym": "UserPseudonym", // Required
  "bridgeId": "bridge_id" // Required
}`}
                        </div>
                        
                        <h3 className="text-lg font-semibold mb-2">Response</h3>
                        <div className="bg-[var(--background-alt)] p-3 rounded-lg mb-4 font-mono text-sm overflow-x-auto">
                          {`{
  "role": "assistant",
  "content": "Response content",
  "id": "assistant-1234567890",
  "loading": false,
  "timestamp": "2023-06-01T12:00:00Z"
}`}
                        </div>
                        
                        <h3 className="text-lg font-semibold mb-2">Error Responses</h3>
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 mr-2">400</span>
                            <span>Pseudonym is required</span>
                          </div>
                          <div className="flex items-center">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 mr-2">400</span>
                            <span>Bridge ID is required</span>
                          </div>
                          <div className="flex items-center">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 mr-2">400</span>
                            <span>Invalid specialist value</span>
                          </div>
                          <div className="flex items-center">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 mr-2">500</span>
                            <span>Failed to communicate with KinOS Bridge API</span>
                          </div>
                        </div>
                        
                        <h3 className="text-lg font-semibold mb-2">Example</h3>
                        <div className="bg-[var(--background-alt)] p-3 rounded-lg font-mono text-sm overflow-x-auto">
                          {`fetch('/api/bridges/messages', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    content: "Hello, this is a message for the bridge.",
    firstName: "John",
    pseudonym: "JohnDoe123",
    bridgeId: "bridge_id"
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {/* KinOS Integration API */}
              {activeCategory === 'kinos' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">KinOS Integration API</h2>
                  
                  {/* KinOS Messages Endpoint */}
                  <div className="card mb-6 overflow-hidden">
                    <div 
                      className="flex justify-between items-center p-4 cursor-pointer hover:bg-[var(--background-alt)] border-b border-black/5 dark:border-white/5"
                      onClick={() => toggleEndpoint('kinos-messages')}
                    >
                      <div className="flex items-center">
                        <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 mr-3">POST</span>
                        <span className="font-mono text-sm">/api/kinos</span>
                      </div>
                      <div>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform ${expandedEndpoint === 'kinos-messages' ? 'transform rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                    
                    {expandedEndpoint === 'kinos-messages' && (
                      <div className="p-4 border-t border-black/5 dark:border-white/5">
                        <p className="mb-4 text-foreground/70">Send a message to KinOS and get a response.</p>
                        
                        <h3 className="text-lg font-semibold mb-2">Request Body</h3>
                        <div className="bg-[var(--background-alt)] p-3 rounded-lg mb-4 font-mono text-sm overflow-x-auto">
                          {`{
  "content": "Message content",
  "firstName": "John",
  "email": "user@example.com", // Optional
  "attachments": [], // Optional
  "images": [], // Optional
  "mode": null, // Optional
  "specialist": "generalist", // Optional
  "screenshot": null, // Optional
  "pseudonym": "UserPseudonym", // Required
  "addSystem": null // Optional
}`}
                        </div>
                        
                        <h3 className="text-lg font-semibold mb-2">Response</h3>
                        <p className="mb-2 text-foreground/70">Returns a streaming response with Server-Sent Events (SSE).</p>
                        <div className="bg-[var(--background-alt)] p-3 rounded-lg mb-4 font-mono text-sm overflow-x-auto">
                          {`event: message_start
data: {"message":{"id":"msg_123"}}

event: content_block_delta
data: {"delta":{"type":"text_delta","text":"Hello"}}

event: content_block_delta
data: {"delta":{"type":"text_delta","text":", how can I help you today?"}}

event: message_stop
data: {}`}
                        </div>
                        
                        <h3 className="text-lg font-semibold mb-2">Error Responses</h3>
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 mr-2">400</span>
                            <span>Pseudonym is required</span>
                          </div>
                          <div className="flex items-center">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 mr-2">400</span>
                            <span>Invalid specialist value</span>
                          </div>
                          <div className="flex items-center">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 mr-2">500</span>
                            <span>Failed to communicate with KinOS API</span>
                          </div>
                        </div>
                        
                        <h3 className="text-lg font-semibold mb-2">Example</h3>
                        <div className="bg-[var(--background-alt)] p-3 rounded-lg font-mono text-sm overflow-x-auto">
                          {`// For streaming responses:
const eventSource = new EventSource('/api/kinos', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    content: "Hello, how are you?",
    firstName: "John",
    pseudonym: "JohnDoe123",
    specialist: "generalist"
  })
});

eventSource.addEventListener('message_start', (event) => {
  const data = JSON.parse(event.data);
  console.log('Message started:', data);
});

eventSource.addEventListener('content_block_delta', (event) => {
  const data = JSON.parse(event.data);
  console.log('Content chunk:', data.delta.text);
});

eventSource.addEventListener('message_stop', () => {
  console.log('Message complete');
  eventSource.close();
});

eventSource.addEventListener('error', (error) => {
  console.error('Stream error:', error);
  eventSource.close();
});`}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* KinOS Image Generation Endpoint */}
                  <div className="card mb-6 overflow-hidden">
                    <div 
                      className="flex justify-between items-center p-4 cursor-pointer hover:bg-[var(--background-alt)] border-b border-black/5 dark:border-white/5"
                      onClick={() => toggleEndpoint('kinos-image')}
                    >
                      <div className="flex items-center">
                        <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 mr-3">POST</span>
                        <span className="font-mono text-sm">/api/kinos/image</span>
                      </div>
                      <div>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform ${expandedEndpoint === 'kinos-image' ? 'transform rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                    
                    {expandedEndpoint === 'kinos-image' && (
                      <div className="p-4 border-t border-black/5 dark:border-white/5">
                        <p className="mb-4 text-foreground/70">Generate an image using KinOS.</p>
                        
                        <h3 className="text-lg font-semibold mb-2">Request Body</h3>
                        <div className="bg-[var(--background-alt)] p-3 rounded-lg mb-4 font-mono text-sm overflow-x-auto">
                          {`{
  "message": "Image prompt or description",
  "firstName": "John",
  "specialist": "generalist", // Optional
  "pseudonym": "UserPseudonym" // Required
}`}
                        </div>
                        
                        <h3 className="text-lg font-semibold mb-2">Response</h3>
                        <div className="bg-[var(--background-alt)] p-3 rounded-lg mb-4 font-mono text-sm overflow-x-auto">
                          {`{
  "result": {
    "data": [
      {
        "url": "https://example.com/generated-image.jpg"
      }
    ]
  }
}`}
                        </div>
                        
                        <h3 className="text-lg font-semibold mb-2">Error Responses</h3>
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 mr-2">400</span>
                            <span>Pseudonym is required</span>
                          </div>
                          <div className="flex items-center">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 mr-2">400</span>
                            <span>Invalid specialist value</span>
                          </div>
                          <div className="flex items-center">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 mr-2">500</span>
                            <span>Failed to generate image</span>
                          </div>
                        </div>
                        
                        <h3 className="text-lg font-semibold mb-2">Example</h3>
                        <div className="bg-[var(--background-alt)] p-3 rounded-lg font-mono text-sm overflow-x-auto">
                          {`fetch('/api/kinos/image', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    message: "A calming landscape with mountains and a lake",
    firstName: "John",
    pseudonym: "JohnDoe123"
  })
})
.then(response => response.json())
.then(data => {
  if (data.result?.data?.[0]?.url) {
    console.log('Generated image URL:', data.result.data[0].url);
  }
})
.catch(error => console.error('Error:', error));`}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* KinOS Analysis Endpoint */}
                  <div className="card mb-6 overflow-hidden">
                    <div 
                      className="flex justify-between items-center p-4 cursor-pointer hover:bg-[var(--background-alt)] border-b border-black/5 dark:border-white/5"
                      onClick={() => toggleEndpoint('kinos-analysis')}
                    >
                      <div className="flex items-center">
                        <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 mr-3">POST</span>
                        <span className="font-mono text-sm">/api/kinos/analysis</span>
                      </div>
                      <div>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform ${expandedEndpoint === 'kinos-analysis' ? 'transform rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                    
                    {expandedEndpoint === 'kinos-analysis' && (
                      <div className="p-4 border-t border-black/5 dark:border-white/5">
                        <p className="mb-4 text-foreground/70">Request an analysis from KinOS.</p>
                        
                        <h3 className="text-lg font-semibold mb-2">Request Body</h3>
                        <div className="bg-[var(--background-alt)] p-3 rounded-lg mb-4 font-mono text-sm overflow-x-auto">
                          {`{
  "content": "Content to analyze",
  "firstName": "John",
  "email": "user@example.com", // Optional
  "attachments": [], // Optional
  "images": [], // Optional
  "mode": null, // Optional
  "specialist": "generalist", // Optional
  "screenshot": null, // Optional
  "pseudonym": "UserPseudonym", // Required
  "min_files": 1, // Optional
  "max_files": 2, // Optional
  "addSystem": null // Optional
}`}
                        </div>
                        
                        <h3 className="text-lg font-semibold mb-2">Response</h3>
                        <div className="bg-[var(--background-alt)] p-3 rounded-lg mb-4 font-mono text-sm overflow-x-auto">
                          {`{
  "response": "Analysis response text",
  "isAnalysis": true
}`}
                        </div>
                        
                        <h3 className="text-lg font-semibold mb-2">Error Responses</h3>
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 mr-2">400</span>
                            <span>Pseudonym is required</span>
                          </div>
                          <div className="flex items-center">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 mr-2">400</span>
                            <span>Invalid specialist value</span>
                          </div>
                          <div className="flex items-center">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 mr-2">500</span>
                            <span>Failed to communicate with KinOS API for analysis</span>
                          </div>
                        </div>
                        
                        <h3 className="text-lg font-semibold mb-2">Example</h3>
                        <div className="bg-[var(--background-alt)] p-3 rounded-lg font-mono text-sm overflow-x-auto">
                          {`fetch('/api/kinos/analysis', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    content: "Please analyze this text for emotional themes.",
    firstName: "John",
    pseudonym: "JohnDoe123",
    specialist: "generalist"
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {/* Media API */}
              {activeCategory === 'media' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Media API</h2>
                  
                  {/* Text-to-Speech Endpoint */}
                  <div className="card mb-6 overflow-hidden">
                    <div 
                      className="flex justify-between items-center p-4 cursor-pointer hover:bg-[var(--background-alt)] border-b border-black/5 dark:border-white/5"
                      onClick={() => toggleEndpoint('tts')}
                    >
                      <div className="flex items-center">
                        <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 mr-3">POST</span>
                        <span className="font-mono text-sm">/api/tts</span>
                      </div>
                      <div>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform ${expandedEndpoint === 'tts' ? 'transform rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                    
                    {expandedEndpoint === 'tts' && (
                      <div className="p-4 border-t border-black/5 dark:border-white/5">
                        <p className="mb-4 text-foreground/70">Convert text to speech.</p>
                        
                        <h3 className="text-lg font-semibold mb-2">Request Headers</h3>
                        <div className="bg-[var(--background-alt)] p-3 rounded-lg mb-4 font-mono text-sm overflow-x-auto">
                          {`Content-Type: application/json
Authorization: Bearer {token} // Automatically handled by cookies`}
                        </div>
                        
                        <h3 className="text-lg font-semibold mb-2">Request Body</h3>
                        <div className="relative bg-[var(--background-alt)] p-3 rounded-lg mb-4 font-mono text-sm overflow-x-auto">
                          <button 
                            onClick={() => copyToClipboard(`{
  "text": "Text to convert to speech",
  "voiceId": "L0Dsvb3SLTyegXwtm47J", // Optional, defaults to "L0Dsvb3SLTyegXwtm47J"
  "model": "eleven_flash_v2_5" // Optional, defaults to "eleven_flash_v2_5"
}`, 'tts-body')}
                            className="absolute top-2 right-2 p-1 rounded-md bg-[var(--background)] hover:bg-[var(--primary)]/10 transition-colors"
                            aria-label="Copy code"
                          >
                            {copiedCode === 'tts-body' ? (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-foreground/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                            )}
                          </button>
                          {`{
  "text": "Text to convert to speech",
  "voiceId": "L0Dsvb3SLTyegXwtm47J", // Optional, defaults to "L0Dsvb3SLTyegXwtm47J"
  "model": "eleven_flash_v2_5" // Optional, defaults to "eleven_flash_v2_5"
}`}
                        </div>
                        
                        <h3 className="text-lg font-semibold mb-2">Response</h3>
                        <p className="mb-2 text-foreground/70">Returns audio data with the appropriate content type (usually audio/mpeg).</p>
                        
                        <h3 className="text-lg font-semibold mb-2">Error Responses</h3>
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 mr-2">400</span>
                            <span>Missing required text parameter</span>
                          </div>
                          <div className="flex items-center">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 mr-2">500</span>
                            <span>Failed to convert text to speech</span>
                          </div>
                        </div>
                        
                        <h3 className="text-lg font-semibold mb-2">Example</h3>
                        <div className="relative bg-[var(--background-alt)] p-3 rounded-lg font-mono text-sm overflow-x-auto">
                          <button 
                            onClick={() => copyToClipboard(`// Using fetch to get audio blob
fetch('/api/tts', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    text: "Hello, this is a test of the text-to-speech API.",
    voiceId: "L0Dsvb3SLTyegXwtm47J"
  })
})
.then(response => {
  if (!response.ok) {
    throw new Error('TTS request failed');
  }
  return response.blob();
})
.then(blob => {
  // Create a URL for the blob
  const audioUrl = URL.createObjectURL(blob);
  
  // Create an audio element and play the speech
  const audio = new Audio(audioUrl);
  audio.play();
})
.catch(error => console.error('Error:', error));`, 'tts-example')}
                            className="absolute top-2 right-2 p-1 rounded-md bg-[var(--background)] hover:bg-[var(--primary)]/10 transition-colors"
                            aria-label="Copy code"
                          >
                            {copiedCode === 'tts-example' ? (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-foreground/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                            )}
                          </button>
                          {`// Using fetch to get audio blob
fetch('/api/tts', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    text: "Hello, this is a test of the text-to-speech API.",
    voiceId: "L0Dsvb3SLTyegXwtm47J"
  })
})
.then(response => {
  if (!response.ok) {
    throw new Error('TTS request failed');
  }
  return response.blob();
})
.then(blob => {
  // Create a URL for the blob
  const audioUrl = URL.createObjectURL(blob);
  
  // Create an audio element and play the speech
  const audio = new Audio(audioUrl);
  audio.play();
})
.catch(error => console.error('Error:', error));`}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Speech-to-Text Endpoint */}
                  <div className="card mb-6 overflow-hidden">
                    <div 
                      className="flex justify-between items-center p-4 cursor-pointer hover:bg-[var(--background-alt)] border-b border-black/5 dark:border-white/5"
                      onClick={() => toggleEndpoint('stt')}
                    >
                      <div className="flex items-center">
                        <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 mr-3">POST</span>
                        <span className="font-mono text-sm">/api/stt</span>
                      </div>
                      <div>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform ${expandedEndpoint === 'stt' ? 'transform rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                    
                    {expandedEndpoint === 'stt' && (
                      <div className="p-4 border-t border-black/5 dark:border-white/5">
                        <p className="mb-4 text-foreground/70">Convert speech to text.</p>
                        
                        <h3 className="text-lg font-semibold mb-2">Request Headers</h3>
                        <div className="bg-[var(--background-alt)] p-3 rounded-lg mb-4 font-mono text-sm overflow-x-auto">
                          {`Content-Type: multipart/form-data
Authorization: Bearer {token} // Automatically handled by cookies`}
                        </div>
                        
                        <h3 className="text-lg font-semibold mb-2">Request Body</h3>
                        <p className="mb-2 text-foreground/70">Send a multipart/form-data request with the following fields:</p>
                        <div className="relative bg-[var(--background-alt)] p-3 rounded-lg mb-4 font-mono text-sm overflow-x-auto">
                          <button 
                            onClick={() => copyToClipboard(`file: Audio file (required)
model: "whisper-1" (optional)
language: "en" (optional)
prompt: "" (optional)
response_format: "json" (optional)`, 'stt-body')}
                            className="absolute top-2 right-2 p-1 rounded-md bg-[var(--background)] hover:bg-[var(--primary)]/10 transition-colors"
                            aria-label="Copy code"
                          >
                            {copiedCode === 'stt-body' ? (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-foreground/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                            )}
                          </button>
                          {`file: Audio file (required)
model: "whisper-1" (optional)
language: "en" (optional)
prompt: "" (optional)
response_format: "json" (optional)`}
                        </div>
                        
                        <h3 className="text-lg font-semibold mb-2">Response</h3>
                        <div className="relative bg-[var(--background-alt)] p-3 rounded-lg mb-4 font-mono text-sm overflow-x-auto">
                          <button 
                            onClick={() => copyToClipboard(`{
  "text": "Transcribed text from the audio file"
}`, 'stt-response')}
                            className="absolute top-2 right-2 p-1 rounded-md bg-[var(--background)] hover:bg-[var(--primary)]/10 transition-colors"
                            aria-label="Copy code"
                          >
                            {copiedCode === 'stt-response' ? (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-foreground/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                            )}
                          </button>
                          {`{
  "text": "Transcribed text from the audio file"
}`}
                        </div>
                        
                        <h3 className="text-lg font-semibold mb-2">Error Responses</h3>
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 mr-2">400</span>
                            <span>Content type must be multipart/form-data</span>
                          </div>
                          <div className="flex items-center">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 mr-2">400</span>
                            <span>No audio file provided or invalid file</span>
                          </div>
                          <div className="flex items-center">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 mr-2">500</span>
                            <span>Failed to transcribe audio</span>
                          </div>
                        </div>
                        
                        <h3 className="text-lg font-semibold mb-2">Example</h3>
                        <div className="relative bg-[var(--background-alt)] p-3 rounded-lg font-mono text-sm overflow-x-auto">
                          <button 
                            onClick={() => copyToClipboard(`// Using FormData to send an audio file
const formData = new FormData();
formData.append('file', audioBlob, 'recording.webm');
formData.append('model', 'whisper-1');
formData.append('language', 'en');

fetch('/api/stt', {
  method: 'POST',
  body: formData
})
.then(response => response.json())
.then(data => {
  console.log('Transcription:', data.text);
})
.catch(error => console.error('Error:', error));`, 'stt-example')}
                            className="absolute top-2 right-2 p-1 rounded-md bg-[var(--background)] hover:bg-[var(--primary)]/10 transition-colors"
                            aria-label="Copy code"
                          >
                            {copiedCode === 'stt-example' ? (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-foreground/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                            )}
                          </button>
                          {`// Using FormData to send an audio file
const formData = new FormData();
formData.append('file', audioBlob, 'recording.webm');
formData.append('model', 'whisper-1');
formData.append('language', 'en');

fetch('/api/stt', {
  method: 'POST',
  body: formData
})
.then(response => response.json())
.then(data => {
  console.log('Transcription:', data.text);
})
.catch(error => console.error('Error:', error));`}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Image Upload Endpoint */}
                  <div className="card mb-6 overflow-hidden">
                    <div 
                      className="flex justify-between items-center p-4 cursor-pointer hover:bg-[var(--background-alt)] border-b border-black/5 dark:border-white/5"
                      onClick={() => toggleEndpoint('image-upload')}
                    >
                      <div className="flex items-center">
                        <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 mr-3">POST</span>
                        <span className="font-mono text-sm">/api/image-upload</span>
                      </div>
                      <div>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform ${expandedEndpoint === 'image-upload' ? 'transform rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                    
                    {expandedEndpoint === 'image-upload' && (
                      <div className="p-4 border-t border-black/5 dark:border-white/5">
                        <p className="mb-4 text-foreground/70">Upload an image.</p>
                        
                        <h3 className="text-lg font-semibold mb-2">Request Headers</h3>
                        <div className="bg-[var(--background-alt)] p-3 rounded-lg mb-4 font-mono text-sm overflow-x-auto">
                          {`Content-Type: application/json
Authorization: Bearer {token} // Automatically handled by cookies`}
                        </div>
                        
                        <h3 className="text-lg font-semibold mb-2">Request Body</h3>
                        <div className="relative bg-[var(--background-alt)] p-3 rounded-lg mb-4 font-mono text-sm overflow-x-auto">
                          <button 
                            onClick={() => copyToClipboard(`{
  "image": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBD..." // Base64 encoded image data
}`, 'image-upload-body')}
                            className="absolute top-2 right-2 p-1 rounded-md bg-[var(--background)] hover:bg-[var(--primary)]/10 transition-colors"
                            aria-label="Copy code"
                          >
                            {copiedCode === 'image-upload-body' ? (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-foreground/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                            )}
                          </button>
                          {`{
  "image": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBD..." // Base64 encoded image data
}`}
                        </div>
                        
                        <h3 className="text-lg font-semibold mb-2">Response</h3>
                        <div className="relative bg-[var(--background-alt)] p-3 rounded-lg mb-4 font-mono text-sm overflow-x-auto">
                          <button 
                            onClick={() => copyToClipboard(`{
  "success": true,
  "imageUrl": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBD..."
}`, 'image-upload-response')}
                            className="absolute top-2 right-2 p-1 rounded-md bg-[var(--background)] hover:bg-[var(--primary)]/10 transition-colors"
                            aria-label="Copy code"
                          >
                            {copiedCode === 'image-upload-response' ? (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-foreground/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                            )}
                          </button>
                          {`{
  "success": true,
  "imageUrl": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBD..."
}`}
                        </div>
                        
                        <h3 className="text-lg font-semibold mb-2">Error Responses</h3>
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 mr-2">400</span>
                            <span>Invalid image data</span>
                          </div>
                          <div className="flex items-center">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 mr-2">401</span>
                            <span>Not authenticated</span>
                          </div>
                          <div className="flex items-center">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 mr-2">500</span>
                            <span>Failed to process image</span>
                          </div>
                        </div>
                        
                        <h3 className="text-lg font-semibold mb-2">Example</h3>
                        <div className="relative bg-[var(--background-alt)] p-3 rounded-lg font-mono text-sm overflow-x-auto">
                          <button 
                            onClick={() => copyToClipboard(`// Assuming you have a base64 encoded image
const imageData = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBD...';

fetch('/api/image-upload', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    image: imageData
  })
})
.then(response => response.json())
.then(data => {
  console.log('Uploaded image URL:', data.imageUrl);
})
.catch(error => console.error('Error:', error));`, 'image-upload-example')}
                            className="absolute top-2 right-2 p-1 rounded-md bg-[var(--background)] hover:bg-[var(--primary)]/10 transition-colors"
                            aria-label="Copy code"
                          >
                            {copiedCode === 'image-upload-example' ? (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-foreground/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                            )}
                          </button>
                          {`// Assuming you have a base64 encoded image
const imageData = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBD...';

fetch('/api/image-upload', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    image: imageData
  })
})
.then(response => response.json())
.then(data => {
  console.log('Uploaded image URL:', data.imageUrl);
})
.catch(error => console.error('Error:', error));`}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {/* Webhooks API */}
              {activeCategory === 'webhooks' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Webhooks</h2>
                  
                  <p className="mb-4 text-foreground/70">
                    TherapyKin uses webhooks to notify your application when events happen in your account.
                    You can configure webhook endpoints in your account settings.
                  </p>
                  
                  <div className="card mb-6 overflow-hidden">
                    <div 
                      className="flex justify-between items-center p-4 cursor-pointer hover:bg-[var(--background-alt)] border-b border-black/5 dark:border-white/5"
                      onClick={() => toggleEndpoint('webhook-payment')}
                    >
                      <div className="flex items-center">
                        <span className="px-2 py-1 rounded text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 mr-3">WEBHOOK</span>
                        <span className="font-mono text-sm">payment.succeeded</span>
                      </div>
                      <div>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform ${expandedEndpoint === 'webhook-payment' ? 'transform rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                    
                    {expandedEndpoint === 'webhook-payment' && (
                      <div className="p-4 border-t border-black/5 dark:border-white/5">
                        <p className="mb-4 text-foreground/70">Sent when a payment is successfully processed.</p>
                        
                        <h3 className="text-lg font-semibold mb-2">Payload</h3>
                        <div className="relative bg-[var(--background-alt)] p-3 rounded-lg mb-4 font-mono text-sm overflow-x-auto">
                          <button 
                            onClick={() => copyToClipboard(`{
  "event": "payment.succeeded",
  "data": {
    "payment_id": "pay_123456789",
    "customer_id": "cus_123456789",
    "amount": 1999,
    "currency": "usd",
    "status": "succeeded",
    "created_at": "2023-06-01T12:00:00Z"
  }
}`, 'webhook-payment-payload')}
                            className="absolute top-2 right-2 p-1 rounded-md bg-[var(--background)] hover:bg-[var(--primary)]/10 transition-colors"
                            aria-label="Copy code"
                          >
                            {copiedCode === 'webhook-payment-payload' ? (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-foreground/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                            )}
                          </button>
                          {`{
  "event": "payment.succeeded",
  "data": {
    "payment_id": "pay_123456789",
    "customer_id": "cus_123456789",
    "amount": 1999,
    "currency": "usd",
    "status": "succeeded",
    "created_at": "2023-06-01T12:00:00Z"
  }
}`}
                        </div>
                        
                        <h3 className="text-lg font-semibold mb-2">Example Response</h3>
                        <p className="mb-2 text-foreground/70">Your server should respond with a 200 status code to acknowledge receipt of the webhook.</p>
                      </div>
                    )}
                  </div>
                  
                  {/* Add more webhook examples here */}
                </div>
              )}
              
              {/* Users API */}
              {activeCategory === 'users' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Users API</h2>
                  
                  {/* User Preferences Endpoint */}
                  <div className="card mb-6 overflow-hidden">
                    <div 
                      className="flex justify-between items-center p-4 cursor-pointer hover:bg-[var(--background-alt)] border-b border-black/5 dark:border-white/5"
                      onClick={() => toggleEndpoint('users-preferences')}
                    >
                      <div className="flex items-center">
                        <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 mr-3">GET</span>
                        <span className="font-mono text-sm">/api/users/preferences</span>
                      </div>
                      <div>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform ${expandedEndpoint === 'users-preferences' ? 'transform rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                    
                    {expandedEndpoint === 'users-preferences' && (
                      <div className="p-4 border-t border-black/5 dark:border-white/5">
                        <p className="mb-4 text-foreground/70">Get the current user's preferences.</p>
                        
                        <h3 className="text-lg font-semibold mb-2">Response</h3>
                        <div className="bg-[var(--background-alt)] p-3 rounded-lg mb-4 font-mono text-sm overflow-x-auto">
                          {`{
  "preferences": {
    "preferredSessionLength": 30,
    "preferredVoice": "L0Dsvb3SLTyegXwtm47J",
    "preferredSpecialist": "generalist",
    "cameraEnabled": false
  }
}`}
                        </div>
                        
                        <h3 className="text-lg font-semibold mb-2">Error Responses</h3>
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 mr-2">401</span>
                            <span>Not authenticated</span>
                          </div>
                          <div className="flex items-center">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 mr-2">404</span>
                            <span>User not found</span>
                          </div>
                          <div className="flex items-center">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 mr-2">500</span>
                            <span>Failed to fetch user preferences</span>
                          </div>
                        </div>
                        
                        <h3 className="text-lg font-semibold mb-2">Example</h3>
                        <div className="bg-[var(--background-alt)] p-3 rounded-lg font-mono text-sm overflow-x-auto">
                          {`fetch('/api/users/preferences', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Update User Preferences Endpoint */}
                  <div className="card mb-6 overflow-hidden">
                    <div 
                      className="flex justify-between items-center p-4 cursor-pointer hover:bg-[var(--background-alt)] border-b border-black/5 dark:border-white/5"
                      onClick={() => toggleEndpoint('users-preferences-update')}
                    >
                      <div className="flex items-center">
                        <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 mr-3">POST</span>
                        <span className="font-mono text-sm">/api/users/preferences</span>
                      </div>
                      <div>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform ${expandedEndpoint === 'users-preferences-update' ? 'transform rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                    
                    {expandedEndpoint === 'users-preferences-update' && (
                      <div className="p-4 border-t border-black/5 dark:border-white/5">
                        <p className="mb-4 text-foreground/70">Update the current user's preferences.</p>
                        
                        <h3 className="text-lg font-semibold mb-2">Request Body</h3>
                        <div className="bg-[var(--background-alt)] p-3 rounded-lg mb-4 font-mono text-sm overflow-x-auto">
                          {`{
  "preferredSessionLength": 30, // Optional
  "preferredVoice": "L0Dsvb3SLTyegXwtm47J", // Optional
  "preferredSpecialist": "generalist", // Optional
  "cameraEnabled": false // Optional
}`}
                        </div>
                        
                        <h3 className="text-lg font-semibold mb-2">Response</h3>
                        <div className="bg-[var(--background-alt)] p-3 rounded-lg mb-4 font-mono text-sm overflow-x-auto">
                          {`{
  "success": true,
  "preferences": {
    "preferredSessionLength": 30,
    "preferredVoice": "L0Dsvb3SLTyegXwtm47J",
    "preferredSpecialist": "generalist",
    "cameraEnabled": false
  }
}`}
                        </div>
                        
                        <h3 className="text-lg font-semibold mb-2">Error Responses</h3>
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 mr-2">400</span>
                            <span>Valid preferredSessionLength is required (15, 30, or 45)</span>
                          </div>
                          <div className="flex items-center">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 mr-2">400</span>
                            <span>Valid preferredVoice is required (string)</span>
                          </div>
                          <div className="flex items-center">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 mr-2">400</span>
                            <span>Valid preferredSpecialist is required</span>
                          </div>
                          <div className="flex items-center">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 mr-2">400</span>
                            <span>Valid cameraEnabled is required (boolean)</span>
                          </div>
                          <div className="flex items-center">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 mr-2">401</span>
                            <span>Not authenticated</span>
                          </div>
                          <div className="flex items-center">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 mr-2">404</span>
                            <span>User not found</span>
                          </div>
                          <div className="flex items-center">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 mr-2">500</span>
                            <span>Failed to update user preferences</span>
                          </div>
                        </div>
                        
                        <h3 className="text-lg font-semibold mb-2">Example</h3>
                        <div className="bg-[var(--background-alt)] p-3 rounded-lg font-mono text-sm overflow-x-auto">
                          {`fetch('/api/users/preferences', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    preferredSessionLength: 30,
    preferredVoice: 'L0Dsvb3SLTyegXwtm47J',
    preferredSpecialist: 'generalist',
    cameraEnabled: false
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Update User Pseudonym Endpoint */}
                  <div className="card mb-6 overflow-hidden">
                    <div 
                      className="flex justify-between items-center p-4 cursor-pointer hover:bg-[var(--background-alt)] border-b border-black/5 dark:border-white/5"
                      onClick={() => toggleEndpoint('users-update-pseudonym')}
                    >
                      <div className="flex items-center">
                        <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 mr-3">POST</span>
                        <span className="font-mono text-sm">/api/users/update-pseudonym</span>
                      </div>
                      <div>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform ${expandedEndpoint === 'users-update-pseudonym' ? 'transform rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                    
                    {expandedEndpoint === 'users-update-pseudonym' && (
                      <div className="p-4 border-t border-black/5 dark:border-white/5">
                        <p className="mb-4 text-foreground/70">Update the current user's pseudonym.</p>
                        
                        <h3 className="text-lg font-semibold mb-2">Request Body</h3>
                        <div className="bg-[var(--background-alt)] p-3 rounded-lg mb-4 font-mono text-sm overflow-x-auto">
                          {`{
  "pseudonym": "UserPseudonym"
}`}
                        </div>
                        
                        <h3 className="text-lg font-semibold mb-2">Response</h3>
                        <div className="bg-[var(--background-alt)] p-3 rounded-lg mb-4 font-mono text-sm overflow-x-auto">
                          {`{
  "success": true,
  "pseudonym": "UserPseudonym"
}`}
                        </div>
                        
                        <h3 className="text-lg font-semibold mb-2">Error Responses</h3>
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 mr-2">400</span>
                            <span>Pseudonym is required</span>
                          </div>
                          <div className="flex items-center">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 mr-2">401</span>
                            <span>Not authenticated</span>
                          </div>
                          <div className="flex items-center">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 mr-2">404</span>
                            <span>User not found</span>
                          </div>
                          <div className="flex items-center">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 mr-2">500</span>
                            <span>Failed to update user pseudonym</span>
                          </div>
                        </div>
                        
                        <h3 className="text-lg font-semibold mb-2">Example</h3>
                        <div className="bg-[var(--background-alt)] p-3 rounded-lg font-mono text-sm overflow-x-auto">
                          {`fetch('/api/users/update-pseudonym', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    pseudonym: 'JohnDoe123'
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Get User Subscription Endpoint */}
                  <div className="card mb-6 overflow-hidden">
                    <div 
                      className="flex justify-between items-center p-4 cursor-pointer hover:bg-[var(--background-alt)] border-b border-black/5 dark:border-white/5"
                      onClick={() => toggleEndpoint('users-subscription')}
                    >
                      <div className="flex items-center">
                        <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 mr-3">GET</span>
                        <span className="font-mono text-sm">/api/users/subscription</span>
                      </div>
                      <div>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform ${expandedEndpoint === 'users-subscription' ? 'transform rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                    
                    {expandedEndpoint === 'users-subscription' && (
                      <div className="p-4 border-t border-black/5 dark:border-white/5">
                        <p className="mb-4 text-foreground/70">Get the current user's subscription details.</p>
                        
                        <h3 className="text-lg font-semibold mb-2">Response</h3>
                        <div className="bg-[var(--background-alt)] p-3 rounded-lg mb-4 font-mono text-sm overflow-x-auto">
                          {`{
  "subscription": {
    "plan": "standard",
    "status": "active",
    "isAnnual": false,
    "currentPeriodEnd": "2023-12-31T23:59:59Z",
    "sessionsRemaining": 30,
    "totalSessions": 5,
    "daysActive": 10
  }
}`}
                        </div>
                        
                        <h3 className="text-lg font-semibold mb-2">Error Responses</h3>
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 mr-2">401</span>
                            <span>Not authenticated</span>
                          </div>
                          <div className="flex items-center">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 mr-2">500</span>
                            <span>Failed to fetch user subscription</span>
                          </div>
                        </div>
                        
                        <h3 className="text-lg font-semibold mb-2">Example</h3>
                        <div className="bg-[var(--background-alt)] p-3 rounded-lg font-mono text-sm overflow-x-auto">
                          {`fetch('/api/users/subscription', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {/* Payments API */}
              {activeCategory === 'payments' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Payments API</h2>
                  
                  {/* Create Checkout Session Endpoint */}
                  <div className="card mb-6 overflow-hidden">
                    <div 
                      className="flex justify-between items-center p-4 cursor-pointer hover:bg-[var(--background-alt)] border-b border-black/5 dark:border-white/5"
                      onClick={() => toggleEndpoint('payments-create-checkout')}
                    >
                      <div className="flex items-center">
                        <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 mr-3">POST</span>
                        <span className="font-mono text-sm">/api/payments/create-checkout</span>
                      </div>
                      <div>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform ${expandedEndpoint === 'payments-create-checkout' ? 'transform rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                    
                    {expandedEndpoint === 'payments-create-checkout' && (
                      <div className="p-4 border-t border-black/5 dark:border-white/5">
                        <p className="mb-4 text-foreground/70">Create a Stripe checkout session for subscription payment.</p>
                        
                        <h3 className="text-lg font-semibold mb-2">Request Body</h3>
                        <div className="bg-[var(--background-alt)] p-3 rounded-lg mb-4 font-mono text-sm overflow-x-auto">
                          {`{
  "plan": "standard", // Required: "basic", "standard", or "premium"
  "isAnnual": false // Optional, defaults to false
}`}
                        </div>
                        
                        <h3 className="text-lg font-semibold mb-2">Response</h3>
                        <div className="bg-[var(--background-alt)] p-3 rounded-lg mb-4 font-mono text-sm overflow-x-auto">
                          {`{
  "sessionId": "cs_test_a1b2c3d4e5f6g7h8i9j0",
  "url": "https://checkout.stripe.com/c/pay/cs_test_a1b2c3d4e5f6g7h8i9j0"
}`}
                        </div>
                        
                        <h3 className="text-lg font-semibold mb-2">Error Responses</h3>
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 mr-2">400</span>
                            <span>Plan is required</span>
                          </div>
                          <div className="flex items-center">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 mr-2">400</span>
                            <span>Invalid plan or billing period</span>
                          </div>
                          <div className="flex items-center">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 mr-2">401</span>
                            <span>Not authenticated</span>
                          </div>
                          <div className="flex items-center">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 mr-2">500</span>
                            <span>Failed to create checkout session</span>
                          </div>
                        </div>
                        
                        <h3 className="text-lg font-semibold mb-2">Example</h3>
                        <div className="bg-[var(--background-alt)] p-3 rounded-lg font-mono text-sm overflow-x-auto">
                          {`fetch('/api/payments/create-checkout', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    plan: 'standard',
    isAnnual: true
  })
})
.then(response => response.json())
.then(data => {
  // Redirect to Stripe checkout
  window.location.href = data.url;
})
.catch(error => console.error('Error:', error));`}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Customer Portal Endpoint */}
                  <div className="card mb-6 overflow-hidden">
                    <div 
                      className="flex justify-between items-center p-4 cursor-pointer hover:bg-[var(--background-alt)] border-b border-black/5 dark:border-white/5"
                      onClick={() => toggleEndpoint('payments-portal')}
                    >
                      <div className="flex items-center">
                        <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 mr-3">GET</span>
                        <span className="font-mono text-sm">/api/payments/portal</span>
                      </div>
                      <div>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform ${expandedEndpoint === 'payments-portal' ? 'transform rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                    
                    {expandedEndpoint === 'payments-portal' && (
                      <div className="p-4 border-t border-black/5 dark:border-white/5">
                        <p className="mb-4 text-foreground/70">Create a Stripe customer portal session for managing subscriptions.</p>
                        
                        <h3 className="text-lg font-semibold mb-2">Response</h3>
                        <p className="mb-2 text-foreground/70">Redirects to the Stripe customer portal.</p>
                        
                        <h3 className="text-lg font-semibold mb-2">Error Responses</h3>
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 mr-2">401</span>
                            <span>Not authenticated</span>
                          </div>
                          <div className="flex items-center">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 mr-2">404</span>
                            <span>No Stripe customer found</span>
                          </div>
                          <div className="flex items-center">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 mr-2">500</span>
                            <span>Failed to create portal session</span>
                          </div>
                        </div>
                        
                        <h3 className="text-lg font-semibold mb-2">Example</h3>
                        <div className="bg-[var(--background-alt)] p-3 rounded-lg font-mono text-sm overflow-x-auto">
                          {`// Redirect to the Stripe customer portal
window.location.href = '/api/payments/portal';`}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Get Checkout Session Endpoint */}
                  <div className="card mb-6 overflow-hidden">
                    <div 
                      className="flex justify-between items-center p-4 cursor-pointer hover:bg-[var(--background-alt)] border-b border-black/5 dark:border-white/5"
                      onClick={() => toggleEndpoint('payments-session')}
                    >
                      <div className="flex items-center">
                        <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 mr-3">GET</span>
                        <span className="font-mono text-sm">/api/payments/session</span>
                      </div>
                      <div>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform ${expandedEndpoint === 'payments-session' ? 'transform rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                    
                    {expandedEndpoint === 'payments-session' && (
                      <div className="p-4 border-t border-black/5 dark:border-white/5">
                        <p className="mb-4 text-foreground/70">Get details about a Stripe checkout session.</p>
                        
                        <h3 className="text-lg font-semibold mb-2">Query Parameters</h3>
                        <div className="bg-[var(--background-alt)] p-3 rounded-lg mb-4 font-mono text-sm overflow-x-auto">
                          {`id: string // Required - Stripe checkout session ID`}
                        </div>
                        
                        <h3 className="text-lg font-semibold mb-2">Response</h3>
                        <div className="bg-[var(--background-alt)] p-3 rounded-lg mb-4 font-mono text-sm overflow-x-auto">
                          {`{
  "id": "cs_test_a1b2c3d4e5f6g7h8i9j0",
  "plan": "standard",
  "isAnnual": true,
  "status": "complete"
}`}
                        </div>
                        
                        <h3 className="text-lg font-semibold mb-2">Error Responses</h3>
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 mr-2">400</span>
                            <span>Session ID is required</span>
                          </div>
                          <div className="flex items-center">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 mr-2">401</span>
                            <span>Not authenticated</span>
                          </div>
                          <div className="flex items-center">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 mr-2">403</span>
                            <span>Unauthorized</span>
                          </div>
                          <div className="flex items-center">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 mr-2">500</span>
                            <span>Failed to retrieve session</span>
                          </div>
                        </div>
                        
                        <h3 className="text-lg font-semibold mb-2">Example</h3>
                        <div className="bg-[var(--background-alt)] p-3 rounded-lg font-mono text-sm overflow-x-auto">
                          {`fetch('/api/payments/session?id=cs_test_a1b2c3d4e5f6g7h8i9j0', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
