import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

interface GeneratePDFOptions {
  title: string;
  subtitle?: string;
  filename: string;
  contentId: string;
  onProgress?: (progress: number) => void;
}

function applyPDFCompatibleStyles(): void {
  // Create a temporary style element
  const styleElement = document.createElement('style');
  styleElement.setAttribute('id', 'pdf-generation-styles');
  
  // Add more comprehensive styles that override problematic CSS
  styleElement.textContent = `
    /* Override all gradient text and backgrounds */
    * {
      background-image: none !important;
      -webkit-print-color-adjust: exact !important;
      color-adjust: exact !important;
    }
    
    /* Fix text with background-clip */
    .text-transparent, [class*="bg-gradient"], [class*="bg-clip-text"] {
      background-clip: unset !important;
      -webkit-background-clip: unset !important;
      color: currentColor !important;
      -webkit-text-fill-color: currentColor !important;
    }
    
    /* Override any oklab colors */
    [style*="oklab"], [class*="from-"], [class*="to-"], [class*="via-"] {
      color: #333333 !important;
      background-color: transparent !important;
    }
    
    /* Fix TherapyKin logo specifically */
    nav a span.text-transparent.bg-clip-text {
      color: #00c5bc !important;
      -webkit-text-fill-color: #00c5bc !important;
    }
    
    /* Fix SVG elements */
    svg {
      fill: currentColor !important;
    }
  `;
  
  // Append the style element to the document head
  document.head.appendChild(styleElement);
}

function removePDFStyles(): void {
  // Remove the temporary style element
  const styleElement = document.getElementById('pdf-generation-styles');
  if (styleElement) {
    styleElement.remove();
  }
}

export async function generatePDF({
  title,
  subtitle = '',
  filename,
  contentId,
  onProgress = () => {},
}: GeneratePDFOptions): Promise<void> {
  // Get the content element
  const contentElement = document.getElementById(contentId);
  if (!contentElement) {
    throw new Error(`Element with ID "${contentId}" not found`);
  }
  
  try {
    // Apply PDF-compatible styles before generation
    applyPDFCompatibleStyles();
    
    // Create a new jsPDF instance
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    // Set the title of the PDF
    pdf.setProperties({
      title: title,
    });
    
    // Add the title and description to the PDF
    pdf.setFontSize(22);
    pdf.text(title, 20, 20);
    
    if (subtitle) {
      pdf.setFontSize(12);
      pdf.text(subtitle, 20, 30);
    }
    
    let yPosition = subtitle ? 40 : 30;
    
    // Instead of processing sections, let's capture the entire content at once
    try {
      // Update progress
      onProgress(10);
      
      // Capture the entire content as an image
      const canvas = await html2canvas(contentElement, {
        scale: 1.5, // Lower scale for better performance
        useCORS: true,
        logging: false,
        allowTaint: true, // Allow tainted canvas
        foreignObjectRendering: false, // Disable foreignObject rendering which can cause issues
        removeContainer: true, // Remove the cloned container after rendering
      });
      
      // Update progress
      onProgress(70);
      
      // Convert the canvas to an image
      const imgData = canvas.toDataURL('image/jpeg', 0.8);
      
      // Calculate the image width to fit on the PDF page
      const imgWidth = 170; // A4 width minus margins
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      // Split the image into multiple pages if needed
      const pageHeight = 250; // A4 height minus margins and header
      let heightLeft = imgHeight;
      let position = yPosition;
      
      // Add the first part of the image
      pdf.addImage(imgData, 'JPEG', 20, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      
      // Add additional pages if the content is too long
      while (heightLeft > 0) {
        position = 20; // Reset position for new page
        pdf.addPage();
        pdf.addImage(
          imgData, 
          'JPEG', 
          20, 
          position - (imgHeight - heightLeft), // Negative offset to show the next part
          imgWidth, 
          imgHeight
        );
        heightLeft -= pageHeight;
      }
      
      // Update progress
      onProgress(90);
      
      // Add footer with website URL
      const pageCount = pdf.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        pdf.setPage(i);
        pdf.setFontSize(10);
        pdf.setTextColor(100, 100, 100);
        pdf.text('www.therapykin.ai', 20, 287);
        pdf.text(`Page ${i} of ${pageCount}`, pdf.internal.pageSize.width - 40, 287);
      }
      
      // Complete progress
      onProgress(100);
      
      // Save the PDF
      pdf.save(filename);
    } catch (error) {
      console.error('Error capturing content:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  } finally {
    // Remove the temporary styles
    removePDFStyles();
  }
}

// Create a React hook for PDF generation
import { useState, useCallback } from 'react';

export function usePDFGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const generatePDFWithProgress = useCallback(async (options: GeneratePDFOptions) => {
    try {
      setIsGenerating(true);
      setProgress(0);
      
      await generatePDF({
        ...options,
        onProgress: setProgress,
      });
      
      return true;
    } catch (error) {
      console.error('PDF generation failed:', error);
      return false;
    } finally {
      setIsGenerating(false);
    }
  }, []);
  
  return {
    generatePDF: generatePDFWithProgress,
    isGenerating,
    progress,
  };
}
