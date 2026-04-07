import type {
	ContentBlockParam,
	MessageParam,
	ToolResultBlockParam,
	ToolUnion,
	ToolUseBlock,
} from "@anthropic-ai/sdk/resources";
import { client, model } from "../accessing-claude-with-the-api/sdk";
import {
	add_duration_to_datetime,
	add_duration_to_datetime_schema,
	get_current_datetime,
	get_current_datetime_schema,
} from "./datetime-tool";

export function add_user_message(
	messages: MessageParam[],
	message: MessageParam | MessageParam[],
) {
	if (Array.isArray(message)) {
		messages.push(...message);
	} else {
		messages.push(message);
	}
}

export function add_assistant_message(
	messages: MessageParam[],
	message: MessageParam,
) {
	messages.push({ role: "assistant", content: message.content });
}

export async function chat(
	messages: MessageParam[],
	system: string = "",
	temperature: number = 1.0,
	tools: ToolUnion[],
) {
	const params = {
		model,
		max_tokens: 1000,
		messages: messages,
		temperature,
		...(system ? { system } : {}),
		...(tools ? { tools } : {}),
	};

	return client.messages.create(params);
}

export function text_from_message(message: MessageParam) {
	if (typeof message.content === "string") {
		return message.content;
	}

	return message.content
		.filter((block) => block.type === "text")
		.map((block) => (block.type === "text" ? block.text : ""))
		.join("\n");
}

function run_tool({ name, input, id }: ToolUseBlock): ToolResultBlockParam {
	try {
		if (name === "get_current_datetime") {
			const result_value = get_current_datetime(input.date_format);
			return {
				tool_use_id: id,
				type: "tool_result",
				content: JSON.stringify(result_value),
				is_error: false,
			};
		}
		if (name === "add_duration_to_datetime") {
			const result_value = add_duration_to_datetime(
				input.datetime,
				input.duration,
				input.unit,
			);
			return {
				tool_use_id: id,
				type: "tool_result",
				content: JSON.stringify(result_value),
				is_error: false,
			};
		} else {
			return {
				type: "tool_result",
				tool_use_id: id,
				is_error: true,
				content: "Tool is undefined or unavailable",
			};
		}
	} catch (err) {
		return {
			tool_use_id: id,
			type: "tool_result",
			content: `Error: ${err}`,
			is_error: true,
		};
	}
}

function run_tools(tool_requests: ToolUseBlock[]) {
	const tool_results: ToolResultBlockParam[] = [];
	for (const tool of tool_requests) {
		if (tool) {
			console.log("TOOL: ", JSON.stringify(tool, null, 2));

			const result = run_tool(tool);
			tool_results.push(result);
		}
	}

	return tool_results;
}

export async function run_conversation(messages: MessageParam[]) {
	while (true) {
		const response = await chat(messages, "", 1, [
			get_current_datetime_schema,
			add_duration_to_datetime_schema,
		]);

		add_assistant_message(messages, response);

		// if the stop reason is not "tool_use, break out of the while loop  (this also includes "end_turn")
		if (response.stop_reason !== "tool_use") {
			break;
		}

		// if the stop reason is of "tool_use", then run a function that takes the respons and loops through all the  tool_use items

		const tool_results = run_tools(
			response.content.filter((block) => block?.type === "tool_use"),
		);

		add_user_message(messages, {
			role: "user",
			content: tool_results,
		} as MessageParam);
	}
	return messages;
}
