import { SendHorizonal } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function ChatInput({ onSubmit }) {
    const [input, setInput] = useState('Hello');
    const textareaRef = useRef(null);

    useEffect(() => {
        if (textareaRef.current) {
            // Reset height to shrink if needed
            textareaRef.current.style.height = 'auto';

            const scrollHeight = textareaRef.current.scrollHeight;
            // Approximately 5 lines, assuming line height of 40px
            const maxHeight = 200;

            if (scrollHeight > maxHeight) {
                textareaRef.current.style.height = `${maxHeight}px`;
                textareaRef.current.style.overflowY = 'auto';
            } else {
                textareaRef.current.style.height = `${scrollHeight}px`;
                textareaRef.current.style.overflowY = 'hidden';
            }
        }
    }, [input]);

    function handleSubmit(e) {
        e.preventDefault();

        const trimmedInput = input.trim();

        if (!trimmedInput) {
            return;
        }

        onSubmit(trimmedInput);
        setInput('');
    }

    function handleInputChange(e) {
        setInput(e.target.value);
    }

    function handleKeyDown(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault(); // Prevent adding a new line
            handleSubmit(e);    // Submit the form
        }
        // If Shift+Enter is pressed, the default behavior (adding a new line) is allowed.
    }

    // Prevent scrolling the parent container when scrolling the textarea
    function handleWheel(e) {
        e.stopPropagation();
    }

    return (
        <form onSubmit={handleSubmit} className="flex gap-2 w-full items-end">
            <textarea
                ref={textareaRef}
                className="w-full border border-gray-300 rounded-md p-2 resize-none"
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onWheel={handleWheel}
                placeholder="Type your message here..."
                rows={1}
            />
            <button
                type="submit"
                className="bg-blue-500 text-white rounded-md p-2 cursor-pointer"
                title="Send message"
            >
                <SendHorizonal size={18} />
            </button>
        </form>
    );
}