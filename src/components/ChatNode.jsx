import React, { useRef, useEffect, useState, useCallback } from "react";
import Chat from "./Chat";

export default function ChatNode({ node, parentRef, onAddChild, reRender, updateNodeData, zoom, translate }) {
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

        // Adjust all coordinates by zoom
        const svgLeft = (Math.min(parentRect.left, childRect.left)) / zoom;
        const svgTop = (Math.min(parentRect.bottom, childRect.top)) / zoom;
        const svgWidth = (Math.max(parentRect.right, childRect.right) - Math.min(parentRect.left, childRect.left)) / zoom;
        const svgHeight = (Math.max(childRect.top, parentRect.bottom) - Math.min(parentRect.bottom, childRect.top)) / zoom;

        let x1 = (parentRect.left + parentRect.width / 2 - Math.min(parentRect.left, childRect.left)) / zoom;
        let y1 = (parentRect.bottom - Math.min(parentRect.bottom, childRect.top)) / zoom;
        let x2 = (childRect.left + childRect.width / 2 - Math.min(parentRect.left, childRect.left)) / zoom;
        let y2 = (childRect.top - Math.min(parentRect.bottom, childRect.top)) / zoom;

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
    }, [parentRef, zoom]);

    useEffect(() => {
        handleNodeResize();
    }, [reRender, handleNodeResize, zoom, translate]);

    if (!node) return null;

    return (
        <div className="flex flex-col gap-y-6 w-fit items-start chat-node relative">
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
                            zoom={zoom}
                            translate={translate}
                        />
                    ))}
                </div>
            )}
            {line && (
                <svg
                    className="edge absolute text-gray-300"
                    style={{
                        left: line.svgLeft - ref.current?.offsetParent?.getBoundingClientRect().left / zoom,
                        top: line.svgTop - ref.current?.offsetParent?.getBoundingClientRect().top / zoom,
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