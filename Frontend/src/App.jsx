// import React from 'react'
// import ReactDOM from 'react-dom'
// import { BrowserRouter,Routes,Route,NavLink } from 'react-router-dom'
// import AddProduct from './Components/products/AddProduct'
// import Product from './Components/products/Product'
// import ShopPage from './Components/ShopPage'
// import Login from './Components/Login/Login'
// import AdminDashboard from './Components/Admin/AdminDashbord'
// import UserDashboard from './Components/User/UserDashboard'
// import Error404 from './Components/Errors/Error404'
// import UpdateProduct from './Components/products/UpdateProduct'
// import RegisterUser from './Components/User/RegisterUser'
// import RegisterAdmin from './Components/Admin/RegisterAdmin'
// import AdminList from './Components/Admin/AdminList'
// import UserList from './Components/Admin/UserList'
// import CategoryManager from './Components/Categories/CategoryManager'
// import SubcategoryProduct from './Components/Categories/SubcategoryProduct'
// import UpdateProductSubCatagory from './Components/Categories/UpdateProductSubCatagory'
// import ProductDetails from './Components/products/ProductDetails'
// import Cart from './Components/User/Cart'
// import Orders from './Components/User/Orders'
// import Offers from './Components/User/Offers'
//  import RecommendedProducts from './Components/User/RecommendedProducts'
// import WishList from './Components/User/WishList'
// import OrderManager from './Components/Admin/OrderManager'
// import Profile from './Components/Admin/Profile'
// import ShopPageProductDeatails from './Components/ShopPageProductDeatails'
// import EditUserProfile from './Components/User/EditUserProfile';
// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { fetchUser } from "./redux/slices/authSlice";

// const App = () => {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       dispatch(fetchUser(token));
//     }
//   }, []);
  
//   return (
//     <>
//     <BrowserRouter>
//     <Routes>
//       <Route path="/" element={<ShopPage></ShopPage>} />
//       <Route path="/login" element={<Login></Login>} />
//       <Route path="/registerUser" element={<RegisterUser></RegisterUser>} />
//       <Route path="/registerAdmin" element={<RegisterAdmin></RegisterAdmin>} />
//       <Route path="/viewAdmin" element={<AdminList></AdminList>} />
//       <Route path="/viewUser" element={<UserList></UserList>} />
//       <Route path="/adminDashbord" element={<AdminDashboard></AdminDashboard>} />
//       <Route path="/addProducts" element={<AddProduct></AddProduct>} />
//       <Route path="/viewProducts" element={<Product></Product>} />
//       <Route path="/Manageorders" element={<OrderManager></OrderManager>} />
//       <Route path="/Adminprofile" element={<Profile></Profile>} />

      
//       <Route path="/userDashbord" element={<UserDashboard></UserDashboard>} />
//       {/* <Route path="/updateProduct" element={<UpdateProduct></UpdateProduct>} /> */}

//       <Route path="/updateProduct/:id" element={<UpdateProduct />} />
//       <Route path="/updateProductByC/:id" element={<UpdateProductSubCatagory />} />
//       <Route path="/catagoryManager" element={<CategoryManager />} />
//        <Route path="/subcategory/:id" element={<SubcategoryProduct />} />
//        <Route path="/edit-profile" element={<EditUserProfile></EditUserProfile>} />


        
//         {/* <Route path="/product/:id" element={<ProductDetails />} /> */}
//         <Route path="/product/:product_id" element={<ProductDetails />} />

//         <Route path="/productShop/:product_id" element={<ShopPageProductDeatails />} />
//        <Route path="/cart" element={<Cart/>} />
//        <Route path="/orders" element={<Orders/>} />
//         <Route path="/wishlist" element={<WishList/>} />
//         <Route path="/recommendations" element={<RecommendedProducts/>} />
//         <Route path="/offers" element={<Offers/>} />

        
//       <Route path="*" element={<Error404></Error404>} />
//     </Routes>
//     </BrowserRouter>
//     </>
//   )
// }

// export default App
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUser } from "./redux/slices/authSlice";

// ✅ Centralized Routes
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  const dispatch = useDispatch();

  // ✅ Auto login if token exists
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(fetchUser(token));
    }
  }, [dispatch]);

  return <AppRoutes />;
};

export default App;