import React from 'react';
import { Download, Brain, Target, TrendingUp, Activity, PieChart, BarChart3, Calendar, User, Clock } from 'lucide-react';

interface EmotionalIntelligenceReportProps {
  emotionWheelResults: any;
  cliftonStrengthsResults?: any;
  hexacoResults?: any;
  onClose: () => void;
}

const EmotionalIntelligenceReport: React.FC<EmotionalIntelligenceReportProps> = ({
  emotionWheelResults,
  _cliftonStrengthsResults,
  _hexacoResults,
  onClose,
}) => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const handlePrint = () => {
    window.print();
  };

  const handleClose = () => {
    onClose();
  };

  if (!emotionWheelResults) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 max-w-md mx-4">
          <h2 className="text-xl font-bold text-gray-800 mb-4">No Data Available</h2>
          <p className="text-gray-600 mb-6">Please complete the Emotion Wheel Assessment first to generate a report.</p>
          <button
            onClick={handleClose}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Print Button - Only visible on screen */}
      <div className="print:hidden fixed top-4 right-4 z-40">
        <button
          onClick={handlePrint}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center gap-2 shadow-lg"
        >
          <Download className="w-5 h-5" />
          Save as PDF
        </button>
      </div>

      {/* Close Button - Only visible on screen */}
      <div className="print:hidden fixed top-4 left-4 z-40">
        <button
          onClick={handleClose}
          className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center gap-2 shadow-lg"
        >
          × Close
        </button>
      </div>

      {/* Report Content */}
      <div className="min-h-screen bg-white p-8 print:p-4">
        {/* Report Header */}
        <div className="text-center mb-8 print:mb-6 border-b-2 border-gray-200 pb-6">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-800">Emotional Intelligence Report</h1>
              <p className="text-xl text-gray-600">Plutchik Emotion Wheel Assessment</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
            <div className="flex items-center justify-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>Date: {currentDate}</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Time: {currentTime}</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <User className="w-4 h-4" />
              <span>Participant: Self-Assessment</span>
            </div>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="mb-8 print:mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Target className="w-6 h-6 text-blue-600" />
            Executive Summary
          </h2>
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-200">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {emotionWheelResults.emotionalGranularity}%
                </div>
                <div className="text-sm text-gray-600">Emotional Granularity</div>
                <div className="text-xs text-gray-500 mt-1">Ability to differentiate emotions</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {emotionWheelResults.emotionalBalance.positive}
                </div>
                <div className="text-sm text-gray-600">Positive Emotions</div>
                <div className="text-xs text-gray-500 mt-1">Joy, Trust, Anticipation</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600 mb-2">
                  {emotionWheelResults.emotionalBalance.negative}
                </div>
                <div className="text-sm text-gray-600">Negative Emotions</div>
                <div className="text-xs text-gray-500 mt-1">Fear, Sadness, Anger</div>
              </div>
            </div>
          </div>
        </div>

        {/* Emotional Pattern Analysis */}
        <div className="mb-8 print:mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-green-600" />
            Emotional Pattern Analysis
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {Object.entries(emotionWheelResults.patternAnalysis).map(([pattern, score]) => (
              <div key={pattern} className="bg-gray-50 p-4 rounded-lg border">
                <h3 className="font-semibold text-gray-800 mb-3">{pattern}</h3>
                <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                  <div
                    className="bg-green-600 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${score}%` }}
                  />
                </div>
                <div className="text-center">
                  <span className="text-2xl font-bold text-green-600">{score}%</span>
                </div>
                <div className="text-xs text-gray-500 text-center mt-1">
                  {score >= 80 ? 'Excellent' : score >= 60 ? 'Good' : score >= 40 ? 'Fair' : 'Needs Improvement'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Primary Emotion Family Breakdown */}
        <div className="mb-8 print:mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <PieChart className="w-6 h-6 text-purple-600" />
            Primary Emotion Family Analysis
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {Object.entries(emotionWheelResults.primaryEmotions).map(([family, emotions]) => {
              const familyScore = Object.values(emotions).reduce((sum: number, val: any) => sum + val, 0);
              const maxScore = Object.keys(emotions).length * 5;
              const percentage = Math.round((familyScore / maxScore) * 100);

              return (
                <div key={family} className="bg-white p-4 rounded-lg border shadow-sm">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-semibold text-gray-800 capitalize">{family}</h3>
                    <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                      {familyScore}/{maxScore}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <div className="text-sm text-gray-600">
                    {percentage}% - {percentage >= 80 ? 'Very High' : percentage >= 60 ? 'High' : percentage >= 40 ? 'Moderate' : percentage >= 20 ? 'Low' : 'Very Low'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Combination Emotions Analysis */}
        <div className="mb-8 print:mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-orange-600" />
            Combination Emotions Analysis
          </h2>
          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="text-gray-700 mb-4">
              Combination emotions represent the blending of primary emotions, indicating emotional complexity and sophistication.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(emotionWheelResults.combinationEmotions)
                .filter(([, score]) => score > 0)
                .sort(([,a], [,b]) => (b as number) - (a as number))
                .slice(0, 12)
                .map(([combination, score]) => (
                  <div key={combination} className="bg-white p-3 rounded border">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-800">{combination}</span>
                      <span className="text-sm bg-orange-100 text-orange-800 px-2 py-1 rounded">
                        {score}/5
                      </span>
                    </div>
                  </div>
                ))}
            </div>
            <div className="mt-4 text-sm text-gray-600">
              <strong>Total Active Combinations:</strong> {Object.values(emotionWheelResults.combinationEmotions).filter(v => v > 0).length} out of 24
            </div>
          </div>
        </div>

        {/* Key Insights */}
        <div className="mb-8 print:mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Brain className="w-6 h-6 text-blue-600" />
            Key Insights & Analysis
          </h2>
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
            <ul className="space-y-3">
              {emotionWheelResults.insights.map((insight: string, index: number) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-blue-600 text-lg mt-0.5">💡</span>
                  <span className="text-gray-700">{insight}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Recommendations */}
        <div className="mb-8 print:mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Activity className="w-6 h-6 text-green-600" />
            Personalized Recommendations
          </h2>
          <div className="bg-green-50 p-6 rounded-lg border border-green-200">
            <ul className="space-y-3">
              {emotionWheelResults.recommendations.map((rec: string, index: number) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-green-600 text-lg mt-0.5">🎯</span>
                  <span className="text-gray-700">{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Intensity Distribution */}
        <div className="mb-8 print:mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-red-600" />
            Emotional Intensity Distribution
          </h2>
          <div className="grid md:grid-cols-5 gap-4">
            {Object.entries(emotionWheelResults.intensityProfile).map(([level, count]) => (
              <div key={level} className="bg-white p-4 rounded-lg border text-center">
                <div className="text-2xl font-bold text-red-600 mb-1">{count}</div>
                <div className="text-sm text-gray-600">{level}</div>
                <div className="text-xs text-gray-500 mt-1">
                  {level === 'Level 1' ? 'Very Low' :
                   level === 'Level 2' ? 'Low' :
                   level === 'Level 3' ? 'Moderate' :
                   level === 'Level 4' ? 'High' : 'Very High'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Report Footer */}
        <div className="mt-12 pt-8 border-t-2 border-gray-200 print:mt-8">
          <div className="text-center text-gray-600">
            <p className="text-sm mb-2">
              This report was generated using the Plutchik Emotion Wheel Assessment Framework
            </p>
            <p className="text-xs">
              For professional use, personal development, and research purposes.
              This assessment is not a substitute for professional mental health evaluation.
            </p>
            <div className="mt-4 text-xs text-gray-500">
              Report generated on {currentDate} at {currentTime}
            </div>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx>{`
        @media print {
          @page {
            margin: 1in;
            size: A4;
          }
          
          body {
            -webkit-print-color-adjust: exact;
            color-adjust: exact;
          }
          
          .print\\:hidden {
            display: none !important;
          }
          
          .print\\:mb-6 {
            margin-bottom: 1.5rem !important;
          }
          
          .print\\:p-4 {
            padding: 1rem !important;
          }
          
          .print\\:mt-8 {
            margin-top: 2rem !important;
          }
        }
      `}</style>
    </>
  );
};

export default EmotionalIntelligenceReport;
