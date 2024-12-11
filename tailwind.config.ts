import tailwindScrollbar from 'tailwind-scrollbar';
import type { Config } from 'tailwindcss';

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      keyframes: {
        rotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(3600deg)' }
        }
      },
      animation: {
        rotate: '5s cubic-bezier(0.22, 1, 0.36, 1) 1 alternate forwards rotate'
      },
      colors: {
        space: {
          '100': '#b0cce8',
          '200': '#80a8d1',
          '700': '#1f293d',
          '800': '#171b2b',
          '900': '#020512'
        }
      }
    },
    screens: {
      '2xl': { max: '1535px' },
      'xl': { max: '1279px' },
      '3lg': { max: '1200px' },
      '2lg': { max: '1087px' },
      'lg': { max: '1023px' },
      'md': { max: '767px' },
      'h-md': { raw: '((max-width: 767px) and (max-height: 512px))' },
      'sm': { max: '639px' }
    }
  },
  plugins: [
    tailwindScrollbar({
      nocompatible: true,
      preferredStrategy: 'pseudoelements'
    })
  ]
} satisfies Config;
