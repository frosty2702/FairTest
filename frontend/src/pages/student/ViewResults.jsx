import React, { useState, useEffect } from 'react';
import AnonymousIDManager from 'identity';

function ViewResults() {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate fetching results from Sui
        setTimeout(() => {
            setResults([
                { examName: 'NEET Practice 2024', examId: 'exam-1', score: 85, rank: 12, total: 154 },
            ]);
            setLoading(false);
        }, 1000);
    }, []);

    return (
        <div className="view-results">
            <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '2rem' }}>Your Results</h1>

            {loading ? (
                <p>Loading your anonymous results from Sui...</p>
            ) : (
                <div style={{ display: 'grid', gap: '1.5rem' }}>
                    {results.map(res => (
                        <div key={res.examId} className="glass-card">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
                                <div>
                                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{res.examName}</h3>
                                    <span className="badge badge-success">Verified on Sui</span>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--primary)' }}>{res.score}</div>
                                    <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Score</div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '3rem', borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
                                <div>
                                    <div style={{ fontSize: '1.25rem', fontWeight: '700' }}>#{res.rank}</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Global Rank</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '1.25rem', fontWeight: '700' }}>Top 8%</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Percentile</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ViewResults;
