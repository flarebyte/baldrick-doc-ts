# baldrick-doc-ts

![npm](https://img.shields.io/npm/v/baldrick-doc-ts) ![Build status](https://github.com/flarebyte/baldrick-doc-ts/actions/workflows/main.yml/badge.svg) ![npm bundle size](https://img.shields.io/bundlephobia/min/baldrick-doc-ts)

![npm type definitions](https://img.shields.io/npm/types/baldrick-doc-ts) ![node-current](https://img.shields.io/node/v/baldrick-doc-ts) ![NPM](https://img.shields.io/npm/l/baldrick-doc-ts)

![Experimental](https://img.shields.io/badge/status-experimental-blue)

> Documentation generator for typescript projects

Generation of documentation for node.js libraries written in Typescript

![Hero image for baldrick-doc-ts](baldrick-doc-ts-hero-512.jpeg)

Highlights:

* Generate helpful documentation for a typescript project.
* Produce a [markdown file](INTERNAL.md) with an UML diagram in Mermaid of all the dependencies and the relationships between them.
* Generate API documentation as **markdown**. This provides a more
basic documentation that the default `typedoc` but does not generate
any html or css that would become part of the source code, and may
raise some warnings with many linters.

* Generate a markdown file with the [common vocabulary](CODE_VOCABULARY.md) used in the function names.
* Generate a [CSV](internal_functions.csv) with the list of typescript functions from the code base.



A few examples of commands:

Generate markdown document describing the api of the library:
```bash
npx baldrick-doc-ts@latest typedoc --json-source pest-spec/fixture/typedoc.json

```
Generate CODE_VOCABULARY.md with ngram of the code base vocabulary:
```bash
npx baldrick-doc-ts@latest parse --feature ngram

```
Generate INTERNAL.md with UML diagram in Mermaid of the dependencies:
```bash
npx baldrick-doc-ts@latest parse --feature internal

```
Generate internal_functions.csv with all the typescript functions:
```bash
npx baldrick-doc-ts@latest parse --feature functions-csv

```

## Documentation and links

* [Code Maintenance](MAINTENANCE.md)
* [Code Of Conduct](CODE_OF_CONDUCT.md)
* [Api for baldrick-doc-ts](API.md)
* [Contributing](CONTRIBUTING.md)
* [Glossary](GLOSSARY.md)
* [Diagram for the code base](INTERNAL.md)
* [Vocabulary used in the code base](CODE_VOCABULARY.md)
* [Architectural Decision Records](DECISIONS.md)
* [Contributors](https://github.com/flarebyte/baldrick-doc-ts/graphs/contributors)
* [Dependencies](https://github.com/flarebyte/baldrick-doc-ts/network/dependencies)
* [Usage](USAGE.md)

## Related

* [baldrick-zest-engine](https://github.com/flarebyte/baldrick-zest-engine) Run tests declaratively with a few cunning plans

## Installation

This package is [ESM only](https://blog.sindresorhus.com/get-ready-for-esm-aa53530b3f77).

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
