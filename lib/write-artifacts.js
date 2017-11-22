'use strict';

const writeArtifacts = require('tartifacts');

const runWorkers = require('./workers/run-workers');

/**
 * Search files of artifact by glob patterns and writes them to artifact in fs.
 *
 * Launches an assembly for several artifacts in parallel on different workers.
 *
 * @param {object[]} artifacts The artifacts info.
 * @param {object}   options The artifact options.
 * @returns {Promise}
 */
module.exports = (artifacts, options) => {
    artifacts || (artifacts = []);

    if (!Array.isArray(artifacts)) {
        artifacts = [artifacts];
    }

    // do not use child processes for one artifact
    if (artifacts.length === 1) {
        return writeArtifacts(artifacts, options);
    }

    return runWorkers(artifacts, options);
};
