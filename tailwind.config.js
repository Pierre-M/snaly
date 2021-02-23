module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        backdrop: "rgba(0, 0, 0, .8)",
        "white-20": "rgba(255, 255, 255, .5)",
      },
      width: {
        "1/8": "12.5%",
      },
    },
    backdropFilter: {
      blur: "blur(20px)",
    },
  },
  variants: {
    extend: {
      scale: ["active"],
      borderColor: ["focus-within"],
    },
  },
  plugins: [require("tailwindcss-filters")],
};
