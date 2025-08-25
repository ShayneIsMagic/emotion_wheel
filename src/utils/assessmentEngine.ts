import { 
  AssessmentSession, 
  AssessmentScores, 
  EmotionalInsights, 
  Recommendations, 
  GEW_EMOTIONS, 
  PANAS_ITEMS, 
  PRIMARY_EMOTIONS,
  EmotionCategory,
  TimeFrame 
} from '../types/emotion';

/**
 * Core Assessment Engine
 * Implements validated scoring algorithms from Geneva Emotion Wheel, PANAS, and Plutchik's research
 */
export class AssessmentEngine {
  
  /**
   * Calculate comprehensive assessment scores
   */
  static calculateScores(responses: Record<string, number>, timeframe: TimeFrame): AssessmentScores {
    return {
      panas: this.calculatePANASScores(responses),
      gew: this.calculateGEWScores(responses),
      dimensional: this.calculateDimensionalScores(responses),
      plutchik: this.calculatePlutchikScores(responses)
    };
  }

  /**
   * PANAS Scoring following Watson et al. (1988) protocol
   * Positive Affect (PA): Sum of 10 positive items (1-5 scale each)
   * Negative Affect (NA): Sum of 10 negative items (1-5 scale each)
   */
  private static calculatePANASScores(responses: Record<string, number>): AssessmentScores['panas'] {
    const paScore = PANAS_ITEMS.positive.reduce((sum, item) => {
      return sum + (responses[`panas_positive_${item}`] || 0);
    }, 0);
    
    const naScore = PANAS_ITEMS.negative.reduce((sum, item) => {
      return sum + (responses[`panas_negative_${item}`] || 0);
    }, 0);
    
    return {
      positive: paScore,
      negative: naScore,
      balance: paScore - naScore
    };
  }

  /**
   * Geneva Emotion Wheel scoring based on Scherer et al. (2013)
   * Groups emotions by valence and arousal quadrants
   */
  private static calculateGEWScores(responses: Record<string, number>): AssessmentScores['gew'] {
    const quadrants = {
      positiveHighArousal: 0,
      positiveLowArousal: 0,
      negativeLowArousal: 0,
      negativeHighArousal: 0
    };

    GEW_EMOTIONS.forEach(emotion => {
      const intensity = responses[emotion.name] || 0;
      switch (emotion.quadrant) {
        case 'positive_high_arousal':
          quadrants.positiveHighArousal += intensity;
          break;
        case 'positive_low_arousal':
          quadrants.positiveLowArousal += intensity;
          break;
        case 'negative_low_arousal':
          quadrants.negativeLowArousal += intensity;
          break;
        case 'negative_high_arousal':
          quadrants.negativeHighArousal += intensity;
          break;
      }
    });

    return quadrants;
  }

  /**
   * Dimensional scores from Russell's Circumplex Model
   * Direct ratings on 1-9 scales for valence, arousal, and power
   */
  private static calculateDimensionalScores(responses: Record<string, number>): AssessmentScores['dimensional'] {
    return {
      valence: responses['valence'] || 5,
      arousal: responses['arousal'] || 5,
      power: responses['power'] || 5
    };
  }

  /**
   * Plutchik's 8 primary emotions scoring
   * Maps specific emotions to primary categories with evolutionary functions
   */
  private static calculatePlutchikScores(responses: Record<string, number>): AssessmentScores['plutchik'] {
    const scores: Record<EmotionCategory, number> = {
      joy: 0, trust: 0, fear: 0, surprise: 0, sadness: 0, disgust: 0, anger: 0, anticipation: 0
    };

    // Map GEW emotions to Plutchik categories
    GEW_EMOTIONS.forEach(emotion => {
      const intensity = responses[emotion.name] || 0;
      if (emotion.category in scores) {
        scores[emotion.category as EmotionCategory] += intensity;
      }
    });

    // Map comprehensive emotions to Plutchik categories
    const comprehensiveEmotionMapping: Record<string, EmotionCategory> = {
      // Joy family
      'joy': 'joy', 'happiness': 'joy', 'ecstasy': 'joy', 'delight': 'joy', 'pleasure': 'joy',
      'contentment': 'joy', 'satisfaction': 'joy', 'fulfillment': 'joy', 'excitement': 'joy',
      'enthusiasm': 'joy', 'passion': 'joy', 'gratitude': 'joy', 'hope': 'joy', 'pride': 'joy',
      
      // Trust family
      'trust': 'trust', 'acceptance': 'trust', 'admiration': 'trust', 'love': 'trust',
      'compassion': 'trust', 'empathy': 'trust', 'sympathy': 'trust',
      
      // Fear family
      'fear': 'fear', 'terror': 'fear', 'anxiety': 'fear', 'worry': 'fear', 'apprehension': 'fear',
      'nervousness': 'fear', 'jittery': 'fear', 'afraid': 'fear', 'scared': 'fear',
      
      // Surprise family
      'surprise': 'surprise', 'amazement': 'surprise', 'astonishment': 'surprise', 'wonder': 'surprise',
      'bewilderment': 'surprise', 'curiosity': 'surprise', 'interest': 'surprise',
      
      // Sadness family
      'sadness': 'sadness', 'grief': 'sadness', 'sorrow': 'sadness', 'melancholy': 'sadness',
      'pensiveness': 'sadness', 'loneliness': 'sadness', 'isolation': 'sadness',
      'abandonment': 'sadness', 'rejection': 'sadness', 'guilt': 'sadness', 'shame': 'sadness',
      'disappointment': 'sadness', 'remorse': 'sadness',
      
      // Disgust family
      'disgust': 'disgust', 'loathing': 'disgust', 'aversion': 'disgust', 'contempt': 'disgust',
      'boredom': 'disgust',
      
      // Anger family
      'anger': 'anger', 'rage': 'anger', 'fury': 'anger', 'irritation': 'anger', 'annoyance': 'anger',
      'frustration': 'anger', 'resentment': 'anger', 'bitterness': 'anger', 'hostile': 'anger',
      'irritable': 'anger', 'aggressive': 'anger',
      
      // Anticipation family
      'anticipation': 'anticipation', 'expectancy': 'anticipation', 'vigilance': 'anticipation',
      'attentiveness': 'anticipation', 'alertness': 'anticipation', 'optimism': 'anticipation',
      'determination': 'anticipation', 'strong': 'anticipation', 'active': 'anticipation',
      'proud': 'anticipation', 'determined': 'anticipation'
    };

    // Process all responses and map to Plutchik categories
    Object.entries(responses).forEach(([emotionName, intensity]) => {
      // Skip PANAS items as they're handled separately
      if (emotionName.startsWith('panas_') || emotionName.startsWith('valence') || 
          emotionName.startsWith('arousal') || emotionName.startsWith('power')) {
        return;
      }

      const mappedCategory = comprehensiveEmotionMapping[emotionName.toLowerCase()];
      if (mappedCategory && intensity > 0) {
        scores[mappedCategory] += intensity;
      }
    });

    // Map PANAS items to Plutchik categories (existing logic)
    PANAS_ITEMS.positive.forEach(item => {
      const intensity = responses[`panas_positive_${item}`] || 0;
      if (['Enthusiastic', 'Excited', 'Inspired'].includes(item)) {
        scores.joy += intensity;
      } else if (['Alert', 'Attentive', 'Interested'].includes(item)) {
        scores.anticipation += intensity;
      } else if (['Strong', 'Active', 'Proud'].includes(item)) {
        scores.joy += intensity;
      } else if (['Determined'].includes(item)) {
        scores.anger += intensity; // Anger as overcoming obstacles
      }
    });

    PANAS_ITEMS.negative.forEach(item => {
      const intensity = responses[`panas_negative_${item}`] || 0;
      if (['Scared', 'Nervous', 'Jittery', 'Afraid'].includes(item)) {
        scores.fear += intensity;
      } else if (['Hostile', 'Irritable'].includes(item)) {
        scores.anger += intensity;
      } else if (['Guilty', 'Ashamed'].includes(item)) {
        scores.sadness += intensity;
      } else if (['Distressed', 'Upset'].includes(item)) {
        scores.sadness += intensity;
      }
    });

    return scores;
  }

  /**
   * Generate emotional insights based on assessment results
   */
  static generateInsights(scores: AssessmentScores, responses: Record<string, number>): EmotionalInsights {
    const dominantPatterns = this.identifyDominantPatterns(scores);
    const emotionalBalance = this.assessEmotionalBalance(scores);
    const intensityProfile = this.assessIntensityProfile(responses);
    const topEmotions = this.identifyTopEmotions(responses);

    return {
      dominantPatterns,
      emotionalBalance,
      intensityProfile,
      topEmotions
    };
  }

  /**
   * Identify dominant emotional patterns using Plutchik's framework
   */
  private static identifyDominantPatterns(scores: AssessmentScores): string[] {
    const patterns: string[] = [];
    
    // Find top 3 primary emotions
    const sortedPrimary = Object.entries(scores.plutchik)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3);

    sortedPrimary.forEach(([emotion, score], index) => {
      if (score > 0) {
        const emotionInfo = PRIMARY_EMOTIONS[emotion as EmotionCategory];
        if (index === 0) {
          patterns.push(`Your dominant emotional theme is **${emotionInfo.name}** (${score} intensity), which serves the evolutionary function of ${emotionInfo.evolutionaryFunction.toLowerCase()}.`);
        } else if (index === 1) {
          patterns.push(`Your secondary pattern is **${emotionInfo.name}** (${score} intensity), supporting ${emotionInfo.evolutionaryFunction.toLowerCase()}.`);
        } else {
          patterns.push(`You also show **${emotionInfo.name}** (${score} intensity) as a supporting emotion.`);
        }
      }
    });

    return patterns;
  }

  /**
   * Assess overall emotional balance using PANAS scores
   */
  private static assessEmotionalBalance(scores: AssessmentScores): EmotionalInsights['emotionalBalance'] {
    const { positive, negative } = scores.panas;
    
    if (positive > negative * 1.5) {
      return 'predominantly_positive';
    } else if (negative > positive * 1.5) {
      return 'predominantly_negative';
    } else {
      return 'balanced';
    }
  }

  /**
   * Assess emotional intensity profile
   */
  private static assessIntensityProfile(responses: Record<string, number>): EmotionalInsights['intensityProfile'] {
    const allRatings = Object.values(responses).filter(r => r > 0);
    if (allRatings.length === 0) return 'low';
    
    const averageIntensity = allRatings.reduce((sum, r) => sum + r, 0) / allRatings.length;
    
    if (averageIntensity < 2) return 'low';
    if (averageIntensity < 3.5) return 'moderate';
    return 'high';
  }

  /**
   * Identify top 10 most intense emotions
   */
  private static identifyTopEmotions(responses: Record<string, number>): Array<{emotion: string; intensity: number}> {
    return Object.entries(responses)
      .filter(([, rating]) => rating > 0)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([emotion, intensity]) => ({ emotion, intensity }));
  }

  /**
   * Generate personalized recommendations based on assessment results
   */
  static generateRecommendations(scores: AssessmentScores, insights: EmotionalInsights): Recommendations[] {
    const recommendations: Recommendations[] = [];

    // Recommendations for positive emotions
    if (scores.panas.positive > 30) {
      recommendations.push({
        category: 'positive_emotions',
        title: 'Maintain Your Positive Emotional State',
        description: 'Your high positive affect suggests good emotional well-being. Focus on sustaining these positive patterns.',
        actionable: true,
        priority: 'medium',
        resources: ['Gratitude journaling', 'Positive psychology exercises', 'Social connection activities']
      });
    } else if (scores.panas.positive < 20) {
      recommendations.push({
        category: 'positive_emotions',
        title: 'Enhance Positive Emotional Experiences',
        description: 'Your positive affect is below average. Consider activities that promote joy, interest, and engagement.',
        actionable: true,
        priority: 'high',
        resources: ['Behavioral activation', 'Pleasant activities scheduling', 'Social engagement']
      });
    }

    // Recommendations for challenging emotions
    if (scores.panas.negative > 30) {
      recommendations.push({
        category: 'challenging_emotions',
        title: 'Address Elevated Negative Emotions',
        description: 'Your negative affect is above average. Consider strategies for emotional regulation and well-being enhancement.',
        actionable: true,
        priority: 'high',
        resources: ['Mindfulness meditation', 'Cognitive behavioral techniques', 'Professional support']
      });
    }

    // Specific recommendations based on Plutchik patterns
    if (scores.plutchik.fear > 10) {
      recommendations.push({
        category: 'challenging_emotions',
        title: 'Manage Fear and Anxiety',
        description: 'High fear levels detected. Practice anxiety management techniques and consider stress reduction strategies.',
        actionable: true,
        priority: 'high',
        resources: ['Deep breathing exercises', 'Progressive muscle relaxation', 'Anxiety management apps']
      });
    }

    if (scores.plutchik.anger > 10) {
      recommendations.push({
        category: 'challenging_emotions',
        title: 'Channel Anger Constructively',
        description: 'Elevated anger detected. Focus on healthy expression and stress management techniques.',
        actionable: true,
        priority: 'medium',
        resources: ['Physical exercise', 'Anger management techniques', 'Communication skills']
      });
    }

    // Overall wellness recommendations
    recommendations.push({
      category: 'overall_wellness',
      title: 'Maintain Emotional Balance',
      description: 'Regular emotional self-assessment helps maintain awareness and supports emotional well-being.',
      actionable: true,
      priority: 'low',
      resources: ['Regular assessment scheduling', 'Emotional awareness practices', 'Wellness tracking']
    });

    return recommendations;
  }

  /**
   * Generate trend analysis when comparing multiple assessments
   */
  static generateTrendAnalysis(current: AssessmentSession, previous: AssessmentSession) {
    const changes = {
      positiveAffect: current.scores.panas.positive - previous.scores.panas.positive,
      negativeAffect: current.scores.panas.negative - previous.scores.panas.negative,
      emotionalBalance: (current.scores.panas.positive - current.scores.panas.negative) - 
                       (previous.scores.panas.positive - previous.scores.panas.negative),
      dominantEmotions: this.compareDominantEmotions(current.scores.plutchik, previous.scores.plutchik)
    };

    const patterns = this.identifyPatterns(current, previous);
    const progress = this.assessProgress(changes, patterns);

    return { changes, patterns, progress };
  }

  private static compareDominantEmotions(current: Record<EmotionCategory, number>, previous: Record<EmotionCategory, number>): string[] {
    const currentTop = Object.entries(current)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([emotion]) => emotion);
    
    const previousTop = Object.entries(previous)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([emotion]) => emotion);

    const changes: string[] = [];
    
    currentTop.forEach((emotion, index) => {
      if (!previousTop.includes(emotion)) {
        changes.push(`${emotion} emerged as a new dominant emotion`);
      } else if (previousTop.indexOf(emotion) !== index) {
        changes.push(`${emotion} changed in prominence`);
      }
    });

    return changes;
  }

  private static identifyPatterns(current: AssessmentSession, previous: AssessmentSession) {
    const patterns: { seasonal?: string; weekly?: string; monthly?: string } = {};
    
    const timeDiff = current.timestamp.getTime() - previous.timestamp.getTime();
    const daysDiff = timeDiff / (1000 * 60 * 60 * 24);

    if (daysDiff > 30) {
      patterns.monthly = 'Monthly pattern analysis available';
    }
    if (daysDiff > 7) {
      patterns.weekly = 'Weekly pattern analysis available';
    }

    return patterns;
  }

  private static assessProgress(changes: any, patterns: any) {
    const progress = {
      areasOfImprovement: [] as string[],
      persistentChallenges: [] as string[],
      newPatterns: [] as string[]
    };

    if (changes.positiveAffect > 0) {
      progress.areasOfImprovement.push('Positive affect has improved');
    }
    if (changes.negativeAffect < 0) {
      progress.areasOfImprovement.push('Negative affect has decreased');
    }
    if (changes.emotionalBalance > 0) {
      progress.areasOfImprovement.push('Overall emotional balance has improved');
    }

    return progress;
  }
}
