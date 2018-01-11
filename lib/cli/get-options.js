'use strict';

const pick = require('lodash.pick');

const OPTION_NAMES = ['root', 'destDir', 'followSymlinks', 'dotFiles', 'emptyDirs', 'emptyFiles'];
const BOOLEAN_OPTION_NAMES = ['followSymlinks', 'dotFiles', 'emptyDirs', 'emptyFiles'];

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
    const options = pick(flags, OPTION_NAMES);

    BOOLEAN_OPTION_NAMES.forEach(optionName => {
        options.hasOwnProperty(optionName) && (options[optionName] = parseBooleanOpt(options[optionName]));
    });

    return options;
};

