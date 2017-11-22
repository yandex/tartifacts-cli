'use strict';

const workerFarm = require('worker-farm');
const each = require('async-each');

const workers = require('./workers');

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
    const writeArtifact = (artifact, callback) => workers(artifact, options, callback);

    return new Promise((resolve, reject) => {
        each(artifacts, writeArtifact, (err) => {
            workerFarm.end(workers);

            if (err) { return reject(err); }

            resolve();
        });
    });
};