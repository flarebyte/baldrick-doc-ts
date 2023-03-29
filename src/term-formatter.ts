import {
	type ErrTermFormatterParams,
	type TermFormatterFormat,
	type TermFormatterParams,
} from './model.js';

const simplifyObject = (object: Record<string, unknown>): Record<string, unknown> => {
	const values = Object.entries(object);
	const relevantValues = values.filter(
		keyObject => !['[]', '', 'null'].includes(`${keyObject[1]}`),
	);
	return Object.fromEntries(relevantValues);
};

const simplifyJson = (value: string): string => value.replace(/["']/g, ' ');

const toJsonish = (format: TermFormatterFormat, value: Record<string, unknown>): string =>
	format === 'human'
		? simplifyJson(JSON.stringify(simplifyObject(value)))
		: JSON.stringify(value);

export const basicFormatter = (parameters: TermFormatterParams) => {
	const detail
    = typeof parameters.detail === 'string'
    	? parameters.detail
    	: toJsonish(parameters.format, parameters.detail);

	console.info(` ★ ${parameters.title} ⇨`, detail);
};

export const errorFormatter = (parameters: ErrTermFormatterParams) => {
	console.error(` ★ ${parameters.title} ⇨`, parameters.detail);
};
