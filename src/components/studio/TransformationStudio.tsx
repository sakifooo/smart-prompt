"use client"

import React, { useState } from 'react';
import { upscaleImage } from '@/ai/flows/image-upscaling-flow';
import { imageBackgroundRemoval } from '@/ai/flows/image-background-removal-flow';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Layers, 
  Upload, 
  Trash2, 
  Maximize, 
  Eraser, 
  Loader2, 
  ArrowRight,
  Sparkles,
  Download
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';

export function TransformationStudio() {
  const [sourceImage, setSourceImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTool, setActiveTool] = useState<'upscale' | 'background' | null>(null);
  const { toast } = useToast();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSourceImage(reader.result as string);
        setProcessedImage(null);
        setActiveTool(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpscale = async () => {
    if (!sourceImage) return;
    setLoading(true);
    setActiveTool('upscale');
    try {
      const output = await upscaleImage({ imageDataUri: sourceImage });
      setProcessedImage(output.upscaledImageDataUri);
    } catch (error) {
      toast({ title: "Upscale failed", description: "Unable to enhance image resolution." });
    } finally {
      setLoading(false);
    }
  };

  const handleBackgroundRemoval = async () => {
    if (!sourceImage) return;
    setLoading(true);
    setActiveTool('background');
    try {
      const output = await imageBackgroundRemoval({ photoDataUri: sourceImage });
      setProcessedImage(output.processedImageDataUri);
    } catch (error) {
      toast({ title: "Process failed", description: "Unable to isolate subject." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">AI Transformation Suite</h1>
        <p className="text-muted-foreground">Advanced image processing utilities at your fingertips.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[calc(100vh-260px)]">
        {/* Toolbox */}
        <div className="lg:col-span-3 space-y-4">
          <Card className="glass-card">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-xs uppercase text-muted-foreground font-bold">Utilities</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 space-y-3">
              <Button 
                variant={activeTool === 'upscale' ? 'default' : 'outline'}
                className="w-full justify-start gap-3 h-12"
                onClick={handleUpscale}
                disabled={!sourceImage || loading}
              >
                <Maximize className="w-4 h-4" />
                Upscale 4x
              </Button>
              <Button 
                variant={activeTool === 'background' ? 'default' : 'outline'}
                className="w-full justify-start gap-3 h-12"
                onClick={handleBackgroundRemoval}
                disabled={!sourceImage || loading}
              >
                <Eraser className="w-4 h-4" />
                Remove BG
              </Button>
              <div className="pt-4 space-y-2">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10"
                  onClick={() => {
                    setSourceImage(null);
                    setProcessedImage(null);
                    setActiveTool(null);
                  }}
                >
                  <Trash2 className="w-4 h-4" />
                  Clear Studio
                </Button>
              </div>
            </CardContent>
          </Card>

          {processedImage && (
            <Card className="glass-card border-primary/20 purple-glow animate-fade-in">
              <CardContent className="p-4 space-y-4 text-center">
                <Sparkles className="w-8 h-8 text-primary mx-auto" />
                <div className="space-y-1">
                  <h3 className="font-bold">Transformation Ready</h3>
                  <p className="text-xs text-muted-foreground">Asset processed with 99.8% precision.</p>
                </div>
                <Button className="w-full gap-2">
                  <Download className="w-4 h-4" />
                  Download Result
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Main Canvas */}
        <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Source Panel */}
          <Card className="glass-card flex flex-col relative overflow-hidden border-dashed">
            <CardHeader className="border-b bg-muted/10 p-3 flex-row justify-between items-center">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Source Asset</span>
              <label className="cursor-pointer">
                <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
                <div className="flex items-center gap-1 text-primary hover:underline text-xs font-medium">
                  <Upload className="w-3 h-3" /> Update
                </div>
              </label>
            </CardHeader>
            <CardContent className="flex-1 flex items-center justify-center p-0 relative min-h-[300px]">
              {!sourceImage ? (
                <div className="text-center space-y-4 p-8">
                  <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center mx-auto border-2 border-dashed border-primary/20">
                    <Upload className="w-6 h-6 text-primary/40" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Click to upload or drag & drop</p>
                    <p className="text-xs text-muted-foreground">SVG, PNG, JPG or GIF (max. 10MB)</p>
                  </div>
                  <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" onChange={handleFileUpload} />
                </div>
              ) : (
                <Image src={sourceImage} alt="Source" fill className="object-contain p-4" />
              )}
            </CardContent>
          </Card>

          {/* Processed Panel */}
          <Card className="glass-card flex flex-col relative overflow-hidden border-primary/10">
             <CardHeader className="border-b bg-muted/10 p-3">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">Resulting Vision</span>
            </CardHeader>
            <CardContent className="flex-1 flex items-center justify-center p-0 relative min-h-[300px]">
              {!processedImage && !loading ? (
                <div className="text-center space-y-4 opacity-20">
                   <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                  <p className="text-xs font-medium">Select a tool to begin processing</p>
                </div>
              ) : loading ? (
                <div className="flex flex-col items-center gap-4">
                  <Loader2 className="w-10 h-10 animate-spin text-primary" />
                  <span className="text-sm font-code animate-pulse tracking-tighter uppercase">Processing Vectors...</span>
                </div>
              ) : (
                <Image src={processedImage!} alt="Processed result" fill className="object-contain p-4" />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
