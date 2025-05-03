import { useState } from "react";
import ChatNode from "./ChatNode";
import { getChatRoot } from "../mocks/chatree";
import { useRef } from "react";

export default function ChatTree() {
    const [chatRootNode, setChatRootNode] = useState(getChatRoot());
    const parentRef = useRef(null);
    const [reRender, setReRender] = useState(0);

    function addChildNode(parentId) {
        function addChildRecursive(node) {
            setReRender((prev) => prev + 1);

            if (node.id === parentId) {
                const newId = Date.now();
                const newChild = {
                    id: newId,
                    user: { content: "New user message" },
                    assistant: { content: "New assistant message" },
                    children: [],
                };
                return {
                    ...node,
                    children: node.children ? [newChild, ...node.children] : [newChild],
                };
            } else if (node.children) {
                return {
                    ...node,
                    children: node.children.map(addChildRecursive),
                };
            } else {
                return node;
            }
        }
        setChatRootNode((root) => addChildRecursive(root));
    }

    return (
        <main className="p-4">
            <ChatNode node={chatRootNode} parentRef={parentRef} onAddChild={addChildNode} reRender={reRender} />
        </main>
    );
}
