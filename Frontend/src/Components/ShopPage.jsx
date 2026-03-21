import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import {
  getCategory,
  getSubCategory,
  getProducts,
  addToCart,
  addViewAction,
} from "../services/userServices";

const ShopPage = () => {
  const { search } = useOutletContext();

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Fetch Data
  useEffect(() => {
    (async () => {
      const cats = await getCategory();
      setCategories(cats.data);

      const subs = await getSubCategory();
      setSubCategories(subs.data);

      const prods = await getProducts();
      setProducts(prods.data);
      setFilteredProducts(prods.data);
    })();
  }, []);

  // Search
  useEffect(() => {
    if (!search.trim()) return setFilteredProducts(products);

    const lower = search.toLowerCase();
    setFilteredProducts(
      products.filter((p) =>
        p.product_name?.toLowerCase().includes(lower)
      )
    );
  }, [search, products]);

  // Category Filter
  const handleCategoryClick = (category_id) => {
    setSelectedCategory(category_id);
    setSelectedSubCategory(null);

    if (!category_id) return setFilteredProducts(products);

    setFilteredProducts(
      products.filter((p) =>
        subCategories.some(
          (s) =>
            s.subcategory_id === p.subcategory_id &&
            s.category_id === category_id
        )
      )
    );
  };

  // Subcategory Filter
  const handleSubCategoryClick = (subcategory_id) => {
    setSelectedSubCategory(subcategory_id);

    if (!subcategory_id) return handleCategoryClick(selectedCategory);

    setFilteredProducts(
      products.filter((p) => p.subcategory_id === subcategory_id)
    );
  };

  // Add to Cart
  const handleAddToCart = (e, product_id) => {
    e.preventDefault();
    if (!token){
      e.stopPropagation();
      return setShowLoginPopup(true);
      
    } 

    addToCart({ product_id })
      .then(() => alert("✅ Added to cart"))
      .catch(() => alert("❌ Failed"));
  };

  // Wishlist
  const handleWishlist = (e, product_id) => {
    e.stopPropagation();
    if (!token) return setShowLoginPopup(true);

    addViewAction({ product_id })
      .then(() => alert("❤️ Added to wishlist"))
      .catch(() => alert("❌ Failed"));
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Categories */}
      <div className="flex gap-3 overflow-x-auto px-6 py-3">
        <button
          onClick={() => handleCategoryClick(null)}
          className={`px-4 py-1 rounded-full whitespace-nowrap ${
            selectedCategory === null
              ? "bg-blue-600 text-white"
              : "bg-gray-200 hover:bg-blue-100"
          }`}
        >
          All Categories
        </button>

        {categories.map((cat) => (
          <button
            key={cat.category_id}
            onClick={() => handleCategoryClick(cat.category_id)}
            className={`px-4 py-1 rounded-full whitespace-nowrap ${
              selectedCategory === cat.category_id
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-blue-100"
            }`}
          >
            {cat.category_name}
          </button>
        ))}
      </div>

      {/* Subcategories */}
      {selectedCategory && (
        <div className="flex gap-3 overflow-x-auto px-6 pb-3">
          <button
            onClick={() => handleSubCategoryClick(null)}
            className={`px-4 py-1 rounded-full whitespace-nowrap ${
              selectedSubCategory === null
                ? "bg-green-600 text-white"
                : "bg-gray-200 hover:bg-green-100"
            }`}
          >
            All
          </button>

          {subCategories
            .filter((s) => s.category_id === selectedCategory)
            .map((sub) => (
              <button
                key={sub.subcategory_id}
                onClick={() =>
                  handleSubCategoryClick(sub.subcategory_id)
                }
                className={`px-4 py-1 rounded-full whitespace-nowrap ${
                  selectedSubCategory === sub.subcategory_id
                    ? "bg-green-600 text-white"
                    : "bg-gray-200 hover:bg-green-100"
                }`}
              >
                {sub.subcategory_name}
              </button>
            ))}
        </div>
      )}

      {/* Products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 p-6">
        {filteredProducts.map((p) => (
          <div
            key={p.product_id}
            className="relative bg-white rounded-xl shadow-sm hover:shadow-xl transition duration-300 p-4 cursor-pointer group"
            onClick={() => navigate(`/productShop/${p.product_id}`)}
          >
            {p.discount > 0 && (
              <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                {p.discount}% OFF
              </span>
            )}

            <div className="h-40 flex items-center justify-center overflow-hidden">
              <img
                src={`http://localhost:3000${p.product_image}`}
                alt=""
                className="h-full object-contain group-hover:scale-110 transition duration-300"
              />
            </div>

            <h3 className="text-sm font-semibold mt-2 line-clamp-1">
              {p.product_name}
            </h3>

            <p className="text-sm text-gray-500">{p.brand}</p>

            <div className="flex items-center gap-2 mt-1">
              <span className="text-gray-400 line-through text-sm">
                ₹{p.price}
              </span>
              <span className="text-green-600 font-bold">
                ₹
                {(p.price - (p.price * p.discount) / 100).toFixed(2)}
              </span>
            </div>

            <div className="flex gap-2 mt-3 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition">
              <button
                onClick={(e) => handleAddToCart(e, p.product_id)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-2 rounded-lg transition duration-300 shadow-md hover:shadow-lg"
              >
                🛒 Add to Cart
              </button>

              <button
                onClick={(e) => handleWishlist(e, p.product_id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-xs font-semibold transition duration-300 shadow-md hover:shadow-lg"
              >
                ❤️
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Login Popup Modal */}
      {showLoginPopup && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center">
          
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowLoginPopup(false)}
          />

          {/* Modal */}
          <div className="relative bg-white rounded-2xl shadow-2xl w-[380px] p-6 z-[10000] animate-fadeIn">
            
            <div className="text-center">
              <div className="text-5xl mb-3">🔒</div>
              <h2 className="text-xl font-bold text-gray-800">
                Login Required
              </h2>
              <p className="text-gray-500 mt-2 text-sm">
                Please login to continue shopping
              </p>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowLoginPopup(false)}
                className="flex-1 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium transition"
              >
                Cancel
              </button>

              <button
                onClick={() => navigate("/login")}
                className="flex-1 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-md transition"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopPage;