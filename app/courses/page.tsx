import React from "react";
import Link from "next/link";
import { getDistinctCourseSeries } from "@/services/articles";
import { Clock, ArrowRight, BookOpen, Layers, ChevronLeft, ChevronRight, Zap, GraduationCap, Briefcase, Cpu } from "lucide-react";

export const revalidate = 300;

export const metadata = {
  title: "Micro-Courses & Skill Paths | TheAskt",
  description: "Notion-style clean 5-part self-paced micro-courses designed to save 5 to 10 hours of manual work every week.",
};

interface CoursesPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function NotionStyleCoursesPage({ searchParams }: CoursesPageProps) {
  const { page } = await searchParams;
  const currentPage = Math.max(1, parseInt(page || "1", 10));
  const ITEMS_PER_PAGE = 6;

  // Fetch unique course series (NO DUPLICATES!)
  const allCourses = await getDistinctCourseSeries();
  const totalPages = Math.max(1, Math.ceil(allCourses.length / ITEMS_PER_PAGE));
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedCourses = allCourses.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // SVG Topic Illustration Generator matching homepage SVG style
  const renderSvgIllustration = (category: string, index: number) => {
    const gradients = [
      { from: "#3b82f6", to: "#1d4ed8" }, // Blue
      { from: "#10b981", to: "#047857" }, // Emerald
      { from: "#8b5cf6", to: "#6d28d9" }, // Purple
      { from: "#f59e0b", to: "#b45309" }, // Amber
    ];
    const grad = gradients[index % gradients.length];

    return (
      <div className="w-full h-36 bg-muted/30 relative flex items-center justify-center overflow-hidden border-b border-border/40">
        <svg className="w-full h-full absolute inset-0 opacity-15" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="0 0 L100 0 L100 100 Z" fill={`url(#grad-${index})`} />
          <defs>
            <linearGradient id={`grad-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={grad.from} />
              <stop offset="100%" stopColor={grad.to} />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Topic SVG Icon Pill */}
        <div className="z-10 flex flex-col items-center gap-2 p-3 bg-background/80 backdrop-blur-md border border-border/60 rounded-2xl shadow-xs text-center max-w-[80%]">
          <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
            {index % 4 === 0 && <Cpu className="w-5 h-5" />}
            {index % 4 === 1 && <Zap className="w-5 h-5" />}
            {index % 4 === 2 && <GraduationCap className="w-5 h-5" />}
            {index % 4 === 3 && <Briefcase className="w-5 h-5" />}
          </div>
          <span className="text-[11px] font-mono font-medium tracking-tight text-foreground line-clamp-1">
            {category || "Automation Path"}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* 1. Notion-Style Minimalist Header */}
        <div className="space-y-3 border-b border-border/60 pb-8">
          <div className="inline-flex items-center gap-2 text-xs font-mono bg-muted/60 text-muted-foreground px-3 py-1 rounded-md border border-border/40">
            <BookOpen className="w-3.5 h-3.5 text-primary" />
            TheAskt / Micro-Courses
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
            Micro-Course Learning Paths
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl leading-relaxed">
            Practical 5-part self-paced courses engineered to save 5 to 10 hours of manual work every week. Zero fluff, 100% actionable.
          </p>
        </div>

        {/* 2. Notion-Style Minimalist Course Grid */}
        {allCourses.length === 0 ? (
          <div className="text-center py-16 bg-card rounded-xl border border-border/60 space-y-2">
            <p className="text-muted-foreground text-sm">No courses published yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedCourses.map((course, idx) => {
              const cleanTitle = course.title.replace(/^Part\s*\d+:\s*/i, "").split("—")[0].trim();

              return (
                <div
                  key={course.id || course.slug}
                  className="bg-card border border-border/60 rounded-xl overflow-hidden shadow-xs hover:border-border/90 hover:shadow-sm transition-all duration-200 flex flex-col justify-between"
                >
                  {/* SVG Illustration Header (No Photo Stock Images!) */}
                  {renderSvgIllustration(course.category || "Automation", idx)}

                  {/* Card Content Body */}
                  <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between text-[11px] font-mono">
                        <span className="text-muted-foreground flex items-center gap-1">
                          <Layers className="w-3.5 h-3.5 text-primary" />
                          5 Modules
                        </span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          Saves ~8h/wk
                        </span>
                      </div>

                      <h2 className="font-bold text-foreground text-base leading-snug line-clamp-2 hover:text-primary transition-colors">
                        <Link href={`/courses/${course.slug}`}>{cleanTitle}</Link>
                      </h2>

                      <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                        {course.excerpt}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-border/40 mt-auto">
                      <Link
                        href={`/courses/${course.slug}`}
                        className="inline-flex items-center justify-between w-full py-2 px-3 rounded-lg bg-muted/50 hover:bg-primary hover:text-primary-foreground text-xs font-semibold text-foreground transition-all duration-200"
                      >
                        <span>Start Course</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* 3. Notion-Style Pagination Bar */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-border/60 pt-6">
            <span className="text-xs text-muted-foreground font-mono">
              Page {currentPage} of {totalPages} ({allCourses.length} Total Courses)
            </span>

            <div className="flex items-center gap-2">
              {currentPage > 1 ? (
                <Link
                  href={`/courses?page=${currentPage - 1}`}
                  className="inline-flex items-center gap-1 py-1.5 px-3 rounded-lg border border-border/60 bg-card text-xs font-medium text-foreground hover:bg-muted transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Link>
              ) : (
                <button disabled className="inline-flex items-center gap-1 py-1.5 px-3 rounded-lg border border-border/40 bg-muted/30 text-xs font-medium text-muted-foreground opacity-50 cursor-not-allowed">
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>
              )}

              {currentPage < totalPages ? (
                <Link
                  href={`/courses?page=${currentPage + 1}`}
                  className="inline-flex items-center gap-1 py-1.5 px-3 rounded-lg border border-border/60 bg-card text-xs font-medium text-foreground hover:bg-muted transition-colors"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Link>
              ) : (
                <button disabled className="inline-flex items-center gap-1 py-1.5 px-3 rounded-lg border border-border/40 bg-muted/30 text-xs font-medium text-muted-foreground opacity-50 cursor-not-allowed">
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
