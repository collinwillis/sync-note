// /src/components/UserPresence.tsx
import { useEffect, useState } from 'react';
import { useUserStore, useAuthStore } from '../store/store';
import { useSocket } from '../contexts/SocketContext';
import { User } from '../models/User';
import { useParams } from 'react-router-dom';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig.ts';
import { PlusIcon } from '@heroicons/react/16/solid';

const colors = [
  'bg-red-400',
  'bg-yellow-400',
  'bg-green-400',
  'bg-blue-400',
  'bg-purple-400',
  'bg-pink-400',
  'bg-indigo-400',
];

const getColorForUser = (email: string) => {
  const charCodeSum = email
    .split('')
    .reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return colors[charCodeSum % colors.length];
};

const UserPresence = () => {
  const [inviteEmail, setInviteEmail] = useState('');
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const users = useUserStore((state) => state.users);
  const addUser = useUserStore((state) => state.addUser);
  const removeUser = useUserStore((state) => state.removeUser);
  const setUsers = useUserStore((state) => state.setUsers);
  const socket = useSocket();
  const user = useAuthStore((state) => state.user);
  const { noteId } = useParams();

  useEffect(() => {
    if (user && socket && noteId) {
      socket.emit('join-note', { user, noteId });

      socket.on('user-joined', (newUser: User) => {
        addUser(newUser);
      });

      socket.on('user-left', (leftUser: User) => {
        removeUser(leftUser.email);
      });

      socket.on('current-users', (currentUsers: User[]) => {
        setUsers(currentUsers);
      });

      return () => {
        socket.emit('leave-note', { user, noteId });
        socket.off('user-joined');
        socket.off('user-left');
        socket.off('current-users');
      };
    }
  }, [user, socket, noteId, addUser, removeUser, setUsers]);

  const handleInvite = async () => {
    if (inviteEmail && noteId) {
      const noteRef = doc(db, 'notes', noteId);
      await updateDoc(noteRef, {
        collaborators: arrayUnion(inviteEmail),
      });
      setInviteEmail('');
      setIsInviteModalOpen(false);
    }
  };

  const renderAvatar = (user: User, index: number) => {
    const color = getColorForUser(user.email);
    if (user.profilePicture) {
      return (
        <div
          className={`avatar avatar-ring-primary order-${index} -ml-8 first:ml-0`}
        >
          <img
            src={user.profilePicture}
            alt={`${user.firstName} ${user.lastName}`}
            className="rounded-full"
          />
        </div>
      );
    } else {
      const initials =
        user.firstName && user.lastName
          ? `${user.firstName[0]}${user.lastName[0]}`
          : user.email[0];
      return (
        <div
          className={`avatar avatar-ring-primary ${color} text-white flex items-center justify-center rounded-full order-${index} -ml-8 first:ml-0`}
        >
          <div>{initials}</div>
        </div>
      );
    }
  };

  return (
    <div className="flex items-center -space-x-2">
      {users
        .slice(0)
        .reverse()
        .map((user, index) => (
          <div key={index}>{renderAvatar(user, index)}</div>
        ))}
      <div
        className="avatar avatar-ring-primary bg-gray-400 text-white flex items-center justify-center rounded-full -ml-8 first:ml-0 cursor-pointer"
        onClick={() => setIsInviteModalOpen(true)}
      >
        <PlusIcon className="h-6 w-6" />
      </div>

      {isInviteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-backgroundSecondary p-4 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-bold mb-2">Invite User</h2>
            <input
              type="email"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              placeholder="Enter email"
              className="bg-backgroundPrimary border border-gray-300 dark:border-gray-600 rounded-lg p-2 mb-2 w-full"
            />
            <div className="flex justify-end">
              <button
                onClick={handleInvite}
                className="bg-appleBlue-500 text-white rounded-lg px-4 py-2 mr-2"
              >
                Invite
              </button>
              <button
                onClick={() => setIsInviteModalOpen(false)}
                className="bg-appleGray-600 text-white rounded-lg px-4 py-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPresence;
