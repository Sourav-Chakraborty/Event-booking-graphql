import { Document, Schema, model } from "mongoose";
import type { User as UserTypes } from "../Utils/customTypes";

const userSchema = new Schema(
	{
		email: {
			type: String,
			require: true,
			unique: true,
		},
		password: {
			type: String,
			require: true,
		},
		createdEvents: [
			{
				type: Schema.Types.ObjectId,
				ref: "Event",
				default: [],
			},
		],
	},
	{ timestamps: true }
);

class User {}

userSchema.loadClass(User);

export default model<UserTypes & Document>("User", userSchema);
