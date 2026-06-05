"use client"

import React, { useState } from 'react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Grid, List, Download, Trash2, ExternalLink, MoreVertical } from 'lucide-react';
import Image from 'next/image';

export function AssetLibrary() {
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredAssets = PlaceHolderImages.filter(img => 
    img.description.toLowerCase().includes(search.toLowerCase()) ||
    img.imageHint.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Creative Library</h1>
          <p className="text-muted-foreground text-sm">Your persistent history of generations and edits.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search assets..." 
              className="pl-10 bg-muted/20 border-border/50"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex border rounded-lg overflow-hidden">
            <Button 
              variant={viewMode === 'grid' ? 'secondary' : 'ghost'} 
              size="icon" 
              className="rounded-none h-10 w-10"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button 
              variant={viewMode === 'list' ? 'secondary' : 'ghost'} 
              size="icon" 
              className="rounded-none h-10 w-10"
              onClick={() => setViewMode('list')}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAssets.map((asset) => (
            <Card key={asset.id} className="group glass-card overflow-hidden hover:border-primary/40 transition-all duration-300">
              <div className="aspect-[4/3] relative overflow-hidden">
                <Image 
                  src={asset.imageUrl} 
                  alt={asset.description} 
                  fill 
                  className="object-cover transition-transform group-hover:scale-105 duration-500" 
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Button size="icon" variant="secondary" className="h-9 w-9 rounded-full">
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="secondary" className="h-9 w-9 rounded-full">
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="destructive" className="h-9 w-9 rounded-full">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <CardContent className="p-4 space-y-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-medium text-sm line-clamp-1">{asset.description}</p>
                  <MoreVertical className="w-4 h-4 text-muted-foreground shrink-0 cursor-pointer" />
                </div>
                <div className="flex items-center gap-2 text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">
                  <span className="px-1.5 py-0.5 rounded bg-muted">1024x1024</span>
                  <span>•</span>
                  <span>PNG</span>
                  <span>•</span>
                  <span>2 days ago</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="glass-card">
          <div className="divide-y divide-border/50">
            {filteredAssets.map((asset) => (
              <div key={asset.id} className="p-4 flex items-center gap-4 hover:bg-muted/10 transition-colors">
                <div className="w-16 h-16 relative rounded-lg overflow-hidden shrink-0 border">
                  <Image src={asset.imageUrl} alt={asset.description} fill className="object-cover" />
                </div>
                <div className="flex-1 space-y-1">
                  <h4 className="font-medium text-sm">{asset.description}</h4>
                  <p className="text-xs text-muted-foreground italic line-clamp-1">"{asset.imageHint}"</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon"><Download className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="icon"><ExternalLink className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="icon" className="text-destructive"><Trash2 className="w-4 h-4" /></Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {filteredAssets.length === 0 && (
        <div className="py-20 text-center space-y-4 opacity-40">
          <div className="p-6 rounded-full bg-muted w-20 h-20 mx-auto flex items-center justify-center">
            <Search className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="font-semibold text-lg">No assets found</h3>
            <p className="text-sm">Try adjusting your search filters.</p>
          </div>
        </div>
      )}
    </div>
  );
}
