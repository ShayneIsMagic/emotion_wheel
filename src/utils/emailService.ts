import { AssessmentSession } from '../types/emotion';
import { EmailTemplate, Participant } from '../types/assessment';

export class EmailService {
  private static readonly DEFAULT_SUBJECT = 'Your Emotional Assessment Results';
  private static readonly DEFAULT_BODY = `
    Thank you for completing the Emotional Assessment.
    
    Your results are attached as a PDF document.
    
    If you have any questions about your results, please don't hesitate to reach out.
    
    Best regards,
    The Assessment Team
  `;

  /**
   * Send assessment results via email
   */
  static async sendAssessmentResults(
    participant: Participant,
    results: AssessmentSession,
    template: EmailTemplate,
    pdfBlob?: Blob,
  ): Promise<boolean> {
    try {
      // In a real implementation, you would integrate with an email service
      // like SendGrid, Mailgun, or AWS SES

      const emailData = this.prepareEmailData(participant, results, template, pdfBlob);

      // Simulate email sending
      // Email data prepared for sending

      // For demo purposes, we'll simulate a successful email send
      await this.simulateEmailSend(emailData);

      return true;
    } catch (error) {
      console.error('Error sending email:', error);
      return false;
    }
  }

  /**
   * Prepare email data for sending
   */
  private static prepareEmailData(
    participant: Participant,
    results: AssessmentSession,
    template: EmailTemplate,
    pdfBlob?: Blob,
  ) {
    const subject = template.subject || this.DEFAULT_SUBJECT;
    let body = template.body || this.DEFAULT_BODY;

    // Personalize the email
    body = body.replace('{{name}}', participant.name);
    body = body.replace('{{email}}', participant.email);
    body = body.replace('{{completionDate}}', results.timestamp.toLocaleDateString());

    if (template.customMessage) {
      body += `\n\n${template.customMessage}`;
    }

    if (template.includeInstructions) {
      body += this.getResultsInterpretationGuide();
    }

    return {
      to: participant.email,
      subject,
      body,
      attachments: pdfBlob ? [{ filename: 'emotional_assessment_results.pdf', content: pdfBlob }] : [],
      html: this.convertToHTML(body),
    };
  }

  /**
   * Convert plain text to HTML
   */
  private static convertToHTML(text: string): string {
    return text
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .map(line => `<p>${line}</p>`)
      .join('');
  }

  /**
   * Get results interpretation guide
   */
  private static getResultsInterpretationGuide(): string {
    return `
    
    Results Interpretation Guide:
    
    Positive Affect (PA) Score:
    - 10-25: Below average positive emotions
    - 26-35: Average positive emotions
    - 36-50: Above average positive emotions
    
    Negative Affect (NA) Score:
    - 10-25: Below average negative emotions
    - 26-35: Average negative emotions
    - 36-50: Above average negative emotions
    
    Emotional Balance:
    - PA > NA: Predominantly positive emotional state
    - PA ≈ NA: Balanced emotional state
    - PA < NA: Predominantly negative emotional state
    
    Note: These scores are for educational purposes only and should not be used as medical advice.
    `;
  }

  /**
   * Simulate email sending (replace with real email service)
   */
  private static async simulateEmailSend(_emailData: any): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Email sent successfully
        resolve();
      }, 1000);
    });
  }

  /**
   * Send bulk assessment results
   */
  static async sendBulkAssessmentResults(
    participants: Participant[],
    results: AssessmentSession[],
    template: EmailTemplate,
  ): Promise<{ success: number; failed: number }> {
    let success = 0;
    let failed = 0;

    for (let i = 0; i < participants.length; i++) {
      const participant = participants[i];
      const result = results[i];

      if (result) {
        const sent = await this.sendAssessmentResults(participant, result, template);
        if (sent) {
          success++;
        } else {
          failed++;
        }

        // Add delay between emails to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }

    return { success, failed };
  }

  /**
   * Send reminder emails to participants who haven't completed
   */
  static async sendReminderEmails(
    participants: Participant[],
    template: EmailTemplate,
  ): Promise<{ success: number; failed: number }> {
    const incompleteParticipants = participants.filter(p => p.status !== 'completed');

    let success = 0;
    let failed = 0;

    for (const participant of incompleteParticipants) {
      const reminderTemplate: EmailTemplate = {
        ...template,
        subject: `Reminder: ${template.subject}`,
        body: `Hi ${participant.name},\n\nThis is a friendly reminder to complete your emotional assessment.\n\n${template.body}`,
      };

      const sent = await this.sendAssessmentResults(participant, {} as AssessmentSession, reminderTemplate);
      if (sent) {
        success++;
      } else {
        failed++;
      }

      await new Promise(resolve => setTimeout(resolve, 100));
    }

    return { success, failed };
  }

  /**
   * Generate email templates for different scenarios
   */
  static getEmailTemplates(): Record<string, EmailTemplate> {
    return {
      default: {
        subject: 'Your Emotional Assessment Results',
        body: 'Thank you for completing the Emotional Assessment. Your results are attached.',
        includePDF: true,
        includeInstructions: true,
      },
      reminder: {
        subject: 'Reminder: Complete Your Emotional Assessment',
        body: 'You haven\'t completed your emotional assessment yet. Please take a few minutes to complete it.',
        includePDF: false,
        includeInstructions: false,
      },
      followUp: {
        subject: 'Follow-up: Your Emotional Assessment Results',
        body: 'Here are your emotional assessment results. We hope this helps with your emotional well-being journey.',
        includePDF: true,
        includeInstructions: true,
      },
      research: {
        subject: 'Research Study: Emotional Assessment Results',
        body: 'Thank you for participating in our research study. Your assessment results are attached.',
        includePDF: true,
        includeInstructions: false,
      },
    };
  }
}
