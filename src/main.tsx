import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// Simple test component to debug loading issues
const TestApp: React.FC = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Emotion Wheel Assessment - Test Version</h1>
      <p>If you can see this, React is working!</p>
      <div style={{ marginTop: '20px' }}>
        <h2>Available Assessments:</h2>
        <ul>
          <li><strong>Integrated Personality Assessment</strong> - CliftonStrengths + HEXACO integration</li>
          <li><strong>Clinical Emotional Assessment</strong> - For licensed mental health professionals</li>
          <li><strong>Unfiltered Scoring Assessment</strong> - Raw mathematical scoring framework</li>
        </ul>
      </div>
      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f0f0f0', borderRadius: '5px' }}>
        <h3>Note:</h3>
        <p>The three assessment files we created are <strong>documentation and framework files</strong>, not web components. They provide the structure and methodology for implementing these assessments in the application.</p>
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TestApp />
  </React.StrictMode>,
);
