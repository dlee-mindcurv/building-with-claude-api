/**
 * Temperature adjusts the embedded weights for a token by a percentage to allow for deviations of creativity.
 *  The 0 - being most deterministic, and 1 - being most creative.
 *  For output that needs to be consistent all the time, use values as close to zero as possible
 *  For output where you want the model to explore options, use closer to 1
 */
// With temperature
import type { MessageParam } from "@anthropic-ai/sdk/resources";
import { add_message, chat } from "./core";

const messages_movie: MessageParam[] = [];

add_message(messages_movie, `Generate a one sentence movie idea about dogs`);

const answer_movie = await chat(messages_movie, "", 0);

console.log(answer_movie);
