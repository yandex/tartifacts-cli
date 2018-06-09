'use strict';

const writeArtifact = require('../write-artifact');

module.exports = (artifact, options, callback) => {
    writeArtifact(artifact, options)
        .then(() => callback())
        .catch(callback)
};
