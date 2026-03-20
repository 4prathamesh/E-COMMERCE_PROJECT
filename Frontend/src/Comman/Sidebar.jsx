import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const location = useLocation();

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-64 h-screen fixed bg-gradient-to-b from-blue-950 to-blue-800 text-white shadow-2xl overflow-y-auto">
      {/* Logo */}
      <div className="p-6 text-2xl font-bold border-b border-blue-400/30 bg-blue-900/50">
        <div className="flex items-center gap-2">
          <span>🛍️</span>
          <span>Admin Panel</span>
        </div>
      </div>

      <nav className="p-4 space-y-1">

        {/* Products */}
        <div>
          <button
            onClick={() => toggleMenu("products")}
            className="w-full text-left cursor-pointer p-3 rounded-lg hover:bg-blue-500/20 hover:translate-x-1 transition duration-200 font-medium text-base flex items-center gap-2"
          >
            <span>📦</span>
            <span>Products</span>
            <span className="ml-auto text-sm">{openMenu === "products" ? "▼" : "▶"}</span>
          </button>

          {openMenu === "products" && (
            <div className="ml-6 mt-2 flex flex-col space-y-2 text-sm border-l border-blue-400/30 pl-3">
              <Link
                to="/addProducts"
                className={`p-2 rounded transition duration-200 ${
                  isActive("/addProducts") ? "bg-blue-400/40 text-white font-semibold" : "hover:bg-blue-500/20"
                }`}
              >
                ➕ Add Products
              </Link>
              <Link
                to="/viewProducts"
                className={`p-2 rounded transition duration-200 ${
                  isActive("/viewProducts") ? "bg-blue-400/40 text-white font-semibold" : "hover:bg-blue-500/20"
                }`}
              >
                👁 View Products
              </Link>
            </div>
          )}
        </div>

        {/* Admins */}
        <div>
          <button
            onClick={() => toggleMenu("admins")}
            className="w-full text-left cursor-pointer p-3 rounded-lg hover:bg-blue-500/20 hover:translate-x-1 transition duration-200 font-medium text-base flex items-center gap-2"
          >
            <span>👨‍💼</span>
            <span>Admins</span>
            <span className="ml-auto text-sm">{openMenu === "admins" ? "▼" : "▶"}</span>
          </button>

          {openMenu === "admins" && (
            <div className="ml-6 mt-2 flex flex-col space-y-2 text-sm border-l border-blue-400/30 pl-3">
              <Link
                to="/registerAdmin"
                className={`p-2 rounded transition duration-200 ${
                  isActive("/registerAdmin") ? "bg-blue-400/40 text-white font-semibold" : "hover:bg-blue-500/20"
                }`}
              >
                ➕ Add Admin
              </Link>
              <Link
                to="/viewAdmin"
                className={`p-2 rounded transition duration-200 ${
                  isActive("/viewAdmin") ? "bg-blue-400/40 text-white font-semibold" : "hover:bg-blue-500/20"
                }`}
              >
                👁 View Admins
              </Link>
            </div>
          )}
        </div>

        {/* Users */}
        <div>
          <button
            onClick={() => toggleMenu("users")}
            className="w-full text-left cursor-pointer p-3 rounded-lg hover:bg-blue-500/20 hover:translate-x-1 transition duration-200 font-medium text-base flex items-center gap-2"
          >
            <span>🙍</span>
            <span>Users</span>
            <span className="ml-auto text-sm">{openMenu === "users" ? "▼" : "▶"}</span>
          </button>

          {openMenu === "users" && (
            <div className="ml-6 mt-2 flex flex-col space-y-2 text-sm border-l border-blue-400/30 pl-3">
              <Link
                to="/registerUser"
                className={`p-2 rounded transition duration-200 ${
                  isActive("/registerUser") ? "bg-blue-400/40 text-white font-semibold" : "hover:bg-blue-500/20"
                }`}
              >
                ➕ Add User
              </Link>
              <Link
                to="/viewUser"
                className={`p-2 rounded transition duration-200 ${
                  isActive("/viewUser") ? "bg-blue-400/40 text-white font-semibold" : "hover:bg-blue-500/20"
                }`}
              >
                👁 View Users
              </Link>
            </div>
          )}
        </div>

        {/* Categories */}
        <div>
          <button
            onClick={() => toggleMenu("categories")}
            className="w-full text-left cursor-pointer p-3 rounded-lg hover:bg-blue-500/20 hover:translate-x-1 transition duration-200 font-medium text-base flex items-center gap-2"
          >
            <span>🗂️</span>
            <span>Categories</span>
            <span className="ml-auto text-sm">{openMenu === "categories" ? "▼" : "▶"}</span>
          </button>

          {openMenu === "categories" && (
            <div className="ml-6 mt-2 flex flex-col space-y-2 text-sm border-l border-blue-400/30 pl-3">
              <Link
                to="/catagoryManager"
                className={`p-2 rounded transition duration-200 ${
                  isActive("/catagoryManager")
                    ? "bg-blue-400/40 text-white font-semibold"
                    : "hover:bg-blue-500/20"
                }`}
              >
                👁 Manage Categories
              </Link>
            </div>
          )}
        </div>

        {/* Orders */}
        <div>
          <button
            onClick={() => toggleMenu("orders")}
            className="w-full text-left cursor-pointer p-3 rounded-lg hover:bg-blue-500/20 hover:translate-x-1 transition duration-200 font-medium text-base flex items-center gap-2"
          >
            <span>📑</span>
            <span>Orders</span>
            <span className="ml-auto text-sm">{openMenu === "orders" ? "▼" : "▶"}</span>
          </button>

          {openMenu === "orders" && (
            <div className="ml-6 mt-2 flex flex-col space-y-2 text-sm border-l border-blue-400/30 pl-3">
              <Link
                to="/Manageorders"
                className={`p-2 rounded transition duration-200 ${
                  isActive("/Manageorders")
                    ? "bg-blue-400/40 text-white font-semibold"
                    : "hover:bg-blue-500/20"
                }`}
              >
                👁 View Orders
              </Link>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;