'use client';

import React, { useState } from 'react';
import { shareOnTwitter, shareOnFacebook, shareOnLinkedIn, shareViaEmail, copyToClipboard, shareContent } from '../utils/share';

interface ShareButtonsProps {
  title: string;
  url: string;
  className?: string;
  sources?: Array<{id: number; text: string; url?: string}>;
}

export default function ShareButtons({ title, url, className = '', sources = [] }: ShareButtonsProps) {
  const [showCopiedMessage, setShowCopiedMessage] = useState(false);
  
  // Handle copy link
  const handleCopyLink = async () => {
    const success = await copyToClipboard(url);
    if (success) {
      setShowCopiedMessage(true);
      setTimeout(() => setShowCopiedMessage(false), 2000);
    }
  };
  
  // Format sources for sharing
  const formatSourcesForSharing = () => {
    if (!sources || sources.length === 0) return '';
    
    return '\n\nSources:\n' + sources.map(source => 
      `[${source.id}] ${source.text}${source.url ? ` - ${source.url}` : ''}`
    ).join('\n');
  };
  
  // Share with sources
  const shareWithSources = (platform: string) => {
    const sourcesText = formatSourcesForSharing();
    const fullText = title + (sourcesText ? sourcesText : '');
    
    switch (platform) {
      case 'twitter':
        shareOnTwitter(fullText, url);
        break;
      case 'linkedin':
        shareOnLinkedIn(fullText, url);
        break;
      case 'email':
        shareViaEmail(title, url, sourcesText);
        break;
      default:
        // For platforms that don't support text customization like Facebook
        if (platform === 'facebook') {
          shareOnFacebook(url);
        } else if (platform === 'copy') {
          copyToClipboard(url + (sourcesText ? '\n\n' + sourcesText : ''));
        }
    }
  };
  
  return (
    <div className={`flex flex-wrap gap-4 ${className}`}>
      <button 
        className="p-2 rounded-full bg-[#1DA1F2]/10 text-[#1DA1F2] hover:bg-[#1DA1F2]/20 transition-all"
        onClick={() => shareWithSources('twitter')}
        aria-label="Share on Twitter"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
        </svg>
      </button>
      <button 
        className="p-2 rounded-full bg-[#1877F2]/10 text-[#1877F2] hover:bg-[#1877F2]/20 transition-all"
        onClick={() => shareWithSources('facebook')}
        aria-label="Share on Facebook"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
        </svg>
      </button>
      <button 
        className="p-2 rounded-full bg-[#0A66C2]/10 text-[#0A66C2] hover:bg-[#0A66C2]/20 transition-all"
        onClick={() => shareWithSources('linkedin')}
        aria-label="Share on LinkedIn"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M19.7 3H4.3A1.3 1.3 0 003 4.3v15.4A1.3 1.3 0 004.3 21h15.4a1.3 1.3 0 001.3-1.3V4.3A1.3 1.3 0 0019.7 3zM8.339 18.338H5.667v-8.59h2.672v8.59zM7.004 8.574a1.548 1.548 0 11-.002-3.096 1.548 1.548 0 01.002 3.096zm11.335 9.764H15.67v-4.177c0-.996-.017-2.278-1.387-2.278-1.389 0-1.601 1.086-1.601 2.206v4.249h-2.667v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.779 3.203 4.092v4.711z" clipRule="evenodd"></path>
        </svg>
      </button>
      <button 
        className="p-2 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] hover:bg-[var(--primary)]/20 transition-all"
        onClick={() => shareWithSources('email')}
        aria-label="Share via Email"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
        </svg>
      </button>
      <button 
        className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all relative"
        onClick={() => shareWithSources('copy')}
        aria-label="Copy Link"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
        </svg>
        {showCopiedMessage && (
          <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded whitespace-nowrap">
            Link copied!
          </span>
        )}
      </button>
      <button 
        className="p-2 rounded-full bg-[var(--primary)] text-white hover:bg-[var(--primary-dark)] transition-all"
        onClick={async () => {
          const shared = await shareContent(title, url);
          // If Web Share API is not available, no need to do anything as other buttons are visible
        }}
        aria-label="Share"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path>
        </svg>
      </button>
    </div>
  );
}
