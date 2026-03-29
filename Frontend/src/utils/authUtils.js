// Logout utility that clears both localStorage and Redux state
export const handleLogout = (dispatch, logoutAction, navigate) => {
  // Clear token from localStorage
  localStorage.removeItem("token");
  
  // Clear user from Redux
  dispatch(logoutAction());
  
  // Redirect to login
  navigate("/login");
};
