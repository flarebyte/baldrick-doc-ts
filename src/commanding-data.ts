import { CmdOption, CmdOptionsGeneratorTypedoc } from './model.js';

const feature: CmdOption = {
  shortFlag: 'f',
  longFlag: 'feature',
  description: 'List of features',
  choices: ['md'],
  mandatory: false,
  variadic: true,
};

const jsonSource: CmdOption = {
  shortFlag: 's',
  longFlag: 'source',
  description: 'Typedoc json filename',
  defaultValue: 'doc.json',
  choices: [],
  mandatory: false,
  variadic: false,
};
const docBase: CmdOption = {
  shortFlag: 'db',
  longFlag: 'doc-base',
  description: 'Specify the base name for documentation (doc/api)',
  defaultValue: 'api',
  choices: [],
  mandatory: false,
  variadic: false,
};

export const cmdOptionsGenerator: CmdOptionsGeneratorTypedoc = {
  feature,
  jsonSource,
  docBase
};