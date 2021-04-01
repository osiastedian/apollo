import React, { useEffect, useState } from 'react';

/* eslint-disable-next-line */
export interface SpeedControlProps {
  speed: number;
  updateSpeed: (speed: number) => void;
}

export function SpeedControl(props: SpeedControlProps) {
  const speedOptions: number[] = [0.5, 0.75, 1, 1.5, 2];
  const [speedOptionIndex, setSpeedOptionIndex] = useState(2);

  useEffect(() => {
    const index = speedOptions.findIndex(
      (speedOption) => speedOption === props.speed
    );
    setSpeedOptionIndex(index === -1 ? 2 : index);
    return () => {};
  }, [speedOptions, props.speed]);

  const toggleSpeed = () => {
    const newIndex = (speedOptionIndex + 1) % speedOptions.length;
    props.updateSpeed(speedOptions[newIndex]);
  };

  return (
    <button
      style={{
        border: '1px solid #D0D9E2',
      }}
      className="btn btn-sm px-3 py-1 rounded-pill bg-white mx-3"
      onClick={toggleSpeed}
    >
      {speedOptions[speedOptionIndex].toFixed(2)}x
    </button>
  );
}

export default SpeedControl;
