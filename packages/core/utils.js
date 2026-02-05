/**
 * @fileoverview Utility functions for FairTest Protocol
 * @description Enterprise-grade utility functions with comprehensive error handling,
 * input validation, and performance optimization.
 * 
 * @author FairTest Protocol Team
 * @version 2.0.0
 * @license MIT
 */

import { VALIDATION_RULES, ERROR_MESSAGES } from './constants.js';

/**
 * Validation utilities
 * @namespace ValidationUtils
 */
export const ValidationUtils = {
    /**
     * Validate exam name
     * @param {string} name - Exam name to validate
     * @returns {{valid: boolean, error: string|null}} Validation result
     */
    validateExamName(name) {
        if (!name || typeof name !== 'string') {
            return { valid: false, error: 'Exam name is required' };
        }

        const trimmed = name.trim();
        
        if (trimmed.length < VALIDATION_RULES.EXAM_NAME.MIN_LENGTH) {
            return { 
                valid: false, 
                error: `Exam name must be at least ${VALIDATION_RULES.EXAM_NAME.MIN_LENGTH} characters` 
            };
        }

        if (trimmed.length > VALIDATION_RULES.EXAM_NAME.MAX_LENGTH) {
            return { 
                valid: false, 
                error: `Exam name must not exceed ${VALIDATION_RULES.EXAM_NAME.MAX_LENGTH} characters` 
            };
        }

        if (!VALIDATION_RULES.EXAM_NAME.PATTERN.test(trimmed)) {
            return { 
                valid: false, 
                error: 'Exam name can only contain letters, numbers, spaces, hyphens, and underscores' 
            };
        }

        return { valid: true, error: null };
    },

    /**
     * Validate question text
     * @param {string} text - Question text to validate
     * @returns {{valid: boolean, error: string|null}} Validation result
     */
    validateQuestionText(text) {
        if (!text || typeof text !== 'string') {
            return { valid: false, error: 'Question text is required' };
        }

        const trimmed = text.trim();
        
        if (trimmed.length < VALIDATION_RULES.QUESTION_TEXT.MIN_LENGTH) {
            return { 
                valid: false, 
                error: `Question text must be at least ${VALIDATION_RULES.QUESTION_TEXT.MIN_LENGTH} characters` 
            };
        }

        if (trimmed.length > VALIDATION_RULES.QUESTION_TEXT.MAX_LENGTH) {
            return { 
                valid: false, 
                error: `Question text must not exceed ${VALIDATION_RULES.QUESTION_TEXT.MAX_LENGTH} characters` 
            };
        }

        return { valid: true, error: null };
    },

    /**
     * Validate marks
     * @param {number} marks - Marks to validate
     * @returns {{valid: boolean, error: string|null}} Validation result
     */
    validateMarks(marks) {
        if (typeof marks !== 'number' || isNaN(marks)) {
            return { valid: false, error: 'Marks must be a number' };
        }

        if (marks <= 0) {
            return { valid: false, error: 'Marks must be greater than 0' };
        }

        if (marks > 100) {
            return { valid: false, error: 'Marks cannot exceed 100' };
        }

        return { valid: true, error: null };
    },

    /**
     * Validate email address
     * @param {string} email - Email to validate
     * @returns {{valid: boolean, error: string|null}} Validation result
     */
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!email || typeof email !== 'string') {
            return { valid: false, error: 'Email is required' };
        }

        if (!emailRegex.test(email)) {
            return { valid: false, error: 'Invalid email format' };
        }

        return { valid: true, error: null };
    }
};

/**
 * String utilities
 * @namespace StringUtils
 */
export const StringUtils = {
    /**
     * Truncate string with ellipsis
     * @param {string} str - String to truncate
     * @param {number} maxLength - Maximum length
     * @returns {string} Truncated string
     */
    truncate(str, maxLength = 50) {
        if (!str || typeof str !== 'string') return '';
        if (str.length <= maxLength) return str;
        return str.substring(0, maxLength - 3) + '...';
    },

    /**
     * Convert string to slug (URL-friendly)
     * @param {string} str - String to convert
     * @returns {string} Slug string
     */
    toSlug(str) {
        if (!str || typeof str !== 'string') return '';
        
        return str
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
    },

    /**
     * Capitalize first letter of each word
     * @param {string} str - String to capitalize
     * @returns {string} Capitalized string
     */
    toTitleCase(str) {
        if (!str || typeof str !== 'string') return '';
        
        return str
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    },

    /**
     * Count words in string
     * @param {string} str - String to count words in
     * @returns {number} Word count
     */
    countWords(str) {
        if (!str || typeof str !== 'string') return 0;
        return str.trim().split(/\s+/).filter(word => word.length > 0).length;
    },

    /**
     * Mask sensitive string (show only first and last few characters)
     * @param {string} str - String to mask
     * @param {number} visibleChars - Number of visible characters at start/end
     * @returns {string} Masked string
     */
    mask(str, visibleChars = 4) {
        if (!str || typeof str !== 'string') return '';
        if (str.length <= visibleChars * 2) return str;
        
        const start = str.substring(0, visibleChars);
        const end = str.substring(str.length - visibleChars);
        return `${start}...${end}`;
    }
};

/**
 * Number utilities
 * @namespace NumberUtils
 */
export const NumberUtils = {
    /**
     * Format number with commas
     * @param {number} num - Number to format
     * @returns {string} Formatted number
     */
    formatWithCommas(num) {
        if (typeof num !== 'number' || isNaN(num)) return '0';
        return num.toLocaleString('en-US');
    },

    /**
     * Round to specified decimal places
     * @param {number} num - Number to round
     * @param {number} decimals - Number of decimal places
     * @returns {number} Rounded number
     */
    round(num, decimals = 2) {
        if (typeof num !== 'number' || isNaN(num)) return 0;
        const multiplier = Math.pow(10, decimals);
        return Math.round(num * multiplier) / multiplier;
    },

    /**
     * Clamp number between min and max
     * @param {number} num - Number to clamp
     * @param {number} min - Minimum value
     * @param {number} max - Maximum value
     * @returns {number} Clamped number
     */
    clamp(num, min, max) {
        return Math.min(Math.max(num, min), max);
    },

    /**
     * Calculate percentage
     * @param {number} value - Value
     * @param {number} total - Total
     * @param {number} decimals - Decimal places
     * @returns {number} Percentage
     */
    percentage(value, total, decimals = 2) {
        if (total === 0) return 0;
        return this.round((value / total) * 100, decimals);
    }
};

/**
 * Date/Time utilities
 * @namespace DateUtils
 */
export const DateUtils = {
    /**
     * Format timestamp to readable date
     * @param {number|Date} timestamp - Timestamp or Date object
     * @returns {string} Formatted date
     */
    formatDate(timestamp) {
        const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    },

    /**
     * Format timestamp to readable date and time
     * @param {number|Date} timestamp - Timestamp or Date object
     * @returns {string} Formatted date and time
     */
    formatDateTime(timestamp) {
        const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    },

    /**
     * Format seconds to MM:SS or HH:MM:SS
     * @param {number} seconds - Seconds to format
     * @returns {string} Formatted time
     */
    formatDuration(seconds) {
        if (typeof seconds !== 'number' || seconds < 0) return '00:00';
        
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        
        if (hours > 0) {
            return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        }
        return `${minutes}:${secs.toString().padStart(2, '0')}`;
    },

    /**
     * Get relative time (e.g., "2 hours ago")
     * @param {number|Date} timestamp - Timestamp or Date object
     * @returns {string} Relative time string
     */
    getRelativeTime(timestamp) {
        const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
        const now = new Date();
        const diffMs = now - date;
        const diffSecs = Math.floor(diffMs / 1000);
        const diffMins = Math.floor(diffSecs / 60);
        const diffHours = Math.floor(diffMins / 60);
        const diffDays = Math.floor(diffHours / 24);

        if (diffSecs < 60) return 'just now';
        if (diffMins < 60) return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
        if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
        if (diffDays < 30) return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
        return this.formatDate(date);
    }
};

/**
 * Array utilities
 * @namespace ArrayUtils
 */
export const ArrayUtils = {
    /**
     * Shuffle array (Fisher-Yates algorithm)
     * @param {Array} array - Array to shuffle
     * @returns {Array} Shuffled array (new array)
     */
    shuffle(array) {
        if (!Array.isArray(array)) return [];
        
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    },

    /**
     * Remove duplicates from array
     * @param {Array} array - Array with potential duplicates
     * @returns {Array} Array without duplicates
     */
    unique(array) {
        if (!Array.isArray(array)) return [];
        return [...new Set(array)];
    },

    /**
     * Chunk array into smaller arrays
     * @param {Array} array - Array to chunk
     * @param {number} size - Chunk size
     * @returns {Array<Array>} Array of chunks
     */
    chunk(array, size) {
        if (!Array.isArray(array) || size <= 0) return [];
        
        const chunks = [];
        for (let i = 0; i < array.length; i += size) {
            chunks.push(array.slice(i, i + size));
        }
        return chunks;
    },

    /**
     * Group array by key
     * @param {Array} array - Array to group
     * @param {string|Function} key - Key or function to group by
     * @returns {Object} Grouped object
     */
    groupBy(array, key) {
        if (!Array.isArray(array)) return {};
        
        return array.reduce((result, item) => {
            const groupKey = typeof key === 'function' ? key(item) : item[key];
            if (!result[groupKey]) {
                result[groupKey] = [];
            }
            result[groupKey].push(item);
            return result;
        }, {});
    }
};

/**
 * Object utilities
 * @namespace ObjectUtils
 */
export const ObjectUtils = {
    /**
     * Deep clone object
     * @param {Object} obj - Object to clone
     * @returns {Object} Cloned object
     */
    deepClone(obj) {
        if (obj === null || typeof obj !== 'object') return obj;
        if (obj instanceof Date) return new Date(obj);
        if (obj instanceof Array) return obj.map(item => this.deepClone(item));
        
        const cloned = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                cloned[key] = this.deepClone(obj[key]);
            }
        }
        return cloned;
    },

    /**
     * Check if object is empty
     * @param {Object} obj - Object to check
     * @returns {boolean} True if empty
     */
    isEmpty(obj) {
        if (!obj || typeof obj !== 'object') return true;
        return Object.keys(obj).length === 0;
    },

    /**
     * Pick specific keys from object
     * @param {Object} obj - Source object
     * @param {Array<string>} keys - Keys to pick
     * @returns {Object} New object with picked keys
     */
    pick(obj, keys) {
        if (!obj || typeof obj !== 'object' || !Array.isArray(keys)) return {};
        
        return keys.reduce((result, key) => {
            if (obj.hasOwnProperty(key)) {
                result[key] = obj[key];
            }
            return result;
        }, {});
    },

    /**
     * Omit specific keys from object
     * @param {Object} obj - Source object
     * @param {Array<string>} keys - Keys to omit
     * @returns {Object} New object without omitted keys
     */
    omit(obj, keys) {
        if (!obj || typeof obj !== 'object' || !Array.isArray(keys)) return {};
        
        const result = { ...obj };
        keys.forEach(key => delete result[key]);
        return result;
    }
};

/**
 * Async utilities
 * @namespace AsyncUtils
 */
export const AsyncUtils = {
    /**
     * Sleep for specified milliseconds
     * @param {number} ms - Milliseconds to sleep
     * @returns {Promise<void>} Promise that resolves after delay
     */
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    /**
     * Retry async function with exponential backoff
     * @param {Function} fn - Async function to retry
     * @param {number} maxRetries - Maximum number of retries
     * @param {number} baseDelay - Base delay in ms
     * @returns {Promise<any>} Result of function
     */
    async retry(fn, maxRetries = 3, baseDelay = 1000) {
        let lastError;
        
        for (let i = 0; i <= maxRetries; i++) {
            try {
                return await fn();
            } catch (error) {
                lastError = error;
                if (i < maxRetries) {
                    const delay = baseDelay * Math.pow(2, i);
                    await this.sleep(delay);
                }
            }
        }
        
        throw lastError;
    },

    /**
     * Debounce function
     * @param {Function} fn - Function to debounce
     * @param {number} delay - Delay in ms
     * @returns {Function} Debounced function
     */
    debounce(fn, delay = 300) {
        let timeoutId;
        
        return function(...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => fn.apply(this, args), delay);
        };
    },

    /**
     * Throttle function
     * @param {Function} fn - Function to throttle
     * @param {number} limit - Time limit in ms
     * @returns {Function} Throttled function
     */
    throttle(fn, limit = 300) {
        let inThrottle;
        
        return function(...args) {
            if (!inThrottle) {
                fn.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
};

/**
 * Crypto utilities
 * @namespace CryptoUtils
 */
export const CryptoUtils = {
    /**
     * Generate random hex string
     * @param {number} length - Length in bytes
     * @returns {string} Random hex string
     */
    randomHex(length = 16) {
        const bytes = new Uint8Array(length);
        crypto.getRandomValues(bytes);
        return Array.from(bytes)
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');
    },

    /**
     * Simple hash function (for non-cryptographic purposes)
     * @param {string} str - String to hash
     * @returns {string} Hash string
     */
    simpleHash(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return Math.abs(hash).toString(16);
    }
};

export default {
    ValidationUtils,
    StringUtils,
    NumberUtils,
    DateUtils,
    ArrayUtils,
    ObjectUtils,
    AsyncUtils,
    CryptoUtils
};
