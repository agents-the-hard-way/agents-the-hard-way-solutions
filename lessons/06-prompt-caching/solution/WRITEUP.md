# 06 — Prompt Caching

> Author's write-up and answer key for this lesson. Read it after you have filled in
> `../problem/NOTEBOOK.md` yourself. Hypotheses here were written before each run and
> results are real output. Runs recorded before the problem/solution split used prompts
> with repo-root paths (`lessons/NN-…/sandbox/…`) instead of `sandbox/…`.

**Files:** `promptCachingBefore.ts` (no `cache_control`, baseline), `promptCachingAfter.ts`
(`cache_control` on the system block, plus invalidation tests) — this folder.
**Helper:** `generateFixtures.ts` (writes `sandbox/knowledge-base.txt`, about 140 KB, deterministic).

## Goal

Lesson 05 showed that the history grows with every tool call and has to be compacted before it
hits the context limit. Prompt caching addresses the cost side of the same growth: each request
re-sends the same prefix and pays for it again. This lesson checks how `cache_control` behaves on
the raw Messages API. Caching is a prefix match over `tools` → `system` → `messages`, and the
usage counters `cache_creation_input_tokens` and `cache_read_input_tokens` show whether a request
wrote to the cache, read from it, or missed. The output is a table of what invalidates the cache,
built from measured numbers.

## Prerequisites

- `ANTHROPIC_API_KEY` set (see `.env.example`).
- Fixtures generated into this lesson's own `sandbox/` (the generated file is gitignored):

  ```bash
  pnpm lesson 06 fixtures --solution
  ```

- Minimum cacheable prefix for `claude-haiku-4-5-20251001` is **4096 tokens**, per the minimum table
  in Anthropic's prompt caching docs. A shorter prefix is not cached and returns no error, just
  `cache_creation_input_tokens: 0`. The fixture is roughly 140 KB of English prose, which is well
  above that minimum, so the minimum is not the limiting factor in this lesson.

## Run

```bash
pnpm lesson 06 before --solution   # no cache_control — baseline
pnpm lesson 06 after --solution    # cache_control on the system block + invalidation tests
```

Both run the same knowledge base and the same user question. The only thing that differs is
whether `cache_control` is sent, plus the invalidation steps in the After variant.

## Before (before/naive/unguarded — `promptCachingBefore.ts`)

Hypothesis — write this **before** you run anything, not after:

- What you expect to happen
- What you're specifically watching for in the output

## After (before/naive/unguarded — `promptCachingBefore.ts`)

What actually happened. Real output, real numbers — never invented ones.

## Before (after — `promptCachingAfter.ts`)

Hypothesis for the fixed/guarded/optimized variant, written before running it — usually "this
should no longer reproduce the failure above" plus what specifically should differ in the output.

## After (after — `promptCachingAfter.ts`)

Real, observed output for the fixed/guarded/optimized variant — never invented. Say plainly if it
only partially fixes the problem, or fixes it in a way that introduces a new, different gap.

## Conclusions

What this proves or disproves, comparing both runs directly. Numbered list preferred — easier to
carry forward into later lessons.

## Next

What this motivates for the next lesson, if anything. Delete this section if there's no clear
follow-up.
