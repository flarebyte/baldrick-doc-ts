export type TypedocJson = {
	name: string;
	originalName: string;
	children: TypedocChild[];
	groups: Group[];
};

export type TypedocChild = {
	id: number;
	name: string;
	kindString: string;
	flags: ChildFlags;
	sources: Source[];
	type?: Type;
	defaultValue?: string;
	signatures?: Signature[];
	comment?: Comment;
};

type ChildFlags = {
	isConst?: boolean;
};

type Source = {
	fileName: string;
	line: number;
	character: number;
};

type Type = {
	type: string;
	name?: string;
	elementType?: ElementType;
	declaration?: Declaration;
	value?: boolean;
};

type ElementType = {
	type: string;
	name: string;
};

type Signature = {
	id: number;
	name: string;
	kind: number;
	kindString: string;
	parameters: Parameter[];
	type: Type;
	comment?: Comment;
};

export type Parameter = {
	id: number;
	name: string;
	kind: number;
	kindString: string;
	type: Type;
	comment?: Comment;
	defaultValue?: string;
};

type Declaration = {
	id: number;
	name: string;
	kind: number;
	kindString: string;
	signatures: Signature[];
};

type Comment = {
	shortText: string;
	returns: string;
};

type Group = {
	title: string;
	kind: number;
	children: number[];
};
