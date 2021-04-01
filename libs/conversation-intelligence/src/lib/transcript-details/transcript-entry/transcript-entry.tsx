import React, { useEffect, useState } from 'react';
import { SentenceTiming, WordTiming } from '../../models/word-timing';
import { getTimeString, parseTime } from '../../services';
import './transcript-entry.scss';

/* eslint-disable-next-line */
export interface TranscriptEntryProps {
  wordTimings: WordTiming[];
  currentTime: number;
  setCurrentTime: (time: number) => void;
  theme: 'blue' | 'purple';
  indent: number;
  searchText: string;
}

const isWithinTiming = (wordTiming: WordTiming, time: number): boolean => {
  const startTime = parseTime(wordTiming.startTime);
  const endTime = parseTime(wordTiming.endTime);
  return startTime <= time && endTime > time;
};

interface HighlightableWord extends WordTiming {
  highlighted: boolean;
}

function HighlightableWordContainer({
  wordTiming,
  setCurrentTime,
}: {
  wordTiming: HighlightableWord;
  setCurrentTime: (time: number) => void;
}) {
  return (
    <span
      onClick={() => setCurrentTime(parseTime(wordTiming.startTime))}
      className={`rounded ${wordTiming.highlighted ? 'highlighted' : ''}`}
    >
      {`${wordTiming.word} `}
    </span>
  );
}

export function TranscriptEntry(props: TranscriptEntryProps) {
  const [isHighlighted, setIsHighlighted] = useState(false);

  const [highlightableWords, setHighlightableWords] = useState<
    HighlightableWord[]
  >([]);

  useEffect(() => {
    const highlightableWords: HighlightableWord[] = props.wordTimings.map(
      (timing) => {
        const containsSearchResult =
          props.searchText !== '' &&
          timing.word.toLowerCase().search(props.searchText.toLowerCase()) !==
            -1;
        return {
          ...timing,
          highlighted:
            containsSearchResult || isWithinTiming(timing, props.currentTime),
        };
      }
    );

    setIsHighlighted(highlightableWords.some((w) => w.highlighted));

    setHighlightableWords(highlightableWords);
  }, [props.searchText, props.wordTimings, props.currentTime]);

  const share = (wordTimings: SentenceTiming) => {
    alert(`Share: \n\n ${wordTimings.map((t) => t.word).join(' ')}`);
  };

  return (
    <div
      className={`p-3 transcript-entry d-flex pl-${props.indent} ${
        props.theme
      } ${isHighlighted ? 'highligthed' : null}`}
    >
      <span className="time-start">
        {getTimeString(parseTime(props.wordTimings[0].startTime))}
      </span>
      <div className="border-left px-2 mx-3 mb-0 content">
        <p className="">
          {highlightableWords.map((wordTiming, i) => (
            <HighlightableWordContainer
              wordTiming={wordTiming}
              key={i}
              setCurrentTime={(time) => props.setCurrentTime(time)}
            ></HighlightableWordContainer>
          ))}
        </p>
        <button
          className="btn btn-link btn-sm share"
          onClick={() => share(props.wordTimings)}
        >
          Share
        </button>
      </div>
    </div>
  );
}

export default TranscriptEntry;
