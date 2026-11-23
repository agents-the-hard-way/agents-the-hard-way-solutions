import type Anthropic from '@anthropic-ai/sdk';
import { tools } from './tools.js';

export async function runWithSystemPrompt(client: Anthropic, systemPrompt: string, label: string) {
  console.log(`\n=== ${label} ===`);

  const messages: Anthropic.MessageParam[] = [
    {
      role: 'user',
      content: 'Read sandbox/notes.txt and write a summary to sandbox/summary.txt.',
    },
  ];

  for (let i = 0; i < 5; i++) {
    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1024,
      system: systemPrompt,
      tools,
      messages,
    });

    console.log(`[iteration ${i + 1}] stop_reason: ${response.stop_reason}`);
    for (const block of response.content) {
      if (block.type === 'text') console.log(`  [text]: ${block.text}`);
      if (block.type === 'tool_use')
        console.log(`  [tool_use]: ${block.name}(${JSON.stringify(block.input)})`);
    }

    if (response.stop_reason !== 'tool_use') break;

    messages.push({ role: 'assistant', content: response.content });

    // TODO: close the loop. Run every tool_use block in response.content through
    // executeTool() (import it from './executeTool.js') and collect the results as
    // tool_result blocks, each carrying the tool_use_id of the call it answers.
    const toolResults: Anthropic.ToolResultBlockParam[] = [];
    if (toolResults.length === 0) {
      console.log('  [TODO] no tool results sent back yet; stopping the loop here.');
      break;
    }
    messages.push({ role: 'user', content: toolResults });
  }
}
