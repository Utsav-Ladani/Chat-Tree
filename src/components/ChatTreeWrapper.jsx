import { useMemo } from "react";
import { useParams } from "react-router-dom";
import ChatTree from "./ChatTree";
import ChatHeader from "./ChatHeader";

export default function ChatTreeWrapper({ chatRootNodes, parentRef, onAddChild, reRender, updateNodeData, onDeleteNode }) {
    const { id } = useParams();

    const currentChatRootNode = useMemo(() => {
        return chatRootNodes.find(node => node.id === parseInt(id));
    }, [chatRootNodes, id]);

    return (
        <div className="grid grid-rows-[auto_1fr] h-screen w-full">
            <ChatHeader title={currentChatRootNode?.title || 'Untitled'} />
            <ChatTree
                chatRootNode={currentChatRootNode}
                parentRef={parentRef}
                onAddChild={onAddChild}
                reRender={reRender}
                updateNodeData={updateNodeData}
                onDeleteNode={onDeleteNode}
            />
        </div>
    );
}