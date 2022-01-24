import { writeFile, mkdir } from 'node:fs/promises';
import { toMarkdownInternal } from './markdown-internal.js';
import { ParseActionOpts, RunnerContext } from './model.js';
import { createProject, parseProject } from './ts-parser.js';

const createDocDir = async (opts: ParseActionOpts) => {
  await (opts.docDirectory.length === 0 || opts.docDirectory === '.'
    ? Promise.resolve('no directory')
    : mkdir(opts.docDirectory, { recursive: true }));
};

const generateInternalMd = async (opts: ParseActionOpts) => {
  const filename =
    opts.docBase.length > 0 ? `${opts.docBase}_INTERNAL.md` : 'INTERNAL.md';
  const project = createProject();
  project.addSourceFilesAtPaths('src/**/*{.d.ts,.ts}');
  const moduleInfo = parseProject(opts.packageName, project);
  const content = toMarkdownInternal(moduleInfo);
  await writeFile(filename, content, 'utf8');
};

export const parseAction = async (
  ctx: RunnerContext,
  opts: ParseActionOpts
) => {
  try {
    await createDocDir(opts);
    await generateInternalMd(opts);
  } catch (error) {
    ctx.errTermFormatter({
      title: 'Parsing - parse error',
      detail: error,
    });
    throw error;
  }
};
