
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Note } from '@/types/note';

interface NotesState {
  notes: Note[];
  activeNote: Note | null;
  addNote: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => Note;
  updateNote: (id: string, updates: Partial<Omit<Note, 'id' | 'createdAt' | 'updatedAt'>>) => void;
  deleteNote: (id: string) => void;
  setActiveNote: (note: Note | null) => void;
}

export const useNotesStore = create<NotesState>()(
  persist(
    (set, get) => ({
      notes: [],
      activeNote: null,
      
      addNote: (noteData) => {
        const now = Date.now();
        const newNote: Note = {
          id: crypto.randomUUID(),
          createdAt: now,
          updatedAt: now,
          ...noteData,
        };
        
        set((state) => ({
          notes: [newNote, ...state.notes],
          activeNote: newNote,
        }));
        
        return newNote;
      },
      
      updateNote: (id, updates) => {
        const now = Date.now();
        set((state) => ({
          notes: state.notes.map((note) => 
            note.id === id 
              ? { ...note, ...updates, updatedAt: now } 
              : note
          ),
          activeNote: state.activeNote?.id === id 
            ? { ...state.activeNote, ...updates, updatedAt: now }
            : state.activeNote,
        }));
      },
      
      deleteNote: (id) => {
        set((state) => ({
          notes: state.notes.filter((note) => note.id !== id),
          activeNote: state.activeNote?.id === id ? null : state.activeNote,
        }));
      },
      
      setActiveNote: (note) => {
        set({ activeNote: note });
      },
    }),
    {
      name: 'notes-storage',
    }
  )
);
