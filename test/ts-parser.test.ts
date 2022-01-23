import { createProject, parseTsContent } from '../src/ts-parser';

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

const funcOneParamWithComment = `
/**
 * Detect an url
 * @category String abstractor
 * @param value the text to check
 * @returns the url keyword or false
 */
export function someUrl(value: string) {
  return value.startsWith('http://') || value.startsWith('https://') ? 'url' : false;
}

`;

describe('ts-parser', () => {
  it('parse imports', () => {
    const project = createProject();
    project.createSourceFile('./source.ts', someImports);
    const firstSource = project.getSourceFiles()[0];
    const actual = firstSource ? parseTsContent(firstSource) : 'no-source-file';
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

  it.only('parse functions', () => {
    const project = createProject();
    project.createSourceFile('./source.ts', funcOneParamWithComment);
    const firstSource = project.getSourceFiles()[0];
    const actual = firstSource ? parseTsContent(firstSource) : 'no-source-file';
    expect(actual).toMatchInlineSnapshot(`
    `);
  });
});
