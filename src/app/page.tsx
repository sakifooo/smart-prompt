"use client"
import React, { useState, useEffect } from 'react';
import { PromptStudio } from '@/components/studio/PromptStudio';
import { Toaster } from '@/components/ui/toaster';

export default function HomePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-white relative overflow-x-hidden selection:bg-primary/20">
      {/* Hidden SEO Content - Optimized for search engines */}
      <div 
        className="absolute opacity-0 pointer-events-none overflow-hidden h-0 w-0" 
        aria-hidden="true"
        style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}
      >
        Best AI prompt generator 2026 - Free online prompt studio for ChatGPT, Claude, Gemini, Midjourney, and Stable Diffusion. 
        Create advanced AI prompts, image generation prompts, text to image prompts, AI art prompts, and professional prompt templates. 
        Prompt engineering tool, prompt optimizer, prompt library, and creative writing prompts. 
        Ourspase prompt builder helps you generate better AI responses for marketing, business, coding, and content creation.
      </div>

      <main className="relative z-10 flex items-start justify-center min-h-screen p-4 md:p-12">
        <PromptStudio />
      </main>
      <Toaster />
    </div>
  );
}
