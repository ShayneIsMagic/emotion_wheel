import jsPDF from 'jspdf';
import { AssessmentSession, AssessmentScores, PDFExportOptions } from '../types/emotion';
import { format } from 'date-fns';

/**
 * PDF Generation Utility for Emotion Assessment Results
 * Generates comprehensive reports with charts, insights, and trend analysis
 */
export class PDFGenerator {
  private doc: jsPDF;
  private currentY: number = 20;
  private pageWidth: number = 595.28; // A4 width in points
  private pageHeight: number = 841.89; // A4 height in points
  private margin: number = 20;
  private maxContentHeight: number = 800; // Maximum content height before new page

  constructor(options: PDFExportOptions) {
    this.doc = new jsPDF({
      orientation: options.orientation,
      unit: 'mm',
      format: options.format,
    });

    this.pageWidth = this.doc.internal.pageSize.getWidth();
    this.pageHeight = this.doc.internal.pageSize.getHeight();
  }

  /**
   * Generate complete assessment report PDF
   */
  async generateReport(
    session: AssessmentSession,
    options: PDFExportOptions,
  ): Promise<jsPDF> {
    this.addHeader(session);
    this.addAssessmentSummary(session);

    if (options.includeCharts) {
      await this.addCharts(session.scores);
    }

    this.addScoringDetails(session);
    this.addEmotionalInsights(session);

    if (options.includeRecommendations) {
      this.addRecommendations(session);
    }

    if (options.includeTrends) {
      // Note: Trend analysis would be implemented separately
      this.addTrendAnalysisPlaceholder();
    }

    this.addResearchFoundation();
    this.addFooter();

    return this.doc;
  }

  /**
   * Add report header with title and metadata
   */
  private addHeader(session: AssessmentSession): void {
    // Title
    this.doc.setFontSize(24);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('Emotional Assessment Report', this.pageWidth / 2, this.currentY, { align: 'center' });
    this.currentY += 15;

    // Assessment metadata
    this.doc.setFontSize(12);
    this.doc.setFont('helvetica', 'normal');

    const metadata = [
      `Assessment Date: ${format(session.timestamp, 'PPP')}`,
      `Timeframe: ${this.formatTimeframe(session.timeframe)}`,
      `Session ID: ${session.id}`,
      `Report Generated: ${format(new Date(), 'PPP')}`,
    ];

    metadata.forEach(line => {
      this.doc.text(line, this.margin, this.currentY);
      this.currentY += 6;
    });

    this.currentY += 10;
    this.addSeparator();
  }

  /**
   * Add assessment summary section
   */
  private addAssessmentSummary(session: AssessmentSession): void {
    this.addSectionWithSpacing('Assessment Summary', () => {
      const summaryData = [
        { label: 'Assessment Date', value: format(session.timestamp, 'PPP') },
        { label: 'Timeframe', value: this.formatTimeframe(session.timeframe) },
        { label: 'Total Responses', value: session.responses.length.toString() },
      ];

      summaryData.forEach(item => {
        this.checkPageBreak(15);
        this.doc.setFontSize(10);
        this.doc.setFont('helvetica', 'normal');
        this.doc.text(`${item.label}: ${item.value}`, this.margin, this.currentY);
        this.currentY += 8;
      });
    });
  }

  /**
   * Add charts section (placeholder for now)
   */
  private async addCharts(_scores: AssessmentScores, _session?: AssessmentSession): Promise<void> {
    this.addSectionWithSpacing('Emotional Assessment Charts', () => {
      // Add chart placeholders
      this.doc.setFontSize(10);
      this.doc.setFont('helvetica', 'normal');

      const chartDescriptions = [
        '• Plutchik Wheel Chart: Shows your primary emotion scores',
        '• PANAS Chart: Displays positive vs negative affect balance',
        '• Dimensional Chart: Shows valence, arousal, and power scores',
        '• GEW Chart: Geneva Emotion Wheel quadrant distribution',
      ];

      chartDescriptions.forEach(desc => {
        this.checkPageBreak(15);
        this.doc.text(desc, this.margin, this.currentY);
        this.currentY += 6;
      });

      // Note: In a production environment, you would generate actual charts here
      // using libraries like Chart.js or D3.js and convert them to images
      this.checkPageBreak(20);
      this.doc.setFontSize(9);
      this.doc.setFont('helvetica', 'italic');
      this.doc.text('Note: Charts are represented as descriptions in this PDF. For interactive charts, view the web version.', this.margin, this.currentY);
      this.currentY += 10;
    });
  }

  /**
   * Add detailed scoring breakdown
   */
  private addScoringDetails(session: AssessmentSession): void {
    this.addSectionWithSpacing('Detailed Scoring Breakdown', () => {
      // PANAS Scores
      this.checkPageBreak(25);
      this.doc.setFontSize(12);
      this.doc.setFont('helvetica', 'bold');
      this.doc.text('PANAS (Positive and Negative Affect Schedule)', this.margin, this.currentY);
      this.currentY += 8;

      this.doc.setFontSize(10);
      this.doc.setFont('helvetica', 'normal');

      const panasScores = [
        `Positive Affect Score: ${session.scores.panas.positive}/50`,
        `Negative Affect Score: ${session.scores.panas.negative}/50`,
        `Emotional Balance: ${session.scores.panas.balance > 0 ? '+' : ''}${session.scores.panas.balance}`,
      ];

      panasScores.forEach(score => {
        this.checkPageBreak(12);
        this.doc.text(score, this.margin + 5, this.currentY);
        this.currentY += 6;
      });

      this.currentY += 5;

      // GEW Scores
      this.checkPageBreak(25);
      this.doc.setFontSize(12);
      this.doc.setFont('helvetica', 'bold');
      this.doc.text('Geneva Emotion Wheel (GEW) Scores', this.margin, this.currentY);
      this.currentY += 8;

      this.doc.setFontSize(10);
      this.doc.setFont('helvetica', 'normal');

      const gewScores = [
        `Positive High Arousal: ${session.scores.gew.positiveHighArousal}`,
        `Positive Low Arousal: ${session.scores.gew.positiveLowArousal}`,
        `Negative Low Arousal: ${session.scores.gew.negativeLowArousal}`,
        `Negative High Arousal: ${session.scores.gew.negativeHighArousal}`,
      ];

      gewScores.forEach(score => {
        this.checkPageBreak(12);
        this.doc.text(score, this.margin + 5, this.currentY);
        this.currentY += 6;
      });

      this.currentY += 5;

      // Dimensional Scores
      this.checkPageBreak(25);
      this.doc.setFontSize(12);
      this.doc.setFont('helvetica', 'bold');
      this.doc.text('Dimensional Assessment Scores', this.margin, this.currentY);
      this.currentY += 8;

      this.doc.setFontSize(10);
      this.doc.setFont('helvetica', 'normal');

      const dimensionalScores = [
        `Valence (Pleasantness): ${session.scores.dimensional.valence}/9`,
        `Arousal (Activation): ${session.scores.dimensional.arousal}/9`,
        `Power (Control): ${session.scores.dimensional.power}/9`,
      ];

      dimensionalScores.forEach(score => {
        this.checkPageBreak(12);
        this.doc.text(score, this.margin + 5, this.currentY);
        this.currentY += 6;
      });
    });
  }

  /**
   * Add emotional insights section
   */
  private addEmotionalInsights(session: AssessmentSession): void {
    this.addSectionWithSpacing('Emotional Insights & Analysis', () => {
      this.doc.setFontSize(10);
      this.doc.setFont('helvetica', 'normal');

      // Dominant Patterns
      this.checkPageBreak(20);
      this.doc.setFontSize(11);
      this.doc.setFont('helvetica', 'bold');
      this.doc.text('Dominant Emotional Patterns:', this.margin, this.currentY);
      this.currentY += 6;

      session.insights.dominantPatterns.forEach(pattern => {
        this.checkPageBreak(15);
        this.doc.setFontSize(10);
        this.doc.setFont('helvetica', 'normal');
        this.doc.text(`• ${pattern}`, this.margin + 5, this.currentY);
        this.currentY += 6;
      });

      this.currentY += 5;

      // Emotional Balance
      this.checkPageBreak(20);
      this.doc.setFontSize(11);
      this.doc.setFont('helvetica', 'bold');
      this.doc.text('Emotional Balance:', this.margin, this.currentY);
      this.currentY += 6;

      this.checkPageBreak(15);
      this.doc.setFontSize(10);
      this.doc.setFont('helvetica', 'normal');
      const balanceDesc = this.getBalanceDescription(session.insights.emotionalBalance);
      this.doc.text(balanceDesc, this.margin + 5, this.currentY);
      this.currentY += 8;

      // Top Emotions
      this.checkPageBreak(20);
      this.doc.setFontSize(11);
      this.doc.setFont('helvetica', 'bold');
      this.doc.text('Top Emotions by Intensity:', this.margin, this.currentY);
      this.currentY += 6;

      session.insights.topEmotions.forEach(emotion => {
        this.checkPageBreak(12);
        this.doc.setFontSize(10);
        this.doc.setFont('helvetica', 'normal');
        this.doc.text(`• ${emotion.emotion}: ${emotion.intensity}/4`, this.margin + 5, this.currentY);
        this.currentY += 5;
      });
    });
  }

  /**
   * Add personalized recommendations
   */
  private addRecommendations(session: AssessmentSession): void {
    this.addSectionWithSpacing('Personalized Recommendations', () => {
      this.doc.setFontSize(10);
      this.doc.setFont('helvetica', 'normal');

      session.recommendations.forEach((rec, index) => {
        this.checkPageBreak(30);

        // Recommendation title
        this.doc.setFontSize(11);
        this.doc.setFont('helvetica', 'bold');
        this.doc.text(`${index + 1}. ${rec.title}`, this.margin, this.currentY);
        this.currentY += 6;

        // Priority indicator
        this.checkPageBreak(15);
        this.doc.setFontSize(9);
        this.doc.setFont('helvetica', 'italic');
        this.doc.text(`Priority: ${rec.priority.charAt(0).toUpperCase() + rec.priority.slice(1)}`, this.margin + 5, this.currentY);
        this.currentY += 5;

        // Description
        this.checkPageBreak(20);
        this.doc.setFontSize(10);
        this.doc.setFont('helvetica', 'normal');

        const wrappedDescription = this.wrapText(rec.description, this.pageWidth - (this.margin * 2));
        wrappedDescription.forEach(line => {
          this.checkPageBreak(12);
          this.doc.text(line, this.margin + 5, this.currentY);
          this.currentY += 5;
        });

        this.currentY += 5;
      });
    });
  }

  /**
   * Add trend analysis section
   */
  private addTrendAnalysisPlaceholder(): void {
    this.addSectionTitle('Trend Analysis & Progress');

    // Placeholder for trend analysis content
    this.doc.setFontSize(10);
    this.doc.setFont('helvetica', 'italic');
    this.doc.text('Trend analysis data is not yet available in this PDF version.', this.margin, this.currentY);
    this.currentY += 8;
    this.addSeparator();
  }

  /**
   * Add research foundation section
   */
  private addResearchFoundation(): void {
    this.addSectionTitle('Research Foundation');

    const researchInfo = [
      'This assessment is based on validated psychological research:',
      '',
      '• Geneva Emotion Wheel (GEW): Validated across 9+ languages, test-retest reliability r > .70',
      '• PANAS: Internal consistency α = .85-.90 (PA), .84-.87 (NA)',
      '• Circumplex Model: Empirically supported dimensional structure',
      '• Plutchik\'s Wheel: Evolutionary theory of 8 primary emotions',
      '',
      'Citations:',
      '• Geneva Emotion Wheel: Scherer et al. (2013)',
      '• PANAS: Watson, Clark & Tellegen (1988)',
      '• Circumplex Model: Russell (1980)',
      '• Plutchik\'s Wheel: Plutchik (1980)',
    ];

    researchInfo.forEach(line => {
      if (line === '') {
        this.currentY += 3;
      } else {
        this.doc.text(line, this.margin, this.currentY);
        this.currentY += 6;
      }
    });

    this.currentY += 10;
    this.addSeparator();
  }

  /**
   * Add footer with research citations and disclaimers
   */
  private addFooter(): void {
    this.checkPageBreak(50);

    this.addSeparator();
    this.currentY += 5;

    this.doc.setFontSize(9);
    this.doc.setFont('helvetica', 'italic');

    const footerText = [
      'Research Foundation & Citations:',
      '',
      '• Geneva Emotion Wheel (GEW): Scherer et al., 2013 - Validated emotion measurement instrument',
      '• PANAS Scales: Watson, Clark & Tellegen, 1988 - Positive and Negative Affect Schedule',
      '• Circumplex Model: Russell, 1980 - Dimensional emotion theory',
      '• Plutchik\'s Wheel: Plutchik, 1980 - Evolutionary emotion framework',
      '',
      'This assessment is designed for educational and self-reflection purposes.',
      'It is not a substitute for professional mental health evaluation or treatment.',
      'If you are experiencing significant emotional distress, please seek professional help.',
      '',
      'Report generated by Emotion Wheel Assessment System v2.0',
      `Generated on: ${format(new Date(), 'PPP')}`,
    ];

    footerText.forEach(line => {
      if (line === '') {
        this.currentY += 3;
      } else {
        this.checkPageBreak(10);
        this.doc.text(line, this.pageWidth / 2, this.currentY, { align: 'center' });
        this.currentY += 5;
      }
    });
  }

  /**
   * Add section title with formatting
   */
  private addSectionTitle(title: string): void {
    this.doc.setFontSize(14);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text(title, this.margin, this.currentY);
    this.currentY += 10;
  }

  /**
   * Add visual separator line
   */
  private addSeparator(): void {
    this.doc.setDrawColor(200, 200, 200);
    this.doc.line(this.margin, this.currentY, this.pageWidth - this.margin, this.currentY);
    this.currentY += 10;
  }

  /**
   * Format timeframe for display
   */
  private formatTimeframe(timeframe: string): string {
    const formats = {
      moment: 'Right Now (Current Moment)',
      today: 'Today',
      week: 'Past Week',
      general: 'In General',
    };
    return formats[timeframe as keyof typeof formats] || timeframe;
  }

  /**
   * Get emotional balance description
   */
  private getBalanceDescription(balance: string): string {
    const descriptions: Record<string, string> = {
      predominantly_positive: 'Your emotional state leans predominantly positive, suggesting good overall well-being.',
      balanced: 'Your emotional state shows a balanced mix of positive and challenging emotions, which is normal and healthy.',
      predominantly_negative: 'Your emotional state shows significant challenging emotions. Consider seeking support or practicing self-care.',
    };
    return descriptions[balance] || 'Emotional balance assessment not available.';
  }

  /**
   * Wrap text to fit page width
   */
  private wrapText(text: string, maxWidth: number): string[] {
    const words = text.split(' ');
    const lines: string[] = [];
    let currentLine = '';

    words.forEach(word => {
      const testLine = `${currentLine + word} `;
      const testWidth = this.doc.getTextWidth(testLine);

      if (testWidth > maxWidth && currentLine !== '') {
        lines.push(currentLine.trim());
        currentLine = `${word} `;
      } else {
        currentLine = testLine;
      }
    });

    if (currentLine.trim()) {
      lines.push(currentLine.trim());
    }

    return lines;
  }

  /**
   * Check if new page is needed and add one if necessary
   */
  private checkPageBreak(requiredHeight: number = 20): void {
    if (this.currentY + requiredHeight > this.maxContentHeight) {
      this.doc.addPage();
      this.currentY = 20;
    }
  }

  /**
   * Add section with proper spacing and page break checking
   */
  private addSectionWithSpacing(title: string, content: () => void): void {
    this.checkPageBreak(30);
    this.addSectionTitle(title);
    content();
    this.currentY += 10;
  }
}
