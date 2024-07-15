import express, { Express } from "express";
import dotenv from "dotenv";
dotenv.config();
import bodyParser from "body-parser";
import { createHandler } from "graphql-http/lib/use/express";
import { buildSchema } from "graphql";
import type { Event as EventType, CreateEventType } from "./Utils/customTypes";
import { Event } from "./Models";
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
			}

			schema{
				query:RootQuery
				mutation:RootMutation
			}	
			
		`),
		rootValue: {
			events: async (): Promise<EventType[]> => {
				return Event.find();
			},
			createEvent: async (args: CreateEventType): Promise<EventType> => {
				const { title, description, price } = args.eventInput;

				const event = await Event.create({
					title,
					description,
					price,
				});

				return event;
			},
		},
	})
);

app.listen(port, () => {
	console.log(`Server is now running at http://localhost:${port}`);
	connectToDB();
});
