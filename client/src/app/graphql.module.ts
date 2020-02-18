import { ApolloService } from './apollo.service';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import {APOLLO_OPTIONS} from "apollo-angular";

function apolloClientFactory(aeroGear: ApolloService) {
  return () => aeroGear.createApolloClient();
}

@NgModule({
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: apolloClientFactory,
      deps: [ApolloService],
      multi: true
    }
  ]
})

export class GraphQLModule {

}
