import {markdownToString} from './markdown.js';
import {type GenerateTypedocActionOpts, type MdSection} from './model.js';
import {type Parameter, type TypedocChild, type TypedocJson} from './typedoc-json-model.js';

const bq = '`';

const apiFilename = (options: GenerateTypedocActionOpts) =>
	options.docBase.length > 0 ? `${options.docBase}_API.md` : 'API.md';

const parameterToString = (parameter: Parameter): string => {
	const {name, type, comment} = parameter;
	const description = comment?.shortText || 'fixme: Adds a description';

	const isArray = type.type === 'array';
	const arrayMarker = isArray ? 'Array of ' : '';
	const typeName = type.name || type.elementType?.name || 'fixme';
	return `* ${name}: ${arrayMarker}${bq}${typeName}${bq}: ${description}`;
};

const functionToMdSection
  = (options: GenerateTypedocActionOpts) =>
  	(child: TypedocChild): MdSection => {
  		const sourceFilename = child.sources[0]?.fileName || 'which-file.ts';
  		const sourceFileLine = child.sources[0]?.line || 1;
  		const srcHref = options.homepage
  			? `${options.homepage}/blob/main/${options.srcDirectory}/${sourceFilename}#L${sourceFileLine}`
  			: `${options.srcDirectory}/${sourceFilename}`;
  		const fileRef = `See [${sourceFilename} - L${sourceFileLine}](${srcHref})`;
  		const signatures = child.signatures || [];
  		const [signature] = signatures;
  		const parameters = (signature?.parameters || []).map(parameterToString);
  		const description
      = signature?.comment?.shortText || 'fixme: Adds a description';
  		const returns = signature?.comment?.returns;
  		const functionReturn = returns ? ['### Returns', returns] : [];

  		const section: MdSection = {
  			title: `${child.name}`,
  			body: [
  				`⎔ ${description}`,
  				'### Parameters',
  				...parameters,
  				...functionReturn,
  				fileRef,
  			].join('\n\n'),
  		};
  		return section;
  	};

const variableToMdSection
  = (options: GenerateTypedocActionOpts) =>
  	(child: TypedocChild): MdSection => {
  		const sourceFilename = child.sources[0]?.fileName || 'which-file.ts';
  		const sourceFileLine = child.sources[0]?.line || 1;
  		const srcHref = options.homepage
  			? `${options.homepage}/blob/main/${options.srcDirectory}/${sourceFilename}#L${sourceFileLine}`
  			: `${options.srcDirectory}/${sourceFilename}`;
  		const fileRef = `See [${sourceFilename} - L${sourceFileLine}](${srcHref})`;
  		const description
      = child?.comment?.shortText || 'fixme: Adds a description';
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

const titleToRef
  = (options: GenerateTypedocActionOpts) =>
  	(section: MdSection): string =>
  		`* [${section.title}](${apiFilename(options)}#${section.title})`;

export const toTypedocApiMd = (
	options: GenerateTypedocActionOpts,
	typedocJson: TypedocJson,
): string => {
	const allFunctions = typedocJson.children.filter(
		child => child.kindString === 'Function',
	);
	const allVariables = typedocJson.children.filter(
		child => child.kindString === 'Variable',
	);
	const functionSections = allFunctions.map(functionToMdSection(options));
	const varSections = allVariables.map(variableToMdSection(options));
	const idxFunctions = functionSections.map(titleToRef(options));
	const idxVars = varSections.map(titleToRef(options));
	const mainSectionFunctions
    = idxFunctions.length === 0
    	? []
    	: ['__Functions:__', '', ...idxFunctions, ''];
	const mainSectionVariables
    = idxVars.length === 0 ? [] : ['', '__Variables:__', '', ...idxVars];

	const mainSection = [...mainSectionFunctions, ...mainSectionVariables].join(
		'\n',
	);

	const mdDoc = {
		title: `API of ${typedocJson.name}`,
		description: `List of functions and variables for ${bq}${typedocJson.name}${bq}`,
		mainSection,
		sections: [...functionSections, ...varSections],
	};
	return markdownToString(mdDoc);
};
