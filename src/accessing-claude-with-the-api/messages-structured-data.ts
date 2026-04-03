/**
 * Notes: Prefilling assistant messages is no longer supported
 * with later models now respond with a 400 error
 */

import type { MessageParam } from "@anthropic-ai/sdk/resources";
import { add_message, chat } from "./core";

const messages: MessageParam[] = [];

add_message(
	messages,
	`
Generate a very short event bridge as raw JSON
Return only valid JSON
Do not wrap it in markdown fences
`,
);

const answer = await chat(messages, "", 1);

console.log(answer);
