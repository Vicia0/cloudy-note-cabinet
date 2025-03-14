
import React, { useMemo } from 'react';
import { useNotesStore } from '@/store/notesStore';
import NoteCard from '@/components/NoteCard';
import { AnimatePresence, motion } from 'framer-motion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Note } from '@/types/note';

export default function NotesList() {
  const { notes, activeNote, setActiveNote } = useNotesStore();
  
  const sortedNotes = useMemo(() => {
    // Sort notes by last updated date (newest first)
    return [...notes].sort((a, b) => b.updatedAt - a.updatedAt);
  }, [notes]);
  
  const handleNoteClick = (note: Note) => {
    setActiveNote(note);
  };
  
  return (
    <ScrollArea className="h-[calc(100vh-12rem)] w-full pr-4">
      <div className="grid grid-cols-1 gap-4">
        <AnimatePresence>
          {sortedNotes.length > 0 ? (
            sortedNotes.map((note, index) => (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ 
                  duration: 0.3, 
                  delay: index * 0.05,
                  ease: [0.16, 1, 0.3, 1] 
                }}
              >
                <NoteCard 
                  note={note} 
                  isActive={activeNote?.id === note.id}
                  onClick={() => handleNoteClick(note)}
                />
              </motion.div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="rounded-full bg-muted p-6 mb-4">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-10 w-10 text-muted-foreground" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={1.5} 
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-foreground">No Notes Yet</h3>
              <p className="text-muted-foreground mt-1 max-w-sm">
                Create your first note to get started
              </p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </ScrollArea>
  );
}
