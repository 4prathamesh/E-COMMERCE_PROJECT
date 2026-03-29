import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginService } from "../../services/services";
import "./login.css";
import { useDispatch } from "react-redux";
import { setUser, logout } from "../../redux/slices/authSlice";
import { handleLogout } from "../../utils/authUtils";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Step 1: Login user
      const response = await loginService(email, password);
      const { token, user } = response.data;

      // Step 2: Store token only
      localStorage.setItem("token", token);

      dispatch(setUser(user));

      const fetchedUser = user;

      console.log("Fetched user:", fetchedUser);

      // Step 5: Navigate based on role
      if (fetchedUser.urole === "admin") {
        navigate("/adminDashbord/dashboard");
      } else {
        navigate("/user/dashboard");
      }

    } catch (err) {
      setError(err.response?.data?.message || "Login failed ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleGoHome = () => {
    handleLogout(dispatch, logout, navigate);
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Checking role..." : "Login"}
          </button>

          {/* Go Home Button (logs out + navigates home) */}
          <button
            type="button"
            className="home-btn"
            onClick={handleGoHome}
          >
            🏠 Go Home
          </button>

          <p>
            <Link to="/registerUser">SignUp</Link>
          </p>
        </form>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
