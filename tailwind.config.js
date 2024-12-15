module.exports = {
  darkMode: "class", // Dark mode'u class tabanlı kullanıyoruz
  theme: {
    extend: {
      colors: {
        backgroundLight: "#FFFFFF", // Beyaz
        backgroundGray: "#F3F4F6", // Hafif gri arka plan
        inputGray: "#E5E7EB", // Daha koyu gri tonu (input arka planı)
        primary: "#18B7BE", // Turkuaz
        secondary: "#178CA4", // Orta tonlu mavi
        backgroundDark: "#072A40", // Koyu mavi
        textDark: "#072A40", // Koyu mavi metin rengi
        textLight: "#F9F7F0", // Açık metin rengi
        sunYellow: "#FFD700", // Güneş ikonu için sarı renk (Altın sarısı)
      },
    },
  },
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  plugins: [],
};
