import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const entryPath = join(dirname(fileURLToPath(import.meta.url)), "entry.txt");
const entry = readFileSync(entryPath, "utf8");

// The gate requires 1-280 Unicode code points, not only whitespace.
const codePoints = [...entry.trim()].length;
if (entry.trim().length === 0 || codePoints > 280) {
  console.error(
    `entry.txt must be 1-280 Unicode code points, got ${codePoints} (whitespace-only: ${entry.trim().length === 0})`,
  );
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), entry);
