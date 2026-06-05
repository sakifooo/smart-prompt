import { config } from 'dotenv';
config();

import '@/ai/flows/image-upscaling-flow.ts';
import '@/ai/flows/image-background-removal-flow.ts';
import '@/ai/flows/smart-prompt-engineering-flow.ts';
import '@/ai/flows/text-to-image-generation-flow.ts';