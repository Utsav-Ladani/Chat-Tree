import { openDB } from 'idb';

const DB_NAME = 'chatDB';
const STORE_NAME = 'conversations';

async function getDB() {
    return openDB(DB_NAME, 1, {
        upgrade(db) {
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
            }
        },
    });
}

export async function saveConversation(conversation) {
    const db = await getDB();
    const id = await db.put(STORE_NAME, conversation);
    return { ...conversation, id };
}

export async function getAllConversations() {
    const db = await getDB();
    return db.getAll(STORE_NAME);
}
