import PlusIcon from "../icons/PlusIcon";
import User from "./User";

export default function Chat({ chat, ref, onAddChild }) {
    return (    
        <div className="chat flex flex-col gap-2 border border-gray-300 rounded-md p-2 min-w-[400px]" ref={ref} tabIndex={0}>
            <div className="flex gap-2 items-start">
                <User name={'user'} />
                <p className="text-blue-500 mt-1">{chat.user.content}</p>
            </div>
            <div className="flex gap-2 items-start">
                <User name={'assistant'} />
                <p className="text-gray-500 mt-1">{chat.assistant.content}</p>
            </div>
            <button
                className="self-end text-white bg-blue-500 rounded-full p-1 hover:text-blue-600 hover:bg-white border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-blue-500"
                onClick={() => onAddChild && onAddChild(chat.id)}
            >
                <PlusIcon />
            </button>
        </div>
    );
}