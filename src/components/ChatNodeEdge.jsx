import React from "react";

export default function ChatNodeEdge({ line }) {
    return (
        <path
            d={`M ${line.x1} ${line.y1} V ${line.midY} H ${line.x2} V ${line.y2}`}
            stroke="currentColor"
            strokeWidth={1}
            fill="none"
        />
    );
}