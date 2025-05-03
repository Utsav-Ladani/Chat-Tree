import User from "./User";

export default function Chat({ chat, ref }) {
    return (    
        <div className="chat flex flex-col gap-2 border border-gray-300 rounded-md p-2 min-w-[400px]" ref={ref}>
            <div className="flex gap-2 items-start">
                <User name={'user'} />
                <p className="text-blue-500 mt-1">{chat.user.content}</p>
            </div>
            <div className="flex gap-2 items-start">
                <User name={'assistant'} />
                <p className="text-gray-500 mt-1">{chat.assistant.content}</p>
            </div>
        </div>
    );
}