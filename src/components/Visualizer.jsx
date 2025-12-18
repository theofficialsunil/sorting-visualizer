import React, { useState, useEffect } from 'react';

const Visualizer = ({ array, animations, isSorting, onComplete, speed }) => {
  const [comparing, setComparing] = useState([]);
  const [localArray, setLocalArray] = useState([...array]);

  useEffect(() => {
    setLocalArray([...array]);
  }, [array]);

  useEffect(() => {
    if (isSorting && animations.length > 0) {
      playAnimations();
    }
  }, [isSorting]);

  const playAnimations = async () => {
    let tempArray = [...localArray];
    for (const move of animations) {
      if (move.type === 'compare') {
        setComparing(move.indices);
      } else if (move.type === 'swap') {
        const [i, j] = move.indices;
        const [valI, valJ] = move.values;
        tempArray[i] = valI;
        tempArray[j] = valJ;
        setLocalArray([...tempArray]);
      } else if (move.type === 'uncompare') {
        setComparing([]);
      }
      await new Promise(r => setTimeout(r, speed));
    }
    onComplete();
  };

  return (
    <div className="bar-container">
      {localArray.map((value, idx) => (
        <div
          className="bar"
          key={idx}
          style={{
            height: `${value}px`,
            width: '12px',
            backgroundColor: comparing.includes(idx) ? '#ff4d4d' : '#61dafb'
          }}
        />
      ))}
    </div>
  );
};

export default Visualizer;