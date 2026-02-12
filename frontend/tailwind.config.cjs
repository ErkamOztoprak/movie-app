/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        mint: "#E2FBE2",
        "baby-blue": "#E2EEFB",
        lavender: "#E2E7FB",
        lilac: "#F0E2FB",
        lime: "#F3FBE2",
        champagne: "#FBF3E2",
        forest: "#2D4A3E",
        sage: "#5A7A6E",

        "mint-dark": '#1a3a2e',
        'baby-blue-dark': '#1a2d3f',
        'lavender-dark': '#2a2d4a',
        'lilac-dark': '#3a2d4a',
        'lime-dark': '#2e3a1a',
        'champagne-dark': '#3a341a',
        "forest-dark": '#0f1e1a',
        'sage-dark': '#2a3f38',
      },
      fontFamily: {
        sans: ["Arial", "Helvetica Neue", "Helvetica", "sans-serif"]
      }
    }
  }
};
