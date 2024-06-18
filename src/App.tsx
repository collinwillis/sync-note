// /Users/collinwillis/Dev/Personal/sync-note/src/App.tsx

import { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { SocketProvider } from './contexts/SocketContext';
import Editor from './components/Editor';
import UserPresence from './components/UserPresence';
import Login from './components/Login';
import Signup from './components/Signup';
import LandingPage from './pages/LandingPage';
import NoteGallery from './components/NoteGallery';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from './firebaseConfig';
import { useAuthStore } from './store/store';
import { socket } from './socket';
import { User } from './models/User';
import { doc, getDoc } from 'firebase/firestore';
import Navigation from './components/Navigation';

const App = () => {
  const [firebaseUser, loading] = useAuthState(auth);
  const setUser = useAuthStore((state) => state.setUser);
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    const fetchUserData = async (uid: string) => {
      const docRef = doc(db, 'users', uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data() as User;
      }
      return null;
    };

    if (firebaseUser) {
      fetchUserData(firebaseUser.uid).then((userData) => {
        if (userData) {
          setUser({ ...userData, id: firebaseUser.uid });
          socket.connect();
        } else {
          setUser({ id: firebaseUser.uid, email: firebaseUser.email || '' });
          socket.connect();
        }
      });
    } else {
      setUser(null);
      socket.disconnect();
    }

    const onConnect = () => setIsConnected(true);
    const onDisconnect = () => setIsConnected(false);

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, [firebaseUser, setUser]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-backgroundPrimary text-content1">
        Loading...
      </div>
    );

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-backgroundPrimary text-content1">
        <Navigation />
        <div className="flex-grow flex flex-col items-center justify-center mt-16 px-4">
          <Routes>
            <Route
              path="/"
              element={firebaseUser ? <Navigate to="/app" /> : <LandingPage />}
            />
            <Route
              path="/login"
              element={firebaseUser ? <Navigate to="/app" /> : <Login />}
            />
            <Route
              path="/signup"
              element={firebaseUser ? <Navigate to="/app" /> : <Signup />}
            />
            <Route
              path="/app"
              element={firebaseUser ? <NoteGallery /> : <Login />}
            />
            <Route
              path="/app/:noteId"
              element={firebaseUser ? <MainApp /> : <Login />}
            />
          </Routes>
        </div>
        {isConnected ? (
          <p className="text-green-500 text-center">Connected</p>
        ) : (
          <p className="text-red-500 text-center">Disconnected</p>
        )}
      </div>
    </Router>
  );
};

const MainApp = () => (
  <SocketProvider>
    <div className="container mx-auto px-4 pt-8">
      <h1 className="text-4xl font-bold mb-4 text-center">SyncNote</h1>
      <UserPresence />
      <Editor />
    </div>
  </SocketProvider>
);

export default App;
