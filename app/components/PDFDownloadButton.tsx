'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { usePDFGenerator } from '../utils/pdfGenerator';

// Dynamically import the PDF generator to avoid SSR issues
const PDFGenerator = dynamic(
  () => import('../utils/pdfGenerator').then(mod => ({ default: mod.usePDFGenerator })),
  { ssr: false }
);

interface PDFDownloadButtonProps {
  title: string;
  subtitle?: string;
  filename: string;
  contentId: string;
  className?: string;
}

export default function PDFDownloadButton({
  title,
  subtitle,
  filename,
  contentId,
  className = '',
}: PDFDownloadButtonProps) {
  // Use the PDF generator hook
  const { generatePDF, isGenerating, progress } = usePDFGenerator();
  
  // Handle the download button click
  const handleDownload = async () => {
    const success = await generatePDF({
      title,
      subtitle,
      filename,
      contentId,
    });
    
    if (!success) {
      alert('There was an error generating the PDF. Please try again later.');
    }
  };
  
  return (
    <button
      className={`flex justify-center items-center ${className}`}
      onClick={handleDownload}
      disabled={isGenerating}
    >
      {isGenerating ? (
        <>
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {progress < 100 ? `Generating PDF (${Math.round(progress)}%)` : 'Finalizing PDF...'}
        </>
      ) : (
        <>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Download PDF
        </>
      )}
    </button>
  );
}
