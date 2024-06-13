import { SocketProvider } from './contexts/SocketContext';
import Editor from './components/Editor';
import UserPresence from './components/UserPresence';
import VersionHistory from './components/VersionHistory';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebaseConfig';

const App = () => {
  const [user, loading] = useAuthState(auth);

  if (loading) return <div>Loading...</div>;

  return (
    <SocketProvider>
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-4">SyncNote</h1>
        {user ? (
          <>
            <UserPresence />
            <Editor />
            <VersionHistory />
          </>
        ) : (
          <div>Please log in to use the application.</div>
        )}
      </div>
    </SocketProvider>
  );
};

export default App;
