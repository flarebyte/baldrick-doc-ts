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

const funcExpression = `
/**
 * Detect:
 * - an url
 * - starting with http or https
 * @category String abstractor
 * @param value the text to check
 * @returns the url keyword or false
 */
 export const someUrl = (value: string) =>
  value.startsWith('http://') || value.startsWith('https://') ? 'url' : false;
`;

const varExpression = `

 export const someList = [1, 2, 3]
`;

const someInterface = `
export interface CmdOptionsParser {
  feature: CmdOption;
  docBase: CmdOption;
  srcDirectory: CmdOption;
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
        "filename": "source.ts",
        "functions": Array [],
        "imports": Array [
          Object {
            "from": "commander",
            "identifier": "Command",
          },
          Object {
            "from": "fs",
            "identifier": "nodeFs",
          },
          Object {
            "from": "./index.js",
            "identifier": "commanding",
          },
          Object {
            "from": "./model.js",
            "identifier": "GenerateTypedocAction",
          },
          Object {
            "from": "./model.js",
            "identifier": "GenerateTypedocActionOpts",
          },
          Object {
            "from": "./model.js",
            "identifier": "ParseAction",
          },
          Object {
            "from": "./model.js",
            "identifier": "ParseActionOpts",
          },
          Object {
            "from": "./model.js",
            "identifier": "RunnerContext",
          },
        ],
        "interfaces": Array [],
      }
    `);
  });

  it('parse functions', () => {
    const project = createProject();
    project.createSourceFile('./source.ts', funcOneParamWithComment);
    const firstSource = project.getSourceFiles()[0];
    const actual = firstSource ? parseTsContent(firstSource) : 'no-source-file';
    expect(actual).toMatchInlineSnapshot(`
      Object {
        "filename": "source.ts",
        "functions": Array [
          Object {
            "bodyWidth": 128,
            "descendantCount": 24,
            "description": "Detect an url",
            "exported": true,
            "expression": false,
            "identifier": "someUrl",
            "keywords": Array [
              "BarBarToken",
              "BinaryExpression",
              "Block",
              "CallExpression",
              "ColonToken",
              "ConditionalExpression",
              "ExportKeyword",
              "FalseKeyword",
              "Identifier",
              "Parameter",
              "PropertyAccessExpression",
              "QuestionToken",
              "ReturnStatement",
              "StringKeyword",
              "StringLiteral",
            ],
          },
        ],
        "imports": Array [],
        "interfaces": Array [],
      }
    `);
  });
  it('parse function expressions', () => {
    const project = createProject();
    project.createSourceFile('./source.ts', funcExpression);
    const firstSource = project.getSourceFiles()[0];
    const actual = firstSource ? parseTsContent(firstSource) : 'no-source-file';
    expect(actual).toMatchInlineSnapshot(`
      Object {
        "filename": "source.ts",
        "functions": Array [
          Object {
            "bodyWidth": 106,
            "descendantCount": 23,
            "description": "",
            "exported": true,
            "expression": true,
            "identifier": "someUrl",
            "keywords": Array [
              "ArrowFunction",
              "BarBarToken",
              "BinaryExpression",
              "CallExpression",
              "ColonToken",
              "ConditionalExpression",
              "EqualsGreaterThanToken",
              "FalseKeyword",
              "Identifier",
              "Parameter",
              "PropertyAccessExpression",
              "QuestionToken",
              "StringKeyword",
              "StringLiteral",
            ],
          },
        ],
        "imports": Array [],
        "interfaces": Array [],
      }
    `);
  });
  it('ignore not function expressions', () => {
    const project = createProject();
    project.createSourceFile('./source.ts', varExpression);
    const firstSource = project.getSourceFiles()[0];
    const actual = firstSource ? parseTsContent(firstSource) : 'no-source-file';
    expect(actual).toMatchInlineSnapshot(`
      Object {
        "filename": "source.ts",
        "functions": Array [],
        "imports": Array [],
        "interfaces": Array [],
      }
    `);
  });
  it('parse interfaces', () => {
    const project = createProject();
    project.createSourceFile('./source.ts', someInterface);
    const firstSource = project.getSourceFiles()[0];
    const actual = firstSource ? parseTsContent(firstSource) : 'no-source-file';
    expect(actual).toMatchInlineSnapshot(`
      Object {
        "filename": "source.ts",
        "functions": Array [],
        "imports": Array [],
        "interfaces": Array [
          Object {
            "exported": true,
            "identifier": "CmdOptionsParser",
          },
        ],
      }
    `);
  });
});
