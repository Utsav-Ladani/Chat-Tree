import React, { useRef, useEffect, useState, useCallback } from "react";
import Chat from "./Chat";

export default function ChatNode({ node, parentRef, onAddChild, reRender, updateNodeData }) {
    const ref = useRef(null);
    const [line, setLine] = useState(null);

    const handleNodeResize = useCallback(() => {

        if (!parentRef || !ref) {
            return;
        }

        const childRect = ref.current?.getBoundingClientRect();
        const parentRect = parentRef.current?.getBoundingClientRect();

        if (!childRect || !parentRect) {
            return;
        }

        const svgLeft = Math.min(parentRect.left, childRect.left);
        const svgTop = Math.min(parentRect.bottom, childRect.top);

        const svgWidth = Math.max(parentRect.right, childRect.right) - svgLeft;
        const svgHeight = Math.max(childRect.top, parentRect.bottom) - svgTop;

        let x1 = parentRect.left + parentRect.width / 2 - svgLeft;
        let y1 = parentRect.bottom - svgTop;
        let x2 = childRect.left + childRect.width / 2 - svgLeft;
        let y2 = childRect.top - svgTop;

        // For L-shape: vertical down from parent, then horizontal to child
        const midY = y1 + (y2 - y1) / 2;

        setLine({
            svgLeft,
            svgTop,
            svgWidth,
            svgHeight,
            x1,
            y1,
            x2,
            y2,
            midY,
        });

    }, [parentRef]);

    useEffect(() => {
        handleNodeResize();
    }, [reRender, handleNodeResize]);

    if (!node) return null;

    return (
        <div className="flex flex-col gap-y-6 w-fit items-start chat-node relative" >
            <Chat
                chat={node}
                ref={ref}
                onAddChild={onAddChild}
                updateNodeData={updateNodeData}
            />
            {node.children && (
                <div className="flex gap-x-6">
                    {node.children.map((child) => (
                        <ChatNode
                            key={child.id}
                            node={child}
                            parentRef={ref}
                            onAddChild={onAddChild}
                            reRender={reRender}
                            updateNodeData={updateNodeData}
                        />
                    ))}
                </div>
            )}
            {line && (
                <svg
                    className="edge absolute text-gray-300"
                    style={{
                        left: line.svgLeft - ref.current?.offsetParent?.getBoundingClientRect().left,
                        top: line.svgTop - ref.current?.offsetParent?.getBoundingClientRect().top,
                        width: line.svgWidth,
                        height: line.svgHeight,
                    }}
                >
                    <ChatNodeEdge line={line} />
                </svg>
            )}
        </div>
    );
}

function ChatNodeEdge({ line }) {
    return (
        <path
            d={`M ${line.x1} ${line.y1} V ${line.midY} H ${line.x2} V ${line.y2}`}
            stroke="currentColor"
            strokeWidth={1}
            fill="none"
        />
    );
}