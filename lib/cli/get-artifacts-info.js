'use strict';

const fileEval = require('node-file-eval');

const getArtifactInfo = require('./get-artifact-info');

/**
 * Returns artifacts info by CLI flags.
 *
 * @param {object} flags — cli flags.
 * @returns {Object[]}
 */
module.exports = (flags) => {
    if (flags.config) {
        return fileEval(flags.config);
    }

    return getArtifactInfo(flags).then(artifact => ([artifact]));
};
