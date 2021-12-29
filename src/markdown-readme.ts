import { markdownToString, parseMarkdown } from './markdown.js';
import { MdSection } from './model.js';
import { TypedocJson } from './typedoc-json.js';

const keepSections = (section: MdSection): boolean =>
  !['Use cases'].includes(section.title);

const toTypedocSection = (typedocJson: TypedocJson): MdSection => ({
  title: 'Use cases',
  body: typedocJson.name,
});

export const toReadmeMd = (
  existingMd: string,
  typedocJson: TypedocJson
): string => {
  const existing = parseMarkdown(existingMd);

  const sections = [
    ...existing.sections.filter(keepSections),
    toTypedocSection(typedocJson),
  ];
  const updated = {
    ...existing,
    sections,
  };
  const rawReadme = markdownToString(updated);
  return rawReadme.replace(/[\r\n]{3,}/gm, '\n\n');
};
