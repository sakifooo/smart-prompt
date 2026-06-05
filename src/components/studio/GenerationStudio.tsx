"use client"

import React, { useState } from 'react';
import { textToImageGeneration } from '@/ai/flows/text-to-image-generation-flow';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ImageIcon, Download, Share2, Loader2, Maximize2, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';

export function GenerationStudio() {
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState<'1:1' | '16:9' | '9:16' | '4:3'>('1:1');
  const [style, setStyle] = useState('Photorealistic');
  const [lighting, setLighting] = useState('Dramatic');
  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({ title: "Prompt empty", description: "Please enter a description for the image." });
      return;
    }
    setLoading(true);
    try {
      const output = await textToImageGeneration({
        textPrompt: prompt,
        aspectRatio,
        style,
        lighting,
      });
      setGeneratedImage(output.imageDataUri);
    } catch (error) {
      toast({ title: "Generation failed", description: "Please try a different prompt." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[calc(100vh-140px)] animate-fade-in">
      <div className="lg:col-span-4 flex flex-col gap-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Generation Studio</h1>
          <p className="text-muted-foreground text-sm">Craft high-quality visuals from text.</p>
        </div>

        <Card className="glass-card flex-1 flex flex-col">
          <CardContent className="p-6 space-y-6 flex flex-col h-full">
            <div className="space-y-2">
              <label className="text-xs text-muted-foreground uppercase font-bold flex items-center gap-1">
                <Zap className="w-3 h-3 text-primary" /> Prompt
              </label>
              <Textarea 
                placeholder="A mysterious traveler walking through a neon-lit cyber-forest..."
                className="min-h-[140px] bg-background/50 resize-none border-primary/20 focus-visible:ring-primary"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground uppercase font-bold">Aspect Ratio</label>
                <div className="grid grid-cols-4 gap-2">
                  {['1:1', '16:9', '9:16', '4:3'].map((ratio) => (
                    <Button
                      key={ratio}
                      variant={aspectRatio === ratio ? 'default' : 'outline'}
                      className="h-10 text-xs"
                      onClick={() => setAspectRatio(ratio as any)}
                    >
                      {ratio}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs text-muted-foreground uppercase font-bold">Style</label>
                <Select value={style} onValueChange={setStyle}>
                  <SelectTrigger className="bg-background/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Photorealistic">Photorealistic</SelectItem>
                    <SelectItem value="Cyberpunk">Cyberpunk</SelectItem>
                    <SelectItem value="Oil Painting">Oil Painting</SelectItem>
                    <SelectItem value="3D Render">3D Render</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-xs text-muted-foreground uppercase font-bold">Lighting</label>
                <Select value={lighting} onValueChange={setLighting}>
                  <SelectTrigger className="bg-background/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Dramatic">Dramatic</SelectItem>
                    <SelectItem value="Soft Ambient">Soft Ambient</SelectItem>
                    <SelectItem value="Golden Hour">Golden Hour</SelectItem>
                    <SelectItem value="Neon Glow">Neon Glow</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mt-auto">
              <Button 
                className="w-full h-14 gap-2 text-lg font-bold purple-glow rounded-xl"
                onClick={handleGenerate}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <ImageIcon className="w-5 h-5" />
                    Generate Image
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-8">
        <Card className="h-full glass-card relative flex flex-col overflow-hidden">
          {!generatedImage && !loading ? (
            <div className="flex-1 flex flex-col items-center justify-center p-12 text-center space-y-6 opacity-30">
              <div className="w-24 h-24 rounded-3xl bg-muted flex items-center justify-center border-2 border-dashed border-muted-foreground/30">
                <ImageIcon className="w-10 h-10" />
              </div>
              <div className="max-w-xs space-y-2">
                <h3 className="font-semibold text-lg">Canvas Empty</h3>
                <p className="text-sm">Generated artwork will appear here in real-time. Ready to create?</p>
              </div>
            </div>
          ) : loading ? (
            <div className="flex-1 flex flex-col items-center justify-center bg-black/40">
              <div className="relative">
                <div className="w-32 h-32 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
                <Zap className="absolute inset-0 m-auto w-8 h-8 text-primary animate-pulse" />
              </div>
              <p className="mt-8 text-lg font-medium animate-pulse tracking-widest uppercase text-primary/80">Dreaming of Pixels...</p>
            </div>
          ) : (
            <div className="flex-1 relative group animate-fade-in">
              <Image 
                src={generatedImage!} 
                alt="Generated asset"
                fill
                className="object-contain p-4"
                priority
              />
              <div className="absolute top-6 right-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button size="icon" variant="secondary" className="glass h-10 w-10">
                  <Download className="w-4 h-4" />
                </Button>
                <Button size="icon" variant="secondary" className="glass h-10 w-10">
                  <Share2 className="w-4 h-4" />
                </Button>
                <Button size="icon" variant="secondary" className="glass h-10 w-10">
                  <Maximize2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
          
          <div className="h-16 border-t bg-muted/20 px-6 flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex gap-4">
              <span>Model: Gemini Flash 2.5</span>
              <span>•</span>
              <span>Speed: 4.2s</span>
            </div>
            <div className="flex gap-4">
              <span>Resolution: 1024x1024</span>
              <span>•</span>
              <span>Format: WEBP</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
