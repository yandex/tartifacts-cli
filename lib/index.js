'use strict';

const Workers = require('./workers');
const writeArtifact = require('./write-artifact');
const signals = require('./constants/signals');

exports.writeArtifacts = (artifacts = [], options) => {
    artifacts = [].concat(artifacts);

    // do not use child processes for one artifact
    if (artifacts.length === 1) {
        return writeArtifact(artifacts, options);
    }

    const workers = Workers.create(artifacts, options);

    signals.forEach((signal) => process.on(signal, () => workers.kill(signal)));

    return workers.run();
};
