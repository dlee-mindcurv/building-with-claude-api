import { client, model } from "./sdk";
import type { MessageParam } from "@anthropic-ai/sdk/resources";

export function add_message(
	messages: MessageParam[],
	text: string,
	role: "user" | "assistant" = "user",
) {
	let user_message: MessageParam = {
		role,
		content: text,
	};
	messages.push(user_message);
	return messages;
}

export async function chat(
	messages: MessageParam[],
	system: string = "",
	temperature: number = 1.0,
) {
	const params = {
		model,
		max_tokens: 1000,
		messages: messages,
		temperature,
		...(system ? { system } : {}),
	};

	const message = await client.messages.create(params);
	let block = message.content[0];
	block = message.content[0];

	if (block?.type === "text") {
		return block.text;
	}

	return "";
}
