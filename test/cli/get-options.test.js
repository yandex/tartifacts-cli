'use strict';

const test = require('ava');

const getOptions = require('../../lib/cli').getOptions;

test('should return root option', async t => {
    const options = await getOptions({ root: 'path/to/root/' });

    t.is(options.root, 'path/to/root/');
});

test('should return dest dir option', async t => {
    const options = await getOptions({ destDir: 'path/to/dest-dir/' });

    t.is(options.destDir, 'path/to/dest-dir/');
});

test('should return truthy options', async t => {
    const options = await getOptions({
        dotFiles: true,
        emptyDirs: 'true',
        emptyFiles: 1
    });

    t.deepEqual(options, {
        dotFiles: true,
        emptyDirs: true,
        emptyFiles: true
    });
});

test('should return falsy options', async t => {
    const options = await getOptions({
        dotFiles: false,
        emptyDirs: 'false',
        emptyFiles: 0
    });

    t.deepEqual(options, {
        dotFiles: false,
        emptyDirs: false,
        emptyFiles: false
    });
});

test('should not add other options', async t => {
    const options = await getOptions({ other: 'xxx' });

    t.deepEqual(options, {});
});
