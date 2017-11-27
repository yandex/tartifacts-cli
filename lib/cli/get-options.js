'use strict';

const pick = require('lodash.pick');

/**
 * Parse boolean option.
 *
 * @param {*} opt — option value.
 * @returns {Boolean}
 */
const parseBooleanOpt = (opt) => {
    return opt === 'false' ? false : Boolean(opt);
};

/**
 * Returns artifact options by CLI flags.
 *
 * @param {object} flags — cli flags.
 * @returns {Object[]}
 */
module.exports = (flags) => {
    const options = pick(flags, ['root', 'destDir', 'dotFiles', 'emptyDirs', 'emptyFiles']);

    options.hasOwnProperty('dotFiles') && (options.dotFiles = parseBooleanOpt(options.dotFiles));
    options.hasOwnProperty('emptyDirs') && (options.emptyDirs = parseBooleanOpt(options.emptyDirs));
    options.hasOwnProperty('emptyFiles') && (options.emptyFiles = parseBooleanOpt(options.emptyFiles));

    return options;
};

