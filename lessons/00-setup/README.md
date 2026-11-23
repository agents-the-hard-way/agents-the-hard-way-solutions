# 00 — Setup

## What you need

- Node.js 22 or newer.
- pnpm. `corepack enable` turns it on; the version is pinned in `package.json`.
- Your own [Anthropic API key](https://console.anthropic.com/settings/keys). Every lesson
  calls the real API and you pay for what it uses. Each lesson's README says when a run
  is expensive.

## Local

```bash
git clone https://github.com/agents-the-hard-way/agents-the-hard-way
cd agents-the-hard-way
pnpm install
cp .env.example .env    # put your key after ANTHROPIC_API_KEY=
pnpm lesson 01 before
```

`.env` is git-ignored, so your key stays on your machine.

## GitHub Codespaces

Fork the repository and open it in a Codespace. The dev container installs
dependencies and asks for an `ANTHROPIC_API_KEY` secret, so you do not need a `.env` file
there.

## How a lesson works

Every lesson folder looks like this:

```
lessons/NN-<slug>/
├── README.md       the task: goal, steps, what to watch for
├── problem/        you work here
│   ├── NOTEBOOK.md your hypotheses, results and conclusions
│   ├── *Before.ts  the naive baseline, ready to run
│   ├── *After.ts   the improved version, with TODOs to fill in
│   └── sandbox/    disposable files the agent may read and damage
└── solution/       the answer key: the same files, finished, plus WRITEUP.md
```

The loop is always the same:

1. Read the lesson's `README.md`.
2. Write a hypothesis in `problem/NOTEBOOK.md` **before** each run.
3. Run `pnpm lesson NN before`, fill in the `TODO`s, run `pnpm lesson NN after`.
4. Write down what really happened and your conclusions.
5. Only then compare with `solution/` and `solution/WRITEUP.md`.

## The `pnpm lesson` command

```bash
pnpm lesson                         # list lessons
pnpm lesson 04 fixtures             # generate the lesson's sandbox files, if it has any
pnpm lesson 04 before               # run problem/*Before.ts
pnpm lesson 04 after                # run problem/*After.ts
pnpm lesson 04 after --solution     # run the reference solution instead
```

A script runs with its own `problem/` or `solution/` folder as the working directory. The
agent's file tools therefore see only that folder and its `sandbox/`, and never the
repository root or your `.env`.

## Resetting a sandbox

Some lessons let the agent overwrite files in `sandbox/`. That is intended. Restore the
committed versions with:

```bash
git checkout -- lessons/NN-<slug>/problem/sandbox
```

## Working with an AI assistant

You can ask an assistant such as Claude Code to guide you through a lesson. It should
explain and give hints, not write the `TODO`s for you or show you `solution/`. The rules
it follows are in [`AGENTS.md`](../../AGENTS.md).
