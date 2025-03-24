import React from 'react';
import Link from 'next/link';

interface MidArticleCTAProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

const MidArticleCTA = ({ 
  title, 
  description, 
  buttonText, 
  buttonLink 
}: MidArticleCTAProps) => {
  return (
    <div className="my-12 p-6 bg-[var(--primary)]/5 rounded-xl">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="w-16 h-16 md:w-20 md:h-20 flex-shrink-0 rounded-full bg-[var(--primary)]/10 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-2">{title}</h4>
          <p className="text-foreground/80">{description}</p>
          <Link 
            href={buttonLink} 
            className="inline-block mt-4 px-4 py-2 bg-[var(--primary)] text-white rounded-full text-sm font-medium hover:bg-opacity-90 transition-all"
          >
            {buttonText}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MidArticleCTA;
