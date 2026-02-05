import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ENSManager from 'ens-integration';
import PaymentFlow from 'yellow-integration';

function BrowseExams() {
    const navigate = useNavigate();
    const [exams, setExams] = useState([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [status, setStatus] = useState('');

    useEffect(() => {
        const ens = new ENSManager();
        ens.getExamList().then(setExams);
    }, []);

    const handleRegister = async (exam) => {
        setIsProcessing(true);
        setStatus(`Registering for ${exam.examName} via Yellow...`);

        try {
            const payment = new PaymentFlow();
            await payment.processRegistrationPayment({
                studentWallet: '0xabc...',
                examId: exam.suiObjectID,
                examFee: exam.examFee,
                creatorWallet: exam.creatorWallet
            });

            setStatus('Registration Successful!');
            setTimeout(() => {
                navigate(`/student/take/${exam.suiObjectID}`);
            }, 1500);
        } catch (err) {
            console.error(err);
            setIsProcessing(false);
        }
    };

    return (
        <div className="browse-exams">
            <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '2rem' }}>Browse Exams</h1>

            {isProcessing ? (
                <div className="glass-card" style={{ textAlign: 'center', padding: '4rem' }}>
                    <h2 style={{ marginBottom: '1rem' }}>{status}</h2>
                    <p style={{ color: 'var(--text-muted)' }}>Interacting with Yellow Network for off-chain registration.</p>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                    {exams.map(exam => (
                        <div key={exam.ensDomain} className="glass-card" style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: '600', marginBottom: '0.5rem' }}>{exam.ensDomain}</div>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>{exam.examName}</h3>
                            <div style={{ marginTop: 'auto' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
                                    <span style={{ color: 'var(--text-muted)' }}>Fee:</span>
                                    <span style={{ fontWeight: '600' }}>{exam.examFee} SUI</span>
                                </div>
                                <button
                                    onClick={() => handleRegister(exam)}
                                    className="btn-primary"
                                    style={{ width: '100%' }}
                                >
                                    Register & Pay
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default BrowseExams;
