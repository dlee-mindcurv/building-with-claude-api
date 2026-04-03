import type { MessageParam } from "@anthropic-ai/sdk/resources";
import { add_message, chat } from "./core";

const messages: MessageParam[] = [];

const prompt = `
Generate three different samples of AWS CLI commands.  .
The output should meet the following parameters:
1. Each command should be very short
2. No markdown fences or wrappers
3. No comments or explanations
5. Remove all line breaks and concantenate the three commands as one body of text
`;

add_message(messages, prompt);

const answer = await chat(messages);

console.log(answer);
