import { Transcript } from '../models/transcript';

export class TranscriptService {
    async getTranscript(id: string): Promise<Transcript> {
        const resp = await fetch(`/assets/transcripts/${id}.json`);
        const val = await resp.json();
        return val as Transcript;
    }

    getTranscriptAudioUrl(id: string): string {
        return `./assets/transcript-audio/${id}.wav`;
    }
}
