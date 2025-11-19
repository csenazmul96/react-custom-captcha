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
            {step === "camera" && <CameraComponent /> }  {/* at the primary state where userface is captured */}
            {step === "puzzle" && <PuzzleComponent /> } {/* Puzzle state where user will select target shape with color  */}
            {step === "finish" && <FinalStep /> } {/* make sure is user selected currect target shape and color.  */}
        </div>
    );
}

export default CaptchaWrapper;