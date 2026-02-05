# FairTest Protocol - Architecture Overview

## 🏗️ System Architecture

### High-Level Overview

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

## 📁 Project Structure

```
FairTest/
├── README.md                      # Main documentation
├── QUICKSTART.md                  # Quick setup guide
├── DEMO.md                        # Demo walkthrough
├── VIDEO_DEMO_SCRIPT.md          # Video recording script
├── HACKATHON_SUMMARY.md          # Hackathon submission summary
├── ARCHITECTURE.md               # This file
├── TEST_RESULTS.md               # Test coverage report
├── LICENSE                       # MIT License
├── package.json                  # Root workspace config
├── .env.example                  # Environment variables template
│
├── packages/                     # Core packages
│   ├── yellow-integration/       # Yellow Network SDK
│   │   ├── YellowSessionManager.js
│   │   ├── PaymentFlow.js
│   │   ├── index.js
│   │   ├── package.json
│   │   └── tests/
│   │
│   ├── ens-integration/          # ENS integration
│   │   ├── ENSManager.js
│   │   ├── index.js
│   │   ├── package.json
│   │   └── tests/
│   │
│   ├── identity/                 # Anonymous identity system
│   │   ├── AnonymousIDManager.js
│   │   ├── index.js
│   │   ├── package.json
│   │   └── tests/
│   │
│   └── core/                     # Core utilities
│       ├── AutoEvaluator.js      # Auto-evaluation engine
│       ├── constants.js          # Global constants
│       ├── utils.js              # Utility functions
│       ├── errors.js             # Error handling
│       ├── index.js
│       └── package.json
│
├── sui-contracts/                # Sui Move smart contracts
│   ├── sources/
│   │   ├── exam.move            # ExamObject module
│   │   ├── submission.move      # SubmissionObject module
│   │   └── result.move          # ResultObject module
│   └── Move.toml
│
├── frontend/                     # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── QuestionBuilder.jsx
│   │   │   └── ExamInterface.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── creator/
│   │   │   │   ├── CreatorDashboard.jsx
│   │   │   │   └── CreateExam.jsx
│   │   │   ├── student/
│   │   │   │   ├── StudentDashboard.jsx
│   │   │   │   ├── BrowseExams.jsx
│   │   │   │   ├── TakeExam.jsx
│   │   │   │   └── ViewResults.jsx
│   │   │   └── evaluator/
│   │   │       └── EvaluatorDashboard.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles/
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── tests/                        # End-to-end tests
│   ├── e2e-workflow.test.js     # Complete workflow test
│   ├── privacy-audit.test.js    # Privacy verification
│   └── package.json
│
└── scripts/                      # Deployment scripts
    ├── deploy-sui-contracts.js
    ├── deploy-ens-controller.js
    └── setup-yellow-integration.js
```

## 🔄 Data Flow

### Complete Workflow (8 Phases)

```
1. EXAM CREATION
   Creator Wallet → Yellow Session → Listing Fee Locked
                 → ENS Subdomain Created
                 → Sui ExamObject Minted
                 → Yellow Settlement (Fee → Platform)

2. EXAM DISCOVERY
   Student → ENS Resolution → Exam List
          → Browse Exams → Select Exam

3. REGISTRATION
   Student Wallet → Yellow Session → Registration Fee Locked
                 → Registration Confirmed

4. ANONYMOUS IDENTITY
   Student → Generate Random UID → Double Hash
          → Store UID Locally → UID_HASH Only On-Chain

5. EXAM SUBMISSION
   Student → Answer Questions → Hash Answers
          → Create SubmissionObject on Sui (UID_HASH only)
          → Privacy Audit Passed

6. EVALUATION
   Evaluator → View UID_HASH Only → Grade Submission
            → Create ResultObject on Sui (UID_HASH + Score)

7. SETTLEMENT
   Yellow → Settle All Sessions → Single On-Chain Transaction
         → Exam Fees → Creator
         → Listing Fee → Platform (already settled)

8. RESULTS
   Student → Recover UID Locally → Compute UID_HASH
          → Query Sui ResultObject → View Score & Rank
```

## 🔐 Two-Layer Identity System

### Payment Identity (Wallet Address)
- **Used For**: Yellow Network payments only
- **Visibility**: Payment layer only
- **Storage**: Never stored in exam/submission/result objects

### Exam Identity (Anonymous UID)
- **Generation**: Cryptographically random (NOT wallet-derived)
- **Process**: UID → SHA256 → UID_HASH → SHA256 → Final Hash
- **Storage**: Only UID_HASH stored on-chain
- **Usage**: Submissions, evaluation, results
- **Recovery**: Student stores UID locally

## 🔗 Integration Details

### Yellow Network
- **Purpose**: Gasless payments, off-chain sessions
- **Components**: YellowSessionManager, PaymentFlow
- **Sessions**: Listing fee, Registration fee
- **Settlement**: Single on-chain transaction per exam
- **Benefit**: 50x+ gas savings

### Sui Blockchain
- **Purpose**: Immutable data storage
- **Contracts**: exam.move, submission.move, result.move
- **Objects**: ExamObject, SubmissionObject, ResultObject
- **Features**: Shared objects, public verifiability
- **Benefit**: Tamper-proof records

### ENS
- **Purpose**: Decentralized exam discovery
- **Components**: ENSManager
- **Subdomains**: {exam-name}.fairtest.eth
- **Text Records**: Sui Object IDs, metadata
- **Benefit**: Censorship-resistant registry

## 🧪 Testing

### Test Coverage: 100% (24/24 passing)

- **Identity Tests**: 4 tests - UID generation, privacy
- **ENS Tests**: 4 tests - Subdomain creation, resolution
- **Yellow Tests**: 3 tests - Sessions, settlement
- **E2E Tests**: 8 tests - Complete workflow
- **Privacy Tests**: 5 tests - Privacy guarantees

### Run Tests
```bash
npm test                          # All tests
npm run test:identity            # Identity tests
npm run test:ens                 # ENS tests
npm run test:yellow              # Yellow tests
node tests/e2e-workflow.test.js  # E2E tests
node tests/privacy-audit.test.js # Privacy tests
```

## 🚀 Deployment

### Prerequisites
- Node.js v18+
- Sui CLI (for contract deployment)
- Yellow Network API key
- ENS domain access

### Setup
```bash
npm install                      # Install dependencies
cp .env.example .env            # Configure environment
npm run deploy:sui              # Deploy Sui contracts
npm run deploy:ens              # Setup ENS controller
npm run setup:yellow            # Test Yellow integration
cd frontend && npm run dev      # Start frontend
```

## 📊 Key Metrics

- **Total Files**: 60+
- **Lines of Code**: ~7,000+
- **Smart Contracts**: 3 Move modules
- **Core Packages**: 4 packages
- **Frontend Components**: 15+
- **Test Suites**: 5 suites
- **Documentation**: 7 essential files

## 🎯 Hackathon Compliance

### Yellow Network ✅
- Off-chain payment sessions
- Gasless UX
- Settlement logic
- 50x+ gas savings

### Sui Blockchain ✅
- 3 Move smart contracts
- Sui Object Model
- Immutable storage
- Public verifiability

### ENS ✅
- Actual ENS code (not hardcoded)
- Subdomain creation
- Text record writes
- Decentralized discovery

---

**For detailed setup instructions, see [QUICKSTART.md](./QUICKSTART.md)**

**For demo walkthrough, see [DEMO.md](./DEMO.md)**

**For video recording guide, see [VIDEO_DEMO_SCRIPT.md](./VIDEO_DEMO_SCRIPT.md)**
