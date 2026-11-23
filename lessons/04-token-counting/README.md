# 04 — Token counting and context window limits

Count the tokens in an agent's history two ways, then see what happens when the history
outgrows the context window.

- **Prerequisites**: lesson 03.
- **Cost**: the agent reads about 1.5 MB of generated logs. Check the
  [pricing](https://docs.claude.com/en/docs/about-claude/pricing) for the model in the
  scripts before you run.

## Goal

Compare a cheap local estimate (about 4 characters per token) with the exact count from
`client.messages.countTokens()`. Then give the agent a task big enough to push the history
past the model's context window, and see how the loop behaves.

## Your task

Work in `problem/`:

1. Generate the fixtures: `pnpm lesson 04 fixtures`. This writes three large log files
   to `problem/sandbox/`; they are git-ignored.
2. Hypothesis in `NOTEBOOK.md`, then `pnpm lesson 04 before`. Each iteration logs the
   estimated and the exact token count, and nothing acts on either number.
3. `tokenCountingAfter.ts`: act on the exact count. Stop the loop before `create()` when
   it is over `CONTEXT_LIMIT`.
4. Hypothesis, then `pnpm lesson 04 after`, then conclusions.

## Run

```bash
pnpm lesson 04 fixtures
pnpm lesson 04 before   # counts logged, never acted on
pnpm lesson 04 after    # guard before create()
```

## What to watch for

- How far the estimate is from the real count, and whether the gap depends on the kind of
  content.
- How fast the history grows when the agent reads several files in one step.
- What exactly happens when a request is over the limit, and what work survives.

## Check your work

```bash
pnpm lesson 04 fixtures --solution
pnpm lesson 04 after --solution
diff -r lessons/04-token-counting/problem lessons/04-token-counting/solution
```

Author's write-up: [`solution/WRITEUP.md`](solution/WRITEUP.md).

## Reference

- [Token counting](https://docs.claude.com/en/docs/build-with-claude/token-counting)
- [Context windows](https://docs.claude.com/en/docs/build-with-claude/context-windows)
