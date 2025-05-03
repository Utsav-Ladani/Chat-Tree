import { useState } from "react";
import ChatNode from "./ChatNode";
import { useRef } from "react";
import { getAllConversations } from "../db/conversation";
import { useEffect } from "react";
import { buildTree } from "../utils/tree";

const DEFAULT_ROOT_NODE = {
    id: 0,
    user: '',
    assistant: '',
    children: [],
};

export default function ChatTree() {
    const [chatRootNode, setChatRootNode] = useState(DEFAULT_ROOT_NODE);
    const parentRef = useRef(null);
    const [reRender, setReRender] = useState(0);

    function addChildNode(parentId) {
        function addChildRecursive(node) {
            if (node.id === parentId) {
                const tempId = -Date.now();
                const newChild = {
                    id: tempId,
                    parentId: parentId,
                    user: '',
                    assistant: '',
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

    useEffect(() => {
        getAllConversations().then(records => {
            setChatRootNode(buildTree(records)[0] ?? DEFAULT_ROOT_NODE);
        });
    }, []);

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
