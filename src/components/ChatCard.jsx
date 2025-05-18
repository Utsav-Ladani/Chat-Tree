import Markdown from 'react-markdown'
import { Trash2, Plus } from "lucide-react";

import UserAvatar from "./UserAvatar";
import { getLLMResponse, generateTitleFromFirstConversation } from "../LLM";
import ChatInput from "./ChatInput";
import { saveConversation, getAllConversations } from "../db/conversation";
import { buildMessageHistory } from "../utils/conversationHistory";
import { useNavigate } from 'react-router-dom';

function ChatCard({ chat, ref, onAddChild, updateNodeData, onDeleteNode, isRoot }) {
    const navigate = useNavigate();

    async function handleUserInput(input) {
        try {
            updateNodeData(chat.id, { user: input });

            // Fetch all conversations to reconstruct the parent chain
            const conversations = await getAllConversations();
            const messages = buildMessageHistory(chat, input, conversations);

            const response = await getLLMResponse(messages);
            const title = chat.parentId === null ? await generateTitleFromFirstConversation(input, response) : null;

            updateNodeData(chat.id, { assistant: response, ...(title && { title }) });

            const saved = await saveConversation({
                parentId: chat.parentId || null,
                ...(title && { title }),
                user: input,
                assistant: response,
            });

            // Sync the id from IndexedDB
            if (saved.id !== chat.id) {
                updateNodeData(chat.id, { id: saved.id });
            }

            console.log(chat.parentId, saved.id, chat.parentId === null);

            if (chat.parentId === null) {
                navigate(`/chat/${saved.id}`);
            }
        } catch (error) {
            console.error(error)
            updateNodeData(chat.id, { assistant: 'Error while generating response',});  
        }
    }

    return (
        <div className="chat flex flex-col gap-3 border border-gray-300 rounded-md p-3 min-w-[400px] max-w-[700px]" ref={ref} tabIndex={0}>
            <div className="flex gap-2 items-start">
                <UserAvatar name={'user'} />
                {
                    chat.user ? (
                        <p className="text-blue-500 mt-[4px] w-full">{chat.user}</p>
                    ) : (
                        <ChatInput
                            onSubmit={handleUserInput}
                        />
                    )
                }
                {
                    !isRoot && chat.user && chat.assistant && (
                        <button
                            className="text-red-500 hover:bg-red-100 rounded-full p-1 border border-red-200"
                            title="Delete node"
                            onClick={() => onDeleteNode(chat.id)}
                        >
                            <Trash2 size={18} />
                        </button>
                    )
                }
            </div>
            {
                chat.user && (
                    <div className="flex gap-2 items-start">
                        <UserAvatar name={'assistant'} />
                        {
                            chat.assistant ? (
                                <div className="markdown-body mt-[4px]">
                                    <Markdown>{chat.assistant}</Markdown>
                                </div>
                            ) : (
                                <ChatCardLoading />
                            )
                        }
                    </div>
                )
            }
            {
                chat.user && chat.assistant && (
                    <button
                        className="self-end text-white bg-blue-500 rounded-full p-1 hover:text-blue-600 hover:bg-white border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-blue-500"
                        onClick={() => onAddChild && onAddChild(chat.id)}
                    >
                        <Plus className="size-6" />
                    </button>
                )
            }
        </div>
    );
}

function ChatCardLoading() {
    return (
        <div className="self-center flex gap-2 items-start">
            <div className="w-3 h-3 bg-gray-400 rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-gray-400 rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-gray-400 rounded-full animate-pulse"></div>
        </div>
    )
}

export default ChatCard;