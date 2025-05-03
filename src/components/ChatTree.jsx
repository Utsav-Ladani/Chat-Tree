import { useState } from "react";
import ChatNode from "./ChatNode";
import { getChatRoot } from "../mocks/chatree";
import { useRef } from "react";

export default function ChatTree() {
    const [chatRootNode, setChatRootNode] = useState(getChatRoot());
    const parentRef = useRef(null);

    return (
        <main className="p-4">
            <ChatNode node={chatRootNode} parentRef={parentRef} />
        </main>
    );
}
