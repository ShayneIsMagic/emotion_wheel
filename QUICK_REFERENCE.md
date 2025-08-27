# 🚀 Quick Reference - Emotion Wheel Assessment

## ⚡ **One-Command Deployment**

```bash
# Full deployment with checks and safety
npm run deploy:gh-pages

# Quick deployment (skip checks)
npm run deploy:quick

# Manual deployment
./deploy.sh
```

## 🔄 **Daily Development Workflow**

```bash
# 1. Start development
npm run dev

# 2. Make changes to src/ files

# 3. Test locally
npm run dev

# 4. Build and deploy
npm run deploy:gh-pages
```

## 📁 **Key Files to Edit**

| **Change Type** | **File Location** | **Example** |
|----------------|-------------------|-------------|
| **UI/Components** | `src/components/` | `AssessmentReport.tsx` |
| **Logic/Utils** | `src/utils/` | `assessmentEngine.ts` |
| **Types** | `src/types/` | `emotion.ts` |
| **Styling** | `src/index.css` | Global CSS |
| **Configuration** | `vite.config.ts` | Build settings |

## 🚨 **What NEVER to Edit**

- ❌ `dist/` folder (auto-generated)
- ❌ `gh-pages/` branch (deployment only)
- ❌ `node_modules/` (dependencies)

## 🛠️ **Essential Commands**

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build

# Quality
npm run lint         # Check code quality
npm run lint:fix     # Auto-fix issues
npm run type-check   # TypeScript checking

# Deployment
npm run deploy:gh-pages  # Full deployment
npm run deploy:quick     # Quick deployment
```

## 🔍 **Troubleshooting**

| **Problem** | **Solution** |
|-------------|--------------|
| Site not updating | Check GitHub Pages settings |
| Build errors | Run `npm run lint` |
| Local dev issues | Clear cache: `rm -rf node_modules && npm install` |
| 404 errors | Wait 5-10 min for GitHub Pages deployment |

## 📍 **Important URLs**

- **Repository**: https://github.com/ShayneIsMagic/emotion_wheel
- **Live Site**: https://shayneismagic.github.io/emotion_wheel/
- **GitHub Pages**: Settings → Pages → Source: gh-pages

## 💡 **Pro Tips**

1. **Always work on `main` branch** - never edit `gh-pages` directly
2. **Test locally first** - use `npm run dev` before deploying
3. **Check linting** - run `npm run lint` before committing
4. **Use descriptive commits** - helps with deployment tracking
5. **Wait for deployment** - GitHub Pages takes 5-10 minutes

---

**Remember**: `main` = development, `gh-pages` = production deployment! 🎯
