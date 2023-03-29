import {
	cmdGenerateTypedocAction,
	cmdParseAction,
} from './commanding-action.js';
import {Commanding} from './commanding.js';

const commanding = new Commanding();

commanding.declareGenerateAction(cmdGenerateTypedocAction);
commanding.declareParseAction(cmdParseAction);

export {commanding};
