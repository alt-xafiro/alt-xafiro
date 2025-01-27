import resolveConfig from 'tailwindcss/resolveConfig';

import tailwindConfigFile from '@@/tailwind.config';

const tailwindConfig = resolveConfig(tailwindConfigFile);

export const Colors = tailwindConfig.theme.colors as unknown as Record<
  string,
  string
>;

const Breakpoints = tailwindConfig.theme.screens as unknown as {
  [key: string]: {
    max: string;
  };
};

export const getBreakpoint = (breakpoint: string) => {
  if (!Breakpoints[breakpoint]) return 0;

  return parseInt(Breakpoints[breakpoint].max, 10);
};
