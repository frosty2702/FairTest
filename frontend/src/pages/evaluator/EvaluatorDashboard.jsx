import React, { useState } from 'react';

function EvaluatorDashboard() {
    const [submissions, setSubmissions] = useState([
        { id: '1', uidHash: '7a8b...2f9c', examName: 'NEET Practice 2024', status: 'PENDING' },
        { id: '2', uidHash: '3d5e...1a4b', examName: 'NEET Practice 2024', status: 'PENDING' },
        { id: '3', uidHash: '9c2f...8e7d', examName: 'NEET Practice 2024', status: 'GRADED', score: 92 }
    ]);

    const [selected, setSelected] = useState(null);
    const [score, setScore] = useState('');

    const handleGrade = (id) => {
        setSubmissions(submissions.map(s => s.id === id ? { ...s, status: 'GRADED', score: parseInt(score) } : s));
        setSelected(null);
        setScore('');
    };

    return (
        <div className="evaluator-dashboard">
            <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '1rem' }}>Evaluator Dashboard</h1>
            <p style={{ color: 'var(--text-muted)', marginBottom: '3rem' }}>Review submissions blindly. You only see anonymous UID_HASHes.</p>

            <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 350px' : '1fr', gap: '2rem' }}>
                <div className="glass-card" style={{ padding: '0' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--border)', textAlign: 'left' }}>
                                <th style={{ padding: '1rem' }}>UID_HASH (Anonymous)</th>
                                <th style={{ padding: '1rem' }}>Exam</th>
                                <th style={{ padding: '1rem' }}>Status</th>
                                <th style={{ padding: '1rem', textAlign: 'right' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {submissions.map(sub => (
                                <tr key={sub.id} style={{ borderBottom: '1px solid var(--border)' }}>
                                    <td style={{ padding: '1rem' }}><code style={{ color: 'var(--primary)' }}>{sub.uidHash}</code></td>
                                    <td style={{ padding: '1rem' }}>{sub.examName}</td>
                                    <td style={{ padding: '1rem' }}>
                                        <span className="badge" style={{ backgroundColor: sub.status === 'GRADED' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(245, 158, 11, 0.1)', color: sub.status === 'GRADED' ? 'var(--success)' : 'var(--warning)' }}>
                                            {sub.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                                        <button
                                            onClick={() => setSelected(sub)}
                                            disabled={sub.status === 'GRADED'}
                                            style={{ color: 'var(--primary)', opacity: sub.status === 'GRADED' ? 0.5 : 1 }}
                                        >
                                            {sub.status === 'GRADED' ? 'Change Grade' : 'Grade Submission'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {selected && (
                    <div className="glass-card">
                        <h3 style={{ marginBottom: '1.5rem' }}>Grading {selected.uidHash}</h3>
                        <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '0.5rem', marginBottom: '2rem', fontSize: '0.875rem' }}>
                            <p style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Response Payload Hash:</p>
                            <code>0x8ffae87...b2e9</code>
                        </div>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Score (0-100)</label>
                            <input
                                type="number"
                                value={score}
                                onChange={e => setScore(e.target.value)}
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border)', color: 'white' }}
                            />
                        </div>
                        <button
                            onClick={() => handleGrade(selected.id)}
                            className="btn-primary"
                            style={{ width: '100%' }}
                        >
                            Publish Result to Sui
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default EvaluatorDashboard;
