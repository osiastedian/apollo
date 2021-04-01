import React, { useEffect, useState } from 'react';

import './conversation-intelligence.module.scss';
import ConversationSummary from './conversation-summary/conversation-summary';
import TimeInfo from './conversation-summary/time-info/time-info';
import { Transcript } from './models/transcript';
import PlayerControls from './player-controls/player-controls';
import { transcriptService } from './services';
import TranscriptDetails from './transcript-details/transcript-details';

import './conversation-intelligence.module.scss';

/* eslint-disable-next-line */
export interface ConversationIntelligenceProps {}

export function ConversationIntelligence(props: ConversationIntelligenceProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [transcript, setTranscript] = useState<Transcript>();
  const [audioUrl, setAudioUrl] = useState<string>();

  const [audioEl, setAudioEl] = useState<HTMLAudioElement>();
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [totalTime, setTotalTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState(1);

  useEffect(() => {
    const transcriptId = 'transcript-1';
    transcriptService.getTranscript(transcriptId).then((fetchedTranscript) => {
      setTranscript(fetchedTranscript);
      setAudioUrl(transcriptService.getTranscriptAudioUrl(transcriptId));
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (audioUrl) {
      setAudioEl(new Audio(audioUrl));
    }
  }, [audioUrl]);

  useEffect(() => {
    if (!audioEl) {
      return;
    }
    audioEl.ontimeupdate = () => setCurrentTime(audioEl.currentTime);
    audioEl.ondurationchange = () => setTotalTime(audioEl.duration);
    audioEl.onplay = () => setIsPlaying(true);
    audioEl.onpause = () => setIsPlaying(false);
    audioEl.onratechange = () => setSpeed(audioEl.playbackRate);
  }, [audioEl]);

  const toggleAudio = () => {
    if (!audioEl) {
      return;
    }
    if (audioEl.paused) {
      audioEl.play();
    } else {
      audioEl.pause();
    }
  };

  const rewindAudio = () => {
    if (!audioEl) {
      return;
    }
    const targetTime = Math.max(currentTime - 10, 0);
    audioEl.currentTime = targetTime;
  };

  const forwardAudio = () => {
    if (!audioEl) {
      return;
    }
    const targetTime = Math.min(currentTime + 10, totalTime);
    audioEl.currentTime = targetTime;
  };
  return isLoading ? (
    <span>Loading</span>
  ) : (
    <div>
      <div className="summary-container">
        <PlayerControls
          audioControls={{
            isPlaying: isPlaying,
            playToggle: () => toggleAudio(),
            rewind: () => rewindAudio(),
            forward: () => forwardAudio(),
          }}
          speedControl={{
            speed: speed,
            updateSpeed: (rate) => {
              if (!audioEl) return;
              audioEl.playbackRate = rate;
            },
          }}
        ></PlayerControls>
        <div className="border-bottom p-3">
          <TimeInfo currentTime={currentTime} totalTime={totalTime}></TimeInfo>
          {transcript ? (
            <ConversationSummary
              transcript={transcript}
              totalTime={totalTime}
              currentTime={currentTime}
              setCurrentTime={(time) => {
                if (audioEl) audioEl.currentTime = time;
              }}
            ></ConversationSummary>
          ) : null}
        </div>
      </div>
      {transcript ? (
        <TranscriptDetails
          transcript={transcript}
          currentTime={currentTime}
          setCurrentTime={(time) => {
            if (audioEl) audioEl.currentTime = time;
          }}
        ></TranscriptDetails>
      ) : null}
    </div>
  );
}

export default ConversationIntelligence;
