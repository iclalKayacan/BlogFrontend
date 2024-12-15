import React from "react";

const RandomPosts = () => {
  return (
    <section className="py-8 bg-backgroundGray dark:bg-backgroundDark min-h-[800px]">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
        {/* Sol Tarafta Büyük Görsel */}
        <div
          className="relative col-span-2 md:col-span-2 h-[600px] bg-cover bg-center rounded-lg"
          style={{ backgroundImage: "url('/assets/cake.jpg')" }}
        >
          <div className="absolute inset-0 bg-black opacity-40 rounded-lg"></div>
          <div className="absolute bottom-6 left-6 text-white">
            <span className="bg-yellow-400 text-gray-800 px-2 py-1 rounded-full text-sm">
              Yemek
            </span>
            <h2 className="text-3xl font-bold mt-2">
              Amazing Milk Chocolate Cupcakes with Buttercream
            </h2>
            <p className="text-sm mt-2 max-w-sm text-gray-200">
              Lorem ipsum dolor sit amet elit. Vitae nostrum ipsum vero tempore
              esse.
            </p>
          </div>
        </div>

        {/* Sağ Tarafta Küçük Kartlar */}
        <div className="space-y-6">
          {/* Kart 1 */}
          <div
            className="relative h-[325px] bg-cover bg-center rounded-lg"
            style={{ backgroundImage: "url('/assets/teknoloji.jpg')" }}
          >
            <div className="absolute inset-0 bg-black opacity-40 rounded-lg"></div>
            <div className="absolute bottom-4 left-4 text-white">
              <span className="bg-green-400 text-gray-800 px-2 py-1 rounded-full text-sm">
                Teknoloji
              </span>
              <h3 className="text-lg font-semibold mt-2">
                Geleceği Şekillendiren Teknoloji Trendleri
              </h3>
            </div>
          </div>

          {/* Kart 2 */}
          <div
            className="relative h-[250px] bg-cover bg-center rounded-lg"
            style={{ backgroundImage: "url('/assets/makyaj.jpg')" }}
          >
            <div className="absolute inset-0 bg-black opacity-40 rounded-lg"></div>
            <div className="absolute bottom-4 left-4 text-white">
              <span className="bg-blue-400 text-gray-800 px-2 py-1 rounded-full text-sm">
                Moda ve Güzellik
              </span>
              <h3 className="text-lg font-semibold mt-2">
                2025’in Öne Çıkan Moda ve Güzellik Trendleri
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RandomPosts;
