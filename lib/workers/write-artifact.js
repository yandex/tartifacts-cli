'use strict';

const writeArtifact = require('../write-artifact');

const artifact = JSON.parse(process.argv[2]);
const options = JSON.parse(process.argv[3]);

writeArtifact(artifact, options);
