'use client';

import React, { useEffect, useState } from 'react';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

const TableOfContents = ({ content }: { content: string }) => {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Parse the content for headings when in the browser
    if (typeof document !== 'undefined') {
      const article = document.querySelector('.blog-content');
      if (article) {
        const headingElements = article.querySelectorAll('h2, h3');
        const items: TOCItem[] = [];
        
        headingElements.forEach((heading) => {
          const id = heading.id || heading.textContent?.toLowerCase().replace(/[^\w]+/g, '-') || '';
          
          // Set the ID on the heading element if it doesn't have one
          if (!heading.id) {
            heading.id = id;
          }
          
          items.push({
            id,
            text: heading.textContent || '',
            level: heading.tagName === 'H2' ? 2 : 3
          });
        });
        
        setHeadings(items);
      }
    }
  }, [content]);

  useEffect(() => {
    const handleScroll = () => {
      if (headings.length === 0) return;
      
      // Find the heading that's currently in view
      const headingElements = headings.map(heading => 
        document.getElementById(heading.id)
      ).filter(Boolean) as HTMLElement[];
      
      let currentActiveId = '';
      
      // Find the last heading that's above the top of the viewport
      for (let i = headingElements.length - 1; i >= 0; i--) {
        const element = headingElements[i];
        const rect = element.getBoundingClientRect();
        
        if (rect.top <= 100) { // 100px offset for better UX
          currentActiveId = element.id;
          break;
        }
      }
      
      if (currentActiveId !== activeId) {
        setActiveId(currentActiveId);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [headings, activeId]);

  if (headings.length === 0) {
    return null;
  }

  return (
    <div className="bg-[var(--background-alt)]/50 p-4 rounded-lg mb-8 sticky top-24">
      <h4 className="text-lg font-semibold mb-3">Table of Contents</h4>
      <nav>
        <ul className="space-y-2">
          {headings.map((heading) => (
            <li 
              key={heading.id} 
              className={`${heading.level === 3 ? 'ml-4' : ''}`}
            >
              <a 
                href={`#${heading.id}`}
                className={`text-sm hover:text-[var(--primary)] transition-colors ${
                  activeId === heading.id 
                    ? 'text-[var(--primary)] font-medium' 
                    : 'text-foreground/70'
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(heading.id)?.scrollIntoView({
                    behavior: 'smooth'
                  });
                }}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default TableOfContents;
