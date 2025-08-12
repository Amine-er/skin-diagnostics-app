import Image from 'next/image';
import { useState } from 'react';
import { format } from 'date-fns';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import type { DiagnosticRecord } from '@/types';
import { Calendar, Trash2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { deleteDiagnosticRecord } from '@/app/actions';

interface DiagnosticHistoryProps {
  history: DiagnosticRecord[];
  isLoading: boolean;
  onRecordDeleted: (id: string) => void;
}

export function DiagnosticHistory({
  history,
  isLoading,
  onRecordDeleted,
}: DiagnosticHistoryProps) {
  const { toast } = useToast();
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    setIsDeleting(id);
    try {
      await deleteDiagnosticRecord(id);
      onRecordDeleted(id);
      toast({
        title: 'Record Deleted',
        description: 'The diagnostic record has been successfully removed.',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Deletion Failed',
        description:
          error instanceof Error
            ? error.message
            : 'Could not delete the record.',
      });
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <Card className="h-full flex flex-col max-h-[calc(100vh-8rem)]">
      <CardHeader>
        <CardTitle>Diagnostic History</CardTitle>
        <CardDescription>Review your past skin analyses.</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow p-0 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="space-y-4 p-6 pt-0">
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 p-4 border rounded-lg"
                  >
                    <Skeleton className="w-16 h-16 rounded-md shrink-0" />
                    <div className="flex-grow space-y-2">
                      <Skeleton className="h-4 w-1/2" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                  </div>
                ))}
              </div>
            ) : history.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-48 text-center">
                <p className="text-sm text-muted-foreground">No history yet.</p>
                <p className="text-sm text-muted-foreground">
                  Your first analysis will appear here.
                </p>
              </div>
            ) : (
              history.map((record) => (
                <div
                  key={record.id}
                  className="group flex items-start gap-4 p-4 border rounded-lg bg-card hover:bg-secondary/50 transition-colors"
                >
                  <div className="relative w-16 h-16 rounded-md overflow-hidden shrink-0">
                    <Image
                      src={record.imageUrl}
                      alt={`Diagnostic from ${format(
                        new Date(record.date),
                        'PPP'
                      )}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                      <Calendar className="w-3 h-3" />
                      <span>{format(new Date(record.date), 'PPP p')}</span>
                    </div>
                    <p className="text-sm line-clamp-3">{record.summary}</p>
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        disabled={isDeleting === record.id}
                      >
                        {isDeleting === record.id ? (
                          <span className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4 text-destructive" />
                        )}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete this diagnostic record.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(record.id)}
                          className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
