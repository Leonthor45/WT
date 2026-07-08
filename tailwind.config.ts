import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],

  theme: {
    extend: {

      colors: {

        /* Fondo principal */

        bg: '#0b0b0b',

        /* Tarjetas */

        surface: '#151515',

        surfaceSoft: '#1d1d1d',

        /* Colores WT */

        accent: '#c62828',

        accentHover: '#e53935',

        steel: '#6b7280',

        carbon: '#111111',

        olive: '#4b5320',

        border: 'rgba(255,255,255,.08)',

      },

      boxShadow: {

        soft: '0 10px 35px rgba(0,0,0,.45)',

        glow:
          '0 0 0 1px rgba(198,40,40,.18), 0 15px 45px rgba(198,40,40,.20)',

        card:
          '0 12px 30px rgba(0,0,0,.50)',

        red:
          '0 0 25px rgba(198,40,40,.30)',

      },

      borderRadius: {

        xl: '16px',

        '2xl': '20px',

        '3xl': '28px',

      },

      backgroundImage: {

        carbon:
          'linear-gradient(135deg, rgba(255,255,255,.02) 25%, transparent 25%, transparent 50%, rgba(255,255,255,.02) 50%, rgba(255,255,255,.02) 75%, transparent 75%, transparent)',

        hangar:
          'linear-gradient(180deg,#111 0%,#0b0b0b 100%)',

      },

      transitionTimingFunction: {

        military: 'cubic-bezier(0.2,0.8,0.2,1)',

      },

    },
  },

  plugins: [],
};

export default config;
