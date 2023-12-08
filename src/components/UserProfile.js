// UserProfile.js

import React from "react";

const UserProfile = ({ user }) => {
  return (
    <div className="user-profile">
      <h2>User Profile</h2>
      <div>
        <strong>Name:</strong> {user.name}
      </div>
      <div>
        <strong>Email:</strong> {user.email}
      </div>
      <div>
        <strong>Username:</strong> {user.username}
      </div>
      {/* Add more user information as needed */}
    </div>
  );
};

export default UserProfile;
