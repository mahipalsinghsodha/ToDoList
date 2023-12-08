// App.js

import React, { useState } from "react";
import TodoList from "./TodoList";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import UserProfile from "./UserProfile";
import "./style.css";
const Main = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    // Perform login logic (authentication, etc.)
    // Set user data and mark as logged in
    setUser(userData);
    setLoggedIn(true);
  };

  const handleLogout = () => {
    // Perform logout logic
    setUser(null);
    setLoggedIn(false);
  };

  return (
    <div className="app-container">
      {loggedIn ? (
        <>
          <UserProfile user={user} onLogout={handleLogout} />
          <TodoList user={user} />
        </>
      ) : (
        <>
          <LoginForm onLogin={handleLogin} />
          <RegisterForm />
        </>
      )}
    </div>
  );
};

export default Main;
