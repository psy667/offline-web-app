import gql from "graphql-tag";
import {messageQuery} from "./services/gql";

export const typeDefs = `
  type Message {
    text: String!
  }

  type Mutation {
    sendMessage(text: String!): Message
  }

  type Query {
    messages: [Message]
  }
`;

export const resolvers = {
    Mutation: {
        sendMessage: (_, variables, {cache}) => {
            const {messages} = cache.readQuery({
                query: messageQuery
            });

            const newMessage = {
                ...variables,
                offline: true,
                __typename: 'Message',
            };

            cache.writeData({
                data: {
                    messages: [...messages, newMessage]
                }
            })

        }
    }
};