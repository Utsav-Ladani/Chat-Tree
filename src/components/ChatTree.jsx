import ChatNode from "./ChatNode";

export default function ChatTree({ chatRootNode, parentRef, onAddChild, reRender, updateNodeData }) {
    return (
        <main className="p-4 overflow-auto">
            <ChatNode
                node={chatRootNode}
                parentRef={parentRef}
                onAddChild={onAddChild}
                reRender={reRender}
                updateNodeData={updateNodeData}
            />
        </main>
    );
}
