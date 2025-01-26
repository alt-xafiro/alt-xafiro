import challengeJson from './challenge.json';

export type ChallengeData = {
  currentDay: number;
  projectLocales: string[];
};

export const challengeData = challengeJson as unknown as ChallengeData;
