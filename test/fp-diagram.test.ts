import {
  toFunctionalProgrammingDiagram,
  toFunctionalProgrammingMermaid,
} from '../src/fp-diagram';
import {
  FunctionInfo,
  ImportInfo,
  ModuleInfo,
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
  sources: [createSource(7), createSource(11), createSource(17)],
};

describe('fp-diagram', () => {
  it('should convert diagram to a diagram structure', () => {
    const actual = toFunctionalProgrammingDiagram(moduleInfo);
    expect(actual).toMatchSnapshot();
    const mermaid = toFunctionalProgrammingMermaid(actual);
    expect(mermaid).toMatchSnapshot();
  });
});
