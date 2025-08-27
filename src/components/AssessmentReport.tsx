import React, { useRef } from 'react';
import { Download, Printer, FileText, Calendar, User, BarChart3, TrendingUp, Target, AlertTriangle, CheckCircle, Brain, Heart, Calculator } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface AssessmentReportProps {
  title: string;
  subtitle: string;
  clientName?: string;
  assessmentDate: string;
  results: any;
  type: 'integrated' | 'clinical' | 'unfiltered';
}

const AssessmentReport: React.FC<AssessmentReportProps> = ({
  title,
  subtitle,
  clientName = 'Client',
  assessmentDate,
  results,
  type,
}) => {
  const reportRef = useRef<HTMLDivElement>(null);

  const generatePDF = async () => {
    if (!reportRef.current) {return;}

    try {
      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`${title.replace(/\s+/g, '_')}_${clientName.replace(/\s+/g, '_')}_${assessmentDate}.pdf`);
    } catch (error) {
      // Log error for debugging (in production, this would go to error tracking service)
      // eslint-disable-next-line no-console
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
  };

  const printReport = () => {
    window.print();
  };

  const renderFrameworkOverview = () => (
    <div className="bg-gray-50 p-6 rounded-lg border mb-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <Brain className="w-5 h-5" />
        Assessment Framework Overview
      </h3>
      <div className="space-y-4 text-sm text-gray-700">
        <p>
          <strong>Purpose:</strong> This assessment identifies emotional patterns that correlate with personality traits,
          designed to enhance and deepen insights from established frameworks rather than replace them.
        </p>
        <p>
          <strong>Target Users:</strong> Coaches, consultants, HR professionals, and individuals seeking deeper
          self-understanding beyond existing personality results.
        </p>
        <p>
          <strong>Important Disclaimers:</strong> Not a clinical or diagnostic tool. Results represent patterns,
          not absolute personality determinations. Cultural and individual variations in emotional expression should be considered.
        </p>
      </div>
    </div>
  );

  const renderPlutchikFramework = () => (
    <div className="bg-white p-6 rounded-lg border mb-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <Heart className="w-5 h-5" />
        Enhanced Plutchik Emotion Framework
      </h3>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-semibold text-gray-700 mb-3">Primary Emotion Families</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              <span><strong>Joy Family (0°):</strong> Serenity → Pleasure → Joy → Elation → Ecstasy</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <span><strong>Trust Family (45°):</strong> Acceptance → Trust → Admiration → Devotion → Worship</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
              <span><strong>Fear Family (90°):</strong> Apprehension → Fear → Terror → Panic → Hysteria</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
              <span><strong>Surprise Family (135°):</strong> Distraction → Surprise → Amazement → Wonder → Astonishment</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
              <span><strong>Sadness Family (180°):</strong> Pensiveness → Sadness → Grief → Despair → Agony</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
              <span><strong>Disgust Family (225°):</strong> Boredom → Disgust → Loathing → Revulsion → Abhorrence</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span><strong>Anger Family (270°):</strong> Annoyance → Anger → Rage → Fury → Wrath</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
              <span><strong>Anticipation Family (315°):</strong> Interest → Anticipation → Vigilance → Eagerness → Excitement</span>
            </div>
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-gray-700 mb-3">Combination Emotions</h4>
          <div className="space-y-2 text-sm">
            <p><strong>Love</strong> = Joy + Trust</p>
            <p><strong>Optimism</strong> = Joy + Anticipation</p>
            <p><strong>Delight</strong> = Joy + Surprise</p>
            <p><strong>Submission</strong> = Trust + Fear</p>
            <p><strong>Friendliness</strong> = Trust + Anticipation</p>
            <p><strong>Awe</strong> = Fear + Surprise</p>
            <p><strong>Anxiety</strong> = Fear + Anticipation</p>
            <p><strong>Disappointment</strong> = Surprise + Sadness</p>
            <p><strong>Interest</strong> = Surprise + Anticipation</p>
            <p><strong>Remorse</strong> = Sadness + Disgust</p>
            <p><strong>Jealousy</strong> = Sadness + Anger</p>
            <p><strong>Contempt</strong> = Disgust + Anger</p>
            <p><strong>Aggressiveness</strong> = Anger + Anticipation</p>
            <p><strong>Pride</strong> = Anger + Joy</p>
            <p><strong>Curiosity</strong> = Anticipation + Trust</p>
            <p><strong>Hope</strong> = Anticipation + Joy</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderIntegratedReport = () => (
    <div className="space-y-6">
      {renderFrameworkOverview()}
      {renderPlutchikFramework()}

      {/* Executive Summary */}
      <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
        <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          Executive Summary
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">{results.overallScore}/100</p>
            <p className="text-sm text-blue-700">Integration Score</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">
              {Object.values(results.cliftonStrengths || {}).filter((score: any) => score > 3).length}
            </p>
            <p className="text-sm text-green-700">High-Performing Strengths</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">
              {Object.values(results.combinationEmotions || {}).filter((score: any) => score > 0).length}
            </p>
            <p className="text-sm text-purple-700">Active Combinations</p>
          </div>
        </div>
      </div>

      {/* CliftonStrengths Integration */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Target className="w-5 h-5" />
          CliftonStrengths Integration
        </h3>
        <div className="space-y-4">
          <p className="text-gray-700">
            <strong>Framework Integration:</strong> This assessment maps emotional patterns to your CliftonStrengths
            domains, revealing how your natural talents influence your emotional responses and interpersonal dynamics.
          </p>
          {results.cliftonStrengths && (
            <div className="grid md:grid-cols-2 gap-4">
              {Object.entries(results.cliftonStrengths).map(([domain, score]: [string, any]) => (
                <div key={domain} className="bg-gray-50 p-3 rounded">
                  <p className="font-medium text-gray-800">{domain}</p>
                  <p className="text-sm text-gray-600">Score: {score}/5</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* HEXACO Integration */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          HEXACO Personality Integration
        </h3>
        <div className="space-y-4">
          <p className="text-gray-700">
            <strong>Personality-Emotion Mapping:</strong> Your HEXACO profile reveals how personality factors
            influence emotional expression, decision-making, and social interactions.
          </p>
          {results.hexacoProfile && (
            <div className="grid md:grid-cols-2 gap-4">
              {Object.entries(results.hexacoProfile).map(([factor, level]: [string, any]) => (
                <div key={factor} className="bg-gray-50 p-3 rounded">
                  <p className="font-medium text-gray-800">{factor}</p>
                  <p className="text-sm text-gray-600">Level: {level}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Integration Insights */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Integration Insights
        </h3>
        <div className="space-y-3">
          {results.integrationInsights?.map((insight: string, index: number) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <p className="text-gray-700">{insight}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Target className="w-5 h-5" />
          Development Recommendations
        </h3>
        <div className="space-y-3">
          {results.recommendations?.map((rec: string, index: number) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-yellow-50 rounded">
              <Target className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <p className="text-gray-700">{rec}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderClinicalReport = () => (
    <div className="space-y-6">
      {renderFrameworkOverview()}
      {renderPlutchikFramework()}

      {/* Clinical Summary */}
      <div className="bg-red-50 p-6 rounded-lg border border-red-200">
        <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          Clinical Summary
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-red-600">{results.clinicalScore}/100</p>
            <p className="text-sm text-red-700">Clinical Score</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-orange-600">{results.clinicalIndicators?.totalGranularity}/32</p>
            <p className="text-sm text-orange-700">Total Granularity</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">{results.clinicalIndicators?.combinationScore}</p>
            <p className="text-sm text-purple-700">Combination Score</p>
          </div>
        </div>
      </div>

      {/* Clinical Indicators */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Brain className="w-5 h-5" />
          Clinical Indicators
        </h3>
        <div className="space-y-4">
          <p className="text-gray-700">
            <strong>Clinical Focus:</strong> This assessment provides clinical indicators for emotional functioning,
            attachment patterns, and interpersonal dynamics. Results require professional interpretation within clinical context.
          </p>
          {results.clinicalIndicators && (
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-3 rounded">
                <p className="font-medium text-gray-800">Total Granularity</p>
                <p className="text-sm text-gray-600">{results.clinicalIndicators.totalGranularity}/32</p>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <p className="font-medium text-gray-800">Combination Score</p>
                <p className="text-sm text-gray-600">{results.clinicalIndicators.combinationScore}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <p className="font-medium text-gray-800">Emotional Range</p>
                <p className="text-sm text-gray-600">{results.clinicalIndicators.emotionalRange}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <p className="font-medium text-gray-800">Intensity Distribution</p>
                <p className="text-sm text-gray-600">{results.clinicalIndicators.intensityDistribution}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Risk Factors */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          Risk Factors
        </h3>
        <div className="space-y-3">
          {results.riskFactors?.map((risk: string, index: number) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-red-50 rounded">
              <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
              <p className="text-gray-700">{risk}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Treatment Recommendations */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Target className="w-5 h-5" />
          Treatment Recommendations
        </h3>
        <div className="space-y-3">
          {results.treatmentRecommendations?.map((rec: string, index: number) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded">
              <Target className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <p className="text-gray-700">{rec}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderUnfilteredReport = () => (
    <div className="space-y-6">
      {renderFrameworkOverview()}
      {renderPlutchikFramework()}

      {/* Mathematical Summary */}
      <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
        <h3 className="text-xl font-bold text-purple-800 mb-4 flex items-center gap-2">
          <Calculator className="w-5 h-5" />
          Mathematical Scoring Summary
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">{results.finalCompositeScore}/100</p>
            <p className="text-sm text-purple-700">Composite Score</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">{results.mathematicalScore}/40</p>
            <p className="text-sm text-blue-700">Mathematical Score</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">{results.granularityScore}/32</p>
            <p className="text-sm text-green-700">Granularity Score</p>
          </div>
        </div>
      </div>

      {/* Core Premise */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Brain className="w-5 h-5" />
          Assessment Approach
        </h3>
        <div className="space-y-4 text-gray-700">
          <p>
            <strong>Core Premise:</strong> This assessment uses the complete Plutchik emotion database to generate
            quantitative emotional profiles without clinical interpretation filters or personality correlations.
            Pure pattern recognition and mathematical scoring based on the 8 primary emotions and their 24 combination emotions.
          </p>
          <p>
            <strong>Scoring System:</strong> Each emotion is rated on a 1-5 scale where 1 = Subtle/Not at all,
            2 = Mild/Occasionally, 3 = Moderate/Regularly, 4 = Strong/Frequently, 5 = Intense/Dominantly.
          </p>
          <p>
            <strong>Mathematical Framework:</strong> Results are calculated using raw scoring algorithms that identify
            emotional patterns, intensity distributions, and combination emotion dynamics.
          </p>
        </div>
      </div>

      {/* Primary Emotion Scores */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          Primary Emotion Family Scores
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {results.primaryScores && Object.entries(results.primaryScores).map(([family, score]: [string, any]) => (
            <div key={family} className="bg-gray-50 p-3 rounded">
              <p className="font-medium text-gray-800">{family}</p>
              <p className="text-sm text-gray-600">Score: {score}/25</p>
            </div>
          ))}
        </div>
      </div>

      {/* Extended Emotion Pools */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Extended Emotion Pool Analysis
        </h3>
        <div className="space-y-4">
          <p className="text-gray-700">
            <strong>Extended Pool Assessment:</strong> Beyond the core 8 emotions, this framework evaluates
            120+ extended emotions to provide comprehensive emotional granularity analysis.
          </p>
          {results.extendedEmotionPools && (
            <div className="grid md:grid-cols-2 gap-4">
              {Object.entries(results.extendedEmotionPools).map(([family, emotions]: [string, any]) => (
                <div key={family} className="bg-gray-50 p-3 rounded">
                  <p className="font-medium text-gray-800">{family}</p>
                  <p className="text-sm text-gray-600">{Array.isArray(emotions) ? emotions.length : 0} emotions</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Pattern Analysis */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Pattern Recognition Analysis
        </h3>
        <div className="space-y-4">
          {results.patternAnalysis && (
            <div className="space-y-3">
              {Object.entries(results.patternAnalysis).map(([pattern, value]: [string, any]) => (
                <div key={pattern} className="flex items-start gap-3 p-3 bg-gray-50 rounded">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-800">{pattern}</p>
                    <p className="text-sm text-gray-600">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Polar Opposite Conflicts */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          Polar Opposite Conflicts
        </h3>
        <div className="space-y-3">
          {results.polarConflicts?.map((conflict: string, index: number) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-orange-50 rounded">
              <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
              <p className="text-gray-700">{conflict}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderReportContent = () => {
    switch (type) {
      case 'integrated':
        return renderIntegratedReport();
      case 'clinical':
        return renderClinicalReport();
      case 'unfiltered':
        return renderUnfilteredReport();
      default:
        return renderIntegratedReport();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
                <p className="text-gray-600">{subtitle}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={printReport}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <Printer className="w-4 h-4" />
                Print
              </button>
              <button
                onClick={generatePDF}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Report Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div ref={reportRef} className="bg-white rounded-lg shadow-lg p-8">
          {/* Client Information */}
          <div className="border-b border-gray-200 pb-6 mb-8">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Client Name</p>
                  <p className="text-lg font-semibold text-gray-900">{clientName}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Assessment Date</p>
                  <p className="text-lg font-semibold text-gray-900">{assessmentDate}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Assessment Type</p>
                  <p className="text-lg font-semibold text-gray-900">{title}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Report Content */}
          {renderReportContent()}

          {/* Footer */}
          <div className="border-t border-gray-200 pt-6 mt-8">
            <div className="text-center text-sm text-gray-500">
              <p>This assessment is for educational and professional development purposes only.</p>
              <p>Results should be interpreted by qualified professionals within appropriate contexts.</p>
              <p className="mt-2">Generated on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentReport;
