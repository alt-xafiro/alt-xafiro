import { LOCALES } from '@/consts';

export type Locale = (typeof LOCALES)[number];

export type LocalesLocales = {
  [key in Locale]: {
    full: string;
    abbr: string;
  };
};

export type ProjectLocales = {
  data: {
    name: string;
    type: string;
    status: string;
    noPreview: string | null;
  };
  projectLinks: {
    preview: string;
    source: string;
  };
};

export type StackLocales = {
  [key: string]: string;
};
