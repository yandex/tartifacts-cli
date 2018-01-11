tartifacts-cli
==============

The tool to create artifacts for your assemblies.

[![NPM Status][npm-img]][npm]
[![Travis Status][test-img]][travis]
[![Windows Status][appveyor-img]][appveyor]
[![Coverage Status][coverage-img]][coveralls]
[![Dependency Status][david-img]][david]

[npm]:          https://www.npmjs.org/package/tartifacts-cli
[npm-img]:      https://img.shields.io/npm/v/tartifacts-cli.svg

[travis]:       https://travis-ci.org/blond/tartifacts-cli
[test-img]:     https://img.shields.io/travis/blond/tartifacts-cli/master.svg?label=tests

[appveyor]:     https://ci.appveyor.com/project/blond/tartifacts-cli
[appveyor-img]: https://img.shields.io/appveyor/ci/blond/tartifacts-cli/master.svg?label=windows

[coveralls]:    https://coveralls.io/r/blond/tartifacts-cli
[coverage-img]: https://img.shields.io/coveralls/blond/tartifacts-cli/master.svg

[david]:        https://david-dm.org/blond/tartifacts-cli
[david-img]:    https://img.shields.io/david/blond/tartifacts-cli/master.svg

Install
-------

```
$ npm install --save-dev tartifacts-cli
```

Usage
-----

```
$ tartifacts --help

Options
      --follow-symlinks Follow symlinked files and directories
      --dot-files       Include dotfiles
      --empty-dirs      Include empty directories
      --empty-files     Include empty files

Options (config mode)
    -c, --config    Path to config with artifacts info
    -r, --root      Path to root directory for artifacts patterns
    -d, --dest-dir  Path to destination directory for artifacts from config

Options (single mode)
    -p, --patterns  Path to file with includes and excludes patterns of artifact
    -i, --include   Paths to inlcude files of artifact
    -e, --exclude   Paths to exclude files of artifact
    -o, --output    Path to destination artifact file or directory

Examples
    $ tartifacts --config artifacts.json --dest-dir dist/
    $ tartifacts --include "lib/**" --exclude "node_modules/" --output artifact.tar.gz
    $ tartifacts --patterns ./patterns.txt --output=artifact.tar.gz
```

Patterns
--------

You can write patterns to file.

Use `!` prefix for exclude and `#` for comments.

**Example:**

```
# include `sources`
sources/**

# exclude `sources/exlib`
!sources/exlib/*.{js,css}

# override previous exclude pattern,
# and include files with `es6.js` extension
sources/exlib/*.{es6.js}
```

Read more about patterns in [glob](https://github.com/isaacs/node-glob#glob-primer) package.

License
-------

MIT © [Andrew Abramov](https://github.com/blond)
