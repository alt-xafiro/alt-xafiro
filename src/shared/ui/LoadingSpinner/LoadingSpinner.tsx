import { CustomComponentProps } from '@shared/lib';

import './styles.css';

type LoadingProps = CustomComponentProps;

export function LoadingSpinner({ className }: LoadingProps) {
  return (
    <div className={className}>
      <div className="loading-spinner"></div>
    </div>
  );
}
