#!/bin/bash

# 🚀 Emotion Wheel Assessment - GitHub Pages Deployment Script
# This script automates the deployment process to GitHub Pages

set -e  # Exit on any error

echo "🚀 Starting deployment to GitHub Pages..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    print_status "📦 Installing dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        print_error "❌ Error: Failed to install dependencies"
        exit 1
    fi
fi

# Check if we're on the main branch
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ]; then
    print_error "You must be on the main branch to deploy. Current branch: $CURRENT_BRANCH"
    print_status "Switching to main branch..."
    git checkout main
fi

# Check if there are uncommitted changes
if [ -n "$(git status --porcelain)" ]; then
    print_warning "You have uncommitted changes. Please commit or stash them before deploying."
    git status --short
    echo ""
    read -p "Do you want to continue anyway? (y/N): " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        print_error "Deployment cancelled. Please commit your changes first."
        exit 1
    fi
fi

# Step 1: Build the project
print_status "Building project for production..."
if npm run build; then
    print_success "Build completed successfully!"
else
    print_error "Build failed! Please fix the errors and try again."
    exit 1
fi

# Step 2: Run linting to check for issues
print_status "Running linting checks..."
if npm run lint; then
    print_success "Linting passed!"
else
    print_warning "Linting found issues. Consider fixing them before deployment."
    read -p "Continue with deployment? (y/N): " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        print_error "Deployment cancelled. Please fix linting issues first."
        exit 1
    fi
fi

# Step 3: Deploy to GitHub Pages
print_status "Deploying to GitHub Pages..."

# Check if gh-pages branch exists
if git show-ref --verify --quiet refs/remotes/origin/gh-pages; then
    print_status "gh-pages branch exists, updating..."
    
    # Create or update gh-pages branch
    git subtree push --prefix dist origin gh-pages
    
    if [ $? -eq 0 ]; then
        print_success "Deployment completed successfully!"
    else
        print_warning "Subtree push failed, trying alternative method..."
        
        # Alternative deployment method
        git checkout --orphan gh-pages-temp
        git rm -rf .
        cp -r dist/* .
        git add .
        git commit -m "Deploy production files $(date)"
        git branch -D gh-pages
        git branch -m gh-pages
        git push origin gh-pages --force
        
        if [ $? -eq 0 ]; then
            print_success "Deployment completed using alternative method!"
        else
            print_error "Deployment failed! Please check your repository permissions."
            exit 1
        fi
    fi
else
    print_status "gh-pages branch doesn't exist, creating it..."
    
    # Create new gh-pages branch
    git checkout --orphan gh-pages
    git rm -rf .
    cp -r dist/* .
    git add .
    git commit -m "Initial deployment $(date)"
    git push origin gh-pages
    
    if [ $? -eq 0 ]; then
        print_success "Initial deployment completed successfully!"
    else
        print_error "Initial deployment failed! Please check your repository permissions."
        exit 1
    fi
fi

# Step 4: Return to main branch
print_status "Returning to main branch..."
git checkout main

# Step 5: Final status
echo ""
print_success "🎉 Deployment completed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Go to your repository: https://github.com/ShayneIsMagic/emotion_wheel"
echo "2. Click 'Settings' → 'Pages'"
echo "3. Set Source to 'Deploy from a branch'"
echo "4. Select 'gh-pages' branch"
echo "5. Click 'Save'"
echo ""
echo "⏱️  Your site will be available in 5-10 minutes at:"
echo "   https://shayneismagic.github.io/emotion_wheel/"
echo ""
echo "🔍 To check deployment status:"
echo "   - Look for the green checkmark on your gh-pages branch"
echo "   - Check the 'Actions' tab for deployment logs"
echo ""

print_status "Deployment script completed! 🚀"
