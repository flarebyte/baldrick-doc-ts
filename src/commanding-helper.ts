import path from 'path';
import { Option } from 'commander';
import { CmdOption } from './model.js';

const capitalize = (value: string): string =>
  value.length > 0 ? (value[0] || '').toUpperCase() + value.substring(1) : '';

const decapitalize = (value: string): string =>
  value.length > 0 ? (value[0] || '').toLowerCase() + value.substring(1) : '';

export const toCamelCase = (longFlag: string): string =>
  decapitalize(longFlag.split('-').map(capitalize).join(''));

export const toCommanderOption = (option: CmdOption): Option => {
  const dot3 = option.variadic ? '...' : '';
  const flags = `-${option.shortFlag}, --${option.longFlag} [${toCamelCase(
    option.longFlag
  )}${dot3}]`;
  const opts = new Option(flags, option.description);
  opts.defaultValue = option.defaultValue;
  if (option.choices.length > 0) {
    opts.choices(option.choices);
  }
  opts.mandatory = option.mandatory;
  return opts;
};

export const splitDocBase = (
  base: string
): { docDirectory: string; docPrefix: string } => ({
  docDirectory: path.dirname(base),
  docPrefix: path.basename(base),
});
