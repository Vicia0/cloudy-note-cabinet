
import React, { useState, useEffect } from 'react';
import { useNotesStore } from '@/store/notesStore';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { AnimatePresence, motion } from 'framer-motion';

export default function NoteEditor() {
  const { activeNote, updateNote } = useNotesStore();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [isUnsaved, setIsUnsaved] = useState(false);
  
  // When the active note changes, update the form
  useEffect(() => {
    if (activeNote) {
      setTitle(activeNote.title);
      setContent(activeNote.content);
      setImageUrl(activeNote.imageUrl);
      setIsUnsaved(false);
    } else {
      setTitle('');
      setContent('');
      setImageUrl(undefined);
      setIsUnsaved(false);
    }
  }, [activeNote]);
  
  // Auto-save when content changes
  useEffect(() => {
    const autoSaveTimeout = setTimeout(() => {
      if (isUnsaved && activeNote) {
        handleSave();
      }
    }, 1000);
    
    return () => clearTimeout(autoSaveTimeout);
  }, [title, content, imageUrl, isUnsaved]);
  
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setIsUnsaved(true);
  };
  
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    setIsUnsaved(true);
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // For now, we'll use a simple FileReader to create a data URL
      // In a real app, you would use Firebase Storage
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
        setIsUnsaved(true);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSave = () => {
    if (activeNote) {
      updateNote(activeNote.id, { title, content, imageUrl });
      setIsUnsaved(false);
      toast.success('Note saved');
    }
  };
  
  if (!activeNote) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
        <Card className="p-8 text-center max-w-md mx-auto">
          <h3 className="text-lg font-medium mb-2">No Note Selected</h3>
          <p className="text-muted-foreground mb-4">
            Select a note from the list or create a new one to start editing
          </p>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="space-y-4 animate-in fade-in">
      <div className="flex items-center justify-between">
        <Input
          value={title}
          onChange={handleTitleChange}
          placeholder="Note title"
          className="text-xl font-medium border-none focus-visible:ring-0 px-0 h-auto placeholder:text-muted-foreground/50"
        />
        
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={handleSave}
            disabled={!isUnsaved}
          >
            {isUnsaved ? "Save" : "Saved"}
          </Button>
        </div>
      </div>
      
      <Textarea
        value={content}
        onChange={handleContentChange}
        placeholder="Write your note here..."
        className="min-h-[calc(100vh-16rem)] resize-none p-4 text-base leading-relaxed border-none focus-visible:ring-0 bg-card/50 rounded-lg"
      />
      
      <AnimatePresence>
        {imageUrl && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-lg overflow-hidden border border-border/50"
          >
            <img
              src={imageUrl}
              alt="Note attachment"
              className="w-full max-h-64 object-contain bg-accent/30"
            />
            <Button
              size="icon"
              variant="destructive"
              className="absolute top-2 right-2 h-8 w-8 opacity-80 hover:opacity-100"
              onClick={() => {
                setImageUrl(undefined);
                setIsUnsaved(true);
              }}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              </svg>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="flex justify-between items-center pt-2">
        <div>
          <Input
            type="file"
            accept="image/*"
            id="image-upload"
            className="hidden"
            onChange={handleImageChange}
          />
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground"
            onClick={() => document.getElementById('image-upload')?.click()}
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
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
              />
            </svg>
            Add Image
          </Button>
        </div>
        
        <span className="text-xs text-muted-foreground">
          {isUnsaved ? "Unsaved changes" : "All changes saved"}
        </span>
      </div>
    </div>
  );
}
