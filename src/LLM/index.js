import { MODEL_PROVIDERS } from "../utils/constants";

export function getModelSelectionFromLocalStorage() {
    return {
        modelId: localStorage.getItem('llm:selected-model-id'),
        providerId: localStorage.getItem('llm:selected-provider-id'),
    }
}

export function setModelSelectionToLocalStorage(providerId, modelId) {
    localStorage.setItem('llm:selected-provider-id', providerId);
    localStorage.setItem('llm:selected-model-id', modelId);
}

export function getApiKeyFromLocalStorage(providerId) {
    return localStorage.getItem(`llm:${providerId}:api-key`) || '';
}

export function setApiKeyToLocalStorage(providerId, apiKey) {
    localStorage.setItem(`llm:${providerId}:api-key`, apiKey);
}

export async function fetchModels(providerId) {
    const apiKey = getApiKeyFromLocalStorage(providerId);

    if (!apiKey) {
        return []
    }

    const provider = MODEL_PROVIDERS.find(p => p.id === providerId);

    const response = await fetch(`${provider.apiBaseUrl}/models`, {
        headers: {
            'Authorization': `Bearer ${apiKey}`,
        },
    });

    if (!response.ok) {
        console.error(`LLM API error: ${response.statusText}`);
        return []
    }

    const json = await response.json();

    return json.data.map(model => ({
        id: model.id,
        name: model.name,
    }));
}

export async function getLLMResponse(messages) {
    const modelSelection = getModelSelectionFromLocalStorage();

    if (!modelSelection?.modelId) {
        throw new Error('No model selected');
    }

    const provider = MODEL_PROVIDERS.find(p => p.id === modelSelection?.providerId);

    if (!provider) {
        throw new Error('Provider not found');
    }

    const apiKey = getApiKeyFromLocalStorage(provider.id);

    // Prepare the payload for OpenAI-compatible API
    const payload = {
        model: modelSelection.modelId,
        messages,
    };

    const response = await fetch(`${provider.apiBaseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        throw new Error(`LLM API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
}

export async function generateTitleFromFirstConversation(input, response) {
    return await getLLMResponse([
        {
            role: 'system',
            content: `You are a helpful assistant that generates title less than 10 words for given conversation.`,
        },
        {
            role: 'user',
            content: `Generate a title for the following conversation: User: ${input} Assistant: ${response}`,
        },
    ]);
}