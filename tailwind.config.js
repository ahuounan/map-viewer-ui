module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: ['./**/*.ts', './**/*.tsx', './**/*.html'],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        '150px': '150px',
        '300px': '300px',
        '450px': '450px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
