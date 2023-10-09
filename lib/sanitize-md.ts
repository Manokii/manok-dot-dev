export function sanitizeMarkdown(str = "") {
  return str
    .replaceAll("**", "")
    .replaceAll("__", "")
    .replaceAll("~~", "")
    .replaceAll(/\[(.*)\]\(.*\)/g, "$1");
}
