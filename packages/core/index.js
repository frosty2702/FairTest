/**
 * @fileoverview FairTest Core Package - Main Entry Point
 * @description Centralized exports for all core functionality including
 * utilities, constants, error handling, and evaluation engine.
 * 
 * @author FairTest Protocol Team
 * @version 2.0.0
 * @license MIT
 */

// Export all utilities
export * from './utils.js';
export { default as Utils } from './utils.js';

// Export all constants
export * from './constants.js';
export { default as Constants } from './constants.js';

// Export all error classes
export * from './errors.js';
export { default as Errors } from './errors.js';

// Export AutoEvaluator
export { default as AutoEvaluator } from './AutoEvaluator.js';

/**
 * Package version
 * @constant {string}
 */
export const VERSION = '2.0.0';

/**
 * Package metadata
 * @constant {Object}
 */
export const PACKAGE_INFO = Object.freeze({
    name: '@fairtest/core',
    version: VERSION,
    description: 'Core utilities and evaluation engine for FairTest Protocol',
    author: 'FairTest Protocol Team',
    license: 'MIT'
});

export default {
    Utils,
    Constants,
    Errors,
    AutoEvaluator,
    VERSION,
    PACKAGE_INFO
};
