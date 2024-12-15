import React from "react";

const LatestPosts = () => {
  return (
    <section
      id="latest-posts"
      className="py-12 pb-32 bg-backgroundLight dark:bg-backgroundDark"
    >
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        <div className="md:col-span-2">
          <h2 className="text-3xl font-bold mb-6 text-textDark dark:text-textLight">
            Latest Posts
          </h2>

          {/* Ana Post */}
          <div
            className="bg-gray-800 text-white p-8 h-[400px] flex flex-col justify-end rounded-lg mb-8 bg-cover bg-center"
            style={{ backgroundImage: "url('/assets/manzara.jpg')" }}
          >
            <span className="inline-block bg-yellow-400 text-gray-800 px-2 py-1 rounded-full text-sm font-semibold">
              Seyahat
            </span>

            <h3 className="text-3xl font-bold mt-4">
              5 Lezzetli ve Pratik Yemek Tarifiyle Sofranızı Şenlendirin
            </h3>
            <p className="text-gray-300 mt-4">
              Elif Yılmaz • Dec 10, 2023 • 15 min read
            </p>
          </div>

          {/* Küçük Postlar */}
          <div className="space-y-8">
            <div className="flex space-x-6 items-center">
              <div
                className="w-1/4 h-[120px] bg-cover bg-center rounded-lg"
                style={{ backgroundImage: "url('/assets/movie.jpg')" }}
              ></div>
              <div className="w-3/4">
                <span className="text-sm text-gray-500">
                  Entertainment • 12 min read
                </span>
                <h4 className="text-xl font-semibold mt-2 text-textDark dark:text-textLight">
                  Movie Night In: How to Create Home Theater Magic
                </h4>
                <p className="text-sm text-gray-500 mt-2">
                  Carol Francis • Jun 11, 2022
                </p>
              </div>
            </div>

            <div className="flex space-x-6 items-center">
              <div
                className="w-1/4 h-[120px] bg-cover bg-center rounded-lg"
                style={{ backgroundImage: "url('/assets/book.jpg')" }}
              ></div>
              <div className="w-3/4">
                <span className="text-sm text-gray-500">
                  Books • 11 min read
                </span>
                <h4 className="text-xl font-semibold mt-2 text-textDark dark:text-textLight">
                  Book Clubs: Where to Find Like-Minded Readers
                </h4>
                <p className="text-sm text-gray-500 mt-2">
                  Sarah McKenzie • Oct 11, 2022
                </p>
              </div>
            </div>
          </div>
          <div className="text-center mt-8">
            <button className="px-6 py-3 bg-primary text-white font-semibold rounded-full hover:bg-secondary transition">
              LOAD MORE POSTS
            </button>
          </div>
        </div>

        {/* Sağ Tarafta - Popüler Bloglar ve Reklam Alanı */}
        <div>
          <h3 className="text-2xl font-bold mb-6 text-textDark dark:text-textLight">
            Trending Posts
          </h3>
          <div className="space-y-6">
            <div className="flex space-x-6 items-center">
              <div
                className="w-1/6 h-[60px] bg-cover bg-center rounded-lg"
                style={{ backgroundImage: "url('/assets/hero.jpg')" }}
              ></div>
              <div>
                <h5 className="text-lg font-semibold text-textDark dark:text-textLight">
                  How to Enjoy the Journey and Reach Your Goals
                </h5>
                <span className="text-sm text-gray-500">Jul 11, 2022</span>
              </div>
            </div>

            <div className="flex space-x-6 items-center">
              <div
                className="w-1/6 h-[60px] bg-cover bg-center rounded-lg"
                style={{ backgroundImage: "url('/assets/movie.jpg')" }}
              ></div>
              <div>
                <h5 className="text-lg font-semibold text-textDark dark:text-textLight">
                  How to Grow Your Own Potatoes at Home
                </h5>
                <span className="text-sm text-gray-500">Dec 3, 2022</span>
              </div>
            </div>

            <div className="flex space-x-6 items-center">
              <div
                className="w-1/6 h-[60px] bg-cover bg-center rounded-lg"
                style={{ backgroundImage: "url('/assets/book.jpg')" }}
              ></div>
              <div>
                <h5 className="text-lg font-semibold text-textDark dark:text-textLight">
                  Dishwasher Detergents: What You Need to Know
                </h5>
                <span className="text-sm text-gray-500">Apr 6, 2022</span>
              </div>
            </div>

            <div className="flex space-x-6 items-center">
              <div
                className="w-1/6 h-[60px] bg-cover bg-center rounded-lg"
                style={{ backgroundImage: "url('/assets/makyaj.jpg')" }}
              ></div>
              <div>
                <h5 className="text-lg font-semibold text-textDark dark:text-textLight">
                  Dishwasher Detergents: What You Need to Know
                </h5>
                <span className="text-sm text-gray-500">Apr 6, 2022</span>
              </div>
            </div>
          </div>

          {/* Reklam Alanı */}
          <div className="mt-10 bg-gray-200 h-[300px] flex items-center justify-center rounded-lg">
            <span className="text-gray-500">Advertisement</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LatestPosts;
