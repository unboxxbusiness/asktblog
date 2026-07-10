import React from "react";
import { Brain, Zap, TrendingUp, BookOpen, Cpu, BarChart2, Newspaper, Layers, Sparkles } from "lucide-react";

type DynamicEditorialBannerProps = {
  title: string;
  category: string;
  className?: string;
};

export function DynamicEditorialBanner({ title, category = "", className = "" }: DynamicEditorialBannerProps) {
  // Select configuration based on category keywords
  const categoryLower = (category || "").toLowerCase();

  let gradient = "from-slate-600 via-slate-700 to-slate-900";
  let themeLabel = "THEASKT EDITORIAL";
  let icon = <Sparkles className="h-4 w-4" />;

  // Default abstract card
  let abstractCard = (
    <div className="relative w-44 h-32 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 flex flex-col justify-between shadow-2xl">
      <div className="h-3 w-16 bg-white/20 rounded" />
      <div className="space-y-2">
        <div className="h-2 w-full bg-white/25 rounded" />
        <div className="h-2 w-5/6 bg-white/25 rounded" />
      </div>
      <div className="h-1.5 w-1/2 bg-white/20 rounded" />
    </div>
  );

  if (categoryLower.includes("ai news") || categoryLower.includes("ai tool") || categoryLower.includes("technology")) {
    gradient = "from-indigo-600 via-purple-700 to-violet-950";
    themeLabel = "AI INTELLIGENCE BRIEF";
    icon = <Brain className="h-4 w-4" />;
    abstractCard = (
      <div className="relative w-48 h-36 bg-slate-900/90 border border-white/15 rounded-xl p-3 flex flex-col justify-between shadow-2xl font-mono text-[9px] text-purple-300/90 transition-all duration-300 group-hover:scale-[1.03]">
        <div className="flex items-center justify-between border-b border-white/10 pb-1.5 mb-1">
          <div className="flex gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500/80" />
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500/80" />
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80" />
          </div>
          <span className="text-white/40 text-[7px]">ai_engine</span>
        </div>
        <div className="flex-1 space-y-1 text-left pt-1">
          <div><span className="text-pink-400">$</span> llm --model gpt-4o</div>
          <div className="text-emerald-400">&gt; context: loaded ✓</div>
          <div className="text-white/50">&gt; tokens: streaming...</div>
        </div>
        <div className="flex items-center gap-1.5 pt-1 border-t border-white/5 text-[7px] text-white/50">
          <span className="h-1.5 w-1.5 rounded-full bg-purple-400 animate-pulse" />
          <span>inference: active</span>
        </div>
      </div>
    );
  } else if (categoryLower.includes("automation")) {
    gradient = "from-teal-500 via-cyan-600 to-slate-950";
    themeLabel = "AUTOMATION WORKFLOW";
    icon = <Zap className="h-4 w-4" />;
    abstractCard = (
      <div className="relative w-48 h-34 bg-slate-900/90 border border-white/15 rounded-xl p-3 flex flex-col justify-between shadow-2xl font-mono text-[9px] text-cyan-300/90 transition-all duration-300 group-hover:scale-[1.03]">
        <div className="flex items-center justify-between border-b border-white/10 pb-1.5 mb-1">
          <span className="text-[8px] font-bold text-white tracking-widest uppercase">Workflow</span>
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
        </div>
        <div className="flex-1 space-y-1.5 pt-1">
          <div className="flex items-center gap-1.5">
            <div className="h-4 w-4 rounded bg-teal-500/40 flex items-center justify-center text-[6px] text-teal-200">1</div>
            <div className="h-1.5 flex-1 bg-white/20 rounded" />
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-4 w-4 rounded bg-teal-500/40 flex items-center justify-center text-[6px] text-teal-200">2</div>
            <div className="h-1.5 flex-1 bg-white/25 rounded" />
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-4 w-4 rounded bg-emerald-500/60 flex items-center justify-center text-[6px] text-white">✓</div>
            <div className="h-1.5 flex-1 bg-emerald-400/30 rounded" />
          </div>
        </div>
      </div>
    );
  } else if (categoryLower.includes("business growth") || categoryLower.includes("crm") || categoryLower.includes("marketing")) {
    gradient = "from-orange-500 via-amber-600 to-red-950";
    themeLabel = "BUSINESS GROWTH SIGNAL";
    icon = <TrendingUp className="h-4 w-4" />;
    abstractCard = (
      <div className="relative w-44 h-34 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 flex flex-col justify-between shadow-2xl transition-all duration-300 group-hover:scale-[1.03]">
        <div className="flex items-center justify-between">
          <span className="text-[9px] font-bold text-white uppercase tracking-wider">Growth KPIs</span>
          <span className="text-[7px] px-1.5 py-0.5 rounded bg-orange-500 text-white font-bold animate-pulse">+24% MoM</span>
        </div>
        <div className="flex items-end gap-2.5 h-14 my-2 justify-center">
          <div className="w-3.5 bg-white/20 rounded-t h-4" />
          <div className="w-3.5 bg-white/30 rounded-t h-7" />
          <div className="w-3.5 bg-white/40 rounded-t h-5" />
          <div className="w-3.5 bg-orange-400 rounded-t h-12" />
        </div>
        <div className="h-1.5 w-full bg-white/20 rounded" />
      </div>
    );
  } else if (categoryLower.includes("career") || categoryLower.includes("industry insights")) {
    gradient = "from-blue-500 via-sky-600 to-slate-950";
    themeLabel = "CAREER INTELLIGENCE";
    icon = <BarChart2 className="h-4 w-4" />;
    abstractCard = (
      <div className="relative w-44 h-34 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 flex flex-col justify-between shadow-2xl transition-all duration-300 group-hover:scale-[1.03]">
        <div className="flex items-center justify-between">
          <span className="text-[9px] font-bold text-white uppercase tracking-wider">Salary Trends</span>
          <span className="text-[7px] px-1.5 py-0.5 rounded bg-blue-500 text-white font-bold animate-pulse">High Demand</span>
        </div>
        <div className="flex items-end gap-2.5 h-12 my-2 justify-center">
          <div className="w-3.5 bg-white/20 rounded-t h-4" />
          <div className="w-3.5 bg-white/30 rounded-t h-8" />
          <div className="w-3.5 bg-white/40 rounded-t h-6" />
          <div className="w-3.5 bg-blue-400 rounded-t h-12" />
        </div>
        <div className="h-1.5 w-full bg-white/20 rounded" />
      </div>
    );
  } else if (categoryLower.includes("education")) {
    gradient = "from-emerald-500 via-green-600 to-teal-950";
    themeLabel = "LEARN AI";
    icon = <BookOpen className="h-4 w-4" />;
    abstractCard = (
      <div className="relative w-44 h-36 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 flex flex-col justify-between shadow-2xl transition-all duration-300 group-hover:scale-[1.03]">
        <div className="flex items-center gap-2">
          <div className="h-3.5 w-3.5 rounded-full bg-emerald-400" />
          <div className="h-2 w-20 bg-white/20 rounded" />
        </div>
        <div className="space-y-2 my-2">
          <div className="h-1.5 w-full bg-white/25 rounded" />
          <div className="h-1.5 w-11/12 bg-white/25 rounded" />
          <div className="h-1.5 w-2/3 bg-white/20 rounded" />
        </div>
        <div className="flex justify-between items-center pt-2 border-t border-white/10">
          <div className="px-2 py-1 bg-emerald-500/30 border border-emerald-400/20 rounded-full text-[7px] text-emerald-200 font-bold">
            Module Complete
          </div>
          <div className="h-3 w-8 bg-white/20 rounded" />
        </div>
      </div>
    );
  } else if (categoryLower.includes("productivity")) {
    gradient = "from-slate-500 via-slate-600 to-slate-900";
    themeLabel = "PRODUCTIVITY STACK";
    icon = <Layers className="h-4 w-4" />;
    abstractCard = (
      <div className="relative w-44 h-32 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 flex flex-col justify-between shadow-2xl transition-all duration-300 group-hover:scale-[1.03]">
        <div className="flex justify-between items-center">
          <div className="h-4 w-16 bg-white/20 rounded-full border border-white/10" />
          <div className="h-1.5 w-8 bg-white/20 rounded" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-sm bg-slate-400/60" />
            <div className="h-1.5 flex-1 bg-white/20 rounded" />
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-sm bg-emerald-400/60" />
            <div className="h-1.5 flex-1 bg-white/25 rounded" />
          </div>
        </div>
        <div className="h-1.5 w-1/2 bg-white/15 rounded" />
      </div>
    );
  } else if (categoryLower.includes("news")) {
    gradient = "from-rose-500 via-pink-600 to-slate-950";
    themeLabel = "LATEST AI NEWS";
    icon = <Newspaper className="h-4 w-4" />;
    abstractCard = (
      <div className="relative w-48 h-34 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-3.5 flex flex-col justify-between shadow-2xl transition-all duration-300 group-hover:scale-[1.03]">
        <div className="border-b border-white/10 pb-1.5 mb-1.5 flex justify-between items-center">
          <span className="text-[8px] font-bold text-white tracking-widest uppercase">Breaking</span>
          <span className="h-1.5 w-1.5 rounded-full bg-rose-500 animate-pulse" />
        </div>
        <div className="space-y-2">
          <div className="h-2 w-full bg-white/25 rounded" />
          <div className="h-2 w-11/12 bg-white/20 rounded" />
          <div className="h-2 w-5/6 bg-white/20 rounded" />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br ${gradient} overflow-hidden ${className}`}
    >
      {/* Dynamic inline styles for float animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(0.5deg); }
        }
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
      `}} />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      {/* Ambient glowing orb in background */}
      <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-white/5 blur-2xl pointer-events-none animate-pulse" />
      <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-black/10 blur-2xl pointer-events-none" />

      {/* Decorative Brand Watermark */}
      <div className="absolute bottom-4 right-4 text-[9px] font-extrabold tracking-widest text-white/10 select-none">
        THEASKT EDITORIAL
      </div>

      {/* Abstract Dynamic CSS Graphic container with float animation */}
      <div className="animate-float z-10 my-auto flex items-center justify-center">
        {abstractCard}
      </div>

      {/* Dynamic Badge row at the bottom */}
      <div className="z-10 mt-auto flex items-center gap-1.5 px-3 py-1 rounded-full border backdrop-blur-sm shadow-sm transition-all duration-300 hover:bg-white/5 text-[9px] font-extrabold uppercase tracking-widest select-none bg-black/10 border-white/10 text-white/80">
        {icon}
        <span>{themeLabel}</span>
      </div>
    </div>
  );
}
