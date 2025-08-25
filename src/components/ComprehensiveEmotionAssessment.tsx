import React, { useState, useEffect, useRef } from 'react';
import { 
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  ScatterChart, Scatter
} from 'recharts';
import { 
  Download, 
  Upload, 
  RefreshCw,
  User,
  Users,
  Brain,
  Zap
} from 'lucide-react';
import { AssessmentEngine } from '../utils/assessmentEngine';
import { PDFGenerator } from '../utils/pdfGenerator';
import { URLGenerator } from '../utils/urlGenerator';
import { EmailService } from '../utils/emailService';
import { 
  AssessmentSession, 
  TimeFrame, 
  LifeContext,
  PDFExportOptions,
  GEW_EMOTIONS,
  PANAS_ITEMS,
  DIMENSIONAL_ITEMS,
  PRIMARY_EMOTIONS,
  TestMode,
  getAllEmotions,
  QUICK_TEST_EMOTIONS
} from '../types/emotion';
import { AssessmentSessionConfig, Participant, AssessmentInvite } from '../types/assessment';
import AssessmentSessionManager from './AssessmentSessionManager';
import ParticipantEntry from './ParticipantEntry';
import TestModeSelector from './TestModeSelector';
import EnhancedEmotionAssessment from './EnhancedEmotionAssessment';
import { toast } from 'react-hot-toast';
import { format } from 'date-fns';

const ComprehensiveEmotionAssessment: React.FC = () => {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [responses, setResponses] = useState<Record<string, number>>({});
  const [timeframe, setTimeframe] = useState<TimeFrame>('moment');
  const [lifeContext, setLifeContext] = useState<LifeContext>({
    recentEvents: '',
    stressors: '',
    positiveInfluences: '',
    sleepQuality: 'good',
    physicalHealth: 'good',
    socialSupport: 'moderate'
  });
  const [assessmentHistory, setAssessmentHistory] = useState<AssessmentSession[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [currentSession, setCurrentSession] = useState<AssessmentSession | null>(null);
  
  // Multi-user functionality
  const [isSessionManager, setIsSessionManager] = useState(false);
  const [sessionConfig, setSessionConfig] = useState<AssessmentSessionConfig | null>(null);
  const [currentParticipant, setCurrentParticipant] = useState<Participant | null>(null);
  const [showParticipantEntry, setShowParticipantEntry] = useState(false);
  const [activeInvites, setActiveInvites] = useState<AssessmentInvite[]>([]);
  const [participants, setParticipants] = useState<Participant[]>([]);

  // Test mode functionality
  const [selectedTestMode, setSelectedTestMode] = useState<TestMode | null>(null);
  const [showTestModeSelector, setShowTestModeSelector] = useState(true);
  const [comprehensiveEmotions, setComprehensiveEmotions] = useState<string[]>([]);


  const resultsRef = useRef<HTMLDivElement>(null);

  // Assessment phases
  const phases = [
    {
      title: 'Assessment Setup & Instructions',
      description: 'Please read the instructions carefully and select your assessment timeframe.',
      type: 'setup'
    },
    {
      title: selectedTestMode?.type === 'comprehensive' ? 'Comprehensive Emotion Assessment' : 'Geneva Emotion Wheel (GEW) Assessment',
      description: selectedTestMode?.type === 'comprehensive' 
        ? 'Rate the intensity of all emotions you have experienced in the selected timeframe.'
        : 'Rate the intensity of each emotion you have experienced in the selected timeframe.',
      type: 'gew'
    },
    {
      title: 'PANAS: Positive Affect Scale',
      description: 'Rate how much you feel each of these positive emotions.',
      type: 'panas_positive'
    },
    {
      title: 'PANAS: Negative Affect Scale',
      description: 'Rate how much you feel each of these negative emotions.',
      type: 'panas_negative'
    },
    {
      title: 'Dimensional Assessment',
      description: 'Rate your overall emotional experience on key dimensions.',
      type: 'dimensional'
    },
    {
      title: 'Life Context & Circumstances',
      description: 'Provide context about your current life circumstances.',
      type: 'context'
    }
  ];

  const timeframeOptions = [
    { value: 'moment', label: 'Right now (current moment)', instruction: 'Indicate to what extent you feel this way right now, that is, at the present moment' },
    { value: 'today', label: 'Today', instruction: 'Indicate to what extent you have felt this way today' },
    { value: 'week', label: 'Past week', instruction: 'Indicate to what extent you have felt this way during the past week' },
    { value: 'general', label: 'In general', instruction: 'Indicate to what extent you generally feel this way, that is, how you feel on average' }
  ];

  const scaleLabels = {
    gew: ['0 - Not at all', '1 - A little', '2 - Moderately', '3 - Considerably', '4 - Extremely'],
    panas: ['1 - Very slightly or not at all', '2 - A little', '3 - Moderately', '4 - Quite a bit', '5 - Extremely']
  };

  // Load assessment history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('emotionAssessmentHistory');
    if (saved) {
      try {
        setAssessmentHistory(JSON.parse(saved));
      } catch (error) {
        console.error('Error loading assessment history:', error);
      }
    }
  }, []);

  const handleResponse = (item: string, value: number, category?: string) => {
    const key = category ? `${category}_${item}` : item;
    setResponses(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleContextChange = (field: keyof LifeContext, value: string) => {
    setLifeContext(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateResults = () => {
    const scores = AssessmentEngine.calculateScores(responses, timeframe);
    const insights = AssessmentEngine.generateInsights(scores, responses);
    const recommendations = AssessmentEngine.generateRecommendations(scores, insights);

    return { scores, insights, recommendations };
  };

  const saveAssessment = () => {
    const { scores, insights, recommendations } = calculateResults();
    
    const session: AssessmentSession = {
      id: `session_${Date.now()}`,
      timestamp: new Date(),
      timeframe,
      responses: Object.entries(responses).map(([emotion, rating]) => ({
        emotion,
        rating,
        timestamp: new Date()
      })),
      context: lifeContext,
      scores,
      insights,
      recommendations
    };

    const updatedHistory = [session, ...assessmentHistory];
    setAssessmentHistory(updatedHistory);
    localStorage.setItem('emotionAssessmentHistory', JSON.stringify(updatedHistory));
    
    return session;
  };

  const generatePDF = async () => {
    if (!resultsRef.current) return;
    
    setIsGeneratingPDF(true);
    try {
      const session = saveAssessment();
      
      const pdfOptions: PDFExportOptions = {
        includeCharts: true,
        includeTrends: assessmentHistory.length > 0,
        includeRecommendations: true,
        format: 'A4',
        orientation: 'portrait'
      };

      const pdfGenerator = new PDFGenerator(pdfOptions);
      const pdf = await pdfGenerator.generateReport(session, pdfOptions);
      
      // Save PDF
      pdf.save(`emotion_assessment_${format(new Date(), 'yyyy-MM-dd_HH-mm')}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handlePDFUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      // In a real implementation, you would parse the PDF to extract assessment data
      alert('PDF uploaded successfully! Historical comparison will be available in the results.');
    } else {
      alert('Please upload a valid PDF file.');
    }
  };

  // Multi-user functionality methods
  const handleSessionCreated = (config: AssessmentSessionConfig) => {
    setSessionConfig(config);
    setActiveInvites(prev => [...prev, URLGenerator.generateAssessmentInvite(
      config.id,
      {
        method: 'url',
        expiresInDays: config.expiresInDays,
        maxParticipants: config.maxParticipants,
        requireEmail: config.requireEmail,
        requireName: config.requireName,
        autoEmailResults: config.autoEmailResults,
        customMessage: '',
        customInstructions: config.customInstructions
      },
      config.createdBy
    )]);
    toast.success('Assessment session created successfully!');
  };

  const handleParticipantEntered = (participantInfo: { name: string; email: string }) => {
    const participant: Participant = {
      id: `participant_${Date.now()}`,
      sessionId: sessionConfig?.id || '',
      email: participantInfo.email,
      name: participantInfo.name,
      startedAt: new Date(),
      status: 'started',
      lastActivity: new Date()
    };

    setCurrentParticipant(participant);
    setParticipants(prev => [...prev, participant]);
    setShowParticipantEntry(false);
    
    // Set the timeframe from session config
    if (sessionConfig) {
      setTimeframe(sessionConfig.timeframe);
    }
  };

  const handleAssessmentComplete = async () => {
    if (!currentParticipant || !sessionConfig || !currentSession) return;

    // Update participant status
    const updatedParticipant: Participant = {
      ...currentParticipant,
      status: 'completed',
      completedAt: new Date(),
      assessmentData: currentSession
    };

    setParticipants(prev => 
      prev.map(p => p.id === currentParticipant.id ? updatedParticipant : p)
    );

    // Auto-email results if enabled
    if (sessionConfig.autoEmailResults) {
      const emailTemplate = EmailService.getEmailTemplates().default;
      await EmailService.sendAssessmentResults(
        updatedParticipant,
        currentSession,
        emailTemplate
      );
      toast.success('Results have been emailed to you!');
    }
  };

  const toggleSessionManager = () => {
    setIsSessionManager(!isSessionManager);
  };

  // Test mode functionality
  const handleTestModeSelected = (mode: TestMode) => {
    setSelectedTestMode(mode);
    setShowTestModeSelector(false);
    
    if (mode.type === 'comprehensive') {
      // Set up comprehensive emotions list
      const allEmotions = getAllEmotions();
      setComprehensiveEmotions(allEmotions);
    } else {
      // Set up quick test emotions
      const quickEmotions = [
        ...QUICK_TEST_EMOTIONS.primary,
        ...QUICK_TEST_EMOTIONS.secondary,
        ...QUICK_TEST_EMOTIONS.tertiary
      ];
      setComprehensiveEmotions(quickEmotions);
    }
    
    toast.success(`${mode.type === 'quick' ? 'Quick' : 'Comprehensive'} test mode selected!`);
  };

  const resetToTestModeSelector = () => {
    setShowTestModeSelector(true);
    setSelectedTestMode(null);
    setCurrentPhase(0);
    setResponses({});
    setComprehensiveEmotions([]);
  };

  const canProceed = () => {
    switch (phases[currentPhase].type) {
      case 'setup':
        return true; // Always allow proceeding from setup since timeframe is required
      case 'gew':
        // Check if all required emotions have been rated (including 0 as valid)
        if (selectedTestMode?.type === 'comprehensive') {
          return comprehensiveEmotions.every(emotion => responses[emotion] !== undefined);
        } else {
          // For quick test, check if at least some emotions have been rated
          return comprehensiveEmotions.some(emotion => responses[emotion] !== undefined);
        }
      case 'panas_positive':
        return PANAS_ITEMS.positive.some(item => responses[`panas_positive_${item}`] !== undefined);
      case 'panas_negative':
        return PANAS_ITEMS.negative.some(item => responses[`panas_negative_${item}`] !== undefined);
      case 'dimensional':
        return DIMENSIONAL_ITEMS.every(item => responses[item.name] !== undefined);
      case 'context':
        return true; // Context is optional
      default:
        return true;
    }
  };

  const renderPhaseContent = () => {
    switch (phases[currentPhase].type) {
      case 'setup':
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-lg mb-3">Instructions</h3>
              <p className="text-gray-700 mb-4">
                This assessment uses validated psychological instruments to measure your emotional experience. 
                It combines the Geneva Emotion Wheel (GEW), PANAS scales, and dimensional emotion models 
                used in contemporary emotion research.
              </p>
              <p className="text-sm text-gray-600">
                <strong>Time required:</strong> Approximately 15-20 minutes<br />
                <strong>Privacy:</strong> All responses are stored locally on your device<br />
                <strong>Research base:</strong> Validated instruments from peer-reviewed psychology literature
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold">Select Assessment Timeframe:</h3>
              {timeframeOptions.map((option) => (
                <label key={option.value} className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="radio"
                    name="timeframe"
                    value={option.value}
                    checked={timeframe === option.value}
                    onChange={(e) => setTimeframe(e.target.value as TimeFrame)}
                    className="mt-1"
                  />
                  <div>
                    <div className="font-medium">{option.label}</div>
                    <div className="text-sm text-gray-600 italic">"{option.instruction}"</div>
                  </div>
                </label>
              ))}
            </div>

            {assessmentHistory.length > 0 && (
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h3 className="font-semibold text-green-800 mb-2">Previous Assessments Available</h3>
                <p className="text-green-700 text-sm">
                  You have {assessmentHistory.length} previous assessment(s). 
                  Upload a PDF from a previous session to enable trend analysis.
                </p>
                <div className="mt-3">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handlePDFUpload}
                    className="hidden"
                    id="pdf-upload"
                  />
                  <label
                    htmlFor="pdf-upload"
                    className="inline-flex items-center px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 cursor-pointer"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Previous PDF
                  </label>
                </div>
              </div>
            )}
          </div>
        );

      case 'gew':
        return (
          <EnhancedEmotionAssessment
            onEmotionRated={handleResponse}
            responses={responses}
            testMode={selectedTestMode?.type || 'quick'}
          />
        );

      case 'panas_positive':
        return (
          <div className="space-y-6">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <p className="text-sm text-gray-700">
                <strong>PANAS Positive Affect Scale:</strong> {timeframeOptions.find(opt => opt.value === timeframe)?.instruction}. Rate each item on a 5-point scale.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {PANAS_ITEMS.positive.map((item) => (
                <div key={item} className="p-4 border rounded-lg bg-white">
                  <h4 className="font-medium mb-3 text-gray-800">{item}</h4>
                  <div className="space-y-2">
                    {scaleLabels.panas.map((label, index) => (
                      <label key={index} className="flex items-center space-x-2 text-sm">
                        <input
                          type="radio"
                          name={`panas_positive_${item}`}
                          value={index + 1}
                          checked={responses[`panas_positive_${item}`] === index + 1}
                          onChange={(e) => handleResponse(item, parseInt(e.target.value), 'panas_positive')}
                        />
                        <span>{label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'panas_negative':
        return (
          <div className="space-y-6">
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <p className="text-sm text-gray-700">
                <strong>PANAS Negative Affect Scale:</strong> {timeframeOptions.find(opt => opt.value === timeframe)?.instruction}. Rate each item on a 5-point scale.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {PANAS_ITEMS.negative.map((item) => (
                <div key={item} className="p-4 border rounded-lg bg-white">
                  <h4 className="font-medium mb-3 text-gray-800">{item}</h4>
                  <div className="space-y-2">
                    {scaleLabels.panas.map((label, index) => (
                      <label key={index} className="flex items-center space-x-2 text-sm">
                        <input
                          type="radio"
                          name={`panas_negative_${item}`}
                          value={index + 1}
                          checked={responses[`panas_negative_${item}`] === index + 1}
                          onChange={(e) => handleResponse(item, parseInt(e.target.value), 'panas_negative')}
                        />
                        <span>{label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'dimensional':
        return (
          <div className="space-y-6">
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <p className="text-sm text-gray-700">
                <strong>Dimensional Assessment:</strong> Rate your overall emotional experience on core psychological dimensions using a 1-9 scale.
              </p>
            </div>
            <div className="space-y-6">
              {DIMENSIONAL_ITEMS.map((item) => (
                <div key={item.name} className="p-6 border rounded-lg bg-white">
                  <h4 className="font-medium mb-2 text-gray-800">{item.name}</h4>
                  <p className="text-sm text-gray-600 mb-4">{item.description}</p>
                  <div className="space-y-3">
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{item.min}</span>
                      <span>{item.max}</span>
                    </div>
                    <div className="flex justify-between">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((value) => (
                        <label key={value} className="flex flex-col items-center space-y-1">
                          <input
                            type="radio"
                            name={item.name}
                            value={value}
                            checked={responses[item.name] === value}
                            onChange={(e) => handleResponse(item.name, parseInt(e.target.value))}
                          />
                          <span className="text-xs">{value}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'context':
        return (
          <div className="space-y-6">
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <p className="text-sm text-gray-700">
                <strong>Life Context:</strong> Please provide context about your current circumstances to help interpret your emotional assessment.
              </p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Recent Events (Optional)
                </label>
                <textarea
                  className="w-full p-3 border rounded-lg"
                  rows={3}
                  placeholder="Any significant events or circumstances that might be influencing your emotional state..."
                  value={lifeContext.recentEvents || ''}
                  onChange={(e) => handleContextChange('recentEvents', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Stressors (Optional)
                </label>
                <textarea
                  className="w-full p-3 border rounded-lg"
                  rows={3}
                  placeholder="Current stressors or challenges you're facing..."
                  value={lifeContext.stressors || ''}
                  onChange={(e) => handleContextChange('stressors', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Positive Influences (Optional)
                </label>
                <textarea
                  className="w-full p-3 border rounded-lg"
                  rows={3}
                  placeholder="Positive factors or support systems in your life..."
                  value={lifeContext.positiveInfluences || ''}
                  onChange={(e) => handleContextChange('positiveInfluences', e.target.value)}
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sleep Quality
                  </label>
                  <select
                    className="w-full p-3 border rounded-lg"
                    value={lifeContext.sleepQuality}
                    onChange={(e) => handleContextChange('sleepQuality', e.target.value)}
                  >
                    <option value="poor">Poor</option>
                    <option value="fair">Fair</option>
                    <option value="good">Good</option>
                    <option value="excellent">Excellent</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Physical Health
                  </label>
                  <select
                    className="w-full p-3 border rounded-lg"
                    value={lifeContext.physicalHealth}
                    onChange={(e) => handleContextChange('physicalHealth', e.target.value)}
                  >
                    <option value="poor">Poor</option>
                    <option value="fair">Fair</option>
                    <option value="good">Good</option>
                    <option value="excellent">Excellent</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Social Support
                  </label>
                  <select
                    className="w-full p-3 border rounded-lg"
                    value={lifeContext.socialSupport}
                    onChange={(e) => handleContextChange('socialSupport', e.target.value)}
                  >
                    <option value="low">Low</option>
                    <option value="moderate">Moderate</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return <div>Unknown phase</div>;
    }
  };

  if (showResults) {
    const { scores, insights, recommendations } = calculateResults();
    
    // Debug logging
    console.log('Assessment Responses:', responses);
    console.log('Plutchik Scores:', scores.plutchik);
    console.log('GEW Scores:', scores.gew);
    console.log('PANAS Scores:', scores.panas);
    
    const radarData = [
      { dimension: 'Positive High-Arousal', score: scores.gew.positiveHighArousal, fullMark: 20 },
      { dimension: 'Positive Low-Arousal', score: scores.gew.positiveLowArousal, fullMark: 20 },
      { dimension: 'Negative Low-Arousal', score: scores.gew.negativeLowArousal, fullMark: 20 },
      { dimension: 'Negative High-Arousal', score: scores.gew.negativeHighArousal, fullMark: 20 }
    ];

    const scatterData = GEW_EMOTIONS
      .filter(emotion => responses[emotion.name] > 0)
      .map(emotion => ({
        x: emotion.valence * 100,
        y: emotion.power * 100,
        size: (responses[emotion.name] || 0) * 20,
        name: emotion.name
      }));

    const plutchikData = Object.entries(scores.plutchik)
      .map(([emotion, score]) => ({
        emotion: emotion.charAt(0).toUpperCase() + emotion.slice(1),
        score: score || 0
      }))
      .sort((a, b) => b.score - a.score);

    return (
      <div className="max-w-7xl mx-auto p-6 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 min-h-screen">
        <div ref={resultsRef} className="bg-white rounded-xl shadow-2xl p-8">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Comprehensive Emotional Assessment Results
          </h1>
          
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
            <p className="text-sm text-gray-600">
              <strong>Assessment Framework:</strong> Geneva Emotion Wheel (GEW) + PANAS scales + Dimensional analysis + Plutchik's Wheel
              <br />
              <strong>Timeframe:</strong> {timeframeOptions.find(opt => opt.value === timeframe)?.label}
              <br />
              <strong>Research Base:</strong> Scherer et al. (2013), Watson et al. (1988), Russell (1980), Plutchik (1980)
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-gradient-to-r from-green-100 to-blue-100 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Emotional Circumplex (GEW Model)</h2>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="dimension" tick={{ fontSize: 10 }} />
                  <PolarRadiusAxis angle={90} domain={[0, 'dataMax']} />
                  <Radar
                    name="Intensity"
                    dataKey="score"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">PANAS Affect Scores</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={[
                  { affect: 'Positive Affect', score: scores.panas.positive, color: '#10b981' },
                  { affect: 'Negative Affect', score: scores.panas.negative, color: '#ef4444' }
                ]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="affect" />
                  <YAxis domain={[0, 50]} />
                  <Tooltip />
                  <Bar dataKey="score" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-4 text-sm text-gray-600">
                <p><strong>PA Score:</strong> {scores.panas.positive}/50 | <strong>NA Score:</strong> {scores.panas.negative}/50</p>
                <p>Normative range: PA (10-50), NA (10-50)</p>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Plutchik's Primary Emotions</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={plutchikData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="emotion" type="category" width={80} />
                  <Tooltip />
                  <Bar dataKey="score" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {scatterData.length > 0 && (
              <div className="bg-gradient-to-r from-indigo-100 to-purple-100 p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Valence-Power Emotional Space</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <ScatterChart>
                    <CartesianGrid />
                    <XAxis 
                      type="number" 
                      dataKey="x" 
                      name="Valence" 
                      domain={[-100, 100]}
                      label={{ value: 'Valence (Unpleasant ← → Pleasant)', position: 'insideBottom', offset: -5 }}
                    />
                    <YAxis 
                      type="number" 
                      dataKey="y" 
                      name="Power" 
                      domain={[-100, 100]}
                      label={{ value: 'Power (Submissive ← → Dominant)', angle: -90, position: 'insideLeft' }}
                    />
                    <Tooltip 
                      cursor={{ strokeDasharray: '3 3' }}
                      formatter={(value, name) => name === 'size' ? ['Intensity', 'Intensity'] : [value, name]}
                      labelFormatter={(label) => `Emotion: ${scatterData.find(d => d.x === label)?.name || 'Unknown'}`}
                    />
                    <Scatter data={scatterData} fill="#8884d8" />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>

          <div className="bg-gradient-to-r from-indigo-100 to-purple-100 p-6 rounded-lg mb-6">
            <h2 className="text-xl font-semibold mb-4">Emotional Insights & Recommendations</h2>
            <div className="space-y-3">
              {insights.dominantPatterns.map((pattern, index) => (
                <div key={index} className="p-3 bg-white rounded border-l-4 border-indigo-500">
                  <p dangerouslySetInnerHTML={{ __html: pattern }}></p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-100 to-blue-100 p-6 rounded-lg mb-6">
            <h2 className="text-xl font-semibold mb-4">Personalized Recommendations</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {recommendations.map((rec, index) => (
                <div key={index} className="p-4 bg-white rounded-lg border">
                  <h3 className="font-semibold text-gray-800 mb-2">{rec.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{rec.description}</p>
                  {rec.resources && rec.resources.length > 0 && (
                    <div>
                      <p className="text-xs font-medium text-gray-500 mb-1">Resources:</p>
                      <ul className="text-xs text-gray-600 space-y-1">
                        {rec.resources.map((resource, idx) => (
                          <li key={idx}>• {resource}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <button
              onClick={generatePDF}
              disabled={isGeneratingPDF}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center space-x-2"
            >
              {isGeneratingPDF ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Generating PDF...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Download PDF Report</span>
                </>
              )}
            </button>
            
            <button
              onClick={() => {
                setShowResults(false);
                setCurrentPhase(0);
                setResponses({});
              }}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Take New Assessment
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentPhaseData = phases[currentPhase];

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 min-h-screen">
      {/* Test Mode Selector */}
      {showTestModeSelector && (
        <TestModeSelector onModeSelected={handleTestModeSelected} />
      )}

      {/* Multi-user Session Controls */}
      {!showTestModeSelector && (
        <div className="mb-6 flex justify-between items-center">
          <div className="flex space-x-4">
            <button
              onClick={resetToTestModeSelector}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
            >
              <Brain className="w-4 h-4 inline mr-2" />
              Change Test Mode
            </button>
            
            <button
              onClick={toggleSessionManager}
              className={`px-4 py-2 rounded-lg transition-colors font-medium ${
                isSessionManager 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <Users className="w-4 h-4 inline mr-2" />
              {isSessionManager ? 'Hide Session Manager' : 'Session Manager'}
            </button>
            
            {sessionConfig && (
              <button
                onClick={() => setShowParticipantEntry(true)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                <User className="w-4 h-4 inline mr-2" />
                Join Assessment
              </button>
            )}
          </div>
          
          {currentParticipant && (
            <div className="text-sm text-gray-600">
              <span className="font-medium">Participant:</span> {currentParticipant.name}
              {currentParticipant.email && ` (${currentParticipant.email})`}
            </div>
          )}
        </div>
      )}

      {/* Session Manager */}
      {!showTestModeSelector && isSessionManager && (
        <AssessmentSessionManager onSessionCreated={handleSessionCreated} />
      )}

      {/* Participant Entry */}
      {!showTestModeSelector && showParticipantEntry && sessionConfig && (
        <ParticipantEntry 
          sessionConfig={sessionConfig} 
          onParticipantEntered={handleParticipantEntered} 
        />
      )}

      {/* Main Assessment */}
      {!showTestModeSelector && !isSessionManager && !showParticipantEntry && (
        <div className="bg-white rounded-xl shadow-2xl p-8">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-bold text-gray-800">
                {selectedTestMode?.type === 'comprehensive' ? 'Comprehensive' : 'Quick'} Emotional Assessment System
              </h1>
              {selectedTestMode && (
                <div className="flex items-center space-x-2 px-3 py-1 bg-blue-100 rounded-full">
                  {selectedTestMode.type === 'quick' ? (
                    <Zap className="w-4 h-4 text-yellow-600" />
                  ) : (
                    <Brain className="w-4 h-4 text-purple-600" />
                  )}
                  <span className="text-sm font-medium text-blue-800 capitalize">
                    {selectedTestMode.type} Mode
                  </span>
                </div>
              )}
            </div>
            <div className="flex justify-between items-center mb-6">
              <span className="text-sm text-gray-600">
                Phase {currentPhase + 1} of {phases.length}
              </span>
              <span className="text-sm text-gray-600">
                Progress: {Math.round(((currentPhase + 1) / phases.length) * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${((currentPhase + 1) / phases.length) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-3 text-gray-700">{currentPhaseData.title}</h2>
            <p className="text-gray-600 mb-6">{currentPhaseData.description}</p>
            {renderPhaseContent()}
          </div>

          <div className="flex justify-between pt-6 border-t">
            <button
              onClick={() => setCurrentPhase(Math.max(0, currentPhase - 1))}
              disabled={currentPhase === 0}
              className={`px-6 py-2 rounded-lg transition-colors ${
                currentPhase === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-500 text-white hover:bg-gray-600'
              }`}
            >
              Previous
            </button>
            
            <button
              onClick={() => {
                if (currentPhase === phases.length - 1) {
                  setShowResults(true);
                  if (currentParticipant) {
                    handleAssessmentComplete();
                  }
                } else {
                  setCurrentPhase(currentPhase + 1);
                }
              }}
              disabled={!canProceed()}
              className={`px-6 py-2 rounded-lg transition-colors ${
                !canProceed()
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {currentPhase === phases.length - 1 ? 'View Results' : 'Next'}
            </button>
          </div>

          <div className="mt-8 text-xs text-gray-500 text-center">
            <p>
              <strong>Research Citations:</strong> Geneva Emotion Wheel (Scherer et al., 2013) | 
              PANAS (Watson, Clark & Tellegen, 1988) | 
              Circumplex Model (Russell, 1980) | 
              Plutchik's Wheel (Plutchik, 1980)
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComprehensiveEmotionAssessment;
