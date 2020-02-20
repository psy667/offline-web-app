import {CacheOperation, getUpdateFunction} from 'offix-client-boost';
import {GET_MESSAGES} from "./services/gql";


export const MessageCacheUpdates = {
    createMessage: getUpdateFunction({
        mutationName: 'createMessage',
        idField: 'id',
        operationType: CacheOperation.ADD,
        updateQuery: GET_MESSAGES,
    })
}
