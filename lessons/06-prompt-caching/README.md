# 06 — Prompt caching

Cache a large, repeated prefix with `cache_control`, and measure what invalidates it.

- **Prerequisites**: lesson 05.

## Goal

Lesson 05 showed that the history grows with every tool call. Prompt caching deals with
the cost side of that growth: every request re-sends the same prefix and pays for it again.
Caching is a prefix match over `tools` → `system` → `messages`. The usage fields
`cache_creation_input_tokens` and `cache_read_input_tokens` show whether a request wrote
to the cache, read from it, or missed it.

## Your task

Work in `problem/`:

1. Generate the fixture: `pnpm lesson 06 fixtures`. This writes a deterministic knowledge
   base of about 140 KB to `problem/sandbox/`.
2. Hypothesis in `NOTEBOOK.md`, then `pnpm lesson 06 before`: three identical requests
   without caching.
3. `promptCachingAfter.ts`: put a cache breakpoint on the system block when
   `options.cacheControl` is true.
4. Hypothesis, then `pnpm lesson 06 after`, then conclusions. The after script also
   changes one character, adds a tool, and drops `cache_control`, to see which change
   invalidates the cache.

## Run

```bash
pnpm lesson 06 fixtures
pnpm lesson 06 before   # no cache_control
pnpm lesson 06 after    # cache_control + invalidation tests
```

## What to watch for

- The cache usage fields and latency on the first request compared with later ones.
- Which of the invalidation variants still read from the cache, and why.
- The minimum cacheable prefix for the model. A shorter prefix is silently not cached.

## Check your work

```bash
pnpm lesson 06 fixtures --solution
pnpm lesson 06 after --solution
diff -r lessons/06-prompt-caching/problem lessons/06-prompt-caching/solution
```

Author's write-up: [`solution/WRITEUP.md`](solution/WRITEUP.md).

## Reference

- [Prompt caching](https://docs.claude.com/en/docs/build-with-claude/prompt-caching)
