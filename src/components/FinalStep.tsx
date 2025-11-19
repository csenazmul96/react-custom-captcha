import React from 'react';
import {useCommonContext} from "@/context/CommonContext";

FinalStep.propTypes = {

};

function FinalStep() {
    const {setStep, result} = useCommonContext();
    const statusText = result === 'pass' ? "CAPTCHA Passed" : "CAPTCHA Failed";
    const description = result === 'pass'
        ? "You have been verified as human."
        : "Your selection did not match. Please try again.";
    return (
        <div className="space-y-4 text-center">
            <h2 className="text-lg font-semibold">{statusText}</h2>
            <p className="text-sm text-slate-300">{description}</p>

            <div className="flex justify-center gap-2">
                {result === 'fail' && (
                    <button
                        type="button"
                        onClick={()=>setStep('camera')}
                        className="px-4 py-2 rounded-md bg-slate-700 hover:bg-slate-600 text-sm font-medium"
                    >
                        Retry
                    </button>
                )}
            </div>
        </div>
    );
}

export default FinalStep;