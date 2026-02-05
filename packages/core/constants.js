/**
 * @fileoverview Global constants for FairTest Protocol
 * @description Centralized configuration and constants for consistent behavior
 * across the application. Follows industry best practices for maintainability.
 * 
 * @author FairTest Protocol Team
 * @version 2.0.0
 * @license MIT
 */

/**
 * Question type constants
 * @enum {string}
 * @readonly
 */
export const QUESTION_TYPES = Object.freeze({
    MCQ: 'mcq',
    MULTIPLE_CORRECT: 'multiple_correct',
    TRUE_FALSE: 'true_false',
    DESCRIPTIVE: 'descriptive',
    FILL_BLANKS: 'fill_blanks',
    MATCH_FOLLOWING: 'match_following'
});

/**
 * Exam status constants
 * @enum {string}
 * @readonly
 */
export const EXAM_STATUS = Object.freeze({
    DRAFT: 'draft',
    PUBLISHED: 'published',
    ACTIVE: 'active',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled'
});

/**
 * Submission status constants
 * @enum {string}
 * @readonly
 */
export const SUBMISSION_STATUS = Object.freeze({
    NOT_STARTED: 'not_started',
    IN_PROGRESS: 'in_progress',
    SUBMITTED: 'submitted',
    EVALUATED: 'evaluated'
});

/**
 * Payment session types
 * @enum {string}
 * @readonly
 */
export const PAYMENT_TYPES = Object.freeze({
    LISTING_FEE: 'listing_fee',
    REGISTRATION_FEE: 'registration_fee'
});

/**
 * Network configuration
 * @readonly
 */
export const NETWORKS = Object.freeze({
    SUI: {
        TESTNET: 'https://fullnode.testnet.sui.io:443',
        DEVNET: 'https://fullnode.devnet.sui.io:443',
        MAINNET: 'https://fullnode.mainnet.sui.io:443'
    },
    ETHEREUM: {
        SEPOLIA: 'https://sepolia.infura.io/v3/',
        MAINNET: 'https://mainnet.infura.io/v3/'
    }
});

/**
 * Platform configuration
 * @readonly
 */
export const PLATFORM_CONFIG = Object.freeze({
    LISTING_FEE: 0.1, // SUI
    MIN_EXAM_FEE: 0.01, // SUI
    MAX_EXAM_FEE: 100, // SUI
    MIN_DURATION: 1, // minutes
    MAX_DURATION: 480, // minutes (8 hours)
    MIN_QUESTIONS: 1,
    MAX_QUESTIONS: 200,
    MAX_OPTIONS_PER_QUESTION: 10,
    MIN_OPTIONS_PER_QUESTION: 2
});

/**
 * Validation rules
 * @readonly
 */
export const VALIDATION_RULES = Object.freeze({
    EXAM_NAME: {
        MIN_LENGTH: 3,
        MAX_LENGTH: 100,
        PATTERN: /^[a-zA-Z0-9\s\-_]+$/
    },
    DESCRIPTION: {
        MAX_LENGTH: 1000
    },
    QUESTION_TEXT: {
        MIN_LENGTH: 5,
        MAX_LENGTH: 2000
    },
    OPTION_TEXT: {
        MIN_LENGTH: 1,
        MAX_LENGTH: 500
    },
    DESCRIPTIVE_ANSWER: {
        MIN_WORDS: 10,
        MAX_WORDS: 5000
    }
});

/**
 * Error messages
 * @readonly
 */
export const ERROR_MESSAGES = Object.freeze({
    INVALID_QUESTION_TYPE: 'Invalid question type provided',
    MISSING_REQUIRED_FIELD: 'Required field is missing',
    INVALID_MARKS: 'Marks must be a positive number',
    INVALID_DURATION: 'Duration must be between 1 and 480 minutes',
    INVALID_FEE: 'Fee must be between 0.01 and 100 SUI',
    NO_QUESTIONS: 'Exam must have at least one question',
    INVALID_OPTIONS: 'Question must have valid options',
    NO_CORRECT_ANSWER: 'Question must have at least one correct answer',
    WALLET_NOT_CONNECTED: 'Please connect your wallet',
    INSUFFICIENT_BALANCE: 'Insufficient balance for transaction',
    TRANSACTION_FAILED: 'Transaction failed. Please try again',
    NETWORK_ERROR: 'Network error. Please check your connection'
});

/**
 * Success messages
 * @readonly
 */
export const SUCCESS_MESSAGES = Object.freeze({
    EXAM_CREATED: 'Exam created successfully',
    EXAM_PUBLISHED: 'Exam published successfully',
    PAYMENT_SUCCESSFUL: 'Payment processed successfully',
    SUBMISSION_SUCCESSFUL: 'Exam submitted successfully',
    EVALUATION_COMPLETE: 'Evaluation completed successfully'
});

/**
 * UI configuration
 * @readonly
 */
export const UI_CONFIG = Object.freeze({
    DEBOUNCE_DELAY: 300, // ms
    AUTO_SAVE_INTERVAL: 30000, // ms (30 seconds)
    TOAST_DURATION: 3000, // ms
    MODAL_ANIMATION_DURATION: 200, // ms
    PAGINATION_SIZE: 20,
    MAX_FILE_SIZE: 5 * 1024 * 1024 // 5MB
});

/**
 * Privacy configuration
 * @readonly
 */
export const PRIVACY_CONFIG = Object.freeze({
    UID_HASH_ALGORITHM: 'sha256',
    SALT_LENGTH: 16, // bytes
    UID_DISPLAY_LENGTH: 12, // characters to show
    ENABLE_PRIVACY_AUDIT: true
});

/**
 * Evaluation configuration
 * @readonly
 */
export const EVALUATION_CONFIG = Object.freeze({
    PARTIAL_CREDIT_ENABLED: true,
    NEGATIVE_MARKING_ENABLED: true,
    MIN_SCORE_THRESHOLD: 0,
    ROUNDING_PRECISION: 2,
    AUTO_GRADE_TYPES: [
        QUESTION_TYPES.MCQ,
        QUESTION_TYPES.MULTIPLE_CORRECT,
        QUESTION_TYPES.TRUE_FALSE,
        QUESTION_TYPES.FILL_BLANKS,
        QUESTION_TYPES.MATCH_FOLLOWING
    ]
});

/**
 * Local storage keys
 * @readonly
 */
export const STORAGE_KEYS = Object.freeze({
    UID_PREFIX: 'fairtest_uid_',
    WALLET_ADDRESS: 'fairtest_wallet',
    THEME: 'fairtest_theme',
    LANGUAGE: 'fairtest_language',
    DRAFT_PREFIX: 'fairtest_draft_'
});

/**
 * API endpoints (for future backend integration)
 * @readonly
 */
export const API_ENDPOINTS = Object.freeze({
    EXAMS: '/api/exams',
    SUBMISSIONS: '/api/submissions',
    RESULTS: '/api/results',
    PAYMENTS: '/api/payments',
    USERS: '/api/users'
});

/**
 * Event names for custom events
 * @readonly
 */
export const EVENTS = Object.freeze({
    WALLET_CONNECTED: 'wallet:connected',
    WALLET_DISCONNECTED: 'wallet:disconnected',
    EXAM_STARTED: 'exam:started',
    EXAM_SUBMITTED: 'exam:submitted',
    PAYMENT_COMPLETED: 'payment:completed',
    EVALUATION_COMPLETED: 'evaluation:completed'
});

export default {
    QUESTION_TYPES,
    EXAM_STATUS,
    SUBMISSION_STATUS,
    PAYMENT_TYPES,
    NETWORKS,
    PLATFORM_CONFIG,
    VALIDATION_RULES,
    ERROR_MESSAGES,
    SUCCESS_MESSAGES,
    UI_CONFIG,
    PRIVACY_CONFIG,
    EVALUATION_CONFIG,
    STORAGE_KEYS,
    API_ENDPOINTS,
    EVENTS
};
