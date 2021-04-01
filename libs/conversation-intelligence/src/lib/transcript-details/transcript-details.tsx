import React, { useState } from 'react';
import { Transcript } from '../models/transcript';
import TranscriptEntry from './transcript-entry/transcript-entry';

import './transcript-details.scss';

/* eslint-disable-next-line */
export interface TranscriptDetailsProps {
  transcript: Transcript;
  currentTime: number;
  setCurrentTime: (time: number) => void;
}

export function TranscriptDetails({
  transcript,
  currentTime,
  setCurrentTime,
}: TranscriptDetailsProps) {
  const [searchText, setSearchText] = useState('');

  return (
    <div className="mt-4">
      <div className="form-group px-3 search col-md-4">
        <img src="/assets/svgs/icon-search.svg" alt="search" />
        <input
          className="form-control"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
          placeholder="Search call transcript"
        ></input>
      </div>
      <div className="overflow-auto">
        {transcript.transcript_text.map((text, i) => (
          <TranscriptEntry
            key={text}
            currentTime={currentTime}
            wordTimings={transcript.word_timings[i]}
            setCurrentTime={(time) => setCurrentTime(time)}
            theme={i % 2 === 0 ? 'purple' : 'blue'}
            indent={i % 2 === 0 ? 0 : 5}
            searchText={searchText}
          ></TranscriptEntry>
        ))}
      </div>
    </div>
  );
}

export default TranscriptDetails;
