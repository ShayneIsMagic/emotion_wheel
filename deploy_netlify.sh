#!/bin/bash

# Deploy to Netlify for public testing
echo "🚀 Deploying to Netlify for public testing..."

# Build the project
echo "📦 Building project..."
npm run build

# Check if build was successful
if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

echo "✅ Build successful!"

# Install Netlify CLI if not present
if ! command -v netlify &> /dev/null; then
    echo "📥 Installing Netlify CLI..."
    npm install -g netlify-cli
fi

# Deploy to Netlify
echo "🌐 Deploying to Netlify..."
netlify deploy --prod --dir=dist

echo "🎉 Deployment complete!"
echo "📱 Your app is now live and shareable!"
echo "🔗 Check the output above for your public URL"
