import {
  mergeSourceDiagrams,
  toFunctionalProgrammingDiagram,
  toFunctionalProgrammingMermaid,
} from '../src/fp-diagram';
import {
  FunctionDiagram,
  FunctionInfo,
  ImportInfo,
  ModuleInfo,
  SourceDiagram,
  SourceInfo,
} from '../src/parser-model';

const createImportInfo = (identifier: string, from: string): ImportInfo => ({
  identifier,
  from,
});

const createFunctionInfo = (
  identifier: string,
  exported: boolean
): FunctionInfo => ({
  identifier,
  bodyWidth: identifier.length,
  keywords: ['keyword1', `keyword-${identifier}`],
  description: `Description of ${identifier}`,
  exported,
  descendantCount: 100,
  expression: exported,
});

const createSource = (id: number): SourceInfo => ({
  filename: `filename-${id}.js`,
  imports: [createImportInfo(`import-${id}-function1`, `external-${id}`)],
  functions: [
    createFunctionInfo(`create-${id}`, true),
    createFunctionInfo(`update-${id}`, false),
    createFunctionInfo(`delete-${id}`, true),
  ],
});

const moduleInfo: ModuleInfo = {
  name: 'this-project',
  sources: [
    createSource(7),
    createSource(11),
    createSource(17),
    { ...createSource(21), functions: [] },
  ],
};

const createFunctionDiagram = (identifier: string): FunctionDiagram => ({
  identifier,
  exported: identifier.startsWith('exp'),
});

const createSourceDiagram = (
  filename: string,
  functions: string[]
): SourceDiagram => ({
  filename,
  external: true,
  functions: functions.map(createFunctionDiagram),
});

describe('fp-diagram', () => {
  it('should convert diagram to a diagram structure', () => {
    const actual = toFunctionalProgrammingDiagram(moduleInfo);
    expect(actual).toMatchSnapshot();
    const mermaid = toFunctionalProgrammingMermaid(actual);
    expect(mermaid).toMatchSnapshot();
  });
  it('merge source diagrams', () => {
    const sources = [
      createSourceDiagram('Earth', ['Moon']),
      createSourceDiagram('Earth', ['Moon']),
      createSourceDiagram('Jupiter', ['Europa']),
      createSourceDiagram('Mercury', []),
      createSourceDiagram('Jupiter', ['Ganymede', 'Europa']),
      createSourceDiagram('Jupiter', ['Callisto']),
      createSourceDiagram('Jupiter', ['Callisto', 'Himalia']),
      createSourceDiagram('Jupiter', ['Callisto', 'Himalia']),
      createSourceDiagram('Jupiter', ['Elara']),
    ];
    const actual = mergeSourceDiagrams(sources);
    expect(actual).toMatchInlineSnapshot(`
      Array [
        Object {
          "external": true,
          "filename": "Earth",
          "functions": Array [
            Object {
              "exported": false,
              "identifier": "Moon",
            },
          ],
        },
        Object {
          "external": true,
          "filename": "Jupiter",
          "functions": Array [
            Object {
              "exported": false,
              "identifier": "Elara",
            },
            Object {
              "exported": false,
              "identifier": "Callisto",
            },
            Object {
              "exported": false,
              "identifier": "Himalia",
            },
            Object {
              "exported": false,
              "identifier": "Ganymede",
            },
            Object {
              "exported": false,
              "identifier": "Europa",
            },
          ],
        },
        Object {
          "external": true,
          "filename": "Mercury",
          "functions": Array [],
        },
      ]
    `);
  });
});
