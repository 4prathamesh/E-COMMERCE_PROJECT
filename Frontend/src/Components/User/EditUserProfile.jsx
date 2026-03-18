import React, { useState, useEffect } from "react";
import { getUserByToken } from "../../services/services";
import { editUser, updateUserPassword } from "../../services/userServices";
import "./EditUserProfile.css";

const EditUserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Update Profile
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Change Password
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // Toggles
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    getUserByToken()
      .then((res) => {
        console.log("User data fetched: ", res);
        setUser(res.data.user);
        setName(res.data.user.uname);
        setEmail(res.data.user.email);
      })
      .catch((err) => {
        console.error("Error fetching user:", err);
      })
      .finally(() => setLoading(false));
  }, [token]);

  // Helper: get user_id from different key names
  const getUserId = () => {
    if (!user) return null;
    return user.user_id || user.id || user.uid || user._id || null;
  };

  // Update profile handler
  const handleUpdateProfile = (e) => {
    e.preventDefault();
    const userId = getUserId();
    if (!userId) {
      console.error("No valid user ID found:", user);
      setMessage("❌ Cannot update profile, missing user ID");
      return;
    }

    editUser({ id: userId, uname: name, email })
      .then((res) => {
        console.log("Profile update response:", res);
        setMessage("✅ Profile updated successfully!");
        setUser({ ...user, uname: name, email });
        setShowProfileForm(false);
      })
      .catch((err) => {
        console.error("Error updating profile:", err);
        setMessage("❌ Failed to update profile");
      });
  };

  // Change password handler
  const handleChangePassword = (e) => {
    e.preventDefault();
    const userId = getUserId();
    if (!userId) {
      console.error("No valid user ID found:", user);
      setMessage("❌ Cannot update password, missing user ID");
      return;
    }

    updateUserPassword({
      user_id: userId, // ✅ now sending ID, not email
      old_password: oldPassword,
      new_password: newPassword,
    })
      .then((res) => {
        console.log("Password update response:", res);
        setMessage("✅ Password updated successfully!");
        setOldPassword("");
        setNewPassword("");
        setShowPasswordForm(false);
      })
      .catch((err) => {
        console.error("Error updating password:", err);
        setMessage("❌ Failed to update password");
      });
  };

  if (loading) return <h2>Loading...</h2>;

  return (
    <div className="profile-container">
      <h2>👋 Welcome, {user?.uname}</h2>
      <p>Email: {user?.email}</p>
      <p>Role: {user?.urole}</p>

      {message && <p className="message">{message}</p>}

      {/* Action Buttons */}
      <div className="profile-actions">
        <button onClick={() => setShowProfileForm(!showProfileForm)}>
          {showProfileForm ? "❌ Cancel Update Profile" : "✏️ Update Profile"}
        </button>
        <button onClick={() => setShowPasswordForm(!showPasswordForm)}>
          {showPasswordForm ? "❌ Cancel Change Password" : "🔑 Change Password"}
        </button>
      </div>

      {/* Update Profile Form */}
      {showProfileForm && (
        <div className="profile-box">
          <h3>Update Profile</h3>
          <form onSubmit={handleUpdateProfile}>
            <input
              type="text"
              value={name}
              placeholder="Enter new name"
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              value={email}
              placeholder="Enter new email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">💾 Save Changes</button>
          </form>
        </div>
      )}

      {/* Change Password Form */}
      {showPasswordForm && (
        <div className="profile-box">
          <h3>Change Password</h3>
          <form onSubmit={handleChangePassword}>
            <input
              type="password"
              value={oldPassword}
              placeholder="Enter old password"
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
            <input
              type="password"
              value={newPassword}
              placeholder="Enter new password"
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <button type="submit">🔑 Update Password</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default EditUserProfile;
