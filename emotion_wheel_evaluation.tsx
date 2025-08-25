import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';

const EmotionWheelEvaluation = () => {
  const [responses, setResponses] = useState({});
  const [currentSection, setCurrentSection] = useState(0);
  const [showResults, setShowResults] = useState(false);

  // Complete emotion wheel data organized by primary emotions
  const emotionData = {
    Joy: {
      core: 'Joy',
      mild: ['Serene', 'Content', 'Interested', 'Proud', 'Accepted', 'Powerful', 'Peaceful', 'Trusting', 'Optimistic'],
      intense: ['Ecstatic', 'Excited', 'Playful', 'Confident', 'Respected', 'Valued', 'Courageous', 'Creative', 'Loving', 'Thankful', 'Sensitive', 'Intimate', 'Hopeful', 'Inspired'],
      color: '#FFE135'
    },
    Trust: {
      core: 'Trust',
      mild: ['Accepting', 'Peaceful', 'Trusting', 'Optimistic', 'Loyal', 'Humble', 'Vulnerable', 'Genuine', 'Fragile'],
      intense: ['Admiring', 'Vulnerable', 'Devoted', 'Submissive', 'Sentimental', 'Intimate', 'Hopeful', 'Open-hearted'],
      color: '#87CEEB'
    },
    Fear: {
      core: 'Fear',
      mild: ['Apprehensive', 'Insecure', 'Weak', 'Rejected', 'Threatened', 'Nervous', 'Terrified', 'Helpless'],
      intense: ['Scared', 'Anxious', 'Worried', 'Doubtful', 'Nervous', 'Terrified', 'Panicked', 'Horrified'],
      color: '#90EE90'
    },
    Surprise: {
      core: 'Surprise',
      mild: ['Uncertain', 'Bewildered', 'Startled', 'Confused', 'Amazed', 'Disillusioned', 'Perplexed'],
      intense: ['Shocked', 'Stunned', 'Confused', 'Disillusioned', 'Perplexed', 'Astonished'],
      color: '#DDA0DD'
    },
    Sadness: {
      core: 'Sadness',
      mild: ['Glum', 'Disappointed', 'Down', 'Apathetic', 'Bored', 'Tired', 'Lonely', 'Isolated'],
      intense: ['Despair', 'Grief', 'Powerless', 'Victimized', 'Abandoned', 'Ignored', 'Inferior', 'Empty'],
      color: '#87CEFA'
    },
    Disgust: {
      core: 'Disgust',
      mild: ['Dislike', 'Aversion', 'Hesitant', 'Awful', 'Repugnant', 'Judgemental', 'Loathing', 'Revulsion'],
      intense: ['Revulsion', 'Loathing', 'Contemptuous', 'Disdainful', 'Awful', 'Repugnant'],
      color: '#D3D3D3'
    },
    Anger: {
      core: 'Anger',
      mild: ['Annoyed', 'Irritated', 'Frustrated', 'Critical', 'Distant', 'Bitter', 'Mad', 'Aggressive'],
      intense: ['Furious', 'Enraged', 'Livid', 'Bitter', 'Resentful', 'Disgusted', 'Disrespected', 'Violated', 'Indignant', 'Provoked', 'Hostile', 'Infuriated', 'Annoyed', 'Withdrawn', 'Numb', 'Skeptical'],
      color: '#FFB6C1'
    },
    Anticipation: {
      core: 'Anticipation',
      mild: ['Interested', 'Expecting', 'Curious', 'Inquisitive', 'Successful', 'Confident', 'Respected', 'Valued'],
      intense: ['Vigilant', 'Alert', 'Eager', 'Optimistic', 'Hopeful', 'Enthusiastic', 'Excited'],
      color: '#FFA500'
    }
  };

  const questions = [
    {
      title: "Joy & Happiness",
      description: "Rate how much you've experienced these positive emotions recently:",
      emotions: ['Joy', 'Ecstatic', 'Serene', 'Content', 'Interested', 'Proud', 'Accepted', 'Powerful', 'Peaceful', 'Trusting', 'Optimistic', 'Excited', 'Playful', 'Confident', 'Respected', 'Valued', 'Courageous', 'Creative', 'Loving', 'Thankful', 'Sensitive', 'Intimate', 'Hopeful', 'Inspired']
    },
    {
      title: "Trust & Acceptance", 
      description: "Rate your recent experiences with trust and acceptance:",
      emotions: ['Trust', 'Accepting', 'Admiring', 'Vulnerable', 'Devoted', 'Submissive', 'Sentimental', 'Loyal', 'Humble', 'Genuine', 'Fragile', 'Open-hearted']
    },
    {
      title: "Fear & Anxiety",
      description: "Rate how much you've felt these fear-based emotions:",
      emotions: ['Fear', 'Scared', 'Anxious', 'Worried', 'Doubtful', 'Apprehensive', 'Insecure', 'Weak', 'Rejected', 'Threatened', 'Nervous', 'Terrified', 'Panicked', 'Horrified', 'Helpless']
    },
    {
      title: "Surprise & Wonder",
      description: "Rate your experiences with surprise and wonder:",
      emotions: ['Surprise', 'Shocked', 'Stunned', 'Confused', 'Disillusioned', 'Perplexed', 'Astonished', 'Uncertain', 'Bewildered', 'Startled', 'Amazed']
    },
    {
      title: "Sadness & Grief",
      description: "Rate how much you've experienced these emotions related to sadness:",
      emotions: ['Sadness', 'Despair', 'Grief', 'Powerless', 'Victimized', 'Abandoned', 'Ignored', 'Inferior', 'Empty', 'Glum', 'Disappointed', 'Down', 'Apathetic', 'Bored', 'Tired', 'Lonely', 'Isolated']
    },
    {
      title: "Disgust & Aversion",
      description: "Rate your experiences with disgust and aversion:",
      emotions: ['Disgust', 'Revulsion', 'Loathing', 'Contemptuous', 'Disdainful', 'Awful', 'Repugnant', 'Dislike', 'Aversion', 'Hesitant', 'Judgemental']
    },
    {
      title: "Anger & Frustration",
      description: "Rate how much you've felt these anger-related emotions:",
      emotions: ['Anger', 'Furious', 'Enraged', 'Livid', 'Bitter', 'Resentful', 'Disgusted', 'Disrespected', 'Violated', 'Indignant', 'Provoked', 'Hostile', 'Infuriated', 'Annoyed', 'Irritated', 'Frustrated', 'Critical', 'Distant', 'Mad', 'Aggressive', 'Withdrawn', 'Numb', 'Skeptical']
    },
    {
      title: "Anticipation & Excitement",
      description: "Rate your experiences with anticipation and excitement:",
      emotions: ['Anticipation', 'Vigilant', 'Alert', 'Eager', 'Enthusiastic', 'Expecting', 'Curious', 'Inquisitive', 'Successful']
    }
  ];

  const handleRating = (emotion, rating) => {
    setResponses(prev => ({
      ...prev,
      [emotion]: rating
    }));
  };

  const nextSection = () => {
    if (currentSection < questions.length - 1) {
      setCurrentSection(currentSection + 1);
    } else {
      setShowResults(true);
    }
  };

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const calculateResults = () => {
    const primaryEmotions = {
      Joy: 0,
      Trust: 0,
      Fear: 0,
      Surprise: 0,
      Sadness: 0,
      Disgust: 0,
      Anger: 0,
      Anticipation: 0
    };

    const allEmotions = [];

    Object.entries(responses).forEach(([emotion, rating]) => {
      allEmotions.push({ emotion, rating });
      
      // Map to primary emotions
      if (['Joy', 'Ecstatic', 'Serene', 'Content', 'Interested', 'Proud', 'Accepted', 'Powerful', 'Peaceful', 'Trusting', 'Optimistic', 'Excited', 'Playful', 'Confident', 'Respected', 'Valued', 'Courageous', 'Creative', 'Loving', 'Thankful', 'Sensitive', 'Intimate', 'Hopeful', 'Inspired'].includes(emotion)) {
        primaryEmotions.Joy += rating;
      } else if (['Trust', 'Accepting', 'Admiring', 'Vulnerable', 'Devoted', 'Submissive', 'Sentimental', 'Loyal', 'Humble', 'Genuine', 'Fragile', 'Open-hearted'].includes(emotion)) {
        primaryEmotions.Trust += rating;
      } else if (['Fear', 'Scared', 'Anxious', 'Worried', 'Doubtful', 'Apprehensive', 'Insecure', 'Weak', 'Rejected', 'Threatened', 'Nervous', 'Terrified', 'Panicked', 'Horrified', 'Helpless'].includes(emotion)) {
        primaryEmotions.Fear += rating;
      } else if (['Surprise', 'Shocked', 'Stunned', 'Confused', 'Disillusioned', 'Perplexed', 'Astonished', 'Uncertain', 'Bewildered', 'Startled', 'Amazed'].includes(emotion)) {
        primaryEmotions.Surprise += rating;
      } else if (['Sadness', 'Despair', 'Grief', 'Powerless', 'Victimized', 'Abandoned', 'Ignored', 'Inferior', 'Empty', 'Glum', 'Disappointed', 'Down', 'Apathetic', 'Bored', 'Tired', 'Lonely', 'Isolated'].includes(emotion)) {
        primaryEmotions.Sadness += rating;
      } else if (['Disgust', 'Revulsion', 'Loathing', 'Contemptuous', 'Disdainful', 'Awful', 'Repugnant', 'Dislike', 'Aversion', 'Hesitant', 'Judgemental'].includes(emotion)) {
        primaryEmotions.Disgust += rating;
      } else if (['Anger', 'Furious', 'Enraged', 'Livid', 'Bitter', 'Resentful', 'Disgusted', 'Disrespected', 'Violated', 'Indignant', 'Provoked', 'Hostile', 'Infuriated', 'Annoyed', 'Irritated', 'Frustrated', 'Critical', 'Distant', 'Mad', 'Aggressive', 'Withdrawn', 'Numb', 'Skeptical'].includes(emotion)) {
        primaryEmotions.Anger += rating;
      } else if (['Anticipation', 'Vigilant', 'Alert', 'Eager', 'Enthusiastic', 'Expecting', 'Curious', 'Inquisitive', 'Successful'].includes(emotion)) {
        primaryEmotions.Anticipation += rating;
      }
    });

    return { primaryEmotions, allEmotions };
  };

  const getTopEmotions = (allEmotions, count = 10) => {
    return allEmotions
      .filter(item => item.rating > 0)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, count);
  };

  const getEmotionalInsights = (primaryEmotions) => {
    const insights = [];
    const sortedPrimary = Object.entries(primaryEmotions)
      .sort(([,a], [,b]) => b - a);
    
    const dominant = sortedPrimary[0];
    const secondary = sortedPrimary[1];
    
    if (dominant[1] > 0) {
      insights.push(`Your dominant emotional theme is **${dominant[0]}** with a total intensity of ${dominant[1]}.`);
    }
    
    if (secondary[1] > 0) {
      insights.push(`Your secondary emotional pattern is **${secondary[0]}** with an intensity of ${secondary[1]}.`);
    }

    // Emotional balance analysis
    const positiveEmotions = primaryEmotions.Joy + primaryEmotions.Trust + primaryEmotions.Anticipation;
    const negativeEmotions = primaryEmotions.Fear + primaryEmotions.Sadness + primaryEmotions.Anger + primaryEmotions.Disgust;
    const neutralEmotions = primaryEmotions.Surprise;

    if (positiveEmotions > negativeEmotions * 1.5) {
      insights.push("Your emotional state leans **predominantly positive**, suggesting good overall well-being.");
    } else if (negativeEmotions > positiveEmotions * 1.5) {
      insights.push("Your emotional state shows **significant challenging emotions**. Consider seeking support or practicing self-care.");
    } else {
      insights.push("Your emotional state shows a **balanced mix** of positive and challenging emotions, which is normal and healthy.");
    }

    return insights;
  };

  if (showResults) {
    const { primaryEmotions, allEmotions } = calculateResults();
    const topEmotions = getTopEmotions(allEmotions);
    const insights = getEmotionalInsights(primaryEmotions);
    
    const radarData = Object.entries(primaryEmotions).map(([emotion, value]) => ({
      emotion: emotion,
      intensity: value,
      fullMark: Math.max(...Object.values(primaryEmotions))
    }));

    const barData = topEmotions.map(item => ({
      emotion: item.emotion,
      intensity: item.rating
    }));

    return (
      <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Your Emotional Profile Results
          </h1>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 text-gray-700">Primary Emotions Radar</h2>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="emotion" />
                  <PolarRadiusAxis />
                  <Radar
                    name="Intensity"
                    dataKey="intensity"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.3}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="bg-gradient-to-r from-green-100 to-blue-100 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 text-gray-700">Top 10 Specific Emotions</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="emotion" type="category" width={80} />
                  <Tooltip />
                  <Bar dataKey="intensity" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-6 rounded-lg mb-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Emotional Insights</h2>
            <div className="space-y-3">
              {insights.map((insight, index) => (
                <div key={index} className="p-3 bg-white rounded border-l-4 border-blue-500">
                  <p dangerouslySetInnerHTML={{ __html: insight }}></p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-pink-100 to-red-100 p-6 rounded-lg mb-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Emotional Wellness Recommendations</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium text-gray-600 mb-2">For Positive Emotions:</h3>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                  <li>Practice gratitude journaling</li>
                  <li>Engage in activities that bring joy</li>
                  <li>Connect with supportive relationships</li>
                  <li>Celebrate small wins</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-gray-600 mb-2">For Challenging Emotions:</h3>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                  <li>Practice mindfulness and meditation</li>
                  <li>Seek professional support if needed</li>
                  <li>Use healthy coping strategies</li>
                  <li>Focus on self-compassion</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <button
              onClick={() => {
                setShowResults(false);
                setCurrentSection(0);
                setResponses({});
              }}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Retake Assessment
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentSection];
  const progress = ((currentSection + 1) / questions.length) * 100;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-xl p-8">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-800">Comprehensive Emotional Wheel Evaluation</h1>
            <span className="text-sm text-gray-600">
              Section {currentSection + 1} of {questions.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">{currentQuestion.title}</h2>
          <p className="text-gray-600 mb-6">{currentQuestion.description}</p>
          <p className="text-sm text-gray-500 mb-4">
            Rate each emotion on a scale of 0-5 based on how much you've experienced it recently:
            <br />
            <strong>0</strong> = Not at all, <strong>1</strong> = Very little, <strong>2</strong> = Somewhat, 
            <strong>3</strong> = Moderately, <strong>4</strong> = Quite a bit, <strong>5</strong> = Extremely
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {currentQuestion.emotions.map((emotion) => (
            <div key={emotion} className="bg-gray-50 p-4 rounded-lg border">
              <h3 className="font-medium text-gray-800 mb-3">{emotion}</h3>
              <div className="flex space-x-1">
                {[0, 1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => handleRating(emotion, rating)}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      responses[emotion] === rating
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'bg-white text-gray-600 border-gray-300 hover:border-blue-400'
                    }`}
                  >
                    {rating}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between">
          <button
            onClick={prevSection}
            disabled={currentSection === 0}
            className={`px-6 py-2 rounded-lg transition-colors ${
              currentSection === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gray-500 text-white hover:bg-gray-600'
            }`}
          >
            Previous
          </button>
          
          <button
            onClick={nextSection}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {currentSection === questions.length - 1 ? 'View Results' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmotionWheelEvaluation;