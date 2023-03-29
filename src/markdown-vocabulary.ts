import {markdownTable} from 'markdown-table';
import {
	toProjectVocabulary,
	toProjectVocabularyRank,
} from './fp-vocabulary.js';
import {markdownToString} from './markdown.js';
import {type MdDocument, type MdSection} from './model.js';
import {type ModuleInfo, type ProjectNgram, type ProjectVocabulary} from './parser-model.js';

export const toVocabularyTable = (
	projectVocabulary: ProjectVocabulary,
): string => {
	const rows: Array<[string, string, string]> = projectVocabulary.vocabulary.map(
		v => [v.words.join(' ').toLowerCase(), `${v.words.length}`, v.filename],
	);
	return markdownTable([['Identifier', 'Word count', 'Filename'], ...rows]);
};

export const toVocabularyRankTable = (projectNgram: ProjectNgram): string => {
	const rows: Array<[string, string]> = projectNgram.ngram.map(v => [
		v.ngram.join(' ').toLowerCase(),
		`${v.count}`,
	]);
	return markdownTable([['n-gram', 'Frequency'], ...rows]);
};

export const toMarkdownVocabulary = (module: ModuleInfo): string => {
	const projectVocabulary = toProjectVocabulary(module);
	const vocabularyTable = toVocabularyTable(projectVocabulary);
	const vocabularyRank = toProjectVocabularyRank(projectVocabulary);
	const vocabularyRankTable = toVocabularyRankTable(vocabularyRank);
	const fpDiagramSection: MdSection = {
		title: 'Code base vocabulary',
		body: ['Table of vocabulary found in the code base', vocabularyTable].join(
			'\n',
		),
	};
	const fpNgramSection: MdSection = {
		title: 'Popularity of sequence of words',
		body: [
			'Table showing the popularity of some n-gram in the code base',
			vocabularyRankTable,
		].join('\n'),
	};
	const doc: MdDocument = {
		title: 'Code base vocabulary',
		description: `Overview of the code base vocabulary for ${module.name}`,
		mainSection:
      'This document has been generated automatically by [baldrick-doc-ts](https://github.com/flarebyte/baldrick-doc-ts)',
		sections: [fpDiagramSection, fpNgramSection],
	};
	return markdownToString(doc);
};
