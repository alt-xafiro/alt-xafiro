import challengeJson from './challenge.json';

export type ChallengeData = {
  challengeLink: string;
  projectLocales: string[];
};

export const challengeData = challengeJson as unknown as ChallengeData;
