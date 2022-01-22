import { ParseActionOpts, RunnerContext } from './model';

export const parseAction = async (
  ctx: RunnerContext,
  opts: ParseActionOpts
) => {
  try {
    await createDocDir(opts);
  } catch (error) {
    ctx.errTermFormatter({
      title: 'Parsing - parse error',
      detail: error,
    });
    throw error;
  }
};

function createDocDir(opts: ParseActionOpts) {
  throw new Error('Function not implemented.' + opts);
}
