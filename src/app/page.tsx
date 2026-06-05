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
      <main className="relative z-10 flex items-start justify-center min-h-screen p-4 md:p-12">
        <PromptStudio />
      </main>

      <Toaster />
    </div>
  );
}
