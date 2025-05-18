import { Bot, User } from 'lucide-react';

export default function UserAvatar({ name }) {
    return (
        <div className={`flex-none flex items-center justify-center rounded-full text-white w-8 h-8 capitalize ${name === 'user' ? 'bg-blue-500' : 'bg-gray-600'}`}>
            {name === 'assistant' ? <Bot className="w-6 h-6" /> : <User className="w-6 h-6" />}
        </div>
    );
}