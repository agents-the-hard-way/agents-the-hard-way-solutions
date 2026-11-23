# 02 — System prompt as a behavior lever

Build your first full tool-use loop, then run the same task under two different system
prompts.

- **Prerequisites**: lesson 01.

## Goal

Show that the same tools and the same user prompt can lead to different **decisions**,
not only different wording, depending only on the `system` field sent with the request.

Lesson 01 never executed a tool call. Here the agent really reads and writes files, so
this lesson also introduces `executeTool.ts` and two guards: `isPathSafe` (`security.ts`)
keeps paths inside the lesson folder, and `isProtectedFile` (`protectedFiles.ts`) refuses
`.env` and similar files. Why there are two separate guards is in
[`docs/incidents.md`](../../docs/incidents.md).

## Your task

Work in `problem/`:

1. `runLoop.ts`: close the loop. After the model asks for tools, run each call through
   `executeTool()` and send the results back as `tool_result` blocks. Until you do, the
   loop stops after the first tool request.
2. Write your first hypothesis in `NOTEBOOK.md`, then run `pnpm lesson 02 before`
   (cautious system prompt).
3. `systemPromptAfter.ts`: write an autonomous system prompt (act directly, no
   confirmation, no explanations). Hypothesis first, then `pnpm lesson 02 after`.
4. Write your conclusions.

The task is "read `sandbox/notes.txt`, write a summary to `sandbox/summary.txt`". The
summary file is created when you run the lesson and is not committed.

## Run

```bash
pnpm lesson 02 before   # cautious, explain-first system prompt
pnpm lesson 02 after    # autonomous, act-without-asking system prompt
```

## What to watch for

- Which tools each variant calls, and in what order.
- How much text comes before each tool call.
- How many iterations each needs to finish the same task.
- How you would expect each prompt to behave on a vaguer task, such as
  "clean up this directory". Lesson 03 tests exactly that.

## Check your work

```bash
pnpm lesson 02 after --solution
diff -r lessons/02-system-prompt/problem lessons/02-system-prompt/solution
```

Author's write-up: [`solution/WRITEUP.md`](solution/WRITEUP.md).

## Reference

- [Tool use overview](https://docs.claude.com/en/docs/agents-and-tools/tool-use/overview)
- [System prompts](https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/system-prompts)
