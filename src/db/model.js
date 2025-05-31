import { MODELS_STORE_NAME as STORE_NAME, getDB } from '.';

export async function getModelsFromIndexedDB(providerId) {
    const db = await getDB();

    const data = await db.get(STORE_NAME, providerId);

    return data?.models || [];
}

export async function saveModelsToIndexedDB(providerId, models) {
    const db = await getDB();

    await db.put(STORE_NAME, { providerId, models });
}

