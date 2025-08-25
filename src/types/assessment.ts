import { AssessmentSession, TimeFrame } from './emotion';

export interface AssessmentInvite {
  id: string;
  sessionId: string;
  participantEmail?: string;
  participantName?: string;
  shareUrl: string;
  expiresAt: Date;
  maxParticipants?: number;
  currentParticipants: number;
  status: 'active' | 'completed' | 'expired';
  createdAt: Date;
  createdBy: string;
  instructions?: string;
  customMessage?: string;
}

export interface Participant {
  id: string;
  sessionId: string;
  email: string;
  name: string;
  startedAt?: Date;
  completedAt?: Date;
  assessmentData?: AssessmentSession;
  status: 'invited' | 'started' | 'completed' | 'abandoned';
  lastActivity: Date;
}

export interface AssessmentSessionConfig {
  id: string;
  title: string;
  description: string;
  timeframe: TimeFrame;
  allowAnonymous: boolean;
  requireEmail: boolean;
  requireName: boolean;
  autoEmailResults: boolean;
  customInstructions?: string;
  maxParticipants?: number;
  expiresInDays: number;
  createdBy: string;
  createdAt: Date;
  isActive: boolean;
}

export interface EmailTemplate {
  subject: string;
  body: string;
  includePDF: boolean;
  includeInstructions: boolean;
  customMessage?: string;
}

export interface AssessmentResults {
  sessionId: string;
  participantId: string;
  results: AssessmentSession;
  pdfUrl?: string;
  sharedAt: Date;
  emailSent?: boolean;
  emailSentAt?: Date;
}

export interface ShareOptions {
  method: 'url' | 'email' | 'both';
  expiresInDays: number;
  maxParticipants?: number;
  requireEmail: boolean;
  requireName: boolean;
  autoEmailResults: boolean;
  customMessage?: string;
  customInstructions?: string;
}
