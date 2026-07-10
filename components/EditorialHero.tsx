"use client";

import React from "react";
import { Clock } from "lucide-react";

type EditorialHeroProps = {
  articleId?: string;
  title: string;
  category: string;
  metadataStr?: string | null;
  readingTime?: number;
  updatedAt?: number;
  author?: string;
  contentType?: string;
};

type FieldConfig = {
  label: string;
  key: string;
};

type CategoryConfig = {
  themeName: string;
  folder: string;
  bg: string;
  badgeColor: string;
  glow: string;
  fields: FieldConfig[];
};

const CATEGORY_MAP: Record<string, CategoryConfig> = {
  "AI News": {
    themeName: "AI News",
    folder: "ai",
    bg: "bg-gradient-to-br from-card to-muted/10",
    badgeColor: "bg-purple-100 text-purple-700 dark:bg-purple-900/60 dark:text-purple-300",
    glow: "from-purple-500/10 dark:from-purple-400/10",
    fields: [
      { label: "AI Model", key: "model" },
      { label: "Release Date", key: "release_date" },
      { label: "Impact Level", key: "impact" },
      { label: "Official Source", key: "source" }
    ]
  },
  "AI Tools": {
    themeName: "AI Tools",
    folder: "ai",
    bg: "bg-gradient-to-br from-card to-muted/10",
    badgeColor: "bg-violet-100 text-violet-700 dark:bg-violet-900/60 dark:text-violet-300",
    glow: "from-violet-500/10 dark:from-violet-400/10",
    fields: [
      { label: "Best For Coding", key: "best_for_coding" },
      { label: "Best For Speed", key: "best_for_speed" },
      { label: "Best For Reasoning", key: "best_for_reasoning" },
      { label: "Target Audience", key: "who_should_read" }
    ]
  },
  "Automation": {
    themeName: "Automation",
    folder: "skills",
    bg: "bg-gradient-to-br from-card to-muted/10",
    badgeColor: "bg-teal-100 text-teal-700 dark:bg-teal-900/60 dark:text-teal-300",
    glow: "from-teal-500/10 dark:from-teal-400/10",
    fields: [
      { label: "Automation Tool", key: "tool" },
      { label: "Primary Use Case", key: "use_case" },
      { label: "Time Saved", key: "time_saved" },
      { label: "Skill Level", key: "skill_level" }
    ]
  },
  "CRM": {
    themeName: "CRM Systems",
    folder: "opportunities",
    bg: "bg-gradient-to-br from-card to-muted/10",
    badgeColor: "bg-orange-100 text-orange-700 dark:bg-orange-900/60 dark:text-orange-300",
    glow: "from-orange-500/10 dark:from-orange-400/10",
    fields: [
      { label: "CRM Platform", key: "platform" },
      { label: "Best For", key: "best_for" },
      { label: "Pricing Model", key: "pricing" },
      { label: "Integrations", key: "integration" }
    ]
  },
  "Business Growth": {
    themeName: "Business Growth",
    folder: "opportunities",
    bg: "bg-gradient-to-br from-card to-muted/10",
    badgeColor: "bg-amber-100 text-amber-700 dark:bg-amber-900/60 dark:text-amber-300",
    glow: "from-orange-500/10 dark:from-orange-400/10",
    fields: [
      { label: "Key Strategy", key: "strategy" },
      { label: "Growth Rate", key: "growth_rate" },
      { label: "Target Market", key: "target_market" },
      { label: "Expected ROI", key: "roi" }
    ]
  },
  "Career": {
    themeName: "Career Insights",
    folder: "career",
    bg: "bg-gradient-to-br from-card to-muted/10",
    badgeColor: "bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300",
    glow: "from-blue-500/10 dark:from-blue-400/10",
    fields: [
      { label: "Starting Salary", key: "average_fresher_salary" },
      { label: "Top Industries", key: "top_paying_industries" },
      { label: "Growth Rate", key: "growth_rate" },
      { label: "Prerequisites", key: "who_should_read" }
    ]
  },
  "Industry Insights": {
    themeName: "Industry Insights",
    folder: "research",
    bg: "bg-gradient-to-br from-card to-muted/10",
    badgeColor: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300",
    glow: "from-blue-500/10 dark:from-blue-400/10",
    fields: [
      { label: "Industry Sector", key: "sector" },
      { label: "Emerging Trend", key: "trend" },
      { label: "Opportunity", key: "opportunity" },
      { label: "Key Risk", key: "risk" }
    ]
  },
  "Technology": {
    themeName: "Technology",
    folder: "ai",
    bg: "bg-gradient-to-br from-card to-muted/10",
    badgeColor: "bg-purple-100 text-purple-700 dark:bg-purple-900/60 dark:text-purple-300",
    glow: "from-purple-500/10 dark:from-purple-400/10",
    fields: [
      { label: "Technology", key: "technology" },
      { label: "Maturity Level", key: "maturity" },
      { label: "Use Cases", key: "use_cases" },
      { label: "Adoption Rate", key: "adoption" }
    ]
  },
  "Education": {
    themeName: "Education",
    folder: "learning",
    bg: "bg-gradient-to-br from-card to-muted/10",
    badgeColor: "bg-green-100 text-green-700 dark:bg-green-900/60 dark:text-green-300",
    glow: "from-green-500/10 dark:from-green-400/10",
    fields: [
      { label: "Course Duration", key: "duration" },
      { label: "Prerequisites", key: "prerequisites" },
      { label: "Learning Outcome", key: "outcome" },
      { label: "Skill Level", key: "skill_level" }
    ]
  },
  "Marketing": {
    themeName: "Marketing",
    folder: "placements",
    bg: "bg-gradient-to-br from-card to-muted/10",
    badgeColor: "bg-rose-100 text-rose-700 dark:bg-rose-900/60 dark:text-rose-300",
    glow: "from-orange-500/10 dark:from-orange-400/10",
    fields: [
      { label: "Marketing Channel", key: "channel" },
      { label: "Customer Acq. Cost", key: "cac" },
      { label: "Conversion Rate", key: "conversion_rate" },
      { label: "Target Audience", key: "target" }
    ]
  },
  "Productivity": {
    themeName: "Productivity",
    folder: "productivity",
    bg: "bg-gradient-to-br from-card to-muted/10",
    badgeColor: "bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
    glow: "from-slate-500/10 dark:from-slate-400/10",
    fields: [
      { label: "Productivity Tool", key: "tool" },
      { label: "Time Saved", key: "time_saved" },
      { label: "Best For", key: "best_for" },
      { label: "Pricing Model", key: "pricing" }
    ]
  }
};

const DEFAULT_CONFIG: CategoryConfig = {
  themeName: "Briefing",
  folder: "ai",
  bg: "bg-gradient-to-br from-card to-muted/10",
  badgeColor: "bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
  glow: "from-primary/10",
  fields: [
    { label: "Status", key: "status" },
    { label: "Impact", key: "impact" }
  ]
};

// Folders with multiple variations (01, 02, 03)
const MULTI_VARIATION_FOLDERS = [
  "ai", "skills", "opportunities", "career", "research",
  "learning", "placements", "productivity", "education"
];

function getIllustrationVariation(title: string, folder: string): string {
  if (!MULTI_VARIATION_FOLDERS.includes(folder)) {
    return "01";
  }
  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    hash = title.charCodeAt(i) + ((hash << 5) - hash);
  }
  const variation = (Math.abs(hash) % 3) + 1;
  return `0${variation}`;
}

export function EditorialHero({
  articleId,
  title,
  category,
  metadataStr,
  readingTime = 5,
  updatedAt,
  author = "TheAskt Editorial",
  contentType = "news"
}: EditorialHeroProps) {
  let metadata: Record<string, string> = {};
  try {
    if (metadataStr) metadata = JSON.parse(metadataStr);
  } catch {}

  const config = CATEGORY_MAP[category] || DEFAULT_CONFIG;

  const updatedString = updatedAt
    ? new Date(updatedAt).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })
    : "Recently";

  let smartFolder: string | undefined = undefined;
  if (metadataStr) {
    try {
      const parsed = JSON.parse(metadataStr);
      if (parsed.illustration_tag) {
        smartFolder = parsed.illustration_tag.toLowerCase().trim();
      }
    } catch {}
  }

  const folder = smartFolder || config.folder;
  const variation = getIllustrationVariation(title, folder);
  const illustrationSrc = `/illustrations/${folder}/${folder}-${variation}.svg`;

  return (
    <div className="w-full mb-10">
      <div className={`relative w-full rounded-2xl overflow-hidden border border-border ${config.bg}`}>
        <div className="absolute inset-0 opacity-[0.07] bg-[radial-gradient(currentColor_1px,transparent_1px)] [background-size:20px_20px] text-foreground pointer-events-none" />
        
        {/* Subtle Category-colored Ambient Glow */}
        <div className={`absolute -top-12 -right-12 w-64 h-64 rounded-full bg-gradient-to-br ${config.glow} to-transparent blur-3xl pointer-events-none animate-pulse`} />
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-6 px-8 md:px-12 py-10 md:py-14">
          
          <div className="flex-1 flex flex-col gap-4 max-w-2xl">
            <span className={`self-start text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${config.badgeColor}`}>
              {config.themeName}
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground leading-[1.15] tracking-tight">
              {title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">{author}</span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {readingTime} min read
              </span>
              <span>·</span>
              <span>Updated {updatedString}</span>
            </div>
          </div>

          <div className="hidden md:flex items-center justify-center relative w-60 h-48 flex-shrink-0">
            <img 
              src={illustrationSrc}
              alt={title}
              className="w-full h-full object-contain max-h-[170px]"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                if (!target.getAttribute("data-fallback")) {
                  target.setAttribute("data-fallback", "true");
                  target.src = "/illustrations/ai/ai-01.svg";
                }
              }}
            />
          </div>

        </div>
      </div>

      {config.fields.some(f => metadata[f.key]) && (
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
          {config.fields.slice(0, 4).map((field, idx) => {
            const val = metadata[field.key];
            if (!val) return null;
            return (
              <div key={idx} className="bg-card border border-border rounded-xl px-4 py-3 flex flex-col gap-1">
                <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">{field.label}</span>
                <span className="text-sm font-semibold text-foreground leading-snug">{val}</span>
              </div>
            );
          })}
        </div>
      )}

      {(metadata.who_should_read || metadata.who_should_skip) && (
        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
          {metadata.who_should_read && (
            <div className="flex gap-2.5 items-start bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 rounded-xl px-4 py-3">
              <span className="text-emerald-600 font-bold text-sm mt-0.5">✓</span>
              <p className="text-sm text-foreground leading-snug">
                <strong className="text-emerald-700 dark:text-emerald-400 font-semibold">Read if:</strong> {metadata.who_should_read}
              </p>
            </div>
          )}
          {metadata.who_should_skip && (
            <div className="flex gap-2.5 items-start bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/40 rounded-xl px-4 py-3">
              <span className="text-rose-500 font-bold text-sm mt-0.5">✗</span>
              <p className="text-sm text-foreground leading-snug">
                <strong className="text-rose-600 dark:text-rose-400 font-semibold">Skip if:</strong> {metadata.who_should_skip}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
