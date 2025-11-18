'use client'
import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from "react";

interface Square {
    x: number;
    y: number;
    size: number;
}

interface CommonContextType {
    square: Square;
    step: string | "camera";
    setStep: Dispatch<SetStateAction<string>>;
    setSquare: Dispatch<SetStateAction<Square>>;
}

const CommonContext = createContext<CommonContextType>({
    square: { x: 50, y: 50, size: 120 },
    step: "camera",
    setStep: () => {},
    setSquare: () => {},
});

export const CommonContextProvider = ({ children }: { children: ReactNode }) => {
    const [square, setSquare] = useState<Square>({ x: 50, y: 50, size: 120 });
    const [step, setStep] = useState("camera");


    const contexts = {
        square,
        step,
        setSquare,
        setStep,
    };

    return (
        <CommonContext.Provider value={contexts}>
            {children}
        </CommonContext.Provider>
    );
};

export const useCommonContext = () => useContext(CommonContext);
