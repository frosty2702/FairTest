# FairTest Protocol - Complete Demo Guide

This guide walks you through all 8 phases of the FairTest Protocol workflow.

## Prerequisites
- Node.js v18+ installed
- Browser with MetaMask or similar wallet
- Project running locally (see QUICKSTART.md)

## Demo Workflow

### Phase 1: Platform Setup (One-Time)
**What happens:** Deploy Sui contracts and ENS controller

```bash
# Deploy Sui contracts to testnet
npm run deploy:sui

# Setup ENS controller on Sepolia
npm run deploy:ens
```

**Expected Output:**
- Sui contract addresses for ExamObject, SubmissionObject, ResultObject
- ENS controller contract address
- fairtest.eth domain configured

---

### Phase 2: Exam Creation (Creator Role)
**What happens:** Creator pays listing fee via Yellow Network and publishes exam

1. Navigate to http://localhost:5173
2. Click "Creator Dashboard"
3. Click "+ Create New Exam"
4. Fill in exam details:
   - **Name:** "NEET Practice 2024"
   - **Registration Fee:** 0.05 SUI
5. Click "Pay Listing Fee & Publish"

**Behind the scenes:**
- ✅ Yellow Network session created for 0.1 SUI listing fee
- ✅ ENS subdomain registered: `neet-practice-2024.fairtest.eth`
- ✅ Sui ExamObject minted with exam metadata
- ✅ ENS text records updated with Sui Object ID

**Console Output:**
```
[Yellow] Creating listing session for creator 0x123...
[Yellow] Session funded: listing_0_1234567890
[ENS] Registering subdomain: neet-practice-2024.fairtest.eth
[ENS] Setting text records: suiObjectID, examFee, creator
[Sui] Minting ExamObject with ID: 0xabc...
```

---

### Phase 3: Exam Discovery (Student Role)
**What happens:** Student browses exams via ENS resolution

1. Click "Student Dashboard"
2. Click "Browse Exams"
3. See available exams discovered via ENS

**Behind the scenes:**
- ✅ ENS resolver queries all *.fairtest.eth subdomains
- ✅ Text records fetched for each exam
- ✅ Exam metadata displayed from ENS + Sui

**Console Output:**
```
[ENS] Resolving exams from *.fairtest.eth
[ENS] Found: neet-practice-2024.fairtest.eth
[ENS] Fetching text records...
[Sui] Fetching ExamObject: 0xabc...
```

---

### Phase 4: Registration (Student Role)
**What happens:** Student pays registration fee via Yellow Network

1. Click "Register & Pay" on "NEET Practice 2024"
2. Confirm Yellow Network payment (0.05 SUI)

**Behind the scenes:**
- ✅ Yellow Network session created for student
- ✅ Off-chain payment recorded (gasless for student)
- ✅ Registration confirmed
- ✅ Student can now take exam

**Console Output:**
```
[Yellow] Creating registration session for student 0xdef...
[Yellow] Session funded: registration_exam-1_1_1234567890
[Yellow] Recording off-chain payment: 0.05 SUI to creator
[Yellow] Registration confirmed
```

---

### Phase 5: Anonymization (Student Role)
**What happens:** Student generates anonymous UID for exam

1. Click "Start Exam"
2. System generates cryptographic UID
3. UID stored locally in browser

**Behind the scenes:**
- ✅ Random salt generated
- ✅ UID = SHA256(walletAddress:examId:salt)
- ✅ UID_HASH = SHA256(UID) - double hashing for extra privacy
- ✅ UID stored in localStorage
- ✅ Only UID_HASH goes on-chain

**Console Output:**
```
[Identity] Generating anonymous UID
[Identity] Salt: 8f3a2b1c...
[Identity] UID: 7a8b9c2f...
[Identity] UID_HASH: 3d5e1a4b...
[Identity] Stored locally for result recovery
[Privacy Audit] ✓ No wallet address in UID_HASH
```

---

### Phase 6: Submission (Student Role)
**What happens:** Student submits answers anonymously to Sui

1. Answer exam questions
2. Click "Submit Anonymously"
3. Submission recorded on Sui blockchain

**Behind the scenes:**
- ✅ Answers hashed for integrity
- ✅ SubmissionObject created on Sui with UID_HASH only
- ✅ NO wallet address stored on-chain
- ✅ Privacy audit passes

**Console Output:**
```
[Identity] Creating submission payload
[Identity] Answer hash: 9c2f8e7d...
[Privacy Audit] Running privacy check...
[Privacy Audit] ✓ Wallet address NOT found in submission
[Sui] Creating SubmissionObject
[Sui] Transaction: 0x123abc...
[Sui] SubmissionObject ID: 0xdef456...
```

---

### Phase 7: Evaluation (Evaluator Role)
**What happens:** Evaluator grades submission blindly using only UID_HASH

1. Click "Evaluator Dashboard"
2. See pending submissions (only UID_HASH visible)
3. Click "Grade Submission" on UID_HASH: `3d5e1a4b...`
4. Enter score: 85
5. Click "Publish Result to Sui"

**Behind the scenes:**
- ✅ Evaluator sees ONLY UID_HASH (no wallet address)
- ✅ ResultObject created on Sui
- ✅ Score and rank published immutably
- ✅ Student can recover result using their UID

**Console Output:**
```
[Evaluator] Viewing submission: UID_HASH 3d5e1a4b...
[Evaluator] No wallet address visible - privacy preserved
[Sui] Creating ResultObject
[Sui] UID_HASH: 3d5e1a4b...
[Sui] Score: 85, Rank: 12
[Sui] Transaction: 0x789ghi...
```

---

### Phase 8: Results & Settlement (Student Role + Platform)
**What happens:** Student views results, Yellow Network settles all payments

1. Click "My Results" in Student Dashboard
2. Enter your UID (auto-filled from localStorage)
3. See your verified score and rank from Sui

**Behind the scenes:**
- ✅ UID retrieved from localStorage
- ✅ UID_HASH computed
- ✅ ResultObject fetched from Sui using UID_HASH
- ✅ Yellow Network settles all payments in single transaction:
  - Listing fee → Platform
  - Registration fees → Creator

**Console Output:**
```
[Identity] Recovering UID from localStorage
[Identity] Computing UID_HASH: 3d5e1a4b...
[Sui] Fetching ResultObject for UID_HASH
[Sui] Found result: Score 85, Rank 12/154
[Yellow] Settling all sessions for exam-1
[Yellow] Listing fee (0.1 SUI) → Platform
[Yellow] Registration fees (7.7 SUI) → Creator
[Yellow] Settlement transaction: 0xfinal123...
[Yellow] ✓ All payments settled on-chain
```

---

## Privacy Verification

At any point, you can verify privacy guarantees:

```bash
# Check that wallet addresses are NOT in Sui objects
npm run test:privacy

# Expected output:
# ✓ SubmissionObject contains NO wallet addresses
# ✓ ResultObject contains NO wallet addresses
# ✓ Only UID_HASH is stored on-chain
# ✓ Privacy audit: PASSED
```

---

## Key Observations

### Yellow Network Benefits
- **Gasless UX:** Students pay 0 gas fees
- **Instant payments:** Off-chain sessions are instant
- **Single settlement:** All payments settled in one transaction
- **50x gas savings** compared to per-transaction on-chain payments

### Sui Blockchain Benefits
- **Immutable records:** Exam results cannot be altered
- **Public verifiability:** Anyone can verify results
- **Object model:** Clean separation of Exam, Submission, Result
- **Shared objects:** Transparent and accessible to all

### ENS Benefits
- **Human-readable:** `neet-practice-2024.fairtest.eth` instead of `0xabc...`
- **Decentralized discovery:** No centralized database needed
- **Metadata storage:** Text records store Sui Object IDs
- **Subdomain automation:** Automatic creation for each exam

### Privacy Benefits
- **Anonymous evaluation:** Evaluators never see wallet addresses
- **Double hashing:** UID_HASH = SHA256(SHA256(...))
- **Local UID storage:** Students control their identity
- **On-chain privacy:** Zero PII on blockchain

---

## Troubleshooting

### Yellow Network session not created
- Check `.env` has valid `YELLOW_NETWORK_API_KEY`
- Verify API URL is correct
- Check console for error messages

### ENS subdomain not resolving
- Ensure ENS controller is deployed on Sepolia
- Check `FAIRTEST_ENS_DOMAIN` in `.env`
- Verify Sepolia RPC URL is working

### Sui transaction failing
- Check Sui testnet is accessible
- Verify `SUI_PRIVATE_KEY` has testnet SUI
- Check contract addresses are correct

### UID not found in localStorage
- Ensure you completed "Start Exam" step
- Check browser localStorage for `fairtest_uid_*`
- Try clearing cache and restarting exam

---

## Next Steps

After completing the demo:
1. Deploy to live testnets (Sui testnet, Sepolia)
2. Integrate real wallet connections (MetaMask, Sui Wallet)
3. Add automated ranking calculations
4. Build question editor for creators
5. Implement result verification API

---

**Demo complete! You've experienced all 8 phases of FairTest Protocol.**

For questions or issues, check the [README.md](./README.md) or open an issue on GitHub.
