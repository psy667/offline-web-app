import {Injectable} from '@angular/core';
import {ApolloService} from "../apollo.service";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {ApolloQueryResult} from "apollo-client";
import {addMessage, messageQuery} from "./gql";
import {ApolloOfflineStore} from "offix-client";

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  private readonly apollo;
  private offlineStore: ApolloOfflineStore;


  constructor(
      private _apolloService: ApolloService,

) {
    this.apollo = this._apolloService.apolloClient;
    // this.offlineStore = _apolloService.offlineStore;

  }

  getMessages(): Observable<any> {
    return this.apollo
        .watchQuery({
          query: messageQuery,

        })
  }

  sendMessage(user, text) {
    this.apollo.mutate({
      mutation: addMessage,
      variables: {
        user,
        text,
        id: Math.random().toString(16).slice(2),
      },

    })
    // this.apollo.mutate({
    //   mutation: gql`
    //     mutation SendMessage($user: String!, $text: String!) {
    //       createMessage(input: {user: $user, text: $text, date: "", image: ""}) {
    //         __typename
    //         user
    //         text
    //         id
    //       }
    //     }
    //   `,
    //   variables: {
    //     user,
    //     text,
    //     id: Math.random().toString(16).slice(2),
    //
    //   },
    //   optimisticResponse: {
    //     __typename: 'Mutation',
    //     createMessage: {
    //       __typename: "Message",
    //       user: user,
    //       text: text,
    //       id: (Math.random() - 1).toString(16),
    //     }
    //   },
    //   context: {
    //     serializationKey: 'MUTATION'
    //   },
    //   update: (proxy, {data: {createMessage}}) => {
    //     const data: any = proxy.readQuery({query:  messageQuery});
    //
    //     data.messages.push(createMessage);
    //
    //     proxy.writeQuery(({
    //       query: messageQuery,
    //       data
    //     }))
    //   }
    // }).subscribe()
  }

}
