import { writeFile, mkdir } from 'node:fs/promises';
import { toMarkdownInternal } from './markdown-internal.js';
import { toMarkdownVocabulary } from './markdown-vocabulary.js';
import { ParseActionOpts, RunnerContext } from './model.js';
import { createProject, parseProject } from './ts-parser.js';

const createDocDir = async (opts: ParseActionOpts) => {
  await (opts.docDirectory.length === 0 || opts.docDirectory === '.'
    ? Promise.resolve('no directory')
    : mkdir(opts.docDirectory, { recursive: true }));
};

const generateMarkdowns = async (opts: ParseActionOpts) => {
  const internalFilename =
    opts.docBase.length > 0 ? `${opts.docBase}_INTERNAL.md` : 'INTERNAL.md';
  const vocabularyFilename =
    opts.docBase.length > 0
      ? `${opts.docBase}_CODE_VOCABULARY.md`
      : 'CODE_VOCABULARY.md';
  const project = createProject();
  project.addSourceFilesAtPaths('src/**/*{.d.ts,.ts}');
  const moduleInfo = parseProject(opts.packageName, project);
  const internalContent = toMarkdownInternal(moduleInfo);
  if (opts.feature.includes('internal')) {
    await writeFile(internalFilename, internalContent, 'utf8');
  }
  const vocabularyContent = toMarkdownVocabulary(moduleInfo);
  if (opts.feature.includes('ngram')) {
    await writeFile(vocabularyFilename, vocabularyContent, 'utf8');
  }
};

export const parseAction = async (
  ctx: RunnerContext,
  opts: ParseActionOpts
) => {
  try {
    await createDocDir(opts);
    await generateMarkdowns(opts);
  } catch (error) {
    ctx.errTermFormatter({
      title: 'Parsing - parse error',
      detail: error,
    });
    throw error;
  }
};
