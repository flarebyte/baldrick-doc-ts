import {
  ModuleInfo,
  ProjectNgram,
  ProjectVocabulary,
  SourceInfo,
  Vocabulary,
  VocabularyNGram,
} from './parser-model.js';
const extractWordsFromName = (text: string): string[] =>
  text.replace(/([\da-z])([A-Z])/g, '$1 $2').split(' ');

const asVocabulary =
  (filename: string) =>
  (withId: { identifier: string }): Vocabulary => ({
    words: extractWordsFromName(withId.identifier),
    filename,
  });

const extractSource = (source: SourceInfo): Vocabulary[] => {
  const functions: Vocabulary[] = source.functions.map(
    asVocabulary(source.filename)
  );
  const interfaces: Vocabulary[] = source.interfaces.map(
    asVocabulary(source.filename)
  );
  return [...functions, ...interfaces];
};

export const toProjectVocabulary = (
  moduleInfo: ModuleInfo
): ProjectVocabulary => ({
  vocabulary: moduleInfo.sources.flatMap(extractSource),
});

const convertToNgram = (words: string[]): VocabularyNGram[] => {
  const results = new Array<VocabularyNGram>();
  for (const word of words) {
    results.push({ ngram: [word], count: 1 });
  }
  for (let index = 0; words.length >= 2 && index < words.length - 1; index++) {
    const bigram = { ngram: words.slice(index, index + 1), count: 1 };
    results.push(bigram);
  }
  return [...results];
};

const byCountDesc = (a: VocabularyNGram, b: VocabularyNGram): number => {
  if (a.count < b.count) {
    return 1;
  }
  if (a.count > b.count) {
    return -1;
  }
  const aa = a.ngram.join('/');
  const bb = b.ngram.join('/');
  if (aa < bb) {
    return 1;
  }
  if (aa > bb) {
    return -1;
  }
  return 0;
};

export const toProjectVocabularyRank = (
  projectVocabulary: ProjectVocabulary
): ProjectNgram => {
  const allNgrams = projectVocabulary.vocabulary.flatMap((v) =>
    convertToNgram(v.words)
  );
  const counter = new Map<string, number>();
  for (const ngram of allNgrams) {
    const previous = counter.get(ngram.ngram.join('/'));
    const newCount = previous === undefined ? 1 : previous + ngram.count;
    counter.set(ngram.ngram.join('/'), newCount);
  }
  const aggregate: VocabularyNGram[] = [...counter.entries()].map((kv) => ({
    ngram: kv[0].split('/'),
    count: kv[1],
  }));

  const filtered = aggregate
    .filter((ngram) => ngram.count > 1)
    .sort(byCountDesc);

  return {
    ngram: filtered,
  };
};
