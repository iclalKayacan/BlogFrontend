import React from "react";
import { useParams, Link } from "react-router-dom";
import { FiUserPlus } from "react-icons/fi";
import Comments from "../components/Comments";
const BlogDetails = () => {
  const { id } = useParams();

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
      images: ["/assets/book.jpg", "/assets/hero.jpg", "/assets/recipe.jpg"],
      image: "/assets/book.jpg",
      category: "Nature",
      author: "Craig David",
      date: "February 10, 2019",
      readTime: "5 min read",
      authorImage: "/assets/yazar.jpg",
      aboutAuthor:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Exercitationem facilis sunt repellendus excepturi beatae porro debitis voluptate nulla quo veniam fuga sit molestias minus.",
      tags: ["AI", "Technology", "Video Editing", "Innovation"],
      recentPosts: [
        {
          id: 1,
          title: "There’s a Cool New Way for Men to Wear Socks and Sandals",
          image: "/assets/teknoloji.jpg",
          date: "March 15, 2018",
        },
        {
          id: 2,
          title: "How Technology is Changing the World of Fashion",
          image: "/assets/recipe.jpg",
          date: "March 15, 2018",
        },
        {
          id: 3,
          title: "Top 5 Beaches to Visit this Summer",
          image: "/assets/hero.jpg",
          date: "March 15, 2018",
        },
      ],
      comments: [
        {
          author: "John Doe",
          date: "March 27, 2018 at 8:00 am",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          avatar: "/assets/user1.jpg",
        },
        {
          author: "Jane Smith",
          date: "March 27, 2018 at 9:30 am",
          content:
            "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        },
        {
          author: "Mark Wilson",
          date: "March 27, 2018 at 11:00 am",
          content:
            "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        },
      ],
    },
  };

  const blog = blogData[id];

  if (!blog) {
    return <p>Blog bulunamadı!</p>;
  }

  return (
    <div className="bg-backgroundLight dark:bg-backgroundDark">
      {/* Üst Görsel */}
      <div className="relative w-full">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-[450px] md:h-[600px] object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center">
          <span className="text-xs md:text-sm px-3 py-1 bg-secondary text-white rounded-full mb-4">
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

      {/* Alt İçerik */}
      <div className="max-w-screen-lg mx-auto flex flex-col md:flex-row gap-8 py-8 px-4">
        {/* Sol: Blog İçeriği */}
        <article className="md:w-2/3 leading-relaxed text-gray-700 dark:text-textLight">
          {blog.content.split("\n").map((paragraph, index) => (
            <React.Fragment key={index}>
              <p className="mb-4">{paragraph}</p>
              {/* Resmi Her 2 Paragrafta Bir Ekleyin */}
              {index % 2 === 1 &&
                blog.images &&
                blog.images[(index / 2) >> 0] && (
                  <div className="my-4 flex justify-center">
                    <img
                      src={blog.images[(index / 2) >> 0]}
                      alt={`Blog Görseli ${Math.floor(index / 2) + 1}`}
                      className="w-full max-w-xs h-auto rounded-lg shadow-md"
                    />
                  </div>
                )}
            </React.Fragment>
          ))}
          <Comments comments={blog.comments} />
        </article>

        {/* Sağ: Yazar Bilgisi */}
        <aside className="md:w-1/3">
          <div className="dark:bg-gray-800 p-6 text-center rounded-lg shadow-md">
            <img
              src={blog.authorImage}
              alt={blog.author}
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <div className="flex items-center justify-center space-x-2 mb-4">
              <h3 className="text-xl font-semibold text-textDark dark:text-textLight">
                {blog.author}
              </h3>
              <button
                className="flex items-center text-primary hover:text-secondary transition"
                aria-label="Follow Author"
              >
                <FiUserPlus className="text-xl ml-2" />
              </button>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              {blog.aboutAuthor}
            </p>
            <button className="bg-primary hover:bg-secondary text-textLight px-6 py-2 rounded transition shadow-md">
              Read my bio
            </button>
          </div>
          {/*Benzer Yazılar */}
          <div className="mt-8">
            <h4 className="text-lg font-semibold mb-4 text-gray-800 dark:text-textLight">
              Benzer Yazılar
            </h4>
            <ul className="space-y-4">
              {blog.recentPosts.map((post) => (
                <li key={post.id}>
                  {/* Tıklanabilir Link */}
                  <Link
                    to={`/blog/${post.id}`} // Blog detay sayfasına yönlendirir
                    className="flex items-center space-x-4 hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-lg transition"
                  >
                    {/* Sabit boyutlu resim kutusu */}
                    <div className="w-16 h-16 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="space-y-2">
                      <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {post.title}
                      </h5>
                      <p className="text-xs text-gray-500">{post.date}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Blog Tags */}
          {blog.tags?.length > 0 && (
            <div className="mt-8">
              <h4 className="text-lg font-semibold mb-4 text-gray-800 dark:text-textLight">
                Etiketler
              </h4>
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};

export default BlogDetails;
