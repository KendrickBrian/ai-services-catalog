// SummarizeAIServices flow implemented here
'use server';

/**
 * @fileOverview This file defines a Genkit flow for summarizing AI services. 
 *
 * - summarizeAIService - An async function that takes the AI service description as input and returns a concise summary.
 * - SummarizeAIServiceInput - The input type for the summarizeAIService function.
 * - SummarizeAIServiceOutput - The output type for the summarizeAIService function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeAIServiceInputSchema = z.object({
  description: z.string().describe('The detailed description of the AI service.'),
});
export type SummarizeAIServiceInput = z.infer<typeof SummarizeAIServiceInputSchema>;

const SummarizeAIServiceOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the AI service.'),
});
export type SummarizeAIServiceOutput = z.infer<typeof SummarizeAIServiceOutputSchema>;

export async function summarizeAIService(input: SummarizeAIServiceInput): Promise<SummarizeAIServiceOutput> {
  return summarizeAIServiceFlow(input);
}

const summarizeAIServicePrompt = ai.definePrompt({
  name: 'summarizeAIServicePrompt',
  input: {schema: SummarizeAIServiceInputSchema},
  output: {schema: SummarizeAIServiceOutputSchema},
  prompt: `You are an expert AI assistant specializing in summarizing AI services. Your goal is to provide a short, informative, and engaging summary of the service based on its description.

Description: {{{description}}}

Summary:`, //Crucially, keep this to 1-2 short sentences.
});

const summarizeAIServiceFlow = ai.defineFlow(
  {
    name: 'summarizeAIServiceFlow',
    inputSchema: SummarizeAIServiceInputSchema,
    outputSchema: SummarizeAIServiceOutputSchema,
  },
  async input => {
    const {output} = await summarizeAIServicePrompt(input);
    return output!;
  }
);
