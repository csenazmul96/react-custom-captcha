import React, {useEffect, useMemo, useState} from 'react';
import {useCommonContext} from "@/context/CommonContext";
import {generateShapeCells, getCorrectSectorIds} from "@/helper/commonHelper";

function ShapeIcon({ shape, color }: { shape: string, color: string }) {
    const tintClass = {
        red: "border-red-400",
        green: "border-green-400",
        blue: "border-blue-400"
    }[color] || "border-white/80";

    if (shape === "circle") {
        return (
            <div className="absolute inset-0 flex items-center justify-center">
                <div className={`w-4 h-4 rounded-full border-1 ${tintClass}`} />
            </div>
        );
    }
// square shapes
    if (shape === "square") {
        return (
            <div className="absolute inset-0 flex items-center justify-center">
                <div className={`w-4 h-4 border-1 ${tintClass}`} />
            </div>
        );
    }

    //triangle shapes
    return (
        <div className="absolute inset-0 flex items-center justify-center">
            <div
                className={`w-0 h-0  border-l-[8px] border-r-[8px] border-b-[15px] border-l-transparent border-r-transparent ${tintClass}`}
                aria-hidden="true"
            />
        </div>
    );
}

interface Sector {
    id: number,
    row: number,
    col: number,
    hasShape: boolean,
    shape: string | null,
    color?: string | null,
}

function PuzzleComponent() {
    const {capturedImage, capturedSquareData: square, setStep,result, setResult} = useCommonContext();
    const [sectors, setSectors] = useState<Sector[]>([]);
    const [targetShape, setTargetShape] = useState<string | null>(null);
    const [targetColor, setTargetColor] = useState<string | null>(null);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const ROWS = 5;
    const COLS = 5;

    useEffect(() => { // at the beginning generate list of object data structure for  5X5 puzzle squares
        const sectorsData = generateShapeCells(); // generate actual data structure
        setSectors(sectorsData);

        const puzzleShapes = sectorsData.filter((sector) => sector.hasShape);
        if (puzzleShapes.length > 0) {
            const randomIndex = Math.floor(Math.random() * puzzleShapes.length);
            const randomShape = puzzleShapes[randomIndex];
            setTargetShape(randomShape.shape); // set random target shape from generated puzzle data structure
            setTargetColor(randomShape.color); // set random target color from generated puzzle data structure
        }
    }, []);

    const toggleSector = (id: number) => { // handle user click for select any shape or color
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
        );
    };

    const correctIds = useMemo( // filter out correct IDS from generated data structure
        () => (targetShape && targetColor
                ? getCorrectSectorIds(sectors, targetShape, targetColor)
                : []
        ),
        [sectors, targetShape, targetColor]
    );

    const handleValidate = () => { // handle continue button click for next finish step
        if (!targetShape) return;
        setIsSubmitting(true);
        const checkResult = sameElements(selectedIds, correctIds) // check is user selected items is match to target color and shape correct or not
        setResult(checkResult ? 'pass' : 'fail')
        setStep('finish')
    };



    function sameElements(a: number[], b: number[]) {
        if (a.length !== b.length) return false;
        return [...a].sort().toString() === [...b].sort().toString();
    }

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold">Puzzle</h2>
            <p className="text-sm text-slate-300">
                Select all sectors inside the square that contain a{" "}
                <span className="font-semibold">{targetColor} {targetShape}</span> watermark.
            </p>
            <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
                {capturedImage && <img
                    src={capturedImage}
                    alt="Captured frame"
                    className="w-full h-full object-cover"
                />
                }
                <div
                    className="absolute border-1 border-white-400 bg-white/50"
                    style={{
                        left: `${square?.x}px`,
                        top: `${square?.y}px`,
                        width: `${square?.size}px`,
                        height: `${square?.size}px`,
                    }}
                >

                    <div className="w-full h-full grid" style={{ gridTemplateRows: `repeat(${ROWS}, 1fr)`, gridTemplateColumns: `repeat(${COLS}, 1fr)` }}>
                        {sectors.map((sector) => {
                            const isSelected = selectedIds.includes(sector.id);
                            return (
                                <button
                                    key={sector.id}
                                    type="button"
                                    onClick={() => toggleSector(sector.id)}
                                    className={[
                                        "relative border  cursor-pointer border-white-500/40 focus:outline-none transition",
                                        isSelected ? "bg-white/75" : "bg-transparent",
                                    ].join(" ")}
                                >

                                    {sector.hasShape && sector.shape && (
                                        <ShapeIcon shape={sector.shape} color={sector.color || 'white'} />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
            <div className="flex justify-end">
                <button
                    type="button"
                    onClick={handleValidate}
                    disabled={isSubmitting}
                    className="px-4 py-2 rounded-md bg-emerald-500 hover:bg-emerald-400 text-sm font-medium"
                >
                    {isSubmitting ? "Validating..." : "Validate"}
                </button>
            </div>
        </div>
    );
}



export default PuzzleComponent;