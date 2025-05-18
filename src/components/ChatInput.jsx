import { useState } from "react";

export default function ChatInput({ onSubmit }) {
    const [input, setInput] = useState('Hello');

    function handleSubmit(e) {
        e.preventDefault();
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