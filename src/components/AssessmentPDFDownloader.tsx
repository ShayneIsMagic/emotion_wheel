import React, { useState } from 'react';
import { Download, FileText, Brain, Calculator, UserCheck, Loader2 } from 'lucide-react';
import { MarkdownToPDFConverter } from '../utils/markdownToPDFConverter';

const AssessmentPDFDownloader: React.FC = () => {
  const [loading, setLoading] = useState<{[key: string]: boolean}>({
    integrated: false,
    clinical: false,
    unfiltered: false,
  });

  const downloadPDF = async (type: 'integrated' | 'clinical' | 'unfiltered') => {
    setLoading(prev => ({ ...prev, [type]: true }));

    try {
      const converter = new MarkdownToPDFConverter();
      let pdf: any;
      let filename: string;

      switch (type) {
        case 'integrated':
          pdf = await converter.generateIntegratedPersonalityPDF();
          filename = 'integrated_personality_assessment.pdf';
          break;
        case 'clinical':
          pdf = await converter.generateClinicalEmotionalPDF();
          filename = 'clinical_emotional_assessment.pdf';
          break;
        case 'unfiltered':
          pdf = await converter.generateUnfilteredScoringPDF();
          filename = 'unfiltered_scoring_assessment.pdf';
          break;
        default:
          return;
      }

      pdf.save(filename);
    } catch (error) {
      console.error(`Error generating ${type} PDF:`, error);
      alert('Error generating PDF. Please try again.');
    } finally {
      setLoading(prev => ({ ...prev, [type]: false }));
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Assessment PDF Downloads
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Download comprehensive PDF versions of our assessments with full academic depth, research methodology, and professional interpretation guidelines.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Integrated Personality Assessment Card */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-6 border border-blue-200">
            <div className="flex items-center gap-3 mb-4">
              <UserCheck className="w-8 h-8 text-blue-600" />
              <h3 className="text-xl font-semibold text-blue-800">Integrated Personality Assessment</h3>
            </div>
            <p className="text-blue-700 mb-4">
              Comprehensive integration of CliftonStrengths, HEXACO, and Plutchik emotion wheel frameworks.
            </p>
            <ul className="text-sm text-blue-600 mb-6 space-y-1">
              <li>• 15-20 pages of detailed content</li>
              <li>• Full CliftonStrengths emotional patterns</li>
              <li>• Complete HEXACO emotional analysis</li>
              <li>• Plutchik integration methodology</li>
              <li>• Leadership development applications</li>
            </ul>
            <button
              onClick={() => downloadPDF('integrated')}
              disabled={loading.integrated}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              {loading.integrated ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Download className="w-5 h-5" />
              )}
              {loading.integrated ? 'Generating...' : 'Download PDF'}
            </button>
          </div>

          {/* Clinical Emotional Assessment Card */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-lg p-6 border border-green-200">
            <div className="flex items-center gap-3 mb-4">
              <Brain className="w-8 h-8 text-green-600" />
              <h3 className="text-xl font-semibold text-green-800">Clinical Emotional Assessment</h3>
            </div>
            <p className="text-green-700 mb-4">
              Professional-grade emotional assessment framework for mental health professionals.
            </p>
            <ul className="text-sm text-green-600 mb-6 space-y-1">
              <li>• 12-18 pages of clinical content</li>
              <li>• 8 emotion families × 5 intensity levels</li>
              <li>• Combination emotion analysis</li>
              <li>• Clinical interpretation guidelines</li>
              <li>• Treatment planning frameworks</li>
            </ul>
            <button
              onClick={() => downloadPDF('clinical')}
              disabled={loading.clinical}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              {loading.clinical ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Download className="w-5 h-5" />
              )}
              {loading.clinical ? 'Generating...' : 'Download PDF'}
            </button>
          </div>

          {/* Unfiltered Scoring Assessment Card */}
          <div className="bg-gradient-to-br from-purple-50 to-violet-100 rounded-lg p-6 border border-purple-200">
            <div className="flex items-center gap-3 mb-4">
              <Calculator className="w-8 h-8 text-purple-600" />
              <h3 className="text-xl font-semibold text-purple-800">Unfiltered Scoring Assessment</h3>
            </div>
            <p className="text-purple-700 mb-4">
              Mathematical framework for data-driven emotional analysis and pattern recognition.
            </p>
            <ul className="text-sm text-purple-600 mb-6 space-y-1">
              <li>• 10-15 pages of mathematical content</li>
              <li>• 1-5 point scoring system</li>
              <li>• 24 combination emotions</li>
              <li>• Statistical analysis methods</li>
              <li>• Pattern recognition algorithms</li>
            </ul>
            <button
              onClick={() => downloadPDF('unfiltered')}
              disabled={loading.unfiltered}
              className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              {loading.unfiltered ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Download className="w-5 h-5" />
              )}
              {loading.unfiltered ? 'Generating...' : 'Download PDF'}
            </button>
          </div>
        </div>

        <div className="mt-8 p-6 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">What's Now Included in Each PDF:</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-600">
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Complete Assessment Content:</h4>
              <ul className="space-y-1">
                <li>• All markdown content properly parsed</li>
                <li>• Tables, lists, and formatting preserved</li>
                <li>• Multi-page PDFs with proper pagination</li>
                <li>• Professional academic formatting</li>
                <li>• Research methodology and frameworks</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Professional Depth & Detail:</h4>
              <ul className="space-y-1">
                <li>• Full scoring systems and interpretation</li>
                <li>• Clinical/professional applications</li>
                <li>• Research validation and limitations</li>
                <li>• Implementation guidelines</li>
                <li>• Academic references and citations</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-medium text-blue-800 mb-2">Important Note:</h4>
          <p className="text-sm text-blue-700">
            These PDFs now contain the <strong>complete content</strong> from your markdown files, including all tables,
            scoring systems, interpretation guidelines, and professional frameworks. Each PDF is generated dynamically
            from your source markdown files, ensuring no content is lost.
          </p>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>PDFs are generated directly from your assessment framework documentation with full academic depth.</p>
        </div>
      </div>
    </div>
  );
};

export default AssessmentPDFDownloader;
