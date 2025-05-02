import Chat from "./Chat";

export default function ChatNode({ node }) {
    if (!node) return null;

    return (
        <div className="flex flex-col gap-y-3 w-fit items-start chat-node">
            <Chat chat={node} />
            {
                node.children && (
                    <div className="flex gap-x-6">
                        {node.children.map((child) => (
                            <ChatNode key={child.id} node={child} />
                        ))}
                    </div>
                )
            }
        </div>
    );
}
