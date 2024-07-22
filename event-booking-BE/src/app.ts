import express, { Express } from "express";
import dotenv from "dotenv";
dotenv.config();
import bodyParser from "body-parser";
import { createHandler } from "graphql-http/lib/use/express";
import schema from "./graphql/schema";
import type {
	CreateEventType,
	CreateUserType,
	UserType,
} from "./Utils/customTypes";
import connectToDB from "./Utils/connectToDB";
import EventService from "./graphql/Providers/event.provider";
import UserService from "./graphql/Providers/user.provider";

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.all(
	"/graphql",
	createHandler({
		schema ,
		rootValue: {
			events: EventService.getEvents(),
			createEvent:(args:CreateEventType)=> EventService.createEvent(args),
			createUser:(args: CreateUserType): Promise<UserType> => UserService.createUser(args) 
		}
	})
);

app.listen(port, () => {
	console.log(`Server is now running at http://localhost:${port}`);
	connectToDB();
});
