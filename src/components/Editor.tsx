// src/components/Editor.tsx
import React from 'react';
import { useSocket } from '../contexts/SocketContext';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebaseConfig';
import { useContentStore } from '../store/store';

const Editor = () => {
  const socket = useSocket();
  const content = useContentStore((state) => state.content);
  const setContent = useContentStore((state) => state.setContent);
  const [user] = useAuthState(auth);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    socket?.emit('send-update', e.target.value);
  };

  return (
    <textarea
      value={content}
      onChange={handleChange}
      className="textarea w-full h-90vh p-4 text-lg"
      disabled={!user}
    />
  );
};

export default Editor;
