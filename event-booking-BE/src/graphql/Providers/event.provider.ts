import { Event, User } from "../../Models";
import { CreateEventType, Event as EventType } from "../../Utils/customTypes";

export default class EventService{
    public static async getEvents():Promise<EventType[]>{
        return await Event.find();
    }

    public static async createEvent(args: CreateEventType):Promise<EventType>{
        const { title, description, price } = args.eventInput;
		const userId = "66976bed1a50995987b4b448";

		const event = await Event.create({
			title,
			description,
			price,
			creator: userId,
		});

		await event.populate({
            path:'creator',
            populate:{
                path:'createdEvents'
            }
        })

        await User.findByIdAndUpdate(userId, {
            $push: { createdEvents: event._id },
        });

        return event.toObject();
    }

}