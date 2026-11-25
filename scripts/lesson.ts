// Runs one lesson script: `pnpm lesson <NN> <before|after|fixtures> [--solution]`.
//
// The script runs with its own lesson variant folder (problem/ or solution/) as the
// working directory, so `sandbox/...` paths and the isPathSafe() boundary are that
// folder, never the repository root. The API key is loaded here from the root .env
// and handed to the child process through its environment.
import 'dotenv/config';
import { spawnSync } from 'node:child_process';
import { existsSync, readdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const LESSONS_DIR = join(ROOT, 'lessons');
const ENTRY_POINTS = {
  before: (file: string) => file.endsWith('Before.ts'),
  after: (file: string) => file.endsWith('After.ts'),
  fixtures: (file: string) => file === 'generateFixtures.ts',
} as const;
type EntryPoint = keyof typeof ENTRY_POINTS;

function usage(): never {
  const lessons = readdirSync(LESSONS_DIR)
    .filter((name) => /^\d{2}-/.test(name))
    .sort();
  console.error('Usage: pnpm lesson <NN> <before|after|fixtures> [--solution]\n');
  console.error('Lessons:');
  for (const name of lessons) console.error(`  ${name}`);
  process.exit(1);
}

const args = process.argv.slice(2);
const useSolution = args.includes('--solution');
const [lessonNumber, entryPoint] = args.filter((arg) => !arg.startsWith('--'));

if (!lessonNumber || !entryPoint || !Object.hasOwn(ENTRY_POINTS, entryPoint)) usage();

const lessonName = readdirSync(LESSONS_DIR).find((name) =>
  name.startsWith(`${lessonNumber.padStart(2, '0')}-`),
);
if (!lessonName) {
  console.error(`No lesson ${lessonNumber} in lessons/.`);
  usage();
}

const variantDir = join(LESSONS_DIR, lessonName, useSolution ? 'solution' : 'problem');
if (!existsSync(variantDir)) {
  console.error(`${relative(ROOT, variantDir)} does not exist.`);
  process.exit(1);
}

const script = readdirSync(variantDir).find(ENTRY_POINTS[entryPoint as EntryPoint]);
if (!script) {
  console.error(`No ${entryPoint} script in ${relative(ROOT, variantDir)}.`);
  process.exit(1);
}

if (entryPoint !== 'fixtures' && !process.env.ANTHROPIC_API_KEY) {
  console.error('ANTHROPIC_API_KEY is not set. Copy .env.example to .env and add your key.');
  process.exit(1);
}

console.error(`> ${relative(ROOT, join(variantDir, script))}\n`);
const tsxCli = createRequire(import.meta.url).resolve('tsx/cli');
const result = spawnSync(process.execPath, [tsxCli, script], {
  cwd: variantDir,
  env: process.env,
  stdio: 'inherit',
});
process.exit(result.status ?? 1);
