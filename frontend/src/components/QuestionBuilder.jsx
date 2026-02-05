import React, { useState } from 'react';

const QUESTION_TYPES = {
    MCQ: 'mcq',
    MULTIPLE_CORRECT: 'multiple_correct',
    TRUE_FALSE: 'true_false',
    DESCRIPTIVE: 'descriptive',
    FILL_BLANKS: 'fill_blanks',
    MATCH_FOLLOWING: 'match_following'
};

function QuestionBuilder({ questions, setQuestions }) {
    const [currentQuestion, setCurrentQuestion] = useState(null);

    const addQuestion = (type) => {
        const newQuestion = {
            id: Date.now(),
            type,
            text: '',
            marks: 1,
            negativeMarks: 0,
            ...getDefaultQuestionData(type)
        };
        setQuestions([...questions, newQuestion]);
        setCurrentQuestion(questions.length);
    };

    const getDefaultQuestionData = (type) => {
        switch (type) {
            case QUESTION_TYPES.MCQ:
                return { options: ['', '', '', ''], correctAnswer: 0 };
            case QUESTION_TYPES.MULTIPLE_CORRECT:
                return { options: ['', '', '', ''], correctAnswers: [] };
            case QUESTION_TYPES.TRUE_FALSE:
                return { correctAnswer: true };
            case QUESTION_TYPES.DESCRIPTIVE:
                return { maxWords: 500, requiresManualGrading: true };
            case QUESTION_TYPES.FILL_BLANKS:
                return { blanks: [{ answer: '', caseSensitive: false }] };
            case QUESTION_TYPES.MATCH_FOLLOWING:
                return { 
                    leftColumn: ['', ''], 
                    rightColumn: ['', ''], 
                    correctPairs: {},
                    shuffle: true 
                };
            default:
                return {};
        }
    };

    const updateQuestion = (index, updates) => {
        const updated = [...questions];
        updated[index] = { ...updated[index], ...updates };
        setQuestions(updated);
    };

    const deleteQuestion = (index) => {
        setQuestions(questions.filter((_, i) => i !== index));
        setCurrentQuestion(null);
    };

    const moveQuestion = (index, direction) => {
        const newIndex = direction === 'up' ? index - 1 : index + 1;
        if (newIndex < 0 || newIndex >= questions.length) return;
        
        const updated = [...questions];
        [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
        setQuestions(updated);
        setCurrentQuestion(newIndex);
    };

    return (
        <div className="question-builder">
            <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ marginBottom: '1rem' }}>Add Question</h3>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <button onClick={() => addQuestion(QUESTION_TYPES.MCQ)} className="btn-secondary">
                        + MCQ
                    </button>
                    <button onClick={() => addQuestion(QUESTION_TYPES.MULTIPLE_CORRECT)} className="btn-secondary">
                        + Multiple Correct
                    </button>
                    <button onClick={() => addQuestion(QUESTION_TYPES.TRUE_FALSE)} className="btn-secondary">
                        + True/False
                    </button>
                    <button onClick={() => addQuestion(QUESTION_TYPES.DESCRIPTIVE)} className="btn-secondary">
                        + Descriptive
                    </button>
                    <button onClick={() => addQuestion(QUESTION_TYPES.FILL_BLANKS)} className="btn-secondary">
                        + Fill Blanks
                    </button>
                    <button onClick={() => addQuestion(QUESTION_TYPES.MATCH_FOLLOWING)} className="btn-secondary">
                        + Match Following
                    </button>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '2rem' }}>
                {/* Question List */}
                <div className="glass-card" style={{ padding: '1rem', maxHeight: '600px', overflowY: 'auto' }}>
                    <h4 style={{ marginBottom: '1rem' }}>Questions ({questions.length})</h4>
                    {questions.map((q, index) => (
                        <div
                            key={q.id}
                            onClick={() => setCurrentQuestion(index)}
                            style={{
                                padding: '0.75rem',
                                marginBottom: '0.5rem',
                                background: currentQuestion === index ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                                borderRadius: '0.5rem',
                                cursor: 'pointer',
                                fontSize: '0.875rem'
                            }}
                        >
                            <div style={{ fontWeight: '600' }}>Q{index + 1}</div>
                            <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>
                                {q.type.replace('_', ' ').toUpperCase()}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Question Editor */}
                <div className="glass-card" style={{ padding: '2rem' }}>
                    {currentQuestion !== null && questions[currentQuestion] ? (
                        <QuestionEditor
                            question={questions[currentQuestion]}
                            index={currentQuestion}
                            updateQuestion={updateQuestion}
                            deleteQuestion={deleteQuestion}
                            moveQuestion={moveQuestion}
                            isFirst={currentQuestion === 0}
                            isLast={currentQuestion === questions.length - 1}
                        />
                    ) : (
                        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
                            <p>Select a question to edit or add a new question</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function QuestionEditor({ question, index, updateQuestion, deleteQuestion, moveQuestion, isFirst, isLast }) {
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                <h3>Question {index + 1}</h3>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button 
                        onClick={() => moveQuestion(index, 'up')} 
                        disabled={isFirst}
                        style={{ opacity: isFirst ? 0.5 : 1 }}
                    >
                        ↑
                    </button>
                    <button 
                        onClick={() => moveQuestion(index, 'down')} 
                        disabled={isLast}
                        style={{ opacity: isLast ? 0.5 : 1 }}
                    >
                        ↓
                    </button>
                    <button onClick={() => deleteQuestion(index)} style={{ color: 'var(--error)' }}>
                        Delete
                    </button>
                </div>
            </div>

            {/* Question Text */}
            <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                    Question Text
                </label>
                <textarea
                    value={question.text}
                    onChange={(e) => updateQuestion(index, { text: e.target.value })}
                    placeholder="Enter your question here..."
                    style={{
                        width: '100%',
                        minHeight: '100px',
                        padding: '0.75rem',
                        borderRadius: '0.5rem',
                        background: 'rgba(0,0,0,0.2)',
                        border: '1px solid var(--border)',
                        color: 'white',
                        resize: 'vertical'
                    }}
                />
            </div>

            {/* Marks */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                        Marks
                    </label>
                    <input
                        type="number"
                        value={question.marks}
                        onChange={(e) => updateQuestion(index, { marks: parseFloat(e.target.value) })}
                        min="0"
                        step="0.5"
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
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                        Negative Marks
                    </label>
                    <input
                        type="number"
                        value={question.negativeMarks}
                        onChange={(e) => updateQuestion(index, { negativeMarks: parseFloat(e.target.value) })}
                        min="0"
                        step="0.25"
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
            </div>

            {/* Type-specific editors */}
            {question.type === QUESTION_TYPES.MCQ && (
                <MCQEditor question={question} index={index} updateQuestion={updateQuestion} />
            )}
            {question.type === QUESTION_TYPES.MULTIPLE_CORRECT && (
                <MultipleCorrectEditor question={question} index={index} updateQuestion={updateQuestion} />
            )}
            {question.type === QUESTION_TYPES.TRUE_FALSE && (
                <TrueFalseEditor question={question} index={index} updateQuestion={updateQuestion} />
            )}
            {question.type === QUESTION_TYPES.DESCRIPTIVE && (
                <DescriptiveEditor question={question} index={index} updateQuestion={updateQuestion} />
            )}
            {question.type === QUESTION_TYPES.FILL_BLANKS && (
                <FillBlanksEditor question={question} index={index} updateQuestion={updateQuestion} />
            )}
            {question.type === QUESTION_TYPES.MATCH_FOLLOWING && (
                <MatchFollowingEditor question={question} index={index} updateQuestion={updateQuestion} />
            )}
        </div>
    );
}

function MCQEditor({ question, index, updateQuestion }) {
    const updateOption = (optIndex, value) => {
        const options = [...question.options];
        options[optIndex] = value;
        updateQuestion(index, { options });
    };

    const addOption = () => {
        updateQuestion(index, { options: [...question.options, ''] });
    };

    const removeOption = (optIndex) => {
        if (question.options.length <= 2) return;
        const options = question.options.filter((_, i) => i !== optIndex);
        updateQuestion(index, { 
            options,
            correctAnswer: question.correctAnswer >= options.length ? 0 : question.correctAnswer
        });
    };

    return (
        <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                Options
            </label>
            {question.options.map((opt, optIndex) => (
                <div key={optIndex} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <input
                        type="radio"
                        checked={question.correctAnswer === optIndex}
                        onChange={() => updateQuestion(index, { correctAnswer: optIndex })}
                    />
                    <input
                        type="text"
                        value={opt}
                        onChange={(e) => updateOption(optIndex, e.target.value)}
                        placeholder={`Option ${optIndex + 1}`}
                        style={{
                            flex: 1,
                            padding: '0.75rem',
                            borderRadius: '0.5rem',
                            background: 'rgba(0,0,0,0.2)',
                            border: '1px solid var(--border)',
                            color: 'white'
                        }}
                    />
                    {question.options.length > 2 && (
                        <button onClick={() => removeOption(optIndex)} style={{ color: 'var(--error)' }}>
                            ×
                        </button>
                    )}
                </div>
            ))}
            <button onClick={addOption} className="btn-secondary" style={{ marginTop: '0.5rem' }}>
                + Add Option
            </button>
        </div>
    );
}

function MultipleCorrectEditor({ question, index, updateQuestion }) {
    const updateOption = (optIndex, value) => {
        const options = [...question.options];
        options[optIndex] = value;
        updateQuestion(index, { options });
    };

    const toggleCorrect = (optIndex) => {
        const correctAnswers = question.correctAnswers.includes(optIndex)
            ? question.correctAnswers.filter(i => i !== optIndex)
            : [...question.correctAnswers, optIndex];
        updateQuestion(index, { correctAnswers });
    };

    return (
        <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                Options (Select all correct answers)
            </label>
            {question.options.map((opt, optIndex) => (
                <div key={optIndex} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <input
                        type="checkbox"
                        checked={question.correctAnswers.includes(optIndex)}
                        onChange={() => toggleCorrect(optIndex)}
                    />
                    <input
                        type="text"
                        value={opt}
                        onChange={(e) => updateOption(optIndex, e.target.value)}
                        placeholder={`Option ${optIndex + 1}`}
                        style={{
                            flex: 1,
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

function TrueFalseEditor({ question, index, updateQuestion }) {
    return (
        <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                Correct Answer
            </label>
            <div style={{ display: 'flex', gap: '1rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                    <input
                        type="radio"
                        checked={question.correctAnswer === true}
                        onChange={() => updateQuestion(index, { correctAnswer: true })}
                    />
                    True
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                    <input
                        type="radio"
                        checked={question.correctAnswer === false}
                        onChange={() => updateQuestion(index, { correctAnswer: false })}
                    />
                    False
                </label>
            </div>
        </div>
    );
}

function DescriptiveEditor({ question, index, updateQuestion }) {
    return (
        <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                Maximum Words
            </label>
            <input
                type="number"
                value={question.maxWords}
                onChange={(e) => updateQuestion(index, { maxWords: parseInt(e.target.value) })}
                min="50"
                step="50"
                style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '0.5rem',
                    background: 'rgba(0,0,0,0.2)',
                    border: '1px solid var(--border)',
                    color: 'white'
                }}
            />
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                This question requires manual grading by evaluator
            </p>
        </div>
    );
}

function FillBlanksEditor({ question, index, updateQuestion }) {
    const addBlank = () => {
        updateQuestion(index, {
            blanks: [...question.blanks, { answer: '', caseSensitive: false }]
        });
    };

    const updateBlank = (blankIndex, updates) => {
        const blanks = [...question.blanks];
        blanks[blankIndex] = { ...blanks[blankIndex], ...updates };
        updateQuestion(index, { blanks });
    };

    return (
        <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                Blanks (Use _____ in question text)
            </label>
            {question.blanks.map((blank, blankIndex) => (
                <div key={blankIndex} style={{ marginBottom: '1rem', padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '0.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                        Blank {blankIndex + 1} Answer
                    </label>
                    <input
                        type="text"
                        value={blank.answer}
                        onChange={(e) => updateBlank(blankIndex, { answer: e.target.value })}
                        placeholder="Expected answer"
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            borderRadius: '0.5rem',
                            background: 'rgba(0,0,0,0.2)',
                            border: '1px solid var(--border)',
                            color: 'white',
                            marginBottom: '0.5rem'
                        }}
                    />
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
                        <input
                            type="checkbox"
                            checked={blank.caseSensitive}
                            onChange={(e) => updateBlank(blankIndex, { caseSensitive: e.target.checked })}
                        />
                        Case Sensitive
                    </label>
                </div>
            ))}
            <button onClick={addBlank} className="btn-secondary">
                + Add Blank
            </button>
        </div>
    );
}

function MatchFollowingEditor({ question, index, updateQuestion }) {
    const updateLeft = (i, value) => {
        const leftColumn = [...question.leftColumn];
        leftColumn[i] = value;
        updateQuestion(index, { leftColumn });
    };

    const updateRight = (i, value) => {
        const rightColumn = [...question.rightColumn];
        rightColumn[i] = value;
        updateQuestion(index, { rightColumn });
    };

    const updatePair = (leftIndex, rightIndex) => {
        const correctPairs = { ...question.correctPairs };
        correctPairs[leftIndex] = rightIndex;
        updateQuestion(index, { correctPairs });
    };

    return (
        <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '1rem' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                        Left Column
                    </label>
                    {question.leftColumn.map((item, i) => (
                        <input
                            key={i}
                            type="text"
                            value={item}
                            onChange={(e) => updateLeft(i, e.target.value)}
                            placeholder={`Item ${i + 1}`}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                borderRadius: '0.5rem',
                                background: 'rgba(0,0,0,0.2)',
                                border: '1px solid var(--border)',
                                color: 'white',
                                marginBottom: '0.5rem'
                            }}
                        />
                    ))}
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                        Right Column
                    </label>
                    {question.rightColumn.map((item, i) => (
                        <input
                            key={i}
                            type="text"
                            value={item}
                            onChange={(e) => updateRight(i, e.target.value)}
                            placeholder={`Match ${i + 1}`}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                borderRadius: '0.5rem',
                                background: 'rgba(0,0,0,0.2)',
                                border: '1px solid var(--border)',
                                color: 'white',
                                marginBottom: '0.5rem'
                            }}
                        />
                    ))}
                </div>
            </div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                Correct Pairs
            </label>
            {question.leftColumn.map((_, leftIndex) => (
                <div key={leftIndex} style={{ marginBottom: '0.5rem' }}>
                    <select
                        value={question.correctPairs[leftIndex] ?? ''}
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
                        <option value="">Select match for item {leftIndex + 1}</option>
                        {question.rightColumn.map((_, rightIndex) => (
                            <option key={rightIndex} value={rightIndex}>
                                Match {rightIndex + 1}
                            </option>
                        ))}
                    </select>
                </div>
            ))}
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem' }}>
                <input
                    type="checkbox"
                    checked={question.shuffle}
                    onChange={(e) => updateQuestion(index, { shuffle: e.target.checked })}
                />
                Shuffle order for students
            </label>
        </div>
    );
}

export default QuestionBuilder;
export { QUESTION_TYPES };
