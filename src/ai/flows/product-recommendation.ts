'use server';

/**
 * @fileOverview Flow to get a product recommendation based on skin diagnostic scores.
 *
 * - getProductRecommendation - A function that returns a product recommendation based on skin diagnostic scores.
 * - GetProductRecommendationInput - The input type for the getProductRecommendation function.
 * - GetProductRecommendationOutput - The return type for the getProductRecommendation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GetProductRecommendationInputSchema = z.object({
  property1Score: z.number().describe('Score for skin property 1 (1-100).'),
  property2Score: z.number().describe('Score for skin property 2 (1-100).'),
  property3Score: z.number().describe('Score for skin property 3 (1-100).'),
  property4Score: z.number().describe('Score for skin property 4 (1-100).'),
  property5Score: z.number().describe('Score for skin property 5 (1-100).'),
});
export type GetProductRecommendationInput = z.infer<typeof GetProductRecommendationInputSchema>;

const GetProductRecommendationOutputSchema = z.object({
  barcode: z.string().describe('The barcode of the recommended product.'),
  reason: z.string().describe('Explanation of why this product is recommended for the given scores.'),
});
export type GetProductRecommendationOutput = z.infer<typeof GetProductRecommendationOutputSchema>;

export async function getProductRecommendation(input: GetProductRecommendationInput): Promise<GetProductRecommendationOutput> {
  return getProductRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'productRecommendationPrompt',
  input: {schema: GetProductRecommendationInputSchema},
  output: {schema: GetProductRecommendationOutputSchema},
  prompt: `Based on the following skin diagnostic scores, recommend a single product by its barcode and explain why it is suitable. The scores range from 1 to 100.

Property 1 Score: {{{property1Score}}}
Property 2 Score: {{{property2Score}}}
Property 3 Score: {{{property3Score}}}
Property 4 Score: {{{property4Score}}}
Property 5 Score: {{{property5Score}}}

Ensure the response includes both the barcode and a concise reason for the recommendation.`,
});

const getProductRecommendationFlow = ai.defineFlow(
  {
    name: 'getProductRecommendationFlow',
    inputSchema: GetProductRecommendationInputSchema,
    outputSchema: GetProductRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
