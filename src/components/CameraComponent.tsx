"use client"

import {useEffect, useRef, useState} from "react";
import {useCommonContext} from "@/context/CommonContext";

function CameraComponent() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const streamRef = useRef<MediaStream>(null);
    const canvasRef = useRef < HTMLCanvasElement>(null);
    const {square, setSquare, setCapturedImage, setCapturedSquareData, setStep} = useCommonContext();

    const trigarSquare = () => {
        // change trangle position at every second randomly
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


    useEffect(() => { // initially call camera and square tringle run
        async function startCamera() {
            try {
                const frontCameraConstraints = { video: { facingMode: "user" }, audio: false }; //camera setup for front camera
                const anyCameraConstraints = { video: true, audio: false }; // camera setup for any camera
                // I am using here universal method for access camera instead of platform wise different approce use.
                console.log(1)
                let stream = await navigator.mediaDevices.getUserMedia(frontCameraConstraints); // sometimes make a problem for access front camera device wise
console.log(2)
                if (!stream) {
                    stream = await navigator.mediaDevices.getUserMedia(anyCameraConstraints); // trying to access any camera device if first approce is fail
                }
                streamRef.current = stream;
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    trigarSquare() // after camera start then start random square movement.
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
        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (!video || !canvas) return;


        // match canvas to video size
        canvas.width = video.videoWidth || 640;
        canvas.height = video.videoHeight || 480;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageDataUrl = canvas.toDataURL("image/png"); //capture image from canva for next step

        setCapturedImage(imageDataUrl) // already captured video set to context state
        setCapturedSquareData({ //set square size and position to context state for next step use
            x: square.x,
            y: square.y,
            size: square.size,
            videoWidth: canvas.width,
            videoHeight: canvas.height,
        })
        setStep('puzzle')
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