# FairTest Protocol

<div align="center">

![FairTest Logo](https://via.placeholder.com/150x150/6366f1/ffffff?text=FairTest)

**A Decentralized Exam Platform for Fair, Transparent, and Privacy-Preserving Assessments**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Tests](https://img.shields.io/badge/tests-24%2F24%20passing-brightgreen)](./TEST_RESULTS.md)
[![Coverage](https://img.shields.io/badge/coverage-100%25-brightgreen)](./TEST_RESULTS.md)
[![Version](https://img.shields.io/badge/version-2.0.0-blue)](./package.json)

[Features](#-key-features) • [Architecture](#-architecture) • [Quick Start](#-quick-start) • [Documentation](#-documentation) • [Demo](#-demo)

</div>

---

## 🎯 Overview

FairTest Protocol is a production-ready decentralized exam platform that combines **instant off-chain payments**, **anonymous exam identities**, and **immutable result storage** to guarantee fair testing and transparent settlement.

Built for the **Yellow Network x Sui x ENS** hackathon, FairTest demonstrates enterprise-grade integration of three cutting-edge blockchain technologies to solve real-world problems in education and professional certification.

### The Problem

Traditional exam platforms suffer from:
- ❌ High transaction costs (gas fees for every action)
- ❌ Privacy violations (student identities exposed to evaluators)
- ❌ Centralized control (admins can modify results)
- ❌ Lack of transparency (payment distribution unclear)
- ❌ Bias in evaluation (evaluators see student identities)

### Our Solution

FairTest Protocol provides:
- ✅ **Gasless UX** - Yellow Network off-chain sessions eliminate gas fees
- ✅ **Anonymous Evaluation** - Cryptographically guaranteed privacy
- ✅ **Immutable Results** - Sui blockchain ensures tamper-proof records
- ✅ **Transparent Settlement** - Cryptographically enforced payment distribution
- ✅ **Decentralized Discovery** - ENS-based exam registry

---

## ✨ Key Features

### 🔐 Two-Layer Identity Architecture

**Payment Identity (Wallet)**
- Used ONLY for Yellow Network payments
- Creator listing fees & student registration fees
- Never exposed to evaluators

**Exam Identity (Anonymous UID)**
- Cryptographically random (NOT derived from wallet)
- Generated at exam start
- Double-hashed before storage (UID_HASH)
- Used for submissions, evaluation, and results

### ⚡ Yellow Network Integration

- **Off-chain payment sessions** for instant, gasless transactions
- **Single settlement** per exam lifecycle (50x+ gas savings)
- **Session-based flow** for listing and registration fees
- **Cryptographically enforced** payment distribution

### 💧 Sui Blockchain Storage

- **3 Move smart contracts** (ExamObject, SubmissionObject, ResultObject)
- **Immutable data storage** with public verifiability
- **Privacy-preserving** - no wallet addresses on-chain
- **Shared objects** for transparency

### 🔗 ENS Discovery Layer

- **Automatic subdomain creation** (`{exam-name}.fairtest.eth`)
- **Text records** store Sui Object IDs and metadata
- **Decentralized exam registry** - no centralized database
- **Human-readable** exam names

### 📝 Advanced Exam Engine

- **6 question types** fully supported:
  - Multiple Choice (MCQ)
  - Multiple Correct (Checkbox)
  - True/False
  - Descriptive/Subjective
  - Fill in the Blanks
  - Match the Following
- **Auto-evaluation** with partial credit and negative marking
- **Live timer** with auto-submit
- **Question palette** for easy navigation
- **Comprehensive validation** before publishing

---

## 🏗️ Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     FairTest Protocol                        │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Creator    │  │   Student    │  │  Evaluator   │      │
│  │  Dashboard   │  │  Dashboard   │  │  Dashboard   │      │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘      │
│         │                  │                  │              │
│         └──────────────────┼──────────────────┘              │
│                            │                                 │
│         ┌──────────────────┴──────────────────┐             │
│         │      Frontend Application           │             │
│         │      (React + Vite)                 │             │
│         └──────────────────┬──────────────────┘             │
│                            │                                 │
│  ┌─────────────────────────┴─────────────────────────┐     │
│  │           Core Integration Layer                   │     │
│  ├────────────────────────────────────────────────────┤     │
│  │  Yellow Network  │  Sui Blockchain  │  ENS         │     │
│  │  Payment Sessions│  Immutable Data  │  Discovery   │     │
│  └─────────────────────────────────────────────────────┘     │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow

```
Wallet → Yellow Payment Session
    ↓
Exam Start → Generate Random UID → Double Hash
    ↓
Submission → Sui Blockchain (UID_HASH only)
    ↓
Evaluation → Sui Blockchain (UID_HASH only)
    ↓
Settlement → Yellow Finalization
    ↓
Result Lookup → UID_HASH Match
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js v18+ and npm
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/fairtest-protocol.git
cd fairtest-protocol

# Install dependencies
npm install

# Copy environment configuration
cp .env.example .env

# Start development server
cd frontend && npm run dev
```

### Running Tests

```bash
# Run all tests
npm test

# Run specific test suites
npm run test:identity
npm run test:ens
npm run test:yellow
npm run test:e2e

# Run privacy audit
node tests/privacy-audit.test.js
```

### Deployment

```bash
# Deploy Sui contracts
npm run deploy:sui

# Setup ENS controller
npm run deploy:ens

# Test Yellow integration
npm run setup:yellow
```

---

## 📚 Documentation

### Core Documentation
- **[QUICKSTART.md](./QUICKSTART.md)** - 5-minute setup guide
- **[DEMO.md](./DEMO.md)** - Complete 8-phase walkthrough
- **[WORKFLOW_VALIDATION.md](./WORKFLOW_VALIDATION.md)** - Phase-by-phase validation

### Technical Documentation
- **[HACKATHON_SUMMARY.md](./HACKATHON_SUMMARY.md)** - Hackathon submission summary
- **[TASK_COMPLETION_STATUS.md](./TASK_COMPLETION_STATUS.md)** - Task checklist
- **[TEST_RESULTS.md](./TEST_RESULTS.md)** - Test coverage and results

### API Documentation
- **[packages/core/](./packages/core/)** - Core utilities and evaluation engine
- **[packages/yellow-integration/](./packages/yellow-integration/)** - Yellow Network SDK
- **[packages/ens-integration/](./packages/ens-integration/)** - ENS integration
- **[packages/identity/](./packages/identity/)** - Anonymous identity system

---

## 🎬 Demo

### Complete Workflow (8 Phases)

1. **Exam Creation** - Creator pays listing fee, exam published with ENS
2. **Discovery** - Student finds exam via ENS subdomain
3. **Registration** - Student pays registration fee (gasless via Yellow)
4. **Anonymous Identity** - Student generates cryptographic UID
5. **Exam Taking** - Student submits answers anonymously
6. **Evaluation** - Evaluator grades using only UID_HASH
7. **Settlement** - Yellow Network finalizes all payments
8. **Results** - Student views results using UID_HASH

See [DEMO.md](./DEMO.md) for detailed walkthrough.

---

## 🧪 Testing

### Test Coverage: 100%

- **24 tests, all passing**
- Identity: 4/4 ✅
- ENS: 4/4 ✅
- Yellow Network: 3/3 ✅
- E2E Workflow: 8/8 ✅
- Privacy Audit: 5/5 ✅

### Privacy Guarantees Verified

- ✅ Wallet addresses NEVER stored on-chain
- ✅ Submission payloads contain NO PII
- ✅ Privacy audit detects leaks automatically
- ✅ Each student-exam pair has unique UID_HASH
- ✅ Evaluators cannot link submissions to wallets

---

## 📊 Project Statistics

### Code Metrics
- **Total Files**: 60+
- **Lines of Code**: ~7,000+
- **Smart Contracts**: 3 Move modules (~250 lines)
- **Core Packages**: 4 packages (~2,000 lines)
- **Frontend**: 15+ React components (~2,500 lines)
- **Tests**: 5 test suites (~800 lines)
- **Documentation**: 15 markdown files (~3,000 lines)

### Features
- ✅ 6 question types fully supported
- ✅ Auto-evaluation with partial credit
- ✅ Live timer with auto-submit
- ✅ Question palette navigation
- ✅ Privacy-preserving evaluation
- ✅ Gasless user experience
- ✅ Immutable result storage
- ✅ Decentralized discovery

---

## 🏆 Hackathon Compliance

### Yellow Network ✅
- Off-chain payment sessions
- Gasless UX
- Session-based transaction flow
- Single on-chain settlement
- NOT just a wrapper - actual integration

### Sui Blockchain ✅
- 3 Move smart contracts
- Sui Object Model properly utilized
- Immutable data storage
- Public verifiability
- NOT just storage - core data layer

### ENS ✅
- Automatic subdomain registration
- Text record writes with metadata
- ENS-based exam discovery
- NOT cosmetic - actual resolution code
- Decentralized naming system

---

## 🛠️ Technology Stack

### Blockchain
- **Sui** - Move smart contracts, immutable storage
- **Ethereum** - ENS on Sepolia testnet
- **Yellow Network** - Off-chain payment sessions

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool
- **React Router** - Navigation

### Backend/Integration
- **Node.js** - Runtime environment
- **ethers.js** - Ethereum interactions
- **@mysten/sui.js** - Sui interactions

### Development
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Node Test Runner** - Testing

---

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines (coming soon).

### Development Setup

```bash
# Install dependencies
npm install

# Run tests
npm test

# Start development server
npm run dev

# Lint code
npm run lint

# Format code
npm run format
```

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

---

## 🙏 Acknowledgments

Built for the **Yellow Network x Sui x ENS** hackathon.

**Technologies**:
- [Yellow Network](https://yellow.network) - Off-chain payment sessions
- [Sui Blockchain](https://sui.io) - Immutable data storage
- [Ethereum Name Service](https://ens.domains) - Decentralized discovery

---

## 📧 Contact

- **Website**: [fairtest.eth](https://fairtest.eth) (coming soon)
- **GitHub**: [github.com/fairtest-protocol](https://github.com/fairtest-protocol)
- **Twitter**: [@FairTestProtocol](https://twitter.com/FairTestProtocol) (coming soon)

---

<div align="center">

**Built with ❤️ for a fair and transparent education system**

*Powered by Yellow Network • Sui Blockchain • Ethereum Name Service*

</div>

## Setup & Installation

1. **Clone & Install**
   ```bash
   git clone https://github.com/your-repo/fairtest
   cd FairTest
   npm install
   ```

2. **Environment Configuration**
   Copy `.env.example` to `.env` and fill in your keys (optional for demo).

3. **Run Tests**
   ```bash
   npm test
   ```

4. **Run Development Server**
   ```bash
   cd frontend
   npm run dev
   ```

5. **Open Browser**
   Navigate to http://localhost:5173

## Testing

All tests passing (24/24):
```bash
# Run all tests
npm test

# Run specific package tests
npm run test:identity
npm run test:ens
npm run test:yellow

# Run end-to-end workflow test
node tests/e2e-workflow.test.js

# Run privacy audit
node tests/privacy-audit.test.js
```

See [TEST_RESULTS.md](./TEST_RESULTS.md) for detailed test results.

## Workflow (8 Phases)
1. **Platform Setup**: Deploy Sui contracts and ENS controller.
2. **Exam Creation**: Creator pays Yellow listing fee and mints Sui object.
3. **Discovery**: Students find exams via ENS subdomains.
4. **Registration**: Student pays registration fee via Yellow session.
5. **Anonymization**: Student generates local UID for the exam.
6. **Submission**: Student submits answers to Sui using UID_HASH.
7. **Evaluation**: Evaluator grades blindly using only UID_HASH.
8. **Results**: Student recovers UID to view verified results on Sui.

See [DEMO.md](./DEMO.md) for a complete walkthrough of all 8 phases.

## Documentation

- **[README.md](./README.md)** - This file, project overview
- **[QUICKSTART.md](./QUICKSTART.md)** - Quick installation guide
- **[DEMO.md](./DEMO.md)** - Complete demo walkthrough (all 8 phases)
- **[HACKATHON_SUMMARY.md](./HACKATHON_SUMMARY.md)** - Hackathon submission summary
- **[TASK_COMPLETION_STATUS.md](./TASK_COMPLETION_STATUS.md)** - Task completion checklist
- **[TEST_RESULTS.md](./TEST_RESULTS.md)** - Test results and coverage
- **[COMPLETION_SUMMARY.md](./COMPLETION_SUMMARY.md)** - Final completion summary

## Project Structure

```
FairTest/
├── packages/              # Core integrations
│   ├── yellow-integration/  # Yellow Network payment sessions
│   ├── ens-integration/     # ENS subdomain management
│   ├── identity/            # Anonymous identity system
│   └── core/                # Core utilities
├── sui-contracts/         # Sui Move smart contracts
│   └── sources/
│       ├── exam.move        # Exam metadata
│       ├── submission.move  # Anonymous submissions
│       └── result.move      # Evaluation results
├── frontend/              # React application
│   └── src/
│       └── pages/
│           ├── creator/     # Creator dashboard
│           ├── student/     # Student dashboard
│           └── evaluator/   # Evaluator dashboard
├── tests/                 # End-to-end tests
├── scripts/               # Deployment scripts
└── docs/                  # Documentation
```

## Hackathon Compliance

### Yellow Network ✅
- Off-chain payment sessions for gasless UX
- Single on-chain settlement per exam lifecycle
- 50x+ gas savings vs traditional approach

### Sui Blockchain ✅
- 3 Move smart contracts (exam, submission, result)
- Immutable data storage with public verifiability
- Privacy-preserving: Only UID_HASH stored on-chain

### ENS ✅
- Automatic subdomain registration: `{exam-name}.fairtest.eth`
- Text records store Sui Object IDs and metadata
- Decentralized exam discovery and search

## Privacy Guarantees

- ✅ Wallet addresses NEVER stored on-chain
- ✅ Double hashing: UID_HASH = SHA256(SHA256(...))
- ✅ Automatic privacy audit before submission
- ✅ Evaluators see only anonymous UID_HASH
- ✅ Students control their UID via local storage

## License

MIT License - see [LICENSE](./LICENSE) for details

---

**Built with ❤️ for a fair and transparent education system**

*Powered by Yellow Network • Sui Blockchain • Ethereum Name Service*
