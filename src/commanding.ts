import { Command } from 'commander';
import { cmdOptionsGenerator } from './commanding-data.js';
import { splitDocBase, toCommanderOption } from './commanding-helper.js';
import { toFeatures } from './feature-helper.js';
import {
  GenerateTypedocAction,
  GenerateTypedocActionOpts,
  GenerateTypedocRawOpts,
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
      .command('generate')
      .description('Generate and standardize the source code files')
      .addOption(toCommanderOption(cmdOptionsGenerator.feature))
      .addOption(toCommanderOption(cmdOptionsGenerator.jsonSource))
      .addOption(toCommanderOption(cmdOptionsGenerator.docBase))
     
      .action(async (options: GenerateTypedocRawOpts) => {
        const {
          feature,
          jsonSource,
          docBase,
        } = options;
        const generateTypedocOpts: GenerateTypedocActionOpts = {
          feature: toFeatures(feature),
          jsonSource,
          docBase,
          ...splitDocBase(docBase)
        };
        const ctx: RunnerContext = {
          currentPath: process.cwd(),
          termFormatter: basicFormatter,
          errTermFormatter: errorFormatter,
        };
        await genAction(ctx, generateTypedocOpts);
      });
  }

  async parseAsync(argv: string[]) {
    return await this._program.parseAsync(argv, { from: 'node' });
  }

  async parseAsyncArgv() {
    return await this.parseAsync(process.argv);
  }
}