# 🚀 Developer Guide - Emotion Wheel Assessment System

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Repository Structure](#repository-structure)
3. [Development Workflow](#development-workflow)
4. [Deployment Process](#deployment-process)
5. [Making Changes](#making-changes)
6. [Troubleshooting](#troubleshooting)
7. [File Descriptions](#file-descriptions)

## 🎯 Project Overview

This is a **production-ready emotional assessment system** built with React, TypeScript, and Vite. The application provides three main assessment types:

- **Integrated Personality Assessment** - Combines CliftonStrengths, HEXACO, and Plutchik frameworks
- **Clinical Emotional Assessment** - Professional mental health assessment tool
- **Unfiltered Scoring Assessment** - Mathematical framework for emotional analysis

**Live Site**: [https://shayneismagic.github.io/emotion_wheel/](https://shayneismagic.github.io/emotion_wheel/)

## 🏗️ Repository Structure

```
emotion_wheel/
├── 📁 src/                          # Source code (DEVELOPMENT)
│   ├── 📁 components/               # React components
│   │   ├── AssessmentReport.tsx     # Main report component
│   │   ├── IntegratedPersonalityAssessment.tsx
│   │   ├── ClinicalEmotionalAssessment.tsx
│   │   ├── UnfilteredScoringAssessment.tsx
│   │   └── ... (other components)
│   ├── 📁 types/                    # TypeScript definitions
│   ├── 📁 utils/                    # Utility functions
│   └── main.tsx                     # Application entry point
├── 📁 dist/                         # Production build (AUTO-GENERATED)
├── 📁 gh-pages/                     # GitHub Pages branch (DEPLOYMENT)
├── package.json                     # Dependencies and scripts
├── vite.config.ts                   # Build configuration
└── DEVELOPER_GUIDE.md               # This file
```

## 🔄 Development Workflow

### **Branch Strategy**
- **`main`** - Development branch (contains source code)
- **`gh-pages`** - Production deployment branch (contains built files)

### **Development Process**
1. **Work on `main` branch** - Make all code changes here
2. **Test locally** - Use `npm run dev` to test changes
3. **Build for production** - Use `npm run build` to generate production files
4. **Deploy to `gh-pages`** - Push built files to live site

## 🚀 Deployment Process

### **Automatic Deployment (Recommended)**

```bash
# 1. Make changes on main branch
git checkout main
# ... make your changes ...

# 2. Test locally
npm run dev

# 3. Build for production
npm run build

# 4. Deploy to GitHub Pages
npm run deploy
```

### **Manual Deployment (If needed)**

```bash
# 1. Build production files
npm run build

# 2. Switch to gh-pages branch
git checkout gh-pages

# 3. Remove old files and copy new ones
git rm -rf .
cp -r dist/* .

# 4. Commit and push
git add .
git commit -m "Update production files"
git push origin gh-pages

# 5. Return to main branch
git checkout main
```

## ✏️ Making Changes

### **What Files to Work On**

#### **🎨 UI/UX Changes**
- **File**: `src/components/[ComponentName].tsx`
- **Examples**: 
  - `src/components/AssessmentReport.tsx` - Report styling and layout
  - `src/components/IntegratedPersonalityAssessment.tsx` - Assessment interface
- **How**: Edit React components, CSS classes, and component logic

#### **🔧 Functionality Changes**
- **File**: `src/utils/[utilityName].ts`
- **Examples**:
  - `src/utils/assessmentEngine.ts` - Core assessment logic
  - `src/utils/pdfGenerator.ts` - PDF generation functionality
- **How**: Modify utility functions, algorithms, and business logic

#### **📊 Assessment Framework Changes**
- **File**: `src/types/emotion.ts`
- **How**: Update emotion definitions, scoring systems, and data structures

#### **🎯 New Features**
- **File**: `src/components/[NewFeature].tsx`
- **How**: Create new React components and integrate them into the system

### **What NOT to Edit**

#### **❌ Never Edit These Files**
- `dist/` folder - Auto-generated production files
- `gh-pages/` branch - Deployment files only
- `node_modules/` - Dependencies (managed by npm)

#### **⚠️ Edit with Caution**
- `package.json` - Only add/remove dependencies
- `vite.config.ts` - Build configuration
- `tsconfig.json` - TypeScript configuration

## 🔍 File Descriptions

### **Core Components**

| File | Purpose | When to Edit |
|------|---------|--------------|
| `AssessmentReport.tsx` | Main report display and PDF generation | Report layout, styling, PDF features |
| `IntegratedPersonalityAssessment.tsx` | Personality integration assessment | Assessment logic, UI, scoring |
| `ClinicalEmotionalAssessment.tsx` | Clinical mental health assessment | Clinical features, professional tools |
| `UnfilteredScoringAssessment.tsx` | Mathematical scoring framework | Mathematical algorithms, data analysis |

### **Utility Files**

| File | Purpose | When to Edit |
|------|---------|--------------|
| `assessmentEngine.ts` | Core assessment calculations | Scoring algorithms, result processing |
| `pdfGenerator.ts` | PDF report generation | Report formatting, PDF features |
| `emailService.ts` | Email functionality | Email templates, delivery logic |

### **Configuration Files**

| File | Purpose | When to Edit |
|------|---------|--------------|
| `vite.config.ts` | Build and development configuration | Build settings, plugins, optimization |
| `tailwind.config.js` | CSS framework configuration | Styling system, design tokens |
| `tsconfig.json` | TypeScript configuration | Type checking, compilation settings |

## 🛠️ Development Commands

### **Essential Commands**

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint

# Fix linting issues
npm run lint -- --fix

# Deploy to GitHub Pages
npm run deploy
```

### **Git Commands**

```bash
# Check current branch
git branch

# Switch to main branch
git checkout main

# Switch to gh-pages branch
git checkout gh-pages

# View status
git status

# Add changes
git add .

# Commit changes
git commit -m "Description of changes"

# Push to remote
git push origin main
```

## 🚨 Troubleshooting

### **Common Issues**

#### **1. Site Not Updating After Deployment**
- **Check**: GitHub Pages settings (Settings → Pages → Source: gh-pages)
- **Wait**: Deployment takes 5-10 minutes
- **Verify**: Check gh-pages branch has latest files

#### **2. Build Errors**
- **Check**: TypeScript compilation errors
- **Run**: `npm run lint` to see issues
- **Fix**: Address linting errors before building

#### **3. Local Development Issues**
- **Clear cache**: Delete `node_modules` and `package-lock.json`
- **Reinstall**: `npm install`
- **Check ports**: Ensure no conflicts with other services

#### **4. GitHub Pages 404 Error**
- **Verify**: gh-pages branch exists and has files
- **Check**: Repository settings for Pages configuration
- **Wait**: Allow time for GitHub to build and deploy

### **Debugging Steps**

1. **Check browser console** for JavaScript errors
2. **Verify build output** in `dist/` folder
3. **Test locally** with `npm run preview`
4. **Check GitHub Actions** for deployment status
5. **Review network tab** for failed requests

## 📚 Best Practices

### **Code Quality**
- **Always run linting** before committing: `npm run lint`
- **Test locally** before deploying: `npm run dev`
- **Use TypeScript** for all new code
- **Follow React best practices** for components

### **Deployment Safety**
- **Never edit gh-pages branch directly** - always use main branch
- **Test production build locally** before deploying
- **Use descriptive commit messages** for deployment tracking
- **Keep main branch stable** and working

### **Performance**
- **Optimize bundle size** by reviewing dependencies
- **Use lazy loading** for large components
- **Minimize re-renders** in React components
- **Optimize images** and assets

## 🔗 Useful Links

- **Repository**: [https://github.com/ShayneIsMagic/emotion_wheel](https://github.com/ShayneIsMagic/emotion_wheel)
- **Live Site**: [https://shayneismagic.github.io/emotion_wheel/](https://shayneismagic.github.io/emotion_wheel/)
- **GitHub Pages**: [https://pages.github.com/](https://pages.github.com/)
- **Vite Documentation**: [https://vitejs.dev/](https://vitejs.dev/)
- **React Documentation**: [https://react.dev/](https://react.dev/)

## 📞 Support

If you encounter issues:

1. **Check this guide** for common solutions
2. **Review GitHub Issues** for known problems
3. **Check deployment status** in repository settings
4. **Create a new issue** with detailed error information

---

**Remember**: Always work on the `main` branch, test locally, build for production, then deploy to `gh-pages`. Never edit production files directly!
