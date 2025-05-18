import { ZoomOut } from "lucide-react";
import ChatNode from "./ChatNode";
import React, { useState } from "react";
import { ZoomIn } from "lucide-react";

export default function ChatTree({ chatRootNode, parentRef, onAddChild, reRender, updateNodeData }) {
    const [zoom, setZoom] = useState(1);

    if (!chatRootNode) {
        return null;
    }

    const handleZoomIn = () => setZoom(z => Math.min(z + 0.1, 1));
    const handleZoomOut = () => setZoom(z => Math.max(z - 0.1, 0.4));

    return (
        <main className="p-4 overflow-hidden relative">
            <div className="absolute bottom-4 right-4 z-1 flex items-center gap-2 bg-gray-100 border border-gray-400 rounded-md shadow-xl p-2">
                <button onClick={handleZoomIn} className="p-2 bg-black text-white border rounded hover:bg-gray-300 hover:text-black hover:border-gray-400">
                    <ZoomIn size={16} />
                </button>
                <span className="w-10 text-sm text-center">{Math.round(zoom * 100)}%</span>
                <button onClick={handleZoomOut} className="p-2 bg-black text-white border rounded hover:bg-gray-300 hover:text-black hover:border-gray-400">
                    <ZoomOut size={16} />
                </button>
            </div>
            <div
                className="origin-top-left"
                style={{ transform: `scale(${zoom})` }}
            >
                <ChatNode
                    node={chatRootNode}
                    parentRef={parentRef}
                    onAddChild={onAddChild}
                    reRender={reRender}
                    updateNodeData={updateNodeData}
                    zoom={zoom}
                />
            </div>
        </main>
    );
}
