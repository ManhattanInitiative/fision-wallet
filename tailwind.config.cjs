module.exports = {
  content: ["./src/**/*.{js,ts,svelte,tsx}"],
  theme: {
    extend: {
      colors: {
        secondary: {
          1: "#1b1b1b",
          2: "#1e1e1e",
        },
      },
      spacing: {
        128: "32rem",
        144: "36rem",
      },
    },
  },
  plugins: [],
};
