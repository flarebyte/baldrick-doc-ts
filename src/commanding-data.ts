import {
	type CmdOption,
	type CmdOptionsGeneratorTypedoc,
	type CmdOptionsParser,
} from './model.js';

const feature: CmdOption = {
	shortFlag: 'f',
	longFlag: 'feature',
	description: 'List of features',
	choices: ['md'],
	mandatory: false,
	variadic: true,
	defaultValue: ['md'],
};

const jsonSource: CmdOption = {
	shortFlag: 's',
	longFlag: 'json-source',
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
	defaultValue: '',
	choices: [],
	mandatory: false,
	variadic: false,
};
const srcDirectory: CmdOption = {
	shortFlag: 'sd',
	longFlag: 'src-directory',
	description: 'Directory of the source code that will be used for links',
	choices: [],
	mandatory: true,
	variadic: false,
	defaultValue: 'src',
};

export const cmdOptionsGenerator: CmdOptionsGeneratorTypedoc = {
	feature,
	jsonSource,
	docBase,
	srcDirectory,
};

const featureParser: CmdOption = {
	shortFlag: 'f',
	longFlag: 'feature',
	description: 'List of features',
	choices: ['internal', 'functions-csv', 'ngram'],
	mandatory: false,
	variadic: true,
	defaultValue: ['internal', 'ngram'],
};

export const cmdOptionsParser: CmdOptionsParser = {
	feature: featureParser,
	docBase,
	srcDirectory,
};
