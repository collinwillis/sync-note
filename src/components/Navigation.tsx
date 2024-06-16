// /src/components/Navigation.tsx
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/store';
import { auth } from '../firebaseConfig';

const Navigation = () => {
  const user = useAuthStore((state) => state.user);

  const handleLogout = () => {
    auth.signOut().then(() => {
      useAuthStore.getState().setUser(null); // Clear the user from the store
    });
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        SyncNote
      </Link>
      <div className="navbar-links">
        {user ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
