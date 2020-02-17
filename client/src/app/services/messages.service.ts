import {Injectable} from '@angular/core';
import {Apollo} from "apollo-angular";
import gql from "graphql-tag";
import {GetMessagesGQL, messageQuery} from "./gql";
import {map} from "rxjs/operators";
import {ApolloQueryResult} from "apollo-client";

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(
      private apollo: Apollo,
      private getMessagesGQL: GetMessagesGQL,
  ) { }

  getMessages() {
    return this.getMessagesGQL
        .watch()
        .valueChanges
        .pipe(
            map((r: ApolloQueryResult<any>) => r.data && r.data.messages)
        )
  }

  sendMessage(user, text) {
    this.apollo.mutate({
      mutation: gql`
        mutation SendMessage($user: String!, $text: String!) {
          createMessage(input: {user: $user, text: $text, date: "", image: ""}) {
            __typename
            user
            text
            id
            date
          }
        }
      `,
      variables: {
        user,
        text,
        id: Math.random().toString(16).slice(2),

      },
      optimisticResponse: {
        __typename: 'Mutation',
        createMessage: {
          __typename: "Message",
          user: user,
          text: text,
          id: Math.random() - 1,
          date: "",
        }
      },
      context: {
        serializationKey: 'MUTATION'
      },
      update: (proxy, {data: {createMessage}}) => {
        const data: any = proxy.readQuery({query:  messageQuery});

        data.messages.push(createMessage);

        proxy.writeQuery(({
          query: messageQuery,
          data
        }))
      }
    }).subscribe()
  }

  sendMessage2() {
    this.apollo.getClient()
  }
}
