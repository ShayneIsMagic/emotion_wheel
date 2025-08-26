import { nanoid } from 'nanoid';
import { AssessmentInvite, ShareOptions } from '../types/assessment';

export class URLGenerator {
  private static readonly BASE_URL = window.location.origin;
  private static readonly URL_PREFIX = '/assessment';

  /**
   * Generate a unique assessment URL
   */
  static generateAssessmentURL(sessionId: string): string {
    const uniqueId = nanoid(12); // 12 character unique ID
    return `${this.BASE_URL}${this.URL_PREFIX}/${sessionId}/${uniqueId}`;
  }

  /**
   * Generate a shareable assessment invite
   */
  static generateAssessmentInvite(
    sessionId: string,
    options: ShareOptions,
    createdBy: string,
  ): AssessmentInvite {
    const uniqueId = nanoid(12);
    const shareUrl = `${this.BASE_URL}${this.URL_PREFIX}/${sessionId}/${uniqueId}`;

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + options.expiresInDays);

    return {
      id: uniqueId,
      sessionId,
      shareUrl,
      expiresAt,
      maxParticipants: options.maxParticipants,
      currentParticipants: 0,
      status: 'active',
      createdAt: new Date(),
      createdBy,
      instructions: options.customInstructions,
      customMessage: options.customMessage,
    };
  }

  /**
   * Parse assessment URL to extract session and participant IDs
   */
  static parseAssessmentURL(url: string): { sessionId: string; participantId: string } | null {
    try {
      const urlObj = new URL(url);
      const pathParts = urlObj.pathname.split('/');

      if (pathParts.length >= 4 && pathParts[1] === 'assessment') {
        return {
          sessionId: pathParts[2],
          participantId: pathParts[3],
        };
      }

      return null;
    } catch (error) {
      console.error('Error parsing assessment URL:', error);
      return null;
    }
  }

  /**
   * Generate a QR code URL for easy mobile sharing
   */
  static generateQRCodeURL(shareUrl: string): string {
    const qrService = 'https://api.qrserver.com/v1/create-qr-code/';
    const params = new URLSearchParams({
      size: '200x200',
      data: shareUrl,
      format: 'png',
    });

    return `${qrService}?${params.toString()}`;
  }

  /**
   * Generate a shortened URL (placeholder for URL shortening service)
   */
  static generateShortURL(shareUrl: string): string {
    // In a real implementation, you would integrate with a URL shortening service
    // For now, we'll create a shorter version using the session ID
    const urlParts = shareUrl.split('/');
    const sessionId = urlParts[urlParts.length - 2];
    const participantId = urlParts[urlParts.length - 1];

    return `${this.BASE_URL}/a/${sessionId}/${participantId}`;
  }

  /**
   * Validate if a share URL is still active
   */
  static isShareURLActive(invite: AssessmentInvite): boolean {
    if (invite.status !== 'active') {
      return false;
    }
    if (invite.expiresAt < new Date()) {
      return false;
    }
    if (invite.maxParticipants && invite.currentParticipants >= invite.maxParticipants) {
      return false;
    }

    return true;
  }

  /**
   * Generate social media sharing links
   */
  static generateSocialMediaLinks(shareUrl: string, title: string, description: string) {
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedTitle = encodeURIComponent(title);
    const encodedDescription = encodeURIComponent(description);

    return {
      twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`,
    };
  }

  /**
   * Generate embed code for websites
   */
  static generateEmbedCode(shareUrl: string, width: number = 600, height: number = 400): string {
    return `<iframe src="${shareUrl}" width="${width}" height="${height}" frameborder="0" allowfullscreen></iframe>`;
  }

  /**
   * Create a tracking pixel URL for analytics
   */
  static generateTrackingPixelURL(inviteId: string, action: 'view' | 'click' | 'complete'): string {
    const params = new URLSearchParams({
      invite: inviteId,
      action,
      timestamp: Date.now().toString(),
    });

    return `${this.BASE_URL}/track?${params.toString()}`;
  }
}
