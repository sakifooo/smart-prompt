'use server';
/**
 * @fileOverview This file implements a Genkit flow for smart prompt engineering.
 * It transforms simple ideas into detailed, optimized prompts for creative models.
 *
 * - smartPromptEngineering - A function that handles the prompt engineering process.
 * - SmartPromptEngineeringInput - The input type for the smartPromptEngineering function.
 * - SmartPromptEngineeringOutput - The return type for the smartPromptEngineering function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Input Schema
const SmartPromptEngineeringInputSchema = z.object({
  idea: z.string().describe('A simple idea or concept to be transformed into a detailed prompt.'),
  modelType: z.enum(['image-generation', 'video-generation', 'text-generation']).describe('The type of creative model the prompt is intended for.'),
  mood: z.string().optional().describe('An optional mood or emotional tone for the generated output.'),
  style: z.string().optional().describe('An optional artistic or writing style for the generated output.'),
  additionalInstructions: z.string().optional().describe('Any additional specific instructions or constraints for the prompt.'),
});
export type SmartPromptEngineeringInput = z.infer<typeof SmartPromptEngineeringInputSchema>;

// Output Schema
const SmartPromptEngineeringOutputSchema = z.object({
  optimizedPrompt: z.string().describe('The detailed and optimized prompt generated from the simple idea.'),
});
export type SmartPromptEngineeringOutput = z.infer<typeof SmartPromptEngineeringOutputSchema>;

// Wrapper function
export async function smartPromptEngineering(input: SmartPromptEngineeringInput): Promise<SmartPromptEngineeringOutput> {
  return smartPromptEngineeringFlow(input);
}

// Prompt definition
const smartPromptEngineerPrompt = ai.definePrompt({
  name: 'smartPromptEngineerPrompt',
  input: {schema: SmartPromptEngineeringInputSchema},
  output: {schema: SmartPromptEngineeringOutputSchema},
  prompt: `You are an expert prompt engineer specializing in crafting detailed and optimized prompts for generative AI models.
Your goal is to take a simple idea or concept and expand it into a comprehensive prompt.

Consider the following input:

Idea: "{{{idea}}}"
Model Type: "{{{modelType}}}"
{{#if mood}}Mood: "{{{mood}}}"{{/if}}
{{#if style}}Style: "{{{style}}}"{{/if}}
{{#if additionalInstructions}}Additional Instructions: "{{{additionalInstructions}}}"{{/if}}

Based on the 'Model Type', elaborate the 'Idea' with rich details.

If the model type is 'image-generation': Focus on visual elements such as composition, lighting, color palette, textures, subject details, background, and art style.
If the model type is 'video-generation': Focus on dynamic elements such as camera movement (pan, tilt, zoom), pacing, lighting changes, character action, environmental atmosphere, and cinematic flow.
If the model type is 'text-generation': Focus on tone, structure, target audience, specific points to cover, and formatting requirements.

Ensure the final prompt is concise but rich in detail, ready for direct use in a generative AI model.
Output only the optimized prompt within the "optimizedPrompt" field of the JSON.`,
});

// Flow definition
const smartPromptEngineeringFlow = ai.defineFlow(
  {
    name: 'smartPromptEngineeringFlow',
    inputSchema: SmartPromptEngineeringInputSchema,
    outputSchema: SmartPromptEngineeringOutputSchema,
  },
  async (input) => {
    const { output } = await smartPromptEngineerPrompt(input);
    return output!;
  }
);
