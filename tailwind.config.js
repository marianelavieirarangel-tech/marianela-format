/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          50: '#f7f5f3',
          100: '#eee9e4',
          200: '#dcd3c9',
          300: '#c0b3a6',
          400: '#9c8a78',
          500: '#7c6a58',
          600: '#5e4f3f',
          700: '#43382c',
          800: '#2a231b',
          900: '#1a1611',
        },
        blush: {
          50: '#fdf8f6',
          100: '#faece8',
          200: '#f4d4cc',
          300: '#e9b0a3',
          400: '#db8775',
          500: '#c96a55',
          600: '#a84f3d',
          700: '#843d30',
          800: '#5f2e24',
          900: '#3d1f18',
        },
        sand: {
          50: '#faf8f4',
          100: '#f3ede2',
          200: '#e7dcc8',
          300: '#d4c2a4',
          400: '#bda07a',
          500: '#a0835c',
          600: '#7f6847',
          700: '#5f4f37',
          800: '#3f3424',
          900: '#241d14',
        },
        sage: {
          50: '#f5f6f3',
          100: '#e8ebe4',
          200: '#cdd5c6',
          300: '#a7b69c',
          400: '#7e916f',
          500: '#5e7050',
          600: '#475740',
          700: '#344030',
          800: '#1f281d',
          900: '#0f150e',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Garamond', 'Georgia', 'serif'],
        sans: ['"Jost"', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.25em',
        ultra: '0.4em',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'fade-up': 'fadeUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-down': 'fadeDown 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'scale-in': 'scaleIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-in-right': 'slideInRight 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'marquee': 'marquee 28s linear infinite',
        'shimmer': 'shimmer 2.5s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeDown: {
          '0%': { opacity: '0', transform: 'translateY(-28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
