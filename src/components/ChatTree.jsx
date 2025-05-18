import { ZoomOut } from "lucide-react";
import ChatNode from "./ChatNode";
import React, { useState, useRef, useEffect } from "react";
import { ZoomIn } from "lucide-react";

export default function ChatTree({ chatRootNode, parentRef, onAddChild, reRender, updateNodeData, onDeleteNode }) {
    const [zoom, setZoom] = useState(1);

    const [translate, setTranslate] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const isDraggingRef = useRef(false);
    const lastPos = useRef({ x: 0, y: 0 });

    useEffect(() => {
        setZoom(1);
        setTranslate({ x: 0, y: 0 });
    }, [chatRootNode]);

    if (!chatRootNode) {
        return null;
    }

    const isZoomOutDisabled = zoom <= 0.4;
    const isZoomInDisabled = zoom >= 1;

    const handleZoomIn = () => setZoom(z => Math.min(z + 0.1, 1));
    const handleZoomOut = () => setZoom(z => Math.max(z - 0.1, 0.4));

    const handleWheel = (e) => {
        window.requestAnimationFrame(() => {
            if (e.deltaY < 0) {
                setZoom(z => Math.min(z * 1.03, 1));
            } else if (e.deltaY > 0) {
                setZoom(z => Math.max(z * 0.97, 0.4));
            }
        });
    };

    const handleMouseDown = (e) => {
        // Prevent drag if mouse down is on a Chat component
        if (e.target.closest('.chat')) {
            return;
        }

        setIsDragging(true);
        isDraggingRef.current = true;

        lastPos.current = { x: e.clientX, y: e.clientY };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
    };

    const handleMouseMove = (e) => {
        if (!isDraggingRef.current) return;

        window.requestAnimationFrame(() => {
            const dx = e.clientX - lastPos.current.x;
            const dy = e.clientY - lastPos.current.y;

            setTranslate((prev) => ({ x: prev.x + dx, y: prev.y + dy }));

            lastPos.current = { x: e.clientX, y: e.clientY };
        });
    };

    const handleMouseUp = () => {
        setIsDragging(false);

        isDraggingRef.current = false;

        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
    };

    return (
        <main
            className={`p-4 overflow-hidden relative ${isDragging ? 'cursor-grabbing select-none' : 'cursor-default'}`}
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
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
                className="origin-center"
                style={{
                    transform: `translate(${translate.x}px, ${translate.y}px) scale(${zoom})`,
                }}
            >
                <ChatNode
                    node={chatRootNode}
                    parentRef={parentRef}
                    onAddChild={onAddChild}
                    reRender={reRender}
                    updateNodeData={updateNodeData}
                    zoom={zoom}
                    translate={translate}
                    onDeleteNode={onDeleteNode}
                />
            </div>
        </main>
    );
}
