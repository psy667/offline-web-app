import {NgModule} from '@angular/core';
import {ApolloModule, APOLLO_OPTIONS} from 'apollo-angular';
import {HttpLinkModule, HttpLink} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {resolvers, typeDefs} from "./messages.resolvers";

import { RetryLink } from "apollo-link-retry";
import {ApolloLink} from "apollo-link";

const uri = 'https://fakeql.com/fragilegraphql/3c5b8e37f4efe04484be1dcdd09525e2'; // <-- add the URL of the GraphQL server here

const initialState = {
  data: {
    messages: []
  }
};

const retryLink = new RetryLink();

export function createApollo(httpLink: HttpLink) {
  const memoryCache = new InMemoryCache();
  // memoryCache.writeData(initialState);

  return {
    link: ApolloLink.from([
        retryLink,
        httpLink.create({uri})
      ]),
    cache: memoryCache,
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
