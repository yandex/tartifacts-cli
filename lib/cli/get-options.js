'use strict';

const pick = require('lodash.pick');

const OPTION_NAMES = ['root', 'destDir', 'followSymlinks', 'dotFiles', 'emptyDirs', 'emptyFiles', 'watch'];

/**
 * Returns artifact options by CLI flags.
 *
 * @param {object} flags — cli flags.
 * @returns {Object[]}
 */
module.exports = (flags) => pick(flags, OPTION_NAMES);
