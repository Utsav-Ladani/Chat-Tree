export function getChatRoot() {
    return {
        id: 1,
        user: {
            content: "What is the capital of the moon?",
        },
        assistant: {
            content: "The capital of the moon is the moon.",
        },
        children: [
            {
                id: 2,
                user: {
                    content: "What is the capital of the moon?",
                },
                assistant: {
                    content: "The capital of the moon is the moon.",
                },
                children: [
                    {
                        id: 3,
                        user: {
                            content: "What is the capital of the moon?",
                        },
                        assistant: {
                            content: "The capital of the moon is the moon.",
                        },
                        children: [
                            {
                                id: 4,
                                user: {
                                    content: "What is the capital of the moon?",
                                },
                                assistant: {
                                    content: "The capital of the moon is the moon.",
                                },
                            }
                        ]
                    },
                    {
                        id: 5,
                        user: {
                            content: "What is the capital of the moon?",
                        },
                        assistant: {
                            content: "The capital of the moon is the moon.",
                        },
                    }
                ]
            },
            {
                id: 4,
                user: {
                    content: "What is the capital of the moon?",
                },
                assistant: {
                    content: "The capital of the moon is the moon.",
                },
                children: [
                    {
                        id: 5,
                        user: {
                            content: "What is the capital of the moon?",
                        },
                        assistant: {
                            content: "The capital of the moon is the moon.",
                        },
                    }
                ]
            }
        ]
    }
}