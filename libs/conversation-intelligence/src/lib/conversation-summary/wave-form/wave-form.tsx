import React from 'react';
import { SentenceTiming } from '../../models/word-timing';
import { parseTime } from '../../services';

/* eslint-disable-next-line */
export interface WaveFormProps {
  sentenceTimings: SentenceTiming[];
  totalTime: number;
  backgroundColor: string;
  currentTime: number;
  setCurrentTime: (time: number) => void;
}

export function WaveForm(props: WaveFormProps) {
  return (
    <div className="position-relative" style={{ height: '25px' }}>
      {props.sentenceTimings.map((words) =>
        words.map((word) => (
          <button
            onClick={() => props.setCurrentTime(parseTime(word.startTime))}
            className="wave-form-bar border-0"
            key={`${word.word}-${word.startTime}-${word.endTime}`}
            style={{
              backgroundColor:
                parseTime(word.endTime) > props.currentTime
                  ? props.backgroundColor
                  : '#B7C0CE',
              height: '100%',
              position: 'absolute',
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
