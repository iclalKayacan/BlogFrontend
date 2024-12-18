import React from "react";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = ({ children }) => {
  return (
    <div className="flex">
      <AdminSidebar />
      <main className="flex-1 p-6 ml-64">{children}</main>
    </div>
  );
};

export default AdminLayout;
