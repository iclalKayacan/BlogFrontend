import React from "react";

const HeroSection = () => {
  return (
    <section
      className="relative bg-cover bg-center h-[600px] flex items-center"
      style={{
        backgroundImage: "url('/assets/backgr.jpg')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white mx-auto px-4">
        <h1 className="text-3xl md:text-5xl font-bold mb-6">
          <span className="text-primary">Yazmanın Gücüyle</span> Dünyanı İnşa
          Et!
        </h1>
        <p className="text-base md:text-lg mb-4 max-w-2xl mx-auto leading-relaxed">
          Tutkulu yazarlar, keşfetmeye doymayan okuyucular ve sınırsız konu
          çeşitliliği ile{" "}
          <span className="text-sunYellow font-semibold">Blog Dünyasına</span>{" "}
          hoş geldiniz. İlham al, yaz ve paylaş!
        </p>
        <div className="flex justify-center gap-3">
          <a
            href="#latest-posts"
            className="bg-primary hover:bg-secondary text-white font-semibold px-5 py-2 text-sm rounded-full transition-all"
          >
            Son Yazıları Keşfet
          </a>

          <a
            href="#categories"
            className="bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold px-5 py-2 text-sm rounded-full transition-all"
          >
            Kategorilere Göz At
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
