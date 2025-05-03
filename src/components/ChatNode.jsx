import Chat from "./Chat";
import React, { useRef, useEffect, useState } from "react";

export default function ChatNode({ node, parentRef }) {
    const ref = useRef(null);
    const [line, setLine] = useState(null);

    useEffect(() => {
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

    }, [node, parentRef]);

    if (!node) return null;

    return (
        <div className="flex flex-col gap-y-6 w-fit items-start chat-node relative" >
            <Chat chat={node} ref={ref} />
            {node.children && (
                <div className="flex gap-x-6">
                    {node.children.map((child) => (
                        <ChatNode key={child.id} node={child} parentRef={ref} />
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
    const radius = 4;

    const vertical = line.midY - line.y1;
    const horizontal = line.x2 - line.x1;

    const r = Math.min(radius, Math.abs(vertical), Math.abs(horizontal));
    const vertEndY = line.midY - r;

    return (
        <path
            d={`M ${line.x1} ${line.y1}
                L ${line.x1} ${vertEndY}
                C ${line.x1} ${vertEndY + r * 0.55}, ${line.x1 + r * 0.55} ${line.midY}, ${line.x1 + r} ${line.midY}
                L ${line.x2 - r} ${line.midY}
                C ${line.x2 - r * 0.55} ${line.midY}, ${line.x2} ${line.midY + r * 0.55}, ${line.x2} ${line.midY + r}
                L ${line.x2} ${line.y2}`}
            stroke="currentColor"
            strokeWidth={1}
            fill="none"
        />
    );
}