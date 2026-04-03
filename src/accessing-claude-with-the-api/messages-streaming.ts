/**
 * Streaming is a characteristic that gives the requestor an instant response of processing as to improve
 * the experience and interaction between the client and the server.
 *
 * When a request is made the api will respond instantly with some level of progress that can be used to
 * notifiy the user that something is happening
 *
 *
 * When you stream the server returns the status of the messages (chunks)
 *
 * MessageStart - new message sent
 * ContentBlockStart - start of a new Block
 * ContentBlockDelta - Chunks of the actual text
 * ContentBlockStop - The current Content Block that has been completed
 * MessageDelta - The current message is complete
 * MessageStop - End of information about the current message
 *
 *
 */

import type { MessageParam } from "@anthropic-ai/sdk/resources";
import { add_message } from "./core";
import { client } from "./sdk";

const messages: MessageParam[] = [];

add_message(messages, "Write a sentence description of a fake database");

// OLD WAY - uses `create`
// const stream = await client.messages.create({
// 	model: "claude-sonnet-4-6",
// 	max_tokens: 1000,
// 	messages,
// 	stream: true,
// });
//
// for await (const event of stream) {
// 	console.log(event);
// }

// New Way

const stream = client.messages.stream({
	model: "claude-sonnet-4-6",
	max_tokens: 1000,
	messages,
});

for await (const event of stream) {
	if (
		event.type === "content_block_delta" &&
		event.delta.type === "text_delta"
	) {
		// console.log(event.delta.text);
		continue;
	}
}

// final message
console.log(await stream.finalText());
