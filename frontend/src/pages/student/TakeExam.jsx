import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AnonymousIDManager from 'identity';
import ExamInterface from '../../components/ExamInterface';

function TakeExam() {
    const { examId } = useParams();
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // 1: instructions, 2: exam, 3: submitting
    const [uidData, setUidData] = useState(null);
    const [exam, setExam] = useState(null);
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        // Load exam data
        // In production, fetch from Sui blockchain
        setExam({
            id: examId,
            name: 'NEET Practice 2024',
            duration: 60, // minutes
            totalMarks: 100,
            instructions: 'Read all questions carefully. You can navigate between questions. Timer will auto-submit when time expires.'
        });

        // Load questions
        // In production, fetch from off-chain storage using hash from Sui
        setQuestions([
            {
                id: 'q1',
                type: 'mcq',
                text: 'What is the consensus mechanism used by Sui?',
                options: ['Proof of Work', 'Proof of Stake / Narwhal & Bullshark', 'Delegated Proof of Stake', 'Proof of History'],
                correctAnswer: 1,
                marks: 4,
                negativeMarks: 1
            },
            {
                id: 'q2',
                type: 'multiple_correct',
                text: 'Which of the following are Layer 1 blockchains?',
                options: ['Ethereum', 'Polygon', 'Sui', 'Arbitrum'],
                correctAnswers: [0, 2],
                marks: 4,
                negativeMarks: 0
            },
            {
                id: 'q3',
                type: 'true_false',
                text: 'Yellow Network enables off-chain payment sessions.',
                correctAnswer: true,
                marks: 2,
                negativeMarks: 0
            }
        ]);
    }, [examId]);

    const startExam = () => {
        const idManager = new AnonymousIDManager();
        const data = idManager.generateUID('0xabc...', examId);
        idManager.storeUIDLocally(data);
        setUidData(data);
        setStep(2);
    };

    const handleSubmit = async (answers) => {
        setStep(3);
        
        // Hash answers
        const idManager = new AnonymousIDManager();
        const submissionPayload = idManager.createSubmissionPayload(
            uidData.uidHash,
            examId,
            answers
        );

        // Privacy audit
        const audit = idManager.auditPrivacy(submissionPayload, '0xabc...');
        console.log('[Privacy Audit]', audit.passed ? 'PASSED' : 'FAILED');

        // Submit to Sui
        console.log('[Sui] Creating SubmissionObject with UID_HASH:', uidData.uidHash.substring(0, 16) + '...');
        
        // Simulation of Sui transaction
        await new Promise(r => setTimeout(r, 2000));
        
        navigate('/student/results');
    };

    if (!exam || questions.length === 0) {
        return <div style={{ textAlign: 'center', padding: '4rem' }}>Loading exam...</div>;
    }

    return (
        <div className="take-exam">
            {step === 1 && (
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

                        <button onClick={startExam} className="btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1.125rem' }}>
                            Generate UID & Start Exam
                        </button>
                    </div>
                </div>
            )}

            {step === 2 && uidData && (
                <ExamInterface
                    exam={exam}
                    questions={questions}
                    onSubmit={handleSubmit}
                    uidData={uidData}
                />
            )}

            {step === 3 && (
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
