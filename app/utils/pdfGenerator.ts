import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { useState, useCallback } from 'react';

interface GeneratePDFOptions {
  title: string;
  subtitle?: string;
  filename: string;
  contentId: string;
  onProgress?: (progress: number) => void;
}

// A more robust approach that doesn't rely on html2canvas for the entire content
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
    
    // Update progress
    onProgress(10);
    
    // Get all sections to include in the PDF
    const sections = contentElement.querySelectorAll('section');
    const totalSections = sections.length;
    
    if (totalSections === 0) {
      // Fallback to using html2canvas if no sections are found
      return await generatePDFWithHtml2Canvas({
        title,
        subtitle,
        filename,
        contentId,
        onProgress,
      });
    }
    
    let yPosition = subtitle ? 40 : 30;
    const pageWidth = pdf.internal.pageSize.getWidth();
    const margin = 20;
    const contentWidth = pageWidth - (margin * 2);
    
    // Process each section
    for (let i = 0; i < totalSections; i++) {
      try {
        // Update progress based on section completion
        onProgress(10 + ((i / totalSections) * 80));
        
        const section = sections[i];
        
        // Get the section title
        const sectionTitle = section.querySelector('h2, h3')?.textContent || `Section ${i + 1}`;
        
        // Add section title
        pdf.setFontSize(16);
        pdf.setTextColor(0, 0, 0);
        
        // Check if we need a new page
        if (yPosition > 270) {
          pdf.addPage();
          yPosition = 20;
        }
        
        pdf.text(sectionTitle, margin, yPosition);
        yPosition += 10;
        
        // Get the section text content (excluding the title)
        const paragraphs = section.querySelectorAll('p');
        
        // Add each paragraph
        pdf.setFontSize(12);
        pdf.setTextColor(60, 60, 60);
        
        for (let j = 0; j < paragraphs.length; j++) {
          const paragraph = paragraphs[j].textContent || '';
          
          // Skip empty paragraphs
          if (!paragraph.trim()) continue;
          
          // Split text into lines that fit within the page width
          const lines = pdf.splitTextToSize(paragraph, contentWidth);
          
          // Check if we need a new page
          if (yPosition + (lines.length * 7) > 280) {
            pdf.addPage();
            yPosition = 20;
          }
          
          // Add the text
          pdf.text(lines, margin, yPosition);
          yPosition += (lines.length * 7) + 5; // Add some space between paragraphs
        }
        
        // Add some space between sections
        yPosition += 10;
      } catch (sectionError) {
        console.error(`Error processing section ${i}:`, sectionError);
        // Continue with the next section instead of failing completely
      }
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
      pdf.text(`Page ${i} of ${pageCount}`, pdf.internal.pageSize.getWidth() - 40, 287);
    }
    
    // Complete progress
    onProgress(100);
    
    // Save the PDF
    pdf.save(filename);
  } catch (error) {
    console.error('Error generating PDF with text extraction:', error);
    
    // Fallback to html2canvas method if text extraction fails
    try {
      await generatePDFWithHtml2Canvas({
        title,
        subtitle,
        filename,
        contentId,
        onProgress,
      });
    } catch (fallbackError) {
      console.error('Fallback PDF generation also failed:', fallbackError);
      throw fallbackError;
    }
  }
}

// Original html2canvas approach as a fallback
async function generatePDFWithHtml2Canvas({
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
    
    try {
      // Update progress
      onProgress(10);
      
      // Capture the entire content as an image
      const canvas = await html2canvas(contentElement, {
        scale: 1.2, // Lower scale for better performance
        useCORS: true,
        logging: false,
        allowTaint: true, // Allow tainted canvas
        foreignObjectRendering: false, // Disable foreignObject rendering which can cause issues
        removeContainer: true, // Remove the cloned container after rendering
      });
      
      // Update progress
      onProgress(70);
      
      // Convert the canvas to an image
      const imgData = canvas.toDataURL('image/jpeg', 0.7);
      
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
        pdf.text(`Page ${i} of ${pageCount}`, pdf.internal.pageSize.getWidth() - 40, 287);
      }
      
      // Complete progress
      onProgress(100);
      
      // Save the PDF
      pdf.save(filename);
    } catch (error) {
      console.error('Error capturing content with html2canvas:', error);
      throw new Error(`PDF generation failed: ${error && typeof error === 'object' && 'message' in error ? String(error.message) : 'Unknown error with html2canvas'}`);
    }
  } catch (error) {
    console.error('Error in html2canvas PDF generation:', error);
    throw error;
  } finally {
    // Remove the temporary styles
    removePDFStyles();
  }
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

// Create a React hook for PDF generation
export function usePDFGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  
  const generatePDFWithProgress = useCallback(async (options: GeneratePDFOptions) => {
    try {
      setIsGenerating(true);
      setProgress(0);
      setError(null);
      
      await generatePDF({
        ...options,
        onProgress: setProgress,
      });
      
      return true;
    } catch (error) {
      console.error('PDF generation failed:', error);
      setError(error && typeof error === 'object' && 'message' in error ? String(error.message) : 'Unknown error generating PDF');
      return false;
    } finally {
      setIsGenerating(false);
    }
  }, []);
  
  return {
    generatePDF: generatePDFWithProgress,
    isGenerating,
    progress,
    error
  };
}
