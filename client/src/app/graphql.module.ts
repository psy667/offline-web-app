import {APP_INITIALIZER, NgModule} from '@angular/core';
import {Apollo, APOLLO_OPTIONS, ApolloModule} from 'apollo-angular';
import {HttpLink, HttpLinkModule} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {resolvers, typeDefs} from "./messages.resolvers";
import {RetryLink} from "apollo-link-retry";
import {ApolloLink} from "apollo-link";
import QueueLink from 'apollo-link-queue';
import SerializingLink from "apollo-link-serialize";
import {persistCache} from "apollo-cache-persist";
import {localDatabase} from "./database";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";

const uri = 'https://fakeql.com/fragilegraphql/3c5b8e37f4efe04484be1dcdd09525e2'; // <-- add the URL of the GraphQL server here


const initialState = {
  data: {
    messages: []
  }
};

const retryLink = new RetryLink();
const queueLink = new QueueLink();
const serializingLink = new SerializingLink();

window.addEventListener("offline", () => {
  console.log('offline')
  queueLink.close()
});
window.addEventListener("online", () => {
  console.log('online')
  queueLink.open()
});


function onStartup(apollo: Apollo, httpLink: HttpLink) {
  return async  () => {
    const link = ApolloLink.from([
      queueLink,
      serializingLink,
      retryLink,
      httpLink.create({uri})
    ]);

    const cache = new InMemoryCache();


    await persistCache({
      cache,
      storage: localDatabase,
      trigger: 'write',
      serialize: false
    });

    return apollo.create({
      link,
      cache: cache,
    });
  }
}

@NgModule({
  exports: [HttpClientModule, ApolloModule, HttpLinkModule],
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: onStartup,
      deps: [
        Apollo,
        HttpLink,
      ],
      multi: true
    }
  ],
})
export class GraphQLModule {}
