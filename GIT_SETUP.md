# Git Setup Guide for FairTest Protocol

## 🎯 Initialize Git Repository

The project is ready for git initialization. Follow these steps:

### 1. Initialize Git

```bash
git init
```

### 2. Add All Files

```bash
git add .
```

### 3. Create Initial Commit

```bash
git commit -m "Initial commit: FairTest Protocol - Decentralized Exam Platform

- Yellow Network integration for gasless payments
- Sui blockchain for immutable storage
- ENS for decentralized discovery
- Anonymous identity system
- Complete exam engine with 6 question types
- Auto-evaluation with partial credit
- 24/24 tests passing
- Production-ready codebase"
```

### 4. Add Remote Repository

```bash
# Replace with your GitHub repository URL
git remote add origin https://github.com/YOUR_USERNAME/fairtest-protocol.git
```

### 5. Push to GitHub

```bash
git branch -M main
git push -u origin main
```

---

## 📦 What's Included in .gitignore

The `.gitignore` file is configured to exclude:

### Dependencies & Build
- `node_modules/`
- `dist/`, `build/`, `out/`
- Package lock files

### Environment & Secrets
- `.env` files
- `*.key`, `*.pem` files
- `private_keys/`, `secrets/`

### IDE & Editor
- `.vscode/`, `.idea/`
- Editor swap files

### OS Files
- `.DS_Store` (macOS)
- `Thumbs.db` (Windows)

### Blockchain Specific
- `.sui/`
- `*.mv`, `*.mvir`
- Contract artifacts
- Deployment data

### Logs & Cache
- `*.log` files
- `.cache/`
- Test artifacts

---

## 🔒 Security Checklist

Before pushing to GitHub, verify:

- [ ] No `.env` file in repository
- [ ] No private keys or secrets
- [ ] No wallet addresses or credentials
- [ ] `.gitignore` is properly configured
- [ ] `.env.example` is included (without real values)

---

## 📝 Recommended Commit Message Format

Use conventional commits for better organization:

```bash
# Feature
git commit -m "feat: add new question type support"

# Bug fix
git commit -m "fix: resolve timer auto-submit issue"

# Documentation
git commit -m "docs: update README with deployment guide"

# Tests
git commit -m "test: add privacy audit tests"

# Refactor
git commit -m "refactor: improve AutoEvaluator performance"

# Style
git commit -m "style: format code with prettier"
```

---

## 🌿 Recommended Branch Strategy

### Main Branches
- `main` - Production-ready code
- `develop` - Development branch

### Feature Branches
- `feature/question-builder` - New features
- `fix/timer-bug` - Bug fixes
- `docs/api-documentation` - Documentation
- `test/integration-tests` - Tests

### Workflow
```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes and commit
git add .
git commit -m "feat: add new feature"

# Push to remote
git push origin feature/new-feature

# Create pull request on GitHub
# Merge to develop, then to main
```

---

## 🏷️ Tagging Releases

```bash
# Create version tag
git tag -a v1.0.0 -m "Release v1.0.0: Initial hackathon submission"

# Push tags
git push origin --tags
```

---

## 📊 Repository Settings

### Recommended GitHub Settings

1. **Branch Protection** (for main branch)
   - Require pull request reviews
   - Require status checks to pass
   - Require branches to be up to date

2. **GitHub Actions** (optional)
   - Run tests on PR
   - Auto-deploy to testnet
   - Lint code

3. **Repository Topics**
   - `blockchain`
   - `sui`
   - `yellow-network`
   - `ens`
   - `web3`
   - `education`
   - `decentralized`
   - `hackathon`

---

## 🚀 Quick Commands Reference

```bash
# Check status
git status

# View changes
git diff

# View commit history
git log --oneline

# Create and switch to new branch
git checkout -b branch-name

# Switch branches
git checkout branch-name

# Pull latest changes
git pull origin main

# Push changes
git push origin branch-name

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1

# View remote repositories
git remote -v

# Update remote URL
git remote set-url origin NEW_URL
```

---

## 📋 Pre-Push Checklist

Before pushing to GitHub:

- [ ] All tests passing (`npm test`)
- [ ] Code formatted (`npm run format`)
- [ ] No console.log statements (except intentional logging)
- [ ] Documentation updated
- [ ] `.env.example` updated if needed
- [ ] No sensitive data in commits
- [ ] Commit messages are clear
- [ ] Branch is up to date with main

---

## 🔗 GitHub Repository Setup

### 1. Create Repository on GitHub
- Go to https://github.com/new
- Name: `fairtest-protocol`
- Description: "Decentralized exam platform with Yellow Network, Sui, and ENS"
- Public repository
- Don't initialize with README (we have one)

### 2. Add Repository Details
- Website: Your demo URL
- Topics: `blockchain`, `sui`, `yellow-network`, `ens`, `web3`, `education`

### 3. Add README Badges
Update README.md with:
```markdown
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Tests](https://img.shields.io/badge/tests-24%2F24%20passing-brightgreen)](./TEST_RESULTS.md)
```

---

## ✅ Verification

After setup, verify:

```bash
# Check remote
git remote -v

# Check branch
git branch

# Check last commit
git log -1

# Check ignored files
git status --ignored
```

---

## 🎉 You're Ready!

Your repository is now ready for:
- ✅ GitHub hosting
- ✅ Hackathon submission
- ✅ Collaboration
- ✅ Version control
- ✅ CI/CD integration

---

**Happy coding!** 🚀
