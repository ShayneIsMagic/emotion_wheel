import React, { useRef } from 'react';
import { Download, Printer, FileText, Calendar, User, BarChart3, TrendingUp, Target, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
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
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
  };

  const printReport = () => {
    window.print();
  };

  const renderIntegratedReport = () => (
    <div className="space-y-6">
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
              {Object.values(results.cliftonStrengths).filter((score: any) => score > 3).length}
            </p>
            <p className="text-sm text-green-700">High-Performing Strengths</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">
              {Object.values(results.combinationEmotions).filter((score: any) => score > 0).length}
            </p>
            <p className="text-sm text-purple-700">Active Combinations</p>
          </div>
        </div>
      </div>

      {/* Integration Insights */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Integration Insights
        </h3>
        <div className="space-y-3">
          {results.integrationInsights.map((insight: string, index: number) => (
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
          {results.recommendations.map((rec: string, index: number) => (
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
            <p className="text-2xl font-bold text-orange-600">{results.clinicalIndicators.totalGranularity}/32</p>
            <p className="text-sm text-orange-700">Total Granularity</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">{results.clinicalIndicators.combinationScore}</p>
            <p className="text-sm text-purple-700">Combination Score</p>
          </div>
        </div>
      </div>

      {/* Risk Factors */}
      {results.riskFactors.length > 0 && (
        <div className="bg-red-50 p-6 rounded-lg border border-red-200">
          <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Clinical Risk Factors
          </h3>
          <div className="space-y-3">
            {results.riskFactors.map((risk: string, index: number) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-red-100 rounded">
                <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                <p className="text-red-700">{risk}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Treatment Recommendations */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Target className="w-5 h-5" />
          Treatment Recommendations
        </h3>
        <div className="space-y-3">
          {results.treatmentRecommendations.map((rec: string, index: number) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <p className="text-gray-700">{rec}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Granularity Scores */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          Family Granularity Scores
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {Object.entries(results.granularityScores).map(([family, score]) => (
            <div key={family} className="bg-gray-50 p-4 rounded">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium capitalize">{family}</span>
                <span className="text-sm text-gray-600">{score}/4</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(score as number / 4) * 100}%` }}
                />
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {score === 0 ? 'Void' : score === 1 ? 'Minimal' : score === 2 ? 'Moderate' : score === 3 ? 'High' : 'Maximum'}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderUnfilteredReport = () => (
    <div className="space-y-6">
      {/* Mathematical Summary */}
      <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
        <h3 className="text-xl font-bold text-purple-800 mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          Mathematical Summary
        </h3>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">{results.mathematicalScore}/100</p>
            <p className="text-sm text-purple-700">Mathematical Score</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">{results.granularityScore}%</p>
            <p className="text-sm text-blue-700">Granularity Score</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">{results.finalCompositeScore}/250</p>
            <p className="text-sm text-green-700">Composite Score</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-orange-600">
              {Object.values(results.combinationEmotions).filter((score: any) => score > 0).length}
            </p>
            <p className="text-sm text-orange-700">Active Combinations</p>
          </div>
        </div>
      </div>

      {/* Pattern Analysis */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Pattern Analysis
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          {Object.entries(results.patternAnalysis).map(([pattern, score]) => (
            <div key={pattern} className="bg-gray-50 p-4 rounded">
              <p className="font-medium text-gray-700 mb-2">{pattern}</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${score}%` }}
                />
              </div>
              <p className="text-sm text-gray-600 mt-1">{score}%</p>
            </div>
          ))}
        </div>
      </div>

      {/* Polar Conflicts */}
      {results.polarConflicts.length > 0 && (
        <div className="bg-red-50 p-6 rounded-lg border border-red-200">
          <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Polar Opposite Conflicts Detected
          </h3>
          <div className="space-y-3">
            {results.polarConflicts.map((conflict: string, index: number) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-red-100 rounded">
                <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                <p className="text-red-700">{conflict}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Statistical Insights */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          Statistical Insights
        </h3>
        <div className="space-y-3">
          {results.statisticalInsights.map((insight: string, index: number) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded">
              <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <p className="text-gray-700">{insight}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Data-Driven Recommendations */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Target className="w-5 h-5" />
          Data-Driven Recommendations
        </h3>
        <div className="space-y-3">
          {results.dataDrivenRecommendations.map((rec: string, index: number) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-yellow-50 rounded">
              <Target className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <p className="text-gray-700">{rec}</p>
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
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white">
      {/* Report Header */}
      <div ref={reportRef} className="p-8">
        {/* Company Header */}
        <div className="text-center border-b-2 border-gray-200 pb-6 mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Emotion Wheel Assessment</h1>
          </div>
          <p className="text-xl text-gray-600">{subtitle}</p>
        </div>

        {/* Client Information */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <User className="w-4 h-4 text-gray-600" />
              <span className="font-medium text-gray-700">Client Name</span>
            </div>
            <p className="text-gray-800">{clientName}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-gray-600" />
              <span className="font-medium text-gray-700">Assessment Date</span>
            </div>
            <p className="text-gray-800">{assessmentDate}</p>
          </div>
        </div>

        {/* Report Content */}
        {renderReportContent()}

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-gray-200 text-center text-gray-500">
          <p className="text-sm">
            This report was generated by the Emotion Wheel Assessment System.
            <br />
            For professional use and interpretation, please consult with qualified professionals.
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 flex justify-center gap-4">
        <button
          onClick={printReport}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center gap-2"
        >
          <Printer className="w-5 h-5" />
          Print Report
        </button>
        <button
          onClick={generatePDF}
          className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center gap-2"
        >
          <Download className="w-5 h-5" />
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default AssessmentReport;
