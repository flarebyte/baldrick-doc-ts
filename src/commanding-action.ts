import { updateAll } from './io-sfx.js';
import { GenerateTypedocAction, GenerateTypedocActionOpts, RunnerContext } from './model.js';

export const cmdGenerateTypedocAction: GenerateTypedocAction = async (
  ctx: RunnerContext,
  options: GenerateTypedocActionOpts
) => {
  await updateAll(ctx, options);
  ctx.termFormatter({
    title: 'Generated typedoc documentation',
    detail: [
      'Check stuff',
    ].join('\n'),
    kind: 'info',
    format: 'default',
  });
};