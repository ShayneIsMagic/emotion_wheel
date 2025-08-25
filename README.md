# 🎯 Comprehensive Emotional Assessment System

A production-ready web application for conducting emotional assessments using validated psychological frameworks including Plutchik's Wheel of Emotions, Geneva Emotion Wheel (GEW), PANAS scales, and dimensional emotion models.

## ✨ Features

- **🔬 Validated Assessment Tools**: Based on peer-reviewed psychology research
- **📊 Multiple Test Modes**: Quick test (15 emotions) and comprehensive test (60+ emotions)
- **🎨 Interactive Visualizations**: Radar charts, bar graphs, and scatter plots
- **📄 PDF Generation**: Professional reports with insights and recommendations
- **👥 Multi-User Sessions**: Share assessment links with multiple participants
- **📱 Responsive Design**: Works on desktop, tablet, and mobile devices
- **🔒 Privacy-First**: All data stored locally on user devices
- **📈 Trend Analysis**: Upload previous PDFs for historical comparison

## 🚀 Live Demo

**GitHub Pages**: [https://shayneismagic.github.io/emotion_wheel/](https://shayneismagic.github.io/emotion_wheel/)

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **PDF Generation**: jsPDF
- **Icons**: Lucide React
- **Deployment**: GitHub Pages

## 📋 Assessment Frameworks

### 1. **Plutchik's Wheel of Emotions**
- 8 primary emotions: Joy, Trust, Fear, Surprise, Sadness, Disgust, Anger, Anticipation
- Evolutionary functions and adaptive responses
- Intensity variations and emotional combinations

### 2. **Geneva Emotion Wheel (GEW)**
- 20 emotion words in valence-power dimensions
- Academic research standard
- Cross-cultural validation

### 3. **PANAS Scales**
- Positive and Negative Affect Schedule
- 20-item validated instrument
- Temporal context awareness

### 4. **Dimensional Assessment**
- Russell's Circumplex Model
- Valence and arousal dimensions
- Continuous emotional space

## 🎮 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/ShayneIsMagic/emotion_wheel.git
cd emotion_wheel

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📱 Usage

### For Participants
1. **Receive Assessment Link**: Get a shareable URL from the session manager
2. **Enter Details**: Provide name and email (optional)
3. **Choose Test Mode**: Quick (5-10 min) or Comprehensive (15-20 min)
4. **Rate Emotions**: Use 0-4 scale with detailed definitions
5. **Complete Assessment**: Answer contextual questions
6. **Download PDF**: Get comprehensive results and insights

### For Session Managers
1. **Create Session**: Set title, description, and timeframe
2. **Configure Settings**: Choose participant limits and options
3. **Generate Links**: Create shareable URLs, QR codes, and social media links
4. **Monitor Progress**: Track participant completion
5. **Collect Results**: Automated PDF delivery and data analysis

## 🏗️ Project Structure

```
emotion_wheel/
├── src/
│   ├── components/           # React components
│   │   ├── ComprehensiveEmotionAssessment.tsx
│   │   ├── EnhancedEmotionAssessment.tsx
│   │   ├── AssessmentSessionManager.tsx
│   │   ├── ParticipantEntry.tsx
│   │   └── TestModeSelector.tsx
│   ├── types/               # TypeScript definitions
│   │   ├── emotion.ts       # Emotion data and interfaces
│   │   └── assessment.ts    # Assessment system types
│   ├── utils/               # Utility functions
│   │   ├── assessmentEngine.ts    # Core assessment logic
│   │   ├── pdfGenerator.ts        # PDF report generation
│   │   ├── urlGenerator.ts        # Shareable link management
│   │   └── emailService.ts        # Email functionality
│   └── main.tsx            # Application entry point
├── public/                 # Static assets
├── dist/                   # Production build output
├── deploy_*.sh            # Deployment scripts
└── package.json           # Dependencies and scripts
```

## 🚀 Deployment

### GitHub Pages (Current)
```bash
npm run deploy
```

### Netlify
```bash
./deploy_netlify.sh
```

### Local with Public URL
```bash
./deploy_simple.sh
```

## 🔬 Research Foundation

This system is built on decades of emotion research:

- **Plutchik, R. (1980)**: Emotion: A Psychoevolutionary Synthesis
- **Scherer, K.R. et al. (2013)**: The GRID meets the Wheel
- **Watson, D. et al. (1988)**: Development and validation of brief measures
- **Russell, J.A. (1980)**: A circumplex model of affect

## 📊 Assessment Features

### Quick Test Mode
- **Duration**: 5-10 minutes
- **Emotions**: 15 carefully selected emotions
- **Use Case**: Regular check-ins, quick assessments

### Comprehensive Test Mode
- **Duration**: 15-20 minutes  
- **Emotions**: 60+ emotions with detailed definitions
- **Use Case**: Deep analysis, research, therapy

### PDF Reports Include
- Executive summary with key insights
- Interactive charts and visualizations
- Detailed scoring breakdowns
- Personalized recommendations
- Research-based interpretations
- Trend analysis (when available)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Robert Plutchik** for the foundational emotion wheel framework
- **Klaus Scherer** and colleagues for the Geneva Emotion Wheel
- **David Watson** for the PANAS scales
- **James Russell** for dimensional emotion theory
- The psychology research community for ongoing validation

## 📞 Support

For questions, issues, or feature requests:
- Create an [Issue](https://github.com/ShayneIsMagic/emotion_wheel/issues)
- Contact: [Your Contact Information]

---

**Built with ❤️ for emotional intelligence and psychological research**
