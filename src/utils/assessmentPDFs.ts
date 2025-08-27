import jsPDF from 'jspdf';
import { format } from 'date-fns';

export class AssessmentPDFGenerator {
  private doc: jsPDF;
  private currentY: number = 20;
  private pageWidth: number = 595.28; // A4 width in points
  private margin: number = 20;
  private maxContentHeight: number = 800;

  constructor() {
    this.doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'A4',
    });
  }

  /**
   * Generate Integrated Personality Assessment PDF
   */
  generateIntegratedPersonalityAssessment(): jsPDF {
    this.addHeader('Integrated Personality Assessment', 'CliftonStrengths + HEXACO Integration');

    this.addSection('Assessment Overview', [
      'This assessment integrates emotional patterns with personality frameworks:',
      '• CliftonStrengths 34 domains',
      '• HEXACO personality factors',
      '• Plutchik emotion wheel integration',
      '• Emotional pattern analysis',
    ]);

    this.addSection('Instructions', [
      '1. Complete each section honestly and thoughtfully',
      '2. Rate emotions on a 1-5 scale (1=Not at all, 5=Extremely)',
      '3. Consider your experiences over the specified timeframe',
      '4. Be consistent in your ratings across all sections',
    ]);

    this.addSection('Section 1: CliftonStrengths Emotional Patterns', [
      'Rate how much you experience each emotion in relation to your strengths:',
      '',
      'Executing Domain:',
      '□ Determined (Anticipation Level 3) □ Focused (Anticipation Level 4)',
      '□ Driven (Anticipation Level 3) □ Motivated (Anticipation Level 3)',
      '□ Persistent (Anticipation Level 4) □ Accomplished (Joy Level 3)',
      '',
      'Influencing Domain:',
      '□ Confident (Trust Level 4) □ Enthusiastic (Joy Level 4)',
      '□ Inspiring (Joy Level 4) □ Persuasive (Trust Level 3)',
      '□ Relator (Trust Level 4) □ Woo (Joy Level 3)',
      '',
      'Relationship Building Domain:',
      '□ Empathetic (Trust Level 4) □ Harmonious (Trust Level 3)',
      '□ Inclusive (Trust Level 4) □ Developer (Trust Level 4)',
      '□ Connectedness (Trust Level 4) □ Relator (Trust Level 4)',
      '',
      'Strategic Thinking Domain:',
      '□ Analytical (Anticipation Level 3) □ Futuristic (Anticipation Level 4)',
      '□ Strategic (Anticipation Level 4) □ Learner (Anticipation Level 4)',
      '□ Intellection (Anticipation Level 3) □ Context (Trust Level 3)',
    ]);

    this.addSection('Section 2: HEXACO Emotional Patterns', [
      'Rate emotions associated with each HEXACO factor:',
      '',
      'Honesty-Humility:',
      '□ Sincere (Trust Level 3) □ Fair (Trust Level 4)',
      '□ Modest (Trust Level 3) □ Greed-avoidant (Trust Level 3)',
      '',
      'Emotionality:',
      '□ Fearful (Fear Level 3) □ Anxious (Fear Level 4)',
      '□ Dependent (Trust Level 2) □ Sentimental (Joy Level 3)',
      '',
      'Extraversion:',
      '□ Social (Joy Level 4) □ Lively (Joy Level 4)',
      '□ Active (Joy Level 3) □ Carefree (Joy Level 3)',
      '',
      'Agreeableness:',
      '□ Forgiving (Trust Level 4) □ Gentle (Trust Level 3)',
      '□ Flexible (Trust Level 3) □ Patient (Trust Level 3)',
      '',
      'Conscientiousness:',
      '□ Organized (Trust Level 3) □ Diligent (Trust Level 4)',
      '□ Perfectionist (Trust Level 3) □ Prudent (Trust Level 3)',
      '',
      'Openness to Experience:',
      '□ Curious (Anticipation Level 4) □ Imaginative (Anticipation Level 4)',
      '□ Creative (Joy Level 3) □ Unconventional (Anticipation Level 3)',
    ]);

    this.addSection('Scoring System', [
      'Emotion Intensity Levels:',
      '• Level 1 (1 point): Subtle, barely noticeable',
      '• Level 2 (2 points): Mild, occasionally present',
      '• Level 3 (3 points): Moderate, regularly experienced',
      '• Level 4 (4 points): Strong, frequently felt',
      '• Level 5 (5 points): Intense, dominant emotion',
      '',
      'Plutchik Family Scoring:',
      '• Joy Family: Positive high-energy emotions',
      '• Trust Family: Social bonding emotions',
      '• Fear Family: Protective response emotions',
      '• Surprise Family: Novelty response emotions',
      '• Sadness Family: Loss processing emotions',
      '• Disgust Family: Rejection response emotions',
      '• Anger Family: Obstacle overcoming emotions',
      '• Anticipation Family: Future-oriented emotions',
    ]);

    this.addSection('Score Interpretation', [
      'Overall Emotional Balance:',
      '• 0-50: Low emotional awareness',
      '• 51-100: Developing emotional intelligence',
      '• 101-150: Good emotional awareness',
      '• 151-200: High emotional intelligence',
      '• 201+: Exceptional emotional sophistication',
      '',
      'Integration Scores:',
      '• CliftonStrengths Integration: How well emotions align with strengths',
      '• HEXACO Integration: Personality-emotion congruence',
      '• Plutchik Balance: Emotional diversity and intensity',
      '• Combination Emotions: Complex emotional patterns',
    ]);

    this.addSection('Implications & Applications', [
      'Leadership Development:',
      '• Use emotional patterns to enhance leadership effectiveness',
      '• Leverage strength-emotion alignment for team motivation',
      '• Develop emotional intelligence in decision-making',
      '',
      'Personal Growth:',
      '• Identify emotional blind spots and growth areas',
      '• Build on emotional strengths for personal development',
      '• Create balanced emotional responses to challenges',
      '',
      'Professional Applications:',
      '• Team building and conflict resolution',
      '• Customer relationship management',
      '• Stress management and resilience building',
      '• Communication effectiveness improvement',
    ]);

    this.addFooter();
    return this.doc;
  }

  /**
   * Generate Clinical Emotional Assessment PDF
   */
  generateClinicalEmotionalAssessment(): jsPDF {
    this.addHeader('Clinical Emotional Assessment', 'For Licensed Mental Health Professionals');

    this.addSection('Clinical Assessment Overview', [
      'This assessment provides granular emotional analysis for clinical practice:',
      '• 8 primary emotion families with 5 intensity levels',
      '• Combination emotion detection and analysis',
      '• Clinical interpretation guidelines',
      '• Treatment planning recommendations',
    ]);

    this.addSection('Professional Use Guidelines', [
      '• Use only with appropriate clinical training and licensure',
      '• Combine with clinical judgment and other assessment tools',
      '• Consider cultural and individual differences',
      '• Use results as part of comprehensive clinical evaluation',
      '• Maintain appropriate documentation and confidentiality',
    ]);

    this.addSection('Emotion Inventory - Joy Family', [
      'Rate each emotion on a 1-5 scale:',
      '',
      'Level 1 - Serenity:',
      '□ Calm □ Peaceful □ Content □ Tranquil □ Serene',
      '',
      'Level 2 - Pleasure:',
      '□ Pleased □ Comfortable □ Satisfied □ Gratified □ At ease',
      '',
      'Level 3 - Joy:',
      '□ Happy □ Cheerful □ Delighted □ Glad □ Joyful',
      '',
      'Level 4 - Elation:',
      '□ Excited □ Thrilled □ Exhilarated □ Jubilant □ Enthusiastic',
      '',
      'Level 5 - Ecstasy:',
      '□ Blissful □ Euphoric □ Rapturous □ Transported □ Ecstatic',
      '',
      'Combination Emotions (if applicable):',
      '□ Love (Joy + Trust) □ Optimism (Joy + Anticipation) □ Delight (Joy + Surprise)',
    ]);

    this.addSection('Emotion Inventory - Trust Family', [
      'Level 1 - Acceptance:',
      '□ Open □ Receptive □ Welcoming □ Approachable □ Accepting',
      '',
      'Level 2 - Trust:',
      '□ Confident □ Secure □ Assured □ Reliable □ Trusting',
      '',
      'Level 3 - Admiration:',
      '□ Respectful □ Appreciative □ Grateful □ Thankful □ Admiring',
      '',
      'Level 4 - Devotion:',
      '□ Committed □ Dedicated □ Loyal □ Faithful □ Devoted',
      '',
      'Level 5 - Reverence:',
      '□ Worshipful □ Reverent □ Awed □ Venerating □ Reverent',
    ]);

    this.addSection('Clinical Scoring System', [
      'Intensity Level Scoring:',
      '• Level 1 (1 point): Minimal emotional response',
      '• Level 2 (2 points): Mild emotional response',
      '• Level 3 (3 points): Moderate emotional response',
      '• Level 4 (4 points): Strong emotional response',
      '• Level 5 (5 points): Intense emotional response',
      '',
      'Family Granularity Scores:',
      '• 0-1: Limited emotional differentiation',
      '• 2-3: Developing emotional awareness',
      '• 4-5: High emotional granularity',
      '',
      'Combination Emotion Analysis:',
      '• Primary combinations: Two-emotion patterns',
      '• Secondary combinations: Three-emotion patterns',
      '• Clinical significance indicators',
    ]);

    this.addSection('Clinical Interpretation Guidelines', [
      'Emotional Granularity Assessment:',
      '• High granularity: Good emotional differentiation',
      '• Low granularity: May indicate emotional suppression or alexithymia',
      '• Family imbalances: Potential areas for therapeutic focus',
      '',
      'Intensity Distribution Analysis:',
      '• Peak-heavy (Levels 4-5): High emotional reactivity',
      '• Low-only (Levels 1-2): Emotional suppression or depression',
      '• Balanced distribution: Healthy emotional range',
      '',
      'Combination Emotion Clinical Significance:',
      '• Love (Joy + Trust): Healthy attachment patterns',
      '• Anxiety (Fear + Anticipation): Worry and apprehension',
      '• Contempt (Disgust + Anger): Hostility and rejection',
      '• Hope (Anticipation + Joy): Positive future orientation',
    ]);

    this.addSection('Treatment Planning Considerations', [
      'Emotional Regulation Strategies:',
      '• Mindfulness and emotional awareness training',
      '• Cognitive behavioral techniques for intensity management',
      '• Dialectical behavior therapy skills for emotional balance',
      '',
      'Therapeutic Focus Areas:',
      '• Family-specific emotional processing',
      '• Combination emotion exploration and understanding',
      '• Intensity level management and balance',
      '• Emotional granularity development',
      '',
      'Progress Monitoring:',
      '• Regular reassessment of emotional patterns',
      '• Tracking changes in intensity distribution',
      '• Monitoring combination emotion development',
      '• Assessing therapeutic intervention effectiveness',
    ]);

    this.addFooter();
    return this.doc;
  }

  /**
   * Generate Unfiltered Scoring Assessment PDF
   */
  generateUnfilteredScoringAssessment(): jsPDF {
    this.addHeader('Unfiltered Scoring Assessment', 'Raw Mathematical Scoring Framework');

    this.addSection('Assessment Framework Overview', [
      'This assessment provides unfiltered, data-driven emotional analysis:',
      '• 8 primary emotion families with mathematical scoring',
      '• 24 combination emotions with point values',
      '• Raw quantitative analysis without clinical interpretation',
      '• Mathematical pattern recognition and scoring',
    ]);

    this.addSection('Mathematical Scoring System', [
      'Primary Emotion Scoring:',
      '• Each emotion family: 1-5 point scale per level',
      '• Maximum per family: 25 points (5 levels × 5 points)',
      '• Total possible score: 200 points (8 families × 25 points)',
      '',
      'Combination Emotion Scoring:',
      '• Primary combinations: 6 points (3 + 3)',
      '• Secondary combinations: 9 points (3 + 3 + 3)',
      '• Bonus points for combination detection: +1 point',
      '',
      'Intensity Level Point Values:',
      '• Level 1: 1 point (Serenity, Acceptance, Apprehension, Distraction, Pensiveness, Boredom, Annoyance, Interest)',
      '• Level 2: 2 points (Pleasure, Trust, Fear, Surprise, Sadness, Disgust, Anger, Anticipation)',
      '• Level 3: 3 points (Joy, Admiration, Terror, Amazement, Grief, Loathing, Rage, Vigilance)',
      '• Level 4: 4 points (Elation, Devotion, Panic, Astonishment, Sorrow, Revulsion, Fury, Awareness)',
      '• Level 5: 5 points (Ecstasy, Reverence, Horror, Wonder, Despair, Aversion, Wrath, Anticipation)',
    ]);

    this.addSection('Emotion Family Scoring Tables', [
      'Joy Family (Yellow - 0°):',
      '| Level | Emotion | Score | Description |',
      '|-------|---------|-------|-------------|',
      '| 1 | Serenity | 1 | Calm, peaceful, content, tranquil |',
      '| 2 | Pleasure | 2 | Pleased, comfortable, satisfied, gratified |',
      '| 3 | Joy | 3 | Happy, cheerful, delighted, glad |',
      '| 4 | Elation | 4 | Excited, thrilled, exhilarated, jubilant |',
      '| 5 | Ecstasy | 5 | Blissful, euphoric, rapturous, transported |',
      '',
      'Trust Family (Blue - 45°):',
      '| Level | Emotion | Score | Description |',
      '|-------|---------|-------|-------------|',
      '| 1 | Acceptance | 1 | Open, receptive, welcoming, approachable |',
      '| 2 | Trust | 2 | Confident, secure, assured, reliable |',
      '| 3 | Admiration | 3 | Respectful, appreciative, grateful, thankful |',
      '| 4 | Devotion | 4 | Committed, dedicated, loyal, faithful |',
      '| 5 | Reverence | 5 | Worshipful, reverent, awed, venerating',
    ]);

    this.addSection('Combination Emotion Scoring', [
      'Primary Combinations (6 points each):',
      '• Love = Joy (3) + Trust (3) = 6 points',
      '• Optimism = Joy (3) + Anticipation (3) = 6 points',
      '• Delight = Joy (3) + Surprise (3) = 6 points',
      '• Submission = Trust (3) + Fear (3) = 6 points',
      '• Friendliness = Trust (3) + Joy (3) = 6 points',
      '• Awe = Fear (3) + Surprise (3) = 6 points',
      '• Anxiety = Fear (3) + Anticipation (3) = 6 points',
      '• Disappointment = Surprise (3) + Sadness (3) = 6 points',
      '• Interest = Anticipation (3) + Trust (3) = 6 points',
      '• Remorse = Sadness (3) + Disgust (3) = 6 points',
      '• Jealousy = Sadness (3) + Anger (3) = 6 points',
      '• Contempt = Disgust (3) + Anger (3) = 6 points',
      '• Aggressiveness = Anger (3) + Anticipation (3) = 6 points',
      '• Dread = Anticipation (3) + Fear (3) = 6 points',
    ]);

    this.addSection('Mathematical Analysis Framework', [
      'Overall Profile Calculation:',
      '• Primary emotion scores: Sum of all family scores',
      '• Combination emotion scores: Sum of detected combinations',
      '• Granularity scores: Number of emotions rated per family',
      '• Maximum possible score: 250 points',
      '',
      'Pattern Recognition Metrics:',
      '• Family dominance: Which emotion families score highest',
      '• Intensity distribution: Spread across intensity levels',
      '• Combination sophistication: Number of combination emotions detected',
      '• Emotional balance: Distribution across positive/negative families',
      '',
      'Statistical Analysis:',
      '• Percentile rankings for each scoring category',
      '• Standard deviation analysis for emotional consistency',
      '• Correlation analysis between emotion families',
      '• Trend analysis for longitudinal assessment',
    ]);

    this.addSection('Score Interpretation & Implications', [
      'Quantitative Score Ranges:',
      '• 0-50: Limited emotional expression',
      '• 51-100: Basic emotional awareness',
      '• 101-150: Moderate emotional sophistication',
      '• 151-200: High emotional complexity',
      '• 201-250: Exceptional emotional sophistication',
      '',
      'Mathematical Pattern Implications:',
      '• High family scores: Strong emotional patterns in specific areas',
      '• Low family scores: Underdeveloped emotional areas',
      '• High combination scores: Complex emotional processing',
      '• Balanced distribution: Emotional flexibility and adaptability',
      '',
      'Data-Driven Insights:',
      '• Objective emotional measurement without subjective interpretation',
      '• Quantitative tracking of emotional development over time',
      '• Statistical comparison with population norms',
      '• Mathematical validation of emotional patterns',
    ]);

    this.addFooter();
    return this.doc;
  }

  private addHeader(title: string, subtitle: string): void {
    this.doc.setFontSize(24);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text(title, this.pageWidth / 2, this.currentY, { align: 'center' });
    this.currentY += 15;

    this.doc.setFontSize(14);
    this.doc.setFont('helvetica', 'normal');
    this.doc.text(subtitle, this.pageWidth / 2, this.currentY, { align: 'center' });
    this.currentY += 20;

    this.doc.setFontSize(10);
    this.doc.text(`Generated: ${format(new Date(), 'PPP')}`, this.margin, this.currentY);
    this.currentY += 15;
  }

  private addSection(title: string, content: string[]): void {
    this.checkPageBreak(30);

    this.doc.setFontSize(14);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text(title, this.margin, this.currentY);
    this.currentY += 10;

    this.doc.setFontSize(10);
    this.doc.setFont('helvetica', 'normal');

    content.forEach(line => {
      this.checkPageBreak(8);
      this.doc.text(line, this.margin, this.currentY);
      this.currentY += 6;
    });

    this.currentY += 10;
  }

  private checkPageBreak(requiredHeight: number): void {
    if (this.currentY + requiredHeight > this.maxContentHeight) {
      this.doc.addPage();
      this.currentY = 20;
    }
  }

  private addFooter(): void {
    this.checkPageBreak(20);

    this.doc.setFontSize(8);
    this.doc.setFont('helvetica', 'italic');
    this.doc.text('This assessment is for educational and self-reflection purposes.', this.margin, this.currentY);
    this.currentY += 5;
    this.doc.text('For clinical use, consult with licensed mental health professionals.', this.margin, this.currentY);
  }
}
