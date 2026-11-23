# NN — <Lesson title>

One sentence: what the learner does in this lesson.

- **Prerequisites**: lesson NN-1, plus anything else that must already be set up.
- **Cost**: include this line when a run costs more than a few cents.

## Goal

What this lesson investigates or builds, and why. Usually motivated by a gap or open
question left by the previous lesson. No results here: they belong in
`solution/WRITEUP.md`.

## Your task

Work in `problem/`:

1. Generate fixtures, if the lesson has any: `pnpm lesson NN fixtures`.
2. Hypothesis in `NOTEBOOK.md`, then `pnpm lesson NN before`.
3. Fill in the `TODO` in `<file>.ts`: one sentence on what it must do.
4. Hypothesis, then `pnpm lesson NN after`, then conclusions.

## Run

```bash
pnpm lesson NN before   # naive/unguarded/unoptimized
pnpm lesson NN after    # fix/guard/optimization applied
```

Same task, same loop: only the one thing under test changes between the two runs.

## What to watch for

Questions that point at the interesting part of the output, without giving away the
answer.

## Check your work

```bash
pnpm lesson NN after --solution
diff -r lessons/NN-<slug>/problem lessons/NN-<slug>/solution
```

Author's write-up: [`solution/WRITEUP.md`](solution/WRITEUP.md).

## Reference

- Links to the relevant Claude API docs.
