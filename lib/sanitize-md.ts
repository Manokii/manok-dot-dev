export function sanitizeMarkdown(str: string = "") {
  return str
    .replaceAll("**", "")
    .replaceAll("__", "")
    .replaceAll("~~", "")
    .replaceAll(/\[(.*)\]\(.*\)/g, "$1")
}
