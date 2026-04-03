import { add_message, chat } from "./core";
import type { MessageParam } from "@anthropic-ai/sdk/resources";
import { client } from "./sdk";

const messages_code: MessageParam[] = [];

add_message(
	messages_code,
	"Write a python function that checks a string for duplicate characters",
);

const systemPrompt = `
	You are an experienced python developer.  For all code generated:
	1. Do not include any comments
	2. Do not include any examples, or validation examples
	3. Outputted code is minified and compressed
`;

const answer = await chat(messages_code, systemPrompt);
console.log(answer);
