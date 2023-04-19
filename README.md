# baldrick-doc-ts

![npm](https://img.shields.io/npm/v/baldrick-doc-ts) ![Build
status](https://github.com/flarebyte/baldrick-doc-ts/actions/workflows/main.yml/badge.svg)
![npm bundle size](https://img.shields.io/bundlephobia/min/baldrick-doc-ts)

![npm type definitions](https://img.shields.io/npm/types/baldrick-doc-ts)
![node-current](https://img.shields.io/node/v/baldrick-doc-ts)
![NPM](https://img.shields.io/npm/l/baldrick-doc-ts)

![Experimental](https://img.shields.io/badge/status-experimental-blue)

> Documentation generator for typescript projects

Generation of documentation for node.js libraries written in Typescript

Highlights:

-   Written in `Typescript`

-   It relies on [typedoc](https://typedoc.org/s) under the hood.

-   It can be run directly using `npx`.

-   It generate the documentation as **markdown**. This provides a more
    basic documentation that the default `typedoc` but does not generate
    any html or css that would become part of the source code, and may
    raise some warnings with many linters.

-   It is part of the `baldrick` suite of tools, and is optimized to work
    alongside these.

## Documentation and links

-   [Code Maintenance](MAINTENANCE.md)
-   [Code Of Conduct](CODE_OF_CONDUCT.md)
-   [Api for baldrick-doc-ts](API.md)
-   [Contributing](CONTRIBUTING.md)
-   [Glossary](GLOSSARY.md)
-   [Diagram for the code base](INTERNAL.md)
-   [Vocabulary used in the code base](CODE_VOCABULARY.md)
-   [Architectural Decision Records](DECISIONS.md)
-   [Contributors](https://github.com/flarebyte/baldrick-doc-ts/graphs/contributors)
-   [Dependencies](https://github.com/flarebyte/baldrick-doc-ts/network/dependencies)
-   [Usage](USAGE.md)

## Related

-   [baldrick-zest-engine](https://github.com/flarebyte/baldrick-zest-engine)
    Run tests declaratively with a few cunning plans

## Installation

This package is [ESM
only](https://blog.sindresorhus.com/get-ready-for-esm-aa53530b3f77).

```bash
yarn global add baldrick-doc-ts
baldrick-doc-ts --help
```

Or alternatively run it:

```bash
npx baldrick-doc-ts --help
```

If you want to tun the latest version from github. Mostly useful for dev:

```bash
git clone git@github.com:flarebyte/baldrick-doc-ts.git
yarn global add `pwd`
```
