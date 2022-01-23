import {
  FunctionalProgrammingDiagram,
  ModuleInfo,
  SourceInfo,
  SourceDiagram,
  RelationshipDiagram,
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
