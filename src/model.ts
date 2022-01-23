export type SupportedFeature = 'md';

export interface GenerateTypedocActionOpts {
  feature: SupportedFeature[];
  jsonSource: string;
  docBase: string;
  docPrefix: string;
  docDirectory: string;
  srcDirectory: string;
  homepage?: string;
}

export interface ParseActionOpts {
  feature: SupportedFeature[];
  docBase: string;
  docPrefix: string;
  docDirectory: string;
  srcDirectory: string;
}

export interface GenerateTypedocRawOpts {
  feature: string[];
  jsonSource: string;
  docBase: string;
  srcDirectory: string;
}

export interface ParseRawOpts {
  feature: string[];
  docBase: string;
  srcDirectory: string;
}

export interface CmdOptionsGeneratorTypedoc {
  feature: CmdOption;
  jsonSource: CmdOption;
  docBase: CmdOption;
  srcDirectory: CmdOption;
}

export interface CmdOptionsParser {
  feature: CmdOption;
  docBase: CmdOption;
  srcDirectory: CmdOption;
}

export interface MdSection {
  title: string;
  body: string;
}

export interface MdDocument {
  title: string;
  description: string;
  mainSection: string;
  sections: MdSection[];
}

export interface CmdOption {
  shortFlag: string;
  longFlag: string;
  description: string;
  defaultValue?: string | string[];
  choices: string[];
  mandatory: boolean;
  variadic: boolean;
}
type TermFormatterKind = 'intro' | 'info';
export type TermFormatterFormat = 'default' | 'human';

export interface TermFormatterParams {
  title: string;
  detail: string | object;
  kind: TermFormatterKind;
  format: TermFormatterFormat;
}

export interface ErrTermFormatterParams {
  title: string;
  detail: unknown;
}

export type TermFormatter = (params: TermFormatterParams) => void;

export type ErrTermFormatter = (params: ErrTermFormatterParams) => void;

export interface RunnerContext {
  currentPath: string;
  termFormatter: TermFormatter;
  errTermFormatter: ErrTermFormatter;
}

export type GenerateTypedocAction = (
  ctx: RunnerContext,
  options: GenerateTypedocActionOpts
) => Promise<void>;

export type ParseAction = (
  ctx: RunnerContext,
  options: ParseActionOpts
) => Promise<void>;
