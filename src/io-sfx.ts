import { readFile, writeFile, mkdir } from 'fs/promises';
import { toReadmeMd } from './markdown-readme.js';
import {
  GenerateTypedocActionOpts,
  RunnerContext,
} from './model.js';

const readTypedocJson = async (): Promise<TypedocJson> => {
    const content = await readFile('./doc.json', 'utf8');
    return JSON.parse(content);
};

const readReadme = async (): Promise<string> => {
  try {
    return await readFile('./README.md', 'utf8');
  } catch (err) {
    return Promise.resolve('');
  }
};

const writeReadme = async (core: GenerateTypedocActionOpts) => {
  const existingReadme = await readReadme();
  const newReadme = toReadmeMd(core, existingReadme);
  await writeFile('./README.md', newReadme, 'utf8');
};

const writeApiMd = async (opts: GenerateTypedocActionOpts) => {
  await writeFile('./api.md', 'not yet', 'utf8');
};


const createDocDir = async () => {
  await mkdir('doc', { recursive: true });
};

export const updateAll = async (
  ctx: RunnerContext,
  opts: GenerateTypedocActionOpts
) => {
  try {
    await writeReadme(opts);
    await createDocDir();
    await writeApiMd(opts);
  } catch (err) {
    ctx.errTermFormatter({
      title: 'Generating typedoc- update error',
      detail: err,
    });
    throw err;
  }
};