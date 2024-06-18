// /src/components/Login.tsx
import { useState } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import { useAuthStore } from '../store/store';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signInWithEmailAndPassword, userCredential, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const setUser = useAuthStore((state) => state.setUser);
  const navigate = useNavigate();

  const handleLogin = () => {
    console.log(userCredential);
    signInWithEmailAndPassword(email, password).then((userCredentials) => {
      if (userCredentials) {
        const user = userCredentials.user;
        setUser({ id: user.uid, email: user.email || '' });
        navigate('/app');
      }
    });
  };

  return (
    <div className="login-container p-6 bg-backgroundPrimary dark:bg-backgroundSecondary text-content1 dark:text-content2">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="block w-full mb-4 p-2 border border-border rounded"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="block w-full mb-4 p-2 border border-border rounded"
      />
      <button
        onClick={handleLogin}
        disabled={loading}
        className="w-full py-2 mb-4 bg-primary text-white rounded"
      >
        Login
      </button>
      {error && <p className="text-red-500">{error.message}</p>}
      {loading && <p>Loading...</p>}
      <p className="text-center">
        Don't have an account?{' '}
        <Link to="/signup" className="text-primary hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default Login;
