import React from "react";

const LatestPosts = () => {
  return (
    <section
      id="latest-posts"
      className="py-12 bg-backgroundLight dark:bg-backgroundDark"
    >
      <div className="container mx-auto px-8 md:px-12 max-w-[1200px] grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold mb-4 text-textDark dark:text-textLight">
            Latest Posts
          </h2>

          {/* Ana Post */}
          <div
            className="bg-gray-800 text-white p-6 h-[300px] flex flex-col justify-end rounded-lg mb-6 bg-cover bg-center"
            style={{ backgroundImage: "url('/assets/manzara.jpg')" }}
          >
            <span className="inline-block bg-yellow-400 text-gray-800 px-2 py-1 rounded-full text-xs font-semibold">
              Seyahat
            </span>
            <h3 className="text-2xl font-bold mt-3">
              5 Lezzetli ve Pratik Yemek Tarifiyle Sofranızı Şenlendirin
            </h3>
            <p className="text-gray-300 text-xs mt-2">
              Elif Yılmaz • Dec 10, 2023 • 15 min read
            </p>
          </div>

          {/* Küçük Postlar */}
          <div className="space-y-4">
            <div className="flex space-x-4 items-center">
              <div
                className="w-1/4 h-[100px] bg-cover bg-center rounded-lg"
                style={{ backgroundImage: "url('/assets/movie.jpg')" }}
              ></div>
              <div className="w-3/4">
                <span className="text-xs text-gray-500">
                  Entertainment • 12 min read
                </span>
                <h4 className="text-lg font-semibold mt-1 text-textDark dark:text-textLight">
                  Movie Night In: How to Create Home Theater Magic
                </h4>
                <p className="text-xs text-gray-500 mt-1">
                  Carol Francis • Jun 11, 2022
                </p>
              </div>
            </div>

            <div className="flex space-x-4 items-center">
              <div
                className="w-1/4 h-[100px] bg-cover bg-center rounded-lg"
                style={{ backgroundImage: "url('/assets/book.jpg')" }}
              ></div>
              <div className="w-3/4">
                <span className="text-xs text-gray-500">
                  Books • 11 min read
                </span>
                <h4 className="text-lg font-semibold mt-1 text-textDark dark:text-textLight">
                  Book Clubs: Where to Find Like-Minded Readers
                </h4>
                <p className="text-xs text-gray-500 mt-1">
                  Sarah McKenzie • Oct 11, 2022
                </p>
              </div>
            </div>
          </div>
          <div className="text-center mt-6">
            <button className="px-4 py-2 mt-4 bg-primary text-white text-sm font-semibold rounded-full hover:bg-secondary transition">
              LOAD MORE POSTS
            </button>
          </div>
        </div>

        {/* Sağ Tarafta - Popüler Bloglar ve Reklam Alanı */}
        <div>
          <h3 className="text-xl font-bold mb-4 text-textDark dark:text-textLight">
            Trending Posts
          </h3>
          <div className="space-y-4">
            <div className="flex space-x-4 items-center">
              <div
                className="w-1/6 h-[50px] bg-cover bg-center rounded-lg"
                style={{ backgroundImage: "url('/assets/hero.jpg')" }}
              ></div>
              <div>
                <h5 className="text-sm font-semibold text-textDark dark:text-textLight">
                  How to Enjoy the Journey and Reach Your Goals
                </h5>
                <span className="text-xs text-gray-500">Jul 11, 2022</span>
              </div>
            </div>

            <div className="flex space-x-4 items-center">
              <div
                className="w-1/6 h-[50px] bg-cover bg-center rounded-lg"
                style={{ backgroundImage: "url('/assets/movie.jpg')" }}
              ></div>
              <div>
                <h5 className="text-sm font-semibold text-textDark dark:text-textLight">
                  How to Grow Your Own Potatoes at Home
                </h5>
                <span className="text-xs text-gray-500">Dec 3, 2022</span>
              </div>
            </div>

            <div className="flex space-x-4 items-center">
              <div
                className="w-1/6 h-[50px] bg-cover bg-center rounded-lg"
                style={{ backgroundImage: "url('/assets/book.jpg')" }}
              ></div>
              <div>
                <h5 className="text-sm font-semibold text-textDark dark:text-textLight">
                  Dishwasher Detergents: What You Need to Know
                </h5>
                <span className="text-xs text-gray-500">Apr 6, 2022</span>
              </div>
            </div>

            <div className="flex space-x-4 items-center">
              <div
                className="w-1/6 h-[50px] bg-cover bg-center rounded-lg"
                style={{ backgroundImage: "url('/assets/makyaj.jpg')" }}
              ></div>
              <div>
                <h5 className="text-sm font-semibold text-textDark dark:text-textLight">
                  Dishwasher Detergents: What You Need to Know
                </h5>
                <span className="text-xs text-gray-500">Apr 6, 2022</span>
              </div>
            </div>
          </div>

          {/* Reklam Alanı */}
          <div className="mt-8 bg-gray-200 h-[250px] flex items-center justify-center rounded-lg">
            <span className="text-sm text-gray-500">Advertisement</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LatestPosts;
