#!/bin/bash

# Comprehensive Emotional Assessment System - Deployment Script
# This script builds and deploys the application

echo "🚀 Starting deployment of Comprehensive Emotional Assessment System..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ Error: Failed to install dependencies"
        exit 1
    fi
fi

# Run type checking
echo "🔍 Running TypeScript type checking..."
npm run type-check
if [ $? -ne 0 ]; then
    echo "❌ Error: TypeScript type checking failed"
    exit 1
fi

# Run linting
echo "🧹 Running ESLint..."
npm run lint
if [ $? -ne 0 ]; then
    echo "⚠️  Warning: ESLint found issues. Consider fixing them before deployment."
    read -p "Continue with deployment? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Deployment cancelled."
        exit 1
    fi
fi

# Build the application
echo "🏗️  Building application..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Error: Build failed"
    exit 1
fi

echo "✅ Build completed successfully!"

# Check if dist directory was created
if [ ! -d "dist" ]; then
    echo "❌ Error: dist directory not found after build"
    exit 1
fi

echo "📁 Build output created in dist/ directory"
echo "📊 Build size:"
du -sh dist/

# Optional: Start preview server
echo ""
echo "🌐 To preview the built application, run:"
echo "   npm run preview"
echo ""
echo "🚀 To deploy to GitHub Pages:"
echo "   1. Push your code to GitHub"
echo "   2. Go to repository Settings > Pages"
echo "   3. Set source to 'Deploy from a branch'"
echo "   4. Select 'main' branch and '/docs' folder"
echo "   5. Copy dist/ contents to docs/ folder"
echo ""
echo "📋 Deployment completed successfully!"
echo "🎯 Your Comprehensive Emotional Assessment System is ready!"
