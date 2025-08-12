'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { runDiagnostics } from '@/app/actions';
import { PhotoUploader } from '@/components/photo-uploader';
import { DiagnosticResults } from '@/components/diagnostic-results';
import { DiagnosticHistory } from '@/components/diagnostic-history';
import { Skeleton } from '@/components/ui/skeleton';
import { Logo } from '@/components/icons';
import { RefreshCw } from 'lucide-react';
import type { DiagnosticRecord } from '@/types';

type NewRecord = Omit<DiagnosticRecord, 'id' | 'date'>;

export default function Home() {
  const [history, setHistory] = useState<DiagnosticRecord[]>([]);
  const [currentRecord, setCurrentRecord] = useState<NewRecord | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleImageUpload = async (file: File) => {
    setIsLoading(true);
    setCurrentRecord(null);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const imageDataUrl = reader.result as string;
      try {
        const result = await runDiagnostics(imageDataUrl);
        setCurrentRecord(result);

        const newHistoryRecord: DiagnosticRecord = {
          ...result,
          id: new Date().toISOString(),
          date: new Date(),
        };
        setHistory((prev) => [newHistoryRecord, ...prev]);
      } catch (error) {
        console.error(error);
        toast({
          variant: 'destructive',
          title: 'Analysis Failed',
          description:
            error instanceof Error
              ? error.message
              : 'An unknown error occurred.',
        });
      } finally {
        setIsLoading(false);
      }
    };
    reader.onerror = () => {
      toast({
        variant: 'destructive',
        title: 'File Read Error',
        description: 'Could not read the uploaded image file.',
      });
      setIsLoading(false);
    };
  };

  const startNewAnalysis = () => {
    setCurrentRecord(null);
  };

  const LoadingState = () => (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-pulse w-full">
        <div className="lg:col-span-1">
          <Skeleton className="aspect-square w-full rounded-lg" />
        </div>
        <div className="lg:col-span-2 space-y-8">
          <Skeleton className="h-[350px] w-full rounded-lg" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Skeleton className="h-[150px] w-full rounded-lg" />
            <Skeleton className="h-[150px] w-full rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 bg-background/80 backdrop-blur-sm border-b z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Logo className="h-8 w-8 text-primary" />
              <h1 className="text-xl font-bold tracking-tight text-foreground">
                SkinDeep Insights
              </h1>
            </div>
            {(currentRecord || isLoading) && (
              <Button
                onClick={startNewAnalysis}
                disabled={isLoading}
                variant="outline"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                New Analysis
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full items-start">
          <div className="lg:col-span-2 bg-card p-8 rounded-xl shadow-sm min-h-[600px] flex items-center justify-center">
            {isLoading ? (
              <LoadingState />
            ) : currentRecord ? (
              <DiagnosticResults record={currentRecord} />
            ) : (
              <div className="w-full max-w-lg">
                <h2 className="text-2xl font-bold text-center mb-1">
                  Start Your Skin Analysis
                </h2>
                <p className="text-muted-foreground text-center mb-6">
                  Upload a clear, well-lit photo of your skin.
                </p>
                <PhotoUploader
                  onImageUpload={handleImageUpload}
                  loading={isLoading}
                />
              </div>
            )}
          </div>
          <div className="lg:col-span-1 h-full lg:sticky top-24">
            <DiagnosticHistory history={history} />
          </div>
        </div>
      </main>
    </div>
  );
}
