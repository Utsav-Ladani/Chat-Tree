import Markdown from 'react-markdown'

import PlusIcon from "../icons/PlusIcon";
import User from "./User";
import { getLLMResponse } from "../LLM";
import ChatInput from "./ChatInput";

export default function Chat({ chat, ref, onAddChild, updateNodeData }) {

    async function handleUserInput(input) {
        updateNodeData(chat.id, { user: { content: input } });

        const response = await getLLMResponse(input);

        updateNodeData(chat.id, { assistant: { content: response } });
    }

    return (
        <div className="chat flex flex-col gap-3 border border-gray-300 rounded-md p-3 min-w-[400px] max-w-[700px]" ref={ref} tabIndex={0}>
            <div className="flex gap-2 items-start">
                <User name={'user'} />
                {
                    chat.user.content ? (
                        <p className="text-blue-500 mt-[4px]">{chat.user.content}</p>
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
                        {
                            chat.assistant.content ? (
                                <div className="markdown-body mt-[4px]">
                                    <Markdown>{chat.assistant.content}</Markdown>
                                </div>
                            ) : (
                                <Loading />
                            )
                        }
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

function Loading() {
    return (
        <div className="self-center flex gap-2 items-start">
            <div className="w-3 h-3 bg-gray-400 rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-gray-400 rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-gray-400 rounded-full animate-pulse"></div>
        </div>
    )
}