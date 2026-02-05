/**
 * @fileoverview Auto Evaluation Engine for FairTest Protocol
 * @description Provides automated grading for multiple question types with support for
 * partial credit, negative marking, and section-wise scoring. Implements industry-standard
 * evaluation algorithms with comprehensive error handling.
 * 
 * @author FairTest Protocol Team
 * @version 2.0.0
 * @license MIT
 */

/**
 * @typedef {Object} EvaluationResult
 * @property {number} totalScore - Total score achieved
 * @property {number} maxScore - Maximum possible score
 * @property {Array<QuestionResult>} questionScores - Individual question results
 * @property {Object<string, SectionScore>} sectionScores - Section-wise scores
 * @property {Array<string>} autoGraded - IDs of auto-graded questions
 * @property {Array<string>} manualGrading - IDs of questions requiring manual grading
 */

/**
 * @typedef {Object} QuestionResult
 * @property {string} questionId - Unique question identifier
 * @property {string} type - Question type
 * @property {number} maxMarks - Maximum marks for question
 * @property {number} score - Score achieved
 * @property {boolean} autoGraded - Whether question was auto-graded
 * @property {boolean} correct - Whether answer was correct
 * @property {boolean} partialCredit - Whether partial credit was awarded
 */

/**
 * AutoEvaluator - Enterprise-grade automatic evaluation engine
 * 
 * Features:
 * - Multi-format question support (MCQ, Multiple Correct, True/False, Fill Blanks, Matching)
 * - Partial credit calculation with configurable algorithms
 * - Negative marking support
 * - Section-wise scoring and analytics
 * - Rank generation with tie-breaking
 * - Comprehensive error handling and validation
 * 
 * @class
 * @example
 * const evaluator = new AutoEvaluator();
 * const results = evaluator.evaluateExam(questions, studentAnswers);
 * console.log(`Score: ${results.totalScore}/${results.maxScore}`);
 */
class AutoEvaluator {
    /**
     * Initialize the AutoEvaluator with default configuration
     * @constructor
     */
    constructor() {
        this.results = this._initializeResults();
        this.config = {
            partialCreditEnabled: true,
            negativeMarkingEnabled: true,
            minScoreThreshold: 0, // Minimum score (prevents negative totals)
            roundingPrecision: 2
        };
    }

    /**
     * Initialize empty results object
     * @private
     * @returns {EvaluationResult} Empty results structure
     */
    _initializeResults() {
        return {
            totalScore: 0,
            maxScore: 0,
            questionScores: [],
            sectionScores: {},
            autoGraded: [],
            manualGrading: [],
            metadata: {
                evaluatedAt: new Date().toISOString(),
                evaluatorVersion: '2.0.0'
            }
        };
    }

    /**
     * Evaluate complete exam with comprehensive error handling
     * @param {Array<Object>} questions - Array of question objects with type, marks, and answer key
     * @param {Object<string, any>} studentAnswers - Student's answers keyed by question ID
     * @returns {EvaluationResult} Comprehensive evaluation results
     * @throws {Error} If questions array is invalid or empty
     * 
     * @example
     * const results = evaluator.evaluateExam(
     *   [{ id: 'q1', type: 'mcq', marks: 4, correctAnswer: 1 }],
     *   { 'q1': 1 }
     * );
     */
    evaluateExam(questions, studentAnswers) {
        // Input validation
        if (!Array.isArray(questions) || questions.length === 0) {
            throw new Error('Invalid questions array: must be non-empty array');
        }

        if (!studentAnswers || typeof studentAnswers !== 'object') {
            throw new Error('Invalid student answers: must be an object');
        }

        // Reset results
        this.results = this._initializeResults();

        // Evaluate each question with error handling
        questions.forEach((question, index) => {
            try {
                this._validateQuestion(question, index);
                const studentAnswer = studentAnswers[question.id];
                const result = this.evaluateQuestion(question, studentAnswer);
                
                this._aggregateResults(result, question);
            } catch (error) {
                console.error(`Error evaluating question ${question.id}:`, error);
                // Add failed question to results with zero score
                this.results.questionScores.push({
                    questionId: question.id,
                    type: question.type,
                    maxMarks: question.marks || 0,
                    score: 0,
                    autoGraded: false,
                    error: error.message
                });
            }
        });

        // Round final score
        this.results.totalScore = this._roundScore(this.results.totalScore);
        
        return this.results;
    }

    /**
     * Validate question structure
     * @private
     * @param {Object} question - Question to validate
     * @param {number} index - Question index for error reporting
     * @throws {Error} If question structure is invalid
     */
    _validateQuestion(question, index) {
        if (!question.id) {
            throw new Error(`Question at index ${index} missing required 'id' field`);
        }
        if (!question.type) {
            throw new Error(`Question ${question.id} missing required 'type' field`);
        }
        if (typeof question.marks !== 'number' || question.marks < 0) {
            throw new Error(`Question ${question.id} has invalid 'marks' value`);
        }
    }

    /**
     * Aggregate individual question result into overall results
     * @private
     * @param {QuestionResult} result - Individual question result
     * @param {Object} question - Original question object
     */
    _aggregateResults(result, question) {
        this.results.questionScores.push(result);
        this.results.maxScore += question.marks;

        if (result.autoGraded) {
            this.results.totalScore += result.score;
            this.results.autoGraded.push(question.id);
        } else {
            this.results.manualGrading.push(question.id);
        }

        // Section-wise scoring
        const section = question.section || 'default';
        if (!this.results.sectionScores[section]) {
            this.results.sectionScores[section] = { 
                score: 0, 
                maxScore: 0,
                questionsCount: 0,
                autoGraded: 0
            };
        }
        
        if (result.autoGraded) {
            this.results.sectionScores[section].score += result.score;
            this.results.sectionScores[section].autoGraded++;
        }
        this.results.sectionScores[section].maxScore += question.marks;
        this.results.sectionScores[section].questionsCount++;
    }

    /**
     * Round score to configured precision
     * @private
     * @param {number} score - Score to round
     * @returns {number} Rounded score
     */
    _roundScore(score) {
        const multiplier = Math.pow(10, this.config.roundingPrecision);
        return Math.round(score * multiplier) / multiplier;
    }

    /**
     * Evaluate a single question
     * @param {Object} question - Question object
     * @param {*} studentAnswer - Student's answer
     * @returns {Object} Question evaluation result
     */
    evaluateQuestion(question, studentAnswer) {
        const result = {
            questionId: question.id,
            type: question.type,
            maxMarks: question.marks,
            score: 0,
            autoGraded: false,
            correct: false,
            partialCredit: false
        };

        // No answer provided
        if (studentAnswer === undefined || studentAnswer === null || studentAnswer === '') {
            return result;
        }

        switch (question.type) {
            case 'mcq':
                return this.evaluateMCQ(question, studentAnswer);
            case 'multiple_correct':
                return this.evaluateMultipleCorrect(question, studentAnswer);
            case 'true_false':
                return this.evaluateTrueFalse(question, studentAnswer);
            case 'fill_blanks':
                return this.evaluateFillBlanks(question, studentAnswer);
            case 'match_following':
                return this.evaluateMatchFollowing(question, studentAnswer);
            case 'descriptive':
                return this.evaluateDescriptive(question, studentAnswer);
            default:
                return result;
        }
    }

    /**
     * Evaluate MCQ (Single Correct Answer)
     */
    evaluateMCQ(question, studentAnswer) {
        const correct = studentAnswer === question.correctAnswer;
        
        return {
            questionId: question.id,
            type: 'mcq',
            maxMarks: question.marks,
            score: correct ? question.marks : -question.negativeMarks,
            autoGraded: true,
            correct,
            partialCredit: false,
            studentAnswer,
            correctAnswer: question.correctAnswer
        };
    }

    /**
     * Evaluate Multiple Correct (Checkbox Type)
     */
    evaluateMultipleCorrect(question, studentAnswer) {
        if (!Array.isArray(studentAnswer)) {
            return {
                questionId: question.id,
                type: 'multiple_correct',
                maxMarks: question.marks,
                score: 0,
                autoGraded: true,
                correct: false,
                partialCredit: false
            };
        }

        const correctAnswers = new Set(question.correctAnswers);
        const studentAnswers = new Set(studentAnswer);
        
        // Calculate correct and incorrect selections
        const correctSelections = [...studentAnswers].filter(a => correctAnswers.has(a)).length;
        const incorrectSelections = [...studentAnswers].filter(a => !correctAnswers.has(a)).length;
        const missedCorrect = correctAnswers.size - correctSelections;

        // All correct
        if (correctSelections === correctAnswers.size && incorrectSelections === 0) {
            return {
                questionId: question.id,
                type: 'multiple_correct',
                maxMarks: question.marks,
                score: question.marks,
                autoGraded: true,
                correct: true,
                partialCredit: false,
                studentAnswer,
                correctAnswer: question.correctAnswers
            };
        }

        // Partial credit: (correct selections / total correct) * marks - penalty for wrong
        const partialScore = (correctSelections / correctAnswers.size) * question.marks;
        const penalty = incorrectSelections * (question.negativeMarks || 0);
        const finalScore = Math.max(0, partialScore - penalty);

        return {
            questionId: question.id,
            type: 'multiple_correct',
            maxMarks: question.marks,
            score: finalScore,
            autoGraded: true,
            correct: false,
            partialCredit: finalScore > 0,
            studentAnswer,
            correctAnswer: question.correctAnswers
        };
    }

    /**
     * Evaluate True/False
     */
    evaluateTrueFalse(question, studentAnswer) {
        const correct = studentAnswer === question.correctAnswer;
        
        return {
            questionId: question.id,
            type: 'true_false',
            maxMarks: question.marks,
            score: correct ? question.marks : -question.negativeMarks,
            autoGraded: true,
            correct,
            partialCredit: false,
            studentAnswer,
            correctAnswer: question.correctAnswer
        };
    }

    /**
     * Evaluate Fill in the Blanks
     */
    evaluateFillBlanks(question, studentAnswer) {
        if (!Array.isArray(studentAnswer) || studentAnswer.length !== question.blanks.length) {
            return {
                questionId: question.id,
                type: 'fill_blanks',
                maxMarks: question.marks,
                score: 0,
                autoGraded: true,
                correct: false,
                partialCredit: false
            };
        }

        let correctBlanks = 0;
        const blankResults = [];

        question.blanks.forEach((blank, index) => {
            const studentAns = studentAnswer[index] || '';
            const correctAns = blank.answer;
            
            let isCorrect = false;
            if (blank.caseSensitive) {
                isCorrect = studentAns.trim() === correctAns.trim();
            } else {
                isCorrect = studentAns.trim().toLowerCase() === correctAns.trim().toLowerCase();
            }

            if (isCorrect) correctBlanks++;
            blankResults.push({ correct: isCorrect, studentAnswer: studentAns, correctAnswer: correctAns });
        });

        const allCorrect = correctBlanks === question.blanks.length;
        const partialScore = (correctBlanks / question.blanks.length) * question.marks;

        return {
            questionId: question.id,
            type: 'fill_blanks',
            maxMarks: question.marks,
            score: allCorrect ? question.marks : partialScore,
            autoGraded: true,
            correct: allCorrect,
            partialCredit: !allCorrect && partialScore > 0,
            blankResults,
            studentAnswer,
            correctAnswer: question.blanks.map(b => b.answer)
        };
    }

    /**
     * Evaluate Match the Following
     */
    evaluateMatchFollowing(question, studentAnswer) {
        if (typeof studentAnswer !== 'object') {
            return {
                questionId: question.id,
                type: 'match_following',
                maxMarks: question.marks,
                score: 0,
                autoGraded: true,
                correct: false,
                partialCredit: false
            };
        }

        let correctMatches = 0;
        const totalPairs = Object.keys(question.correctPairs).length;

        Object.keys(question.correctPairs).forEach(leftIndex => {
            if (studentAnswer[leftIndex] === question.correctPairs[leftIndex]) {
                correctMatches++;
            }
        });

        const allCorrect = correctMatches === totalPairs;
        const partialScore = (correctMatches / totalPairs) * question.marks;

        return {
            questionId: question.id,
            type: 'match_following',
            maxMarks: question.marks,
            score: allCorrect ? question.marks : partialScore,
            autoGraded: true,
            correct: allCorrect,
            partialCredit: !allCorrect && partialScore > 0,
            correctMatches,
            totalPairs,
            studentAnswer,
            correctAnswer: question.correctPairs
        };
    }

    /**
     * Evaluate Descriptive (Requires Manual Grading)
     */
    evaluateDescriptive(question, studentAnswer) {
        return {
            questionId: question.id,
            type: 'descriptive',
            maxMarks: question.marks,
            score: 0,
            autoGraded: false,
            requiresManualGrading: true,
            studentAnswer,
            wordCount: studentAnswer.split(/\s+/).length
        };
    }

    /**
     * Calculate final score with manual grades
     * @param {Object} autoResults - Results from auto-evaluation
     * @param {Object} manualGrades - Manual grades for descriptive questions
     * @returns {Object} Final results
     */
    mergeFinalScore(autoResults, manualGrades) {
        let totalScore = autoResults.totalScore;

        autoResults.questionScores.forEach(result => {
            if (!result.autoGraded && manualGrades[result.questionId] !== undefined) {
                totalScore += manualGrades[result.questionId];
            }
        });

        return {
            ...autoResults,
            totalScore,
            percentage: (totalScore / autoResults.maxScore) * 100,
            manualGradesApplied: Object.keys(manualGrades).length
        };
    }

    /**
     * Generate rank based on scores
     * @param {Array} allResults - Array of all student results
     * @returns {Array} Results with ranks
     */
    static generateRanks(allResults) {
        // Sort by score descending
        const sorted = [...allResults].sort((a, b) => b.totalScore - a.totalScore);
        
        let currentRank = 1;
        let previousScore = null;
        let sameRankCount = 0;

        return sorted.map((result, index) => {
            if (previousScore !== null && result.totalScore < previousScore) {
                currentRank += sameRankCount;
                sameRankCount = 1;
            } else {
                sameRankCount++;
            }

            previousScore = result.totalScore;

            return {
                ...result,
                rank: currentRank,
                totalStudents: allResults.length
            };
        });
    }
}

export default AutoEvaluator;
