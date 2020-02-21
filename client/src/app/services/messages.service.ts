import {Injectable} from '@angular/core';
import {Apollo} from "apollo-angular";
import gql from "graphql-tag";
import {GetMessagesGQL, messageQuery} from "./gql";
import {map} from "rxjs/operators";
import {ApolloQueryResult} from "apollo-client";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(
      private apollo: Apollo,
      private getMessagesGQL: GetMessagesGQL,
      // private http: HttpClient,
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
          createMessage(user: $user, text: $text) {
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
        text
      },
      optimisticResponse: {
        __typename: 'Mutation',
        createMessage: {
          __typename: "Message",
          user: user,
          text: text,
          id: (Math.random() - 1).toString(16),
        }
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

  uploadFile(file) {
    // const operations = {
    //   query: `
    //     mutation($file: Upload!) {
    //       singleUpload(file: $file) {
    //         id
    //       }
    //     }
    //   `,
    //   variables: {
    //     file: null
    //   }
    // };
    //
    // const _map = {
    //   file: ["variables.file"]
    // };
    //
    // const fd = new FormData();
    //
    // fd.append('operations', JSON.stringify(operations));
    // fd.append('map', JSON.stringify(_map));
    // fd.append('file', file, file.name);
    //
    // this.http.post("http://localhost:8000/messages", fd).subscribe();

    this.apollo.mutate({mutation: gql`
        mutation uploadFile($file: Upload!){
            uploadFile(file: $file) {
                success
            }
        }
    `,
      variables: {
        file,
      },
      context: {
        useMultipart: true
      }
      }).subscribe()
  }
}
