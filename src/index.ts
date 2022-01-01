import { cmdGenerateTypedocAction } from './commanding-action.js';
import { Commanding } from './commanding.js';

const commanding = new Commanding();

commanding.declareGenerateAction(cmdGenerateTypedocAction);

export { commanding };
