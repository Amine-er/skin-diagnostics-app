import type { AnalyzeSkinFromPhotoOutput } from '@/ai/flows/skin-analyzer';

export type DiagnosticRecord = {
  id: string;
  date: string;
  imageUrl: string;
  results: AnalyzeSkinFromPhotoOutput;
  summary: string;
};
