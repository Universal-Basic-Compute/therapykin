import React from 'react';

const ReadingTime = ({ content }: { content: string }) => {
  // Calculate reading time based on average reading speed of 200 words per minute
  const wordCount = content.trim().split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200);
  
  return (
    <div className="flex items-center text-foreground/60 text-sm">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-4 w-4 mr-1" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
        />
      </svg>
      <span>{readingTime} min read</span>
    </div>
  );
};

export default ReadingTime;
