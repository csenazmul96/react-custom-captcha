export const SHAPES = ["triangle", "square", "circle"];
export const COLORS = ["red", "green", "blue"];
export function getRandomColor() {
    const idx = Math.floor(Math.random() * COLORS.length);
    return COLORS[idx];
}
export function getRandomShape() {
    const idx = Math.floor(Math.random() * SHAPES.length);
    return SHAPES[idx];
}
export function generateShapeCells(rows = 5, cols = 5) {
    const totalCells = rows * cols;
    const countPerShape = 5;

    const cells = [];
    let id = 0;
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            cells.push({
                id,
                row,
                col,
                hasShape: false,
                shape: null,
                color: null
            });
            id++;
        }
    }

    const indices = Array.from({ length: totalCells }, (_, i) => i);
    shuffle(indices);

    let cursor = 0;
    for (const shape of SHAPES) {
        for (let i = 0; i < countPerShape; i++) {
            const cellIndex = indices[cursor++];
            cells[cellIndex].hasShape = true;
            cells[cellIndex].shape = shape;
            cells[cellIndex].color = getRandomColor();
        }
    }

    return cells;
}


function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}



export function getCorrectSectorIds(sectors, targetShape, targetColor) {
    return sectors
        .filter(s => s.hasShape && s.shape === targetShape && s.color === targetColor)
        .map(s => s.id);
}
