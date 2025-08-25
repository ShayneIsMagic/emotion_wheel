#!/bin/bash

# Deploy to GitHub Pages for public testing
echo "🚀 Deploying to GitHub Pages for public testing..."

# Build the project
echo "📦 Building project..."
npm run build

# Check if build was successful
if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

echo "✅ Build successful!"

# Create a simple server for testing
echo "🌐 Starting local server for testing..."
echo "📱 Your app is now accessible at: http://localhost:8000"
echo "🔗 To make it publicly accessible, you can:"
echo "   1. Use ngrok: ngrok http 8000"
echo "   2. Deploy to GitHub Pages: npm run deploy"
echo "   3. Use Netlify: netlify deploy --prod --dir=dist"

# Start a simple HTTP server
cd dist
python3 -m http.server 8000 2>/dev/null || python -m SimpleHTTPServer 8000 2>/dev/null || echo "Please install Python or use another HTTP server"
