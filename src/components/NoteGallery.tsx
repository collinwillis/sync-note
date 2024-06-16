import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebaseConfig';
import { collection, getDocs, doc, setDoc } from 'firebase/firestore';
import { useAuthStore } from '../store/store';
import { query, where } from 'firebase/firestore';

interface Note {
  id: string;
  title: string;
}

const NoteGallery = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    const fetchNotes = async () => {
      if (user) {
        const notesQuery = query(
          collection(db, 'notes'),
          where('collaborators', 'array-contains', user.email),
        );
        const notesSnapshot = await getDocs(notesQuery);
        const notesList = notesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Note[];
        setNotes(notesList);
      }
    };

    fetchNotes();
  }, [user]);

  const handleAddNote = async () => {
    if (user) {
      const newNoteRef = doc(collection(db, 'notes'));
      await setDoc(newNoteRef, {
        title: 'Untitled Note',
        content: '',
        collaborators: [user.email],
        owner: user.id,
      });
      setNotes([...notes, { id: newNoteRef.id, title: 'Untitled Note' }]);
    }
  };

  return (
    <div>
      <h2>Your Notes</h2>
      <button onClick={handleAddNote}>Add Note</button>
      <div className="notes-grid">
        {notes.map((note) => (
          <Link to={`/app/${note.id}`} key={note.id}>
            <div className="note-card">
              <h3>{note.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NoteGallery;
