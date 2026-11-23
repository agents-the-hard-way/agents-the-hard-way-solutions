# NN — <Lesson title>: write-up

> Author's write-up and answer key for this lesson. Read it after you have filled in
> `../problem/NOTEBOOK.md` yourself.

**Files:** `<name>Before.ts` (naive/unguarded/unoptimized), `<name>After.ts`
(fix/guard/optimization applied). If both variants share heavy setup, factor it into a
local helper both import (e.g. `lessons/05-context-compaction/solution/tokenEstimation.ts`)
instead of duplicating it.

## Before: hypothesis (`<name>Before.ts`)

Written **before** running anything:

- What you expect to happen
- What you are specifically watching for in the output

## Before: result (`<name>Before.ts`)

What actually happened. Real output, real numbers, never invented ones. If it did not
work as expected, say so plainly and explain why; a documented failure with a root cause
is a valid and often more valuable outcome than a clean success (see lesson 05). If it
produced a real incident, log it in `docs/incidents.md` and link it here.

## After: hypothesis (`<name>After.ts`)

Written before running the improved variant. Usually "this should no longer reproduce the
failure above", plus what exactly should differ in the output.

## After: result (`<name>After.ts`)

Real, observed output, never invented. Say plainly if it only partly fixes the problem, or
fixes it in a way that opens a new gap (see lesson 03: `isProtectedFile` blocks `.env` but
not `notes.txt`).

## Conclusions

What this proves or disproves, comparing both runs directly. A numbered list is easier to
carry forward into later lessons.

## Next

What this motivates for the next lesson, if anything. Delete this section if there is no
clear follow-up.
