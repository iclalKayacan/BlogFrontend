import React, { useState } from "react";
import AdminBlogList from "../../components/Admin/AdminBlogList";
import AdminBlogForm from "../../components/Admin/AdminBlogForm";
import AdminBlogEdit from "../../components/Admin/AdminBlogEdit";
import AdminSidebar from "../../components/Admin/AdminSidebar";
import UserManagement from "../../components/Admin/UserManagement";
import CategoryManagement from "../../components/Admin/CategoryManagement";
import TagManagement from "../../components/Admin/TagManagement";
import CommentManagement from "../../components/Admin/CommentManagement";

const BlogManagement = () => {
  const [blogs, setBlogs] = useState([]);
  const [editingBlog, setEditingBlog] = useState(null);
  const [view, setView] = useState("blogs"); // blogs, users, categories, tags
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
  ]);
  const [categories, setCategories] = useState([
    { id: 1, name: "Teknoloji" },
    { id: 2, name: "Sağlık" },
  ]);
  const [tags, setTags] = useState([
    { id: 1, name: "React" },
    { id: 2, name: "JavaScript" },
  ]);
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "John Doe",
      content: "Bu çok faydalı bir yazı!",
      approved: false,
    },
    {
      id: 2,
      author: "Jane Smith",
      content: "Harika bir paylaşım, teşekkürler!",
      approved: true,
    },
  ]);

  const handleAddBlog = (newBlog) => {
    setBlogs([...blogs, { ...newBlog, id: Date.now() }]);
  };

  const handleDeleteBlog = (id) => {
    const confirmed = window.confirm(
      "Bu blogu silmek istediğinize emin misiniz?"
    );
    if (confirmed) {
      setBlogs(blogs.filter((blog) => blog.id !== id));
    }
  };

  const handleEditBlog = (updatedBlog) => {
    setBlogs(
      blogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
    );
    setEditingBlog(null);
  };

  const handleUserUpdated = (updatedUser) => {
    setUsers(
      users.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
  };

  const handleUserDeleted = (userId) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  const handleCategoryAdded = (newCategory) => {
    setCategories([...categories, { id: Date.now(), name: newCategory }]);
  };

  const handleCategoryUpdated = (updatedCategory) => {
    setCategories(
      categories.map((category) =>
        category.id === updatedCategory.id ? updatedCategory : category
      )
    );
  };

  const handleCategoryDeleted = (categoryId) => {
    setCategories(categories.filter((category) => category.id !== categoryId));
  };

  const handleTagAdded = (newTag) => {
    setTags([...tags, { id: Date.now(), name: newTag }]);
  };

  const handleTagUpdated = (updatedTag) => {
    setTags(tags.map((tag) => (tag.id === updatedTag.id ? updatedTag : tag)));
  };

  const handleTagDeleted = (tagId) => {
    setTags(tags.filter((tag) => tag.id !== tagId));
  };
  const handleApproveComment = (commentId) => {
    setComments(
      comments.map((comment) =>
        comment.id === commentId ? { ...comment, approved: true } : comment
      )
    );
  };

  const handleDeleteComment = (commentId) => {
    setComments(comments.filter((comment) => comment.id !== commentId));
  };

  return (
    <div className="flex">
      <AdminSidebar setView={setView} />
      <div className="flex-1 p-4">
        <h1 className="text-2xl font-bold mb-4">Admin Yönetim Paneli</h1>
        {view === "blogs" && (
          <>
            {editingBlog ? (
              <AdminBlogEdit blog={editingBlog} onUpdate={handleEditBlog} />
            ) : (
              <AdminBlogForm onBlogAdded={handleAddBlog} />
            )}
            <AdminBlogList
              blogs={blogs}
              onDelete={handleDeleteBlog}
              onEdit={setEditingBlog}
            />
          </>
        )}
        {view === "users" && (
          <UserManagement
            users={users}
            onUserUpdated={handleUserUpdated}
            onUserDeleted={handleUserDeleted}
          />
        )}
        {view === "categories" && (
          <CategoryManagement
            categories={categories}
            onCategoryAdded={handleCategoryAdded}
            onCategoryUpdated={handleCategoryUpdated}
            onCategoryDeleted={handleCategoryDeleted}
          />
        )}
        {view === "tags" && (
          <TagManagement
            tags={tags}
            onTagAdded={handleTagAdded}
            onTagUpdated={handleTagUpdated}
            onTagDeleted={handleTagDeleted}
          />
        )}
        {view === "comments" && (
          <CommentManagement
            comments={comments}
            onApprove={handleApproveComment}
            onDelete={handleDeleteComment}
          />
        )}
      </div>
    </div>
  );
};

export default BlogManagement;
