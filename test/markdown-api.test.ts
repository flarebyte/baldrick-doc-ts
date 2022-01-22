import { toTypedocApiMd } from '../src/markdown-api';
import { GenerateTypedocActionOpts } from '../src/model';
import { TypedocJson } from '../src/typedoc-json-model';
import { typedocExampleJson } from './fixture-typedoc';

const defaultOps = {
  feature: [],
  jsonSource: '',
  docBase: '',
  docPrefix: '',
  docDirectory: '',
  srcDirectory: 'src',
};

describe('markdown-api', () => {
  const typedocExample: TypedocJson = JSON.parse(typedocExampleJson);
  it('should provide markdown for homepage', () => {
    const opts: GenerateTypedocActionOpts = {
      ...defaultOps,
      homepage: 'https://github.com/mycompany/my-project',
    };
    const actual = toTypedocApiMd(opts, typedocExample);
    expect(actual).toMatchSnapshot();
  });
  it('should provide markdown without homepage', () => {
    const opts: GenerateTypedocActionOpts = {
      ...defaultOps,
    };
    const actual = toTypedocApiMd(opts, typedocExample);
    expect(actual).toMatchSnapshot();
  });
  it('should provide markdown for a docBase', () => {
    const opts: GenerateTypedocActionOpts = {
      ...defaultOps,
      homepage: 'https://github.com/mycompany/my-project',
      docBase: 'docs/my-',
    };
    const actual = toTypedocApiMd(opts, typedocExample);
    expect(actual).toMatchSnapshot();
  });
});
