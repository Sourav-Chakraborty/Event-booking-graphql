import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { createHandler } from "graphql-http/lib/use/express";
import { buildSchema } from "graphql";
import type { Event, CreateEventType } from "./Utils/customTypes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
const events: Event[] = [];

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
			events: (): Event[] => events,
			createEvent: (args: CreateEventType): Event => {
				const { title, description, price } = args.eventInput;

				const event = {
					_id: Math.random().toString(),
					title,
					description,
					price,
					date: new Date().toISOString(),
				};

				events.push(event);
				return event;
			},
		},
	})
);

app.listen(port, () => {
	console.log(`Server is now running at http://localhost:${port}`);
});
