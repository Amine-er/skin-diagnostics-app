import type { AnalyzeSkinFromPhotoOutput } from "@/ai/flows/skin-analyzer";

export type DiagnosticRecord = {
  id: string;
  date: Date;
  imageUrl: string;
  results: AnalyzeSkinFromPhotoOutput;
  summary: string;
};
