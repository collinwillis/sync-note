// /src/components/Editor.tsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebaseConfig';
import { useContentStore, useUserStore } from '../store/store';
import {
  doc,
  getDoc,
  updateDoc,
  onSnapshot,
  arrayUnion,
} from 'firebase/firestore';

const Editor = () => {
  const { noteId } = useParams();
  const content = useContentStore((state) => state.content);
  const setContent = useContentStore((state) => state.setContent);
  const [user] = useAuthState(auth);
  const [inviteEmail, setInviteEmail] = useState('');

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

  const handleChange = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);

    if (user && noteId) {
      const docRef = doc(db, 'notes', noteId);
      await updateDoc(docRef, { content: e.target.value });
    }
  };

  const handleInvite = async () => {
    if (inviteEmail && noteId) {
      const noteRef = doc(db, 'notes', noteId);
      await updateDoc(noteRef, {
        collaborators: arrayUnion(inviteEmail),
      });
    }
  };

  return (
    <div>
      <textarea
        value={content}
        onChange={handleChange}
        className="textarea w-full h-90vh p-4 text-lg"
        disabled={!user}
      />
      <div className="invite-section">
        <input
          type="email"
          value={inviteEmail}
          onChange={(e) => setInviteEmail(e.target.value)}
          placeholder="Invite user by email"
        />
        <button onClick={handleInvite}>Invite</button>
      </div>
    </div>
  );
};

export default Editor;
