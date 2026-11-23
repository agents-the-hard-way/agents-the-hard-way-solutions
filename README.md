# Agents the Hard Way

Build Claude tool-use agents by hand on the raw Messages API, without the Agent SDK or any
framework. Each lesson isolates one mechanism (streaming, the tool loop, guards, tokens,
compaction, caching), and you run a naive version and an improved one side by side.

You write the code. Every lesson has a `problem/` folder with `TODO`s for you and a
`solution/` folder with the finished reference and the author's write-up of real runs,
including the ones that failed.

## Start

```bash
git clone https://github.com/agents-the-hard-way/agents-the-hard-way
cd agents-the-hard-way
pnpm install
cp .env.example .env    # add your ANTHROPIC_API_KEY
pnpm lesson 01 before
```

Requirements and the full workflow are in [lesson 00 — Setup](lessons/00-setup/README.md).
You can also open the repository in GitHub Codespaces.

## Lessons

Work through them in order. Each one assumes the earlier ones, even though every folder
runs on its own.

| # | Lesson | Mechanism |
|---|---|---|
| 00 | [Setup](lessons/00-setup/README.md) | API key, `pnpm lesson`, how a lesson works |
| 01 | [Token-level streaming](lessons/01-streaming/README.md) | `messages.create()` vs `messages.stream()` |
| 02 | [System prompt as a behavior lever](lessons/02-system-prompt/README.md) | the tool-use loop; same task, two system prompts |
| 03 | [Safe reproduction of a destructive incident](lessons/03-sandbox-incident/README.md) | `isPathSafe` + `isProtectedFile` |
| 04 | [Token counting and context window limits](lessons/04-token-counting/README.md) | `countTokens()`, hitting the context limit |
| 05 | [Proactive context compaction](lessons/05-context-compaction/README.md) | summarizing history before the limit |
| 06 | [Prompt caching](lessons/06-prompt-caching/README.md) | `cache_control` and what invalidates it |

Planned extensions below the API level (local models, raw MCP, sandboxing and more) are
listed in [`tracks/`](tracks/README.md).

## Repository layout

```
lessons/NN-<slug>/
├── README.md        the task
├── problem/         you work here: TODOs, NOTEBOOK.md, sandbox/
└── solution/        reference code, WRITEUP.md, sandbox/
lessons/TEMPLATE/    starting point for a new lesson
tracks/              planned deep-dive tracks
docs/incidents.md    dangerous agent behavior observed while building this course
docs/plan/           specs written before any code exists
scripts/lesson.ts    the `pnpm lesson` runner
```

Every `problem/` and `solution/` folder is self-contained: it imports nothing from outside
itself and runs with itself as the working directory. There is no shared agent loop to
import; each lesson carries its own copy of the helpers it needs.

## Commands

| Command | What it does |
|---|---|
| `pnpm lesson` | list lessons |
| `pnpm lesson NN fixtures` | generate a lesson's sandbox files |
| `pnpm lesson NN before` / `after` | run `problem/*Before.ts` / `problem/*After.ts` |
| `... --solution` | run the reference solution instead |
| `pnpm check` | format and lint with Biome, applying fixes |
| `pnpm verify` | Biome in CI mode plus a type check of every lesson; this is what CI runs |

## Safety

Lessons that give the agent file access guard it with two independent layers, each
lesson with its own copy. `isPathSafe` keeps paths inside the lesson folder, and
`isProtectedFile` refuses `.env` and similar files whatever the path or letter case. Both
were hardened after real incidents, described in
[`docs/incidents.md`](docs/incidents.md). Destructive experiments only ever run against a
lesson's own `sandbox/`.

## AI assistants

See [`AGENTS.md`](AGENTS.md) before asking an assistant to help with this repository.
