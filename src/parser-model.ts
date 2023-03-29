export type ImportInfo = {
	identifier: string;
	from: string;
};

export type FunctionInfo = {
	identifier: string;
	bodyWidth: number;
	keywords: string[];
	description: string;
	exported: boolean;
	descendantCount: number;
	expression: boolean;
};

export type InterfaceInfo = {
	identifier: string;
	exported: boolean;
};

export type SourceInfo = {
	filename: string;
	imports: ImportInfo[];
	functions: FunctionInfo[];
	interfaces: InterfaceInfo[];
};

export type ModuleInfo = {
	name: string;
	sources: SourceInfo[];
};

export type FunctionDiagram = {
	identifier: string;
	exported: boolean;
};

export type RelationshipDiagram = {
	from: string;
	to: string;
};

export type SourceDiagram = {
	filename: string;
	external: boolean;
	functions: FunctionDiagram[];
};

export type FunctionalProgrammingDiagram = {
	name: string;
	entities: SourceDiagram[];
	relationships: RelationshipDiagram[];
};

export type Vocabulary = {
	words: string[];
	filename: string;
};

export type ProjectVocabulary = {
	vocabulary: Vocabulary[];
};

export type VocabularyNGram = {
	ngram: string[];
	count: number;
};
export type ProjectNgram = {
	ngram: VocabularyNGram[];
};
