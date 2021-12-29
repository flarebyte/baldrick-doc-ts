export interface TypedocJson {
  name: string;
  originalName: string;
  children: TypedocChild[];
  groups: Group[];
}

interface TypedocChild {
  id: number;
  name: string;
  kindString: string;
  flags: ChildFlags;
  sources: Source[];
  type?: Type;
  defaultValue?: string;
  signatures?: Signature[];
}

interface ChildFlags {
  isConst?: boolean;
}

interface Source {
  fileName: string;
  line: number;
  character: number;
}

interface Type {
  type: string;
  name?: string;
  elementType?: ElementType;
  declaration?: Declaration;
  value?: boolean;
}

interface ElementType {
  type: string;
  name: string;
}

interface Signature {
  id: number;
  name: string;
  kind: number;
  kindString: string;
  parameters: Parameter[];
  type: Type;
  comment?: Comment;
}

interface Parameter {
  id: number;
  name: string;
  kind: number;
  kindString: string;
  type: Type;
  comment?: Comment;
  defaultValue?: string;
}

interface Declaration {
  id: number;
  name: string;
  kind: number;
  kindString: string;
  signatures: Signature[];
}

interface Comment {
  shortText: string;
  returns: string;
}

interface Group {
  title: string;
  kind: number;
  children: number[];
}

export const toTypedocReadmeMd = (typedocJson: TypedocJson): string => '';
