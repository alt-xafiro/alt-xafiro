import CenteredContent from '@/components/centered-content/centered-content';

export default function NotFound() {
  return (
    <CenteredContent>
      <div className="flex flex-col items-center space-y-6 text-center">
        <h1 className="text-6xl">404</h1>
        <p className="text-xl">This page could not be found.</p>
      </div>
    </CenteredContent>
  );
}
