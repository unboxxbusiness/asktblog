"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronRight, CheckCircle2, PlayCircle, BookOpen, Clock } from "lucide-react";

interface CourseModule {
  id: string;
  title: string;
  slug: string;
  readingTime?: number;
  part: number;
}

interface CourseAccordionSidebarProps {
  courseTitle: string;
  modules: CourseModule[];
  currentSlug: string;
  trackName?: string;
  timeSavings?: string;
}

export default function CourseAccordionSidebar({
  courseTitle,
  modules,
  currentSlug,
  trackName = "Automation Track",
  timeSavings = "Saves ~8 Hours/Week",
}: CourseAccordionSidebarProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <aside className="w-full lg:w-80 flex-shrink-0 mb-8 lg:mb-0">
      <div className="sticky top-24 rounded-2xl border border-border/80 bg-card p-4 shadow-sm">
        {/* Track Badge & Time Savings */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-primary/10 text-primary px-2.5 py-1 rounded-full">
            <BookOpen className="w-3 h-3" />
            {trackName}
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2.5 py-1 rounded-full">
            <Clock className="w-3 h-3" />
            {timeSavings}
          </span>
        </div>

        {/* Collapsible Accordion Header */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full text-left font-bold text-foreground text-sm py-2 hover:text-primary transition-colors border-b border-border/60"
        >
          <span className="line-clamp-2 pr-2">{courseTitle}</span>
          {isOpen ? <ChevronDown className="w-4 h-4 shrink-0" /> : <ChevronRight className="w-4 h-4 shrink-0" />}
        </button>

        {/* Modules List Accordion Body */}
        {isOpen && (
          <div className="mt-3 space-y-1.5 max-h-[70vh] overflow-y-auto pr-1 custom-scrollbar">
            {modules.map((mod, idx) => {
              const isActive = mod.slug === currentSlug;
              const isCompleted = idx < modules.findIndex((m) => m.slug === currentSlug);

              return (
                <Link
                  key={mod.id || mod.slug}
                  href={`/courses/${mod.slug}`}
                  className={`flex items-start gap-3 p-2.5 rounded-xl text-xs transition-all duration-200 ${
                    isActive
                      ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                      : "hover:bg-muted/60 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span className="mt-0.5 shrink-0">
                    {isActive ? (
                      <PlayCircle className="w-4 h-4 text-primary-foreground animate-pulse" />
                    ) : isCompleted ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <span className="w-4 h-4 rounded-full border border-border/80 flex items-center justify-center text-[10px] font-mono">
                        {idx + 1}
                      </span>
                    )}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className={`line-clamp-2 leading-tight ${isActive ? "text-primary-foreground" : "text-foreground"}`}>
                      {mod.title}
                    </p>
                    <span className={`text-[10px] block mt-1 ${isActive ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                      Part {idx + 1} of {modules.length} • {mod.readingTime || 5} min read
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </aside>
  );
}
