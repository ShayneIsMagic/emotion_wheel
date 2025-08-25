import React, { useState } from 'react';
import { User, Mail, ArrowRight } from 'lucide-react';
import { AssessmentSessionConfig } from '../types/assessment';
import { toast } from 'react-hot-toast';

interface ParticipantEntryProps {
  sessionConfig: AssessmentSessionConfig;
  onParticipantEntered: (participant: { name: string; email: string }) => void;
}

const ParticipantEntry: React.FC<ParticipantEntryProps> = ({ sessionConfig, onParticipantEntered }) => {
  const [participantInfo, setParticipantInfo] = useState({
    name: '',
    email: ''
  });
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!participantInfo.name.trim()) {
      toast.error('Please enter your name');
      return;
    }
    
    if (sessionConfig.requireEmail && !participantInfo.email.trim()) {
      toast.error('Please enter your email address');
      return;
    }
    
    if (sessionConfig.requireEmail && !isValidEmail(participantInfo.email)) {
      toast.error('Please enter a valid email address');
      return;
    }
    
    if (!agreedToTerms) {
      toast.error('Please agree to the terms and conditions');
      return;
    }
    
    onParticipantEntered(participantInfo);
    toast.success('Welcome! You can now begin your assessment.');
  };

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {sessionConfig.title}
          </h1>
          <p className="text-gray-600 text-sm">
            {sessionConfig.description}
          </p>
        </div>

        <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="font-semibold text-blue-800 mb-2">Assessment Information</h3>
          <div className="text-sm text-blue-700 space-y-1">
            <p><strong>Timeframe:</strong> {sessionConfig.timeframe}</p>
            <p><strong>Estimated Time:</strong> 15-20 minutes</p>
            {sessionConfig.maxParticipants && (
              <p><strong>Max Participants:</strong> {sessionConfig.maxParticipants}</p>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <User className="w-4 h-4 inline mr-2" />
              Your Name *
            </label>
            <input
              type="text"
              value={participantInfo.name}
              onChange={(e) => setParticipantInfo(prev => ({ ...prev, name: e.target.value }))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your full name"
              required
            />
          </div>

          {sessionConfig.requireEmail && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Mail className="w-4 h-4 inline mr-2" />
                Email Address *
              </label>
              <input
                type="email"
                value={participantInfo.email}
                onChange={(e) => setParticipantInfo(prev => ({ ...prev, email: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your email address"
                required
              />
              {sessionConfig.autoEmailResults && (
                <p className="text-xs text-gray-500 mt-1">
                  Your results will be automatically emailed to this address
                </p>
              )}
            </div>
          )}

          <div className="space-y-3">
            <label className="flex items-start space-x-3">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                required
              />
              <div className="text-sm text-gray-700">
                <p>I agree to the <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a></p>
                <p className="text-xs text-gray-500 mt-1">
                  This assessment is for educational purposes only and is not medical advice
                </p>
              </div>
            </label>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <span>Begin Assessment</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-700 mb-2">What to Expect</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• 6 assessment phases with clear instructions</li>
            <li>• Comprehensive emotional evaluation</li>
            <li>• Personalized insights and recommendations</li>
            <li>• PDF report with your results</li>
            <li>• Option to email results to yourself</li>
          </ul>
        </div>

        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            Your responses are confidential and stored locally on your device
          </p>
        </div>
      </div>
    </div>
  );
};

export default ParticipantEntry;
