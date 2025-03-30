'use client';

import React from 'react';
import Image from 'next/image';

interface TestimonialProps {
  quote: string;
  author: string;
  title: string;
  imageSrc?: string; // Add optional image source property
}

export default function Testimonial({ quote, author, title, imageSrc }: TestimonialProps) {
  return (
    <div className="bg-white dark:bg-[var(--background-alt)]/50 p-6 rounded-lg border border-foreground/5 h-full flex flex-col">
      <div className="flex items-center flex-grow mb-4">
        {imageSrc ? (
          <div className="mr-4 flex-shrink-0">
            <Image 
              src={imageSrc} 
              alt={`${author}`} 
              width={128} 
              height={128} 
              className="rounded-full border-2 border-[var(--primary)]/20"
            />
          </div>
        ) : (
          <svg className="w-10 h-10 text-[var(--primary)]/30 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
        )}
        <div className="flex flex-col justify-center">
          <p className="text-foreground/80 italic mb-4">
            "{quote}"
          </p>
          <p className="font-medium">{author}, {title}</p>
        </div>
      </div>
    </div>
  );
}
