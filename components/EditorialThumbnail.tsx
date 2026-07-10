"use client";

import React from "react";

type EditorialThumbnailProps = {
  title: string;
  category: string;
  metadataStr?: string | null;
  className?: string;
};

// Map of TheAskt category names to their respective illustration folder names
const CATEGORY_FOLDER_MAP: Record<string, string> = {
  "AI News": "ai",
  "AI Tools": "ai",
  "Automation": "skills",
  "CRM": "opportunities",
  "Business Growth": "opportunities",
  "Career": "career",
  "Industry Insights": "research",
  "Technology": "ai",
  "Education": "learning",
  "Marketing": "placements",
  "Productivity": "productivity",
};

// Tailwind styling configurations for the background fallback areas
const CATEGORY_BG_CONFIGS: Record<string, { bg: string; accent: string }> = {
  "ai": {
    bg: "bg-purple-50 dark:bg-purple-950/20",
    accent: "border-purple-100 dark:border-purple-900/40"
  },
  "skills": {
    bg: "bg-orange-50 dark:bg-orange-950/20",
    accent: "border-orange-100 dark:border-orange-900/40"
  },
  "opportunities": {
    bg: "bg-emerald-50 dark:bg-emerald-950/20",
    accent: "border-emerald-100 dark:border-emerald-900/40"
  },
  "career": {
    bg: "bg-orange-50 dark:bg-orange-950/20",
    accent: "border-orange-100 dark:border-orange-900/40"
  },
  "research": {
    bg: "bg-blue-50 dark:bg-blue-950/20",
    accent: "border-blue-100 dark:border-blue-900/40"
  },
  "learning": {
    bg: "bg-indigo-50 dark:bg-indigo-950/20",
    accent: "border-indigo-100 dark:border-indigo-900/40"
  },
  "placements": {
    bg: "bg-orange-50 dark:bg-orange-950/20",
    accent: "border-orange-100 dark:border-orange-900/40"
  },
  "productivity": {
    bg: "bg-slate-50 dark:bg-slate-900/20",
    accent: "border-slate-100 dark:border-slate-800"
  },
  "education": {
    bg: "bg-blue-50 dark:bg-blue-950/20",
    accent: "border-blue-100 dark:border-blue-900/40"
  },
};

const DEFAULT_BG = {
  bg: "bg-slate-50 dark:bg-slate-900/40",
  accent: "border-slate-100 dark:border-slate-800"
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

  // Choose dynamically between 1, 2, or 3
  const variation = (Math.abs(hash) % 3) + 1;
  return `0${variation}`;
}

export function EditorialThumbnail({
  title,
  category,
  metadataStr,
  className = ""
}: EditorialThumbnailProps) {
  // Try to parse illustration_tag from metadataStr if present
  let smartFolder: string | undefined = undefined;
  if (metadataStr) {
    try {
      const parsed = JSON.parse(metadataStr);
      if (parsed.illustration_tag) {
        smartFolder = parsed.illustration_tag.toLowerCase().trim();
      }
    } catch {}
  }
  // Fallback to category folder mapping if no smart illustration_tag was parsed
  const folder = smartFolder || CATEGORY_FOLDER_MAP[category] || "ai";
  const styles = CATEGORY_BG_CONFIGS[folder] || DEFAULT_BG;
  const variation = getIllustrationVariation(title, folder);

  const illustrationSrc = `/illustrations/${folder}/${folder}-${variation}.svg`;

  return (
    <div
      className={`relative w-full h-full flex items-center justify-center ${styles.bg} border-b ${styles.accent} overflow-hidden transition-all duration-300 ${className}`}
    >
      {/* SVG Illustration Element */}
      <img
        src={illustrationSrc}
        alt={title}
        className="w-full h-full object-contain max-h-[160px] p-4 transition-transform duration-300 group-hover:scale-[1.04]"
        loading="lazy"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          if (!target.getAttribute("data-fallback")) {
            target.setAttribute("data-fallback", "true");
            target.src = "/illustrations/ai/ai-01.svg";
          }
        }}
      />
    </div>
  );
}
