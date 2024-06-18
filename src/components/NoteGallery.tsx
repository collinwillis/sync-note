// /src/components/NoteGallery.tsx
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebaseConfig';
import {
  collection,
  getDocs,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { useAuthStore } from '../store/store';
import { query, where } from 'firebase/firestore';
import { EllipsisVerticalIcon } from '@heroicons/react/24/solid';

interface Note {
  id: string;
  title: string;
  content: string;
  owner: string;
}

const NoteGallery = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [showMenu, setShowMenu] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState<string | null>(null);
  const [titleInput, setTitleInput] = useState<string>('');
  const user = useAuthStore((state) => state.user);
  const inputRef = useRef<HTMLInputElement | null>(null);

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

  useEffect(() => {
    if (inputRef.current && editTitle) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editTitle]);

  const handleAddNote = async () => {
    if (user) {
      const newNoteRef = doc(collection(db, 'notes'));
      await setDoc(newNoteRef, {
        title: 'Untitled Note',
        content: '',
        collaborators: [user.email],
        owner: user.id,
      });
      setNotes([
        ...notes,
        {
          id: newNoteRef.id,
          title: 'Untitled Note',
          content: '',
          owner: user.id,
        },
      ]);
    }
  };

  const handleDeleteNote = async (noteId: string) => {
    await deleteDoc(doc(db, 'notes', noteId));
    setNotes(notes.filter((note) => note.id !== noteId));
    setShowMenu(null);
  };

  const handleMenuToggle = (noteId: string) => {
    setShowMenu(showMenu === noteId ? null : noteId);
  };

  const handleEditNote = (noteId: string, currentTitle: string) => {
    setEditTitle(noteId);
    setTitleInput(currentTitle);
    setShowMenu(null);
  };

  const handleTitleChange = async (noteId: string) => {
    if (titleInput.trim() !== '') {
      await updateDoc(doc(db, 'notes', noteId), { title: titleInput });
      setNotes(
        notes.map((note) =>
          note.id === noteId ? { ...note, title: titleInput } : note,
        ),
      );
      setEditTitle(null);
    }
  };

  const getNoteThumbnail = (content: string) => {
    const lines = content.split('\n');
    return lines.slice(0, 10).join(' ');
  };

  return (
    <div className="min-h-screen bg-backgroundPrimary p-6 w-full max-w-5xl flex flex-col items-start text-content1">
      <div className="flex flex-row w-full justify-between">
        <h2 className="text-2xl font-semibold mb-6">Recent Notes</h2>
        <button
          onClick={handleAddNote}
          className="bg-primary text-buttonText rounded-lg px-6 py-2 mb-8 shadow-md hover:bg-primary-dark transition duration-300"
        >
          Add Note
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {notes.map((note) => (
          <div key={note.id} className="relative group">
            <div className="note-card">
              <div className="bg-backgroundSecondary rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300">
                {editTitle === note.id ? (
                  <input
                    type="text"
                    value={titleInput}
                    ref={inputRef}
                    onChange={(e) => setTitleInput(e.target.value)}
                    onBlur={() => handleTitleChange(note.id)}
                    onKeyPress={(e) =>
                      e.key === 'Enter' && handleTitleChange(note.id)
                    }
                    className="text-xl font-medium mb-2 text-content1 dark:text-content2 hover:text-primary dark:hover:text-primary-dark bg-transparent border-b-2 border-primary focus:outline-none"
                  />
                ) : (
                  <h3
                    className={`text-xl font-medium mb-2 text-content1 dark:text-content2 ${
                      note.owner === user?.id
                        ? 'hover:text-primary dark:hover:text-primary-dark cursor-pointer'
                        : ''
                    }`}
                    onClick={() =>
                      note.owner === user?.id &&
                      handleEditNote(note.id, note.title)
                    }
                  >
                    {note.title}
                  </h3>
                )}
                <Link to={`/app/${note.id}`}>
                  <div className="shadow-xl border border-backgroundPrimary bg-backgroundSecondary rounded-md overflow-hidden aspect-[8.5/11] border-backgroundPrimary border hover:border-primary">
                    <div
                      className="p-2 text-[8px] text-content1 dark:text-content2 text-buttonText h-full overflow-hidden leading-tight"
                      style={{ whiteSpace: 'pre-wrap' }}
                    >
                      {getNoteThumbnail(note.content)}
                    </div>
                  </div>
                </Link>
              </div>
            </div>
            {note.owner === user?.id && (
              <div
                className="absolute top-2 right-2 p-1 bg-gray-200 dark:bg-gray-700 rounded-full cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600"
                onClick={() => handleMenuToggle(note.id)}
              >
                <EllipsisVerticalIcon className="h-5 w-5 text-gray-600 dark:text-gray-200" />
              </div>
            )}
            {showMenu === note.id && (
              <div className="absolute top-10 right-2 bg-white dark:bg-gray-800 shadow-md rounded-lg w-40 z-10">
                <ul className="py-1">
                  <li
                    className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                    onClick={() => handleDeleteNote(note.id)}
                  >
                    Delete Note
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                    Collaborators
                  </li>
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoteGallery;
