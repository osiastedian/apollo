import React from 'react';
import { SentenceTiming } from '../../models/word-timing';
import { parseTime } from '../../services';

import './wave-form.scss';

/* eslint-disable-next-line */
export interface WaveFormProps {
  sentenceTimings: SentenceTiming[];
  totalTime: number;
  theme: string;
  currentTime: number;
  setCurrentTime: (time: number) => void;
}

export function WaveForm(props: WaveFormProps) {
  return (
    <div className="position-relative wave-form">
      {props.sentenceTimings.map((words) =>
        words.map((word) => (
          <button
            onClick={() => props.setCurrentTime(parseTime(word.startTime))}
            className={`wave-form-bar border-0 ${
              parseTime(word.endTime) > props.currentTime
                ? props.theme
                : 'played'
            }`}
            key={`${word.word}-${word.startTime}-${word.endTime}`}
            style={{
              left: `${(parseTime(word.startTime) / props.totalTime) * 100}%`,
              width: `${
                ((parseTime(word.endTime) - parseTime(word.startTime)) /
                  props.totalTime) *
                100
              }%`,
            }}
          ></button>
        ))
      )}
      <div></div>
    </div>
  );
}

export default WaveForm;
