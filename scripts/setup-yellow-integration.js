#!/usr/bin/env node

/**
 * Setup Yellow Network (Nitrolite) Integration
 *
 * Uses real Yellow ClearNode WebSocket. Requires:
 * - getSigner(walletAddress) => Promise<signer> (set globalThis.__FAIRTEST_GET_SIGNER__ or pass in config)
 * - Optional: YELLOW_CLEARNODE_WS_URL (default wss://clearnet-sandbox.yellow.com/ws)
 * - Optional: YELLOW_PLATFORM_WALLET for listing fee recipient
 *
 * Without getSigner, session creation and settlement will fail with a clear error.
 */

import YellowSessionManager from '../packages/yellow-integration/YellowSessionManager.js';
import PaymentFlow from '../packages/yellow-integration/PaymentFlow.js';
import dotenv from 'dotenv';

dotenv.config();

console.log('🚀 Yellow Network (Nitrolite) Integration\n');

async function main() {
    const getSigner =
        typeof globalThis !== 'undefined' && globalThis.__FAIRTEST_GET_SIGNER__;

    console.log('📝 Configuration:');
    console.log(
        `   ClearNode WS: ${process.env.YELLOW_CLEARNODE_WS_URL || 'wss://clearnet-sandbox.yellow.com/ws (default)'}`
    );
    console.log(
        `   Platform wallet: ${process.env.YELLOW_PLATFORM_WALLET || 'not set (zero address)'}`
    );
    console.log(`   getSigner: ${getSigner ? 'set' : 'not set'}\n`);

    if (!getSigner) {
        console.log('⚠️  getSigner not set. Set globalThis.__FAIRTEST_GET_SIGNER__ to run real Yellow flows.');
        console.log('   Example: globalThis.__FAIRTEST_GET_SIGNER__ = async (addr) => ethersWallet;\n');
        console.log('✅ Setup script complete (no real sessions created).\n');
        return;
    }

    const yellow = new YellowSessionManager({
        getSigner,
        platformWallet: process.env.YELLOW_PLATFORM_WALLET || undefined,
    });
    const payment = new PaymentFlow(yellow);

    console.log('🧪 Testing Yellow integration...\n');

    console.log('1️⃣  Exam listing payment session...');
    try {
        const listingResult = await payment.processListingPayment({
            creatorWallet: '0x1234567890abcdef',
            listingFee: 0.1,
            examMetadata: { name: 'Test Exam' },
        });
        console.log('   ✓ Listing session created:', listingResult.sessionId);
    } catch (error) {
        console.error('   ❌ Failed:', error.message);
    }

    console.log('\n2️⃣  Student registration payment session...');
    try {
        const regResult = await payment.processRegistrationPayment({
            studentWallet: '0xabcdef1234567890',
            examId: 'exam-test-1',
            examFee: 0.05,
            creatorWallet: '0x1234567890abcdef',
        });
        console.log('   ✓ Registration session created:', regResult.sessionId);
    } catch (error) {
        console.error('   ❌ Failed:', error.message);
    }

    console.log('\n3️⃣  Session settlement...');
    try {
        const session = await yellow.createExamListingSession('0x123', 0.1);
        const settlement = await yellow.settleSession(session.sessionId);
        console.log('   ✓ Session settled, receipt:', settlement.txHash);
    } catch (error) {
        console.error('   ❌ Failed:', error.message);
    }

    console.log('\n✅ Yellow integration setup complete.\n');
    console.log('💡 Production: use real ClearNode URL and fund channels for USDC.');
}

main().catch((error) => {
    console.error('❌ Setup failed:', error.message);
    process.exit(1);
});
