import { Project, ImportDeclaration } from 'ts-morph';
import { ImportInfo, ParseInfo } from './model.js';

const extractImportInfo =
  (source: string) =>
  (importDecl: ImportDeclaration): ImportInfo[] => {
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

export const parseTsContent = (source: string, content: string): ParseInfo => {
  const project = new Project();
  project.createSourceFile(source, content);
  const current = project.getSourceFile(source);
  const currentImports = current?.getImportDeclarations() || [];

const parsed = {
    imports: currentImports.flatMap(extractImportInfo(source)),
    functions: [],
  }

  console.log(parsed)

  return parsed;
};
