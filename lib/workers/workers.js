'use strict';

const workerFarm = require('worker-farm');

module.exports = workerFarm(require.resolve('./write-artifact'));
