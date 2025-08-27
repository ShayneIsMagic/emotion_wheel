import React, { useState } from 'react';
import { UserCheck, Brain, Calculator, ArrowRight, Home, Download, Heart } from 'lucide-react';
import PlutchikEmotionWheelAssessment from './PlutchikEmotionWheelAssessment';
import IntegratedPersonalityAssessment from './IntegratedPersonalityAssessment';
import ClinicalEmotionalAssessment from './ClinicalEmotionalAssessment';
import UnfilteredScoringAssessment from './UnfilteredScoringAssessment';
import AssessmentPDFDownloader from './AssessmentPDFDownloader';

type AssessmentType = 'hub' | 'emotion-wheel' | 'integrated' | 'clinical' | 'unfiltered' | 'pdfs';

const AssessmentHub: React.FC = () => {
  const [currentAssessment, setCurrentAssessment] = useState<AssessmentType>('hub');

  const renderHub = () => (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg p-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">Emotion Wheel Assessment Hub</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from our comprehensive emotional assessment frameworks designed for different purposes and professional needs.
          </p>
        </div>

        {/* Assessment Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Plutchik Emotion Wheel Assessment - MAIN ASSESSMENT */}
          <div className="bg-gradient-to-br from-red-50 to-pink-100 rounded-xl p-8 border border-red-200 hover:shadow-xl transition-all duration-300 md:col-span-2 lg:col-span-1">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-red-800 mb-2">Plutchik Emotion Wheel</h3>
              <p className="text-red-600 font-medium">Core Assessment Framework</p>
              <div className="mt-2 bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full">
                RECOMMENDED STARTING POINT
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <p className="text-red-700 text-sm">• 8 primary emotion families × 5 intensity levels</p>
              <p className="text-red-700 text-sm">• 24 combination emotions analysis</p>
              <p className="text-red-700 text-sm">• Comprehensive emotional intelligence profile</p>
              <p className="text-red-700 text-sm">• Professional report generation</p>
            </div>

            <button
              onClick={() => setCurrentAssessment('emotion-wheel')}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 group"
            >
              Start Core Assessment
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </div>

          {/* Integrated Personality Assessment */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-8 border border-blue-200 hover:shadow-xl transition-all duration-300">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserCheck className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-blue-800 mb-2">Integrated Personality Assessment</h3>
              <p className="text-blue-600 font-medium">CliftonStrengths + HEXACO + Plutchik</p>
            </div>

            <div className="space-y-3 mb-6">
              <p className="text-blue-700 text-sm">• Comprehensive personality-emotion integration</p>
              <p className="text-blue-700 text-sm">• Leadership development applications</p>
              <p className="text-blue-700 text-sm">• Professional growth insights</p>
              <p className="text-blue-700 text-sm">• Multi-framework analysis</p>
            </div>

            <button
              onClick={() => setCurrentAssessment('integrated')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 group"
            >
              Start Assessment
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </div>

          {/* Clinical Emotional Assessment */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-8 border border-green-200 hover:shadow-xl transition-all duration-300">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-green-800 mb-2">Clinical Emotional Assessment</h3>
              <p className="text-green-600 font-medium">Professional Mental Health Framework</p>
            </div>

            <div className="space-y-3 mb-6">
              <p className="text-green-700 text-sm">• 8 emotion families × 5 intensity levels</p>
              <p className="text-green-700 text-sm">• Combination emotion analysis</p>
              <p className="text-green-700 text-sm">• Clinical interpretation guidelines</p>
              <p className="text-green-700 text-sm">• Treatment planning support</p>
            </div>

            <button
              onClick={() => setCurrentAssessment('clinical')}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 group"
            >
              Start Assessment
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </div>

          {/* Unfiltered Scoring Assessment */}
          <div className="bg-gradient-to-br from-purple-50 to-violet-100 rounded-xl p-8 border border-purple-200 hover:shadow-xl transition-all duration-300">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calculator className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-purple-800 mb-2">Unfiltered Scoring Assessment</h3>
              <p className="text-purple-600 font-medium">Mathematical Framework</p>
            </div>

            <div className="space-y-3 mb-6">
              <p className="text-purple-700 text-sm">• 1-5 point mathematical scale</p>
              <p className="text-purple-700 text-sm">• 24 combination emotions</p>
              <p className="text-purple-700 text-sm">• Statistical pattern analysis</p>
              <p className="text-purple-700 text-sm">• Data-driven insights</p>
            </div>

            <button
              onClick={() => setCurrentAssessment('unfiltered')}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 group"
            >
              Start Assessment
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </div>
        </div>

        {/* Additional Options */}
        <div className="text-center">
          <div className="inline-flex items-center gap-4">
            <button
              onClick={() => setCurrentAssessment('pdfs')}
              className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center gap-2"
            >
              <Download className="w-5 h-5" />
              Download PDF Versions
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="text-center text-gray-500">
            <p className="text-sm">
              These assessments are designed for personal development, professional use, and research purposes.
              <br />
              For clinical applications, please consult with licensed mental health professionals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAssessment = () => {
    switch (currentAssessment) {
      case 'emotion-wheel':
        return (
          <div>
            <button
              onClick={() => setCurrentAssessment('hub')}
              className="mb-6 bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              Back to Hub
            </button>
            <PlutchikEmotionWheelAssessment />
          </div>
        );
      case 'integrated':
        return (
          <div>
            <button
              onClick={() => setCurrentAssessment('hub')}
              className="mb-6 bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              Back to Hub
            </button>
            <IntegratedPersonalityAssessment />
          </div>
        );
      case 'clinical':
        return (
          <div>
            <button
              onClick={() => setCurrentAssessment('hub')}
              className="mb-6 bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              Back to Hub
            </button>
            <ClinicalEmotionalAssessment />
          </div>
        );
      case 'unfiltered':
        return (
          <div>
            <button
              onClick={() => setCurrentAssessment('hub')}
              className="mb-6 bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              Back to Hub
            </button>
            <UnfilteredScoringAssessment />
          </div>
        );
      case 'pdfs':
        return (
          <div>
            <button
              onClick={() => setCurrentAssessment('hub')}
              className="mb-6 bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              Back to Hub
            </button>
            <AssessmentPDFDownloader />
          </div>
        );
      default:
        return renderHub();
    }
  };

  return renderAssessment();
};

export default AssessmentHub;
