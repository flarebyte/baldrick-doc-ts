import {
	type FunctionalProgrammingDiagram,
	type ModuleInfo,
	type SourceInfo,
	type SourceDiagram,
	type RelationshipDiagram,
	type FunctionDiagram,
} from './parser-model.js';

const functionInfoToDiagram = (source: SourceInfo): SourceDiagram => ({
	filename: source.filename,
	external: false,
	functions: source.functions.map(f => ({
		identifier: f.identifier,
		exported: f.exported,
	})),
});

const importInfoToDiagrams = (source: SourceInfo): SourceDiagram[] =>
	source.imports.map(i => ({
		filename: i.from,
		external: true,
		functions: [{identifier: i.identifier, exported: true}],
	}));

const importInfoToRelationships = (source: SourceInfo): RelationshipDiagram[] =>
	source.imports.map(i => ({
		from: source.filename,
		to: i.from,
	}));

export const toFunctionalProgrammingDiagram = (
	moduleInfo: ModuleInfo,
): FunctionalProgrammingDiagram => {
	const localSources: SourceDiagram[] = moduleInfo.sources.map(
		functionInfoToDiagram,
	);
	const importedSources: SourceDiagram[]
    = moduleInfo.sources.flatMap(importInfoToDiagrams);

	const relationships = moduleInfo.sources.flatMap(importInfoToRelationships);

	const fpDiagram: FunctionalProgrammingDiagram = {
		name: moduleInfo.name,
		entities: [...localSources, ...importedSources],
		relationships,
	};
	return fpDiagram;
};

const bq = '`';

const functionToMermaid = (func: FunctionDiagram): string =>
	`${func.exported ? '  +' : '  -'}${func.identifier}()`;

const entityToMermaid = (entity: SourceDiagram): string[] =>
	entity.functions.length === 0
		? [`class ${bq}${entity.filename}${bq}`]
		: [
			`class ${bq}${entity.filename}${bq}{`,
			...entity.functions.map(functionToMermaid),
			'}',
		];
const relationshipToMermaid = (relationship: RelationshipDiagram): string =>
	`${bq}${relationship.from}${bq}-->${bq}${relationship.to}${bq}`;

const noDuplicateFunctionDiagram = (
	functionDiagram: FunctionDiagram,
	index: number,
	functionDiagrams: FunctionDiagram[],
): boolean =>
	functionDiagrams.findIndex(
		d => d.identifier === functionDiagram.identifier,
	) === index;

const mergeFunctionDiagrams = (
	a: FunctionDiagram[],
	b: FunctionDiagram[],
): FunctionDiagram[] => [...a, ...b].filter(noDuplicateFunctionDiagram);

export const mergeSourceDiagrams = (
	sources: SourceDiagram[],
): SourceDiagram[] => {
	const results = new Map<string, SourceDiagram>();
	for (const source of sources) {
		const previous = results.get(source.filename);
		const newSource: SourceDiagram = previous
			? {
				...source,
				functions: mergeFunctionDiagrams(
					source.functions,
					previous.functions,
				),
			}
			: source;

		results.set(source.filename, newSource);
	}

	return [...results.values()];
};

const noDuplicateRelationshipDiagram = (
	relationshipDiagram: RelationshipDiagram,
	index: number,
	relationshipDiagrams: RelationshipDiagram[],
): boolean =>
	relationshipDiagrams.findIndex(
		rel =>
			rel.from === relationshipDiagram.from && rel.to === relationshipDiagram.to,
	) === index;

export const toFunctionalProgrammingMermaid = (
	diagram: FunctionalProgrammingDiagram,
): string => {
	const entities = mergeSourceDiagrams(diagram.entities);
	const lines = [
		'classDiagram',
		...entities.flatMap(entityToMermaid),
		...diagram.relationships
			.filter(noDuplicateRelationshipDiagram)
			.flatMap(relationshipToMermaid),
	];
	return lines.join('\n');
};
