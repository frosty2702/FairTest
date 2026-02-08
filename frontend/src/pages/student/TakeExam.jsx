'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import fairTestService from '../../services/FairTestService';
import ExamInterface from '../../components/ExamInterface';

function TakeExam({ examId }) {
    const router = useRouter();
    const [step, setStep] = useState(1); // 1: exam, 2: submitting
    const [uidData, setUidData] = useState(null);
    const [exam, setExam] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const examStartTimeRef = useRef(null);

    useEffect(() => {
        const uid = fairTestService.getExamIdentity(examId);
        if (!uid) {
            router.replace(`/student/exam/${examId}/instructions`);
            return;
        }
        setUidData(uid);
    }, [examId, router]);

    useEffect(() => {
        if (uidData && exam && questions.length > 0 && !examStartTimeRef.current) {
            examStartTimeRef.current = Date.now();
        }
    }, [uidData, exam, questions]);

    useEffect(() => {
        if (!uidData) return;
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
    }, [examId, uidData]);

    const handleSubmit = async (answers) => {
        setStep(2);
        setError(null);
        const timeTaken = examStartTimeRef.current
            ? Math.round((Date.now() - examStartTimeRef.current) / 1000)
            : 0;
        try {
            await fairTestService.submitExam(examId, answers, timeTaken);
            router.push('/student/results');
        } catch (err) {
            console.error(err);
            setError(err.message || 'Failed to submit exam.');
            setStep(1);
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
        <div className="take-exam">
            {error && step !== 2 && (
                <div style={{ marginBottom: '1rem', padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '0.5rem', color: 'var(--error)' }}>{error}</div>
            )}
            {step === 1 && uidData && (
                <ExamInterface
                    exam={exam}
                    questions={questions}
                    onSubmit={handleSubmit}
                    uidData={uidData}
                />
            )}

            {step === 2 && (
                <div style={{ maxWidth: '700px', margin: '0 auto' }}>
                    <div className="glass-card" style={{ textAlign: 'center', padding: '4rem' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✓</div>
                        <h2 style={{ marginBottom: '1rem' }}>Submitting to Sui...</h2>
                        <p style={{ color: 'var(--text-muted)' }}>
                            Creating immutable record with your UID_HASH.
                            <br />
                            Your wallet address is not included in the submission.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TakeExam;
