# Agent instructions for this repo

This is a course, not production code. It teaches Claude tool use and agent loops at a
low level, so the lesson code deliberately avoids high-level SDK abstractions. There is no
shared agent loop: every lesson is a standalone set of scripts. Most run a tool-use loop;
lesson 01 only observes and never executes a tool call.

## Three contexts: two ways to use this repo, one way to maintain it

Before touching anything, work out which of these three situations you are in. The first
two are a learner *using* the course; the third is *maintaining* it. **Writing to
`lessons/` or `tracks/` only ever happens in the third, whatever is asked.**

1. **Guiding a learner through a lesson.** The learner writes the code; you are a mentor.
   They work in `lessons/NN-<slug>/problem/` and their notes go in `problem/NOTEBOOK.md`.
   Explain concepts and the existing code, name the next step, give the exact command
   (`pnpm lesson NN before|after`), say what to look for, then stop and wait for their
   result. Give hints for a `TODO`, never the finished code. Do not open, quote or
   summarize anything in `solution/` (code or `WRITEUP.md`) until the learner says they
   have finished the lesson and their notebook. Do not write their hypotheses or
   conclusions for them. Help with setup problems (pnpm, the API key, git) directly.
2. **Self-serve verification.** The learner runs existing scripts, for example
   `pnpm lesson NN after --solution`, to see the reference behavior or compare it with
   their own. This barely involves an agent at all.
3. **Maintaining the repo.** Adding or fixing a lesson, editing docs, restructuring. The
   default is read-only: propose changes as diffs and discussion, and the human applies
   them. The human, speaking explicitly as the maintainer, can authorize an agent to
   write, commit and push for a given task. That authorization is the only exception to
   read-only mode and applies only in this context.

If the context is unclear, ask. Do not infer context 3 just because a question in context
1 or 2 sounds like a request to fix something.

## Read-only mode

Default in context 3, absolute in contexts 1 and 2: do not write, edit or delete any file
in this repo unless the maintainer has explicitly authorized it in context 3. This
project's own agent-loop code has damaged real files before (see `docs/incidents.md`), and
in contexts 1 and 2, writing the learner's code for them is never right, whatever is asked.

## Before making suggestions

1. Read `docs/incidents.md` first. It records real failures this agent caused while being
   built, including deleting a real `.env`, and the fixes applied. Do not suggest
   reintroducing a pattern logged there.
2. Each lesson's `security.ts` (`isPathSafe`) and `protectedFiles.ts` (`isProtectedFile`)
   are independent, layered defenses. Do not suggest merging them into one check; the
   incident log explains why the separation matters.
3. Every `problem/` and `solution/` folder has its own `sandbox/` of disposable files for
   destructive tests. Never share a sandbox between lessons or between the two variants of
   one lesson (`docs/incidents.md`, Incident 5), and never run exploratory or destructive
   agent behavior against real project files such as `.env`.
4. `problem/` and `solution/` folders are self-contained. Each has its own copy of every
   helper it needs (`executeTool.ts`, `tools.ts`, ...), copied forward from the lesson
   that introduced it, and imports nothing from outside itself. Do not suggest
   "de-duplicating" this by importing across folders.
5. Scripts run with their own variant folder as the working directory (see
   `scripts/lesson.ts`). Paths inside lessons are relative to that folder (`sandbox/...`),
   never to the repository root.

## Conventions

- Code, comments, error messages and docs are in English.
- Package manager is pnpm. Do not suggest npm or yarn commands or lockfiles.
- Formatting and linting with Biome (`pnpm check`), not ESLint or Prettier. `pnpm verify`
  (Biome in CI mode plus `tsc --noEmit`) must pass for `problem/` and `solution/` alike;
  CI runs it on every push and pull request. CI never calls the API.

## Lesson requirements

Build a new lesson by hand from `lessons/TEMPLATE/` and the closest existing lesson. Every
lesson folder, in the main curriculum or a deep-dive track, contains:

1. **`README.md`: the task.** Follows `lessons/TEMPLATE/README.md`: goal, your task, run,
   what to watch for, check your work, reference. No results and no hypotheses from the
   author; those would spoil the exercise.
2. **`solution/`: the reference.**
   - Two TypeScript entry points, `<name>Before.ts` (naive, unguarded or unoptimized) and
     `<name>After.ts` (the fix, guard or optimization). The same task in both, with only
     the thing under test changed. Heavy shared setup goes into a local helper that both
     import (see `lessons/05-context-compaction/solution/tokenEstimation.ts`).
   - `sandbox/` with committed fixture files or a `generateFixtures.ts` that writes them.
     Generated fixtures are git-ignored.
   - `WRITEUP.md` following `lessons/TEMPLATE/solution/WRITEUP.md`: for each entry point,
     a hypothesis written **before** running it and the real observed output (never
     invented numbers), then numbered conclusions and, if there is a concrete follow-up,
     a Next section.
3. **`problem/`: the exercise.** A copy of `solution/` without `WRITEUP.md`, where the
   key fragment the lesson teaches is replaced by a `TODO` with a hint, plus
   `NOTEBOOK.md` from the template. The `Before` script normally stays complete. Problem
   code must type-check and run: an unfinished `TODO` should degrade gracefully or fail
   with a clear `TODO:` message, not crash on a type error.
4. **An incident reference, if applicable.** If a run produces real destructive or unsafe
   behavior, even inside `sandbox/`, log it in `docs/incidents.md` with root cause and
   fix, and link it from `solution/WRITEUP.md`.
5. **Wiring.** Add the lesson's row to the table in the root `README.md`, and its
   generated fixtures, if any, to `.gitignore`. `pnpm lesson` finds the scripts by file
   name, so there is nothing to add to `package.json`.

There are no git tags. The lesson folder on `main` is the record.

## Deep-dive tracks

`docs/plan/deep-dive-tracks.md` specifies extensions below the Claude API and SDK level
(local inference with Ollama, raw MCP, sandboxing, and more), listed in `tracks/README.md`.
They live under `tracks/<track>/NN-<slug>/`, not in the `lessons/NN-<slug>/` numbering,
and follow the same lesson requirements above.
