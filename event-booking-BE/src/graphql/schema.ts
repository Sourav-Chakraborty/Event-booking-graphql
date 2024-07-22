import { buildSchema } from "graphql";

export default buildSchema(`
    type Event{
        _id:ID!
        title:String!
        description:String!
        price:Float!
        date:String!
        creator:User!
        createdAt:String
        updatedAt:String
    }

    type User{
        _id:ID!
        email:String!
        password:String
        createdEvents:[Event!]!
        createdAt:String
        updatedAt:String
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

`)