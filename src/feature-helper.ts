import { type SupportedFeature } from './model.js';

function isFeature(value: string): value is SupportedFeature {
  return ['md', 'internal', 'internal-csv', 'ngram'].includes(value);
}

const toFeature = (feature: string): SupportedFeature => {
  if (isFeature(feature)) {
    return feature;
  }

  throw new Error(`Internal feature is not supported ${feature}`);
};

export const toFeatures = (features: string[]): SupportedFeature[] =>
  features.map(toFeature);
