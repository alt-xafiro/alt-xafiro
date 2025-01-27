import { PropsWithChildren } from 'react';

export type CustomComponentProps = PropsWithChildren & {
  className?: string;
};
