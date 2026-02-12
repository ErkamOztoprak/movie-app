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
        sage: "#5A7A6E"
      },
      fontFamily: {
        sans: ["Arial", "Helvetica Neue", "Helvetica", "sans-serif"]
      }
    }
  }
};
