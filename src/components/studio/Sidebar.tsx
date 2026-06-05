"use client"

import React from 'react';
import { 
  Wand2, 
  Image as ImageIcon, 
  Layers, 
  Library, 
  Settings, 
  ChevronLeft,
  ChevronRight,
  Zap,
  LayoutGrid
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export type ViewType = 'prompt' | 'generate' | 'suite' | 'library' | 'settings';

interface SidebarProps {
  activeView: ViewType;
  setActiveView: (view: ViewType) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export function StudioSidebar({ activeView, setActiveView, collapsed, setCollapsed }: SidebarProps) {
  const navItems = [
    { id: 'prompt', label: 'Smart Prompt', icon: Wand2 },
    { id: 'generate', label: 'Gen Studio', icon: ImageIcon },
    { id: 'suite', label: 'Trans Suite', icon: Layers },
    { id: 'library', label: 'Asset Library', icon: Library },
  ] as const;

  return (
    <aside className={cn(
      "h-screen flex flex-col border-r bg-sidebar transition-all duration-300 ease-in-out relative z-40",
      collapsed ? "w-20" : "w-64"
    )}>
      <div className="p-4 flex items-center gap-3">
        <div className="bg-primary p-2 rounded-xl purple-glow shrink-0">
          <Zap className="w-5 h-5 text-primary-foreground" />
        </div>
        {!collapsed && (
          <span className="font-bold text-lg tracking-tight text-gradient">
            Promptify AI
          </span>
        )}
      </div>

      <div className="flex-1 px-3 py-6 space-y-2 overflow-y-auto">
        {navItems.map((item) => (
          <Button
            key={item.id}
            variant={activeView === item.id ? "secondary" : "ghost"}
            className={cn(
              "w-full justify-start gap-3 h-12 transition-all",
              activeView === item.id ? "bg-primary/10 text-primary hover:bg-primary/20" : "hover:bg-muted"
            )}
            onClick={() => setActiveView(item.id)}
          >
            <item.icon className="w-5 h-5" />
            {!collapsed && <span className="font-medium">{item.label}</span>}
          </Button>
        ))}
      </div>

      <div className="p-4 mt-auto">
        <Separator className="mb-4 opacity-50" />
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 h-12 mb-2"
          onClick={() => setActiveView('settings')}
        >
          <Settings className="w-5 h-5" />
          {!collapsed && <span className="font-medium text-muted-foreground">Settings</span>}
        </Button>
        
        <Button
          variant="outline"
          size="icon"
          className="absolute -right-3 top-20 bg-background border shadow-xl rounded-full h-6 w-6 z-50 hover:bg-muted"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
        </Button>
      </div>
    </aside>
  );
}
