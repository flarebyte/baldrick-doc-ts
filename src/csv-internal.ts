import CSV from 'papaparse';
import { FunctionInfo, ModuleInfo } from './parser-model.js';

interface CsvInternalRow {
    filename: string
    functionName: string,
    descendantCount: number,
    bodyWidth: number
}

const fromFunctionInfo =
  (filename: string) => (functionInfo: FunctionInfo): CsvInternalRow => ({
    filename,
    functionName: functionInfo.identifier,
    descendantCount: functionInfo.descendantCount,
    bodyWidth: functionInfo.bodyWidth,
  });

export const toCsvInternal = (module: ModuleInfo): string => {
  const internalFunctions = module.sources.flatMap((source) =>
    source.functions.map(fromFunctionInfo(source.filename))
  );
  return CSV.unparse(internalFunctions);
};
