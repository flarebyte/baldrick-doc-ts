import {
  toProjectVocabulary,
  toProjectVocabularyRank,
} from '../src/fp-vocabulary';
import {
  FunctionInfo,
  InterfaceInfo,
  ModuleInfo,
  SourceInfo,
} from '../src/parser-model';

const createFunctionInfo = (identifier: string): FunctionInfo => ({
  identifier,
  bodyWidth: identifier.length,
  keywords: [],
  description: `Description of ${identifier}`,
  exported: true,
  descendantCount: 100,
  expression: false,
});

const createInterfaceInfo = (identifier: string): InterfaceInfo => ({
  identifier,
  exported: true,
});

const createSource = (id: string): SourceInfo => ({
  filename: `filename-${id}.js`,
  imports: [],
  functions: [
    createFunctionInfo(`create${id}`),
    createFunctionInfo(`update${id}`),
    createFunctionInfo(`delete${id}`),
    createFunctionInfo(`CRUD${id}`),
  ],
  interfaces: [
    createInterfaceInfo(`Param${id}`),
    createInterfaceInfo(`Creator2${id}`),
  ],
});

const moduleInfo: ModuleInfo = {
  name: 'this-project',
  sources: [
    createSource('Saturn'),
    createSource('EARTH'),
    createSource('Mars'),
    createSource('Venus13'),
  ],
};
describe('fp-vocabulary', () => {
  it('should provide vocabulary', () => {
    const actual = toProjectVocabulary(moduleInfo);
    expect(actual).toMatchInlineSnapshot(`
      Object {
        "vocabulary": Array [
          Object {
            "filename": "filename-Saturn.js",
            "words": Array [
              "create",
              "Saturn",
            ],
          },
          Object {
            "filename": "filename-Saturn.js",
            "words": Array [
              "update",
              "Saturn",
            ],
          },
          Object {
            "filename": "filename-Saturn.js",
            "words": Array [
              "delete",
              "Saturn",
            ],
          },
          Object {
            "filename": "filename-Saturn.js",
            "words": Array [
              "CRUDSaturn",
            ],
          },
          Object {
            "filename": "filename-Saturn.js",
            "words": Array [
              "Param",
              "Saturn",
            ],
          },
          Object {
            "filename": "filename-Saturn.js",
            "words": Array [
              "Creator2",
              "Saturn",
            ],
          },
          Object {
            "filename": "filename-EARTH.js",
            "words": Array [
              "create",
              "EARTH",
            ],
          },
          Object {
            "filename": "filename-EARTH.js",
            "words": Array [
              "update",
              "EARTH",
            ],
          },
          Object {
            "filename": "filename-EARTH.js",
            "words": Array [
              "delete",
              "EARTH",
            ],
          },
          Object {
            "filename": "filename-EARTH.js",
            "words": Array [
              "CRUDEARTH",
            ],
          },
          Object {
            "filename": "filename-EARTH.js",
            "words": Array [
              "Param",
              "EARTH",
            ],
          },
          Object {
            "filename": "filename-EARTH.js",
            "words": Array [
              "Creator2",
              "EARTH",
            ],
          },
          Object {
            "filename": "filename-Mars.js",
            "words": Array [
              "create",
              "Mars",
            ],
          },
          Object {
            "filename": "filename-Mars.js",
            "words": Array [
              "update",
              "Mars",
            ],
          },
          Object {
            "filename": "filename-Mars.js",
            "words": Array [
              "delete",
              "Mars",
            ],
          },
          Object {
            "filename": "filename-Mars.js",
            "words": Array [
              "CRUDMars",
            ],
          },
          Object {
            "filename": "filename-Mars.js",
            "words": Array [
              "Param",
              "Mars",
            ],
          },
          Object {
            "filename": "filename-Mars.js",
            "words": Array [
              "Creator2",
              "Mars",
            ],
          },
          Object {
            "filename": "filename-Venus13.js",
            "words": Array [
              "create",
              "Venus13",
            ],
          },
          Object {
            "filename": "filename-Venus13.js",
            "words": Array [
              "update",
              "Venus13",
            ],
          },
          Object {
            "filename": "filename-Venus13.js",
            "words": Array [
              "delete",
              "Venus13",
            ],
          },
          Object {
            "filename": "filename-Venus13.js",
            "words": Array [
              "CRUDVenus13",
            ],
          },
          Object {
            "filename": "filename-Venus13.js",
            "words": Array [
              "Param",
              "Venus13",
            ],
          },
          Object {
            "filename": "filename-Venus13.js",
            "words": Array [
              "Creator2",
              "Venus13",
            ],
          },
        ],
      }
    `);
  });
  it('should provide vocabulary rankings', () => {
    const vocabulary = toProjectVocabulary(moduleInfo);
    const actual = toProjectVocabularyRank(vocabulary);
    expect(actual).toMatchInlineSnapshot(`
      Object {
        "ngram": Array [
          Object {
            "count": 8,
            "ngram": Array [
              "update",
            ],
          },
          Object {
            "count": 8,
            "ngram": Array [
              "delete",
            ],
          },
          Object {
            "count": 8,
            "ngram": Array [
              "create",
            ],
          },
          Object {
            "count": 8,
            "ngram": Array [
              "Param",
            ],
          },
          Object {
            "count": 8,
            "ngram": Array [
              "Creator2",
            ],
          },
          Object {
            "count": 5,
            "ngram": Array [
              "Venus13",
            ],
          },
          Object {
            "count": 5,
            "ngram": Array [
              "Saturn",
            ],
          },
          Object {
            "count": 5,
            "ngram": Array [
              "Mars",
            ],
          },
          Object {
            "count": 5,
            "ngram": Array [
              "EARTH",
            ],
          },
        ],
      }
    `);
  });
});
