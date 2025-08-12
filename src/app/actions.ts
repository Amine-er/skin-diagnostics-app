"use server";

import { analyzeSkinFromPhoto } from "@/ai/flows/skin-analyzer";
import { summarizeDiagnostic } from "@/ai/flows/diagnostic-summary";
import type { DiagnosticRecord } from "@/types";

export async function runDiagnostics(
  imageDataUrl: string
): Promise<Omit<DiagnosticRecord, "id" | "date">> {
  try {
    const analysis = await analyzeSkinFromPhoto({
      diagnosticPhotoUrl: imageDataUrl,
    });

    if (!analysis) {
      throw new Error("Skin analysis failed to return results.");
    }
    
    const summaryResult = await summarizeDiagnostic({
      property1: analysis.property1,
      property2: analysis.property2,
      property3: analysis.property3,
      property4: analysis.property4,
      property5: analysis.property5,
      productRecommendation: analysis.recommendedProductId,
    });
    
    if (!summaryResult || !summaryResult.summary) {
        throw new Error("Diagnostic summary failed to return a result.");
    }

    return {
      imageUrl: imageDataUrl,
      results: analysis,
      summary: summaryResult.summary,
    };
  } catch (error) {
    console.error("Error running diagnostics:", error);
    if (error instanceof Error) {
      throw new Error(`An error occurred during the diagnostic process: ${error.message}`);
    }
    throw new Error("An unknown error occurred during the diagnostic process.");
  }
}
