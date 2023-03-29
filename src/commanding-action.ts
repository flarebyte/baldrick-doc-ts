import {updateAll} from './io-sfx.js';
import {
	type GenerateTypedocAction,
	type GenerateTypedocActionOpts,
	type ParseAction,
	type ParseActionOpts,
	type RunnerContext,
} from './model.js';
import {parseAction} from './parse-action.js';

export const cmdGenerateTypedocAction: GenerateTypedocAction = async (
	ctx: RunnerContext,
	options: GenerateTypedocActionOpts,
) => {
	await updateAll(ctx, options);
	ctx.termFormatter({
		title: 'Generated typedoc documentation',
		detail: ['Check the generated API.md'].join('\n'),
		kind: 'info',
		format: 'default',
	});
};

export const cmdParseAction: ParseAction = async (
	ctx: RunnerContext,
	options: ParseActionOpts,
) => {
	await parseAction(ctx, options);
	ctx.termFormatter({
		title: 'Parse typescript for documentation',
		detail: ['Check the generated INTERNAL.md'].join('\n'),
		kind: 'info',
		format: 'default',
	});
};
