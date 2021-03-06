import React, { useEffect, useState } from 'react';
import { Transcript } from '../models/transcript';
import { SentenceTiming } from '../models/word-timing';
import { parseTime } from '../services';
import WaveForm from './wave-form/wave-form';

import './conversation-summary.scss';

/* eslint-disable-next-line */
interface ConversationParticipant {
  totalTime: number;
  name: string;
  sentenceTimings: SentenceTiming[];
  theme: string;
}
export interface ConversationSummaryProps {
  transcript: Transcript;
  totalTime: number;
  currentTime: number;
  setCurrentTime: (time: number) => void;
}

export function ConversationSummary(props: ConversationSummaryProps) {
  const { transcript, totalTime, currentTime, setCurrentTime } = props;
  const [conversationParticipants, setConversationParticipants] = useState<
    ConversationParticipant[]
  >([]);

  const getSentenceTotalTime = (sentenceTimings: SentenceTiming[]): number => {
    return sentenceTimings.reduce((sum, timings) => {
      const sentence = timings.reduce((sentenceSum, timing) => {
        return (
          sentenceSum + parseTime(timing.endTime) - parseTime(timing.startTime)
        );
      }, 0);
      return sum + sentence;
    }, 0);
  };

  useEffect(() => {
    if (!transcript) {
      return;
    }
    const callerSentences = transcript.word_timings.filter(
      (t, i) => i % 2 === 0
    );
    const customerSentences = transcript.word_timings.filter(
      (t, i) => i % 2 !== 0
    );
    const callerTotalTime = getSentenceTotalTime(callerSentences);
    const customerTotalTime = getSentenceTotalTime(customerSentences);
    const conversationTime = callerTotalTime + customerTotalTime;

    setConversationParticipants([
      {
        name: 'You',
        theme: 'purple',
        totalTime: callerTotalTime / conversationTime,
        sentenceTimings: callerSentences,
      },
      {
        name: 'Michael B.',
        theme: 'blue',
        sentenceTimings: customerSentences,
        totalTime: customerTotalTime / conversationTime,
      },
    ]);
  }, [transcript]);

  return (
    <div>
      {conversationParticipants.map((participant, i) => [
        <div
          key={participant.name}
          className={`participant-summary ${participant.theme}`}
        >
          <div>
            <span> {Math.round(participant.totalTime * 100)}% </span>
            <span>{participant.name.toUpperCase()}</span>
          </div>
          <WaveForm
            totalTime={totalTime}
            sentenceTimings={participant.sentenceTimings}
            theme={participant.theme}
            currentTime={currentTime}
            setCurrentTime={(time) => setCurrentTime(time)}
          ></WaveForm>
        </div>,
        i !== conversationParticipants.length - 1 ? (
          <div key={`${participant.name}-timeline`} className="timeline">
            <div>
              <hr />
            </div>
            <div className="border-left border-right position-relative">
              <hr />
              <hr
                className="position-absolute played-timeline"
                style={{
                  width: `${(currentTime / totalTime) * 100}%`,
                }}
              ></hr>
            </div>
          </div>
        ) : null,
      ])}
    </div>
  );
}

export default ConversationSummary;
