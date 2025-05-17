import OpenAI from 'openai';

const client = new OpenAI({
    baseURL: 'http://localhost:5173/engines/v1',
    apiKey: '',
    dangerouslyAllowBrowser: true,
});

export async function getLLMResponse(messages) {
    const response = await client.chat.completions.create({
        model: 'ai/gemma3:latest',
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