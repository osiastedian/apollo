import { TranscriptService } from './transcript-service';

export const transcriptService = new TranscriptService();
export const parseTime = (time: string): number => parseFloat(time.replace('s', ''));
export const getTimeString = (timeInSeconds: number): string => {
    return new Date(timeInSeconds * 1000).toISOString().substr(14, 5);
};
