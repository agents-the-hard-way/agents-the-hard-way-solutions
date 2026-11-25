import { lstat, readdir, readFile, realpath, writeFile } from 'node:fs/promises';
import { basename, dirname, join, resolve, sep } from 'node:path';
import { ReadFileInput, WriteFileInput } from './tools.js';

const SANDBOX_DIR = 'sandbox';

// Path scoping only: a path that would leave sandbox/ (e.g. '../../../../.env') is refused.
// Nothing here stops the agent from changing files *inside* sandbox/.
async function sandboxPath(p: string): Promise<string | null> {
  const root = await realpath(SANDBOX_DIR);
  const target = resolve(root, p);
  if (!target.startsWith(root + sep)) return null;
  // A symlink inside sandbox/ could still point outside it: check where the parent
  // directory really is, and refuse the file itself if it is a symlink.
  const parent = await realpath(dirname(target)).catch(() => null);
  if (!parent || (parent !== root && !parent.startsWith(root + sep))) return null;
  const isSymlink = await lstat(target).then(
    (stats) => stats.isSymbolicLink(),
    () => false,
  );
  return isSymlink ? null : join(parent, basename(target));
}

// Same tool set and SANDBOX_DIR scoping as sandboxIncidentBefore.ts. Nothing here stops
// the agent from emptying a file inside the sandbox yet.
//
// TODO: guard read_file and write_file with the two checks from lesson 02:
//   - isPathSafe(resolvedPath) from './security.js': the path stays inside this folder
//   - isProtectedFile(resolvedPath) from './protectedFiles.js': the file is not on the
//     protected list (.env and friends), whatever directory it is in
// Run both before touching the file, and return an `Error: ...` string to the model
// instead of throwing, so the agent sees why the call was refused.
export async function executeTool(name: string, input: unknown): Promise<string> {
  if (name === 'read_file') {
    const parsed = ReadFileInput.safeParse(input);
    if (!parsed.success) return `Error: invalid arguments — ${parsed.error.message}`;
    const resolvedPath = await sandboxPath(parsed.data.path);
    if (!resolvedPath) return `Error: path '${parsed.data.path}' is outside the sandbox.`;

    try {
      return await readFile(resolvedPath, 'utf-8');
    } catch (err) {
      return `Error reading file: ${(err as Error).message}`;
    }
  }

  if (name === 'list_files') {
    return (await readdir(SANDBOX_DIR)).join(', ');
  }

  if (name === 'write_file') {
    const parsed = WriteFileInput.safeParse(input);
    if (!parsed.success) return `Error: invalid arguments — ${parsed.error.message}`;
    const { path, content } = parsed.data;
    const resolvedPath = await sandboxPath(path);
    if (!resolvedPath) return `Error: path '${path}' is outside the sandbox.`;

    try {
      await writeFile(resolvedPath, content, 'utf-8');
      return `Written to ${path}`;
    } catch (err) {
      return `Error writing file: ${(err as Error).message}`;
    }
  }

  return `Error: unknown tool '${name}'.`;
}
