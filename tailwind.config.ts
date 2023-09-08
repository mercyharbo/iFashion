import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        'sm': '320px',      // Small screens, such as mobile phones
        'md': '768px',      // Medium screens, such as tablets
        'lg': '1024px',     // Large screens, such as laptops
        'xl': '1280px',     // Extra large screens, such as desktops
        '2xl': '1536px',    // Extra-extra large screens
        '3xl': '1920px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config
