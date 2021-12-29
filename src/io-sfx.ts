import { readFile, writeFile, mkdir } from 'fs/promises';
import { toTypedocApiMd } from './markdown-api.js';
import { toReadmeMd } from './markdown-readme.js';
import { GenerateTypedocActionOpts, RunnerContext } from './model.js';
import { TypedocJson } from './typedoc-json-model.js';

const readTypedocJson = async (
  opts: GenerateTypedocActionOpts
): Promise<TypedocJson> => {
  const content = await readFile(opts.jsonSource, 'utf8');
  return JSON.parse(content);
};

const readReadme = async (): Promise<string> => {
  try {
    return await readFile('./README.md', 'utf8');
  } catch (err) {
    return Promise.resolve('');
  }
};

const writeReadme = async (typedocJson: TypedocJson) => {
  const existingReadme = await readReadme();
  const newReadme = toReadmeMd(existingReadme, typedocJson);
  await writeFile('./README.md', newReadme, 'utf8');
};

const writeApiMd = async (
  opts: GenerateTypedocActionOpts,
  typedocJson: TypedocJson
) => {
  const content = toTypedocApiMd(typedocJson);
  const filename =
    opts.docBase.length > 0 ? `${opts.docBase}-api.md` : 'api.md';
  await writeFile(filename, content, 'utf8');
};

const createDocDir = async (opts: GenerateTypedocActionOpts) => {
  if (opts.docDirectory.length === 0 || opts.docDirectory === '.') {
    await Promise.resolve('no directory');
  } else {
    await mkdir(opts.docDirectory, { recursive: true });
  }
};

export const updateAll = async (
  ctx: RunnerContext,
  opts: GenerateTypedocActionOpts
) => {
  try {
    const typedocJson = await readTypedocJson(opts);
    if (opts.feature.length > 10) {
      await writeReadme(typedocJson);
    }
    await createDocDir(opts);
    await writeApiMd(opts, typedocJson);
  } catch (err) {
    ctx.errTermFormatter({
      title: 'Generating typedoc- update error',
      detail: err,
    });
    throw err;
  }
};
