'use strict';

const path = require('path');

const test = require('ava');
const mockFs = require('mock-fs');

const getArtifactInfo = require('../../lib/cli').getArtifactInfo;

test.afterEach(() => mockFs.restore());

test('should return artifact dir info', async t => {
    const artifact = await getArtifactInfo({ output: 'artifact-dir/' });

    t.deepEqual(artifact, {
        dest: path.resolve('artifact-dir'),
        tar: false,
        gzip: false,
        patterns: [],
        includes: [],
        excludes: []
    });
});

test('should return artifact tarball info', async t => {
    const artifact = await getArtifactInfo({ output: 'artifact.tar' });

    t.deepEqual(artifact, {
        dest: path.resolve('artifact.tar'),
        tar: true,
        gzip: false,
        patterns: [],
        includes: [],
        excludes: []
    });
});

test('should return artifact.tar.gz info', async t => {
    const artifact = await getArtifactInfo({ output: 'artifact.tar.gz' });

    t.deepEqual(artifact, {
        dest: path.resolve('artifact.tar.gz'),
        tar: true,
        gzip: true,
        patterns: [],
        includes: [],
        excludes: []
    });
});

test('should return artifact info with patterns', async t => {
    mockFs({
        'patterns.txt': [
            'src/**',
            '!node_modules/'
        ].join('\n')
    });

    const artifact = await getArtifactInfo({
        output: 'artifact',
        patterns: './patterns.txt'
    });

    t.deepEqual(artifact, {
        dest: path.resolve('artifact'),
        tar: false,
        gzip: false,
        patterns: ['src/**', '!node_modules/'],
        includes: [],
        excludes: []
    });
});

test('should return artifact info with includes & excludes', async t => {
    const artifact = await getArtifactInfo({
        output: 'artifact.tar.gz',
        include: 'src/**',
        exclude: 'node_modules/'
    });

    t.deepEqual(artifact, {
        dest: path.resolve('artifact.tar.gz'),
        tar: true,
        gzip: true,
        patterns: [],
        includes: ['src/**'],
        excludes: ['node_modules/']
    });
});
