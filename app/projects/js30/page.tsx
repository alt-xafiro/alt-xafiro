import js30ChallengeJson from '@/data/js30-challenge.json';

import { Js30ChallengeData } from '@/types';

import Js30Challenge from '@/components/js30-challenge/js30-challenge';

const js30ChallengeData = js30ChallengeJson as unknown as Js30ChallengeData;

export default function Page() {
  return <Js30Challenge data={js30ChallengeData} />;
}
