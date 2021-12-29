import { toTypedocApiMd } from '../src/markdown-api';
import { TypedocJson } from '../src/typedoc-json-model';
import { typedocExampleJson } from './fixture-typedoc';

describe('markdown-api', () => {
  const typedocExample: TypedocJson = JSON.parse(typedocExampleJson);
  it('should provide', () => {
    const actual = toTypedocApiMd(typedocExample);
    expect(actual).toMatchSnapshot();
  });
});
