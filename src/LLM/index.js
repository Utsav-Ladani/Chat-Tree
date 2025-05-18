import OpenAI from 'openai';
import { AI_MODEL_OPTIONS } from '../utils/constants';

const HOST = window.location.origin;

function getLLM() {
    const apiKey = localStorage.getItem('api-key') || '';

    const modelIdentifier = localStorage.getItem('model-name') || AI_MODEL_OPTIONS[0].modelIdentifier;
    const model = AI_MODEL_OPTIONS.find(m => m.modelIdentifier === modelIdentifier);

    const client = new OpenAI({
        baseURL: model.supportsCORS ? `${HOST}/api/llm/${model.optionKey}` : model.apiBaseUrl,
        apiKey,
        dangerouslyAllowBrowser: true,
    });

    return {
        client,
        model,
    }
}

export async function getLLMResponse(messages) {
    const { client, model } = getLLM()

    const response = await client.chat.completions.create({
        model: model.modelIdentifier,
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