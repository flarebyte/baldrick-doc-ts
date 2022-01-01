import { markdownToString } from './markdown.js';
import { GenerateTypedocActionOpts, MdSection } from './model.js';
import { Parameter, TypedocChild, TypedocJson } from './typedoc-json-model.js';
const bq = '`';

const parameterToString = (param: Parameter): string => {
  const { name, type, comment } = param;
  const description = comment?.shortText || 'fixme: Adds a description';

  const isArray = type.type === 'array';
  const arrayMarker = isArray ? 'Array of ' : '';
  const typeName = type.name || type.elementType?.name || 'fixme';
  return `* ${name}: ${arrayMarker}${bq}${typeName}${bq}: ${description}`;
};

const functionToMdSection =
  (opts: GenerateTypedocActionOpts) =>
  (child: TypedocChild): MdSection => {
    const sourceFilename = child.sources[0]?.fileName || 'which-file.ts';
    const sourceFileLine = child.sources[0]?.line || 1;
    const srcHref = opts.homepage
      ? `${opts.homepage}/blob/main/${opts.srcDirectory}/${sourceFilename}#L${sourceFileLine}`
      : `${opts.srcDirectory}/${sourceFilename}`;
    const fileRef = `See [${sourceFilename} - L${sourceFileLine}](${srcHref})`;
    const signatures = child.signatures || [];
    const [signature] = signatures;
    const params = (signature?.parameters || []).map(parameterToString);
    const description =
      signature?.comment?.shortText || 'fixme: Adds a description';
    const returns = signature?.comment?.returns;
    const functionReturn = returns ? ['### Returns', returns] : [];

    const section: MdSection = {
      title: `${child.name}`,
      body: [
        `⎔ ${description}`,
        '### Parameters',
        ...params,
        ...functionReturn,
        fileRef,
      ].join('\n\n'),
    };
    return section;
  };

const variableToMdSection =
  (opts: GenerateTypedocActionOpts) =>
  (child: TypedocChild): MdSection => {
    const sourceFilename = child.sources[0]?.fileName || 'which-file.ts';
    const sourceFileLine = child.sources[0]?.line || 1;
    const srcHref = opts.homepage
      ? `${opts.homepage}/blob/main/${opts.srcDirectory}/${sourceFilename}#L${sourceFileLine}`
      : `${opts.srcDirectory}/${sourceFilename}`;
    const fileRef = `See [${sourceFilename} - L${sourceFileLine}](${srcHref})`;
    const description =
      child?.comment?.shortText || 'fixme: Adds a description';
    const isArray = child?.type?.type === 'array';
    const arrayMarker = isArray ? 'Array of ' : '';

    const name = child?.type?.elementType?.name;
    const signature = `${arrayMarker}${bq}${name}${bq}`;

    const section: MdSection = {
      title: `${child.name}`,
      body: [signature, description, fileRef].join('\n\n'),
    };
    return section;
  };

const titleToRef =
  (opts: GenerateTypedocActionOpts) =>
  (section: MdSection): string =>
    `* [${section.title}](${opts.docBase}api.md#${section.title})`;

export const toTypedocApiMd = (
  opts: GenerateTypedocActionOpts,
  typedocJson: TypedocJson
): string => {
  const allFunctions = typedocJson.children.filter(
    (child) => child.kindString === 'Function'
  );
  const allVariables = typedocJson.children.filter(
    (child) => child.kindString === 'Variable'
  );
  const functionSections = allFunctions.map(functionToMdSection(opts));
  const varSections = allVariables.map(variableToMdSection(opts));
  const idxFunctions = functionSections.map(titleToRef(opts));
  const idxVars = varSections.map(titleToRef(opts));
  const mainSectionFunctions =
    idxFunctions.length === 0
      ? []
      : ['__Functions:__', '', ...idxFunctions, ''];
  const mainSectionVariables =
    idxVars.length === 0 ? [] : ['', '__Variables:__', '', ...idxVars];

  const mainSection = [...mainSectionFunctions, ...mainSectionVariables].join(
    '\n'
  );

  const mdDoc = {
    title: `API of ${typedocJson.name}`,
    description: `List of functions and variables for ${bq}${typedocJson.name}${bq}`,
    mainSection,
    sections: [...functionSections, ...varSections],
  };
  return markdownToString(mdDoc);
};
