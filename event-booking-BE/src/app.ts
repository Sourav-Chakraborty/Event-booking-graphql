import express, { Express } from "express";
import dotenv from "dotenv";
dotenv.config();
import bodyParser from "body-parser";
import bcrypt from "bcryptjs";
import { createHandler } from "graphql-http/lib/use/express";
import { buildSchema } from "graphql";
import type {
	Event as EventType,
	CreateEventType,
	CreateUserType,
	UserType,
} from "./Utils/customTypes";
import { Event, User } from "./Models";
import connectToDB from "./Utils/connectToDB";

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.all(
	"/graphql",
	createHandler({
		schema: buildSchema(`

			type Event{
				_id:ID!
				title:String!
				description:String!
				price:Float!
				date:String!
				creator:ID
			}
			
			type User{
				_id:ID!
				email:String!
				password:String
			}
			
			input CreateUserType{
				email:String!
				password:String!
			}
			
			input EventInput{
				title:String!
				description:String!
				price:Float!
			}

			type RootQuery{
				events:[Event!]!		
			}

			type RootMutation{
				createEvent(eventInput:EventInput):Event
				createUser(userInput:CreateUserType):User
			}

			schema{
				query:RootQuery
				mutation:RootMutation
			}	
			
		`),
		rootValue: {
			events: async (): Promise<EventType[]> => {
				return await Event.find();
			},
			createEvent: async (args: CreateEventType): Promise<EventType> => {
				const { title, description, price } = args.eventInput;
				const userId = "6696a6b9d7aec21d6b5361c3";

				const event = await Event.create({
					title,
					description,
					price,
					creator: userId,
				});

				await User.findByIdAndUpdate(userId, {
					$push: { createdEvents: event._id },
				});

				return event.toObject();
			},
			createUser: async (args: CreateUserType): Promise<UserType> => {
				const { email, password } = args.userInput;

				const salt = await bcrypt.genSalt(10);
				const hashedPassword = await bcrypt.hash(password, salt);

				const user = await User.create({
					email,
					password: hashedPassword,
				});

				const { password: userPassword, ...userObjWthoutPass } =
					user.toObject();

				return userObjWthoutPass;
			},
		},
	})
);

app.listen(port, () => {
	console.log(`Server is now running at http://localhost:${port}`);
	connectToDB();
});
