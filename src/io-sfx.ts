import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { toTypedocApiMd } from './markdown-api.js';
import { GenerateTypedocActionOpts, RunnerContext } from './model.js';
import { TypedocJson } from './typedoc-json-model.js';

const readTypedocJson = async (
  opts: GenerateTypedocActionOpts
): Promise<TypedocJson> => {
  const content = await readFile(opts.jsonSource, 'utf8');
  return JSON.parse(content);
};

const writeApiMd = async (
  opts: GenerateTypedocActionOpts,
  typedocJson: TypedocJson
) => {
  const content = toTypedocApiMd(opts, typedocJson);
  const filename =
    opts.docBase.length > 0 ? `${opts.docBase}_API.md` : 'API.md';
  await writeFile(filename, content, 'utf8');
};

const createDocDir = async (opts: GenerateTypedocActionOpts) => {
  await (opts.docDirectory.length === 0 || opts.docDirectory === '.'
    ? Promise.resolve('no directory')
    : mkdir(opts.docDirectory, { recursive: true }));
};

export const updateAll = async (
  ctx: RunnerContext,
  opts: GenerateTypedocActionOpts
) => {
  try {
    const typedocJson = await readTypedocJson(opts);
    await createDocDir(opts);
    await writeApiMd(opts, typedocJson);
  } catch (error) {
    ctx.errTermFormatter({
      title: 'Generating typedoc - update error',
      detail: error,
    });
    throw error;
  }
};
