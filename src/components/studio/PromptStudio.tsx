"use client"

import React, { useState } from 'react';
import { smartPromptEngineering } from '@/ai/flows/smart-prompt-engineering-flow';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Brain, Copy, Check, Loader2, Sparkles, Image as ImageIcon, Video, FileText, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function PromptStudio() {
  const [idea, setIdea] = useState('');
  const [modelType, setModelType] = useState<'image-generation' | 'video-generation' | 'text-generation'>('image-generation');
  const [mood, setMood] = useState('Cinematic');
  const [style, setStyle] = useState('Photorealistic');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleEngineer = async () => {
    if (!idea.trim()) {
      toast({ title: "Idea required", description: "Please enter a basic concept first." });
      return;
    }
    setLoading(true);
    try {
      const output = await smartPromptEngineering({
        idea,
        modelType,
        mood,
        style,
      });
      setResult(output.optimizedPrompt);
    } catch (error) {
      toast({ title: "Error", description: "Failed to optimize prompt." });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const seoWords = [
    "ai prompt generator", "prompt generator", "chatgpt prompt generator", "free ai prompt generator",
    "ai prompt tool", "prompt engineering tool", "best ai prompt generator", "prompt maker",
    "ai prompt builder", "free chatgpt prompt generator", "ai prompt generator for chatgpt",
    "best prompts for chatgpt", "midjourney prompt generator", "stable diffusion prompt generator",
    "claude prompt generator", "gemini prompt generator", "prompt generator online free",
    "ai image prompt generator", "advanced ai prompt generator", "prompt optimizer tool",
    "custom ai prompt generator", "seo prompt generator", "ai prompts for seo", "prompt library",
    "chatgpt prompts library", "best chatgpt prompts", "ai writing prompt generator",
    "creative writing prompt generator", "marketing prompt generator", "business prompt generator",
    "coding prompt generator", "image prompt generator ai", "video prompt generator",
    "roleplay prompt generator", "best ai prompt tool 2026", "free unlimited prompt generator",
    "promptbase alternative", "aiprm alternative", "prompt marketplace", "sell ai prompts",
    "buy chatgpt prompts", "prompt engineering course", "learn prompt engineering",
    "prompt templates", "how to write better ai prompts", "ai prompt examples",
    "best prompts for midjourney", "chatgpt prompt tips", "how does ai prompt generator work",
    "prompt engineering guide", "free prompt library", "ai prompt ideas", "ai prompt generator review",
    "top 10 ai prompt tools", "how to use prompt generator", "prompt generator vs manual prompting",
    "improve ai responses with better prompts", "chain of thought prompting tool",
    "few shot prompt generator", "zero shot prompt generator", "structured output prompt tool",
    "json prompt generator", "system prompt builder"
  ];

  return (
    <div className="min-h-screen bg-white font-body selection:bg-sky-100">
      {/* Hidden SEO Keywords */}
      <div className="sr-only" aria-hidden="true">
        {seoWords.join(', ')}
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-50/95 backdrop-blur border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-sky-500">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-semibold tracking-tighter text-slate-800 italic" style={{ fontFamily: '"Inter", cursive' }}>
              Smart Prompt
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('how-it-works')} className="text-sm font-medium text-slate-600 hover:text-sky-600 transition-colors">How it works</button>
            <button onClick={() => scrollToSection('why-smart-prompt')} className="text-sm font-medium text-slate-600 hover:text-sky-600 transition-colors">Why use Smart Prompt?</button>
            <button onClick={() => scrollToSection('why-writers')} className="text-sm font-medium text-slate-600 hover:text-sky-600 transition-colors">Why writers love us</button>
          </nav>

          <Button variant="ghost" size="icon" className="hidden sm:flex text-slate-400 hover:text-sky-500 transition-colors">
            <Send className="w-5 h-5 fill-current rotate-[-20deg] translate-x-[-1px] translate-y-[1px]" />
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <div className="max-w-4xl mx-auto space-y-8 py-20 px-4 animate-fade-in">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-6xl font-extrabold tracking-tight text-slate-900">
            Smart Prompt Engineer <span className="text-sky-500">free</span>
          </h1>
          <p className="text-slate-500 text-xl max-w-2xl mx-auto">
            The professional AI prompt builder optimized for text, images, and videos.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          <Card className="raised-card border-none bg-white">
            <CardContent className="p-8 space-y-6">
              <div className="space-y-3">
                <label className="text-sm font-semibold flex items-center gap-2 text-slate-700 uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-sky-500" />
                  Your Vision
                </label>
                <Textarea 
                  placeholder="Enter a simple idea (e.g., A futuristic cafe in Tokyo...)"
                  className="min-h-[160px] bg-white text-lg resize-none raised-input border-slate-200 focus-visible:ring-sky-400/40 rounded-xl"
                  value={idea}
                  onChange={(e) => setIdea(e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-xs text-slate-400 uppercase font-bold tracking-wider">Output Type</label>
                  <div className="grid grid-cols-3 gap-2">
                    <Button
                      variant={modelType === 'text-generation' ? 'default' : 'outline'}
                      className={`h-12 flex-col gap-1 p-0 border-slate-200 text-slate-600 hover:bg-slate-50 ${modelType === 'text-generation' ? 'bg-sky-500 text-white hover:bg-sky-600' : 'bg-slate-50'}`}
                      onClick={() => setModelType('text-generation')}
                    >
                      <FileText className="w-4 h-4" />
                      <span className="text-[10px]">Text</span>
                    </Button>
                    <Button
                      variant={modelType === 'image-generation' ? 'default' : 'outline'}
                      className={`h-12 flex-col gap-1 p-0 border-slate-200 text-slate-600 hover:bg-slate-50 ${modelType === 'image-generation' ? 'bg-sky-500 text-white hover:bg-sky-600' : 'bg-slate-50'}`}
                      onClick={() => setModelType('image-generation')}
                    >
                      <ImageIcon className="w-4 h-4" />
                      <span className="text-[10px]">Image</span>
                    </Button>
                    <Button
                      variant={modelType === 'video-generation' ? 'default' : 'outline'}
                      className={`h-12 flex-col gap-1 p-0 border-slate-200 text-slate-600 hover:bg-slate-50 ${modelType === 'video-generation' ? 'bg-sky-500 text-white hover:bg-sky-600' : 'bg-slate-50'}`}
                      onClick={() => setModelType('video-generation')}
                    >
                      <Video className="w-4 h-4" />
                      <span className="text-[10px]">Video</span>
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs text-slate-400 uppercase font-bold tracking-wider">Mood</label>
                  <Select value={mood} onValueChange={setMood}>
                    <SelectTrigger className="bg-slate-50 border-slate-200 h-12 rounded-xl text-slate-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Cinematic">Cinematic</SelectItem>
                      <SelectItem value="Professional">Professional</SelectItem>
                      <SelectItem value="Vibrant">Vibrant</SelectItem>
                      <SelectItem value="Minimalist">Minimalist</SelectItem>
                      <SelectItem value="Creative">Creative</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-slate-400 uppercase font-bold tracking-wider">Style</label>
                  <Select value={style} onValueChange={setStyle}>
                    <SelectTrigger className="bg-slate-50 border-slate-200 h-12 rounded-xl text-slate-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Photorealistic">Photorealistic</SelectItem>
                      <SelectItem value="Modern">Modern</SelectItem>
                      <SelectItem value="Artistic">Artistic</SelectItem>
                      <SelectItem value="Cyberpunk">Cyberpunk</SelectItem>
                      <SelectItem value="Academic">Academic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button 
                className="w-full h-14 gap-3 text-xl font-bold rounded-xl transition-all hover:scale-[1.01] bg-sky-500 hover:bg-sky-600 shadow-lg shadow-sky-500/20 text-white" 
                disabled={loading}
                onClick={handleEngineer}
              >
                {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Sparkles className="w-6 h-6" />}
                Generate Optimized Prompt
              </Button>
            </CardContent>
          </Card>

          {result || loading ? (
            <Card className="raised-card overflow-hidden border-none animate-fade-in bg-slate-50/50">
              <CardHeader className="border-b border-slate-100 px-8 py-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-sky-500" />
                    Optimized Result
                  </CardTitle>
                  {result && (
                    <Button variant="outline" size="sm" onClick={copyToClipboard} className="h-9 gap-2 bg-white border-slate-200 text-slate-600">
                      {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                      {copied ? 'Copied' : 'Copy Prompt'}
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-8">
                {loading ? (
                  <div className="h-[200px] flex flex-col items-center justify-center gap-4">
                    <Loader2 className="w-12 h-12 animate-spin text-sky-500 opacity-50" />
                    <span className="text-sm font-medium animate-pulse text-slate-400 tracking-widest uppercase">Analyzing Intent...</span>
                  </div>
                ) : (
                  <div className="text-slate-800 text-lg leading-relaxed whitespace-pre-wrap font-sans selection:bg-sky-200/50">
                    {result}
                  </div>
                )}
              </CardContent>
            </Card>
          ) : null}
        </div>
      </div>

      {/* Informational Sections */}
      <div className="bg-slate-50 py-24">
        <div className="max-w-5xl mx-auto px-4 space-y-32">
          
          {/* How it works */}
          <section id="how-it-works" className="space-y-12 text-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-slate-900">How it works</h2>
              <div className="w-12 h-1 bg-sky-500 mx-auto rounded-full" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Input Concept", desc: "Start with a simple sentence or a few keywords describing what you want to create.", icon: FileText },
                { title: "AI Analysis", desc: "Our advanced models analyze your intent, identifying key visual and structural elements.", icon: Brain },
                { title: "Prompt Expansion", desc: "We enrich your idea with technical terms, artistic styles, and cinematic descriptions.", icon: Sparkles }
              ].map((step, i) => (
                <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 space-y-4 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-sky-50 rounded-xl flex items-center justify-center mx-auto">
                    <step.icon className="w-6 h-6 text-sky-500" />
                  </div>
                  <h3 className="font-bold text-slate-800">{step.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Why use Smart Prompt? */}
          <section id="why-smart-prompt" className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-slate-900 leading-tight">Why use Smart Prompt?</h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                Most AI models require specific technical language to produce professional results. Smart Prompt bridges the gap between human creativity and machine understanding.
              </p>
              <ul className="space-y-4">
                {[
                  "Eliminate trial and error by getting it right the first time.",
                  "Unlock hidden features of Midjourney, DALL-E, and Sora.",
                  "Consistent results across different AI platforms.",
                  "Save thousands of dollars on prompt engineering courses."
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-700">
                    <Check className="w-5 h-5 text-green-500 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://picsum.photos/seed/studio/800/450" 
                alt="AI Studio" 
                className="object-cover w-full h-full"
                data-ai-hint="ai studio"
              />
              <div className="absolute inset-0 bg-sky-500/10" />
            </div>
          </section>

          {/* Why writers love us */}
          <section id="why-writers" className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-slate-900">Why writers love us</h2>
              <p className="text-slate-500 max-w-xl mx-auto italic">"The secret weapon for modern storytellers."</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { name: "Sarah J.", role: "Fantasy Author", text: "Smart Prompt helps me visualize my worlds before I even write a single chapter. The level of detail is unmatched." },
                { name: "David K.", role: "Screenwriter", text: "I use the video prompt engineer for storyboarding. It saves me days of explanation with my production team." },
                { name: "Michael R.", role: "Copywriter", text: "Turning a boring brief into a structured AI prompt has tripled my content production speed." },
                { name: "Elena V.", role: "Digital Artist", text: "I finally stopped fighting with the AI. Now it understands exactly what I want in terms of lighting and composition." }
              ].map((testimonial, i) => (
                <div key={i} className="bg-white p-8 rounded-2xl border border-slate-200 space-y-4">
                  <p className="text-slate-700 leading-relaxed">"{testimonial.text}"</p>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-slate-100" />
                    <div>
                      <p className="text-sm font-bold text-slate-900">{testimonial.name}</p>
                      <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 py-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 grayscale opacity-50">
            <Brain className="w-5 h-5" />
            <span className="text-sm font-semibold tracking-tight">Smart Prompt</span>
          </div>
          <p className="text-slate-400 text-sm">
            &copy; 2026 Smart Prompt. All rights reserved. Built for the future of AI.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-slate-400 hover:text-slate-600 transition-colors"><span className="sr-only">Twitter</span><svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg></a>
            <a href="#" className="text-slate-400 hover:text-slate-600 transition-colors"><span className="sr-only">GitHub</span><svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
