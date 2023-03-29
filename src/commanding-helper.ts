import path from 'node:path';
import {Option} from 'commander';
import {type CmdOption} from './model.js';

const capitalize = (value: string): string =>
	value.length > 0 ? (value[0] || '').toUpperCase() + value.slice(1) : '';

const decapitalize = (value: string): string =>
	value.length > 0 ? (value[0] || '').toLowerCase() + value.slice(1) : '';

export const toCamelCase = (longFlag: string): string =>
	decapitalize(longFlag.split('-').map(capitalize).join(''));

export const toCommanderOption = (option: CmdOption): Option => {
	const dot3 = option.variadic ? '...' : '';
	const flags = `-${option.shortFlag}, --${option.longFlag} [${toCamelCase(
		option.longFlag,
	)}${dot3}]`;
	const options = new Option(flags, option.description);
	options.defaultValue = option.defaultValue;
	if (option.choices.length > 0) {
		options.choices(option.choices);
	}

	options.mandatory = option.mandatory;
	return options;
};

export const splitDocBase = (
	base: string,
): {docDirectory: string; docPrefix: string} =>
	base === ''
		? {docDirectory: '', docPrefix: ''}
		: {
			docDirectory: path.dirname(base),
			docPrefix: path.basename(base),
		};
