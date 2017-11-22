'use strict';

const path = require('path');
const assert = require('assert');

const loadPatternsConfig = require('../patterns').load;

/**
 * Returns `true` if file is tarball.
 *
 * @param {string} filename
 * @returns {boolean}
 */
const isTar = filename => filename.includes('.tar');

/**
 * Returns `true` if file is gzip.
 *
 * @param {string} filename
 * @returns {boolean}
 */
const isGzip = filename => filename.includes('.gz');

/**
 * Loads patterns.
 *
 * If file with patterns is not specified returns `[]`.
 *
 * @param {string} filename
 * @returns {Promise<String[]>}
 */
const loadPatterns = (filename) => {
    if (!filename) { return Promise.resolve([]); }

    return loadPatternsConfig(filename);
};

/**
 * Returns artifact info by CLI flags.
 *
 * @param {object} flags — cli flags.
 * @returns {Object}
 */
module.exports = (flags) => {
    assert(flags.output, 'You should specify the destination path for artifact.');

    const dest = path.resolve(flags.output);
    const basename = path.basename(dest);
    const artifact = {
        dest,
        includes: [].concat(flags.include || []),
        excludes: [].concat(flags.exclude || []),
        tar: isTar(basename),
        gzip: isGzip(basename)
    };

    return loadPatterns(flags.patterns)
        .then(patterns => Object.assign(artifact, { patterns }));
};
