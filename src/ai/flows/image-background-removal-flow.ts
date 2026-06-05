'use server';
/**
 * @fileOverview This flow provides an AI agent to remove the background from an uploaded image.
 *
 * - imageBackgroundRemoval - A function that handles the image background removal process.
 * - ImageBackgroundRemovalInput - The input type for the imageBackgroundRemoval function.
 * - ImageBackgroundRemovalOutput - The return type for the imageBackgroundRemoval function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ImageBackgroundRemovalInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type ImageBackgroundRemovalInput = z.infer<
  typeof ImageBackgroundRemovalInputSchema
>;

const ImageBackgroundRemovalOutputSchema = z.object({
  processedImageDataUri: z
    .string()
    .describe(
      "The image with its background removed, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type ImageBackgroundRemovalOutput = z.infer<
  typeof ImageBackgroundRemovalOutputSchema
>;

export async function imageBackgroundRemoval(
  input: ImageBackgroundRemovalInput
): Promise<ImageBackgroundRemovalOutput> {
  return imageBackgroundRemovalFlow(input);
}

const imageBackgroundRemovalFlow = ai.defineFlow(
  {
    name: 'imageBackgroundRemovalFlow',
    inputSchema: ImageBackgroundRemovalInputSchema,
    outputSchema: ImageBackgroundRemovalOutputSchema,
  },
  async (input) => {
    const { media } = await ai.generate({
      model: 'googleai/gemini-2.5-flash-image',
      prompt: [
        {
          text:
            'Remove the background from this image. Provide the processed image with a transparent background and ensure the subject is clearly isolated.',
        },
        {
          media: {
            url: input.photoDataUri,
          },
        },
      ],
      config: {
        responseModalities: ['IMAGE'],
      },
    });

    if (!media || !media.url) {
      throw new Error('Failed to remove background: No image returned.');
    }

    return { processedImageDataUri: media.url };
  }
);
