import { describe, it } from 'node:test';
import assert from 'node:assert';
import PaymentFlow from '../PaymentFlow.js';
import YellowSessionManager from '../YellowSessionManager.js';

describe('Yellow Network Payment Flow', () => {
    it('should create listing payment session', async () => {
        const payment = new PaymentFlow();
        const result = await payment.processListingPayment({
            creatorWallet: '0x123abc',
            listingFee: 0.1,
            examMetadata: { name: 'Test Exam' }
        });
        
        assert.ok(result.success);
        assert.ok(result.sessionId);
        console.log('✓ Listing payment session created:', result.sessionId);
    });

    it('should create registration payment session', async () => {
        const payment = new PaymentFlow();
        const result = await payment.processRegistrationPayment({
            studentWallet: '0xdef456',
            examId: 'exam-1',
            examFee: 0.05,
            creatorWallet: '0x123abc'
        });
        
        assert.ok(result.success);
        assert.ok(result.sessionId);
        console.log('✓ Registration payment session created:', result.sessionId);
    });

    it('should settle session', async () => {
        const yellow = new YellowSessionManager();
        const session = await yellow.createExamListingSession('0x123', 0.1);
        const result = await yellow.settleSession(session.sessionId);
        
        assert.ok(result.success);
        assert.ok(result.txHash);
        console.log('✓ Session settled with tx:', result.txHash);
    });
});
