import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Navbar = ({ search, setSearch}) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth);
  
  return (
    <nav className="sticky top-0 z-40 bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg">
      <div className="flex items-center justify-between px-8 py-4 max-w-7xl mx-auto">
        
        {/* Logo */}
        <h1
          className="text-3xl font-bold mr-4 cursor-pointer hover:text-blue-100 transition-colors duration-300 tracking-tight"
          onClick={() => navigate("/")}
        >
          Perfect
        </h1>

        {/* Search Bar */}
        <div className="flex-1 mx-12 mr-4">
          <input
            type="text"
            placeholder="🔍 Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-5 py-3 rounded-full border-2 border-transparent focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-300 shadow-md"
          />
        </div>

        {/* Navigation Items */}
        <div className="flex items-center gap-3 text-sm font-medium">
          <button 
            onClick={() => navigate("/cart")}
            className="flex items-center gap-2 px-4 py-2 hover:bg-blue-500 rounded-lg transition-all duration-300 hover:scale-105"
          >
            <span className="text-lg">🛒</span>
            <span>Cart</span>
          </button>
          
          <button 
            onClick={() => navigate("/wishlist")}
            className="flex items-center gap-2 px-4 py-2 hover:bg-blue-500 rounded-lg transition-all duration-300 hover:scale-105"
          >
            <span className="text-lg">❤️</span>
            <span>Wishlist</span>
          </button>
          
          <button 
            onClick={() => navigate("/recommendations")}
            className="flex items-center gap-2 px-4 py-2 hover:bg-blue-500 rounded-lg transition-all duration-300 hover:scale-105"
          >
            <span className="text-lg">⭐</span>
            <span>Recs</span>
          </button>
          
          <button 
            onClick={() => navigate("/offers")}
            className="flex items-center gap-2 px-4 py-2 hover:bg-blue-500 rounded-lg transition-all duration-300 hover:scale-105"
          >
            <span className="text-lg">💰</span>
            <span>Offers</span>
          </button>

          {/* Login/User Button */}
          <button
            onClick={() => navigate("/login")}
            className="flex items-center gap-2 ml-4 px-6 py-2 bg-white text-blue-600 font-bold rounded-full hover:bg-blue-50 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            <span className="text-lg">👤</span>
            <span>{user.user ? user.user.uname : "Login"}</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;