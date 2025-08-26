import React, { useState } from 'react';
import {
  Share2,
  Copy,
  QrCode,
  Link,
  Users,
  Download,
} from 'lucide-react';
import { URLGenerator } from '../utils/urlGenerator';
import { ShareOptions, AssessmentInvite, AssessmentSessionConfig } from '../types/assessment';
import { toast } from 'react-hot-toast';

interface AssessmentSessionManagerProps {
  onSessionCreated: (_config: AssessmentSessionConfig) => void;
}

const AssessmentSessionManager: React.FC<AssessmentSessionManagerProps> = ({ onSessionCreated }) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [currentInvite, setCurrentInvite] = useState<AssessmentInvite | null>(null);

  const [sessionConfig, setSessionConfig] = useState<Partial<AssessmentSessionConfig>>({
    title: '',
    description: '',
    timeframe: 'week',
    allowAnonymous: false,
    requireEmail: true,
    requireName: true,
    autoEmailResults: true,
    maxParticipants: 100,
    expiresInDays: 30,
  });

  const handleCreateSession = () => {
    if (!sessionConfig.title || !sessionConfig.description) {
      toast.error('Please fill in all required fields');
      return;
    }

    const config: AssessmentSessionConfig = {
      id: `session_${Date.now()}`,
      title: sessionConfig.title!,
      description: sessionConfig.description!,
      timeframe: sessionConfig.timeframe!,
      allowAnonymous: sessionConfig.allowAnonymous!,
      requireEmail: sessionConfig.requireEmail!,
      requireName: sessionConfig.requireName!,
      autoEmailResults: sessionConfig.autoEmailResults!,
      customInstructions: sessionConfig.customInstructions,
      maxParticipants: sessionConfig.maxParticipants,
      expiresInDays: sessionConfig.expiresInDays!,
      createdBy: 'current_user',
      createdAt: new Date(),
      isActive: true,
    };

    onSessionCreated(config);
    setShowCreateForm(false);
  };

  const [_shareOptions] = useState<ShareOptions>({
    method: 'url',
    expiresInDays: 30,
    maxParticipants: 100,
    requireEmail: true,
    requireName: true,
    autoEmailResults: true,
    customMessage: '',
    customInstructions: '',
  });

  const handleGenerateInvite = () => {
    if (!sessionConfig.id) {
      toast.error('Please create a session first');
      return;
    }

    const invite = URLGenerator.generateAssessmentInvite(
      sessionConfig.id,
      _shareOptions,
      'current_user',
    );

    setCurrentInvite(invite);
    setShowShareOptions(true);
    toast.success('Shareable link generated!');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const generateQRCode = () => {
    if (!currentInvite) {return;}

    const qrUrl = URLGenerator.generateQRCodeURL(currentInvite.shareUrl);
    window.open(qrUrl, '_blank');
  };

  const generateSocialLinks = () => {
    if (!currentInvite) {return {};}

    const socialLinks = URLGenerator.generateSocialMediaLinks(
      currentInvite.shareUrl,
      sessionConfig.title || 'Emotional Assessment',
      sessionConfig.description || 'Take this comprehensive emotional assessment',
    );

    return socialLinks;
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Assessment Session Manager
        </h1>

        {/* Create Session Form */}
        {!showCreateForm ? (
          <div className="text-center">
            <button
              onClick={() => setShowCreateForm(true)}
              className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg"
            >
              Create New Assessment Session
            </button>
            <p className="text-gray-600 mt-4">
              Create a shareable assessment session that multiple people can access
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-700">Create Assessment Session</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Session Title *
                </label>
                <input
                  type="text"
                  value={sessionConfig.title}
                  onChange={(e) => setSessionConfig(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Team Wellness Assessment"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Timeframe
                </label>
                <select
                  value={sessionConfig.timeframe}
                  onChange={(e) => setSessionConfig(prev => ({ ...prev, timeframe: e.target.value as any }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="moment">Right Now</option>
                  <option value="today">Today</option>
                  <option value="week">Past Week</option>
                  <option value="general">In General</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                value={sessionConfig.description}
                onChange={(e) => setSessionConfig(prev => ({ ...prev, description: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
                placeholder="Describe the purpose and context of this assessment..."
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max Participants
                </label>
                <input
                  type="number"
                  value={sessionConfig.maxParticipants}
                  onChange={(e) => setSessionConfig(prev => ({ ...prev, maxParticipants: parseInt(e.target.value) }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="1"
                  max="1000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expires In (Days)
                </label>
                <input
                  type="number"
                  value={sessionConfig.expiresInDays}
                  onChange={(e) => setSessionConfig(prev => ({ ...prev, expiresInDays: parseInt(e.target.value) }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="1"
                  max="365"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-700">Session Settings</h3>

              <div className="space-y-3">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={sessionConfig.allowAnonymous}
                    onChange={(e) => setSessionConfig(prev => ({ ...prev, allowAnonymous: e.target.checked }))}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Allow anonymous participation</span>
                </label>

                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={sessionConfig.requireEmail}
                    onChange={(e) => setSessionConfig(prev => ({ ...prev, requireEmail: e.target.checked }))}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Require email address</span>
                </label>

                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={sessionConfig.requireName}
                    onChange={(e) => setSessionConfig(prev => ({ ...prev, requireName: e.target.checked }))}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Require participant name</span>
                </label>

                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={sessionConfig.autoEmailResults}
                    onChange={(e) => setSessionConfig(prev => ({ ...prev, autoEmailResults: e.target.checked }))}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Automatically email results</span>
                </label>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={handleCreateSession}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Create Session
              </button>
              <button
                onClick={() => setShowCreateForm(false)}
                className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Share Options */}
        {showShareOptions && currentInvite && (
          <div className="mt-8 p-6 bg-gray-50 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Share Your Assessment</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Shareable Link
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={currentInvite.shareUrl}
                    readOnly
                    className="flex-1 p-3 border border-gray-300 rounded-lg bg-gray-100"
                  />
                  <button
                    onClick={() => copyToClipboard(currentInvite.shareUrl)}
                    className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <button
                  onClick={generateQRCode}
                  className="flex items-center justify-center space-x-2 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <QrCode className="w-4 h-4" />
                  <span>Generate QR Code</span>
                </button>

                <button
                  onClick={() => copyToClipboard(URLGenerator.generateShortURL(currentInvite.shareUrl))}
                  className="flex items-center justify-center space-x-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Link className="w-4 h-4" />
                  <span>Copy Short URL</span>
                </button>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-medium text-gray-700">Social Sharing</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                  {Object.entries(generateSocialLinks()).map(([platform, url]) => (
                    <a
                      key={platform}
                      href={url as string}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center space-x-2 px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm"
                    >
                      <span className="capitalize">{platform}</span>
                    </a>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t">
                <button
                  onClick={() => setShowShareOptions(false)}
                  className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Session Actions */}
        {sessionConfig.id && !showShareOptions && (
          <div className="mt-8 p-6 bg-blue-50 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Session Actions</h2>

            <div className="grid md:grid-cols-3 gap-4">
              <button
                onClick={handleGenerateInvite}
                className="flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span>Generate Share Link</span>
              </button>

              <button
                onClick={() => {/* View participants */}}
                className="flex items-center justify-center space-x-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Users className="w-4 h-4" />
                <span>View Participants</span>
              </button>

              <button
                onClick={() => {/* Download results */}}
                className="flex items-center justify-center space-x-2 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Download Results</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssessmentSessionManager;
