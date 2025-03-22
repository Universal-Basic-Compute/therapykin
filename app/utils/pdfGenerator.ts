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
  
  // Add styles that override problematic CSS
  styleElement.textContent = `
    /* Override oklab colors with standard colors */
    [style*="oklab"] {
      color: #333333 !important;
      background-color: transparent !important;
    }
    
    /* Fix any other problematic styles for PDF generation */
    * {
      -webkit-print-color-adjust: exact !important;
      color-adjust: exact !important;
    }
    
    /* Override gradient text that might cause issues */
    [class*="bg-gradient"] {
      background: none !important;
      color: currentColor !important;
      -webkit-text-fill-color: currentColor !important;
    }
    
    /* Ensure text is visible */
    .text-transparent {
      color: currentColor !important;
      -webkit-text-fill-color: currentColor !important;
    }
    
    /* Fix background-clip issues */
    .bg-clip-text {
      background-clip: unset !important;
      -webkit-background-clip: unset !important;
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
    
    // Get all sections to include in the PDF
    const sections = contentElement.querySelectorAll('section');
    const totalSections = sections.length;
    
    // Add the title and description
    pdf.setFontSize(22);
    pdf.text(title, 20, 20);
    
    if (subtitle) {
      pdf.setFontSize(12);
      pdf.text(subtitle, 20, 30);
    }
    
    let yPosition = subtitle ? 40 : 30;
    
    // Process each section
    for (let i = 0; i < totalSections; i++) {
      const section = sections[i];
      
      // Update progress
      onProgress((i / totalSections) * 100);
      
      // Capture the section as an image
      const canvas = await html2canvas(section, {
        scale: 2,
        useCORS: true,
        logging: false,
      });
      
      // Convert the canvas to an image
      const imgData = canvas.toDataURL('image/jpeg', 0.7);
      
      // Calculate the image width and height to fit on the PDF page
      const imgWidth = 170;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      // Add a new page if the content won't fit on the current page
      if (yPosition + imgHeight > 280) {
        pdf.addPage();
        yPosition = 20;
      }
      
      // Add the image to the PDF
      pdf.addImage(imgData, 'JPEG', 20, yPosition, imgWidth, imgHeight);
      
      // Update the Y position for the next section
      yPosition += imgHeight + 10;
    }
    
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
