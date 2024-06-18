import rippleui from 'rippleui';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        appleGray: {
          50: '#F8F9FA',
          100: '#F1F3F5',
          200: '#E9ECEF',
          300: '#DEE2E6',
          400: '#CED4DA',
          500: '#ADB5BD',
          600: '#6C757D',
          700: '#495057',
          800: '#343A40',
          900: '#212529',
        },
        appleBlue: {
          50: '#E7F1FF',
          100: '#C8DCFF',
          200: '#A4C4FF',
          300: '#7EABFF',
          400: '#5E96FF',
          500: '#3C82FF',
          600: '#1B6FFF',
          700: '#005CFF',
          800: '#0048CC',
          900: '#003399',
        },
      },
    },
  },
  plugins: [
    rippleui({
      themes: [
        {
          themeName: 'light',
          colorScheme: 'light',
          colors: {
            primary: '#007AFF',
            backgroundPrimary: '#F8F9FA',
            backgroundSecondary: '#FFFFFF',
            border: '#CED4DA',
            content1: '#000000',
            content2: '#6C757D',
            content3: '#ADB5BD',
            buttonText: '#FFFFFF',
          },
        },
        {
          themeName: 'dark',
          colorScheme: 'dark',
          colors: {
            primary: '#0A84FF',
            backgroundPrimary: '#1C1C1E',
            backgroundSecondary: '#2C2C2E',
            border: '#3A3A3C',
            content1: '#FFFFFF',
            content2: '#F2F2F7',
            content3: '#636366',
            buttonText: '#FFFFFF',
          },
        },
      ],
    }),
  ],
};
