import React from "react";

const RandomPosts = () => {
  return (
    <section className="py-6 bg-backgroundGray dark:bg-backgroundDark min-h-[600px]">
      <div className="container mx-auto px-8 md:px-12 max-w-[1200px] grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
        {/* Sol Tarafta Büyük Görsel */}
        <div
          className="relative col-span-2 h-[450px] bg-cover bg-center rounded-lg"
          style={{ backgroundImage: "url('/assets/cake.jpg')" }}
        >
          <div className="absolute inset-0 bg-black opacity-40 rounded-lg"></div>
          <div className="absolute bottom-4 left-4 text-white">
            <span className="bg-yellow-400 text-gray-800 px-2 py-1 rounded-full text-sm">
              Yemek
            </span>
            <h2 className="text-2xl font-bold mt-2">
              Amazing Milk Chocolate Cupcakes with Buttercream
            </h2>
            <p className="text-xs mt-1 max-w-sm text-gray-200">
              Lorem ipsum dolor sit amet elit. Vitae nostrum ipsum vero tempore
              esse.
            </p>
          </div>
        </div>

        {/* Sağ Tarafta Küçük Kartlar */}
        <div className="space-y-4">
          {/* Kart 1 */}
          <div
            className="relative h-[230px] bg-cover bg-center rounded-lg"
            style={{ backgroundImage: "url('/assets/teknoloji.jpg')" }}
          >
            <div className="absolute inset-0 bg-black opacity-40 rounded-lg"></div>
            <div className="absolute bottom-3 left-3 text-white">
              <span className="bg-green-400 text-gray-800 px-2 py-1 rounded-full text-sm">
                Teknoloji
              </span>
              <h3 className="text-base font-semibold mt-1">
                Geleceği Şekillendiren Teknoloji Trendleri
              </h3>
            </div>
          </div>

          {/* Kart 2 */}
          <div
            className="relative h-[200px] bg-cover bg-center rounded-lg "
            style={{ backgroundImage: "url('/assets/makyaj.jpg')" }}
          >
            <div className="absolute inset-0 bg-black opacity-40 rounded-lg"></div>
            <div className="absolute bottom-3 left-3 text-white">
              <span className="bg-blue-400 text-gray-800 px-2 py-1 rounded-full text-sm">
                Moda ve Güzellik
              </span>
              <h3 className="text-base font-semibold mt-1">
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
