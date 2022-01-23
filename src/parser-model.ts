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

export interface SourceInfo {
  filename: string;
  imports: ImportInfo[];
  functions: FunctionInfo[];
}
