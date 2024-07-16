export type Event = {
	title: string;
	description: string;
	price: number;
	creator: string;
};

export type User = {
	email: string;
	password: string;
	createdEvents: Event[];
};

export type UserType = Omit<User, "password">;

export type CreateEventType = { eventInput: Event };
export type CreateUserType = {
	userInput: Omit<User, "createdEvents">;
};
