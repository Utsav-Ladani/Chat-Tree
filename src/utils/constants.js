export const AI_MODEL_OPTIONS = [
    {
        provider: 'Google',
        modelName: 'Gemini 2.0 Flash',
        optionKey: 'google-gemini-2.0-flash',
        modelIdentifier: 'gemini-2.0-flash',
        supportsCORS: true,
        apiBaseUrl: 'https://generativelanguage.googleapis.com/v1beta/openai'
    },
    {
        provider: 'OpenAI',
        modelName: 'GPT 4o mini',
        optionKey: 'openai-gpt-4o-mini',
        modelIdentifier: 'gpt-4o-mini',
        supportsCORS: true,
        apiBaseUrl: 'https://api.openai.com/v1'
    },
]
