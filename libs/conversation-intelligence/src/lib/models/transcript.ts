import { SentenceTiming } from './word-timing';

export interface Transcript {
    transcript_text: string[];
    word_timings: SentenceTiming[];
}
