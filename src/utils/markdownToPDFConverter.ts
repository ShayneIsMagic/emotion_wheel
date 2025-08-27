import jsPDF from 'jspdf';
import { format } from 'date-fns';

export class MarkdownToPDFConverter {
  private doc: jsPDF;
  private currentY: number = 20;
  private pageWidth: number = 595.28; // A4 width in points
  private margin: number = 40;
  private maxContentHeight: number = 750;
  private lineHeight: number = 14;
  private fontSize: number = 12;

  constructor() {
    this.doc = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: 'A4',
    });
    this.doc.setFontSize(this.fontSize);
  }

  /**
   * Generate PDF from the integrated personality assessment markdown file
   */
  async generateIntegratedPersonalityPDF(): Promise<jsPDF> {
    try {
      // Read the actual markdown file content
      const response = await fetch('/src/integrated_personality_assessment.md');
      const markdownContent = await response.text();

      this.doc = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: 'A4',
      });

      this.currentY = 20;
      this.doc.setFontSize(this.fontSize);

      this.addHeader('Integrated Personality Assessment', 'CliftonStrengths + HEXACO + Plutchik Integration');

      // Parse and add all content from the markdown
      const sections = this.parseMarkdownSections(markdownContent);
      sections.forEach(section => {
        this.addSection(section.title, section.content);
      });

      this.addFooter();
      return this.doc;
    } catch (error) {
      console.error('Error generating integrated personality PDF:', error);
      // Fallback to embedded content if file reading fails
      return this.generateIntegratedPersonalityPDFFallback();
    }
  }

  /**
   * Generate PDF from the clinical emotional assessment markdown file
   */
  async generateClinicalEmotionalPDF(): Promise<jsPDF> {
    try {
      // Read the actual markdown file content
      const response = await fetch('/src/clinical_emotional_assessment.md');
      const markdownContent = await response.text();

      this.doc = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: 'A4',
      });

      this.currentY = 20;
      this.doc.setFontSize(this.fontSize);

      this.addHeader('Clinical Emotional Assessment', 'Professional Mental Health Framework');

      // Parse and add all content from the markdown
      const sections = this.parseMarkdownSections(markdownContent);
      sections.forEach(section => {
        this.addSection(section.title, section.content);
      });

      this.addFooter();
      return this.doc;
    } catch (error) {
      console.error('Error generating clinical emotional PDF:', error);
      // Fallback to embedded content if file reading fails
      return this.generateClinicalEmotionalPDFFallback();
    }
  }

  /**
   * Generate PDF from the unfiltered scoring assessment markdown file
   */
  async generateUnfilteredScoringPDF(): Promise<jsPDF> {
    try {
      // Read the actual markdown file content
      const response = await fetch('/src/unfiltered_scoring_assessment.md');
      const markdownContent = await response.text();

      this.doc = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: 'A4',
      });

      this.currentY = 20;
      this.doc.setFontSize(this.fontSize);

      this.addHeader('Unfiltered Scoring Assessment', 'Mathematical Framework for Emotional Analysis');

      // Parse and add all content from the markdown
      const sections = this.parseMarkdownSections(markdownContent);
      sections.forEach(section => {
        this.addSection(section.title, section.content);
      });

      this.addFooter();
      return this.doc;
    } catch (error) {
      console.error('Error generating unfiltered scoring PDF:', error);
      // Fallback to embedded content if file reading fails
      return this.generateUnfilteredScoringPDFFallback();
    }
  }

  /**
   * Parse markdown content into structured sections
   */
  private parseMarkdownSections(markdownContent: string): Array<{title: string, content: string[]}> {
    const lines = markdownContent.split('\n');
    const sections: Array<{title: string, content: string[]}> = [];
    let currentSection: {title: string, content: string[]} | null = null;

    for (const line of lines) {
      const trimmedLine = line.trim();

      // Check for headers
      if (trimmedLine.startsWith('# ')) {
        if (currentSection) {
          sections.push(currentSection);
        }
        currentSection = {
          title: trimmedLine.substring(2),
          content: [],
        };
      } else if (trimmedLine.startsWith('## ')) {
        if (currentSection) {
          sections.push(currentSection);
        }
        currentSection = {
          title: trimmedLine.substring(3),
          content: [],
        };
      } else if (trimmedLine.startsWith('### ')) {
        if (currentSection) {
          sections.push(currentSection);
        }
        currentSection = {
          title: trimmedLine.substring(4),
          content: [],
        };
      } else if (currentSection && trimmedLine) {
        currentSection.content.push(trimmedLine);
      }
    }

    if (currentSection) {
      sections.push(currentSection);
    }

    return sections;
  }

  /**
   * Add a section to the PDF with proper formatting
   */
  private addSection(title: string, content: string[]) {
    // Check if we need a new page
    if (this.currentY > this.maxContentHeight) {
      this.doc.addPage();
      this.currentY = 20;
    }

    // Add section title
    this.doc.setFontSize(16);
    this.doc.setFont(undefined, 'bold');
    this.doc.text(title, this.margin, this.currentY);
    this.currentY += 25;

    // Add section content
    this.doc.setFontSize(this.fontSize);
    this.doc.setFont(undefined, 'normal');

    for (const line of content) {
      if (this.currentY > this.maxContentHeight) {
        this.doc.addPage();
        this.currentY = 20;
      }

      // Handle different content types
      if (line.startsWith('|')) {
        // Table row
        this.addTableRow(line);
      } else if (line.startsWith('- ') || line.startsWith('• ')) {
        // List item
        this.addListItem(line);
      } else if (line.startsWith('**') && line.endsWith('**')) {
        // Bold text
        this.addBoldText(line);
      } else if (line.trim()) {
        // Regular text
        this.addTextLine(line);
      }
    }

    this.currentY += 20; // Space between sections
  }

  /**
   * Add a table row to the PDF
   */
  private addTableRow(line: string) {
    if (this.currentY > this.maxContentHeight) {
      this.doc.addPage();
      this.currentY = 20;
    }

    const cells = line.split('|').filter(cell => cell.trim());
    if (cells.length > 1) {
      const cellWidth = (this.pageWidth - 2 * this.margin) / cells.length;

      cells.forEach((cell, index) => {
        const x = this.margin + (index * cellWidth);
        const cleanCell = this.cleanMarkdownText(cell.trim());
        this.doc.text(cleanCell, x, this.currentY);
      });

      this.currentY += 20;
    }
  }

  /**
   * Add a list item to the PDF
   */
  private addListItem(line: string) {
    if (this.currentY > this.maxContentHeight) {
      this.doc.addPage();
      this.currentY = 20;
    }

    const cleanText = this.cleanMarkdownText(line.substring(2));
    this.doc.text(`• ${cleanText}`, this.margin + 20, this.currentY);
    this.currentY += this.lineHeight;
  }

  /**
   * Add bold text to the PDF
   */
  private addBoldText(line: string) {
    if (this.currentY > this.maxContentHeight) {
      this.doc.addPage();
      this.currentY = 20;
    }

    const cleanText = this.cleanMarkdownText(line.substring(2, line.length - 2));
    this.doc.setFont(undefined, 'bold');
    this.doc.text(cleanText, this.margin, this.currentY);
    this.doc.setFont(undefined, 'normal');
    this.currentY += this.lineHeight;
  }

  /**
   * Add a regular text line to the PDF
   */
  private addTextLine(line: string) {
    if (this.currentY > this.maxContentHeight) {
      this.doc.addPage();
      this.currentY = 20;
    }

    const cleanText = this.cleanMarkdownText(line);

    // Handle long lines with word wrapping
    const words = cleanText.split(' ');
    let currentLine = '';

    for (const word of words) {
      const testLine = currentLine + (currentLine ? ' ' : '') + word;
      const textWidth = this.doc.getTextWidth(testLine);

      if (textWidth > (this.pageWidth - 2 * this.margin)) {
        // Line is too long, add current line and start new one
        if (currentLine) {
          this.doc.text(currentLine, this.margin, this.currentY);
          this.currentY += this.lineHeight;

          if (this.currentY > this.maxContentHeight) {
            this.doc.addPage();
            this.currentY = 20;
          }
        }
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }

    // Add the last line
    if (currentLine) {
      this.doc.text(currentLine, this.margin, this.currentY);
      this.currentY += this.lineHeight;
    }
  }

  /**
   * Clean markdown formatting from text
   */
  private cleanMarkdownText(text: string): string {
    return text
      .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
      .replace(/\*(.*?)\*/g, '$1')     // Remove italic
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links
      .replace(/`([^`]+)`/g, '$1')     // Remove code
      .replace(/^#+\s*/, '')           // Remove headers
      .trim();
  }

  /**
   * Add header to the PDF
   */
  private addHeader(title: string, subtitle: string) {
    this.doc.setFontSize(24);
    this.doc.setFont(undefined, 'bold');
    this.doc.text(title, this.margin, this.currentY);
    this.currentY += 30;

    this.doc.setFontSize(16);
    this.doc.setFont(undefined, 'normal');
    this.doc.text(subtitle, this.margin, this.currentY);
    this.currentY += 40;

    this.doc.setFontSize(this.fontSize);
  }

  /**
   * Add footer to the PDF
   */
  private addFooter() {
    const pageCount = this.doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      this.doc.setPage(i);
      this.doc.setFontSize(10);
      this.doc.text(`Page ${i} of ${pageCount}`, this.pageWidth - 100, this.pageWidth - 50);
      this.doc.text(`Generated on ${format(new Date(), 'MMM dd, yyyy')}`, this.margin, this.pageWidth - 50);
    }
  }

  /**
   * Check if we need a page break
   */
  private checkPageBreak() {
    if (this.currentY > this.maxContentHeight) {
      this.doc.addPage();
      this.currentY = 20;
    }
  }

  // Fallback methods with embedded content if file reading fails
  private generateIntegratedPersonalityPDFFallback(): jsPDF {
    // This would contain the full embedded content from the markdown
    // For now, return a basic PDF
    this.addHeader('Integrated Personality Assessment', 'CliftonStrengths + HEXACO + Plutchik Integration');
    this.addTextLine('Assessment content would be embedded here if file reading fails.');
    return this.doc;
  }

  private generateClinicalEmotionalPDFFallback(): jsPDF {
    this.addHeader('Clinical Emotional Assessment', 'Professional Mental Health Framework');
    this.addTextLine('Assessment content would be embedded here if file reading fails.');
    return this.doc;
  }

  private generateUnfilteredScoringPDFFallback(): jsPDF {
    this.addHeader('Unfiltered Scoring Assessment', 'Mathematical Framework for Emotional Analysis');
    this.addTextLine('Assessment content would be embedded here if file reading fails.');
    return this.doc;
  }
}
