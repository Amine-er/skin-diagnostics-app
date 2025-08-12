// This file contains the Genkit flow for analyzing skin properties from a photo.

'use server';

/**
 * @fileOverview Analyzes skin properties from a photo and returns diagnostic scores.
 *
 * - analyzeSkinFromPhoto - A function that handles the skin analysis process.
 * - AnalyzeSkinFromPhotoInput - The input type for the analyzeSkinFromPhoto function.
 * - AnalyzeSkinFromPhotoOutput - The return type for the analyzeSkinFromPhoto function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeSkinFromPhotoInputSchema = z.object({
  diagnosticPhotoUrl: z
    .string()
    .describe(
      'URL of the uploaded photo, as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.' // Changed to URL since we store it in the file server.
    ),
});
export type AnalyzeSkinFromPhotoInput = z.infer<typeof AnalyzeSkinFromPhotoInputSchema>;

const AnalyzeSkinFromPhotoOutputSchema = z.object({
  property1: z
    .number()
    .int()
    .min(1)
    .max(100)
    .describe('Score for skin property 1 (1-100).'),
  property2: z
    .number()
    .int()
    .min(1)
    .max(100)
    .describe('Score for skin property 2 (1-100).'),
  property3: z
    .number()
    .int()
    .min(1)
    .max(100)
    .describe('Score for skin property 3 (1-100).'),
  property4: z
    .number()
    .int()
    .min(1)
    .max(100)
    .describe('Score for skin property 4 (1-100).'),
  property5: z
    .number()
    .int()
    .min(1)
    .max(100)
    .describe('Score for skin property 5 (1-100).'),
  recommendedProductId: z.string().describe('The barcode of the recommended product.'),
});
export type AnalyzeSkinFromPhotoOutput = z.infer<typeof AnalyzeSkinFromPhotoOutputSchema>;

export async function analyzeSkinFromPhoto(input: AnalyzeSkinFromPhotoInput): Promise<AnalyzeSkinFromPhotoOutput> {
  return analyzeSkinFromPhotoFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeSkinFromPhotoPrompt',
  input: {schema: AnalyzeSkinFromPhotoInputSchema},
  output: {schema: AnalyzeSkinFromPhotoOutputSchema},
  prompt: `You are a skin analysis expert. Analyze the skin in the photo provided, and return scores between 1 and 100 for each of the following properties:

- property1
- property2
- property3
- property4
- property5

Based on the analysis, recommend ONE product by its barcode (recommendedProductId).

Photo: {{media url=diagnosticPhotoUrl}}`,
});

const analyzeSkinFromPhotoFlow = ai.defineFlow(
  {
    name: 'analyzeSkinFromPhotoFlow',
    inputSchema: AnalyzeSkinFromPhotoInputSchema,
    outputSchema: AnalyzeSkinFromPhotoOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
