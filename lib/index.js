'use strict';

const runWorkers = require('./workers/run-workers');
const writeArtifact = require('./write-artifact');

exports.writeArtifacts = (artifacts = [], options) => {
    artifacts = [].concat(artifacts);

    // do not use child processes for one artifact
    if (artifacts.length === 1) {
        return writeArtifact(artifacts, options);
    }

    return runWorkers(artifacts, options);
};
