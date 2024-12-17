import React from "react";
import { useParams } from "react-router-dom";

const BlogDetails = () => {
  const { id } = useParams();

  // Statik içerik (id'ye göre farklı içerikler)
  const blogData = {
    1: {
      title: "The AI magically removes moving objects from videos.",
      content: `
        This AI technology instantly removes moving objects from your videos, giving them a clean and professional look. 
        It works seamlessly to detect and process videos in real-time, enhancing your editing workflow.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesentium nam quas inventore, ut iure iste modi 
        eos adipisci ad ea itaque labore eum autem nobis et numquam, minima eius. Nam eius, non unde ut aut sunt eveniet 
        rerum repellendus porro.
        \n
        Sint ob voluptas itaque, ipsum porro qui abaccati cumque assumenda similique ut? Aperiam vel aut, exercitationem 
        eos consequuntur eaque culpa totam, deserunt, aspernatur quae eveniet hic provident ullam tempora error repudiandae 
        sapiente illum rerum itaque voluptate. 
      `,
      image: "https://via.placeholder.com/1200x600",
      category: "Nature",
      author: "Craig David",
      date: "February 10, 2019",
      readTime: "5 min read",
      authorImage: "https://via.placeholder.com/100", // Yuvarlak Yazar Resmi
      aboutAuthor:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Exercitationem facilis sunt repellendus excepturi beatae porro debitis voluptate nulla quo veniam fuga sit molestias minus.",
    },
  };

  const blog = blogData[id];

  if (!blog) {
    return <p>Blog bulunamadı!</p>;
  }

  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Resim Alanı */}
      <div className="relative w-full">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-[450px] md:h-[600px] object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center">
          <span className="text-xs md:text-sm px-3 py-1 bg-green-500 text-white rounded-full mb-4">
            {blog.category}
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-white px-4 mb-4">
            {blog.title}
          </h1>
          <div className="text-gray-300 text-sm flex space-x-4">
            <p>
              By <span className="font-semibold">{blog.author}</span>
            </p>
            <p>{blog.date}</p>
            <p>{blog.readTime}</p>
          </div>
        </div>
      </div>

      {/* Alt Kısım: Yazar ve Blog İçeriği */}
      <div className="max-w-screen-lg mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 py-8 px-4">
        {/* Sol: Yazar Bilgisi */}
        <aside className="col-span-1">
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow">
            <img
              src={blog.authorImage}
              alt={blog.author}
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h3 className="text-lg font-semibold text-center text-gray-800 dark:text-gray-200">
              {blog.author}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-4">
              {blog.aboutAuthor}
            </p>
            <button className="block mx-auto bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Read my bio
            </button>
          </div>
        </aside>

        {/* Sağ: Blog İçeriği */}
        <article className="col-span-2 leading-relaxed text-gray-700 dark:text-gray-300">
          {blog.content.split("\n").map((paragraph, index) => (
            <p key={index} className="mb-4">
              {paragraph}
            </p>
          ))}
        </article>
      </div>
    </div>
  );
};

export default BlogDetails;
