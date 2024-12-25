import React, { useState, useMemo } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { createBlog } from "../../store/blogsSlice";

const AdminBlogForm = ({ onBlogAdded }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [status, setStatus] = useState("taslak");
  const [coverImage, setCoverImage] = useState("");
  const [uploading, setUploading] = useState(false);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ align: [] }],
          ["link", "image"],
          ["clean"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    }),
    []
  );

  async function imageHandler() {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (!file) return;

      try {
        setUploading(true);
        const formData = new FormData();
        formData.append("file", file);

        const response = await axios.post(
          "https://localhost:7079/api/Image/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const quill = document.querySelector(".ql-editor");
        const range = document.getSelection().getRangeAt(0);
        const img = document.createElement("img");
        img.src = response.data.url;
        img.style.maxWidth = "100%";
        range.insertNode(img);
      } catch (error) {
        console.error("Resim yükleme hatası:", error);
        alert("Resim yüklenirken bir hata oluştu");
      } finally {
        setUploading(false);
      }
    };
  }

  const handleCoverImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      const response = await axios.post(
        "https://localhost:7079/api/Image/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setCoverImage(response.data.url);
    } catch (error) {
      console.error("Kapak resmi yükleme hatası:", error);
      alert("Kapak resmi yüklenirken bir hata oluştu");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!title.trim() || !content.trim()) {
        alert("Başlık ve içerik alanları zorunludur!");
        return;
      }

      const blogData = {
        title: title.trim(),
        content: content.trim(),
        author: author.trim() || "Anonim",
        coverImage: coverImage,
        status: status,
      };

      const resultAction = await dispatch(createBlog(blogData));

      if (createBlog.fulfilled.match(resultAction)) {
        alert("Blog başarıyla eklendi!");
        // Form temizleme
        setTitle("");
        setContent("");
        setAuthor("");
        setStatus("taslak");
        setCoverImage("");
      } else {
        throw new Error(resultAction.payload);
      }
    } catch (err) {
      alert(err.message || "Blog eklenirken bir hata oluştu");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 mx-auto max-w-4xl p-6 bg-backgroundGray rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold text-textDark mb-4">Yeni Blog Ekle</h2>

      {/* Başlık */}
      <input
        type="text"
        placeholder="Başlık"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border border-inputGray p-3 w-full rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-primary text-textDark"
      />

      {/* Kapak Resmi - Küçültülmüş önizleme */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-textDark mb-2">
          Kapak Görseli
        </label>
        <div className="flex items-center space-x-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleCoverImageUpload}
            className="hidden"
            id="cover-image-upload"
          />
          <label
            htmlFor="cover-image-upload"
            className="cursor-pointer inline-flex items-center px-4 py-2 border border-inputGray 
                     rounded-md shadow-sm text-sm font-medium text-textDark bg-white 
                     hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 
                     focus:ring-primary transition-colors"
          >
            {uploading ? "Yükleniyor..." : "Kapak Resmi Seç"}
          </label>
          {coverImage && (
            <div className="relative">
              <img
                src={coverImage}
                alt="Kapak görseli"
                className="h-16 w-16 object-cover rounded-md"
              />
              <button
                type="button"
                onClick={() => setCoverImage("")}
                className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 
                         hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 
                         focus:ring-red-500 transition-colors"
                style={{ fontSize: "12px", width: "16px", height: "16px" }}
              >
                ×
              </button>
            </div>
          )}
        </div>
        {!coverImage && (
          <p className="text-sm text-gray-500 mt-2">
            Blog için bir kapak görseli seçin (önerilen: 1200x630px)
          </p>
        )}
      </div>

      {/* İçerik Editörü */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-textDark mb-2">
          Blog İçeriği
        </label>
        <div className="bg-white rounded-lg">
          <ReactQuill
            value={content}
            onChange={setContent}
            modules={modules}
            style={{
              height: "400px",
              marginBottom: "50px",
            }}
            className="rounded-lg [&_.ql-editor_img]:mx-auto [&_.ql-editor_img]:my-4"
          />
        </div>
        <p className="text-sm text-gray-500 mt-2">
          İçeriğe resim eklemek için editör araç çubuğundaki resim ikonunu
          kullanın
        </p>
      </div>

      {/* Yazar */}
      <input
        type="text"
        placeholder="Yazar"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        className="border border-inputGray p-3 w-full rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-primary text-textDark"
      />

      {/* Durum */}
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border border-inputGray p-3 w-full rounded-lg mb-4 focus:outline-none focus:ring-2 text-textDark"
      >
        <option value="taslak" className="text-gray-400">
          Taslak
        </option>
        <option value="yayınlanmış" className="text-green-500">
          Yayınlanmış
        </option>
      </select>

      {/* Ekle Butonu */}
      <button
        type="submit"
        className="bg-primary text-textLight px-6 py-3 rounded-lg hover:bg-secondary transition"
        disabled={uploading}
      >
        {uploading ? "Resim Yükleniyor..." : "Ekle"}
      </button>
    </form>
  );
};

export default AdminBlogForm;
