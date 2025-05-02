import { useState } from "react";
import ChatNode from "./ChatNode";
import { getChatRoot } from "../mocks/chatree";

export default function ChatTree() {
    const [chatRootNode, setChatRootNode] = useState(getChatRoot());

    return (
        <main className="p-4">
            <ChatNode node={chatRootNode} />
        </main>
    );
}
