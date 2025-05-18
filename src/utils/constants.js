export const AI_MODEL_OPTIONS = [
    {
        provider: 'Docker',
        modelName: 'Gemma 3',
        optionKey: 'docker-gemma3',
        modelIdentifier: 'ai/gemma3:latest',
        supportsCORS: false
    },
    {
        provider: 'OpenAI',
        modelName: 'GPT 4o mini',
        optionKey: 'openai-gpt-4o-mini',
        modelIdentifier: 'gpt-4o-mini',
        supportsCORS: true,
        apiBaseUrl: 'https://api.openai.com/v1'
    },
    {
        provider: 'Google',
        modelName: 'Gemini 2.0 Flash',
        optionKey: 'google-gemini-2.0-flash',
        modelIdentifier: 'gemini-2.0-flash',
        supportsCORS: true,
        apiBaseUrl: 'https://generativelanguage.googleapis.com/v1beta/openai'
    }
]
