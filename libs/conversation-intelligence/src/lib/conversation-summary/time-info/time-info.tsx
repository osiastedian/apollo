import React from 'react';
import { getTimeString } from '../../services';

import './time-info.module.scss';

/* eslint-disable-next-line */
export interface TimeInfoProps {
  currentTime: number;
  totalTime: number;
}

export function TimeInfo(props: TimeInfoProps) {
  return (
    <div
      className="px-2 py-1 rounded d-inline-block mb-3"
      style={{ backgroundColor: '#EFF3F6' }}
    >
      <span>{getTimeString(props.currentTime)}</span>
      <span style={{ color: '#7E8FA5' }}>
        /{getTimeString(isNaN(props.totalTime) ? 0 : props.totalTime)}
      </span>
    </div>
  );
}

export default TimeInfo;
