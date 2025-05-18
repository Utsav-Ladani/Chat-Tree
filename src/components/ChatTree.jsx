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

    const handleWheel = (e) => {
        e.preventDefault();

        if (e.deltaY < 0) {
            setZoom(z => Math.min(z + 0.05, 1));
        } else if (e.deltaY > 0) {
            setZoom(z => Math.max(z - 0.05, 0.4));
        }
    };

    const isZoomOutDisabled = zoom <= 0.4;
    const isZoomInDisabled = zoom >= 1;

    return (
        <main
            className="p-4 overflow-hidden relative"
            onWheel={handleWheel}
        >
            <div className="absolute bottom-4 right-4 z-1 flex items-center gap-3 bg-black border border-gray-800 rounded-full shadow-2xl">
                <button
                    onClick={handleZoomOut}
                    className={`p-2 bg-white text-black border border-black rounded-full disabled:opacity-70 disabled:cursor-not-allowed ${!isZoomOutDisabled ? 'hover:bg-gray-200' : ''}`}
                    disabled={isZoomOutDisabled}
                >
                    <ZoomOut size={16} />
                </button>
                <span className="w-9 text-sm text-center font-medium text-white select-none">
                    {Math.round(zoom * 100)}%
                </span>
                <button
                    onClick={handleZoomIn}
                    className={`p-2 bg-white text-black border border-black rounded-full disabled:opacity-70 disabled:cursor-not-allowed ${!isZoomInDisabled ? 'hover:bg-gray-200' : ''}`}
                    disabled={isZoomInDisabled}
                >
                    <ZoomIn size={16} />
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
