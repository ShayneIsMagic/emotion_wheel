// Emotion Types based on Plutchik's Wheel, Geneva Emotion Wheel, and contemporary research

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
  };
  gew: {
    positiveHighArousal: number;
    positiveLowArousal: number;
    negativeLowArousal: number;
    negativeHighArousal: number;
  };
  dimensional: {
    valence: number; // 1-9
    arousal: number; // 1-9
    power: number; // 1-9
  };
  plutchik: {
    [key in EmotionCategory]: number;
  };
}

export interface EmotionalInsights {
  dominantPatterns: string[];
  emotionalBalance: 'predominantly_positive' | 'balanced' | 'predominantly_negative';
  intensityProfile: 'low' | 'moderate' | 'high';
  topEmotions: Array<{emotion: string; intensity: number}>;
  seasonalPatterns?: string[];
  lifeEventCorrelations?: string[];
}

export interface Recommendations {
  category: 'positive_emotions' | 'challenging_emotions' | 'overall_wellness';
  title: string;
  description: string;
  actionable: boolean;
  priority: 'low' | 'medium' | 'high';
  resources?: string[];
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

// Quick Test Emotions (subset for rapid assessment)
export const QUICK_TEST_EMOTIONS = {
  primary: ['joy', 'trust', 'fear', 'surprise', 'sadness', 'disgust', 'anger', 'anticipation'],
  secondary: ['contentment', 'love', 'anxiety', 'wonder', 'loneliness', 'contempt', 'frustration', 'hope'],
  tertiary: ['gratitude', 'compassion', 'worry', 'curiosity', 'grief', 'aversion', 'irritation', 'optimism'],
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

// Geneva Emotion Wheel validated emotions
export const GEW_EMOTIONS: Emotion[] = [
  // Positive High Arousal
  { name: 'Interest', category: 'anticipation', intensity: 0, valence: 0.5, arousal: 0.3, power: 0.3, quadrant: 'positive_high_arousal', primary: false },
  { name: 'Pride', category: 'joy', intensity: 0, valence: 0.6, arousal: 0.7, power: 0.7, quadrant: 'positive_high_arousal', primary: false },
  { name: 'Admiration', category: 'trust', intensity: 0, valence: 0.4, arousal: 0.2, power: 0.2, quadrant: 'positive_high_arousal', primary: false },

  // Positive Low Arousal
  { name: 'Amusement', category: 'joy', intensity: 0, valence: 0.7, arousal: 0.1, power: 0.1, quadrant: 'positive_low_arousal', primary: false },
  { name: 'Joy', category: 'joy', intensity: 0, valence: 0.8, arousal: 0.2, power: 0.2, quadrant: 'positive_low_arousal', primary: true },
  { name: 'Pleasure', category: 'joy', intensity: 0, valence: 0.7, arousal: -0.1, power: -0.1, quadrant: 'positive_low_arousal', primary: false },
  { name: 'Contentment', category: 'joy', intensity: 0, valence: 0.5, arousal: -0.3, power: -0.3, quadrant: 'positive_low_arousal', primary: false },
  { name: 'Love', category: 'trust', intensity: 0, valence: 0.6, arousal: 0.0, power: 0.0, quadrant: 'positive_low_arousal', primary: false },
  { name: 'Relief', category: 'joy', intensity: 0, valence: 0.3, arousal: -0.4, power: -0.4, quadrant: 'positive_low_arousal', primary: false },
  { name: 'Compassion', category: 'trust', intensity: 0, valence: 0.2, arousal: 0.1, power: 0.1, quadrant: 'positive_low_arousal', primary: false },

  // Negative Low Arousal
  { name: 'Sadness', category: 'sadness', intensity: 0, valence: -0.6, arousal: -0.5, power: -0.5, quadrant: 'negative_low_arousal', primary: true },
  { name: 'Guilt', category: 'sadness', intensity: 0, valence: -0.4, arousal: -0.3, power: -0.3, quadrant: 'negative_low_arousal', primary: false },
  { name: 'Regret', category: 'sadness', intensity: 0, valence: -0.3, arousal: -0.2, power: -0.2, quadrant: 'negative_low_arousal', primary: false },
  { name: 'Shame', category: 'sadness', intensity: 0, valence: -0.5, arousal: -0.4, power: -0.4, quadrant: 'negative_low_arousal', primary: false },
  { name: 'Disappointment', category: 'sadness', intensity: 0, valence: -0.4, arousal: -0.1, power: -0.1, quadrant: 'negative_low_arousal', primary: false },

  // Negative High Arousal
  { name: 'Fear', category: 'fear', intensity: 0, valence: -0.5, arousal: 0.3, power: 0.3, quadrant: 'negative_high_arousal', primary: true },
  { name: 'Disgust', category: 'disgust', intensity: 0, valence: -0.7, arousal: 0.1, power: 0.1, quadrant: 'negative_high_arousal', primary: true },
  { name: 'Contempt', category: 'disgust', intensity: 0, valence: -0.6, arousal: 0.4, power: 0.4, quadrant: 'negative_high_arousal', primary: false },
  { name: 'Hate', category: 'anger', intensity: 0, valence: -0.8, arousal: 0.6, power: 0.6, quadrant: 'negative_high_arousal', primary: false },
  { name: 'Anger', category: 'anger', intensity: 0, valence: -0.5, arousal: 0.7, power: 0.7, quadrant: 'negative_high_arousal', primary: true },
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
