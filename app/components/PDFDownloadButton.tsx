'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { usePDFGenerator } from '../utils/pdfGenerator';

// We don't need this dynamic import since we're directly using the hook below
// The usePDFGenerator hook is already imported at the top of the file

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
  const { generatePDF, isGenerating, progress, error } = usePDFGenerator();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  // Handle the download button click
  const handleDownload = async () => {
    try {
      setErrorMessage(null);
      // The generatePDF function from the hook internally manages state
      const success = await generatePDF({
        title,
        subtitle,
        filename,
        contentId,
      });
      
      if (!success) {
        console.log('PDF generation returned false');
        setErrorMessage('There was an error generating the PDF. Please try again later.');
      }
    } catch (err) {
      console.error('PDF generation failed:', err);
      
      // Provide a more specific error message
      if (err && typeof err === 'object' && 'message' in err) {
        const errorMessage = String(err.message);
        if (errorMessage.includes('oklab')) {
          setErrorMessage('Sorry, we encountered an issue with color formatting when creating your PDF. We\'ve noted this issue and will fix it soon. Please try again later.');
        } else if (errorMessage.includes('html2canvas')) {
          setErrorMessage('Sorry, we had trouble capturing the content for your PDF. This might be due to complex formatting. Please try again later.');
        } else {
          setErrorMessage('Sorry, we encountered an issue creating your PDF. This might be due to browser compatibility. Please try a different browser or contact support.');
        }
      } else {
        setErrorMessage('Sorry, we encountered an unknown issue creating your PDF. Please try again later or contact support.');
      }
    }
  };
  
  return (
    <div>
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
      
      {errorMessage && (
        <div className="mt-2 text-sm text-red-600 dark:text-red-400">
          {errorMessage}
        </div>
      )}
    </div>
  );
}
