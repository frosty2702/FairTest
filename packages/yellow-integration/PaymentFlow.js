import YellowSessionManager from './YellowSessionManager.js';

class PaymentFlow {
    constructor(yellowManager) {
        this.yellow = yellowManager || new YellowSessionManager();
    }

    async processListingPayment({ creatorWallet, listingFee, examMetadata }) {
        const session = await this.yellow.createExamListingSession(creatorWallet, listingFee, examMetadata);
        return { success: true, sessionId: session.sessionId };
    }

    async processRegistrationPayment({ studentWallet, examId, examFee, creatorWallet }) {
        const session = await this.yellow.createStudentRegistrationSession(studentWallet, examFee, examId, creatorWallet);
        return { success: true, sessionId: session.sessionId };
    }

    async recordExamEvent(sessionId, eventType, eventData = {}) {
        return await this.yellow.recordSessionEvent(sessionId, eventType, eventData);
    }
}

export default PaymentFlow;
