import { markdownToString } from './markdown';
import { MdSection } from './model';
import { Parameter, TypedocChild, TypedocJson } from './typedoc-json-model';
const bq = '`';

const parameterToString = (param: Parameter): string => {
  const { name, type, comment } = param;
  const description = comment?.shortText || 'fixme: Adds a description';

  const isArray = type.type === 'array';
  const arrayMarker = isArray ? 'Array of ' : '';
  const typeName = type.name || type.elementType?.name || 'fixme';
  return `* ${name}: ${arrayMarker}${bq}${typeName}${bq}: ${description}`;
};

const functionToMdSection = (child: TypedocChild): MdSection => {
  const sourceFilename = child.sources[0]?.fileName || 'which-file.ts';
  const sourceFileLine = child.sources[0]?.line || 1;
  const fileRef = `See ${sourceFilename}:L${sourceFileLine}`;
  const signatures = child.signatures || [];
  const [signature] = signatures;
  const params = (signature?.parameters || []).map(parameterToString);

  const description =
    signature?.comment?.shortText || 'fixme: Adds a description';

  const section: MdSection = {
    title: `${child.name}`,
    body: [fileRef, description, ...params].join('\n\n'),
  };
  return section;
};

export const toTypedocApiMd = (typedocJson: TypedocJson): string => {
  const allFunctions = typedocJson.children.filter(
    (child) => child.kindString === 'Function'
  );
  const mdDoc = {
    title: `API of ${typedocJson.name}`,
    description: `API of ${typedocJson.name}`,
    mainSection: '',
    sections: allFunctions.map(functionToMdSection),
  };
  return markdownToString(mdDoc);
};
