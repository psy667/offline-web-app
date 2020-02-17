import { get, set, keys, del, clear } from 'idb-keyval';

export const localDatabase =  {
    clear(): Promise<any> {
        return clear();
    },
    getItem(key): Promise<any> {
        return get(key);
    },
    setItem(key, value): Promise<any> {
        return set(key, value);
    },
    keys(): Promise<any> {
        return keys();
    },
    remove(key): Promise<any> {
        return del(key);
    },
    removeItem(key): Promise<any> {
        return del(key);
    }
};