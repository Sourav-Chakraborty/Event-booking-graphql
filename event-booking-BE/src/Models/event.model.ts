import { Schema, model, Document } from "mongoose";
import { Event } from "../Utils/customTypes";

const eventSchema = new Schema(
	{
		title: {
			type: String,
			require: true,
		},
		description: {
			type: String,
			require: true,
		},
		price: {
			type: Number,
			require: true,
		},
		creator: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
	},
	{ timestamps: true }
);

const Event = model<Event & Document>("Event", eventSchema);

export default Event;
