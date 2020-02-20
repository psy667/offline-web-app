import { SubscriptionHelperOptions, CacheOperation, getUpdateFunction } from 'offix-client-boost';
import {messageQuery} from "./services/gql";


export const MessageCacheUpdates = {
    addMessage: getUpdateFunction({
        mutationName: 'addMessage',
        idField: 'id',
        operationType: CacheOperation.ADD,
        updateQuery: messageQuery,
    })
}
