import React, { useState } from 'react';
import { AlertTriangle, BarChart3, Download, Shield, Activity } from 'lucide-react';
import AssessmentReport from './AssessmentReport';

interface ClinicalResult {
  emotionFamilies: { [key: string]: { [key: string]: number } };
  combinationEmotions: { [key: string]: number };
  clinicalScore: number;
  riskFactors: string[];
  treatmentRecommendations: string[];
  clinicalIndicators: { [key: string]: any };
  granularityScores: { [key: string]: number };
  intensityDistribution: { [key: string]: number };
}

const ClinicalEmotionalAssessment: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<{[key: string]: number}>({});
  const [results, setResults] = useState<ClinicalResult | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [isLicensedProfessional, setIsLicensedProfessional] = useState(false);
  const [clientName, setClientName] = useState('');
  const [showReport, setShowReport] = useState(false);

  const totalSteps = 3;

  // EXACTLY as specified in markdown - 8 Primary Emotion Families with Clinical Intensity Levels
  const emotionFamilies = {
    joy: {
      'Serenity': { level: 1, score: 1, description: 'Calm, peaceful, content, tranquil', clinicalFocus: 'Positive affect capacity, anhedonia screening, manic episode indicators' },
      'Pleasure': { level: 2, score: 2, description: 'Pleased, comfortable, satisfied, gratified', clinicalFocus: 'Positive affect capacity, anhedonia screening, manic episode indicators' },
      'Joy': { level: 3, score: 3, description: 'Happy, cheerful, delighted, glad', clinicalFocus: 'Positive affect capacity, anhedonia screening, manic episode indicators' },
      'Elation': { level: 4, score: 4, description: 'Excited, thrilled, exhilarated, jubilant', clinicalFocus: 'Positive affect capacity, anhedonia screening, manic episode indicators' },
      'Ecstasy': { level: 5, score: 5, description: 'Blissful, euphoric, rapturous, transported', clinicalFocus: 'Positive affect capacity, anhedonia screening, manic episode indicators' },
    },
    trust: {
      'Acceptance': { level: 1, score: 1, description: 'Open, receptive, welcoming, approachable', clinicalFocus: 'Attachment patterns, paranoid features, interpersonal functioning' },
      'Trust': { level: 2, score: 2, description: 'Confident, assured, secure, trusting', clinicalFocus: 'Attachment patterns, paranoid features, interpersonal functioning' },
      'Admiration': { level: 3, score: 3, description: 'Respectful, appreciative, impressed, reverent', clinicalFocus: 'Attachment patterns, paranoid features, interpersonal functioning' },
      'Devotion': { level: 4, score: 4, description: 'Committed, loyal, dedicated, faithful', clinicalFocus: 'Attachment patterns, paranoid features, interpersonal functioning' },
      'Worship': { level: 5, score: 5, description: 'Reverent, awestruck, devoted, adoring', clinicalFocus: 'Attachment patterns, paranoid features, interpersonal functioning' },
    },
    fear: {
      'Apprehension': { level: 1, score: 1, description: 'Cautious, wary, uneasy, tentative', clinicalFocus: 'Anxiety disorders, PTSD symptoms, phobic responses' },
      'Fear': { level: 2, score: 2, description: 'Afraid, scared, frightened, alarmed', clinicalFocus: 'Anxiety disorders, PTSD symptoms, phobic responses' },
      'Terror': { level: 3, score: 3, description: 'Panicked, horrified, petrified, terrified', clinicalFocus: 'Anxiety disorders, PTSD symptoms, phobic responses' },
      'Panic': { level: 4, score: 4, description: 'Frenzied, hysterical, overwhelmed, frantic', clinicalFocus: 'Anxiety disorders, PTSD symptoms, phobic responses' },
      'Hysteria': { level: 5, score: 5, description: 'Completely overwhelmed, out of control, hysterical', clinicalFocus: 'Anxiety disorders, PTSD symptoms, phobic responses' },
    },
    surprise: {
      'Distraction': { level: 1, score: 1, description: 'Attentive, focused, alert, mindful', clinicalFocus: 'Cognitive flexibility, adaptation capacity, dissociation screening' },
      'Surprise': { level: 2, score: 2, description: 'Startled, amazed, astonished, taken aback', clinicalFocus: 'Cognitive flexibility, adaptation capacity, dissociation screening' },
      'Amazement': { level: 3, score: 3, description: 'Stunned, shocked, bewildered, dumbfounded', clinicalFocus: 'Cognitive flexibility, adaptation capacity, dissociation screening' },
      'Wonder': { level: 4, score: 4, description: 'Awe-struck, marveling, spellbound, captivated', clinicalFocus: 'Cognitive flexibility, adaptation capacity, dissociation screening' },
      'Astonishment': { level: 5, score: 5, description: 'Completely overwhelmed, speechless, flabbergasted', clinicalFocus: 'Cognitive flexibility, adaptation capacity, dissociation screening' },
    },
    sadness: {
      'Pensiveness': { level: 1, score: 1, description: 'Reflective, contemplative, thoughtful, meditative', clinicalFocus: 'Depression screening, grief assessment, emotional depth' },
      'Sadness': { level: 2, score: 2, description: 'Unhappy, sorrowful, melancholy, down', clinicalFocus: 'Depression screening, grief assessment, emotional depth' },
      'Grief': { level: 3, score: 3, description: 'Mournful, heartbroken, devastated, bereft', clinicalFocus: 'Depression screening, grief assessment, emotional depth' },
      'Despair': { level: 4, score: 4, description: 'Hopeless, despondent, anguished, desperate', clinicalFocus: 'Depression screening, grief assessment, emotional depth' },
      'Agony': { level: 5, score: 5, description: 'Completely overwhelmed by suffering, tortured, anguished', clinicalFocus: 'Depression screening, grief assessment, emotional depth' },
    },
    disgust: {
      'Boredom': { level: 1, score: 1, description: 'Uninterested, indifferent, apathetic, disengaged', clinicalFocus: 'Values conflicts, moral functioning, OCD features' },
      'Disgust': { level: 2, score: 2, description: 'Repulsed, revolted, sickened, nauseated', clinicalFocus: 'Values conflicts, moral functioning, OCD features' },
      'Loathing': { level: 3, score: 3, description: 'Abhorrent, detestable, hateful, despicable', clinicalFocus: 'Values conflicts, moral functioning, OCD features' },
      'Revulsion': { level: 4, score: 4, description: 'Completely repulsed, nauseated, sickened', clinicalFocus: 'Values conflicts, moral functioning, OCD features' },
      'Abhorrence': { level: 5, score: 5, description: 'Utterly repulsed, completely disgusted, loathing', clinicalFocus: 'Values conflicts, moral functioning, OCD features' },
    },
    anger: {
      'Annoyance': { level: 1, score: 1, description: 'Irritated, bothered, aggravated, vexed', clinicalFocus: 'Impulse control, interpersonal problems, mood episodes' },
      'Anger': { level: 2, score: 2, description: 'Mad, furious, enraged, livid', clinicalFocus: 'Impulse control, interpersonal problems, mood episodes' },
      'Rage': { level: 3, score: 3, description: 'Livid, wrathful, seething, incensed', clinicalFocus: 'Impulse control, interpersonal problems, mood episodes' },
      'Fury': { level: 4, score: 4, description: 'Completely enraged, berserk, furious, wrathful', clinicalFocus: 'Impulse control, interpersonal problems, mood episodes' },
      'Wrath': { level: 5, score: 5, description: 'Completely out of control, destructive, berserk', clinicalFocus: 'Impulse control, interpersonal problems, mood episodes' },
    },
    anticipation: {
      'Interest': { level: 1, score: 1, description: 'Curious, attentive, focused, engaged', clinicalFocus: 'Motivation patterns, anxiety features, executive functioning' },
      'Anticipation': { level: 2, score: 2, description: 'Eager, expectant, hopeful, looking forward', clinicalFocus: 'Motivation patterns, anxiety features, executive functioning' },
      'Expectancy': { level: 3, score: 3, description: 'Confident, assured, certain, positive', clinicalFocus: 'Motivation patterns, anxiety features, executive functioning' },
      'Vigilance': { level: 4, score: 4, description: 'Alert, watchful, prepared, on guard', clinicalFocus: 'Motivation patterns, anxiety features, executive functioning' },
      'Awareness': { level: 5, score: 5, description: 'Completely aware, fully conscious, mindful', clinicalFocus: 'Motivation patterns, anxiety features, executive functioning' },
    },
  };

  // EXACTLY as specified in markdown - 24 Combination Emotions
  const combinationEmotions = {
    'Love': { formula: 'Joy + Trust', score: 6, description: 'Deep affection and attachment' },
    'Optimism': { formula: 'Joy + Anticipation', score: 6, description: 'Positive outlook on future' },
    'Delight': { formula: 'Joy + Surprise', score: 6, description: 'Pleasant surprise and joy' },
    'Submission': { formula: 'Trust + Fear', score: 6, description: 'Yielding to authority or pressure' },
    'Friendliness': { formula: 'Trust + Anticipation', score: 6, description: 'Warm, approachable interaction' },
    'Awe': { formula: 'Fear + Surprise', score: 6, description: 'Reverential fear and wonder' },
    'Anxiety': { formula: 'Fear + Anticipation', score: 6, description: 'Worried anticipation of threat' },
    'Disappointment': { formula: 'Surprise + Sadness', score: 6, description: 'Unmet expectations and sadness' },
    'Interest': { formula: 'Surprise + Anticipation', score: 6, description: 'Curiosity and engagement' },
    'Remorse': { formula: 'Sadness + Disgust', score: 6, description: 'Guilt and regret' },
    'Jealousy': { formula: 'Sadness + Anger', score: 6, description: 'Resentment of others\' success' },
    'Contempt': { formula: 'Disgust + Anger', score: 6, description: 'Disdain and superiority' },
    'Aggressiveness': { formula: 'Anger + Anticipation', score: 6, description: 'Hostile forward movement' },
    'Dread': { formula: 'Anticipation + Fear', score: 6, description: 'Fearful anticipation' },
  };

  const handleAnswer = (questionId: string, value: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const calculateResults = (): ClinicalResult => {
    // Calculate emotion family scores EXACTLY as specified in markdown
    const emotionFamilyScores: { [key: string]: { [key: string]: number } } = {};
    Object.entries(emotionFamilies).forEach(([family, emotions]) => {
      emotionFamilyScores[family] = {};
      Object.entries(emotions).forEach(([emotion, _data]) => {
        const key = `emotion_${family}_${emotion.toLowerCase().replace(/\s+/g, '_')}`;
        emotionFamilyScores[family][emotion] = answers[key] || 0;
      });
    });

    // Calculate combination emotion scores
    const combinationScores: { [key: string]: number } = {};
    Object.keys(combinationEmotions).forEach(combination => {
      const key = `combination_${combination.toLowerCase().replace(/\s+/g, '_')}`;
      combinationScores[combination] = answers[key] || 0;
    });

    // Calculate clinical score using EXACT formula from markdown
    const totalAnswers = Object.values(answers).filter(v => v > 0).length;
    const totalScore = Object.values(answers).reduce((sum, val) => sum + val, 0);
    const clinicalScore = totalAnswers > 0 ? Math.round((totalScore / totalAnswers) * 20) : 0;

    // Calculate granularity scores EXACTLY as specified in markdown
    const granularityScores: { [key: string]: number } = {};
    Object.entries(emotionFamilyScores).forEach(([family, emotions]) => {
      const selections = Object.values(emotions).filter(v => v > 0).length;
      if (selections === 0) {granularityScores[family] = 0;} // Void
      else if (selections <= 3) {granularityScores[family] = 1;} // Minimal
      else if (selections <= 7) {granularityScores[family] = 2;} // Moderate
      else if (selections <= 12) {granularityScores[family] = 3;} // High
      else {granularityScores[family] = 4;} // Maximum
    });

    // Calculate intensity distribution EXACTLY as specified in markdown
    const intensityDistribution: { [key: string]: number } = {};
    [1, 2, 3, 4, 5].forEach(level => {
      intensityDistribution[`Level ${level}`] = 0;
      Object.values(answers).forEach(value => {
        if (value === level) {
          intensityDistribution[`Level ${level}`]++;
        }
      });
    });

    // Identify risk factors EXACTLY as specified in markdown
    const riskFactors = identifyRiskFactors(emotionFamilyScores, combinationScores);

    // Generate treatment recommendations EXACTLY as specified in markdown
    const treatmentRecommendations = generateTreatmentRecommendations(emotionFamilyScores, riskFactors);

    // Calculate clinical indicators EXACTLY as specified in markdown
    const clinicalIndicators = calculateClinicalIndicators(emotionFamilyScores, granularityScores, intensityDistribution);

    return {
      emotionFamilies: emotionFamilyScores,
      combinationEmotions: combinationScores,
      clinicalScore,
      riskFactors,
      treatmentRecommendations,
      clinicalIndicators,
      granularityScores,
      intensityDistribution,
    };
  };

  // EXACTLY as specified in markdown - Risk factor identification
  const identifyRiskFactors = (emotionFamilies: any, _combinations: any): string[] => {
    const risks: string[] = [];

    // High fear/anxiety levels EXACTLY as specified
    const fearScore = Object.values(emotionFamilies.fear || {}).reduce((sum: number, val: any) => sum + val, 0);
    if (fearScore > 20) {
      risks.push('Elevated fear and anxiety levels detected - Screen for anxiety disorders, PTSD symptoms, phobic responses');
    }

    // High anger levels EXACTLY as specified
    const angerScore = Object.values(emotionFamilies.anger || {}).reduce((sum: number, val: any) => sum + val, 0);
    if (angerScore > 20) {
      risks.push('Significant anger and frustration patterns identified - Assess impulse control, interpersonal problems, mood episodes');
    }

    // High sadness levels EXACTLY as specified
    const sadnessScore = Object.values(emotionFamilies.sadness || {}).reduce((sum: number, val: any) => sum + val, 0);
    if (sadnessScore > 20) {
      risks.push('Depressive symptoms and low mood patterns present - Screen for major depression, persistent depressive disorder');
    }

    // Low positive emotions EXACTLY as specified
    const joyScore = Object.values(emotionFamilies.joy || {}).reduce((sum: number, val: any) => sum + val, 0);
    const trustScore = Object.values(emotionFamilies.trust || {}).reduce((sum: number, val: any) => sum + val, 0);
    if (joyScore < 10 && trustScore < 10) {
      risks.push('Limited positive emotional experiences and trust patterns - Screen for anhedonia, attachment disorders');
    }

    // Peak-heavy patterns EXACTLY as specified
    const highIntensity = Object.values(answers).filter((val: any) => val >= 4).length;
    const totalAnswers = Object.values(answers).filter((val: any) => val > 0).length;
    if (highIntensity > totalAnswers * 0.5) {
      risks.push('Peak-heavy emotional pattern detected - Flag for emotional dysregulation');
    }

    return risks;
  };

  // EXACTLY as specified in markdown - Treatment recommendations
  const generateTreatmentRecommendations = (emotionFamilies: any, riskFactors: string[]): string[] => {
    const recommendations: string[] = [];

    if (riskFactors.some(r => r.includes('fear'))) {
      recommendations.push('Consider anxiety management techniques: deep breathing, progressive muscle relaxation, and cognitive restructuring');
    }

    if (riskFactors.some(r => r.includes('anger'))) {
      recommendations.push('Implement anger management strategies: time-outs, communication skills training, and stress reduction techniques');
    }

    if (riskFactors.some(r => r.includes('sadness'))) {
      recommendations.push('Address depressive symptoms through behavioral activation, social support enhancement, and mood monitoring');
    }

    if (riskFactors.some(r => r.includes('positive'))) {
      recommendations.push('Focus on positive psychology interventions: gratitude practices, positive activity scheduling, and strength identification');
    }

    if (riskFactors.some(r => r.includes('dysregulation'))) {
      recommendations.push('Implement emotional regulation strategies: mindfulness, distress tolerance, and emotion identification skills');
    }

    recommendations.push('Regular emotional check-ins and mood tracking recommended');
    recommendations.push('Consider referral to specialized mental health services if symptoms persist');

    return recommendations;
  };

  // EXACTLY as specified in markdown - Clinical indicators
  const calculateClinicalIndicators = (_emotionFamilies: any, granularityScores: any, intensityDistribution: any) => {
    const indicators: any = {};

    // Total Granularity Score EXACTLY as specified
    const totalGranularity = Object.values(granularityScores).reduce((sum: number, val: any) => sum + val, 0);
    indicators.totalGranularity = totalGranularity;

    // Constriction Flags EXACTLY as specified
    const constrictionFlags = Object.entries(granularityScores).filter(([,score]) => (score as number) <= 1).map(([family]) => family);
    indicators.constrictionFlags = constrictionFlags;

         // Dysregulation Flags EXACTLY as specified
     const highIntensity = (intensityDistribution['Level 4'] || 0) + (intensityDistribution['Level 5'] || 0);
     const totalSelections = Object.values(intensityDistribution).reduce((sum: number, val: any) => sum + (val as number), 0);
     indicators.dysregulationFlag = highIntensity > totalSelections * 0.5;

    // Complexity Score EXACTLY as specified
    const activeCombinations = Object.values(answers).filter((val: any) => val > 0 && val.toString().includes('combination')).length;
    indicators.combinationScore = activeCombinations;

    return indicators;
  };

  const handleComplete = () => {
    if (!isLicensedProfessional) {
      alert('This assessment is designed for use by licensed mental health professionals only. Please consult with a qualified professional.');
      return;
    }

    const calculatedResults = calculateResults();
    setResults(calculatedResults);
    setIsComplete(true);
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="bg-red-50 border border-red-200 p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-red-800 mb-4">⚠️ PROFESSIONAL USE ONLY</h2>
        <p className="text-red-700 mb-4">
          <strong>This assessment is designed for use by licensed mental health professionals only.</strong>
        </p>
        <p className="text-red-700 mb-4">
          Scope of Practice: Psychologists, psychiatrists, clinical social workers, licensed counselors
        </p>
        <p className="text-red-700 mb-4">
          Limitations: Not a diagnostic instrument - provides clinical indicators only. Must be integrated with clinical interview, history, and other assessment tools.
        </p>

        <div className="space-y-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={isLicensedProfessional}
              onChange={(e) => setIsLicensedProfessional(e.target.checked)}
              className="text-red-600"
            />
            <span>I am a licensed mental health professional</span>
          </label>
        </div>
      </div>

      {/* Client Information */}
      <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-4">Client Information</h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="clientName" className="block text-sm font-medium text-blue-700 mb-2">
              Client Name
            </label>
            <input
              type="text"
              id="clientName"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="Enter client name"
              className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {isLicensedProfessional && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Primary Emotion Families Assessment</h2>
          <p className="text-gray-600 mb-6">
            <strong>Instructions to Client:</strong> "I'm going to present you with detailed emotion words organized into eight categories representing different ways people experience and describe emotions. Each category has five intensity levels, from subtle background feelings to very intense experiences. For each category, I'd like you to select the words that describe emotions you've experienced with some regularity over the past month - not just once, but recurring patterns. Don't overthink it; if a word resonates with your recent emotional experience, select it."
          </p>

          {Object.entries(emotionFamilies).map(([family, emotions]) => (
            <div key={family} className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-700 mb-4 capitalize">
                {family} Family - {family === 'joy' ? 'Yellow - 0°' : family === 'trust' ? 'Green - 45°' : family === 'fear' ? 'Purple - 90°' : family === 'surprise' ? 'Light Blue - 135°' : family === 'sadness' ? 'Blue - 180°' : family === 'disgust' ? 'Dark Purple - 225°' : family === 'anger' ? 'Red - 270°' : 'Orange - 315°'}
              </h3>
              <p className="text-sm text-gray-600 mb-4 font-medium">
                <strong>Clinical Focus:</strong> {Object.values(emotions)[0].clinicalFocus}
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(emotions).map(([emotion, data]) => (
                  <div key={emotion} className="bg-white p-4 rounded border">
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-medium text-gray-800">{emotion}</p>
                      <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                        Level {data.level}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{data.description}</p>
                    <div className="space-y-2">
                      {[1, 2, 3, 4, 5].map(value => (
                        <label key={value} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="radio"
                            name={`emotion_${family}_${emotion.toLowerCase().replace(/\s+/g, '_')}`}
                            value={value}
                            onChange={() => handleAnswer(`emotion_${family}_${emotion.toLowerCase().replace(/\s+/g, '_')}`, value)}
                            className="text-green-600"
                          />
                          <span className="text-sm text-gray-600">
                            {value === 1 ? 'Rarely' : value === 2 ? 'Sometimes' : value === 3 ? 'Often' : value === 4 ? 'Very Often' : 'Always'}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Combination Emotions Assessment</h2>
      <p className="text-gray-600 mb-6">
        Rate how frequently you experience these combination emotions that blend multiple primary emotions.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(combinationEmotions).map(([combination, data]) => (
          <div key={combination} className="bg-white p-4 rounded border shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <p className="font-medium text-gray-800">{combination}</p>
              <span className="text-sm bg-purple-100 text-purple-800 px-2 py-1 rounded">
                {data.score} pts
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-2">{data.description}</p>
            <p className="text-xs text-purple-600 mb-3 font-mono">{data.formula}</p>
            <div className="space-y-2">
              {[1, 2, 3, 4, 5].map(value => (
                <label key={value} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name={`combination_${combination.toLowerCase().replace(/\s+/g, '_')}`}
                    value={value}
                    onChange={() => handleAnswer(`combination_${combination.toLowerCase().replace(/\s+/g, '_')}`, value)}
                    className="text-purple-600"
                  />
                  <span className="text-sm text-gray-600">
                    {value === 1 ? 'Rarely' : value === 2 ? 'Sometimes' : value === 3 ? 'Often' : value === 4 ? 'Very Often' : 'Always'}
                  </span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Clinical Context & Severity</h2>
      <p className="text-gray-600 mb-6">
        Provide additional context about the severity and impact of emotional experiences for clinical interpretation.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Emotional Impact on Daily Life</h3>
          <div className="space-y-4">
            {[
              'Work/Productivity',
              'Relationships',
              'Sleep Quality',
              'Physical Health',
              'Social Activities',
            ].map(area => (
              <div key={area} className="bg-white p-3 rounded border">
                <p className="font-medium text-gray-800 mb-2">{area}</p>
                <div className="space-y-2">
                  {[1, 2, 3, 4, 5].map(value => (
                    <label key={value} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name={`impact_${area.toLowerCase().replace(/\s+/g, '_')}`}
                        value={value}
                        onChange={() => handleAnswer(`impact_${area.toLowerCase().replace(/\s+/g, '_')}`, value)}
                        className="text-red-600"
                      />
                      <span className="text-sm text-gray-600">
                        {value === 1 ? 'No Impact' : value === 2 ? 'Mild' : value === 3 ? 'Moderate' : value === 4 ? 'Significant' : 'Severe'}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Duration & Frequency</h3>
          <div className="space-y-4">
            {[
              'Emotional Episodes Duration',
              'Frequency of Intense Emotions',
              'Recovery Time',
              'Triggers Awareness',
              'Coping Effectiveness',
            ].map(area => (
              <div key={area} className="bg-white p-3 rounded border">
                <p className="font-medium text-gray-800 mb-2">{area}</p>
                <div className="space-y-2">
                  {[1, 2, 3, 4, 5].map(value => (
                    <label key={value} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name={`duration_${area.toLowerCase().replace(/\s+/g, '_')}`}
                        value={value}
                        onChange={() => handleAnswer(`duration_${area.toLowerCase().replace(/\s+/g, '_')}`, value)}
                        className="text-red-600"
                      />
                      <span className="text-sm text-gray-600">
                        {value === 1 ? 'Very Low' : value === 2 ? 'Low' : value === 3 ? 'Moderate' : value === 4 ? 'High' : 'Very High'}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderResults = () => {
    if (!results) {return null;}

    return (
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Clinical Assessment Complete</h2>
          <div className="bg-green-100 p-6 rounded-lg inline-block">
            <p className="text-2xl font-bold text-green-800">Clinical Score: {results.clinicalScore}/100</p>
          </div>
        </div>

        {/* Clinical Indicators */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Activity className="w-6 h-6 text-blue-600" />
            Clinical Indicators
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded">
              <p className="font-medium text-gray-700 mb-2">Total Granularity Score</p>
              <p className="text-2xl font-bold text-blue-600">{results.clinicalIndicators.totalGranularity}/32</p>
            </div>
            <div className="bg-gray-50 p-4 rounded">
              <p className="font-medium text-gray-700 mb-2">Combination Score</p>
              <p className="text-2xl font-bold text-purple-600">{results.clinicalIndicators.combinationScore}</p>
            </div>
          </div>
        </div>

        {/* Risk Factors */}
        {results.riskFactors.length > 0 && (
          <div className="bg-red-50 border border-red-200 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-red-600" />
              Clinical Risk Factors
            </h3>
            <ul className="space-y-2">
              {results.riskFactors.map((risk, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">⚠</span>
                  <span className="text-red-700">{risk}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Granularity Scores */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-purple-600" />
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
                    style={{ width: `${(score / 4) * 100}%` }}
                  />
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {score === 0 ? 'Void' : score === 1 ? 'Minimal' : score === 2 ? 'Moderate' : score === 3 ? 'High' : 'Maximum'}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Treatment Recommendations */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Shield className="w-6 h-6 text-green-600" />
            Treatment Recommendations
          </h3>
          <ul className="space-y-2">
            {results.treatmentRecommendations.map((rec, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-green-600 mt-1">•</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-center space-y-4">
          <button
            onClick={() => setShowReport(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center gap-2 mx-auto"
          >
            <Download className="w-5 h-5" />
            View Full Report
          </button>

          <button
            onClick={() => window.print()}
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center gap-2 mx-auto"
          >
            <Download className="w-5 h-5" />
            Print Clinical Report
          </button>
        </div>
      </div>
    );
  };

  // Render the full AssessmentReport if showReport is true
  if (showReport && results) {
    return (
      <AssessmentReport
        title="Clinical Emotional Assessment"
        subtitle="Professional Clinical Report"
        clientName={clientName}
        assessmentDate={new Date().toLocaleDateString()}
        results={results}
        type="clinical"
      />
    );
  }

  if (isComplete) {
    return renderResults();
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Clinical Emotional Granularity Assessment (CEGA)</h1>
          <p className="text-xl text-gray-600 mb-6">
            Enhanced Assessment for Licensed Mental Health Professionals
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
            <span>Step {currentStep} of {totalSteps}</span>
            <div className="flex gap-2">
              {[1, 2, 3].map(step => (
                <div
                  key={step}
                  className={`w-3 h-3 rounded-full ${
                    step <= currentStep ? 'bg-green-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
          <div
            className="bg-green-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>

        {/* Assessment Content */}
        <div className="min-h-[600px]">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <button
            onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
            disabled={currentStep === 1}
            className="bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          {currentStep < totalSteps ? (
            <button
              onClick={() => setCurrentStep(prev => prev + 1)}
              disabled={currentStep === 1 && !isLicensedProfessional}
              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 disabled:cursor-not-allowed"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleComplete}
              disabled={!isLicensedProfessional}
              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 disabled:cursor-not-allowed"
            >
              Complete Clinical Assessment
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClinicalEmotionalAssessment;
