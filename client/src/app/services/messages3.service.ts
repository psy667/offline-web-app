import {Injectable} from '@angular/core';
import {ApolloService} from "../apollo.service";
import {Observable} from "rxjs";
import {addMessage, messageQuery} from "./gql";
import {ApolloOfflineStore} from "offix-client-boost";
import {GET_TASKS} from "./graphql.queries";

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
        // subscribeToMoreHelper(getTasks, subscriptionOptions);
        return this.apollo.watchQuery({
            query: GET_TASKS,
            fetchPolicy: 'cache-first',
            errorPolicy: 'none'
        });
    }


    sendMessage(user, text) {
        return this.apollo.offlineMutate({
            mutation: addMessage,
            variables: {
                'user': user,
                'text': text,
            },
            updateQuery: messageQuery,
            returnType: 'Task'
        });
    }


    async refreshMessages() {
        return this.apollo.query({
            query: messageQuery,
            fetchPolicy: 'network-only',
            errorPolicy: 'none'
        })
    }
}
