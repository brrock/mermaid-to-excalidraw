const MARKDOWN_PATTERNS: [RegExp, string][] = [
  [/\*\*\*(.*?)\*\*\*/g, "$1"],
  [/\*\*(.*?)\*\*/g, "$1"],
  [/\*(.*?)\*/g, "$1"],
  [/__(.*?)__/g, "$1"],
  [/_(.*?)_/g, "$1"],
  [/~~(.*?)~~/g, "$1"],
  [/~~(.*?)~~/g, "$1"],
  [/`(.*?)`/g, "$1"],
  [/\[(.*?)\]\(.*?\)/g, "$1"],
  [/!\[.*?\]\(.*?\)/g, ""],
  [/^#+\s+/gm, ""],
  [/^[-*+]\s+/gm, ""],
  [/^\d+\.\s+/gm, ""],
  [/^>\s+/gm, ""],
];

export const removeMarkdown = (text: string): string => {
  let result = text;
  for (const [pattern, replacement] of MARKDOWN_PATTERNS) {
    result = result.replace(pattern, replacement);
  }
  return result.trim();
};
