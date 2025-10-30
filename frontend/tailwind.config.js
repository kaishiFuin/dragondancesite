/** @type {import('tailwindcss').Config} */
import lineClamp from '@tailwindcss/line-clamp';

export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#5D5FEF',
        accent: '#F2A359',
        muted: '#E8EAF6'
      },
      fontFamily: {
        sans: ['"Open Sans"', 'ui-sans-serif', 'system-ui']
      }
    }
  },
  plugins: [lineClamp],
};
