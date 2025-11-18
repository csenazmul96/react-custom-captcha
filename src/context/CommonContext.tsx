'use client'
import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from "react";

interface Square {
    x: number;
    y: number;
    size: number;
}

interface SquareData {
    x: number;
    y: number;
    size: number;
    videoWidth: number | null;
    videoHeight: number | null;
}

interface CommonContextType {
    square: Square;
    step: string | "camera";
    result: string | null;
    setResult: Dispatch<SetStateAction<string>>;
    capturedSquareData: SquareData  | null;
    capturedImage: string | null;
    setStep: Dispatch<SetStateAction<string>>;
    setSquare: Dispatch<SetStateAction<Square>>;
    setCapturedSquareData: Dispatch<SetStateAction<SquareData>>;
    setCapturedImage: Dispatch<SetStateAction<string | null>>;
}

const CommonContext = createContext<CommonContextType>({
    square: { x: 50, y: 50, size: 120 },
    step: "camera",
    result: null,
    setResult: () => {},
    capturedSquareData: null,
    capturedImage: null,
    setStep: () => {},
    setSquare: () => {},
    setCapturedImage: () => {},
    setCapturedSquareData: () => {},
});

export const CommonContextProvider = ({ children }: { children: ReactNode }) => {
    const [square, setSquare] = useState<Square>({ x: 50, y: 50, size: 120 });
    const [step, setStep] = useState("camera");
    const [capturedSquareData, setCapturedSquareData] = useState(null);
    const [capturedImage, setCapturedImage] = useState(null);
    const [result, setResult] = useState(null);


    const contexts = {
        square,
        capturedImage,
        capturedSquareData,
        step,
        result,
        setSquare,
        setResult,
        setStep,
        setCapturedImage,
        setCapturedSquareData,
    };

    return (
        <CommonContext.Provider value={contexts}>
            {children}
        </CommonContext.Provider>
    );
};

export const useCommonContext = () => useContext(CommonContext);
