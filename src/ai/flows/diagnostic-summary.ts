'use server';

/**
 * @fileOverview Summarizes diagnostic results for quick key takeaways.
 *
 * - summarizeDiagnostic - A function that summarizes the diagnostic results.
 * - SummarizeDiagnosticInput - The input type for the summarizeDiagnostic function.
 * - SummarizeDiagnosticOutput - The return type for the summarizeDiagnostic function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeDiagnosticInputSchema = z.object({
  property1: z.number().describe('Score for property 1 (1-100).'),
  property2: z.number().describe('Score for property 2 (1-100).'),
  property3: z.number().describe('Score for property 3 (1-100).'),
  property4: z.number().describe('Score for property 4 (1-100).'),
  property5: z.number().describe('Score for property 5 (1-100).'),
  productRecommendation: z.string().describe('The barcode of the recommended product.'),
});
export type SummarizeDiagnosticInput = z.infer<typeof SummarizeDiagnosticInputSchema>;

const SummarizeDiagnosticOutputSchema = z.object({
  summary: z.string().describe('A short summary of the diagnostic results.'),
});
export type SummarizeDiagnosticOutput = z.infer<typeof SummarizeDiagnosticOutputSchema>;

export async function summarizeDiagnostic(input: SummarizeDiagnosticInput): Promise<SummarizeDiagnosticOutput> {
  return summarizeDiagnosticFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeDiagnosticPrompt',
  input: {schema: SummarizeDiagnosticInputSchema},
  output: {schema: SummarizeDiagnosticOutputSchema},
  prompt: `Summarize the following diagnostic results in one sentence.  Include the product recommendation.

Property 1: {{property1}}
Property 2: {{property2}}
Property 3: {{property3}}
Property 4: {{property4}}
Property 5: {{property5}}
Product Recommendation: {{productRecommendation}}`,
});

const summarizeDiagnosticFlow = ai.defineFlow(
  {
    name: 'summarizeDiagnosticFlow',
    inputSchema: SummarizeDiagnosticInputSchema,
    outputSchema: SummarizeDiagnosticOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
