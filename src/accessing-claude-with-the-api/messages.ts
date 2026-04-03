// define conversation or empty list of messages
import type { MessageParam } from "@anthropic-ai/sdk/resources";
import { add_message, chat } from "./core";

const messages: MessageParam[] = [];

add_message(messages, "Define quantum computing in one sentence");

const answer = await chat(messages, "");

add_message(messages, answer, "assistant");

add_message(messages, "Write another sentence");

const finalAnswer = await chat(messages, "");

console.log(finalAnswer);
console.log(messages);
