function ChatLoading() {
    return (
        <div className="self-center flex gap-2 items-start">
            <div className="w-3 h-3 bg-gray-400 rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-gray-400 rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-gray-400 rounded-full animate-pulse"></div>
        </div>
    )
}

export default ChatLoading;