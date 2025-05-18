import { useState, useRef, useEffect, useCallback } from "react";

export default function useZoomPan(chatRootNode) {
    const [zoom, setZoom] = useState(1);
    const [translate, setTranslate] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const isDraggingRef = useRef(false);
    const lastPos = useRef({ x: 0, y: 0 });
    const pinchState = useRef({ initialDistance: null, initialZoom: 1 });

    useEffect(() => {
        setZoom(1);
        setTranslate({ x: 0, y: 0 });
    }, [chatRootNode]);

    const isZoomOutDisabled = zoom <= 0.4;
    const isZoomInDisabled = zoom >= 1.5;

    const handleZoomIn = useCallback(() => setZoom(z => Math.min(z + 0.1, 1.5)), []);

    const handleZoomOut = useCallback(() => setZoom(z => Math.max(z - 0.1, 0.4)), []);

    const handleWheel = useCallback((e) => {
        e.preventDefault();

        if (e.metaKey || e.ctrlKey) {
            window.requestAnimationFrame(() => {
                if (e.deltaY < 0) {
                    setZoom(z => Math.min(z * 1.03, 1.5));
                } else if (e.deltaY > 0) {
                    setZoom(z => Math.max(z * 0.97, 0.4));
                }
            });
        } else {
            window.requestAnimationFrame(() => {
                setTranslate((prev) => ({
                    x: prev.x - e.deltaX,
                    y: prev.y - e.deltaY,
                }));
            });
        }
    }, []);

    // Move these up so they can be referenced in other hooks
    const handleMouseMove = useCallback((e) => {
        if (!isDraggingRef.current) return;

        window.requestAnimationFrame(() => {
            const dx = e.clientX - lastPos.current.x;
            const dy = e.clientY - lastPos.current.y;

            setTranslate((prev) => ({ x: prev.x + dx, y: prev.y + dy }));

            lastPos.current = { x: e.clientX, y: e.clientY };
        });
    }, []);

    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
        isDraggingRef.current = false;

        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
    }, [handleMouseMove]);

    const handleMouseDown = useCallback((e) => {
        if (e.target.closest('.chat')) return;

        setIsDragging(true);
        isDraggingRef.current = true;
        lastPos.current = { x: e.clientX, y: e.clientY };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
    }, [handleMouseMove, handleMouseUp]);

    // Touch events
    const handleTouchStart = useCallback((e) => {
        if (e.touches.length === 2) {
            const dx = e.touches[0].clientX - e.touches[1].clientX;
            const dy = e.touches[0].clientY - e.touches[1].clientY;

            pinchState.current.initialDistance = Math.sqrt(dx * dx + dy * dy);
            pinchState.current.initialZoom = zoom;
        } else if (e.touches.length === 1) {
            setIsDragging(true);
            isDraggingRef.current = true;
            lastPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        }
    }, [zoom]);

    const handleTouchMove = useCallback((e) => {
        if (e.touches.length === 2 && pinchState.current.initialDistance) {
            const dx = e.touches[0].clientX - e.touches[1].clientX;
            const dy = e.touches[0].clientY - e.touches[1].clientY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const scale = distance / pinchState.current.initialDistance;

            let newZoom = pinchState.current.initialZoom * scale;
            newZoom = Math.max(0.4, Math.min(1.5, newZoom));
            setZoom(newZoom);
        } else if (e.touches.length === 1 && isDraggingRef.current) {
            window.requestAnimationFrame(() => {
                const dx = e.touches[0].clientX - lastPos.current.x;
                const dy = e.touches[0].clientY - lastPos.current.y;

                setTranslate((prev) => ({ x: prev.x + dx, y: prev.y + dy }));

                lastPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
            });
        }
    }, []);

    const handleTouchEnd = useCallback((e) => {
        if (e.touches.length < 2) {
            pinchState.current.initialDistance = null;
        }

        if (e.touches.length === 0) {
            setIsDragging(false);
            isDraggingRef.current = false;
        }
    }, []);

    // Attach/detach mousemove/mouseup listeners
    useEffect(() => {
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [handleMouseMove, handleMouseUp]);

    return {
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
    };
} 