/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    'node_modules/flowbite-vue/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        // Custom screen sizes for responsive card layout
        '2xs': '320px',
        '3xs': '280px',
      },
      spacing: {
        // Custom spacing classes for layout and card padding/margin
        '16': '4rem',
        '20': '5rem',
        '24': '6rem',
      },
      fontSize: {
        // Optional: Discord-inspired slightly larger font sizes
        '2xl': ['1.5rem', '2.25rem'],
        '3xl': ['1.75rem', '2.5rem'],
      },
      colors: {
        // Optional: Discord color scheme
        primary: {
          "50":"#eff6ff",
          "100":"#dbeafe",
          "200":"#bfdbfe",
          "300":"#93c5fd",
          "400":"#60a5fa",
          "500":"#3b82f6",
          "600":"#2563eb",
          "700":"#1d4ed8",
          "800":"#1e40af",
          "900":"#1e3a8a",
          "950":"#172554"
        },
        discordBlue: '#5865F2', // Optional custom color
        discordGray: '#36393F', // Optional custom color
      },
      borderRadius: {
        // Custom card border radius
        'lg': '8px',
      },
      boxShadow: {
        // Subtle card shadow
        'card': '0 4px 8px rgba(0, 0, 0, 0.15)',
      },
      transitionProperty: {
        // Hover transition for card styles
        'hover': 'all .15s ease-in-out',
      },
    },
  },
  plugins: [require('flowbite/plugin')],
};
