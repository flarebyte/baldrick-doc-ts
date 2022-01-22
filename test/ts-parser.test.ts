import { parseTsContent } from '../src/ts-parser';

const someImports = `
import { Command } from 'commander';
import fs from 'fs';
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
    const actual = parseTsContent('./source.js',someImports);
    expect(actual).toMatchInlineSnapshot(`
      Object {
        "functions": Array [],
        "imports": Array [],
      }
    `);
  });
});
