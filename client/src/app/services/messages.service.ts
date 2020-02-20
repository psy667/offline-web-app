import {Injectable} from '@angular/core';
import {ApolloService} from "../apollo.service";
import {Observable} from "rxjs";
import {ApolloOfflineStore} from "offix-client-boost";
import {createMutationOptions} from "offix-cache";
import {ADD_MESSAGE, GET_MESSAGES} from "./gql";

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
        this.offlineStore = _apolloService.offlineStore;

    }

    getMessages(): Observable<any> {
        return this.apollo
            .watchQuery({
                query: GET_MESSAGES,
                fetchPolicy: 'cache-first',

            })
    }

    sendMessage(user, text, image) {
        const options = createMutationOptions({
            mutation: ADD_MESSAGE,
            variables: {
                user,
                text,
                image,
                id: -1,
            },
            updateQuery: GET_MESSAGES,
            returnType: 'Message',
            idField: 'id',
        });

        this.apollo.offlineMutate(options).catch(err => {
            console.log(err);
            err.watchOfflineChange().then(r => console.log(r))
        })
    }
    sendMessage2(user, text) {
        this.apollo.mutate({
            mutation: ADD_MESSAGE,
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

    async refreshMessages() {
        return this.apollo.query({
            query: GET_MESSAGES,
            fetchPolicy: 'network-only'
        })
    }
}
