import CSV from 'papaparse';
import { FunctionInfo, ModuleInfo } from './parser-model.js';

interface CsvInternalRow {
  filename: string;
  functionName: string;
  descendantCount: number;
  bodyWidth: number;
  keywords: string;
}

const getKeywords = (functionInfo: FunctionInfo): string[] => {
  const isExpression = functionInfo.expression ? ['expression']: [];
  const isExported = functionInfo.exported ? ['public']: ['private']
  return [...isExported, ...isExpression ]
}

const fromFunctionInfo =
  (filename: string) =>
  (functionInfo: FunctionInfo): CsvInternalRow => ({
    filename,
    functionName: functionInfo.identifier,
    descendantCount: functionInfo.descendantCount,
    bodyWidth: functionInfo.bodyWidth,
    keywords: getKeywords(functionInfo).join(' ')
  });

const sortedByFunction = (
  a: { functionName: string },
  b: { functionName: string }
): number => {
  if (a.functionName > b.functionName) return 1;
  if (a.functionName < b.functionName) return -1;
  return 0;
};

export const toCsvFonctions = (module: ModuleInfo): string => {
  const internalFunctions = module.sources
    .flatMap((source) =>
      source.functions.map(fromFunctionInfo(source.filename))
    )
    .sort(sortedByFunction);
  return CSV.unparse(internalFunctions, {
    columns: ['functionName', 'bodyWidth', 'descendantCount', 'keywords' ,'filename'],
  });
};
