module.exports = {
  darkMode: "class",
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
        sunYellow: "#FFD700",
        hoverSunYellow: "#FFC300",
        categories: {
          react: "#61DAFB", // React rengi (Mavi ton)
          javascript: "#F7DF1E", // JavaScript rengi (Sarı ton)
          css: "#2965F1", // CSS rengi (Mavi ton)
          teknoloji: "#9B59B6", // Teknoloji (Mor ton)
          sağlık: "#2ECC71", // Sağlık (Yeşil ton)
          yemek: "#E67E22", // Yemek Tarifleri (Turuncu ton)
          default: "#10B981", // Varsayılan yeşil ton
        },
      },
    },
  },
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  plugins: [],
};
