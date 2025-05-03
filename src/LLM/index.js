import OpenAI from 'openai';

const client = new OpenAI({
    baseURL: 'http://localhost:5173/engines/v1',
    apiKey: '',
    dangerouslyAllowBrowser: true,
});

export async function getLLMResponse(input) {
    const response = await client.chat.completions.create({
        model: 'ai/gemma3:latest',
        messages: [{ role: 'user', content: input }],
    });

    console.log(response);

    return response.choices[0].message.content;
}