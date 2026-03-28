import React, { useState, useEffect, lazy } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AdminDashboard.css";
import { getUserByToken } from "../../services/services";
import { useDispatch, useSelector } from "react-redux";
const Navbar = lazy( () => import("../../Comman/Navbar") );

const AdminDashboard = () => {
  const [openBox, setOpenBox] = useState(null);

  const { user, loading, error } = useSelector((state) => state.auth);

  const toggleBox = (box) => {
    setOpenBox(openBox === box ? null : box);
  };

  if (loading) {
    return <h2 className="loading">Loading...</h2>;
  }

  return (
    <>
      {/* 🔹 Navbar */}
      <Navbar />

      {/* 🔹 Welcome Section */}
      <div className="welcome">
        <h2>Welcome back, {user?.uname} 👋</h2>
        <p>Email: {user?.email}</p>
        <p>Role: {user?.urole}</p>
      </div>

      {/* 🔹 Dashboard */}
      <div className="dashboard-container">
        <div className="dashboard-grid">
          {/* Products */}
          <div className="dashboard-card" onClick={() => toggleBox("box1")}>
            <h2>📦 Products</h2>
            {openBox === "box1" && (
              <div className="dropdown-links">
                <Link to="/addProducts">➕ Add Products</Link>
                <Link to="/viewProducts">👁 View Products</Link>
              </div>
            )}
          </div>

          {/* Admins */}
          <div className="dashboard-card" onClick={() => toggleBox("box2")}>
            <h2>👨‍💼 Admins</h2>
            {openBox === "box2" && (
              <div className="dropdown-links">
                <Link to="/registerAdmin">➕ Add Admin</Link>
                <Link to="/viewAdmin">👁 View Admins</Link>
              </div>
            )}
          </div>

          {/* Users */}
          <div className="dashboard-card" onClick={() => toggleBox("box3")}>
            <h2>🙍 Users</h2>
            {openBox === "box3" && (
              <div className="dropdown-links">
                <Link to="/registerUser">➕ Add User</Link>
                <Link to="/viewUser">👁 View Users</Link>
              </div>
            )}
          </div>

          {/* Categories */}
          <div className="dashboard-card" onClick={() => toggleBox("box4")}>
            <h2>🗂 Categories</h2>
            {openBox === "box4" && (
              <div className="dropdown-links">
                <Link to="/catagoryManager">👁 Manage Categories</Link>
              </div>
            )}
          </div>

          {/* Orders */}
          <div className="dashboard-card" onClick={() => toggleBox("box5")}>
            <h2>📑 Orders</h2>
            {openBox === "box5" && (
              <div className="dropdown-links">
                <Link to="/Manageorders">👁 View Orders</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
