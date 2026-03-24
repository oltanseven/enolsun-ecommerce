import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          25:  '#f6faf3',
          50:  '#ecf5e7',
          100: '#d4e8c9',
          200: '#b5d6a3',
          300: '#8fbf74',
          400: '#6ba54e',
          500: '#4f7a3a',
          600: '#436832',
          700: '#37552a',
          800: '#2c4422',
          900: '#1e2f17',
          950: '#121d0e',
        },
        neutral: {
          25:  '#fafafa',
          50:  '#f5f5f5',
          100: '#e5e5e5',
          200: '#d4d4d4',
          300: '#a3a3a3',
          400: '#737373',
          500: '#525252',
          600: '#404040',
          700: '#2d2d2d',
          800: '#1a1a1a',
          900: '#0f0f0f',
        },
        success: { light: '#dcfce7', base: '#22c55e', dark: '#15803d' },
        warning: { light: '#fef9c3', base: '#eab308', dark: '#a16207' },
        error:   { light: '#fee2e2', base: '#ef4444', dark: '#b91c1c' },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        'align-xs': '0 1px 2px 0 rgba(0,0,0,0.05)',
        'align-sm': '0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px -1px rgba(0,0,0,0.1)',
        'align-md': '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)',
        'align-lg': '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)',
        'align-xl': '0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)',
      },
      keyframes: {
        fadeInUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%':   { opacity: '0', transform: 'translateX(-16px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%':   { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        slideInLeft: {
          '0%':   { opacity: '0', transform: 'translateX(-32px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'fade-in-up':    'fadeInUp 0.6s ease-out forwards',
        'fade-in':       'fadeIn 0.5s ease-out forwards',
        'slide-in':      'slideIn 0.5s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.6s ease-out forwards',
        'float':         'float 6s ease-in-out infinite',
        'shimmer':       'shimmer 3s ease-in-out infinite',
        'scale-in':      'scaleIn 0.4s ease-out forwards',
      },
    },
  },
  plugins: [],
}

export default config
