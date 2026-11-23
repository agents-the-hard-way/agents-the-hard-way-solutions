# Deep-dive tracks (planned)

Extensions to the main curriculum that go below the Claude API and SDK level: local
inference, raw protocols, infrastructure. Full spec:
[`docs/plan/deep-dive-tracks.md`](../docs/plan/deep-dive-tracks.md). Nothing here is
implemented yet.

Each track lesson will live in `tracks/<track>/NN-<slug>/` with the same layout and
requirements as `lessons/NN-<slug>/`: a task `README.md`, a `problem/` folder and a
`solution/` folder with `WRITEUP.md`. See `AGENTS.md`, "Lesson requirements".

| Track | Title | Depends on | Status |
|---|---|---|---|
| O1 | Chat template | Ollama installed | planned |
| O2 | Tokenization & sampling | O1 | planned |
| O3 | KV cache & context window | O1 | planned |
| O4 | Loop portability / provider adapter | Stage 1 loop, O1–O3 | planned |
| T1 | llama.cpp (GGUF, quantization, grammars) | O1 | planned |
| T2 | Raw MCP (JSON-RPC over stdio/HTTP) | Lesson 10 | planned |
| T3 | Sandboxing & process isolation | Stage 1 loop | planned |
| T4 | Observability (OpenTelemetry) | Stage 1 loop | planned |
| T5 | pgvector / embeddings | — (Stage 3–4 project) | planned |
| T6 | Temporal / durable execution | — (Stage 3–4 project) | planned |
| T7 | vLLM (NVIDIA only) | O3 | planned, conditional |

"Stage 1" is the lessons that exist in `lessons/` today. Lesson numbers above 06 and
Stages 2–4 in the spec are placeholders for a curriculum that is not planned in detail yet.
