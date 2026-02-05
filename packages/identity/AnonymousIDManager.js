import crypto from 'crypto';

class AnonymousIDManager {
    generateUID(walletAddress, examId) {
        // Generate cryptographically random UID (NOT derived from wallet)
        // This ensures evaluators cannot reverse-engineer student identity
        const randomBytes = crypto.randomBytes(32);
        const timestamp = Date.now();
        const salt = crypto.randomBytes(16).toString('hex');
        
        // UID is purely random, wallet only used for local recovery
        const uid = crypto.createHash('sha256')
            .update(randomBytes)
            .update(timestamp.toString())
            .update(salt)
            .digest('hex');
        
        // Double hash for extra privacy (UID_HASH goes on-chain)
        const uidHash = crypto.createHash('sha256').update(uid).digest('hex');
        
        // Store wallet and examId only for local recovery, never on-chain
        return { uid, uidHash, examId, walletAddress, salt, timestamp };
    }

    storeUIDLocally(uidData) {
        if (typeof window !== 'undefined' && window.localStorage) {
            localStorage.setItem(`fairtest_uid_${uidData.examId}`, JSON.stringify(uidData));
        }
        return true;
    }

    recoverUID(examId) {
        if (typeof window !== 'undefined' && window.localStorage) {
            const data = localStorage.getItem(`fairtest_uid_${examId}`);
            return data ? JSON.parse(data) : null;
        }
        return null;
    }

    createSubmissionPayload(uidHash, examId, answers) {
        const answerHash = crypto.createHash('sha256').update(JSON.stringify(answers)).digest('hex');
        return { uidHash, examId, answerHash, timestamp: Date.now() };
    }

    auditPrivacy(submission, walletAddress) {
        const subStr = JSON.stringify(submission).toLowerCase();
        return { passed: !subStr.includes(walletAddress.toLowerCase()) };
    }
}

export default AnonymousIDManager;
