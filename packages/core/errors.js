/**
 * @fileoverview Custom error classes for FairTest Protocol
 * @description Enterprise-grade error handling with detailed error types,
 * error codes, and contextual information for debugging and user feedback.
 * 
 * @author FairTest Protocol Team
 * @version 2.0.0
 * @license MIT
 */

/**
 * Base error class for all FairTest errors
 * @extends Error
 */
export class FairTestError extends Error {
    /**
     * @param {string} message - Error message
     * @param {string} code - Error code
     * @param {Object} context - Additional context
     */
    constructor(message, code = 'UNKNOWN_ERROR', context = {}) {
        super(message);
        this.name = this.constructor.name;
        this.code = code;
        this.context = context;
        this.timestamp = new Date().toISOString();
        
        // Maintains proper stack trace for where error was thrown
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }

    /**
     * Convert error to JSON for logging
     * @returns {Object} JSON representation
     */
    toJSON() {
        return {
            name: this.name,
            message: this.message,
            code: this.code,
            context: this.context,
            timestamp: this.timestamp,
            stack: this.stack
        };
    }
}

/**
 * Validation error
 */
export class ValidationError extends FairTestError {
    constructor(message, field = null, context = {}) {
        super(message, 'VALIDATION_ERROR', { field, ...context });
        this.field = field;
    }
}

/**
 * Authentication error
 */
export class AuthenticationError extends FairTestError {
    constructor(message, context = {}) {
        super(message, 'AUTHENTICATION_ERROR', context);
    }
}

/**
 * Authorization error
 */
export class AuthorizationError extends FairTestError {
    constructor(message, context = {}) {
        super(message, 'AUTHORIZATION_ERROR', context);
    }
}

/**
 * Network error
 */
export class NetworkError extends FairTestError {
    constructor(message, statusCode = null, context = {}) {
        super(message, 'NETWORK_ERROR', { statusCode, ...context });
        this.statusCode = statusCode;
    }
}

/**
 * Blockchain transaction error
 */
export class TransactionError extends FairTestError {
    constructor(message, txHash = null, context = {}) {
        super(message, 'TRANSACTION_ERROR', { txHash, ...context });
        this.txHash = txHash;
    }
}

/**
 * Payment error
 */
export class PaymentError extends FairTestError {
    constructor(message, sessionId = null, context = {}) {
        super(message, 'PAYMENT_ERROR', { sessionId, ...context });
        this.sessionId = sessionId;
    }
}

/**
 * Privacy violation error
 */
export class PrivacyError extends FairTestError {
    constructor(message, context = {}) {
        super(message, 'PRIVACY_ERROR', context);
    }
}

/**
 * Evaluation error
 */
export class EvaluationError extends FairTestError {
    constructor(message, questionId = null, context = {}) {
        super(message, 'EVALUATION_ERROR', { questionId, ...context });
        this.questionId = questionId;
    }
}

/**
 * Not found error
 */
export class NotFoundError extends FairTestError {
    constructor(resource, identifier = null, context = {}) {
        super(`${resource} not found`, 'NOT_FOUND', { resource, identifier, ...context });
        this.resource = resource;
        this.identifier = identifier;
    }
}

/**
 * Conflict error
 */
export class ConflictError extends FairTestError {
    constructor(message, context = {}) {
        super(message, 'CONFLICT_ERROR', context);
    }
}

/**
 * Rate limit error
 */
export class RateLimitError extends FairTestError {
    constructor(message, retryAfter = null, context = {}) {
        super(message, 'RATE_LIMIT_ERROR', { retryAfter, ...context });
        this.retryAfter = retryAfter;
    }
}

/**
 * Error handler utility
 */
export class ErrorHandler {
    /**
     * Handle error and return user-friendly message
     * @param {Error} error - Error to handle
     * @returns {{message: string, code: string, severity: string}} Error info
     */
    static handle(error) {
        console.error('[ErrorHandler]', error);

        if (error instanceof FairTestError) {
            return {
                message: error.message,
                code: error.code,
                severity: this.getSeverity(error),
                context: error.context
            };
        }

        // Handle unknown errors
        return {
            message: 'An unexpected error occurred. Please try again.',
            code: 'UNKNOWN_ERROR',
            severity: 'error',
            context: {}
        };
    }

    /**
     * Get error severity level
     * @param {FairTestError} error - Error instance
     * @returns {string} Severity level
     */
    static getSeverity(error) {
        if (error instanceof ValidationError) return 'warning';
        if (error instanceof AuthenticationError) return 'error';
        if (error instanceof AuthorizationError) return 'error';
        if (error instanceof NetworkError) return 'error';
        if (error instanceof TransactionError) return 'critical';
        if (error instanceof PaymentError) return 'critical';
        if (error instanceof PrivacyError) return 'critical';
        if (error instanceof NotFoundError) return 'warning';
        if (error instanceof ConflictError) return 'warning';
        if (error instanceof RateLimitError) return 'warning';
        return 'error';
    }

    /**
     * Log error to console with formatting
     * @param {Error} error - Error to log
     * @param {Object} additionalContext - Additional context
     */
    static log(error, additionalContext = {}) {
        const errorInfo = this.handle(error);
        
        console.group(`[${errorInfo.severity.toUpperCase()}] ${errorInfo.code}`);
        console.error('Message:', errorInfo.message);
        console.error('Context:', { ...errorInfo.context, ...additionalContext });
        if (error.stack) {
            console.error('Stack:', error.stack);
        }
        console.groupEnd();
    }

    /**
     * Check if error is retryable
     * @param {Error} error - Error to check
     * @returns {boolean} True if retryable
     */
    static isRetryable(error) {
        return error instanceof NetworkError || 
               error instanceof RateLimitError ||
               (error instanceof TransactionError && error.context.retryable);
    }
}

export default {
    FairTestError,
    ValidationError,
    AuthenticationError,
    AuthorizationError,
    NetworkError,
    TransactionError,
    PaymentError,
    PrivacyError,
    EvaluationError,
    NotFoundError,
    ConflictError,
    RateLimitError,
    ErrorHandler
};
