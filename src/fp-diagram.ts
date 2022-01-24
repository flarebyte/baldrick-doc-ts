import {
  FunctionalProgrammingDiagram,
  ModuleInfo,
  SourceInfo,
  SourceDiagram,
  RelationshipDiagram,
  FunctionDiagram,
} from './parser-model.js';

const functionInfoToDiagram = (source: SourceInfo): SourceDiagram => ({
  filename: source.filename,
  external: false,
  functions: source.functions.map((f) => ({
    identifier: f.identifier,
    exported: f.exported,
  })),
});

const importInfoToDiagram = (source: SourceInfo): SourceDiagram => ({
  filename: source.filename,
  external: false,
  functions: source.imports.map((i) => ({
    identifier: i.identifier,
    exported: true,
  })),
});

const importInfoToRelationships = (source: SourceInfo): RelationshipDiagram[] =>
  source.imports.map((i) => ({
    from: source.filename,
    to: i.from,
  }));

export const toFunctionalProgrammingDiagram = (
  moduleInfo: ModuleInfo
): FunctionalProgrammingDiagram => {
  const localSources: SourceDiagram[] = moduleInfo.sources.map(
    functionInfoToDiagram
  );
  const importedSources: SourceDiagram[] =
    moduleInfo.sources.map(importInfoToDiagram);

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
const entityToMermaid = (entity: SourceDiagram): string[] => [
  `class ${bq}${entity.filename}${bq}{`,
  ...entity.functions.map(functionToMermaid),
  '}',
];
const relationshipToMermaid = (relationship: RelationshipDiagram): string =>
  `${bq}${relationship.from}${bq}-->${bq}${relationship.to}${bq}`;

const noDuplicateFunctionDiagram = (
  functionDiagram: FunctionDiagram,
  index: number,
  functionDiagrams: FunctionDiagram[]
): boolean =>
  functionDiagrams.findIndex(
    (d) => d.identifier === functionDiagram.identifier
  ) === index;

const mergeFunctionDiagrams = (
  a: FunctionDiagram[],
  b: FunctionDiagram[]
): FunctionDiagram[] => [...a, ...b].filter(noDuplicateFunctionDiagram);

export const mergeSourceDiagrams = (
  sources: SourceDiagram[]
): SourceDiagram[] => {
  const results = new Map<string, SourceDiagram>();
  for (const source of sources) {
    const previous = results.get(source.filename);
    const newSource: SourceDiagram = previous
      ? {
          ...source,
          functions: mergeFunctionDiagrams(
            source.functions,
            previous.functions
          ),
        }
      : source;

    results.set(source.filename, newSource);
  }
  return [...results.values()];
};
export const toFunctionalProgrammingMermaid = (
  diagram: FunctionalProgrammingDiagram
): string => {
  const lines = [
    'classDiagram',
    ...diagram.entities.flatMap(entityToMermaid),
    ...diagram.relationships.flatMap(relationshipToMermaid),
  ];
  return lines.join('\n');
};
