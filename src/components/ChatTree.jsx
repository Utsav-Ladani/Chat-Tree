import { useState } from "react";
import ChatNode from "./ChatNode";
import { useRef } from "react";

export default function ChatTree() {
    const [chatRootNode, setChatRootNode] = useState({
        id: 1,
        user: { content: "" },
        assistant: { content: "" },
        children: [],
    });
    const parentRef = useRef(null);
    const [reRender, setReRender] = useState(0);

    function addChildNode(parentId) {
        function addChildRecursive(node) {
            if (node.id === parentId) {
                const newId = Date.now();
                const newChild = {
                    id: newId,
                    user: { content: "" },
                    assistant: { content: "" },
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
        setReRender((prev) => prev + 1);
    }

    function updateNodeData(nodeId, data) {
        function updateNodeRecursive(node) {
            if (node.id === nodeId) {
                return { ...node, ...data };
            }

            if (node.children) {
                return {
                    ...node,
                    children: node.children.map(updateNodeRecursive),
                };
            }

            return node;
        }
        setChatRootNode((root) => updateNodeRecursive(root));
        setReRender((prev) => prev + 1);
    }

    return (
        <main className="p-4">
            <ChatNode
                node={chatRootNode}
                parentRef={parentRef}
                onAddChild={addChildNode}
                reRender={reRender}
                updateNodeData={updateNodeData}
            />
        </main>
    );
}
