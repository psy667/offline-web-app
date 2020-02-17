import {NgModule} from '@angular/core';
import {APOLLO_OPTIONS, ApolloModule} from 'apollo-angular';
import {HttpLink, HttpLinkModule} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {resolvers, typeDefs} from "./messages.resolvers";
import {RetryLink} from "apollo-link-retry";
import {ApolloLink} from "apollo-link";
import QueueLink from 'apollo-link-queue';
import SerializingLink from "apollo-link-serialize";
import {persistCache} from "apollo-cache-persist";
import {localDatabase} from "./database";

const uri = 'https://fakeql.com/fragilegraphql/3c5b8e37f4efe04484be1dcdd09525e2'+"q"; // <-- add the URL of the GraphQL server here


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



const cache = new InMemoryCache();

console.log(1);

await persistCache({
  cache: cache,
  storage: localDatabase,
});

console.log('2');

export function createApollo(httpLink: HttpLink) {
  console.log('3')
  return {
    link: ApolloLink.from([
      queueLink,
      serializingLink,
      retryLink,
      httpLink.create({uri})
    ]),
    cache: cache,
    resolvers,
    typeDefs,
  };
}

@NgModule({
  exports: [ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
