# FairTest Protocol - Quick Start Guide

This guide will help you get FairTest running locally in minutes.

## 1. Prerequisites
- Node.js (v18+)
- npm or yarn

## 2. Installation
```bash
# Clone the repository
git clone https://github.com/your-repo/fairtest
cd FairTest

# Install all dependencies (Monorepo)
npm install
```

## 3. Environment Setup
The project works with mock data by default for demonstration. To use live networks, create a `.env` in the root:
```env
YELLOW_NETWORK_API_KEY=your_yellow_key
YELLOW_NETWORK_API_URL=https://api.yellow.network/v1
```

## 4. Run the Project

### Start Frontend
```bash
cd frontend
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

## 5. Typical Workflow for Demo
1. **Connect Wallet**: Click "Connect Wallet" (Simulated).
2. **Creator**: Go to "Creator" -> "Create New Exam". Follow the steps.
3. **Student**: Switch to "Student" role -> "Find Exams".
4. **Register**: Click "Register & Pay" on the NEET Demo test.
5. **Take Exam**: Click "Start Exam" (Generates your UID).
6. **Submit**: Answer the questions and submit to Sui.
7. **Evaluator**: Go to "Evaluator" and grade the anonymous submission.
8. **View Results**: Back to "Student" -> "My Results" to see your score.
