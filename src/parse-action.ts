import {writeFile, mkdir} from 'node:fs/promises';
import {toMarkdownInternal} from './markdown-internal.js';
import {toMarkdownVocabulary} from './markdown-vocabulary.js';
import {type ParseActionOpts, type RunnerContext} from './model.js';
import {createProject, parseProject} from './ts-parser.js';
import { toCsvFonctions } from './csv-internal.js';

const createDocDir = async (options: ParseActionOpts) => {
	await (options.docDirectory.length === 0 || options.docDirectory === '.'
		? Promise.resolve('no directory')
		: mkdir(options.docDirectory, {recursive: true}));
};

const generateMarkdowns = async (options: ParseActionOpts) => {
	const internalFilename
    = options.docBase.length > 0 ? `${options.docBase}_INTERNAL.md` : 'INTERNAL.md';
	const internalCsvFilename
    = options.docBase.length > 0 ? `${options.docBase}_internal_functions.csv` : 'internal_functions.csv';
	const vocabularyFilename
    = options.docBase.length > 0
    	? `${options.docBase}_CODE_VOCABULARY.md`
    	: 'CODE_VOCABULARY.md';
	const project = createProject();
	project.addSourceFilesAtPaths('src/**/*{.d.ts,.ts}');
	const moduleInfo = parseProject(options.packageName, project);
	const internalContent = toMarkdownInternal(moduleInfo);
	const csvInternalContent = toCsvFonctions(moduleInfo);
	if (options.feature.includes('internal')) {
		await writeFile(internalFilename, internalContent, 'utf8');
	}

	if (options.feature.includes('functions-csv')) {
		await writeFile(internalCsvFilename, csvInternalContent, 'utf8');
	}

	const vocabularyContent = toMarkdownVocabulary(moduleInfo);
	if (options.feature.includes('ngram')) {
		await writeFile(vocabularyFilename, vocabularyContent, 'utf8');
	}
};

export const parseAction = async (
	ctx: RunnerContext,
	options: ParseActionOpts,
) => {
	try {
		await createDocDir(options);
		await generateMarkdowns(options);
	} catch (error) {
		ctx.errTermFormatter({
			title: 'Parsing - parse error',
			detail: error,
		});
		throw error;
	}
};
