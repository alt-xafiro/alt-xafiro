'use client';

import clamp from 'just-clamp';
import { RefObject, useEffect } from 'react';

import { Colors, getRandomNumber } from '@shared/lib';

const StarsConfig = {
  MIN_STARS_COUNT: 500,
  MAX_STARS_COUNT: 1200,
  STARS_COUNT_MULTIPLIER: 1,
  STARS_SPEED: 0.005,
  SPACE_COLOR: Colors.space['900'],
  STARS_DENSITY: 1608 // lower = more dense
} as const;

export function useStars(canvasRef: RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    if (!canvasRef || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d')!;

    class Star {
      angle: number;
      distance: number;
      speed: number;
      color: { r: number; g: number; b: number; a: number };
      fadeIn: number;

      constructor() {
        this.angle = 0;
        this.distance = 0;
        this.speed = 0;
        this.color = { r: 255, g: 255, b: 255, a: 1 };
        this.fadeIn = 0;
      }
    }

    let stars: Star[] = [];

    let starsCount: number;

    let canvasWidth: number;
    let canvasHeight: number;
    let canvasCenter: {
      x: number;
      y: number;
    };

    const setStarsCount = () => {
      starsCount = clamp(
        StarsConfig.MIN_STARS_COUNT,
        Math.floor(
          ((window.innerWidth * window.innerHeight) /
            window.devicePixelRatio /
            StarsConfig.STARS_DENSITY) *
            StarsConfig.STARS_COUNT_MULTIPLIER
        ),
        StarsConfig.MAX_STARS_COUNT
      );
    };

    const setCansvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const scale = Math.max(window.devicePixelRatio, 1);

      canvasWidth = canvas.width;
      canvasHeight = canvas.height;

      canvas.width = canvasWidth * scale;
      canvas.height = canvasHeight * scale;

      canvas.style.width = canvasWidth + 'px';
      canvas.style.height = canvasHeight + 'px';

      ctx.scale(scale, scale);

      canvasCenter = { x: canvasWidth / 2, y: canvasHeight / 2 };
    };

    setCansvasSize();
    setStarsCount();

    const createStars = () => {
      const newStarsCount = starsCount - stars.length;

      for (let i = 0; i < newStarsCount; i++) {
        const newStar = new Star();

        newStar.angle = getRandomNumber(0, 2 * Math.PI);
        newStar.speed = getRandomNumber(10, 100);
        newStar.distance = getRandomNumber(
          20,
          canvasWidth / 2 + canvasHeight / 2
        );

        const lum = getRandomNumber(1, 255);
        newStar.fadeIn = getRandomNumber(0.01, 1);
        newStar.color.r = lum;
        newStar.color.g = lum;
        newStar.color.b = lum;

        stars.push(newStar);
      }
    };

    const updateStars = () => {
      for (const star of stars) {
        star.distance +=
          star.speed *
          StarsConfig.STARS_SPEED *
          (star.distance / (canvasWidth / 2 + canvasHeight / 2));
        star.fadeIn += 0.01;

        if (star.fadeIn > 1) {
          star.fadeIn = 1;
        }

        if (star.distance > canvasWidth / 2 + canvasHeight / 2) {
          star.angle = getRandomNumber(0, 2 * Math.PI);
          star.speed = getRandomNumber(10, 100);
          star.distance = getRandomNumber(
            1,
            canvasWidth / 2 + canvasHeight / 2
          );

          const lum = getRandomNumber(1, 255);
          star.fadeIn = 0;
          star.color.r = lum;
          star.color.g = lum;
          star.color.b = lum;
        }
      }
    };

    const draw = () => {
      ctx.fillStyle = StarsConfig.SPACE_COLOR;
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      for (const star of stars) {
        const starX = Math.cos(star.angle) * star.distance + canvasCenter.x;
        const starY = Math.sin(star.angle) * star.distance + canvasCenter.y;
        const starTransparency =
          star.color.a * (star.distance / 100) * star.fadeIn;

        ctx.beginPath();
        ctx.arc(
          starX,
          starY,
          1 / window.devicePixelRatio,
          0,
          2 * Math.PI,
          false
        );
        ctx.fillStyle = `rgba(${star.color.r}, ${star.color.g}, ${star.color.b}, ${starTransparency})`;
        ctx.fill();
      }
    };

    const handleWindowResize = () => {
      setCansvasSize();
      setStarsCount();

      if (stars.length > starsCount) {
        stars = stars.slice(0, starsCount);
      }

      if (stars.length < starsCount) {
        createStars();
      }
    };

    const frame = () => {
      updateStars();
      draw();
      window.requestAnimationFrame(frame);
    };

    createStars();
    frame();

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [canvasRef]);
}
