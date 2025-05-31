import { openDB } from "idb";

export const DB_NAME = 'ChatTreeAppDB';

export const CHAT_TREES_STORE_NAME = 'chat-trees';
export const MODELS_STORE_NAME = 'models';

export async function getDB() {
    return openDB(DB_NAME, 1, {
        upgrade(db) {
            if (!db.objectStoreNames.contains(CHAT_TREES_STORE_NAME)) {
                db.createObjectStore(CHAT_TREES_STORE_NAME, { keyPath: 'id', autoIncrement: true });
            }

            if (!db.objectStoreNames.contains(MODELS_STORE_NAME)) {
                db.createObjectStore(MODELS_STORE_NAME, { keyPath: 'providerId' });
            }
        },
    });
}
