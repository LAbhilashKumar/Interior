/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        charcoal: {
          DEFAULT: '#1a1714',
          soft: '#221e1a',
          deep: '#131110',
        },
        cream: {
          DEFAULT: '#f5f1ea',
          dim: '#e8e2d6',
          muted: '#c9c1b3',
        },
        brass: {
          DEFAULT: '#b8915f',
          light: '#d4b283',
          dark: '#9a7644',
        },
        walnut: {
          DEFAULT: '#5c4332',
          light: '#7a5a44',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
