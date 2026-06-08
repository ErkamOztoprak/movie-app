/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        // Requested palette
        fume: "#1A1D20",
        chalk: "#F8F9FA",
        mustard: "#D4A373",
        brick: "#E07A5F",

        // Backward-compatible semantic aliases used in templates
        mint: "#F8F9FA",
        "baby-blue": "#F8F9FA",
        lavender: "#E07A5F",
        lilac: "#E07A5F",
        lime: "#D4A373",
        champagne: "#D4A373",
        forest: "#1A1D20",
        sage: "#B18A63",

        "mint-dark": "#1A1D20",
        "baby-blue-dark": "#2A2E33",
        "lavender-dark": "#C86B52",
        "lilac-dark": "#B65E49",
        "lime-dark": "#B3885F",
        "champagne-dark": "#9B744F",
        "forest-dark": "#14171A",
        "sage-dark": "#7A6044",
      },
      fontFamily: {
        sans: ["Manrope", "Arial", "Helvetica Neue", "Helvetica", "sans-serif"],
        body: ["Manrope", "Arial", "Helvetica Neue", "Helvetica", "sans-serif"],
        display: ["Cormorant Garamond", "Georgia", "serif"],
        accent: ["Manrope", "Arial", "Helvetica Neue", "Helvetica", "sans-serif"]
      }
    }
  }
};
