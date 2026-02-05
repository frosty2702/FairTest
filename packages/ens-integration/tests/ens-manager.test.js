import { describe, it } from 'node:test';
import assert from 'node:assert';
import ENSManager from '../ENSManager.js';

describe('ENS Integration', () => {
    it('should create exam subdomain', async () => {
        const ens = new ENSManager();
        const result = await ens.createExamSubdomain('Test Exam 2024', {
            examFee: '0.05',
            creator: '0x123abc'
        });
        
        assert.ok(result.subdomain);
        assert.ok(result.subdomain.includes('fairtest.eth'));
        console.log('✓ Subdomain created:', result.subdomain);
    });

    it('should set exam metadata in text records', async () => {
        const ens = new ENSManager();
        const subdomain = 'test-exam.fairtest.eth';
        const result = await ens.setExamMetadata(subdomain, '0xabc123', {
            examName: 'Test Exam',
            examFee: '0.05'
        });
        
        assert.ok(result.success);
        console.log('✓ Exam metadata set in ENS text records');
    });

    it('should list all exams', async () => {
        const ens = new ENSManager();
        const exams = await ens.getExamList();
        
        assert.ok(Array.isArray(exams));
        assert.ok(exams.length > 0);
        console.log('✓ Found', exams.length, 'exams via ENS');
    });

    it('should search exams by query', async () => {
        const ens = new ENSManager();
        const results = await ens.searchExams('neet');
        
        assert.ok(Array.isArray(results));
        console.log('✓ Search found', results.length, 'matching exams');
    });
});
