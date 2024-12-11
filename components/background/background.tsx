'use client';

import { useEffect, useRef } from 'react';

import { renderStars } from './stars';

export default function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    renderStars(canvasRef.current);
  }, []);

  return (
    <div className={`fixed bottom-0 left-0 right-0 top-0 -z-50 bg-space-900`}>
      <canvas
        className={`pointer-events-none h-full w-full bg-space-900`}
        ref={canvasRef}
      />
    </div>
  );
}
