"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, GraduationCap, Cpu, Layers, BarChart, Briefcase, BookOpen, Shuffle, Target, Compass, Sparkles } from "lucide-react";
import { siteConfig } from "@/config/site";

// Map icons to categories for visual appeal
const iconMap: Record<string, React.ReactNode> = {
  "Learn AI": <GraduationCap className="h-5 w-5 text-purple-500" />,
  "Automation": <Cpu className="h-5 w-5 text-indigo-500" />,
  "CRM": <Layers className="h-5 w-5 text-blue-500" />,
  "Business Growth": <BarChart className="h-5 w-5 text-emerald-500" />,
  "Career Resources": <Briefcase className="h-5 w-5 text-amber-500" />,
  "Industry Insights": <BookOpen className="h-5 w-5 text-rose-500" />,
  "AI Workflows": <Shuffle className="h-5 w-5 text-cyan-500" />,
  "Freelancing": <Target className="h-5 w-5 text-teal-500" />,
  "Entrepreneurship": <Compass className="h-5 w-5 text-violet-500" />,
  "Productivity": <Sparkles className="h-5 w-5 text-orange-500" />,
};

export default function LearnHubDropdown({ activeCategories = [] }: { activeCategories?: string[] }) {
  const [isOpen, setIsOpen] = useState(false);

  const filteredCategories = siteConfig.learnHubCategories.filter((category) =>
    activeCategories.includes(category.dbCategory)
  );

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-2 px-1 focus:outline-none"
        aria-expanded={isOpen}
        suppressHydrationWarning
      >
        LearnHub
        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute left-1/2 -translate-x-1/2 top-full z-50 w-[480px] pt-2">
          <div className="glass rounded-xl shadow-xl border border-border p-4 grid grid-cols-2 gap-2 animate-fade-in-up">
            {filteredCategories.map((category) => (
              <Link
                key={category.name}
                href={category.path}
                className="group flex items-start gap-3 p-2 rounded-lg hover:bg-accent transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <div className="p-2 rounded-md bg-secondary group-hover:bg-background/20 transition-colors flex items-center justify-center">
                  {iconMap[category.name] || <Sparkles className="h-5 w-5 text-primary" />}
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground group-hover:text-accent-foreground transition-colors">{category.name}</div>
                  <div className="text-xs text-muted-foreground mt-0.5 group-hover:text-accent-foreground/80 transition-colors">
                    {category.name === "Learn AI" && "Master practical AI models"}
                    {category.name === "Automation" && "Integrate app workflows"}
                    {category.name === "CRM" && "Manage customer pipelines"}
                    {category.name === "Business Growth" && "Scale systems and revenue"}
                    {category.name === "Career Resources" && "Get high-paying job opportunities"}
                    {category.name === "Industry Insights" && "Deep-dives into AI trends"}
                    {category.name === "AI Workflows" && "Build agentic AI processes"}
                    {category.name === "Freelancing" && "Glow up client acquisition"}
                    {category.name === "Entrepreneurship" && "Build and launch startups"}
                    {category.name === "Productivity" && "Automate tasks & save time"}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
