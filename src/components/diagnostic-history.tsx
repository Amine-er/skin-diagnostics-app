import Image from 'next/image';
import { format } from 'date-fns';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { DiagnosticRecord } from '@/types';
import { Calendar } from 'lucide-react';

interface DiagnosticHistoryProps {
  history: DiagnosticRecord[];
}

export function DiagnosticHistory({ history }: DiagnosticHistoryProps) {
  return (
    <Card className="h-full flex flex-col max-h-[calc(100vh-8rem)]">
      <CardHeader>
        <CardTitle>Diagnostic History</CardTitle>
        <CardDescription>Review your past skin analyses.</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow p-0 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="space-y-4 p-6 pt-0">
            {history.length === 0 ? (
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
                  className="flex items-start gap-4 p-4 border rounded-lg bg-card hover:bg-secondary/50 transition-colors"
                >
                  <div className="relative w-16 h-16 rounded-md overflow-hidden shrink-0">
                    <Image
                      src={record.imageUrl}
                      alt={`Diagnostic from ${format(record.date, 'PPP')}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                      <Calendar className="w-3 h-3" />
                      <span>{format(record.date, 'PPP p')}</span>
                    </div>
                    <p className="text-sm line-clamp-3">{record.summary}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
