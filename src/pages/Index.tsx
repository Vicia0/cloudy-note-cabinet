
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNotesStore } from '@/store/notesStore';
import NotesList from '@/components/NotesList';
import NoteEditor from '@/components/NoteEditor';
import { toast } from 'sonner';
import { AnimatePresence, motion } from 'framer-motion';

const Index = () => {
  const { notes, addNote, activeNote, deleteNote } = useNotesStore();
  
  const handleCreateNote = () => {
    const newNote = addNote({
      title: 'Untitled Note',
      content: '',
    });
    
    toast.success('New note created');
  };
  
  const handleDeleteNote = () => {
    if (activeNote) {
      if (confirm('Are you sure you want to delete this note?')) {
        deleteNote(activeNote.id);
        toast.success('Note deleted');
      }
    }
  };
  
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-screen-2xl">
        <header className="sticky top-0 z-10 backdrop-blur bg-background/80 border-b border-border/40">
          <div className="container py-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-medium">Notes</h1>
              <p className="text-muted-foreground">
                {notes.length} {notes.length === 1 ? 'note' : 'notes'}
              </p>
            </div>
            
            <div className="flex gap-3">
              <Button onClick={handleCreateNote} className="shadow-soft">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 mr-2" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={1.5} 
                    d="M12 4v16m8-8H4" 
                  />
                </svg>
                New Note
              </Button>
              
              <AnimatePresence>
                {activeNote && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Button 
                      variant="outline" 
                      onClick={handleDeleteNote}
                      className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-5 w-5 mr-2" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={1.5} 
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
                        />
                      </svg>
                      Delete
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>
        
        <main className="container py-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-4 lg:col-span-3">
              <NotesList />
            </div>
            
            <div className="md:col-span-8 lg:col-span-9">
              <NoteEditor />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
