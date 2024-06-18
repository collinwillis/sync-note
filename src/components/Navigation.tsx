// /src/components/Navigation.tsx
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/store';
import { auth } from '../firebaseConfig';
import { useState, useEffect } from 'react';

const Navigation = () => {
  const user = useAuthStore((state) => state.user);
  const [darkMode, setDarkMode] = useState(false);

  const handleLogout = () => {
    auth.signOut().then(() => {
      useAuthStore.getState().setUser(null); // Clear the user from the store
    });
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    document.documentElement.setAttribute(
      'data-theme',
      darkMode ? 'dark' : 'light',
    );
  }, [darkMode]);

  return (
    <nav className="bg-backgroundPrimary dark:bg-backgroundSecondary shadow-md fixed w-full top-0 z-50">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-semibold text-content1 dark:text-content2 hover:text-primary dark:hover:text-primary-dark"
        >
          SyncNote
        </Link>
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleDarkMode}
            className="bg-backgroundSecondary text-content1 dark:text-content2 hover:text-primary dark:hover:text-primary-dark"
          >
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
          {user ? (
            <button
              onClick={handleLogout}
              className="bg-backgroundSecondary text-content1 dark:text-content2 hover:text-primary dark:hover:text-primary-dark"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="text-content1 dark:text-content2 hover:text-primary dark:hover:text-primary-dark"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-content1 dark:text-content2 hover:text-primary dark:hover:text-primary-dark"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
