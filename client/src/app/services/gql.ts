import {Injectable} from "@angular/core";
import {Mutation, Query} from "apollo-angular";
import {Message} from "./interfaces";
import gql from "graphql-tag";

export const messageQuery = gql`
    query getMessages {
        messages {
            user
            text
            id
        }
    }
`

@Injectable({
    providedIn: 'root'
})
export class GetMessagesGQL extends Query<Message>{
    document = messageQuery
}

@Injectable({
    providedIn: 'root'
})
export class SendMessageGQL extends Mutation<Message> {
    document = gql`
        mutation createMessage{
            createMessage(input: {user: "", text: "", image: "", date: ""}) {
                user
                text
                id
            }
        }
    `
}