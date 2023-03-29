export type SupportedFeature = 'md' | 'internal' | 'ngram';

export type GenerateTypedocActionOpts = {
	feature: SupportedFeature[];
	jsonSource: string;
	docBase: string;
	docPrefix: string;
	docDirectory: string;
	srcDirectory: string;
	homepage?: string;
};

export type ParseActionOpts = {
	feature: SupportedFeature[];
	docBase: string;
	docPrefix: string;
	docDirectory: string;
	srcDirectory: string;
	packageName: string;
};

export type GenerateTypedocRawOpts = {
	feature: string[];
	jsonSource: string;
	docBase: string;
	srcDirectory: string;
};

export type ParseRawOpts = {
	feature: string[];
	docBase: string;
	srcDirectory: string;
};

export type CmdOptionsGeneratorTypedoc = {
	feature: CmdOption;
	jsonSource: CmdOption;
	docBase: CmdOption;
	srcDirectory: CmdOption;
};

export type CmdOptionsParser = {
	feature: CmdOption;
	docBase: CmdOption;
	srcDirectory: CmdOption;
};

export type MdSection = {
	title: string;
	body: string;
};

export type MdDocument = {
	title: string;
	description: string;
	mainSection: string;
	sections: MdSection[];
};

export type CmdOption = {
	shortFlag: string;
	longFlag: string;
	description: string;
	defaultValue?: string | string[];
	choices: string[];
	mandatory: boolean;
	variadic: boolean;
};
type TermFormatterKind = 'intro' | 'info';
export type TermFormatterFormat = 'default' | 'human';

export type TermFormatterParams = {
	title: string;
	detail: string | Record<string, unknown>;
	kind: TermFormatterKind;
	format: TermFormatterFormat;
};

export type ErrTermFormatterParams = {
	title: string;
	detail: unknown;
};

export type TermFormatter = (parameters: TermFormatterParams) => void;

export type ErrTermFormatter = (parameters: ErrTermFormatterParams) => void;

export type RunnerContext = {
	currentPath: string;
	termFormatter: TermFormatter;
	errTermFormatter: ErrTermFormatter;
};

export type GenerateTypedocAction = (
	ctx: RunnerContext,
	options: GenerateTypedocActionOpts
) => Promise<void>;

export type ParseAction = (
	ctx: RunnerContext,
	options: ParseActionOpts
) => Promise<void>;
