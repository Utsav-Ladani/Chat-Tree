import { useMemo } from "react";
import { useParams } from "react-router-dom";
import ChatTree from "./ChatTree";
import ChatHeader from "./ChatHeader";

export default function ChatTreeWrapper({ chatRootNodes, parentRef, onAddChild, reRender, updateNodeData }) {
    const { id } = useParams();

    const currentChatRootNode = useMemo(() => {
        return chatRootNodes.find(node => node.id === parseInt(id));
    }, [chatRootNodes, id]);

    return (
        <>
            <ChatHeader title={currentChatRootNode?.title || 'Untitled'} />
            <ChatTree
                chatRootNode={currentChatRootNode}
                parentRef={parentRef}
                onAddChild={onAddChild}
                reRender={reRender}
                updateNodeData={updateNodeData}
            />
        </>
    );
}