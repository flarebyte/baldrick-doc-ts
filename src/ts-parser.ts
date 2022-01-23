import { Project, SourceFile, ImportDeclaration } from 'ts-morph';
import { ImportInfo, ParseInfo } from './model.js';

const extractImportInfo =
  (importDecl: ImportDeclaration): ImportInfo[] => {
      const source = importDecl.getSourceFile().getBaseName()
    const namedImports =
      importDecl
        .getImportClause()
        ?.getNamedImports()
        .map((ni) => ni.getText()) || [];
    const from = importDecl.getModuleSpecifierValue();
    const defaultImport = importDecl.getDefaultImport();
    if (defaultImport !== undefined) {
      return [
        {
          identifier: defaultImport.getText(),
          source,
          from,
        },
      ];
    }
    return namedImports.map((ni) => ({
      identifier: ni,
      source,
      from,
    }));
  };


export const createProject = () => 
    new Project();

const toUniqueStringArray = (values: string[]): string[] => [...new Set(values)].sort()

export const parseTsContent = (current: SourceFile): ParseInfo => {
  const currentImports = current?.getImportDeclarations() || [];
  const currentFunctions = current?.getFunctions() || [];
  currentFunctions.forEach((functionDecl) => {
      const descendantsNodes = functionDecl.forEachDescendantAsArray()
    console.log({
      name: functionDecl.getName(),
      bodyWidth: functionDecl.getWidth(false),
      asynchronous: functionDecl.isAsync(),
      exported: functionDecl.isExported(),
      description: functionDecl.getJsDocs().map( doc => doc.getDescription().trim()).join('\n'),
      keywords: toUniqueStringArray(descendantsNodes.map(node => node.getKindName())),
      nodeCount: descendantsNodes.length
    });
  });
  const parsed = {
    imports: currentImports.flatMap(extractImportInfo),
    functions: [],
  };

  return parsed;
};
