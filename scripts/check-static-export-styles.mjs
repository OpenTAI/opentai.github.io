import { readFile } from "node:fs/promises";

const htmlPath = process.argv[2] ?? "out/index.html";
const html = await readFile(htmlPath, "utf8");
const hasInlineStyles = /<style(?:\s|>)/i.test(html);
const hasExternalStylesheet = /<link[^>]+rel=["']stylesheet["']/i.test(html);

if (!hasInlineStyles || hasExternalStylesheet) {
  throw new Error(
    `${htmlPath} must contain inline CSS and no external stylesheet link so a cached GitHub Pages HTML document cannot reference a deleted CSS chunk.`,
  );
}

console.log(`verified inline CSS in ${htmlPath}`);
