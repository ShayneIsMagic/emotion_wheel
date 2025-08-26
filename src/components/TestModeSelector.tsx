import React from 'react';
import { Clock, Brain, Zap, BookOpen } from 'lucide-react';
import { TestMode } from '../types/emotion';

interface TestModeSelectorProps {
  onTestModeSelected: (_mode: TestMode) => void;
}

const TestModeSelector: React.FC<TestModeSelectorProps> = ({ onTestModeSelected }) => {
  const testModes: TestMode[] = [
    {
      type: 'quick',
      description: 'Rapid assessment focusing on core emotions',
      estimatedTime: '5-8 minutes',
      emotions: ['8 primary emotions', '6 secondary emotions', '6 tertiary emotions'],
    },
    {
      type: 'comprehensive',
      description: 'Full emotional assessment with all emotion categories',
      estimatedTime: '15-20 minutes',
      emotions: ['All Plutchik emotions', 'Geneva Emotion Wheel', 'PANAS scales', 'Dimensional assessment', 'Additional emotions'],
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Choose Your Assessment Mode
          </h1>
          <p className="text-gray-600 text-lg">
            Select the assessment type that best fits your needs and time availability
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {testModes.map((mode) => (
            <div
              key={mode.type}
              className="border-2 border-gray-200 rounded-xl p-6 hover:border-blue-400 hover:shadow-lg transition-all duration-300 cursor-pointer"
              onClick={() => onTestModeSelected(mode)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {mode.type === 'quick' ? (
                    <Zap className="w-8 h-8 text-yellow-500" />
                  ) : (
                    <Brain className="w-8 h-8 text-purple-500" />
                  )}
                  <h2 className="text-xl font-bold text-gray-800 capitalize">
                    {mode.type} Test
                  </h2>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>{mode.estimatedTime}</span>
                </div>
              </div>

              <p className="text-gray-600 mb-4">
                {mode.description}
              </p>

              <div className="space-y-2">
                <h3 className="font-semibold text-gray-700 text-sm">Includes:</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  {mode.emotions.map((emotion, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <BookOpen className="w-3 h-3 text-blue-500" />
                      <span>{emotion}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6">
                <button
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                    mode.type === 'quick'
                      ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                      : 'bg-purple-500 text-white hover:bg-purple-600'
                  }`}
                >
                  Start {mode.type === 'quick' ? 'Quick' : 'Comprehensive'} Assessment
                </button>
              </div>

              {mode.type === 'quick' && (
                <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <p className="text-xs text-yellow-700">
                    <strong>Perfect for:</strong> Daily check-ins, quick mood assessments, regular monitoring
                  </p>
                </div>
              )}

              {mode.type === 'comprehensive' && (
                <div className="mt-4 p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <p className="text-xs text-purple-700">
                    <strong>Perfect for:</strong> Deep emotional exploration, research purposes, comprehensive wellness evaluation
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="font-semibold text-blue-800 mb-2">Assessment Information</h3>
          <div className="text-sm text-blue-700 space-y-1">
            <p>• Both modes use validated psychological instruments</p>
            <p>• Results are stored locally on your device for privacy</p>
            <p>• PDF reports are generated for easy sharing and printing</p>
            <p>• Historical data can be compared for trend analysis</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestModeSelector;
