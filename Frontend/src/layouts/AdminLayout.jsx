// layouts/AdminLayout.jsx
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <>
      {/* Sidebar / Navbar */}
      <Outlet />
    </>
  );
};

export default AdminLayout;