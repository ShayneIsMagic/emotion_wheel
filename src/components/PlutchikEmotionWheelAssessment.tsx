import React, { useState } from 'react';
import { Heart, Brain, Target, TrendingUp, Download, PieChart, Activity, FileText } from 'lucide-react';
import EmotionalIntelligenceReport from './EmotionalIntelligenceReport';

interface EmotionWheelResult {
  primaryEmotions: { [key: string]: { [key: string]: number } };
  combinationEmotions: { [key: string]: number };
  emotionalBalance: { positive: number; negative: number; neutral: number };
  intensityProfile: { [key: string]: number };
  emotionalGranularity: number;
  patternAnalysis: { [key: string]: number };
  insights: string[];
  recommendations: string[];
}

const PlutchikEmotionWheelAssessment: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<{[key: string]: number}>({});
  const [results, setResults] = useState<EmotionWheelResult | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [showReport, setShowReport] = useState(false);

  const totalSteps = 3;

  // Plutchik's 8 Primary Emotion Families with 5 Intensity Levels
  const emotionFamilies = {
    joy: {
      'Serenity': {
        level: 1,
        score: 1,
        description: 'A state of calm contentment and inner peace',
        examples: 'Feeling relaxed, peaceful, at ease, tranquil, serene',
        color: '#FFD700',
      },
      'Pleasure': {
        level: 2,
        score: 2,
        description: 'A pleasant feeling of satisfaction and comfort',
        examples: 'Feeling pleased, comfortable, satisfied, gratified, cozy',
        color: '#FFA500',
      },
      'Joy': {
        level: 3,
        score: 3,
        description: 'A feeling of great happiness and delight',
        examples: 'Feeling happy, cheerful, delighted, glad, joyful',
        color: '#FF8C00',
      },
      'Elation': {
        level: 4,
        score: 4,
        description: 'A feeling of great excitement and exhilaration',
        examples: 'Feeling excited, thrilled, exhilarated, jubilant, enthusiastic',
        color: '#FF4500',
      },
      'Ecstasy': {
        level: 5,
        score: 5,
        description: 'An overwhelming feeling of extreme happiness and bliss',
        examples: 'Feeling blissful, euphoric, rapturous, transported, ecstatic',
        color: '#FF0000',
      },
    },
    trust: {
      'Acceptance': {
        level: 1,
        score: 1,
        description: 'A willingness to receive and welcome new experiences',
        examples: 'Feeling open, receptive, welcoming, approachable, accepting',
        color: '#32CD32',
      },
      'Trust': {
        level: 2,
        score: 2,
        description: 'A confident belief in reliability and truth',
        examples: 'Feeling confident, assured, secure, trusting, reliable',
        color: '#228B22',
      },
      'Admiration': {
        level: 3,
        score: 3,
        description: 'A feeling of respect and appreciation for others',
        examples: 'Feeling respectful, appreciative, admiring, valuing, honoring',
        color: '#006400',
      },
      'Devotion': {
        level: 4,
        score: 4,
        description: 'A strong commitment and loyalty to someone or something',
        examples: 'Feeling dedicated, committed, loyal, devoted, faithful',
        color: '#004D00',
      },
      'Reverence': {
        level: 5,
        score: 5,
        description: 'A feeling of deep respect and awe',
        examples: 'Feeling awed, reverent, worshipful, spiritual, transcendent',
        color: '#003300',
      },
    },
    fear: {
      'Apprehension': {
        level: 1,
        score: 1,
        description: 'A feeling of unease and mild worry about the future',
        examples: 'Feeling uneasy, concerned, worried, apprehensive, anxious',
        color: '#8B4513',
      },
      'Fear': {
        level: 2,
        score: 2,
        description: 'An unpleasant emotion caused by the threat of danger',
        examples: 'Feeling afraid, frightened, scared, fearful, terrified',
        color: '#A0522D',
      },
      'Terror': {
        level: 3,
        score: 3,
        description: 'An intense feeling of fear and horror',
        examples: 'Feeling horrified, petrified, paralyzed, shocked, stunned',
        color: '#B8860B',
      },
      'Panic': {
        level: 4,
        score: 4,
        description: 'A sudden overwhelming feeling of fear and anxiety',
        examples: 'Feeling frenzied, hysterical, overwhelmed, desperate, frantic',
        color: '#CD853F',
      },
      'Horror': {
        level: 5,
        score: 5,
        description: 'An intense feeling of shock, disgust, and fear',
        examples: 'Feeling mortified, appalled, disgusted, repulsed, revolted',
        color: '#D2691E',
      },
    },
    surprise: {
      'Distraction': {
        level: 1,
        score: 1,
        description: 'A state of being unable to concentrate or focus',
        examples: 'Feeling distracted, preoccupied, absent-minded, unfocused, scattered',
        color: '#FF69B4',
      },
      'Surprise': {
        level: 2,
        score: 2,
        description: 'A feeling caused by something unexpected',
        examples: 'Feeling surprised, startled, taken aback, amazed, shocked',
        color: '#FF1493',
      },
      'Amazement': {
        level: 3,
        score: 3,
        description: 'A feeling of great surprise and wonder',
        examples: 'Feeling amazed, astonished, dumbfounded, flabbergasted, stunned',
        color: '#DC143C',
      },
      'Wonder': {
        level: 4,
        score: 4,
        description: 'A feeling of amazement and admiration',
        examples: 'Feeling wonderstruck, awestruck, marveling, fascinated, captivated',
        color: '#B22222',
      },
      'Astonishment': {
        level: 5,
        score: 5,
        description: 'An overwhelming feeling of surprise and amazement',
        examples: 'Feeling astonished, flabbergasted, gobsmacked, thunderstruck, dumbfounded',
        color: '#8B0000',
      },
    },
    sadness: {
      'Pensiveness': {
        level: 1,
        score: 1,
        description: 'A state of deep or serious thoughtfulness',
        examples: 'Feeling thoughtful, reflective, contemplative, meditative, pensive',
        color: '#4682B4',
      },
      'Sadness': {
        level: 2,
        score: 2,
        description: 'A feeling of unhappiness and sorrow',
        examples: 'Feeling sad, sorrowful, melancholy, downhearted, dejected',
        color: '#4169E1',
      },
      'Grief': {
        level: 3,
        score: 3,
        description: 'Intense sorrow caused by loss or death',
        examples: 'Feeling grieving, mourning, bereaved, heartbroken, devastated',
        color: '#0000CD',
      },
      'Despair': {
        level: 4,
        score: 4,
        description: 'A complete loss of hope and confidence',
        examples: 'Feeling despairing, hopeless, desperate, anguished, tormented',
        color: '#000080',
      },
      'Melancholy': {
        level: 5,
        score: 5,
        description: 'A deep, persistent feeling of sadness and gloom',
        examples: 'Feeling melancholic, gloomy, somber, mournful, elegiac',
        color: '#00008B',
      },
    },
    disgust: {
      'Boredom': {
        level: 1,
        score: 1,
        description: 'A state of being uninterested and unengaged',
        examples: 'Feeling bored, uninterested, apathetic, indifferent, unengaged',
        color: '#808080',
      },
      'Disgust': {
        level: 2,
        score: 2,
        description: 'A strong feeling of dislike and revulsion',
        examples: 'Feeling disgusted, repulsed, revolted, appalled, sickened',
        color: '#696969',
      },
      'Loathing': {
        level: 3,
        score: 3,
        description: 'An intense feeling of hatred and disgust',
        examples: 'Feeling loathing, abhorring, detesting, despising, hating',
        color: '#556B2F',
      },
      'Revulsion': {
        level: 4,
        score: 4,
        description: 'A strong feeling of disgust and repulsion',
        examples: 'Feeling revolted, repelled, sickened, nauseated, disgusted',
        color: '#2F4F4F',
      },
      'Abhorrence': {
        level: 5,
        score: 5,
        description: 'An intense feeling of hatred and disgust',
        examples: 'Feeling abhorring, detesting, loathing, despising, hating',
        color: '#000000',
      },
    },
    anger: {
      'Annoyance': {
        level: 1,
        score: 1,
        description: 'A feeling of slight irritation and frustration',
        examples: 'Feeling annoyed, irritated, bothered, frustrated, aggravated',
        color: '#FF6347',
      },
      'Anger': {
        level: 2,
        score: 2,
        description: 'A strong feeling of displeasure and hostility',
        examples: 'Feeling angry, mad, furious, enraged, livid',
        color: '#FF4500',
      },
      'Rage': {
        level: 3,
        score: 3,
        description: 'An intense feeling of anger and fury',
        examples: 'Feeling enraged, furious, livid, incensed, infuriated',
        color: '#DC143C',
      },
      'Fury': {
        level: 4,
        score: 4,
        description: 'An intense feeling of anger and rage',
        examples: 'Feeling furious, enraged, livid, incensed, infuriated',
        color: '#B22222',
      },
      'Wrath': {
        level: 5,
        score: 5,
        description: 'An intense feeling of anger and vengeance',
        examples: 'Feeling wrathful, vengeful, spiteful, malicious, vindictive',
        color: '#8B0000',
      },
    },
    anticipation: {
      'Interest': {
        level: 1,
        score: 1,
        description: 'A feeling of curiosity and engagement',
        examples: 'Feeling interested, curious, intrigued, fascinated, engaged',
        color: '#32CD32',
      },
      'Anticipation': {
        level: 2,
        score: 2,
        description: 'A feeling of excitement about something to come',
        examples: 'Feeling anticipating, expecting, looking forward to, eager, excited',
        color: '#228B22',
      },
      'Vigilance': {
        level: 3,
        score: 3,
        description: 'A state of being watchful and alert',
        examples: 'Feeling vigilant, watchful, alert, attentive, observant',
        color: '#006400',
      },
      'Eagerness': {
        level: 4,
        score: 4,
        description: 'A feeling of enthusiastic desire and readiness',
        examples: 'Feeling eager, enthusiastic, keen, excited, motivated',
        color: '#004D00',
      },
      'Excitement': {
        level: 5,
        score: 5,
        description: 'A feeling of great enthusiasm and eagerness',
        examples: 'Feeling excited, thrilled, exhilarated, energized, pumped',
        color: '#003300',
      },
    },
  };

  // 24 Combination Emotions (Primary + Secondary combinations)
  const combinationEmotions = {
    'Love': {
      formula: 'Joy + Trust',
      score: 6,
      description: 'Deep affection and attachment combining happiness and trust',
      examples: 'Romantic love, familial love, deep friendship, unconditional care',
    },
    'Optimism': {
      formula: 'Joy + Anticipation',
      score: 6,
      description: 'Positive outlook on future combining happiness and expectation',
      examples: 'Hope, confidence, positive expectations, cheerful anticipation',
    },
    'Delight': {
      formula: 'Joy + Surprise',
      score: 6,
      description: 'Pleasant surprise and joy combining happiness and amazement',
      examples: 'Unexpected joy, pleasant shock, happy amazement, joyful surprise',
    },
    'Submission': {
      formula: 'Trust + Fear',
      score: 6,
      description: 'Yielding to authority or pressure combining trust and anxiety',
      examples: 'Compliance, deference, respectful yielding, trusting surrender',
    },
    'Curiosity': {
      formula: 'Trust + Surprise',
      score: 6,
      description: 'Desire to learn and explore combining trust and wonder',
      examples: 'Inquisitiveness, exploration, learning desire, wonderment',
    },
    'Sentimentality': {
      formula: 'Trust + Sadness',
      score: 6,
      description: 'Emotional attachment to memories combining trust and sorrow',
      examples: 'Nostalgia, emotional memories, sentimental attachment, bittersweet feelings',
    },
    'Disappointment': {
      formula: 'Sadness + Surprise',
      score: 6,
      description: 'Unmet expectations and sadness combining sorrow and shock',
      examples: 'Letdown, unmet hopes, sad surprise, dashed expectations',
    },
    'Remorse': {
      formula: 'Sadness + Disgust',
      score: 6,
      description: 'Guilt and regret combining sorrow and self-disgust',
      examples: 'Guilt, regret, self-reproach, moral pain, contrition',
    },
    'Contempt': {
      formula: 'Disgust + Anger',
      score: 6,
      description: 'Disdain and superiority combining disgust and hostility',
      examples: 'Scorn, disdain, superiority, derision, mockery',
    },
    'Envy': {
      formula: 'Sadness + Anger',
      score: 6,
      description: 'Resentment of others\' success combining sorrow and hostility',
      examples: 'Jealousy, resentment, covetousness, bitter envy, spite',
    },
    'Pessimism': {
      formula: 'Sadness + Anticipation',
      score: 6,
      description: 'Negative future expectations combining sorrow and expectation',
      examples: 'Gloomy outlook, negative anticipation, hopeless expectation',
    },
    'Aggressiveness': {
      formula: 'Anger + Anticipation',
      score: 6,
      description: 'Hostile forward movement combining anger and expectation',
      examples: 'Hostility, belligerence, combative anticipation, aggressive expectation',
    },
    'Pride': {
      formula: 'Joy + Anger',
      score: 6,
      description: 'Self-satisfaction and confidence combining happiness and assertiveness',
      examples: 'Self-esteem, confidence, self-respect, dignified satisfaction',
    },
    'Courage': {
      formula: 'Anger + Trust',
      score: 6,
      description: 'Bravery in face of fear combining anger and confidence',
      examples: 'Bravery, valor, fearlessness, bold confidence, heroic trust',
    },
    'Outrage': {
      formula: 'Surprise + Anger',
      score: 6,
      description: 'Shocked anger and indignation combining surprise and hostility',
      examples: 'Indignation, shocked anger, moral outrage, scandalized fury',
    },
    'Shame': {
      formula: 'Fear + Disgust',
      score: 6,
      description: 'Self-disgust and humiliation combining fear and self-loathing',
      examples: 'Humiliation, self-disgust, mortification, disgrace, dishonor',
    },
    'Nervousness': {
      formula: 'Fear + Anticipation',
      score: 6,
      description: 'Anxious anticipation combining fear and expectation',
      examples: 'Anxiety, worry, nervous anticipation, anxious expectation',
    },
    'Confusion': {
      formula: 'Fear + Surprise',
      score: 6,
      description: 'Uncertainty and bewilderment combining fear and amazement',
      examples: 'Bewilderment, perplexity, confused fear, uncertain amazement',
    },
    'Hopelessness': {
      formula: 'Fear + Sadness',
      score: 6,
      description: 'Despair and lack of hope combining fear and sorrow',
      examples: 'Despair, hopelessness, desperate fear, sorrowful dread',
    },
    'Frustration': {
      formula: 'Anger + Sadness',
      score: 6,
      description: 'Angry disappointment combining anger and sorrow',
      examples: 'Angry disappointment, bitter frustration, hostile sorrow',
    },
    'Jealousy': {
      formula: 'Anger + Fear',
      score: 6,
      description: 'Fear of losing something valued combining anger and anxiety',
      examples: 'Possessive fear, anxious anger, protective hostility',
    },
    'Disapproval': {
      formula: 'Disgust + Sadness',
      score: 6,
      description: 'Negative judgment and sadness combining disgust and sorrow',
      examples: 'Moral disapproval, sad disgust, sorrowful rejection',
    },
    'Awe': {
      formula: 'Fear + Surprise',
      score: 6,
      description: 'Reverential fear and wonder combining fear and amazement',
      examples: 'Reverence, wonder, fearful amazement, respectful surprise',
    },
    'Dominance': {
      formula: 'Anger + Trust',
      score: 6,
      description: 'Confident control and authority combining anger and confidence',
      examples: 'Authority, control, confident power, assertive leadership',
    },
    'Anxiety': {
      formula: 'Fear + Anticipation',
      score: 6,
      description: 'Worried anticipation of threat combining fear and expectation',
      examples: 'Worry, anxious anticipation, fearful expectation, nervous dread',
    },
  };

  const handleAnswer = (questionId: string, value: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const calculateResults = (): EmotionWheelResult => {
    // Calculate primary emotion scores
    const primaryScores: { [key: string]: { [key: string]: number } } = {};
    Object.entries(emotionFamilies).forEach(([family, emotions]) => {
      primaryScores[family] = {};
      Object.keys(emotions).forEach(emotion => {
        const key = `primary_${family}_${emotion.toLowerCase().replace(/\s+/g, '_')}`;
        primaryScores[family][emotion] = answers[key] || 0;
      });
    });

    // Calculate combination emotion scores
    const combinationScores: { [key: string]: number } = {};
    Object.keys(combinationEmotions).forEach(combination => {
      const key = `combination_${combination.toLowerCase().replace(/\s+/g, '_')}`;
      combinationScores[combination] = answers[key] || 0;
    });

    // Calculate emotional balance
    const positiveEmotions = Object.values(primaryScores.joy || {}).reduce((sum: number, val: any) => sum + val, 0) +
                           Object.values(primaryScores.trust || {}).reduce((sum: number, val: any) => sum + val, 0) +
                           Object.values(primaryScores.anticipation || {}).reduce((sum: number, val: any) => sum + val, 0);
    const negativeEmotions = Object.values(primaryScores.fear || {}).reduce((sum: number, val: any) => sum + val, 0) +
                           Object.values(primaryScores.sadness || {}).reduce((sum: number, val: any) => sum + val, 0) +
                           Object.values(primaryScores.anger || {}).reduce((sum: number, val: any) => sum + val, 0);
    const neutralEmotions = Object.values(primaryScores.surprise || {}).reduce((sum: number, val: any) => sum + val, 0) +
                           Object.values(primaryScores.disgust || {}).reduce((sum: number, val: any) => sum + val, 0);

    const emotionalBalance = {
      positive: positiveEmotions,
      negative: negativeEmotions,
      neutral: neutralEmotions,
    };

    // Calculate intensity profile
    const intensityProfile: { [key: string]: number } = {};
    [1, 2, 3, 4, 5].forEach(level => {
      intensityProfile[`Level ${level}`] = 0;
      Object.values(answers).forEach(value => {
        if (value === level) {
          intensityProfile[`Level ${level}`]++;
        }
      });
    });

    // Calculate emotional granularity
    const uniqueScores = new Set(Object.values(answers).filter(v => v > 0));
    const emotionalGranularity = Math.round((uniqueScores.size / 5) * 100);

    // Calculate pattern analysis
    const patternAnalysis = calculatePatternAnalysis(primaryScores, combinationScores);

    // Generate insights and recommendations
    const insights = generateInsights(primaryScores, combinationScores, emotionalBalance);
    const recommendations = generateRecommendations(primaryScores, combinationScores, patternAnalysis);

    return {
      primaryEmotions: primaryScores,
      combinationEmotions: combinationScores,
      emotionalBalance,
      intensityProfile,
      emotionalGranularity,
      patternAnalysis,
      insights,
      recommendations,
    };
  };

  const calculatePatternAnalysis = (primaryScores: any, combinationScores: any): { [key: string]: number } => {
    const patterns: { [key: string]: number } = {};

    // Emotional balance score
    const positiveTotal = Object.values(primaryScores.joy || {}).reduce((sum: number, val: any) => sum + val, 0) +
                         Object.values(primaryScores.trust || {}).reduce((sum: number, val: any) => sum + val, 0) +
                         Object.values(primaryScores.anticipation || {}).reduce((sum: number, val: any) => sum + val, 0);
    const negativeTotal = Object.values(primaryScores.fear || {}).reduce((sum: number, val: any) => sum + val, 0) +
                         Object.values(primaryScores.sadness || {}).reduce((sum: number, val: any) => sum + val, 0) +
                         Object.values(primaryScores.anger || {}).reduce((sum: number, val: any) => sum + val, 0);

    patterns['Emotional Balance'] = positiveTotal > negativeTotal ? 80 : 40;

    // Intensity regulation
    const highIntensity = Object.values(answers).filter((val: any) => val >= 4).length;
    const totalAnswers = Object.values(answers).filter((val: any) => val > 0).length;
    patterns['Intensity Regulation'] = totalAnswers > 0 ? Math.round(((totalAnswers - highIntensity) / totalAnswers) * 100) : 0;

    // Combination complexity
    const activeCombinations = Object.values(combinationScores).filter((val: any) => val > 0).length;
    patterns['Combination Complexity'] = Math.round((activeCombinations / 24) * 100);

    return patterns;
  };

  const generateInsights = (primaryScores: any, combinationScores: any, emotionalBalance: any): string[] => {
    const insights: string[] = [];

    // Emotional balance insights
    if (emotionalBalance.positive > emotionalBalance.negative) {
      insights.push('Your emotional profile shows a positive orientation with higher joy, trust, and anticipation');
    } else if (emotionalBalance.negative > emotionalBalance.positive) {
      insights.push('Your emotional profile shows higher levels of fear, sadness, and anger patterns');
    }

    // Family dominance analysis
    const familyTotals: { [key: string]: number } = {};
    Object.entries(primaryScores).forEach(([family, emotions]) => {
      familyTotals[family] = Object.values(emotions as { [key: string]: number }).reduce((sum: number, val: any) => sum + val, 0);
    });

    const topFamily = Object.entries(familyTotals)
      .sort(([,a], [,b]) => (b as number) - (a as number))[0];

    if (topFamily) {
      insights.push(`${topFamily[0].charAt(0).toUpperCase() + topFamily[0].slice(1)} family dominates your emotional profile`);
    }

    // Combination emotion insights
    const activeCombinations = Object.values(combinationScores).filter((v: any) => v > 0).length;
    if (activeCombinations > 15) {
      insights.push('You experience a wide range of complex combination emotions, indicating sophisticated emotional processing');
    } else if (activeCombinations < 8) {
      insights.push('You tend to experience basic emotions with limited combination complexity');
    }

    return insights;
  };

  const generateRecommendations = (primaryScores: any, combinationScores: any, patterns: any): string[] => {
    const recommendations: string[] = [];

    // Based on emotional balance
    if (patterns['Emotional Balance'] < 50) {
      recommendations.push('Focus on developing positive emotion families (Joy, Trust, Anticipation) through positive experiences and gratitude practices');
    }

    // Based on intensity regulation
    if (patterns['Intensity Regulation'] < 60) {
      recommendations.push('Practice emotional regulation techniques to manage high-intensity emotional responses');
    }

    // Based on combination complexity
    if (patterns['Combination Complexity'] < 40) {
      recommendations.push('Explore combination emotions to enhance emotional granularity and self-awareness');
    }

    recommendations.push('Use this emotional profile as a baseline for tracking emotional growth and development');
    recommendations.push('Consider how these emotional patterns influence your relationships and decision-making');

    return recommendations;
  };

  const handleComplete = () => {
    const calculatedResults = calculateResults();
    setResults(calculatedResults);
    setIsComplete(true);
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Primary Emotion Families Assessment</h2>
      <p className="text-gray-600 mb-6">
        Rate how frequently you experience each emotion on a scale from 1 (Rarely) to 5 (Always).
      </p>

      {Object.entries(emotionFamilies).map(([family, emotions]) => (
        <div key={family} className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 capitalize">
            {family} Family - 5 Intensity Levels
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(emotions).map(([emotion, data]) => (
              <div key={emotion} className="bg-white p-4 rounded border shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <p className="font-medium text-gray-800">{emotion}</p>
                  <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    Level {data.level}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{data.description}</p>
                <p className="text-xs text-gray-500 mb-3">{data.examples}</p>
                <div className="space-y-2">
                  {[1, 2, 3, 4, 5].map(value => (
                    <label key={value} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name={`primary_${family}_${emotion.toLowerCase().replace(/\s+/g, '_')}`}
                        value={value}
                        onChange={() => handleAnswer(`primary_${family}_${emotion.toLowerCase().replace(/\s+/g, '_')}`, value)}
                        className="text-blue-600"
                      />
                      <span className="text-sm text-gray-600">
                        {value} - {value === 1 ? 'Rarely' : value === 2 ? 'Sometimes' : value === 3 ? 'Often' : value === 4 ? 'Very Often' : 'Always'}
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
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Combination Emotions Assessment</h2>
      <p className="text-gray-600 mb-6">
        Rate how frequently you experience these 24 combination emotions that blend multiple primary emotions.
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
            <p className="text-xs text-purple-600 mb-2 font-mono">{data.formula}</p>
            <p className="text-xs text-gray-500 mb-3">{data.examples}</p>
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
                    {value} - {value === 1 ? 'Rarely' : value === 2 ? 'Sometimes' : value === 3 ? 'Often' : value === 4 ? 'Very Often' : 'Always'}
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
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Emotional Context & Patterns</h2>
      <p className="text-gray-600 mb-6">
        Provide additional context about your emotional experiences and patterns.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Emotional Triggers & Context</h3>
          <div className="space-y-4">
            {[
              'Social Situations',
              'Work/Professional',
              'Personal Relationships',
              'Physical Health',
              'Environmental Factors',
            ].map(area => (
              <div key={area} className="bg-white p-3 rounded border">
                <p className="font-medium text-gray-800 mb-2">{area}</p>
                <div className="space-y-2">
                  {[1, 2, 3, 4, 5].map(value => (
                    <label key={value} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name={`context_${area.toLowerCase().replace(/\s+/g, '_')}`}
                        value={value}
                        onChange={() => handleAnswer(`context_${area.toLowerCase().replace(/\s+/g, '_')}`, value)}
                        className="text-green-600"
                      />
                      <span className="text-sm text-gray-600">
                        {value} - {value === 1 ? 'No Impact' : value === 2 ? 'Mild' : value === 3 ? 'Moderate' : value === 4 ? 'Significant' : 'Major'}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Emotional Management & Awareness</h3>
          <div className="space-y-4">
            {[
              'Emotional Recognition',
              'Regulation Ability',
              'Recovery Time',
              'Pattern Awareness',
              'Coping Strategies',
            ].map(area => (
              <div key={area} className="bg-white p-3 rounded border">
                <p className="font-medium text-gray-800 mb-2">{area}</p>
                <div className="space-y-2">
                  {[1, 2, 3, 4, 5].map(value => (
                    <label key={value} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name={`management_${area.toLowerCase().replace(/\s+/g, '_')}`}
                        value={value}
                        onChange={() => handleAnswer(`management_${area.toLowerCase().replace(/\s+/g, '_')}`, value)}
                        className="text-green-600"
                      />
                      <span className="text-sm text-gray-600">
                        {value} - {value === 1 ? 'Very Low' : value === 2 ? 'Low' : value === 3 ? 'Moderate' : value === 4 ? 'High' : 'Very High'}
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
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Plutchik Emotion Wheel Assessment Complete!</h2>
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-100 p-4 rounded-lg">
              <p className="text-lg font-bold text-blue-800">Emotional Granularity</p>
              <p className="text-2xl font-bold text-blue-800">{results.emotionalGranularity}%</p>
            </div>
            <div className="bg-green-100 p-4 rounded-lg">
              <p className="text-lg font-bold text-green-800">Positive Emotions</p>
              <p className="text-2xl font-bold text-green-800">{results.emotionalBalance.positive}</p>
            </div>
            <div className="bg-red-100 p-4 rounded-lg">
              <p className="text-lg font-bold text-red-800">Negative Emotions</p>
              <p className="text-2xl font-bold text-red-800">{results.emotionalBalance.negative}</p>
            </div>
          </div>
        </div>

        {/* Pattern Analysis */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-blue-600" />
            Emotional Pattern Analysis
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

        {/* Primary Emotion Family Scores */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Target className="w-6 h-6 text-purple-600" />
            Primary Emotion Family Scores
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {Object.entries(results.primaryEmotions).map(([family, emotions]) => {
              const familyScore = Object.values(emotions).reduce((sum: number, val: any) => sum + val, 0);
              const maxScore = Object.keys(emotions).length * 5;
              const percentage = Math.round((familyScore / maxScore) * 100);

              return (
                <div key={family} className="bg-gray-50 p-4 rounded">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium capitalize">{family}</span>
                    <span className="text-sm text-gray-600">{familyScore}/{maxScore}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Insights */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Brain className="w-6 h-6 text-green-600" />
            Key Insights
          </h3>
          <ul className="space-y-2">
            {results.insights.map((insight, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-green-600 mt-1">💡</span>
                <span>{insight}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Recommendations */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Activity className="w-6 h-6 text-yellow-600" />
            Personalized Recommendations
          </h3>
          <ul className="space-y-2">
            {results.recommendations.map((rec, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-yellow-600 mt-1">🎯</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-center space-y-4">
          <button
            onClick={() => setShowReport(true)}
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center gap-2 mx-auto"
          >
            <FileText className="w-5 h-5" />
            Generate Comprehensive Report
          </button>

          <button
            onClick={() => window.print()}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center gap-2 mx-auto"
          >
            <Download className="w-5 h-5" />
            Print Results
          </button>
        </div>
      </div>
    );
  };

  // Show report modal if requested
  if (showReport && results) {
    return (
      <EmotionalIntelligenceReport
        emotionWheelResults={results}
        onClose={() => setShowReport(false)}
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
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Plutchik Emotion Wheel Assessment</h1>
          <p className="text-xl text-gray-600 mb-6">
            Comprehensive Emotional Intelligence & Pattern Recognition Framework
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
            <span>Step {currentStep} of {totalSteps}</span>
            <div className="flex gap-2">
              {[1, 2, 3].map(step => (
                <div
                  key={step}
                  className={`w-3 h-3 rounded-full ${
                    step <= currentStep ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
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
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleComplete}
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
            >
              Complete Assessment
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlutchikEmotionWheelAssessment;
