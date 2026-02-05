import { describe, it } from 'node:test';
import assert from 'node:assert';
import AnonymousIDManager from '../AnonymousIDManager.js';

describe('Anonymous Identity System', () => {
    it('should generate unique UID', () => {
        const idManager = new AnonymousIDManager();
        const uid1 = idManager.generateUID('0xabc', 'exam-1');
        const uid2 = idManager.generateUID('0xabc', 'exam-1');
        
        assert.notEqual(uid1.uid, uid2.uid, 'UIDs should be unique due to random salt');
        assert.ok(uid1.uidHash);
        console.log('✓ UID generated:', uid1.uid.substring(0, 16) + '...');
    });

    it('should create UID_HASH that hides wallet address', () => {
        const idManager = new AnonymousIDManager();
        const walletAddress = '0x1234567890abcdef';
        const uidData = idManager.generateUID(walletAddress, 'exam-1');
        
        assert.ok(!uidData.uidHash.includes(walletAddress));
        console.log('✓ UID_HASH does not contain wallet address');
    });

    it('should pass privacy audit', () => {
        const idManager = new AnonymousIDManager();
        const walletAddress = '0x1234567890abcdef';
        const uidData = idManager.generateUID(walletAddress, 'exam-1');
        const submission = idManager.createSubmissionPayload(
            uidData.uidHash,
            'exam-1',
            { q1: 'B', q2: 'A' }
        );
        
        const audit = idManager.auditPrivacy(submission, walletAddress);
        assert.ok(audit.passed, 'Privacy audit should pass');
        console.log('✓ Privacy audit passed - no wallet address in submission');
    });

    it('should create submission payload with answer hash', () => {
        const idManager = new AnonymousIDManager();
        const uidData = idManager.generateUID('0xabc', 'exam-1');
        const payload = idManager.createSubmissionPayload(
            uidData.uidHash,
            'exam-1',
            { q1: 'B', q2: 'A', q3: 'C' }
        );
        
        assert.ok(payload.uidHash);
        assert.ok(payload.answerHash);
        assert.ok(payload.timestamp);
        console.log('✓ Submission payload created with answer hash');
    });
});
