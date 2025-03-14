
import React from 'react';
import { Card } from '@/components/ui/card';
import { formatDistance } from 'date-fns';
import { cn } from '@/lib/utils';
import { Note } from '@/types/note';

interface NoteCardProps {
  note: Note;
  isActive?: boolean;
  onClick?: () => void;
}

export default function NoteCard({ note, isActive = false, onClick }: NoteCardProps) {
  // Format the date relative to now (e.g., "2 hours ago")
  const formattedDate = formatDistance(new Date(note.updatedAt), new Date(), { addSuffix: true });
  
  // Truncate content for the preview
  const contentPreview = note.content.length > 120 
    ? `${note.content.substring(0, 120)}...` 
    : note.content;
  
  return (
    <Card 
      className={cn(
        "p-4 cursor-pointer transition-all duration-300 hover:shadow-hover group",
        "transform hover:-translate-y-1 border border-border/40",
        "animate-in fade-in slide-in",
        isActive && "ring-2 ring-primary/20"
      )}
      onClick={onClick}
    >
      <div className="space-y-2">
        <h3 className={cn(
          "font-medium text-lg",
          "transition-colors",
          isActive ? "text-primary" : "text-foreground"
        )}>
          {note.title || "Untitled Note"}
        </h3>
        
        <p className="text-muted-foreground text-sm line-clamp-3">
          {contentPreview || "Empty note"}
        </p>
        
        {note.imageUrl && (
          <div className="relative h-20 w-full overflow-hidden rounded-md mt-2">
            <img 
              src={note.imageUrl} 
              alt="Note attachment" 
              className="object-cover w-full h-full"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />
          </div>
        )}
        
        <div className="flex justify-between items-center pt-2 text-xs text-muted-foreground">
          <span>{formattedDate}</span>
        </div>
      </div>
    </Card>
  );
}
