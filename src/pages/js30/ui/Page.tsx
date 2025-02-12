import { challengeData } from '../model/challenge';
import { Challenge } from './Challenge/Challenge';

export function Page() {
  return <Challenge data={challengeData} />;
}
