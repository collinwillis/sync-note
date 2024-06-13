import { useUserStore } from '../store/store';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebaseConfig';

const UserPresence = () => {
  const users = useUserStore((state) => state.users);
  // const [user] = useAuthState(auth);

  return (
    <div>
      {users.map((userEmail, index) => (
        <div key={index}>{userEmail}</div>
      ))}
    </div>
  );
};

export default UserPresence;
