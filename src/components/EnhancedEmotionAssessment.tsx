import React, { useState } from 'react';
import { Info, Lightbulb, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';
import { EmotionDefinition, getEmotionDefinition, getAllEmotions, getEmotionsByCategory } from '../types/emotion';

interface EnhancedEmotionAssessmentProps {
  onEmotionRated: (emotion: string, rating: number) => void;
  responses: Record<string, number>;
  testMode: 'quick' | 'comprehensive';
}

const EnhancedEmotionAssessment: React.FC<EnhancedEmotionAssessmentProps> = ({
  onEmotionRated,
  responses,
  testMode
}) => {
  const [expandedEmotions, setExpandedEmotions] = useState<Set<string>>(new Set());
  const [showDefinitions, setShowDefinitions] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const allEmotions = getAllEmotions();
  const categories = ['all', 'joy', 'trust', 'fear', 'surprise', 'sadness', 'disgust', 'anger', 'anticipation'];

  const toggleEmotionExpansion = (emotionName: string) => {
    const newExpanded = new Set(expandedEmotions);
    if (newExpanded.has(emotionName)) {
      newExpanded.delete(emotionName);
    } else {
      newExpanded.add(emotionName);
    }
    setExpandedEmotions(newExpanded);
  };

  const getEmotionsToShow = () => {
    if (testMode === 'quick') {
      return ['joy', 'trust', 'fear', 'surprise', 'sadness', 'disgust', 'anger', 'anticipation'];
    }
    
    if (selectedCategory === 'all') {
      return allEmotions;
    }
    
    return getEmotionsByCategory(selectedCategory as any).map(e => e.name);
  };

  const getEmotionColor = (category: string) => {
    const colors: Record<string, string> = {
      joy: 'bg-yellow-100 border-yellow-300 text-yellow-800',
      trust: 'bg-blue-100 border-blue-300 text-blue-800',
      fear: 'bg-purple-100 border-purple-300 text-purple-800',
      surprise: 'bg-orange-100 border-orange-300 text-orange-800',
      sadness: 'bg-gray-100 border-gray-300 text-gray-800',
      disgust: 'bg-green-100 border-green-300 text-green-800',
      anger: 'bg-red-100 border-red-300 text-red-800',
      anticipation: 'bg-pink-100 border-pink-300 text-pink-800'
    };
    return colors[category] || 'bg-gray-100 border-gray-300 text-gray-800';
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={showDefinitions}
              onChange={(e) => setShowDefinitions(e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Show definitions</span>
          </label>
          
          {testMode === 'comprehensive' && (
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          )}
        </div>
        
        <div className="text-sm text-gray-600">
          {testMode === 'quick' ? 'Quick Test: 24 emotions' : `Comprehensive: ${allEmotions.length} emotions`}
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <div className="flex items-start space-x-3">
          <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-blue-700">
            <p className="font-medium mb-1">How to rate emotions:</p>
            <ul className="space-y-1">
              <li>• <strong>0 - Not at all:</strong> You haven't felt this emotion</li>
              <li>• <strong>1 - A little:</strong> You've felt this emotion slightly</li>
              <li>• <strong>2 - Moderately:</strong> You've felt this emotion to a moderate degree</li>
              <li>• <strong>3 - Considerably:</strong> You've felt this emotion quite strongly</li>
              <li>• <strong>4 - Extremely:</strong> You've felt this emotion very intensely</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Emotion Grid */}
      <div className="grid gap-4">
        {getEmotionsToShow().map((emotionName) => {
          const definition = getEmotionDefinition(emotionName);
          const isExpanded = expandedEmotions.has(emotionName);
          const currentRating = responses[emotionName] || 0;
          
          if (!definition) return null;

          return (
            <div key={emotionName} className="border border-gray-200 rounded-lg overflow-hidden">
              {/* Emotion Header */}
              <div className={`p-4 ${getEmotionColor(definition.category)}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <h3 className="font-semibold text-lg">{emotionName.charAt(0).toUpperCase() + emotionName.slice(1)}</h3>
                    <span className="px-2 py-1 text-xs font-medium bg-white bg-opacity-50 rounded-full">
                      {definition.category}
                    </span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      definition.intensity === 'high' ? 'bg-red-100 text-red-800' :
                      definition.intensity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {definition.intensity} intensity
                    </span>
                  </div>
                  
                  <button
                    onClick={() => toggleEmotionExpansion(emotionName)}
                    className="p-1 hover:bg-white hover:bg-opacity-50 rounded transition-colors"
                  >
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Emotion Content */}
              <div className="p-4 bg-white">
                {/* Definition and Details */}
                {showDefinitions && (
                  <div className="mb-4 space-y-3">
                    <div>
                      <h4 className="font-medium text-gray-700 mb-1">Definition:</h4>
                      <p className="text-sm text-gray-600">{definition.definition}</p>
                    </div>
                    
                    {isExpanded && (
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <h4 className="font-medium text-gray-700 mb-1">Evolutionary Function:</h4>
                          <p className="text-gray-600">{definition.evolutionaryFunction}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-700 mb-1">Common Triggers:</h4>
                          <p className="text-gray-600">{definition.commonTriggers.join(', ')}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-700 mb-1">Synonyms:</h4>
                          <p className="text-gray-600">{definition.synonyms.join(', ')}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-700 mb-1">Related Emotions:</h4>
                          <p className="text-gray-600">{definition.relatedEmotions.join(', ')}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Rating Scale */}
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-700">Rate your experience of this emotion:</h4>
                  
                  <div className="grid grid-cols-5 gap-2">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <label
                        key={rating}
                        className={`flex flex-col items-center p-3 border-2 rounded-lg cursor-pointer transition-colors ${
                          currentRating === rating
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name={`emotion_${emotionName}`}
                          value={rating}
                          checked={currentRating === rating}
                          onChange={() => onEmotionRated(emotionName, rating)}
                          className="sr-only"
                        />
                        <span className="text-lg font-bold">{rating}</span>
                        <span className="text-xs text-center mt-1">
                          {rating === 0 ? 'Not at all' :
                           rating === 1 ? 'A little' :
                           rating === 2 ? 'Moderately' :
                           rating === 3 ? 'Considerably' :
                           'Extremely'}
                        </span>
                      </label>
                    ))}
                  </div>
                  
                  {currentRating !== undefined && (
                    <div className="text-sm text-gray-600 text-center">
                      You rated <strong>{emotionName}</strong> as: <strong>{currentRating}/4</strong>
                      {currentRating === 0 && ' (Not at all)'}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress Indicator */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Assessment Progress</span>
          <span className="text-sm text-gray-600">
            {getEmotionsToShow().filter(emotion => responses[emotion] !== undefined).length} of {getEmotionsToShow().length} emotions rated
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ 
              width: `${(getEmotionsToShow().filter(emotion => responses[emotion] !== undefined).length / getEmotionsToShow().length) * 100}%` 
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedEmotionAssessment;
