'use client';

import clsx from 'clsx';

import { useRef } from 'react';

import { CustomComponentProps } from '@shared/lib';

import { useStars } from './useStars';

type StarsProps = CustomComponentProps;

export function Background({ className }: StarsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasWrapperRef = useRef<HTMLDivElement>(null);

  useStars({ canvasRef, wrapperRef: canvasWrapperRef });

  return (
    <div
      className={clsx(
        className,
        'fixed bottom-0 left-0 -z-50 h-screen w-full bg-space-900'
      )}
      ref={canvasWrapperRef}
    >
      <canvas className="pointer-events-none h-full w-full" ref={canvasRef} />
    </div>
  );
}
