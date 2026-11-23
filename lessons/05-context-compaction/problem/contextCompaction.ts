import type Anthropic from '@anthropic-ai/sdk';

// TODO: implement proactive compaction. Replace the whole history with a single user
// message that the agent can continue from:
//   1. Serialize `messages` into a transcript. If it is too large to send in one request
//      itself, cut it down first (and think about which end of it the agent still needs).
//   2. Ask `model` (via client.messages.create) for a summary of what has been done so far
//      and what is left to do.
//   3. Return [{ role: 'user', content: originalTaskText + the summary + "continue" }].
// Until then this returns the history unchanged, so the loop runs as if there were no
// compaction at all.
export async function compactHistory(
  client: Anthropic,
  model: string,
  originalTaskText: string,
  messages: Anthropic.MessageParam[],
): Promise<Anthropic.MessageParam[]> {
  console.log('  [compaction] TODO: compactHistory() is not implemented, history unchanged');
  void client;
  void model;
  void originalTaskText;
  return messages;
}
