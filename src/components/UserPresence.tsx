// /src/components/UserPresence.tsx
import { useEffect } from 'react';
import { useUserStore, useAuthStore } from '../store/store';
import { useSocket } from '../contexts/SocketContext';
import { User } from '../models/User';
import { useParams } from 'react-router-dom';

const UserPresence = () => {
  const users = useUserStore((state) => state.users);
  const addUser = useUserStore((state) => state.addUser);
  const removeUser = useUserStore((state) => state.removeUser);
  const setUsers = useUserStore((state) => state.setUsers);
  const socket = useSocket();
  const user = useAuthStore((state) => state.user);
  const { noteId } = useParams();

  useEffect(() => {
    console.log('Users in state:', users);
  }, [users]);

  useEffect(() => {
    if (user && socket && noteId) {
      console.log('User detected in UserPresence:', user);

      socket.emit('join-note', { user, noteId });

      socket.on('user-joined', (newUser: User) => {
        console.log('New user joined:', newUser);
        addUser(newUser.email);
      });

      socket.on('user-left', (leftUser: User) => {
        console.log('User left:', leftUser);
        removeUser(leftUser.email);
      });

      socket.on('current-users', (currentUsers: User[]) => {
        console.log('Current users:', currentUsers);
        setUsers(currentUsers.map((user) => user.email));
      });

      return () => {
        console.log('Cleaning up socket listeners');
        socket.emit('leave-note', { user, noteId });
        socket.off('user-joined');
        socket.off('user-left');
        socket.off('current-users');
      };
    }
  }, [user, socket, noteId, addUser, removeUser, setUsers]);

  return (
    <div>
      {users.map((userEmail, index) => (
        <div key={index}>{userEmail}</div>
      ))}
    </div>
  );
};

export default UserPresence;
