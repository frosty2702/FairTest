import React, { useState, useEffect, useRef } from 'react';
import { QUESTION_TYPES } from './QuestionBuilder';

function ExamInterface({ exam, questions, onSubmit, uidData }) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [timeRemaining, setTimeRemaining] = useState(exam.duration * 60); // in seconds
    const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
    const [attemptedQuestions, setAttemptedQuestions] = useState(new Set());
    const timerRef = useRef(null);

    useEffect(() => {
        // Start timer
        timerRef.current = setInterval(() => {
            setTimeRemaining(prev => {
                if (prev <= 1) {
                    handleAutoSubmit();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, []);

    const handleAutoSubmit = () => {
        if (timerRef.current) clearInterval(timerRef.current);
        onSubmit(answers);
    };

    const handleSubmitClick = () => {
        setShowSubmitConfirm(true);
    };

    const confirmSubmit = () => {
        if (timerRef.current) clearInterval(timerRef.current);
        onSubmit(answers);
    };

    const setAnswer = (questionId, answer) => {
        setAnswers(prev => ({ ...prev, [questionId]: answer }));
        setAttemptedQuestions(prev => new Set([...prev, questionId]));
    };

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        
        if (hours > 0) {
            return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        }
        return `${minutes}:${secs.toString().padStart(2, '0')}`;
    };

    const getQuestionStatus = (questionId) => {
        if (attemptedQuestions.has(questionId)) return 'attempted';
        return 'unattempted';
    };

    const question = questions[currentQuestion];

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 250px', gap: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
            {/* Main Exam Area */}
            <div>
                {/* Header with Timer */}
                <div className="glass-card" style={{ 
                    marginBottom: '2rem', 
                    padding: '1rem 2rem', 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    borderColor: timeRemaining < 300 ? 'var(--error)' : 'var(--primary)'
                }}>
                    <div>
                        <span style={{ fontSize: '0.875rem' }}>Anonymous UID: </span>
                        <code style={{ color: 'var(--primary)' }}>{uidData.uid.substring(0, 12)}...</code>
                        <span className="badge badge-success" style={{ marginLeft: '1rem' }}>Privacy Enabled</span>
                    </div>
                    <div style={{ 
                        fontSize: '1.5rem', 
                        fontWeight: '700',
                        color: timeRemaining < 300 ? 'var(--error)' : 'white'
                    }}>
                        ⏱ {formatTime(timeRemaining)}
                    </div>
                </div>

                {/* Question */}
                <div className="glass-card">
                    <div style={{ marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <h3>Question {currentQuestion + 1} of {questions.length}</h3>
                            <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                                {question.marks} mark{question.marks !== 1 ? 's' : ''}
                                {question.negativeMarks > 0 && ` • -${question.negativeMarks} for wrong`}
                            </span>
                        </div>
                        <p style={{ fontSize: '1.125rem', lineHeight: '1.6' }}>{question.text}</p>
                    </div>

                    {/* Question Type Specific UI */}
                    <QuestionRenderer
                        question={question}
                        answer={answers[question.id]}
                        setAnswer={(answer) => setAnswer(question.id, answer)}
                    />

                    {/* Navigation */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid var(--border)' }}>
                        <button
                            onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
                            disabled={currentQuestion === 0}
                            className="btn-secondary"
                            style={{ opacity: currentQuestion === 0 ? 0.5 : 1 }}
                        >
                            ← Previous
                        </button>
                        
                        {currentQuestion < questions.length - 1 ? (
                            <button
                                onClick={() => setCurrentQuestion(prev => Math.min(questions.length - 1, prev + 1))}
                                className="btn-primary"
                            >
                                Next →
                            </button>
                        ) : (
                            <button
                                onClick={handleSubmitClick}
                                className="btn-primary"
                                style={{ background: 'var(--success)' }}
                            >
                                Submit Exam
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Question Palette */}
            <div>
                <div className="glass-card" style={{ position: 'sticky', top: '2rem' }}>
                    <h4 style={{ marginBottom: '1rem' }}>Question Palette</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.5rem', marginBottom: '1.5rem' }}>
                        {questions.map((q, index) => {
                            const status = getQuestionStatus(q.id);
                            return (
                                <button
                                    key={q.id}
                                    onClick={() => setCurrentQuestion(index)}
                                    style={{
                                        padding: '0.5rem',
                                        borderRadius: '0.25rem',
                                        background: currentQuestion === index 
                                            ? 'var(--primary)' 
                                            : status === 'attempted' 
                                                ? 'rgba(34, 197, 94, 0.2)' 
                                                : 'rgba(255,255,255,0.05)',
                                        border: '1px solid',
                                        borderColor: currentQuestion === index 
                                            ? 'var(--primary)' 
                                            : status === 'attempted' 
                                                ? 'rgba(34, 197, 94, 0.3)' 
                                                : 'var(--border)',
                                        fontSize: '0.875rem',
                                        fontWeight: currentQuestion === index ? '600' : '400',
                                        cursor: 'pointer'
                                    }}
                                >
                                    {index + 1}
                                </button>
                            );
                        })}
                    </div>

                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                            <div style={{ width: '1rem', height: '1rem', background: 'rgba(34, 197, 94, 0.2)', border: '1px solid rgba(34, 197, 94, 0.3)', borderRadius: '0.25rem' }}></div>
                            Attempted ({attemptedQuestions.size})
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <div style={{ width: '1rem', height: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: '0.25rem' }}></div>
                            Not Attempted ({questions.length - attemptedQuestions.size})
                        </div>
                    </div>

                    <button
                        onClick={handleSubmitClick}
                        className="btn-primary"
                        style={{ width: '100%', marginTop: '1.5rem', background: 'var(--success)' }}
                    >
                        Submit Exam
                    </button>
                </div>
            </div>

            {/* Submit Confirmation Modal */}
            {showSubmitConfirm && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0,0,0,0.8)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000
                }}>
                    <div className="glass-card" style={{ maxWidth: '500px', padding: '2rem' }}>
                        <h3 style={{ marginBottom: '1rem' }}>Submit Exam?</h3>
                        <p style={{ marginBottom: '1.5rem', color: 'var(--text-muted)' }}>
                            You have attempted {attemptedQuestions.size} out of {questions.length} questions.
                            {attemptedQuestions.size < questions.length && (
                                <span style={{ display: 'block', marginTop: '0.5rem', color: 'var(--warning)' }}>
                                    ⚠️ {questions.length - attemptedQuestions.size} question(s) not attempted
                                </span>
                            )}
                        </p>
                        <p style={{ marginBottom: '2rem', fontSize: '0.875rem' }}>
                            Once submitted, you cannot change your answers. Are you sure?
                        </p>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button
                                onClick={() => setShowSubmitConfirm(false)}
                                className="btn-secondary"
                                style={{ flex: 1 }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmSubmit}
                                className="btn-primary"
                                style={{ flex: 1, background: 'var(--success)' }}
                            >
                                Yes, Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function QuestionRenderer({ question, answer, setAnswer }) {
    switch (question.type) {
        case 'mcq':
            return <MCQRenderer question={question} answer={answer} setAnswer={setAnswer} />;
        case 'multiple_correct':
            return <MultipleCorrectRenderer question={question} answer={answer} setAnswer={setAnswer} />;
        case 'true_false':
            return <TrueFalseRenderer question={question} answer={answer} setAnswer={setAnswer} />;
        case 'descriptive':
            return <DescriptiveRenderer question={question} answer={answer} setAnswer={setAnswer} />;
        case 'fill_blanks':
            return <FillBlanksRenderer question={question} answer={answer} setAnswer={setAnswer} />;
        case 'match_following':
            return <MatchFollowingRenderer question={question} answer={answer} setAnswer={setAnswer} />;
        default:
            return <div>Unsupported question type</div>;
    }
}

function MCQRenderer({ question, answer, setAnswer }) {
    return (
        <div>
            {question.options.map((opt, index) => (
                <label
                    key={index}
                    style={{
                        display: 'block',
                        padding: '1rem',
                        marginBottom: '0.5rem',
                        background: answer === index ? 'rgba(99, 102, 241, 0.2)' : 'rgba(255,255,255,0.05)',
                        border: '1px solid',
                        borderColor: answer === index ? 'var(--primary)' : 'var(--border)',
                        borderRadius: '0.5rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                    }}
                >
                    <input
                        type="radio"
                        name={`question-${question.id}`}
                        checked={answer === index}
                        onChange={() => setAnswer(index)}
                        style={{ marginRight: '1rem' }}
                    />
                    {opt}
                </label>
            ))}
        </div>
    );
}

function MultipleCorrectRenderer({ question, answer = [], setAnswer }) {
    const toggleOption = (index) => {
        const newAnswer = answer.includes(index)
            ? answer.filter(i => i !== index)
            : [...answer, index];
        setAnswer(newAnswer);
    };

    return (
        <div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                Select all correct answers
            </p>
            {question.options.map((opt, index) => (
                <label
                    key={index}
                    style={{
                        display: 'block',
                        padding: '1rem',
                        marginBottom: '0.5rem',
                        background: answer.includes(index) ? 'rgba(99, 102, 241, 0.2)' : 'rgba(255,255,255,0.05)',
                        border: '1px solid',
                        borderColor: answer.includes(index) ? 'var(--primary)' : 'var(--border)',
                        borderRadius: '0.5rem',
                        cursor: 'pointer'
                    }}
                >
                    <input
                        type="checkbox"
                        checked={answer.includes(index)}
                        onChange={() => toggleOption(index)}
                        style={{ marginRight: '1rem' }}
                    />
                    {opt}
                </label>
            ))}
        </div>
    );
}

function TrueFalseRenderer({ question, answer, setAnswer }) {
    return (
        <div style={{ display: 'flex', gap: '1rem' }}>
            <label style={{
                flex: 1,
                padding: '2rem',
                textAlign: 'center',
                background: answer === true ? 'rgba(99, 102, 241, 0.2)' : 'rgba(255,255,255,0.05)',
                border: '1px solid',
                borderColor: answer === true ? 'var(--primary)' : 'var(--border)',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                fontSize: '1.25rem',
                fontWeight: '600'
            }}>
                <input
                    type="radio"
                    name={`question-${question.id}`}
                    checked={answer === true}
                    onChange={() => setAnswer(true)}
                    style={{ display: 'none' }}
                />
                True
            </label>
            <label style={{
                flex: 1,
                padding: '2rem',
                textAlign: 'center',
                background: answer === false ? 'rgba(99, 102, 241, 0.2)' : 'rgba(255,255,255,0.05)',
                border: '1px solid',
                borderColor: answer === false ? 'var(--primary)' : 'var(--border)',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                fontSize: '1.25rem',
                fontWeight: '600'
            }}>
                <input
                    type="radio"
                    name={`question-${question.id}`}
                    checked={answer === false}
                    onChange={() => setAnswer(false)}
                    style={{ display: 'none' }}
                />
                False
            </label>
        </div>
    );
}

function DescriptiveRenderer({ question, answer = '', setAnswer }) {
    const wordCount = answer.trim().split(/\s+/).filter(w => w).length;
    const isOverLimit = wordCount > question.maxWords;

    return (
        <div>
            <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Type your answer here..."
                style={{
                    width: '100%',
                    minHeight: '200px',
                    padding: '1rem',
                    borderRadius: '0.5rem',
                    background: 'rgba(0,0,0,0.2)',
                    border: '1px solid var(--border)',
                    color: 'white',
                    resize: 'vertical',
                    fontSize: '1rem',
                    lineHeight: '1.6'
                }}
            />
            <div style={{ 
                marginTop: '0.5rem', 
                fontSize: '0.875rem', 
                color: isOverLimit ? 'var(--error)' : 'var(--text-muted)',
                textAlign: 'right'
            }}>
                {wordCount} / {question.maxWords} words
                {isOverLimit && ' (over limit)'}
            </div>
        </div>
    );
}

function FillBlanksRenderer({ question, answer = [], setAnswer }) {
    const updateBlank = (index, value) => {
        const newAnswer = [...answer];
        newAnswer[index] = value;
        setAnswer(newAnswer);
    };

    return (
        <div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                Fill in the blanks
            </p>
            {question.blanks.map((blank, index) => (
                <div key={index} style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                        Blank {index + 1}
                    </label>
                    <input
                        type="text"
                        value={answer[index] || ''}
                        onChange={(e) => updateBlank(index, e.target.value)}
                        placeholder="Your answer"
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            borderRadius: '0.5rem',
                            background: 'rgba(0,0,0,0.2)',
                            border: '1px solid var(--border)',
                            color: 'white'
                        }}
                    />
                </div>
            ))}
        </div>
    );
}

function MatchFollowingRenderer({ question, answer = {}, setAnswer }) {
    const updatePair = (leftIndex, rightIndex) => {
        setAnswer({ ...answer, [leftIndex]: rightIndex });
    };

    return (
        <div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                Match items from left column with right column
            </p>
            {question.leftColumn.map((leftItem, leftIndex) => (
                <div key={leftIndex} style={{ marginBottom: '1rem', display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '1rem', alignItems: 'center' }}>
                    <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '0.5rem' }}>
                        {leftItem}
                    </div>
                    <div>→</div>
                    <select
                        value={answer[leftIndex] ?? ''}
                        onChange={(e) => updatePair(leftIndex, parseInt(e.target.value))}
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            borderRadius: '0.5rem',
                            background: 'rgba(0,0,0,0.2)',
                            border: '1px solid var(--border)',
                            color: 'white'
                        }}
                    >
                        <option value="">Select match</option>
                        {question.rightColumn.map((rightItem, rightIndex) => (
                            <option key={rightIndex} value={rightIndex}>
                                {rightItem}
                            </option>
                        ))}
                    </select>
                </div>
            ))}
        </div>
    );
}

export default ExamInterface;
