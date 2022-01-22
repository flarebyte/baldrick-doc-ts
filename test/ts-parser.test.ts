import { parseTsContent } from '../src/ts-parser';

const someImports = `
import { Command } from 'commander';
import nodeFs from 'fs';
import { commanding } from './index.js';
import {
    GenerateTypedocAction,
    GenerateTypedocActionOpts,
    ParseAction,
    ParseActionOpts,
    RunnerContext,
  } from './model.js';

`;

describe('ts-parser', () => {
  it('parse imports', () => {
    const actual = parseTsContent('./source.ts', someImports);
    expect(actual).toMatchInlineSnapshot(`
      Object {
        "functions": Array [],
        "imports": Array [
          Object {
            "from": "commander",
            "identifier": "Command",
            "source": "./source.ts",
          },
          Object {
            "from": "fs",
            "identifier": "nodeFs",
            "source": "./source.ts",
          },
          Object {
            "from": "./index.js",
            "identifier": "commanding",
            "source": "./source.ts",
          },
          Object {
            "from": "./model.js",
            "identifier": "GenerateTypedocAction",
            "source": "./source.ts",
          },
          Object {
            "from": "./model.js",
            "identifier": "GenerateTypedocActionOpts",
            "source": "./source.ts",
          },
          Object {
            "from": "./model.js",
            "identifier": "ParseAction",
            "source": "./source.ts",
          },
          Object {
            "from": "./model.js",
            "identifier": "ParseActionOpts",
            "source": "./source.ts",
          },
          Object {
            "from": "./model.js",
            "identifier": "RunnerContext",
            "source": "./source.ts",
          },
        ],
      }
    `);
  });
});
