import { ethers } from 'ethers';

class ENSManager {
    constructor() {
        this.subdomains = new Map();
        // Seed with some mock data for student browsing
        this.subdomains.set('neet-demo.fairtest.eth', {
            examName: 'NEET Demo Test',
            suiObjectID: '0x' + Math.random().toString(16).substr(2, 40),
            creatorWallet: '0x' + Math.random().toString(16).substr(2, 40),
            examFee: '0.05'
        });
    }

    async createExamSubdomain(examName, examData = {}) {
        const fullDomain = `${examName.toLowerCase().replace(/\s+/g, '-')}.fairtest.eth`;
        this.subdomains.set(fullDomain, examData);
        return { subdomain: fullDomain };
    }

    async setExamMetadata(subdomain, suiObjectID, metadata) {
        const existing = this.subdomains.get(subdomain) || {};
        this.subdomains.set(subdomain, { ...existing, ...metadata, suiObjectID });
        return { success: true };
    }

    async getExamList() {
        const list = [];
        for (const [domain, data] of this.subdomains.entries()) {
            list.push({ ensDomain: domain, ...data });
        }
        return list;
    }

    async searchExams(query) {
        const list = await this.getExamList();
        return list.filter(e => e.ensDomain.includes(query.toLowerCase()) || e.examName.toLowerCase().includes(query.toLowerCase()));
    }
}

export default ENSManager;
