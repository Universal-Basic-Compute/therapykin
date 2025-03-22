'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login form submitted with email:', email);
    await login(email, password);
    console.log('Login function completed');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-24 pb-16 px-4">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">Log In to TherapyKin</h1>
          
          {error && (
            <div className="bg-purple-100 border border-purple-400 text-purple-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="card p-6 shadow-depth">
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-black/10 dark:border-white/10 rounded-lg"
                required
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-black/10 dark:border-white/10 rounded-lg"
                required
              />
            </div>
            
            <button
              type="submit"
              className="btn-primary w-full"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Log In'}
            </button>
            
            <div className="mt-4 text-center">
              <Link href="/forgot-password" className="text-sm text-[var(--primary)] hover:underline">
                Forgot your password?
              </Link>
            </div>
          </form>
          
          <div className="mt-6 text-center">
            <p>
              Don't have an account?{' '}
              <Link href="/register" className="text-[var(--primary)] hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
