import { MdDocument, MdSection } from './model.js';

const findHeader = (prefix: string) => (lines: string[]) =>
  (lines.find((line) => line.startsWith(prefix)) || prefix).substring(
    prefix.length
  );

const getMainSection = (lines: string[]): string[] => {
  const idx = lines.findIndex((line) => line.startsWith('## '));
  return idx === -1 ? lines : lines.slice(0, idx);
};

const discardHeader2 = (line: string): boolean => !line.startsWith('## ');

const linesToSection = (lines: string[]): MdSection => {
  const title = findHeader('## ')(lines);
  const body = lines.filter(discardHeader2).join('\n');
  return {
    title,
    body,
  };
};

const detectSecondaryHeader = (line: string, index: number): number =>
  line.startsWith('## ') ? index : -1;

const getSecondarySections = (lines: string[]): MdSection[] => {
  const foundIndexes = lines
    .map(detectSecondaryHeader)
    .filter((index) => index >= 0);
  const indexes = [...foundIndexes, lines.length - 1];
  const idxRange = Array.from(Array(foundIndexes.length).keys());
  const sections = idxRange.map((idx) =>
    linesToSection(lines.slice(indexes[idx], indexes[idx + 1]))
  );
  return sections;
};

const keepHeaderBody = (line: string): boolean =>
  !(line.startsWith('# ') || line.startsWith('![') || line.startsWith('> '));

export const parseMarkdown = (content: string): MdDocument => {
  const lines = content.split('\n').map((line) => line.trim());
  const mainSect = getMainSection(lines);

  const title = findHeader('# ')(mainSect);
  const description = findHeader('> ')(mainSect);
  const mainSection = mainSect.filter(keepHeaderBody).join('\n');
  const sections = getSecondarySections(lines);
  return {
    title,
    description,
    mainSection,
    sections,
  };
};

const sectionToString = (section: MdSection): string =>
  [`## ${section.title}`, section.body].join('\n\n');

export const markdownToString = (doc: MdDocument): string => {
  const parts = [
    `# ${doc.title}`,
    `> ${doc.description}`,
    doc.mainSection,
    ...doc.sections.map(sectionToString),
  ];
  return parts.join('\n\n');
};
