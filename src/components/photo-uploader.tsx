'use client';

import { useState, type ChangeEvent, type DragEvent } from 'react';
import { UploadCloud } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface PhotoUploaderProps {
  onImageUpload: (file: File) => void;
  loading: boolean;
}

const MAX_FILE_SIZE_KB = 750; // safe limit before base64 encoding
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_KB * 1024;

export function PhotoUploader({ onImageUpload, loading }: PhotoUploaderProps) {
  const [dragActive, setDragActive] = useState(false);
  const { toast } = useToast();

  const handleFile = (file: File | undefined) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        variant: 'destructive',
        title: 'Invalid File Type',
        description: 'Please upload an image file (e.g., JPG, PNG, WEBP).',
      });
      return;
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      toast({
        variant: 'destructive',
        title: 'File Too Large',
        description: `Please upload an image smaller than ${MAX_FILE_SIZE_KB}KB to meet Firestore's size limit.`,
      });
      return;
    }

    onImageUpload(file);
  };

  const handleDrag = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleFile(e.dataTransfer.files?.[0]);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    handleFile(e.target.files?.[0]);
  };

  return (
    <div
      className="flex flex-col items-center justify-center w-full"
      onDrop={handleDrop}
    >
      <label
        htmlFor="dropzone-file"
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        className={cn(
          'flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-card hover:bg-secondary/50 transition-colors',
          dragActive ? 'border-primary' : 'border-border'
        )}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <UploadCloud
            className={cn(
              'w-10 h-10 mb-4 text-muted-foreground',
              dragActive && 'text-primary'
            )}
          />
          <p className="mb-2 text-sm text-muted-foreground">
            <span className="font-semibold text-primary">Click to upload</span>{' '}
            or drag and drop
          </p>
          <p className="text-xs text-muted-foreground">
            PNG, JPG, or WEBP (Max 750KB)
          </p>
        </div>
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          onChange={handleChange}
          accept="image/png, image/jpeg, image/webp"
          disabled={loading}
        />
      </label>
      <Button
        variant="outline"
        onClick={() => document.getElementById('dropzone-file')?.click()}
        disabled={loading}
        className="mt-4"
      >
        Select Photo from Device
      </Button>
    </div>
  );
}
