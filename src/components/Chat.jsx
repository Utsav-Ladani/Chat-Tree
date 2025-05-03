import { useState } from "react";
import PlusIcon from "../icons/PlusIcon";
import User from "./User";
import { getLLMResponse } from "../LLM";

export default function Chat({ chat, ref, onAddChild, updateNodeData }) {

    async function handleUserInput(input) {
        updateNodeData(chat.id, { user: { content: input } });

        const response = await getLLMResponse(input);

        updateNodeData(chat.id, { assistant: { content: response } });
    }

    return (
        <div className="chat flex flex-col gap-2 border border-gray-300 rounded-md p-2 min-w-[400px] max-w-[700px]" ref={ref} tabIndex={0}>
            <div className="flex gap-2 items-start">
                <User name={'user'} />
                {
                    chat.user.content ? (
                        <p className="text-blue-500 mt-1">{chat.user.content}</p>
                    ) : (
                        <ChatInput
                            onSubmit={handleUserInput}
                        />
                    )
                }
            </div>
            {
                chat.user.content && (
                    <div className="flex gap-2 items-start">
                        <User name={'assistant'} />
                        <p className="text-gray-500 mt-1">{chat.assistant.content || 'Processing...'}</p>
                    </div>
                )
            }
            {
                chat.user.content && chat.assistant.content && (
                    <button
                        className="self-end text-white bg-blue-500 rounded-full p-1 hover:text-blue-600 hover:bg-white border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-blue-500"
                        onClick={() => onAddChild && onAddChild(chat.id)}
                    >
                        <PlusIcon />
                    </button>
                )
            }
        </div>
    );
}

function ChatInput({ onSubmit }) {
    const [input, setInput] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        console.log('input', input);
        onSubmit(input);
        setInput('');
    }

    return (
        <form onSubmit={handleSubmit} className="flex gap-2 w-full items-center">
            <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-2"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message here..."
            />
            <button type="submit" className="bg-blue-500 text-white rounded-md px-2 py-1">Send</button>
        </form>
    );
}