#!/bin/bash

echo "🚀 Quick Deployment for Emotion Assessment System"
echo ""

# Build the project
echo "📦 Building project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

echo "✅ Build successful!"
echo ""

# Start local server
echo "🌐 Starting local server..."
echo "📱 Your app is now accessible at: http://localhost:8000"
echo ""

# Check if ngrok is available
if command -v ngrok &> /dev/null; then
    echo "🔗 ngrok detected! To make it publicly accessible:"
    echo "   1. Open a new terminal"
    echo "   2. Run: ngrok http 8000"
    echo "   3. Copy the public URL from ngrok output"
    echo ""
else
    echo "📥 To make it publicly accessible, install ngrok:"
    echo "   macOS: brew install ngrok/ngrok/ngrok"
    echo "   Linux: curl -s https://ngrok-agent.s3.amazonaws.com/ngrok.asc | sudo tee /etc/apt/trusted.gpg.d/ngrok.asc"
    echo "   Then run: ngrok http 8000"
    echo ""
fi

echo "🎯 Alternative deployment options:"
echo "   1. Use the deploy_simple.sh script for automatic ngrok setup"
echo "   2. Deploy to GitHub Pages: npm run deploy"
echo "   3. Deploy to Netlify: ./deploy_netlify.sh"
echo ""

echo "🔄 Starting local server... (Press Ctrl+C to stop)"
cd dist
python3 -m http.server 8000 2>/dev/null || python -m SimpleHTTPServer 8000 2>/dev/null || echo "Please install Python or use another HTTP server"
