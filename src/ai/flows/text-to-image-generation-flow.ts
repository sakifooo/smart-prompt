'use server';
/**
 * @fileOverview A flow for generating images from a text prompt and additional parameters.
 *
 * - textToImageGeneration - A function that handles the image generation process.
 * - TextToImageGenerationInput - The input type for the textToImageGeneration function.
 * - TextToImageGenerationOutput - The return type for the textToImageGeneration function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Input Schema
const TextToImageGenerationInputSchema = z.object({
  textPrompt: z.string().describe('The detailed text prompt to generate an image from.'),
  aspectRatio: z
    .enum(['16:9', '4:3', '1:1', '9:16', '3:2', '2:3'])
    .optional()
    .describe('The desired aspect ratio for the generated image (e.g., "16:9", "1:1").'),
  style: z
    .string()
    .optional()
    .describe('The artistic style for the image (e.g., "watercolor", "photorealistic", "cyberpunk", "cinematic").'),
  lighting: z
    .string()
    .optional()
    .describe('The lighting condition for the image (e.g., "dramatic lighting", "soft ambient light", "neon glow", "golden hour").'),
});
export type TextToImageGenerationInput = z.infer<typeof TextToImageGenerationInputSchema>;

// Output Schema
const TextToImageGenerationOutputSchema = z.object({
  imageDataUri: z
    .string()
    .describe(
      "The generated image as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type TextToImageGenerationOutput = z.infer<typeof TextToImageGenerationOutputSchema>;

export async function textToImageGeneration(
  input: TextToImageGenerationInput
): Promise<TextToImageGenerationOutput> {
  return textToImageGenerationFlow(input);
}

const textToImageGenerationFlow = ai.defineFlow(
  {
    name: 'textToImageGenerationFlow',
    inputSchema: TextToImageGenerationInputSchema,
    outputSchema: TextToImageGenerationOutputSchema,
  },
  async (input) => {
    let combinedPrompt = input.textPrompt;

    if (input.style) {
      combinedPrompt += `, in a ${input.style} style`;
    }
    if (input.lighting) {
      combinedPrompt += `, with ${input.lighting}`;
    }
    if (input.aspectRatio) {
      // Imagen 4 fast generate doesn't have explicit aspect ratio config in generate options,
      // so we try to incorporate it into the prompt.
      combinedPrompt += `, aspect ratio ${input.aspectRatio}`; 
    }

    const { media } = await ai.generate({
      model: 'googleai/imagen-4.0-fast-generate-001',
      prompt: combinedPrompt,
      // Imagen-4.0-fast-generate-001 does not support responseModalities or other config
      // directly for aspect ratio, style, or lighting. These must be incorporated into the prompt.
    });

    if (!media || !media.url) {
      throw new Error('Failed to generate image or retrieve its data URI.');
    }

    return {
      imageDataUri: media.url,
    };
  }
);
