'use client';

import clsx from 'clsx';
import { useRef } from 'react';

import { CustomComponentProps } from '@shared/lib';

import { useStars } from './use-stars';

type StarsProps = CustomComponentProps;

export function Background({ className }: StarsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useStars(canvasRef);

  return (
    <div
      className={clsx(
        className,
        'fixed bottom-0 left-0 right-0 top-0 -z-50 bg-space-900'
      )}
    >
      <canvas
        className="pointer-events-none h-full w-full bg-space-900"
        ref={canvasRef}
      />
    </div>
  );
}
