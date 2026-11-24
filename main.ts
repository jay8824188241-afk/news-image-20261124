// news-image-20261124: carry the rendered front page (entry.png) into the
// grader's output directory. Standard library only; no network, no deps.
import { copyFileSync, mkdirSync, readFileSync, statSync } from "node:fs";
import { createHash } from "node:crypto";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "entry.png");
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const target = join(outDir, "entry.png");

function digest(path: string): string {
  return createHash("sha256").update(readFileSync(path)).digest("hex");
}

mkdirSync(outDir, { recursive: true });
copyFileSync(source, target);

const before = digest(source);
const after = digest(target);
if (before !== after) {
  throw new Error(`copy mismatch: ${before} != ${after}`);
}
console.log(
  `entry.png (${statSync(source).size} bytes) -> ${target} (${statSync(target).size} bytes, sha256 ${after.slice(0, 12)}...)`,
);
