// Utility to build the message history for LLM context
export function buildMessageHistory(chat,userInput, conversations) {
    // Build a map for quick lookup
    const idToConversation = {};

    conversations.forEach(conv => { idToConversation[conv.id] = conv; });

    // Traverse from current chat up to root, collecting messages
    let current = { ...chat, user: userInput }; // include the new user input
    const chain = [];
    while (current) {
        if (current.assistant) {
            chain.push({ role: 'assistant', content: typeof current.assistant === 'string' ? current.assistant : current.assistant.content || '' });
        }

        if (current.user) {
            chain.push({ role: 'user', content: typeof current.user === 'string' ? current.user : current.user.content || '' });
        }

        if (!current.parentId) break;

        current = idToConversation[current.parentId];
    }
    // The chain is from leaf to root, so reverse it
    return chain.reverse();
} 