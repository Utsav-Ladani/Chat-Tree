import { CHAT_TREES_STORE_NAME as STORE_NAME, getDB } from '.';

export async function saveConversation(conversation) {
    const db = await getDB();
    const id = await db.put(STORE_NAME, conversation);
    return { ...conversation, id };
}

export async function getAllConversations() {
    const db = await getDB();
    return db.getAll(STORE_NAME);
}

export async function deleteConversation(id) {
    const db = await getDB();
    return db.delete(STORE_NAME, id);
}
