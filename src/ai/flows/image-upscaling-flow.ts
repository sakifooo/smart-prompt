'use server';
/**
 * @fileOverview A Genkit flow for upscaling images to a higher resolution.
 *
 * - upscaleImage - A function that handles the image upscaling process.
 * - ImageUpscalingInput - The input type for the upscaleImage function.
 * - ImageUpscalingOutput - The return type for the upscaleImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Input schema for the image upscaling flow.
const ImageUpscalingInputSchema = z.object({
  imageDataUri: z
    .string()
    .describe(
      "The image to be upscaled, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type ImageUpscalingInput = z.infer<typeof ImageUpscalingInputSchema>;

// Output schema for the image upscaling flow.
const ImageUpscalingOutputSchema = z.object({
  upscaledImageDataUri: z
    .string()
    .describe(
      "The upscaled image, as a data URI that includes a MIME type and uses Base64 encoding. Format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type ImageUpscalingOutput = z.infer<typeof ImageUpscalingOutputSchema>;

// Wrapper function to call the Genkit flow.
export async function upscaleImage(
  input: ImageUpscalingInput
): Promise<ImageUpscalingOutput> {
  return imageUpscalingFlow(input);
}

// Define the Genkit flow for image upscaling.
const imageUpscalingFlow = ai.defineFlow(
  {
    name: 'imageUpscalingFlow',
    inputSchema: ImageUpscalingInputSchema,
    outputSchema: ImageUpscalingOutputSchema,
  },
  async (input) => {
    // Extract MIME type from the data URI for the media part.
    const mimeTypeMatch = input.imageDataUri.match(/^data:(.*?);base64,/);
    if (!mimeTypeMatch || !mimeTypeMatch[1]) {
      throw new Error('Invalid image data URI: MIME type not found.');
    }
    const contentType = mimeTypeMatch[1];

    const {media} = await ai.generate({
      model: 'googleai/gemini-2.5-flash-image', // Using image-capable Gemini model
      prompt: [
        {
          media: {
            contentType: contentType,
            url: input.imageDataUri,
          },
        },
        {text: 'upscale this image to a higher resolution while maintaining quality'},
      ],
      config: {
        responseModalities: ['TEXT', 'IMAGE'], // Must specify both for image output
      },
    });

    if (!media || !media.url) {
      throw new Error('Image upscaling failed: No image data returned.');
    }

    return {
      upscaledImageDataUri: media.url,
    };
  }
);
