'use strict';

const path = require('path');
const cp = require('child_process');
const _ = require('lodash');
const signals = require('../constants/signals');

process.setMaxListeners(0);

module.exports = (artifacts, options) => {
    return allSettled(artifacts.map((artifact) => {
        const worker = cp.fork(path.resolve(__dirname, 'write-artifact'), [JSON.stringify(artifact), JSON.stringify(options)]);

        signals.forEach((signal) => process.on(signal, () => worker.kill(signal)));

        return promisifyWorker(worker);
    }))
    .then((results) => {
        const rejected = _.find(results, 'error');

        return rejected ? Promise.reject(rejected.error) : Promise.resolve();
    });
};

function promisifyWorker(worker) {
    return new Promise((resolve, reject) => {
        worker.on('error', reject);
        worker.on('exit', (code) => code === 0 ? resolve() : reject(new Error(`Worker exit code is ${code}`)));
    });
}

function allSettled(promises) {
    return Promise.all(promises.map((promise) => {
        return promise.then(() => ({ error: null })).catch((error) => ({ error }));
    }));
}
