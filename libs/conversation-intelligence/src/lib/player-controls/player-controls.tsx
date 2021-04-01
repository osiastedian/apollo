import React from 'react';
import AudioControls, { AudioControlsProps } from './audio-controls/audio-controls';
import SpeedControl from './speed-control/speed-control';

/* eslint-disable-next-line */
export interface PlayerControlsProps {
  audioControls: AudioControlsProps;
    speedControl: {
        speed: number;
        updateSpeed: (speed: number) => void;
    };
}

export function PlayerControls(props: PlayerControlsProps) {
  return (
    <div
      className="p-3 d-flex"
      style={{
        backgroundColor: '#EFF3F6',
      }}
    >
      <AudioControls
        isPlaying={props.audioControls.isPlaying}
        playToggle={() => props.audioControls.playToggle()}
        rewind={() => props.audioControls.rewind()}
        forward={() => props.audioControls.forward()}
      ></AudioControls>
      <SpeedControl
        speed={props.speedControl.speed}
        updateSpeed={(speed) => props.speedControl.updateSpeed(speed)}
      ></SpeedControl>
    </div>
  );
}

export default PlayerControls;
