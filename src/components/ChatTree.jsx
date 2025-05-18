import ChatNode from "./ChatNode";
import ChatTreeControls from "./ChatTreeControls";
import useZoomPan from "./useZoomPan";
import React from "react";

export default function ChatTree({ chatRootNode, parentRef, onAddChild, reRender, updateNodeData, onDeleteNode }) {
    const {
        zoom,
        translate,
        isDragging,
        handleWheel,
        handleMouseDown,
        handleTouchStart,
        handleTouchMove,
        handleTouchEnd,
        handleZoomIn,
        handleZoomOut,
        isZoomInDisabled,
        isZoomOutDisabled,
        resetZoomPan,
    } = useZoomPan(chatRootNode);

    if (!chatRootNode) return null;

    return (
        <main
            className={`p-4 overflow-hidden relative ${isDragging ? 'cursor-grabbing select-none' : 'cursor-default'}`}
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchEnd}
        >
            <ChatTreeControls
                zoom={zoom}
                onZoomIn={handleZoomIn}
                onZoomOut={handleZoomOut}
                isZoomInDisabled={isZoomInDisabled}
                isZoomOutDisabled={isZoomOutDisabled}
                onReset={resetZoomPan}
            />
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
