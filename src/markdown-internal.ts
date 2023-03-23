import {
	toFunctionalProgrammingDiagram,
	toFunctionalProgrammingMermaid,
} from './fp-diagram.js';
import {markdownToString} from './markdown.js';
import {type MdDocument, type MdSection} from './model.js';
import {type ModuleInfo} from './parser-model.js';

export const toMarkdownInternal = (module: ModuleInfo): string => {
	const fpDiagram = toFunctionalProgrammingDiagram(module);
	const mermaidDiagram = toFunctionalProgrammingMermaid(fpDiagram);
	const bq3 = '```';
	const fpDiagramSection: MdSection = {
		title: 'Diagram of the dependencies',
		body: [`${bq3}mermaid`, mermaidDiagram, bq3].join('\n'),
	};
	const doc: MdDocument = {
		title: 'Internal',
		description: `Overview of the code base of ${module.name}`,
		mainSection:
      'This document has been generated automatically by [baldrick-doc-ts](https://github.com/flarebyte/baldrick-doc-ts)',
		sections: [fpDiagramSection],
	};
	return markdownToString(doc);
};
