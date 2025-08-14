import colors from 'tailwindcss/colors';

export default {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          ...colors.yellow,
          main: '#FFC239',
          'subtle-light': '#ffe29f',
          subtle: '#9D7129',
        },
        surface: {
          ...colors.zinc,
          0: '#ffffff', // 0 do White
        },
      },
    },
  },
};
