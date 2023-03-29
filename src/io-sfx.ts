import {readFile, writeFile, mkdir} from 'node:fs/promises';
import {toTypedocApiMd} from './markdown-api.js';
import {type GenerateTypedocActionOpts, type RunnerContext} from './model.js';
import {type TypedocJson} from './typedoc-json-model.js';

const readTypedocJson = async (
	options: GenerateTypedocActionOpts,
): Promise<TypedocJson> => {
	const content = await readFile(options.jsonSource, 'utf8');
	return JSON.parse(content);
};

const writeApiMd = async (
	options: GenerateTypedocActionOpts,
	typedocJson: TypedocJson,
) => {
	const content = toTypedocApiMd(options, typedocJson);
	const filename
    = options.docBase.length > 0 ? `${options.docBase}_API.md` : 'API.md';
	await writeFile(filename, content, 'utf8');
};

const createDocDir = async (options: GenerateTypedocActionOpts) => {
	await (options.docDirectory.length === 0 || options.docDirectory === '.'
		? Promise.resolve('no directory')
		: mkdir(options.docDirectory, {recursive: true}));
};

export const updateAll = async (
	ctx: RunnerContext,
	options: GenerateTypedocActionOpts,
) => {
	try {
		const typedocJson = await readTypedocJson(options);
		await createDocDir(options);
		await writeApiMd(options, typedocJson);
	} catch (error) {
		ctx.errTermFormatter({
			title: 'Generating typedoc - update error',
			detail: error,
		});
		throw error;
	}
};
