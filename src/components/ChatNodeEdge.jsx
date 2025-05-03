import React from "react";

export default function ChatNodeEdge({ line }) {
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