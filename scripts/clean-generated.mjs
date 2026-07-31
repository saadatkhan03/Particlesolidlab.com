import { rm } from "node:fs/promises";
import { dirname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(scriptDirectory, "..");
const removeDependencies = process.argv.includes("--dependencies");
const targetNames = [
  "dist",
  "out",
  ".next",
  ".vinext",
  ".wrangler",
  "work",
  ...(removeDependencies ? ["node_modules"] : []),
];

for (const targetName of targetNames) {
  const targetPath = resolve(projectRoot, targetName);
  if (!targetPath.startsWith(`${projectRoot}${sep}`)) {
    throw new Error(`Refusing to remove a path outside the project: ${targetPath}`);
  }
  await rm(targetPath, { force: true, recursive: true });
  console.log(`Removed ${targetName}/`);
}

if (removeDependencies) {
  console.log("Run `npm install` before the next local preview or build.");
}
