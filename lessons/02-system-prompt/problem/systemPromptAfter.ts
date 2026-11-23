import 'dotenv/config';
import Anthropic from '@anthropic-ai/sdk';
import { runWithSystemPrompt } from './runLoop.js';

const client = new Anthropic();

// TODO: write a system prompt that pushes the agent the opposite way from
// systemPromptBefore.ts: act directly, without asking for confirmation or explaining
// first. Keep the task and tools unchanged; only this string should differ.
const AUTONOMOUS_PROMPT: string = '';
if (!AUTONOMOUS_PROMPT) throw new Error('TODO: write AUTONOMOUS_PROMPT in systemPromptAfter.ts');

runWithSystemPrompt(client, AUTONOMOUS_PROMPT, 'AUTONOMOUS');
