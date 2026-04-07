import { format, add, parse } from "date-fns";
import type { MessageParam, ToolUnion } from "@anthropic-ai/sdk/resources";

export function get_current_datetime(dateFormat = "yyyy-MM-dd HH:mm:ss") {
	if (!dateFormat) {
		throw new Error("dateFormat cannot be empty");
	}
	return format(new Date(), dateFormat);
}

export const get_current_datetime_schema: ToolUnion = {
	name: "get_current_datetime",
	description:
		"Returns the current date and time as a formatted string. Use this when the user asks for the current time, today's date, or needs a timestamp. Returns the datetime in the specified format (defaults to 'YYYY-MM-DD HH:MM:SS').",
	input_schema: {
		type: "object",
		properties: {
			date_format: {
				type: "string",
				description:
					"A date-fns format string controlling the output format. Common examples: 'yyyy-MM-dd' (date only), 'HH:mm:ss' (time only), 'MMMM dd, yyyy' (e.g. 'January 15, 2026'). Must not be empty.",
				default: "yyyy-MM-dd HH:mm:ss",
			},
		},
		required: [],
	},
};

export function add_duration_to_datetime(
	datetime: string,
	duration: number,
	unit: "years" | "months" | "weeks" | "days" | "hours" | "minutes" | "seconds",
	inputFormat = "yyyy-MM-dd HH:mm:ss",
	outputFormat = "yyyy-MM-dd HH:mm:ss",
) {
	if (!datetime) {
		throw new Error("datetime cannot be empty");
	}
	if (duration === undefined || duration === null) {
		throw new Error("duration is required");
	}
	if (!unit) {
		throw new Error("unit cannot be empty");
	}

	const parsedDate = parse(datetime, inputFormat, new Date());
	const newDate = add(parsedDate, { [unit]: duration });
	return format(newDate, outputFormat);
}

export const add_duration_to_datetime_schema: ToolUnion = {
	name: "add_duration_to_datetime",
	description:
		"Adds a duration to a given datetime and returns the result as a formatted string. Use this when the user needs to calculate a future or past date/time by adding or subtracting a duration (e.g., 'add 3 days to 2024-01-15', 'subtract 2 hours from now').",
	input_schema: {
		type: "object",
		properties: {
			datetime: {
				type: "string",
				description:
					"The input datetime string to add duration to. Should match the input_format parameter.",
			},
			duration: {
				type: "number",
				description:
					"The amount of time to add (positive) or subtract (negative). Can be an integer or decimal.",
			},
			unit: {
				type: "string",
				enum: [
					"years",
					"months",
					"weeks",
					"days",
					"hours",
					"minutes",
					"seconds",
				],
				description: "The unit of time for the duration.",
			},
			input_format: {
				type: "string",
				description:
					"A date-fns format string for parsing the input datetime. Must match the format of the datetime parameter.",
				default: "yyyy-MM-dd HH:mm:ss",
			},
			output_format: {
				type: "string",
				description:
					"A date-fns format string controlling the output format. Common examples: 'yyyy-MM-dd' (date only), 'HH:mm:ss' (time only), 'MMMM dd, yyyy' (e.g. 'January 15, 2026').",
				default: "yyyy-MM-dd HH:mm:ss",
			},
		},
		required: ["datetime", "duration", "unit"],
	},
};
