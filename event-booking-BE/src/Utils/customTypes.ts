export type Event = {
	// _id: string;
	title: string;
	description: string;
	price: string;
};

export type CreateEventType = { eventInput: Omit<Event, "_id" | "date"> };
