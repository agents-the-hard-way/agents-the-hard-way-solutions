# 05 — Proactive context compaction

Summarize the history before it hits the context limit, and check whether the agent can
still finish its task afterwards.

- **Prerequisites**: lesson 04.
- **Cost**: same fixtures as lesson 04, read several times, plus summary requests. Check
  the [pricing](https://docs.claude.com/en/docs/about-claude/pricing) before you run.

## Goal

Lesson 04 ended in a hard crash at the context limit, with all progress lost. Here the
loop compacts the history once it reaches 75% of the limit: it replaces the history with a
summary and carries on. The before variant runs the same task without compaction, so you
can see directly what compaction prevents and what it does not.

## Your task

Work in `problem/`:

1. Generate the fixtures: `pnpm lesson 05 fixtures`.
2. Hypothesis in `NOTEBOOK.md`, then `pnpm lesson 05 before` (no compaction, up to 15
   iterations).
3. `contextCompaction.ts`: implement `compactHistory()`. Until you do, it returns the
   history unchanged.
4. Hypothesis, then `pnpm lesson 05 after` (up to 10 iterations), then conclusions.

Shared constants and the token estimate are in `tokenEstimation.ts`.

## Run

```bash
pnpm lesson 05 fixtures
pnpm lesson 05 before   # without compaction
pnpm lesson 05 after    # with compaction at 75% of the context limit
```

## What to watch for

- The token count right after each compaction.
- Whether `sandbox/summary.txt` is actually written at the end.
- What your summary says about the work already done, and whether the agent repeats it.
  A healthy token count does not prove the agent still knows where it is.

## Check your work

```bash
pnpm lesson 05 fixtures --solution
pnpm lesson 05 after --solution
diff -r lessons/05-context-compaction/problem lessons/05-context-compaction/solution
```

Author's write-up: [`solution/WRITEUP.md`](solution/WRITEUP.md). The reference
implementation has a documented failure; see `docs/incidents.md`, Incident 6.
