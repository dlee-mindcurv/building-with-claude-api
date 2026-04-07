import { client } from "../accessing-claude-with-the-api/sdk";

import type { MessageParam, ToolUnion } from "@anthropic-ai/sdk/resources";
import {
	get_current_datetime,
	get_current_datetime_schema,
} from "./datetime-tool";
import {
	add_assistant_message,
	add_user_message,
	run_conversation,
} from "./helpers";

const messages: MessageParam[] = [];

// Add original user message
// add_user_message(messages, {
// 	role: "user",
// 	content: "What is the exact time, formatted as HH:MM:SS?",
// });
//
// const response = await client.messages.create({
// 	model: "claude-haiku-4-5",
// 	max_tokens: 1000,
// 	messages,
// 	tools: [get_current_datetime_schema],
// });
//
// const tool_use_block = response.content[0];
//
// // Claude runs the message and determines that a tool (which we have referenced) can be used to retrieve theiformation
// add_assistant_message(messages, {
// 	role: "assistant",
// 	content: [response.content[0]],
// });
//
// // Using the information from the tool use response output, we call the function to get the result
// const result = get_current_datetime(tool_use_block.input.date_format);
//
// // console.log("RESULT", result);
//
// // We then formulate a tool use result object to send back to claude
// const tool_use_result_block: MessageParam = {
// 	role: "user",
// 	content: [
// 		{
// 			type: "tool_result",
// 			tool_use_id: tool_use_block.id,
// 			content: result,
// 			is_error: false,
// 		},
// 	],
// };
//
// add_user_message(messages, tool_use_result_block);
//
// // feed this appended messages now back into the claude client
//
// const responseAmmended = await client.messages.create({
// 	model: "claude-haiku-4-5",
// 	max_tokens: 1000,
// 	messages,
// 	tools: [get_current_datetime_schema],
// });
//
// console.log(
// 	"responseAmmended:",
// 	JSON.stringify(responseAmmended.content, null, 2),
// );

// add_user_message(messages, {
// 	role: "user",
// 	content: "What is the exact time, formatted as HH:MM:SS?",
// });

add_user_message(messages, {
	role: "user",
	content: "What is the exact date and time, 2 weeks from today?",
});
const response = await run_conversation(messages);

console.log(JSON.stringify(response, null, 2));
