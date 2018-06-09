'use strict';

const Tartifacts = require('tartifacts').Tartifacts;
const signals = require('./constants/signals');

module.exports = (artifact, options) => {
    const tartifacts = Tartifacts.create(options);

    signals.forEach((signal) => process.on(signal, () => tartifacts.closeArtifacts()));

    return tartifacts.writeArtifacts(artifact);
};
