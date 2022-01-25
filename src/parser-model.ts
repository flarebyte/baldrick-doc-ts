export interface ImportInfo {
  identifier: string;
  from: string;
}

export interface FunctionInfo {
  identifier: string;
  bodyWidth: number;
  keywords: string[];
  description: string;
  exported: boolean;
  descendantCount: number;
  expression: boolean;
}

export interface InterfaceInfo {
  identifier: string;
  exported: boolean;
}

export interface SourceInfo {
  filename: string;
  imports: ImportInfo[];
  functions: FunctionInfo[];
  interfaces: InterfaceInfo[];
}

export interface ModuleInfo {
  name: string;
  sources: SourceInfo[];
}

export interface FunctionDiagram {
  identifier: string;
  exported: boolean;
}

export interface RelationshipDiagram {
  from: string;
  to: string;
}

export interface SourceDiagram {
  filename: string;
  external: boolean;
  functions: FunctionDiagram[];
}

export interface FunctionalProgrammingDiagram {
  name: string;
  entities: SourceDiagram[];
  relationships: RelationshipDiagram[];
}
