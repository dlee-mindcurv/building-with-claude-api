import dotenv from "dotenv";
import path from "path";
import {Anthropic} from "@anthropic-ai/sdk";

dotenv.config({ path: path.resolve(import.meta.dirname, "../../.env") });

// define client
export const client = new Anthropic();
export const model = "claude-sonnet-4-6"
