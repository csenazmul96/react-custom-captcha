"use client"
import React, {useState} from 'react';
import CameraComponent from "@/components/CameraComponent";
import {useCommonContext} from "@/context/CommonContext";
import PuzzleComponent from "@/components/PuzzleComponent";
import FinalStep from "@/components/FinalStep";

function CaptchaWrapper() {
    const {step, result} = useCommonContext();
    
    return (
        <div className="w-full max-w-lg mx-auto rounded-xl shadow-lg bg-slate-900 text-slate-100 p-4 space-y-4">
            {step === "camera" && <CameraComponent /> }
            {step === "puzzle" && <PuzzleComponent /> }
            {step === "finish" && <FinalStep /> }
        </div>
    );
}

export default CaptchaWrapper;