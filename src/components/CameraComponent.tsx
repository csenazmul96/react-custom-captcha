"use client"

import {useEffect, useRef, useState} from "react";
import {useCommonContext} from "@/context/CommonContext";

function CameraComponent() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const streamRef = useRef<MediaStream>(null);
    const canvasRef = useRef < HTMLCanvasElement>(null);
    const {square, setSquare } = useCommonContext();

    const trigarSquare = () => {

        const interval = setInterval(() => {
            const video = videoRef.current;
            if (!video) return;

            const containerWidth = video.clientWidth || 320;
            const containerHeight = video.clientHeight || 240;
            const size = 120;

            const maxX = containerWidth - size;
            const maxY = containerHeight - size;

            setSquare({
                x: Math.random() * maxX,
                y: Math.random() * maxY,
                size
            });
        }, 1000);

        return ()=> clearInterval(interval);
    }


    useEffect(() => {
        async function startCamera() {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode: "user" },
                });
                streamRef.current = stream;
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    trigarSquare()
                }
            } catch (err) {
                console.error("Camera error:", err);
            }
        }

        startCamera();

        return () => {
            if (streamRef.current) {
                streamRef.current.getTracks().forEach((t) => t.stop());
            }
        };
    }, []);


    const handleContinue = () => {

    };
    
    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold">Human verification</h2>
            <p className="text-sm text-slate-300">
                Align your face and click <span className="font-semibold">Continue</span>.
                A moving square will be captured from your live camera.
            </p>
            <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                />
                <div
                    className="absolute border-1 border-white-400"
                    style={{
                        left: square.x,
                        top: square.y,
                        width: square.size,
                        height: square.size,
                    }}
                />
            </div>
            <canvas ref={canvasRef} className="hidden" />
            <div className="flex justify-end">
                <button
                    type="button"
                    onClick={handleContinue}
                    className="px-4 py-2 rounded-md bg-emerald-500 hover:bg-emerald-400 text-sm font-medium"
                >
                    Continue
                </button>
            </div>
        </div>
    );
}

export default CameraComponent;