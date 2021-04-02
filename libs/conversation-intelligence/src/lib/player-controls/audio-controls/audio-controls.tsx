import React from 'react';

import rewindIcon from './rotate-left.svg';
import forwardIcon from './rotate-right.svg';
import playIcon from './play-circle-fill.svg';
import pauseIcon from './pause-circle-fill.svg';

/* eslint-disable-next-line */
export interface AudioControlsProps {
  isPlaying: boolean;
  playToggle: () => void;
  rewind: () => void;
  forward: () => void;
}

export function AudioControls(props: AudioControlsProps) {
  return (
    <div>
      <button className="border-0" onClick={() => props.rewind()}>
        <img src={rewindIcon} alt="rewind"></img>
      </button>
      <button className="border-0" onClick={() => props.playToggle()}>
        <img
          src={props.isPlaying ? pauseIcon : playIcon}
          alt={props.isPlaying ? 'pause' : 'play'}
        ></img>
      </button>
      <button className="border-0" onClick={() => props.forward()}>
        <img src={forwardIcon} alt="forward"></img>
      </button>
    </div>
  );
}

export default AudioControls;
