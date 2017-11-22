'use strict';

const writeArtifact = require('tartifacts');

module.exports = (artifact, options, callback) => {
    writeArtifact(artifact, options)
        .then(() => callback())
        .catch(callback)
};
