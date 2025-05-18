import { ZoomOut, ZoomIn } from "lucide-react";
import React from "react";

export default function ChatTreeControls({ zoom, onZoomIn, onZoomOut, isZoomInDisabled, isZoomOutDisabled }) {
    return (
        <div className="absolute bottom-4 right-4 z-1 flex items-center gap-3 bg-black border border-gray-800 rounded-full shadow-2xl">
            <button
                onClick={onZoomOut}
                className={`p-2 bg-white text-black border border-black rounded-full disabled:opacity-70 disabled:cursor-not-allowed ${!isZoomOutDisabled ? 'hover:bg-gray-200' : ''}`}
                disabled={isZoomOutDisabled}
            >
                <ZoomOut size={16} />
            </button>
            <span className="w-9 text-sm text-center font-medium text-white select-none">
                {Math.round(zoom * 100)}%
            </span>
            <button
                onClick={onZoomIn}
                className={`p-2 bg-white text-black border border-black rounded-full disabled:opacity-70 disabled:cursor-not-allowed ${!isZoomInDisabled ? 'hover:bg-gray-200' : ''}`}
                disabled={isZoomInDisabled}
            >
                <ZoomIn size={16} />
            </button>
        </div>
    );
} 