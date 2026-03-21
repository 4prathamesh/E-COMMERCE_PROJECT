import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { Suspense } from "react";
import ProtectedRoute from "./ProtectedRoute";

import AdminLayout from "../layouts/AdminLayout";
import UserLayout from "../layouts/UserLayout";
import MainLayout from "../layouts/MainLayout";

const ShopPage = React.lazy(() => import("../Components/ShopPage"));
const Login = React.lazy(() => import("../Components/Login/Login"));
const AdminDashboard = React.lazy(() => import("../Components/Admin/AdminDashbord"));
const UserDashboard = React.lazy(() => import("../Components/User/UserDashboard"));
const AddProduct = React.lazy(() => import("../Components/products/AddProduct"));
const Cart = React.lazy(() => import("../Components/User/Cart"));
const Error404 = React.lazy(() => import("../Components/Errors/Error404"));

const AppRoutes = () => {

  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>

          {/* 🌐 Public Routes */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<ShopPage />} />
            <Route path="login" element={<Login />} />
          </Route>

          {/* 👤 User Routes */}
          <Route
            path="/user"
            element={
              <ProtectedRoute role="user">
                <UserLayout />
              </ProtectedRoute>
            }
          >
          <Route path="dashboard" element={<UserDashboard />} />
            <Route path="cart" element={<Cart />} />
          </Route>

          {/* 🛠️ Admin Routes */}
          <Route
            path="/adminDashbord"
            element={
              <ProtectedRoute role="admin">
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="add-product" element={<AddProduct />} />
          </Route>

          {/* ❌ 404 */}
          <Route path="*" element={<Error404 />} />

        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRoutes;