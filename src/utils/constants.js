export const AI_MODEL_OPTIONS = [
    {
        provider: 'Google',
        modelLabel: 'Gemini 2.0 Flash',
        modelName: 'gemini-2.0-flash',
        modelIdentifier: 'google-gemini-2.0-flash',
        supportsCORS: true,
        apiBaseUrl: 'https://generativelanguage.googleapis.com/v1beta/openai'
    },
    {
        provider: 'OpenAI',
        modelLabel: 'GPT 4o mini',
        modelName: 'gpt-4o-mini',
        modelIdentifier: 'openai-gpt-4o-mini',
        supportsCORS: true,
        apiBaseUrl: 'https://api.openai.com/v1'
    },
]
