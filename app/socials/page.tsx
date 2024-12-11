import CenteredContent from '@/components/centered-content/centered-content';
import Socials from '@/components/socials/socials';

export default function Page() {
  return (
    <>
      <h1 className="sr-only">Socials</h1>
      <CenteredContent>
        <Socials />
      </CenteredContent>
    </>
  );
}
