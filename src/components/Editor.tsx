import { useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebaseConfig';
import { useContentStore } from '../store/store';
import { doc, updateDoc, onSnapshot } from 'firebase/firestore';
import { debounce } from 'lodash';
import { useSocket } from '../contexts/SocketContext';

const Editor = () => {
  const { noteId } = useParams();
  const content = useContentStore((state) => state.content);
  const setContent = useContentStore((state) => state.setContent);
  const [user] = useAuthState(auth);
  const socket = useSocket();

  useEffect(() => {
    if (user && noteId) {
      const docRef = doc(db, 'notes', noteId);

      const unsubscribe = onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
          setContent(docSnap.data()?.content || '');
        }
      });

      return () => unsubscribe();
    }
  }, [user, noteId, setContent]);

  const updateContent = useCallback(
    debounce(async (newContent: string) => {
      if (user && noteId) {
        const docRef = doc(db, 'notes', noteId);
        await updateDoc(docRef, { content: newContent });
      }
    }, 1000),
    [user, noteId],
  );

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    socket.emit('send-update', e.target.value, noteId);
    updateContent(e.target.value);
  };

  useEffect(() => {
    socket.on('receive-update', (updatedContent: string) => {
      setContent(updatedContent);
    });

    return () => {
      socket.off('receive-update');
    };
  }, [socket, setContent]);

  return (
    <div className="bg-transparent min-h-screen flex justify-center items-start text-content1">
      <div className="editor-container bg-backgroundSecondary rounded-lg overflow-hidden relative aspect-[8.5/11]">
        <textarea
          value={content}
          onChange={handleChange}
          className="textarea w-full h-full text-lg border-none focus:outline-none resize-none bg-backgroundSecondary text-content1"
          disabled={!user}
          style={{
            height: 'calc(100vh - 10rem)',
            width: '8.5in',
            maxWidth: '100%',
            margin: '0 auto',
            padding: '1in',
            boxSizing: 'border-box',
            overflow: 'hidden',
          }}
        />
      </div>
    </div>
  );
};

export default Editor;
