import React, { useState } from "react";
import Visualizer from "./components/Visualizer";
import { getBubbleSortAnimations } from "./algorithms/bubbleSort.js";
import { getSelectionSortAnimations } from "./algorithms/selectionSort.js";
import "./App.css";
import { getInsertionSortAnimations } from "./algorithms/insertionSort.js";
import { getMergeSortAnimations } from "./algorithms/mergeSort.js";

function App() {
    const [array, setArray] = useState(
        Array.from({ length: 30 }, () => Math.floor(Math.random() * 300) + 10)
    );
    const [animations, setAnimations] = useState([]);
    const [isSorting, setIsSorting] = useState(false);
    const [speed, setSpeed] = useState(50);

    const handleReset = () => {
        setArray(
            Array.from(
                { length: 30 },
                () => Math.floor(Math.random() * 300) + 10
            )
        );
        setAnimations([]);
        setIsSorting(false);
    };

    const startSort = (algoType) => {
        let anims = [];
        if (algoType === "bubble") anims = getBubbleSortAnimations(array);
        if (algoType === "selection") anims = getSelectionSortAnimations(array);
        if (algoType === "insertion") anims = getInsertionSortAnimations(array);
        if (algoType === "merge") anims = getMergeSortAnimations(array);
        setAnimations(anims);
        setIsSorting(true);
    };

    return (
        <div className="app-container">
            <h1>Algorithm Visualizer</h1>
            <Visualizer
                array={array}
                animations={animations}
                isSorting={isSorting}
                speed={speed}
                onComplete={() => setIsSorting(false)}
            />
            <div className="controls">
                <div className="speed-control">
                    <label>Speed: {speed} ms</label>
                    <span> Fast</span>
                    <input
                        type="range"
                        min="5"
                        max="200"
                        step="5"
                        value={speed}
                        onChange={(e) => setSpeed(Number(e.target.value))}
                        disabled={isSorting}
                    />
                    <span> Slow</span>
                </div>

                <button onClick={handleReset} disabled={isSorting}>
                    New Array
                </button>
                <button
                    onClick={() => startSort("bubble")}
                    disabled={isSorting}
                >
                    Bubble Sort
                </button>
                <button
                    onClick={() => startSort("selection")}
                    disabled={isSorting}
                >
                    Selection Sort
                </button>
                <button
                    onClick={() => startSort("insertion")}
                    disabled={isSorting}
                >
                    Insertion Sort
                </button>
                <button onClick={() => startSort("merge")} disabled={isSorting}>
                    MergeSort
                </button>
            </div>
        </div>
    );
}

export default App;
