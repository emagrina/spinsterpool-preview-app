import type { Config } from "tailwindcss";
import { nextui } from '@nextui-org/react';


const config: Config = {
  content: [
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  darkMode: 'class',
  plugins: [
    nextui({
      themes: {
        'custom-dark': {
          extend: 'dark',
          colors: {
            background: '#3f0f0b',
            foreground: '#ffffff',
            primary: {
              50: '#fef5ee',
              100: '#fce8d8',
              200: '#f9cdaf',
              300: '#f4aa7d',
              400: '#ef7d48',
              500: '#eb5e28',
              600: '#dc421a',
              700: '#b73117',
              800: '#91281b',
              900: '#752419',
              DEFAULT: '#eb5e28',
              foreground: '#ffffff',
            },
            focus: '#dc421a',
          },
          layout: {
            disabledOpacity: '0.3',
            radius: {
              small: '4px',
              medium: '6px',
              large: '8px',
            },
            borderWidth: {
              small: '1px',
              medium: '2px',
              large: '3px',
            },
          },
        },
      },
    }),
  ],
};
export default config;
