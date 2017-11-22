'use strict';

const path = require('path');

const test = require('ava');
const mockFs = require('mock-fs');

const getArtifactsInfo = require('../../lib/cli').getArtifactsInfo;

test.afterEach(() => mockFs.restore());

test('should return json config', async t => {
    const artifacts = [
        { name: 'artifact-dir', patterns: ['src/**'] },
        { name: 'artifact.tar.gz', tar: true, gz: true, patterns: ['src/**'] }
    ];

    mockFs({
        'config.json': JSON.stringify(artifacts)
    });

    const actual = await getArtifactsInfo({ config: 'config.json' });

    t.deepEqual(actual, artifacts);
});

test('should return js config', async t => {
    const artifacts = [
        { name: 'artifact-dir', patterns: ['src/**'] },
        { name: 'artifact.tar.gz', tar: true, gz: true, patterns: ['src/**'] }
    ];

    mockFs({
        'config.js': `module.exports = ${JSON.stringify(artifacts)};`
    });

    const actual = await getArtifactsInfo({ config: 'config.js' });

    t.deepEqual(actual, artifacts);
});

test('should return single artifact info', async t => {
    const artifacts = await getArtifactsInfo({ output: 'artifact.tar.gz', include: 'src/**' });

    t.deepEqual(artifacts, [{
        dest: path.resolve('artifact.tar.gz'),
        tar: true,
        gzip: true,
        patterns: [],
        includes: ['src/**'],
        excludes: []
    }]);
});
