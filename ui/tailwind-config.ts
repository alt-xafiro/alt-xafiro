import resolveConfig from 'tailwindcss/resolveConfig';

import tailwindConfigFile from '@/tailwind.config';

const tailwindConfig = resolveConfig(tailwindConfigFile);

export const colors = tailwindConfig.theme.colors as unknown as Record<
  string,
  string
>;

const breakpoints = tailwindConfig.theme.screens as unknown as {
  [key: string]: {
    max: string;
  };
};

export const getBreakpoint = (breakpoint: string) => {
  if (!breakpoints[breakpoint]) {
    return 0;
  }

  return parseInt(breakpoints[breakpoint].max, 10);
};
