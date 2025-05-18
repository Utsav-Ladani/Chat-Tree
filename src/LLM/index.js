import OpenAI from 'openai';
import { AI_MODEL_OPTIONS } from '../utils/constants';

export function getModelFromLocalStorage() {
    const modelIdentifier = localStorage.getItem('llm:model-identifier') || AI_MODEL_OPTIONS[0].modelIdentifier;

    return AI_MODEL_OPTIONS.find(m => m.modelIdentifier === modelIdentifier);
}

export function setModelToLocalStorage(modelIdentifier) {
    localStorage.setItem('llm:model-identifier', modelIdentifier);
}

export function getApiKeyFromLocalStorage(modelIdentifier) {
    return localStorage.getItem(`llm:${modelIdentifier}:api-key`) || '';
}

export function setApiKeyToLocalStorage(modelIdentifier, apiKey) {
    localStorage.setItem(`llm:${modelIdentifier}:api-key`, apiKey);
}

export async function getLLMResponse(messages) {
    const model = getModelFromLocalStorage();

    if (!model) {
        throw new Error('Model not found');
    }

    const apiKey = getApiKeyFromLocalStorage(model.modelIdentifier);

    const client = new OpenAI({
        baseURL: model.apiBaseUrl,
        apiKey,
        dangerouslyAllowBrowser: true,
    });

    const response = await client.chat.completions.create({
        model: model.modelName,
        messages,
    });

    console.log(response);

    return response.choices[0].message.content;
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