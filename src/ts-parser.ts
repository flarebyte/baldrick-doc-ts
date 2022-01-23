import {
  Project,
  SourceFile,
  ImportDeclaration,
  FunctionDeclaration,
  VariableDeclaration,
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
  const keywords = toUniqueStringArray(
    descendantsNodes.map((node) => node.getKindName())
  );
  return {
    identifier: functionDecl.getName() || '',
    bodyWidth: functionDecl.getWidth(false),
    exported: functionDecl.isExported(),
    expression: false,
    description: functionDecl
      .getJsDocs()
      .map((doc) => doc.getDescription().trim())
      .join('\n'),
    keywords,
    descendantCount: descendantsNodes.length,
  };
};

const extractFunctionExpressionInfo = (
  varDecl: VariableDeclaration
): FunctionInfo | undefined => {
  const descendantsNodes = varDecl.forEachDescendantAsArray();
  const keywords = toUniqueStringArray(
    descendantsNodes.map((node) => node.getKindName())
  );
  const isFunctionExp = keywords.includes('ArrowFunction');
  return isFunctionExp
    ? {
        identifier: varDecl.getName() || '',
        bodyWidth: varDecl.getWidth(false),
        exported: varDecl.isExported(),
        expression: true,
        description: varDecl
          .getLeadingCommentRanges()
          .map((cr) => cr.getText())
          .join('\n'),
        keywords,
        descendantCount: descendantsNodes.length,
      }
    : undefined;
};

export const createProject = () => new Project();

const isFunctionInfo = (
  item: FunctionInfo | undefined
): item is FunctionInfo => {
  return !!item;
};
export const parseTsContent = (current: SourceFile): SourceInfo => {
  const currentImports = current?.getImportDeclarations() || [];
  const currentFunctions = current?.getFunctions() || [];
  const classicFunctions = currentFunctions.map(extractFunctionInfo);
  const expressionFunctions = current
    .getVariableDeclarations()
    .map(extractFunctionExpressionInfo)
    .filter(isFunctionInfo);
  const parsed = {
    filename: current.getBaseName(),
    imports: currentImports.flatMap(extractImportInfo),
    functions: [...classicFunctions, ...expressionFunctions],
  };
  return parsed;
};
