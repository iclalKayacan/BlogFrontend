module.exports = {
  darkMode: "class", // Dark mode'u class tabanlı kullanıyoruz
  theme: {
    extend: {
      colors: {
        backgroundLight: "#FFFFFF",
        backgroundGray: "#F3F4F6",
        inputGray: "#E5E7EB",
        primary: "#18B7BE",
        secondary: "#178CA4",
        backgroundDark: "#072A40",
        textDark: "#072A40",
        textLight: "#F9F7F0",
        sunYellow: "#FFD700", // Güneş ikonu için sarı renk
        hoverSunYellow: "#FFC300", // Hover için daha yumuşak sarı tonu
      },
    },
  },
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  plugins: [],
};
