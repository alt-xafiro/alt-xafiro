import { challengeData } from '../model/challenge';
import { Challenge } from './challenge';

export function Page() {
  return <Challenge data={challengeData} />;
}
