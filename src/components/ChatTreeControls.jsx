import { ZoomOut, ZoomIn, RefreshCw } from "lucide-react";
import React, { useState } from "react";

export default function ChatTreeControls({ zoom, onZoomIn, onZoomOut, isZoomInDisabled, isZoomOutDisabled, onReset }) {
    const [showTooltip, setShowTooltip] = useState(false);
    return (
        <div className="absolute bottom-4 right-4 z-1 flex items-center bg-black border border-gray-800 rounded-md shadow-2xl">
            <button
                onClick={onZoomOut}
                className={`p-2 bg-white text-black border border-black rounded-md disabled:opacity-70 disabled:cursor-not-allowed ${!isZoomOutDisabled ? 'hover:bg-gray-200' : ''}`}
                disabled={isZoomOutDisabled}
            >
                <ZoomOut size={16} />
            </button>
            <span className="w-12 text-sm text-center font-medium text-white select-none">
                {Math.round(zoom * 100)}%
            </span>
            <button
                onClick={onZoomIn}
                className={`p-2 bg-white text-black border border-black rounded-md disabled:opacity-70 disabled:cursor-not-allowed ${!isZoomInDisabled ? 'hover:bg-gray-200' : ''}`}
                disabled={isZoomInDisabled}
            >
                <ZoomIn size={16} />
            </button>
            <div className="relative">
                <button
                    onClick={onReset}
                    className="p-2 bg-white text-black border border-black rounded-md hover:bg-gray-200"
                    title="Reset zoom and pan to default"
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                >
                    <RefreshCw size={16} />
                </button>
                {showTooltip && (
                    <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded shadow-lg whitespace-nowrap pointer-events-none">
                        Reset zoom and pan
                    </div>
                )}
            </div>
        </div>
    );
} 