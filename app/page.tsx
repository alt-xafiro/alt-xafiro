import CenteredContent from '@/components/centered-content/centered-content';
import Greeting from '@/components/greeting/greeting';

export default function Home() {
  return (
    <>
      <h1 className="sr-only">About me</h1>
      <CenteredContent>
        <Greeting />
      </CenteredContent>
    </>
  );
}
