import { useMemo } from "react";
import { useParams } from "react-router-dom";
import ChatTree from "./ChatTree";

export default function ChatTreeWrapper({ chatRootNodes, parentRef, onAddChild, reRender, updateNodeData }) {
    const { id } = useParams();

    console.log(id);
  
    const currentChatRootNode = useMemo(() => {
      return chatRootNodes.find(node => node.id === parseInt(id));
    }, [chatRootNodes, id]);

    return (
        <ChatTree
            chatRootNode={currentChatRootNode}
            parentRef={parentRef}
            onAddChild={onAddChild}
            reRender={reRender}
            updateNodeData={updateNodeData}
        />
    );
}