# Baldrick-doc-ts

![npm](https://img.shields.io/npm/v/baldrick-doc-ts)

![Build status](https://github.com/flarebyte/baldrick-doc-ts/actions/workflows/main.yml/badge.svg)

![npm bundle size](https://img.shields.io/bundlephobia/min/baldrick-doc-ts)

![Dependencies](https://status.david-dm.org/gh/flarebyte/baldrick-doc-ts.svg)

![npm type definitions](https://img.shields.io/npm/types/baldrick-doc-ts)

![node-current](https://img.shields.io/node/v/baldrick-doc-ts)

![NPM](https://img.shields.io/npm/l/baldrick-doc-ts)

> Document generator for typescript projects

The main motivation is to streamline the generation of documentation for node.js libraries written in Typescript:

-   It relies on [typedoc](https://typedoc.org/s) under the hood.
-   It can be run directly using `npx`.
-   It generate the documentation as **markdown**. This provides a more basic documentation that the default `typedoc` but does not generate any html or css that would become part of the source code, and may raise some warnings with many linters.
-   It is part of the `baldrick` suite of tools, and is optimized to work alongside these.

## Usage

Generate typedoc documentation

`npx baldrick-doc-ts typedoc [options]`

Typical use:

`npx typedoc --json doc.json --pretty src/index.ts && npx baldrick-doc-ts typedoc --json-source doc.json`

It is recommended to add it a script in your `package.json`

### Options

|     | Long flag                      | Description                                                               |
| --- | ------------------------------ | ------------------------------------------------------------------------- |
| -f  | --feature [feature...]         | List of features (choices: "md", default: ["md"])                         |
| -s  | --json-source [jsonSource]     | Typedoc json filename (default: "doc.json")                               |
| -db | --doc-base [docBase]           | Specify the base name for documentation (doc/api) (default: "")           |
| -sd | --src-directory [srcDirectory] | Directory of the source code that will be used for links (default: "src") |
| -h  | --help                         | display help for command                                                  |

## Documentation and links

-   [Code Maintenance](MAINTENANCE.md)
-   [Code Of Conduct](CODE_OF_CONDUCT.md)
-   [Contributing](CONTRIBUTING.md)
-   [Contributors](https://github.com/flarebyte/baldrick-doc-ts/graphs/contributors)
-   [Dependencies](https://github.com/flarebyte/baldrick-doc-ts/network/dependencies)

## Installation

This package is [ESM only][esm].

    yarn global add baldrick-doc-ts
    baldrick-doc-ts --help

Or alternatively run it:

    npx baldrick-doc-ts --help
