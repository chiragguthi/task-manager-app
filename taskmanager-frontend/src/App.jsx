import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import Login from './components/Login';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true); // User is logged in if token is present
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true); // Set user as logged in
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Clear token
    setIsLoggedIn(false); // Set user as logged out
  };

  return (
    <div className="container mx-auto p-6">
      {isLoggedIn ? (
        <div>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mb-4"
          >
            Logout
          </button>
          <TaskList />
        </div>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
