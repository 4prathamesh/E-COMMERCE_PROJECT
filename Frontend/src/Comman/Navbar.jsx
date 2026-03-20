import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";

const Navbar = () => {
    const user = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showProfileMenu, setShowProfileMenu] = useState(false);
      const handleLogout = () => {
        // 1. Clear Redux state
        dispatch(logout());

        // 2. Remove token
        localStorage.removeItem("token");

        // 3. Redirect
        navigate("/login");
      };
    console.log("Navbar user prop:", user);
    return (
        <nav className="navbar">
        <div className="navbar-left">
          <img
            src="https://www.mystore.in/s/62ea2c599d1398fa16dbae0a/655cac71f149b81eece12fdc/51ceexg6d3l.jpg"
            alt="Logo"
            className="navbar-logo"
          />
          <h1 className="navbar-title">Admin Dashboard</h1>
        </div>
        <div className="navbar-right">
          <div
            className="profile-icon"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            {user.user?.uname?.charAt(0).toUpperCase() || "U"}
          </div>
          {showProfileMenu && (
            <div className="profile-dropdown">
              <p className="profile-name">{user.user?.uname}</p>
              <Link to="/Adminprofile">Profile</Link>
              {/* <Link to="/changePassword">🔑 Change Password</Link> */}
              <button onClick={handleLogout}>🚪 Logout</button>
            </div>
          )}
        </div>
      </nav>
    );
}

export default Navbar;