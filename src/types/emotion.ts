// Emotion Types based on Plutchik's Wheel, Geneva Emotion Wheel, and contemporary research
// Enhanced to match 2025 Practicing EQ EBook standards

export interface Emotion {
  name: string;
  category: EmotionCategory;
  intensity: number;
  valence: number; // -1 to 1 (unpleasant to pleasant)
  arousal: number; // -1 to 1 (calm to activated)
  power: number; // -1 to 1 (powerless to powerful)
  quadrant: EmotionalQuadrant;
  primary?: boolean; // Is this a primary emotion in Plutchik's model
  evolutionaryFunction?: string; // Plutchik's evolutionary function
  gewFamily?: string; // Geneva Emotion Wheel family classification
  researchSource?: string; // Academic source for validation
}

export type EmotionCategory =
  | 'joy'
  | 'trust'
  | 'fear'
  | 'surprise'
  | 'sadness'
  | 'disgust'
  | 'anger'
  | 'anticipation';

export type EmotionalQuadrant =
  | 'positive_high_arousal'
  | 'positive_low_arousal'
  | 'negative_low_arousal'
  | 'negative_high_arousal';

// Geneva Emotion Wheel families as per Scherer et al. (2013)
export type GEWFamily =
  | 'positive_high_arousal'
  | 'positive_low_arousal'
  | 'negative_low_arousal'
  | 'negative_high_arousal'
  | 'neutral_high_arousal'
  | 'neutral_low_arousal';

export interface AssessmentResponse {
  emotion: string;
  rating: number;
  timestamp: Date;
  notes?: string;
}

export interface AssessmentSession {
  id: string;
  timestamp: Date;
  timeframe: TimeFrame;
  responses: AssessmentResponse[];
  context: LifeContext;
  scores: AssessmentScores;
  insights: EmotionalInsights;
  recommendations: Recommendations[];
}

export type TimeFrame = 'moment' | 'today' | 'week' | 'general';

export interface LifeContext {
  recentEvents?: string;
  stressors?: string;
  positiveInfluences?: string;
  sleepQuality: 'poor' | 'fair' | 'good' | 'excellent';
  physicalHealth: 'poor' | 'fair' | 'good' | 'excellent';
  socialSupport: 'low' | 'moderate' | 'high';
}

export interface AssessmentScores {
  panas: {
    positive: number; // 10-50
    negative: number; // 10-50
    balance: number; // PA - NA
    reliability?: number; // Internal consistency score
  };
  gew: {
    positiveHighArousal: number;
    positiveLowArousal: number;
    negativeLowArousal: number;
    negativeHighArousal: number;
    neutralHighArousal: number;
    neutralLowArousal: number;
    totalGranularity: number; // Total emotional awareness score
  };
  dimensional: {
    valence: number; // 1-9
    arousal: number; // 1-9
    power: number; // 1-9
    circumplexPosition?: { x: number; y: number }; // Position on Russell's circumplex
  };
  plutchik: {
    // eslint-disable-next-line no-unused-vars
    [key in EmotionCategory]: number;
  } & {
    combinationEmotions?: Record<string, number>; // Secondary emotion combinations
    evolutionaryBalance?: number; // Overall evolutionary fitness score
  };
  // Additional research-validated scores
  emotionalIntelligence?: {
    selfAwareness: number;
    selfRegulation: number;
    socialAwareness: number;
    relationshipManagement: number;
  };
  resilience?: {
    adaptability: number;
    recovery: number;
    growth: number;
  };
}

export interface EmotionalInsights {
  dominantPatterns: string[];
  emotionalBalance: 'predominantly_positive' | 'balanced' | 'predominantly_negative';
  intensityProfile: 'low' | 'moderate' | 'high';
  topEmotions: Array<{emotion: string; intensity: number}>;
  seasonalPatterns?: string[];
  lifeEventCorrelations?: string[];
  // Enhanced insights based on 2025 EBook
  emotionalGranularity?: 'low' | 'moderate' | 'high';
  regulationStrategies?: string[];
  interpersonalDynamics?: string[];
  culturalContext?: string[];
}

export interface Recommendations {
  category: 'positive_emotions' | 'challenging_emotions' | 'overall_wellness' | 'emotional_regulation' | 'interpersonal_skills';
  title: string;
  description: string;
  actionable: boolean;
  priority: 'low' | 'medium' | 'high';
  resources?: string[];
  researchBasis?: string; // Academic source for recommendation
  effectiveness?: 'evidence_based' | 'clinically_supported' | 'theoretical';
}

export interface TrendAnalysis {
  sessionId: string;
  comparisonDate: Date;
  changes: {
    positiveAffect: number;
    negativeAffect: number;
    emotionalBalance: number;
    dominantEmotions: string[];
  };
  patterns: {
    seasonal?: string;
    weekly?: string;
    monthly?: string;
  };
  progress: {
    areasOfImprovement: string[];
    persistentChallenges: string[];
    newPatterns: string[];
  };
}

export interface PDFExportOptions {
  includeCharts: boolean;
  includeTrends: boolean;
  includeRecommendations: boolean;
  format: 'A4' | 'Letter';
  orientation: 'portrait' | 'landscape';
}

export interface TestMode {
  type: 'quick' | 'comprehensive';
  description: string;
  estimatedTime: string;
  emotions: string[];
}

export interface QuickTestEmotions {
  primary: string[];
  secondary: string[];
  tertiary: string[];
}

export interface ComprehensiveTestEmotions {
  plutchik: {
    primary: string[];
    secondary: string[];
    tertiary: string[];
  };
  gew: string[];
  panas: {
    positive: string[];
    negative: string[];
  };
  dimensional: string[];
  additional: string[];
}

// Comprehensive Emotion Definitions and Vocabulary
export interface EmotionDefinition {
  name: string;
  category: EmotionCategory;
  definition: string;
  intensity: 'low' | 'medium' | 'high';
  synonyms: string[];
  relatedEmotions: string[];
  evolutionaryFunction: string;
  commonTriggers: string[];
}

// Expanded Emotion Vocabulary - All Layers and Camps
export const COMPREHENSIVE_EMOTION_VOCABULARY: EmotionDefinition[] = [
  // JOY FAMILY - Positive High Energy
  {
    name: 'joy',
    category: 'joy',
    definition: 'A feeling of great pleasure and happiness',
    intensity: 'high',
    synonyms: ['happiness', 'delight', 'elation'],
    relatedEmotions: ['ecstasy', 'excitement', 'enthusiasm'],
    evolutionaryFunction: 'Promotes social bonding and positive reinforcement',
    commonTriggers: ['achievement', 'social connection', 'pleasant surprises'],
  },
  {
    name: 'ecstasy',
    category: 'joy',
    definition: 'An overwhelming feeling of great happiness or joyful excitement',
    intensity: 'high',
    synonyms: ['rapture', 'bliss', 'euphoria'],
    relatedEmotions: ['joy', 'elation', 'exhilaration'],
    evolutionaryFunction: 'Reinforces highly rewarding behaviors',
    commonTriggers: ['peak experiences', 'spiritual moments', 'intense pleasure'],
  },
  {
    name: 'contentment',
    category: 'joy',
    definition: 'A state of happiness and satisfaction',
    intensity: 'low',
    synonyms: ['satisfaction', 'fulfillment', 'peace'],
    relatedEmotions: ['serenity', 'tranquility', 'gratitude'],
    evolutionaryFunction: 'Signals well-being and reduces stress',
    commonTriggers: ['basic needs met', 'comfortable environment', 'achievement'],
  },
  {
    name: 'gratitude',
    category: 'joy',
    definition: 'A feeling of thankfulness and appreciation',
    intensity: 'medium',
    synonyms: ['thankfulness', 'appreciation', 'recognition'],
    relatedEmotions: ['joy', 'contentment', 'love'],
    evolutionaryFunction: 'Strengthens social bonds and reciprocity',
    commonTriggers: ['receiving help', 'positive experiences', 'reflection'],
  },

  // TRUST FAMILY - Positive Connection
  {
    name: 'trust',
    category: 'trust',
    definition: 'A firm belief in the reliability, truth, or ability of someone or something',
    intensity: 'medium',
    synonyms: ['confidence', 'faith', 'reliance'],
    relatedEmotions: ['acceptance', 'admiration', 'love'],
    evolutionaryFunction: 'Enables cooperation and social cohesion',
    commonTriggers: ['consistent behavior', 'shared values', 'positive experiences'],
  },
  {
    name: 'love',
    category: 'trust',
    definition: 'An intense feeling of deep affection and care',
    intensity: 'high',
    synonyms: ['affection', 'devotion', 'adoration'],
    relatedEmotions: ['trust', 'joy', 'compassion'],
    evolutionaryFunction: 'Strengthens pair bonds and family ties',
    commonTriggers: ['intimate relationships', 'family bonds', 'deep connection'],
  },
  {
    name: 'compassion',
    category: 'trust',
    definition: 'Sympathetic pity and concern for the sufferings or misfortunes of others',
    intensity: 'medium',
    synonyms: ['empathy', 'sympathy', 'kindness'],
    relatedEmotions: ['love', 'trust', 'caring'],
    evolutionaryFunction: 'Promotes altruism and group survival',
    commonTriggers: ['witnessing suffering', 'empathy', 'moral values'],
  },

  // FEAR FAMILY - Threat Response
  {
    name: 'fear',
    category: 'fear',
    definition: 'An unpleasant emotion caused by the threat of danger, pain, or harm',
    intensity: 'medium',
    synonyms: ['terror', 'dread', 'anxiety'],
    relatedEmotions: ['terror', 'anxiety', 'worry'],
    evolutionaryFunction: 'Protects from danger through fight-or-flight response',
    commonTriggers: ['threats', 'uncertainty', 'danger'],
  },
  {
    name: 'terror',
    category: 'fear',
    definition: 'Extreme fear that causes panic',
    intensity: 'high',
    synonyms: ['horror', 'panic', 'dread'],
    relatedEmotions: ['fear', 'anxiety', 'panic'],
    evolutionaryFunction: 'Triggers immediate survival responses',
    commonTriggers: ['life-threatening situations', 'trauma', 'extreme danger'],
  },
  {
    name: 'anxiety',
    category: 'fear',
    definition: 'A feeling of worry, nervousness, or unease about something with an uncertain outcome',
    intensity: 'medium',
    synonyms: ['worry', 'nervousness', 'unease'],
    relatedEmotions: ['fear', 'worry', 'stress'],
    evolutionaryFunction: 'Prepares for potential threats',
    commonTriggers: ['uncertainty', 'stress', 'future concerns'],
  },

  // SURPRISE FAMILY - Novelty Response
  {
    name: 'surprise',
    category: 'surprise',
    definition: 'A feeling of mild astonishment or shock caused by something unexpected',
    intensity: 'medium',
    synonyms: ['amazement', 'astonishment', 'wonder'],
    relatedEmotions: ['amazement', 'wonder', 'curiosity'],
    evolutionaryFunction: 'Prepares for new situations and learning',
    commonTriggers: ['unexpected events', 'new information', 'sudden changes'],
  },
  {
    name: 'wonder',
    category: 'surprise',
    definition: 'A feeling of amazement and admiration, caused by something beautiful, remarkable, or unfamiliar',
    intensity: 'medium',
    synonyms: ['amazement', 'awe', 'curiosity'],
    relatedEmotions: ['surprise', 'curiosity', 'awe'],
    evolutionaryFunction: 'Encourages exploration and learning',
    commonTriggers: ['beautiful sights', 'mysterious phenomena', 'learning'],
  },
  {
    name: 'curiosity',
    category: 'surprise',
    definition: 'A strong desire to know or learn something',
    intensity: 'medium',
    synonyms: ['interest', 'inquisitiveness', 'eagerness'],
    relatedEmotions: ['surprise', 'interest', 'anticipation'],
    evolutionaryFunction: 'Drives exploration and knowledge acquisition',
    commonTriggers: ['new information', 'mysteries', 'learning opportunities'],
  },

  // SADNESS FAMILY - Loss Response
  {
    name: 'sadness',
    category: 'sadness',
    definition: 'A feeling of sorrow or unhappiness',
    intensity: 'medium',
    synonyms: ['sorrow', 'melancholy', 'grief'],
    relatedEmotions: ['grief', 'melancholy', 'loneliness'],
    evolutionaryFunction: 'Signals need for support and social connection',
    commonTriggers: ['loss', 'disappointment', 'separation'],
  },
  {
    name: 'grief',
    category: 'sadness',
    definition: 'Intense sorrow, especially caused by someone\'s death',
    intensity: 'high',
    synonyms: ['mourning', 'bereavement', 'sorrow'],
    relatedEmotions: ['sadness', 'loss', 'despair'],
    evolutionaryFunction: 'Processes loss and signals need for support',
    commonTriggers: ['death', 'major loss', 'endings'],
  },
  {
    name: 'loneliness',
    category: 'sadness',
    definition: 'A feeling of sadness because one has no friends or company',
    intensity: 'medium',
    synonyms: ['isolation', 'solitude', 'abandonment'],
    relatedEmotions: ['sadness', 'isolation', 'abandonment'],
    evolutionaryFunction: 'Motivates social connection',
    commonTriggers: ['social isolation', 'rejection', 'separation'],
  },

  // DISGUST FAMILY - Rejection Response
  {
    name: 'disgust',
    category: 'disgust',
    definition: 'A feeling of revulsion or strong disapproval aroused by something unpleasant or offensive',
    intensity: 'medium',
    synonyms: ['revulsion', 'repulsion', 'aversion'],
    relatedEmotions: ['contempt', 'loathing', 'aversion'],
    evolutionaryFunction: 'Protects from harmful substances and behaviors',
    commonTriggers: ['rotten food', 'unpleasant sights', 'moral violations'],
  },
  {
    name: 'contempt',
    category: 'disgust',
    definition: 'The feeling that a person or a thing is beneath consideration, worthless, or deserving scorn',
    intensity: 'medium',
    synonyms: ['scorn', 'disdain', 'disrespect'],
    relatedEmotions: ['disgust', 'anger', 'disapproval'],
    evolutionaryFunction: 'Establishes social hierarchy and boundaries',
    commonTriggers: ['perceived inferiority', 'moral violations', 'betrayal'],
  },

  // ANGER FAMILY - Obstacle Response
  {
    name: 'anger',
    category: 'anger',
    definition: 'A strong feeling of annoyance, displeasure, or hostility',
    intensity: 'medium',
    synonyms: ['rage', 'fury', 'irritation'],
    relatedEmotions: ['rage', 'frustration', 'irritation'],
    evolutionaryFunction: 'Motivates overcoming obstacles and establishing boundaries',
    commonTriggers: ['frustration', 'injustice', 'threats'],
  },
  {
    name: 'rage',
    category: 'anger',
    definition: 'Violent, uncontrollable anger',
    intensity: 'high',
    synonyms: ['fury', 'wrath', 'outrage'],
    relatedEmotions: ['anger', 'fury', 'outrage'],
    evolutionaryFunction: 'Provides energy for immediate action',
    commonTriggers: ['extreme frustration', 'injustice', 'threats'],
  },
  {
    name: 'frustration',
    category: 'anger',
    definition: 'The feeling of being upset or annoyed, especially because of inability to change or achieve something',
    intensity: 'medium',
    synonyms: ['irritation', 'annoyance', 'exasperation'],
    relatedEmotions: ['anger', 'irritation', 'annoyance'],
    evolutionaryFunction: 'Signals blocked goals and need for strategy change',
    commonTriggers: ['obstacles', 'repeated failures', 'delays'],
  },

  // ANTICIPATION FAMILY - Future Orientation
  {
    name: 'anticipation',
    category: 'anticipation',
    definition: 'The action of anticipating something; expectation or prediction',
    intensity: 'medium',
    synonyms: ['expectation', 'hope', 'eagerness'],
    relatedEmotions: ['hope', 'expectation', 'eagerness'],
    evolutionaryFunction: 'Prepares for future events and opportunities',
    commonTriggers: ['upcoming events', 'goals', 'positive expectations'],
  },
  {
    name: 'hope',
    category: 'anticipation',
    definition: 'A feeling of expectation and desire for a certain thing to happen',
    intensity: 'medium',
    synonyms: ['optimism', 'expectation', 'aspiration'],
    relatedEmotions: ['anticipation', 'optimism', 'eagerness'],
    evolutionaryFunction: 'Maintains motivation and positive outlook',
    commonTriggers: ['goals', 'positive thinking', 'faith'],
  },
  {
    name: 'optimism',
    category: 'anticipation',
    definition: 'Hopefulness and confidence about the future or the successful outcome of something',
    intensity: 'medium',
    synonyms: ['hope', 'confidence', 'positivity'],
    relatedEmotions: ['hope', 'anticipation', 'confidence'],
    evolutionaryFunction: 'Maintains motivation and resilience',
    commonTriggers: ['positive experiences', 'success', 'supportive environment'],
  },
];

// Tertiary Emotions (Complex combinations from Plutchik's Wheel)
export const TERTIARY_EMOTIONS: EmotionDefinition[] = [
  // Joy + Trust + Anticipation combinations
  {
    name: 'bliss',
    category: 'joy',
    definition: 'Perfect happiness and great joy',
    intensity: 'high',
    synonyms: ['ecstasy', 'euphoria', 'rapture'],
    relatedEmotions: ['joy', 'love', 'optimism'],
    evolutionaryFunction: 'Reinforces positive social bonds and reproduction',
    commonTriggers: ['deep love', 'spiritual experiences', 'major achievements'],
  },
  {
    name: 'serenity',
    category: 'trust',
    definition: 'A state of being calm, peaceful, and untroubled',
    intensity: 'medium',
    synonyms: ['tranquility', 'peace', 'calmness'],
    relatedEmotions: ['trust', 'acceptance', 'contentment'],
    evolutionaryFunction: 'Promotes social harmony and reduces conflict',
    commonTriggers: ['safe environment', 'trusted relationships', 'meditation'],
  },
  {
    name: 'anticipation',
    category: 'anticipation',
    definition: 'The action of anticipating something; expectation or prediction',
    intensity: 'medium',
    synonyms: ['expectation', 'prediction', 'forethought'],
    relatedEmotions: ['curiosity', 'interest', 'hope'],
    evolutionaryFunction: 'Prepares for future events and opportunities',
    commonTriggers: ['upcoming events', 'planning', 'learning'],
  },

  // Fear + Surprise + Sadness combinations
  {
    name: 'dread',
    category: 'fear',
    definition: 'Great fear or apprehension',
    intensity: 'high',
    synonyms: ['terror', 'horror', 'fright'],
    relatedEmotions: ['fear', 'anxiety', 'worry'],
    evolutionaryFunction: 'Prepares for severe threats and danger',
    commonTriggers: ['impending danger', 'severe threats', 'trauma'],
  },
  {
    name: 'bewilderment',
    category: 'surprise',
    definition: 'A feeling of being perplexed and confused',
    intensity: 'medium',
    synonyms: ['confusion', 'perplexity', 'puzzlement'],
    relatedEmotions: ['surprise', 'confusion', 'uncertainty'],
    evolutionaryFunction: 'Signals need for information and learning',
    commonTriggers: ['complex situations', 'unexpected events', 'learning challenges'],
  },
  {
    name: 'melancholy',
    category: 'sadness',
    definition: 'A feeling of pensive sadness, typically with no obvious cause',
    intensity: 'medium',
    synonyms: ['sadness', 'sorrow', 'gloom'],
    relatedEmotions: ['sadness', 'loneliness', 'reflection'],
    evolutionaryFunction: 'Promotes introspection and social connection',
    commonTriggers: ['reflection', 'artistic expression', 'quiet moments'],
  },

  // Disgust + Anger + Anticipation combinations
  {
    name: 'contempt',
    category: 'disgust',
    definition: 'The feeling that a person or a thing is beneath consideration, worthless, or deserving scorn',
    intensity: 'medium',
    synonyms: ['scorn', 'disdain', 'derision'],
    relatedEmotions: ['disgust', 'anger', 'pride'],
    evolutionaryFunction: 'Establishes social hierarchy and boundaries',
    commonTriggers: ['moral violations', 'social transgressions', 'inferior behavior'],
  },
  {
    name: 'rage',
    category: 'anger',
    definition: 'Violent, uncontrollable anger',
    intensity: 'high',
    synonyms: ['fury', 'wrath', 'frenzy'],
    relatedEmotions: ['anger', 'fury', 'hostility'],
    evolutionaryFunction: 'Maximum threat response and obstacle removal',
    commonTriggers: ['severe threats', 'major obstacles', 'extreme injustice'],
  },
  {
    name: 'aggression',
    category: 'anger',
    definition: 'Hostile or violent behavior or attitudes toward another',
    intensity: 'high',
    synonyms: ['hostility', 'belligerence', 'combativeness'],
    relatedEmotions: ['anger', 'rage', 'hostility'],
    evolutionaryFunction: 'Removes obstacles and establishes dominance',
    commonTriggers: ['threats', 'competition', 'frustration'],
  },

  // Complex combinations (3+ primary emotions)
  {
    name: 'ecstasy',
    category: 'joy',
    definition: 'An overwhelming feeling of great happiness or joyful excitement',
    intensity: 'high',
    synonyms: ['bliss', 'euphoria', 'rapture'],
    relatedEmotions: ['joy', 'love', 'surprise'],
    evolutionaryFunction: 'Reinforces highly positive experiences and bonds',
    commonTriggers: ['spiritual experiences', 'deep love', 'major achievements'],
  },
  {
    name: 'despair',
    category: 'sadness',
    definition: 'The complete loss or absence of hope',
    intensity: 'high',
    synonyms: ['hopelessness', 'desperation', 'anguish'],
    relatedEmotions: ['sadness', 'fear', 'grief'],
    evolutionaryFunction: 'Signals need for social support and intervention',
    commonTriggers: ['major losses', 'chronic stress', 'depression'],
  },
  {
    name: 'terror',
    category: 'fear',
    definition: 'Extreme fear that causes panic',
    intensity: 'high',
    synonyms: ['horror', 'panic', 'dread'],
    relatedEmotions: ['fear', 'surprise', 'anxiety'],
    evolutionaryFunction: 'Triggers immediate survival responses',
    commonTriggers: ['life-threatening situations', 'trauma', 'extreme danger'],
  },
  {
    name: 'wonder',
    category: 'surprise',
    definition: 'A feeling of surprise mingled with admiration, caused by something beautiful, unexpected, unfamiliar, or inexplicable',
    intensity: 'medium',
    synonyms: ['amazement', 'astonishment', 'awe'],
    relatedEmotions: ['surprise', 'curiosity', 'joy'],
    evolutionaryFunction: 'Encourages exploration and learning',
    commonTriggers: ['beautiful sights', 'mysterious phenomena', 'learning'],
  },
  {
    name: 'loathing',
    category: 'disgust',
    definition: 'A feeling of intense dislike or disgust; abhorrence',
    intensity: 'high',
    synonyms: ['abhorrence', 'detestation', 'revulsion'],
    relatedEmotions: ['disgust', 'hate', 'contempt'],
    evolutionaryFunction: 'Maximum avoidance of harmful stimuli',
    commonTriggers: ['extreme moral violations', 'severe threats', 'trauma'],
  },
  {
    name: 'fury',
    category: 'anger',
    definition: 'Wild or violent anger',
    intensity: 'high',
    synonyms: ['rage', 'wrath', 'frenzy'],
    relatedEmotions: ['anger', 'rage', 'aggression'],
    evolutionaryFunction: 'Maximum threat response and obstacle removal',
    commonTriggers: ['severe threats', 'major obstacles', 'extreme injustice'],
  },
  {
    name: 'vigilance',
    category: 'anticipation',
    definition: 'The action or state of keeping careful watch for possible danger or difficulties',
    intensity: 'medium',
    synonyms: ['alertness', 'watchfulness', 'attentiveness'],
    relatedEmotions: ['anticipation', 'fear', 'curiosity'],
    evolutionaryFunction: 'Prepares for potential threats and opportunities',
    commonTriggers: ['dangerous situations', 'important tasks', 'competition'],
  },
  {
    name: 'adoration',
    category: 'trust',
    definition: 'Deep love and respect',
    intensity: 'high',
    synonyms: ['worship', 'reverence', 'devotion'],
    relatedEmotions: ['trust', 'love', 'admiration'],
    evolutionaryFunction: 'Strengthens social bonds and group cohesion',
    commonTriggers: ['spiritual experiences', 'deep relationships', 'inspiration'],
  },
];

// Append tertiary emotions to the existing comprehensive vocabulary
COMPREHENSIVE_EMOTION_VOCABULARY.push(...TERTIARY_EMOTIONS);

// Additional Contemporary Emotions
export const CONTEMPORARY_EMOTIONS: EmotionDefinition[] = [
  {
    name: 'pride',
    category: 'joy',
    definition: 'A feeling of deep pleasure or satisfaction derived from one\'s own achievements',
    intensity: 'medium',
    synonyms: ['accomplishment', 'satisfaction', 'achievement'],
    relatedEmotions: ['joy', 'satisfaction', 'confidence'],
    evolutionaryFunction: 'Reinforces successful behaviors and self-esteem',
    commonTriggers: ['achievements', 'recognition', 'personal growth'],
  },
  {
    name: 'shame',
    category: 'sadness',
    definition: 'A painful feeling of humiliation or distress caused by the consciousness of wrong or foolish behavior',
    intensity: 'high',
    synonyms: ['humiliation', 'embarrassment', 'guilt'],
    relatedEmotions: ['sadness', 'guilt', 'embarrassment'],
    evolutionaryFunction: 'Signals social norm violations and motivates correction',
    commonTriggers: ['social mistakes', 'moral violations', 'public failure'],
  },
  {
    name: 'envy',
    category: 'sadness',
    definition: 'A feeling of discontented or resentful longing aroused by someone else\'s possessions, qualities, or luck',
    intensity: 'medium',
    synonyms: ['jealousy', 'resentment', 'covetousness'],
    relatedEmotions: ['sadness', 'resentment', 'dissatisfaction'],
    evolutionaryFunction: 'Motivates self-improvement and goal setting',
    commonTriggers: ['comparing oneself to others', 'perceived unfairness', 'desire'],
  },
  {
    name: 'awe',
    category: 'surprise',
    definition: 'A feeling of reverential respect mixed with fear or wonder',
    intensity: 'high',
    synonyms: ['wonder', 'amazement', 'reverence'],
    relatedEmotions: ['wonder', 'surprise', 'reverence'],
    evolutionaryFunction: 'Promotes spiritual and transcendent experiences',
    commonTriggers: ['grandeur', 'spiritual experiences', 'natural wonders'],
  },
];

// Quick Test Emotions (Primary + Secondary from Plutchik's Wheel)
export const QUICK_TEST_EMOTIONS = {
  primary: ['joy', 'trust', 'fear', 'surprise', 'sadness', 'disgust', 'anger', 'anticipation'],
  secondary: [
    // Joy + Trust combinations
    'love', 'optimism',
    // Joy + Anticipation combinations
    'hope', 'excitement',
    // Trust + Anticipation combinations
    'faith', 'confidence',
    // Trust + Joy combinations
    'admiration', 'gratitude',
    // Anticipation + Joy combinations
    'enthusiasm', 'eagerness',
    // Anticipation + Trust combinations
    'curiosity', 'interest',
    // Fear + Surprise combinations
    'awe', 'amazement',
    // Fear + Sadness combinations
    'despair', 'grief',
    // Surprise + Sadness combinations
    'disappointment', 'shock',
    // Surprise + Disgust combinations
    'contempt', 'aversion',
    // Sadness + Disgust combinations
    'remorse', 'guilt',
    // Disgust + Anger combinations
    'hate', 'rage',
    // Anger + Anticipation combinations
    'aggression', 'hostility',
    // Anger + Joy combinations
    'pride', 'triumph',
    // Joy + Surprise combinations
    'delight', 'wonder',
    // Trust + Surprise combinations
    'acceptance', 'openness',
    // Fear + Anticipation combinations
    'anxiety', 'worry',
    // Sadness + Fear combinations
    'loneliness', 'isolation',
    // Disgust + Fear combinations
    'horror', 'terror',
    // Anger + Fear combinations
    'fury', 'wrath',
  ],
};

// Get all emotions for comprehensive assessment
export const getAllEmotions = () => [
  ...COMPREHENSIVE_EMOTION_VOCABULARY.map(e => e.name),
  ...CONTEMPORARY_EMOTIONS.map(e => e.name),
];

// Get emotions by category
export const getEmotionsByCategory = (category: EmotionCategory) =>
  COMPREHENSIVE_EMOTION_VOCABULARY.filter(e => e.category === category);

// Get emotion definition
export const getEmotionDefinition = (emotionName: string): EmotionDefinition | undefined => {
  const allEmotions = [...COMPREHENSIVE_EMOTION_VOCABULARY, ...CONTEMPORARY_EMOTIONS];
  return allEmotions.find(e => e.name.toLowerCase() === emotionName.toLowerCase());
};

// Plutchik's 8 Primary Emotions with evolutionary functions
export const PRIMARY_EMOTIONS: Record<EmotionCategory, {
  name: string;
  evolutionaryFunction: string;
  opposite: EmotionCategory;
  color: string;
}> = {
  joy: {
    name: 'Joy',
    evolutionaryFunction: 'Reproduction - Attracting mates and forming bonds',
    opposite: 'sadness',
    color: '#FFE135',
  },
  trust: {
    name: 'Trust',
    evolutionaryFunction: 'Affiliation - Forming social bonds and cooperation',
    opposite: 'disgust',
    color: '#87CEEB',
  },
  fear: {
    name: 'Fear',
    evolutionaryFunction: 'Protection - Fight-or-flight response for survival',
    opposite: 'anger',
    color: '#90EE90',
  },
  surprise: {
    name: 'Surprise',
    evolutionaryFunction: 'Exploration - Orienting to novel stimuli',
    opposite: 'anticipation',
    color: '#DDA0DD',
  },
  sadness: {
    name: 'Sadness',
    evolutionaryFunction: 'Reintegration - Processing loss and seeking support',
    opposite: 'joy',
    color: '#87CEFA',
  },
  disgust: {
    name: 'Disgust',
    evolutionaryFunction: 'Rejection - Avoiding harmful substances',
    opposite: 'trust',
    color: '#D3D3D3',
  },
  anger: {
    name: 'Anger',
    evolutionaryFunction: 'Destruction - Overcoming obstacles and threats',
    opposite: 'fear',
    color: '#FFB6C1',
  },
  anticipation: {
    name: 'Anticipation',
    evolutionaryFunction: 'Exploration - Planning and preparation',
    opposite: 'surprise',
    color: '#FFA500',
  },
};

// Geneva Emotion Wheel validated emotions - Complete 20 emotion families as per Scherer et al. (2013)
// Enhanced to match 2025 Practicing EQ EBook standards
export const GEW_EMOTIONS: Emotion[] = [
  // Positive High Arousal (High valence, High arousal)
  { name: 'Interest', category: 'anticipation', intensity: 0, valence: 0.5, arousal: 0.3, power: 0.3, quadrant: 'positive_high_arousal', primary: false, gewFamily: 'positive_high_arousal', researchSource: 'Scherer et al. (2013)' },
  { name: 'Pride', category: 'joy', intensity: 0, valence: 0.6, arousal: 0.7, power: 0.7, quadrant: 'positive_high_arousal', primary: false, gewFamily: 'positive_high_arousal', researchSource: 'Scherer et al. (2013)' },
  { name: 'Admiration', category: 'trust', intensity: 0, valence: 0.4, arousal: 0.2, power: 0.2, quadrant: 'positive_high_arousal', primary: false, gewFamily: 'positive_high_arousal', researchSource: 'Scherer et al. (2013)' },
  { name: 'Excitement', category: 'joy', intensity: 0, valence: 0.7, arousal: 0.8, power: 0.6, quadrant: 'positive_high_arousal', primary: false, gewFamily: 'positive_high_arousal', researchSource: 'Scherer et al. (2013)' },
  { name: 'Enthusiasm', category: 'joy', intensity: 0, valence: 0.6, arousal: 0.6, power: 0.5, quadrant: 'positive_high_arousal', primary: false, gewFamily: 'positive_high_arousal', researchSource: 'Scherer et al. (2013)' },

  // Positive Low Arousal (High valence, Low arousal)
  { name: 'Amusement', category: 'joy', intensity: 0, valence: 0.7, arousal: 0.1, power: 0.1, quadrant: 'positive_low_arousal', primary: false, gewFamily: 'positive_low_arousal', researchSource: 'Scherer et al. (2013)' },
  { name: 'Joy', category: 'joy', intensity: 0, valence: 0.8, arousal: 0.2, power: 0.2, quadrant: 'positive_low_arousal', primary: true, gewFamily: 'positive_low_arousal', researchSource: 'Scherer et al. (2013)' },
  { name: 'Pleasure', category: 'joy', intensity: 0, valence: 0.7, arousal: -0.1, power: -0.1, quadrant: 'positive_low_arousal', primary: false, gewFamily: 'positive_low_arousal', researchSource: 'Scherer et al. (2013)' },
  { name: 'Contentment', category: 'joy', intensity: 0, valence: 0.5, arousal: -0.3, power: -0.3, quadrant: 'positive_low_arousal', primary: false, gewFamily: 'positive_low_arousal', researchSource: 'Scherer et al. (2013)' },
  { name: 'Love', category: 'trust', intensity: 0, valence: 0.6, arousal: 0.0, power: 0.0, quadrant: 'positive_low_arousal', primary: false, gewFamily: 'positive_low_arousal', researchSource: 'Scherer et al. (2013)' },
  { name: 'Relief', category: 'joy', intensity: 0, valence: 0.3, arousal: -0.4, power: -0.4, quadrant: 'positive_low_arousal', primary: false, gewFamily: 'positive_low_arousal', researchSource: 'Scherer et al. (2013)' },
  { name: 'Compassion', category: 'trust', intensity: 0, valence: 0.2, arousal: 0.1, power: 0.1, quadrant: 'positive_low_arousal', primary: false, gewFamily: 'positive_low_arousal', researchSource: 'Scherer et al. (2013)' },

  // Negative Low Arousal (Low valence, Low arousal)
  { name: 'Sadness', category: 'sadness', intensity: 0, valence: -0.6, arousal: -0.5, power: -0.5, quadrant: 'negative_low_arousal', primary: true, gewFamily: 'negative_low_arousal', researchSource: 'Scherer et al. (2013)' },
  { name: 'Guilt', category: 'sadness', intensity: 0, valence: -0.4, arousal: -0.3, power: -0.3, quadrant: 'negative_low_arousal', primary: false, gewFamily: 'negative_low_arousal', researchSource: 'Scherer et al. (2013)' },
  { name: 'Regret', category: 'sadness', intensity: 0, valence: -0.3, arousal: -0.2, power: -0.2, quadrant: 'negative_low_arousal', primary: false, gewFamily: 'negative_low_arousal', researchSource: 'Scherer et al. (2013)' },
  { name: 'Shame', category: 'sadness', intensity: 0, valence: -0.5, arousal: -0.4, power: -0.4, quadrant: 'negative_low_arousal', primary: false, gewFamily: 'negative_low_arousal', researchSource: 'Scherer et al. (2013)' },
  { name: 'Disappointment', category: 'sadness', intensity: 0, valence: -0.4, arousal: -0.1, power: -0.1, quadrant: 'negative_low_arousal', primary: false, gewFamily: 'negative_low_arousal', researchSource: 'Scherer et al. (2013)' },

  // Negative High Arousal (Low valence, High arousal)
  { name: 'Fear', category: 'fear', intensity: 0, valence: -0.5, arousal: 0.3, power: 0.3, quadrant: 'negative_high_arousal', primary: true, gewFamily: 'negative_high_arousal', researchSource: 'Scherer et al. (2013)' },
  { name: 'Disgust', category: 'disgust', intensity: 0, valence: -0.7, arousal: 0.1, power: 0.1, quadrant: 'negative_high_arousal', primary: true, gewFamily: 'negative_high_arousal', researchSource: 'Scherer et al. (2013)' },
  { name: 'Contempt', category: 'disgust', intensity: 0, valence: -0.6, arousal: 0.4, power: 0.4, quadrant: 'negative_high_arousal', primary: false, gewFamily: 'negative_high_arousal', researchSource: 'Scherer et al. (2013)' },
  { name: 'Hate', category: 'anger', intensity: 0, valence: -0.8, arousal: 0.6, power: 0.6, quadrant: 'negative_high_arousal', primary: false, gewFamily: 'negative_high_arousal', researchSource: 'Scherer et al. (2013)' },
  { name: 'Anger', category: 'anger', intensity: 0, valence: -0.5, arousal: 0.7, power: 0.7, quadrant: 'negative_high_arousal', primary: true, gewFamily: 'negative_high_arousal', researchSource: 'Scherer et al. (2013)' },
];

// PANAS Scale items (validated positive and negative affect terms)
export const PANAS_ITEMS = {
  positive: ['Enthusiastic', 'Alert', 'Determined', 'Excited', 'Inspired', 'Strong', 'Active', 'Proud', 'Attentive', 'Interested'],
  negative: ['Distressed', 'Upset', 'Guilty', 'Scared', 'Hostile', 'Irritable', 'Ashamed', 'Nervous', 'Jittery', 'Afraid'],
} as const;

export type PANASPositiveItem = typeof PANAS_ITEMS.positive[number];
export type PANASNegativeItem = typeof PANAS_ITEMS.negative[number];

// Dimensional assessment items
export const DIMENSIONAL_ITEMS = [
  {
    name: 'valence' as const,
    description: 'How pleasant vs. unpleasant do you feel?',
    min: 'Very Unpleasant',
    max: 'Very Pleasant',
  },
  {
    name: 'arousal' as const,
    description: 'How activated/energized vs. calm/relaxed do you feel?',
    min: 'Very Calm',
    max: 'Very Activated',
  },
  {
    name: 'power' as const,
    description: 'How powerful/in control vs. powerless/submissive do you feel?',
    min: 'Very Powerless',
    max: 'Very Powerful',
  },
] as const;

export type DimensionalItem = typeof DIMENSIONAL_ITEMS[number];
