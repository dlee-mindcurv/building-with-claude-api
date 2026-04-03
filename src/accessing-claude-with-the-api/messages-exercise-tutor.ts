import type { MessageParam } from "@anthropic-ai/sdk/resources";
import { chat, add_message } from "./core";
import * as readline from "readline";

const messages: MessageParam[] = [];
const system_prompt = `
	You are a patient math tutor. \n
	Do not directly answer a stu dent's questions. \n
	Guide them to a solution step by step.
	`;

async function interactiveChat() {
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});

	const prompt = (query: string): Promise<string> => {
		return new Promise((resolve) => {
			rl.question(query, resolve);
		});
	};

	console.log('Welcome to Claude Chat! Type "exit" to quit.\n');

	while (true) {
		const userInput = await prompt("You: ");

		if (userInput.trim().toLowerCase() === "exit") {
			console.log("Goodbye!");
			rl.close();
			break;
		}

		if (userInput.trim()) {
			add_message(messages, userInput);
			const response = await chat(messages, system_prompt);
			add_message(messages, response, "assistant");
		}
	}
}

interactiveChat();
