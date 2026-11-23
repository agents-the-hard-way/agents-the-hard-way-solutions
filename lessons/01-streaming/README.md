# 01 — Token-level streaming

Send the same request to Claude twice, with `messages.create()` and with
`messages.stream()`, and compare how the response arrives.

- **Prerequisites**: [00 — Setup](../00-setup/README.md).
- **Cost**: well under one US cent.
- **Time**: about 30 minutes.

## Goal

Claude does not produce a response all at once. It generates it token by token, and a
tool call's arguments are generated the same way: as fragments of JSON. `messages.create()`
does that same work internally and only returns once it is finished. This lesson makes
the difference visible.

## Your task

Work in `problem/`:

1. Read `streamingBefore.ts`, `streamingAfter.ts` and `tools.ts`. Both scripts send the
   same prompt, model and tools; only the SDK call differs.
2. Write your first hypothesis in `problem/NOTEBOOK.md`, then run `pnpm lesson 01 before`.
3. Write the second hypothesis, then fill in the `TODO` in `streamingAfter.ts` and run
   `pnpm lesson 01 after`.
4. Write your conclusions.

The prompt only mentions `sandbox/notes.txt`. Neither script executes the tool call; they
print what Claude sends back.

## Run

```bash
pnpm lesson 01 before   # client.messages.create()
pnpm lesson 01 after    # client.messages.stream()
```

## What to watch for

- When does the first output appear in each run?
- How do the tool call's arguments arrive in the streamed run?
- How does what `finalMessage()` returns compare with the `create()` result?

## Check your work

```bash
pnpm lesson 01 after --solution
diff -r lessons/01-streaming/problem lessons/01-streaming/solution
```

The author's hypotheses, results and conclusions are in
[`solution/WRITEUP.md`](solution/WRITEUP.md).

## Reference

- [Streaming messages](https://docs.claude.com/en/docs/build-with-claude/streaming)
