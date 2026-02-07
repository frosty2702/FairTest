'use client';

import React, { useState, useEffect } from 'react';
import fairTestService from '../../services/FairTestService';

function EvaluatorDashboard() {
    const [exams, setExams] = useState([]);
    const [selectedExamId, setSelectedExamId] = useState(null);
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState(null);
    const [score, setScore] = useState('');
    const [error, setError] = useState(null);
    const [publishing, setPublishing] = useState(false);

    useEffect(() => {
        let cancelled = false;
        fairTestService.browseExams()
            .then((list) => {
                if (cancelled) return;
                setExams(list);
                if (list.length > 0 && !selectedExamId) setSelectedExamId(list[0].examId);
            })
            .catch((err) => { if (!cancelled) setError(err.message); })
            .finally(() => { if (!cancelled) setLoading(false); });
        return () => { cancelled = true; };
    }, []);

    useEffect(() => {
        if (!selectedExamId) return;
        let cancelled = false;
        setLoading(true);
        fairTestService.getPendingSubmissions(selectedExamId)
            .then((list) => { if (!cancelled) setSubmissions(list); })
            .catch((err) => { if (!cancelled) setError(err.message); setSubmissions([]); })
            .finally(() => { if (!cancelled) setLoading(false); });
        return () => { cancelled = true; };
    }, [selectedExamId]);

    const handleGrade = async () => {
        if (!selected) return;
        if (!fairTestService.currentWallet) {
            setError('Please connect your wallet first.');
            return;
        }
        const scoreNum = parseInt(score, 10);
        if (isNaN(scoreNum) || scoreNum < 0 || scoreNum > 100) {
            setError('Enter a score between 0 and 100.');
            return;
        }
        setError(null);
        setPublishing(true);
        try {
            const maxScore = selected.exam?.totalMarks ?? 100;
            const percentage = maxScore > 0 ? Math.round((scoreNum / 100) * maxScore) : scoreNum;
            await fairTestService.submitEvaluation(selected.submissionId, {
                score: percentage,
                maxScore,
                percentage: scoreNum,
                passed: scoreNum >= 60,
                feedback: '',
                questionScores: []
            });
            setSubmissions((prev) => prev.filter((s) => s.submissionId !== selected.submissionId));
            setSelected(null);
            setScore('');
        } catch (err) {
            console.error(err);
            setError(err.message || 'Failed to publish result.');
        } finally {
            setPublishing(false);
        }
    };

    const displayHash = (sub) => (sub.finalHash || '').substring(0, 12) + '...';

    return (
        <div className="evaluator-dashboard">
            <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '1rem' }}>Evaluator Dashboard</h1>
            <p style={{ color: 'var(--text-muted)', marginBottom: '3rem' }}>Review submissions blindly. You only see anonymous FINAL_HASH.</p>

            {error && (
                <div style={{ marginBottom: '1.5rem', padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '0.5rem', color: 'var(--error)' }}>{error}</div>
            )}

            {exams.length > 0 && (
                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Exam</label>
                    <select
                        value={selectedExamId || ''}
                        onChange={(e) => setSelectedExamId(e.target.value)}
                        style={{ padding: '0.5rem', borderRadius: '0.5rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border)', color: 'white', minWidth: '200px' }}
                    >
                        {exams.map((ex) => (
                            <option key={ex.examId} value={ex.examId}>{ex.title}</option>
                        ))}
                    </select>
                </div>
            )}

            {loading ? (
                <p style={{ color: 'var(--text-muted)' }}>Loading submissions...</p>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 350px' : '1fr', gap: '2rem' }}>
                    <div className="glass-card" style={{ padding: '0' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid var(--border)', textAlign: 'left' }}>
                                    <th style={{ padding: '1rem' }}>FINAL_HASH (Anonymous)</th>
                                    <th style={{ padding: '1rem' }}>Exam</th>
                                    <th style={{ padding: '1rem', textAlign: 'right' }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {submissions.map((sub) => (
                                    <tr key={sub.submissionId} style={{ borderBottom: '1px solid var(--border)' }}>
                                        <td style={{ padding: '1rem' }}><code style={{ color: 'var(--primary)' }}>{displayHash(sub)}</code></td>
                                        <td style={{ padding: '1rem' }}>{sub.exam?.title || selectedExamId}</td>
                                        <td style={{ padding: '1rem', textAlign: 'right' }}>
                                            <button
                                                onClick={() => setSelected(sub)}
                                                style={{ color: 'var(--primary)' }}
                                            >
                                                Grade Submission
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {submissions.length === 0 && !loading && (
                            <p style={{ padding: '2rem', color: 'var(--text-muted)' }}>No pending submissions for this exam.</p>
                        )}
                    </div>

                    {selected && (
                        <div className="glass-card">
                            <h3 style={{ marginBottom: '1.5rem' }}>Grading {displayHash(selected)}</h3>
                            <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '0.5rem', marginBottom: '2rem', fontSize: '0.875rem' }}>
                                <p style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Answer hash (anonymous):</p>
                                <code>{(selected.answerHash || '').substring(0, 20)}...</code>
                            </div>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Score (0-100)</label>
                                <input
                                    type="number"
                                    value={score}
                                    onChange={(e) => setScore(e.target.value)}
                                    min={0}
                                    max={100}
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border)', color: 'white' }}
                                />
                            </div>
                            <button
                                onClick={handleGrade}
                                className="btn-primary"
                                style={{ width: '100%' }}
                                disabled={publishing}
                            >
                                {publishing ? 'Publishing...' : 'Publish Result to Sui'}
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default EvaluatorDashboard;
