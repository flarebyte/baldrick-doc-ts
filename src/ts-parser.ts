import {
  Project,
  SourceFile,
  ImportDeclaration,
  FunctionDeclaration,
} from 'ts-morph';
import { FunctionInfo, ImportInfo, SourceInfo } from './parser-model.js';

const extractImportInfo = (importDecl: ImportDeclaration): ImportInfo[] => {
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
        from,
      },
    ];
  }
  return namedImports.map((ni) => ({
    identifier: ni,
    from,
  }));
};

const toUniqueStringArray = (values: string[]): string[] =>
  [...new Set(values)].sort();

const extractFunctionInfo = (
  functionDecl: FunctionDeclaration
): FunctionInfo => {
  const descendantsNodes = functionDecl.forEachDescendantAsArray();
  return {
    identifier: functionDecl.getName() || '',
    bodyWidth: functionDecl.getWidth(false),
    exported: functionDecl.isExported(),
    description: functionDecl
      .getJsDocs()
      .map((doc) => doc.getDescription().trim())
      .join('\n'),
    keywords: toUniqueStringArray(
      descendantsNodes.map((node) => node.getKindName())
    ),
    descendantCount: descendantsNodes.length,
  };
};

export const createProject = () => new Project();

export const parseTsContent = (current: SourceFile): SourceInfo => {
  const currentImports = current?.getImportDeclarations() || [];
  const currentFunctions = current?.getFunctions() || [];
  const parsed = {
    filename: current.getBaseName(),
    imports: currentImports.flatMap(extractImportInfo),
    functions: currentFunctions.map(extractFunctionInfo),
  };

  return parsed;
};
