// /src/components/Signup.tsx
import { useState } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [createUserWithEmailAndPassword, , loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const handleSignup = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        email,
        password,
      );
      if (userCredential) {
        const user = userCredential.user;
        await setDoc(doc(db, 'users', user.uid), {
          email,
          firstName,
          lastName,
          profilePicture,
        });
        console.log('User signed up:', user);
      } else {
        console.error('Signup failed: userCredential is undefined');
      }
    } catch (e) {
      console.error('Error signing up:', e);
    }
  };

  return (
    <div className="signup-container bg-backgroundPrimary text-content1 min-h-screen flex flex-col items-center justify-center">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="border border-border rounded-lg p-2 mb-4"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="border border-border rounded-lg p-2 mb-4"
      />
      <input
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="First Name"
        className="border border-border rounded-lg p-2 mb-4"
      />
      <input
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        placeholder="Last Name"
        className="border border-border rounded-lg p-2 mb-4"
      />
      <input
        type="text"
        value={profilePicture}
        onChange={(e) => setProfilePicture(e.target.value)}
        placeholder="Profile Picture URL"
        className="border border-border rounded-lg p-2 mb-4"
      />
      <button
        onClick={handleSignup}
        disabled={loading}
        className="bg-primary text-content1 rounded-lg px-4 py-2 mb-4"
      >
        Sign Up
      </button>
      {error && <p className="text-red-500">{error.message}</p>}
      {loading && <p>Loading...</p>}
      <p>
        Already have an account?{' '}
        <Link to="/login" className="text-primary">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Signup;
