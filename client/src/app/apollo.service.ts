// import { ApolloOfflineClient, DataSyncConfig, OfflineClient, OfflineStore } from '@aerogear/voyager-client';
import { Injectable } from '@angular/core';
import {
    ApolloOfflineClient,
    ConflictListener,
    createClient,
    ApolloOfflineStore,
    OffixBoostOptions
} from 'offix-client-boost';
import {MessageCacheUpdates} from "./cacheUpdates";

// import { GreetingCacheUpdates } from '../common/cacheUpdates';

const uri = 'https://fakeql.com/fragilegraphql/3c5b8e37f4efe04484be1dcdd09525e2'+"";
const uriws = 'ws://fakeql.com/fragilegraphql/3c5b8e37f4efe04484be1dcdd09525e2'+"";

@Injectable({
    providedIn: 'root'
})
export class ApolloService {


    private _apolloClient: ApolloOfflineClient;
    private _offlineStore: ApolloOfflineStore;

    constructor() {
    }

    get apolloClient(): ApolloOfflineClient {
        return this._apolloClient;
    }

    get offlineStore(): ApolloOfflineStore {
        return this._offlineStore;
    }

    public async createApolloClient() {

        const options: OffixBoostOptions = {
            httpUrl: uri,
            wsUrl: uriws,
            mutationCacheUpdates: MessageCacheUpdates,
            fileUpload: true,
        };

        const offlineClient = await createClient(options);
        this._offlineStore = offlineClient.offlineStore;
        this._apolloClient = offlineClient;


    }

}
