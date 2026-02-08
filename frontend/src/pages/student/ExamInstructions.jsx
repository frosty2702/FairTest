'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import fairTestService from '../../services/FairTestService';

function ExamInstructions({ examId }) {
    const router = useRouter();
    const [exam, setExam] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);

    useEffect(() => {
        let cancelled = false;
        fairTestService.getExam(examId)
            .then((data) => {
                if (cancelled) return;
                if (!data) {
                    setError('Exam not found. Set SUI_PACKAGE_ID in Vercel to load from chain.');
                    return;
                }
                setExam({
                    id: data.examId,
                    name: data.title,
                    duration: data.duration,
                    totalMarks: data.totalMarks,
                    instructions: data.instructions || 'Read all questions carefully. Timer will auto-submit when time expires.'
                });
                setQuestions(data.questions || []);
            })
            .catch((err) => { if (!cancelled) setError(err.message); })
            .finally(() => { if (!cancelled) setLoading(false); });
        return () => { cancelled = true; };
    }, [examId]);

    const handleStartExam = async () => {
        if (!fairTestService.currentWallet) {
            setError('Please connect your wallet first.');
            return;
        }
        setError(null);
        setIsGenerating(true);
        try {
            await fairTestService.generateExamIdentity(examId);
            router.push(`/student/exam/${examId}/take`);
        } catch (err) {
            console.error(err);
            setError(err.message || 'Failed to generate exam identity.');
            setIsGenerating(false);
        }
    };

    if (loading) {
        return <div style={{ textAlign: 'center', padding: '4rem' }}>Loading exam...</div>;
    }
    if (error && (!exam || !questions.length)) {
        return (
            <div style={{ textAlign: 'center', padding: '4rem' }}>
                <p style={{ color: 'var(--error)', marginBottom: '1rem' }}>{error}</p>
                <button onClick={() => router.push('/student/browse')} className="btn-secondary">Back to Browse</button>
            </div>
        );
    }
    if (!exam || questions.length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: '4rem' }}>
                <p style={{ color: 'var(--text-muted)' }}>Exam not found.</p>
                <button onClick={() => router.push('/student/browse')} className="btn-secondary">Back to Browse</button>
            </div>
        );
    }

    return (
        <div className="exam-instructions">
            <div style={{ maxWidth: '700px', margin: '0 auto' }}>
                <div className="glass-card" style={{ padding: '3rem' }}>
                    <h1 style={{ marginBottom: '1.5rem' }}>{exam.name}</h1>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2rem', padding: '1.5rem', background: 'rgba(0,0,0,0.2)', borderRadius: '0.5rem' }}>
                        <div>
                            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Duration</div>
                            <div style={{ fontSize: '1.25rem', fontWeight: '600' }}>{exam.duration} minutes</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Questions</div>
                            <div style={{ fontSize: '1.25rem', fontWeight: '600' }}>{questions.length}</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Total Marks</div>
                            <div style={{ fontSize: '1.25rem', fontWeight: '600' }}>{exam.totalMarks}</div>
                        </div>
                    </div>

                    <div style={{ marginBottom: '2rem' }}>
                        <h3 style={{ marginBottom: '1rem' }}>Instructions</h3>
                        <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
                            {exam.instructions}
                        </p>
                    </div>

                    <div style={{ padding: '1.5rem', background: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.3)', borderRadius: '0.5rem', marginBottom: '2rem' }}>
                        <h4 style={{ marginBottom: '0.5rem' }}>Privacy Notice</h4>
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                            Clicking start will generate your <strong>Anonymous UID</strong>.
                            This ID is stored locally and will be used to look up your results securely.
                            Your wallet address will never be linked to your exam submission.
                        </p>
                    </div>

                    {error && (
                        <div style={{ marginBottom: '1rem', padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '0.5rem', color: 'var(--error)' }}>{error}</div>
                    )}

                    <button
                        onClick={handleStartExam}
                        disabled={isGenerating}
                        className="btn-primary"
                        style={{ width: '100%', padding: '1rem', fontSize: '1.125rem' }}
                    >
                        {isGenerating ? 'Generating UID...' : 'Generate UID & Start Exam'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ExamInstructions;
