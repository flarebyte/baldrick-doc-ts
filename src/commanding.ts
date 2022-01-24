import { Command } from 'commander';
import { cmdOptionsGenerator, cmdOptionsParser } from './commanding-data.js';
import { splitDocBase, toCommanderOption } from './commanding-helper.js';
import { getPackageName } from './env-helper.js';
import { toFeatures } from './feature-helper.js';
import {
  GenerateTypedocAction,
  GenerateTypedocActionOpts,
  GenerateTypedocRawOpts,
  ParseAction,
  ParseActionOpts,
  ParseRawOpts,
  RunnerContext,
} from './model.js';
import { basicFormatter, errorFormatter } from './term-formatter.js';
import { version } from './version.js';

export class Commanding {
  _program: Command = new Command();
  constructor() {
    this._program.version(version);
  }

  declareGenerateAction(genAction: GenerateTypedocAction) {
    this._program
      .command('typedoc')
      .description('Generate typedoc documentation')
      .addOption(toCommanderOption(cmdOptionsGenerator.feature))
      .addOption(toCommanderOption(cmdOptionsGenerator.jsonSource))
      .addOption(toCommanderOption(cmdOptionsGenerator.docBase))
      .addOption(toCommanderOption(cmdOptionsGenerator.srcDirectory))

      .action(async (options: GenerateTypedocRawOpts) => {
        const { feature, jsonSource, docBase, srcDirectory } = options;
        const generateTypedocOpts: GenerateTypedocActionOpts = {
          feature: toFeatures(feature),
          jsonSource,
          docBase,
          ...splitDocBase(docBase),
          homepage: process.env['npm_package_homepage'],
          srcDirectory,
        };
        const ctx: RunnerContext = {
          currentPath: process.cwd(),
          termFormatter: basicFormatter,
          errTermFormatter: errorFormatter,
        };
        await genAction(ctx, generateTypedocOpts);
      });
  }

  declareParseAction(parseAction: ParseAction) {
    this._program
      .command('parse')
      .description('Parse typescript and extract documentation')
      .addOption(toCommanderOption(cmdOptionsParser.feature))
      .addOption(toCommanderOption(cmdOptionsParser.docBase))
      .addOption(toCommanderOption(cmdOptionsParser.srcDirectory))

      .action(async (options: ParseRawOpts) => {
        const { feature, docBase, srcDirectory } = options;
        const parseOpts: ParseActionOpts = {
          feature: toFeatures(feature),
          docBase,
          ...splitDocBase(docBase),
          srcDirectory,
          packageName: getPackageName(),
        };
        const ctx: RunnerContext = {
          currentPath: process.cwd(),
          termFormatter: basicFormatter,
          errTermFormatter: errorFormatter,
        };
        await parseAction(ctx, parseOpts);
      });
  }

  async parseAsync(argv: string[]) {
    return await this._program.parseAsync(argv, { from: 'node' });
  }

  async parseAsyncArgv() {
    return await this.parseAsync(process.argv);
  }
}
