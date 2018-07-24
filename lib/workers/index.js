'use strict';

const path = require('path');
const cp = require('child_process');

module.exports = class Workers {
    static create(artifacts, options) {
        return new Workers(artifacts, options);
    }

    constructor(artifacts, options) {
        this._artifacts = artifacts;
        this._options = options;

        this._workers = [];
    }

    run() {
        const writeArtifact = path.resolve(__dirname, 'write-artifact');

        this._artifacts.forEach((artifact) => {
            this._workers.push(cp.fork(writeArtifact, [JSON.stringify(artifact), JSON.stringify(this._options)]));
        });

        return Promise.all(this._workers.map((worker) => {
            return new Promise((resolve, reject) => {
                worker.on('error', reject);
                worker.on('close', resolve);
            });
        }));
    }

    kill(signal) {
        this._workers.forEach((worker) => worker.kill(signal));
    }
};
