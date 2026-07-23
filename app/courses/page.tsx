import React from "react";
import Link from "next/link";
import { getCourseSeriesGrouped } from "@/services/articles";
import { Clock, ArrowRight, BookOpen, Layers, ChevronLeft, ChevronRight, CheckCircle2, PlayCircle, Sparkles } from "lucide-react";

export const revalidate = 300;

export const metadata = {
  title: "Micro-Courses & Skill Paths | TheAskt",
  description: "Explore 5-part micro-course series designed to save 5 to 10 hours of manual work every week.",
};

interface CoursesPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function CourseraStyleCoursesPage({ searchParams }: CoursesPageProps) {
  const { page } = await searchParams;
  const currentPage = Math.max(1, parseInt(page || "1", 10));
  const ITEMS_PER_PAGE = 4;

  // Fetch active course series with their exact 5 associated sub-article modules
  const allCourseSeries = await getCourseSeriesGrouped();

  const totalPages = Math.max(1, Math.ceil(allCourseSeries.length / ITEMS_PER_PAGE));
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedSeries = allCourseSeries.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-background py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* 1. Clean Minimalist Header (Zero Category Badges!) */}
        <div className="space-y-3 border-b border-border/60 pb-8">
          <div className="inline-flex items-center gap-2 text-xs font-mono bg-muted/60 text-muted-foreground px-3 py-1 rounded-md border border-border/40">
            <BookOpen className="w-3.5 h-3.5 text-primary" />
            TheAskt / Self-Paced Courses
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
            Micro-Course Skill Paths
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl leading-relaxed">
            Every course below contains an active 5-module curriculum designed to save 5 to 10 hours of manual work every week.
          </p>
        </div>

        {/* 2. Premium Coursera / Google-Inspired Course Cards Stack */}
        {allCourseSeries.length === 0 ? (
          <div className="text-center py-16 bg-card rounded-2xl border border-border/60 space-y-2">
            <Sparkles className="w-8 h-8 text-primary mx-auto" />
            <p className="text-muted-foreground text-sm">No active courses published yet.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {paginatedSeries.map((series, idx) => (
              <div
                key={idx}
                className="bg-card border border-border/70 rounded-2xl p-6 sm:p-8 shadow-xs hover:border-primary/40 hover:shadow-md transition-all duration-200 space-y-6"
              >
                {/* Course Header Info */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="space-y-2 max-w-3xl">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono font-medium text-primary bg-primary/10 px-2.5 py-0.5 rounded-md">
                        <Layers className="w-3 h-3" />
                        {series.modules.length} Modules Course
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-md">
                        <Clock className="w-3 h-3" />
                        Saves 5–10h/wk
                      </span>
                    </div>

                    {/* Dynamic Course Title derived from Part 1 */}
                    <h2 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight leading-snug">
                      <Link href={`/courses/${series.firstModuleSlug}`} className="hover:text-primary transition-colors">
                        {series.courseTitle}
                      </Link>
                    </h2>

                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {series.excerpt}
                    </p>
                  </div>

                  {/* Start Course CTA Button */}
                  <div className="shrink-0 pt-2 sm:pt-0">
                    <Link
                      href={`/courses/${series.firstModuleSlug}`}
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-colors shadow-sm w-full sm:w-auto"
                    >
                      Start 5-Module Course
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                {/* 3. Associated 5-Module Syllabus Preview Box (Exact 5 Sub-Articles) */}
                <div className="bg-muted/30 border border-border/50 rounded-xl p-4 sm:p-5 space-y-3">
                  <div className="flex items-center justify-between border-b border-border/40 pb-2">
                    <span className="text-xs font-mono font-semibold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                      <PlayCircle className="w-3.5 h-3.5 text-primary" />
                      Course Curriculum & Syllabus ({series.modules.length} Modules)
                    </span>
                    <span className="text-[11px] font-mono text-muted-foreground">Self-Paced</span>
                  </div>

                  {/* List of exact 5 associated sub-article titles */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1">
                    {series.modules.map((mod, modIdx) => (
                      <Link
                        key={mod.id || mod.slug}
                        href={`/courses/${mod.slug}`}
                        className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-background/80 transition-colors text-xs group"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                        <div className="min-w-0">
                          <span className="font-semibold text-foreground group-hover:text-primary transition-colors block line-clamp-1">
                            Part {modIdx + 1}: {mod.title.replace(/^Part\s*\d+:\s*/i, "")}
                          </span>
                          <span className="text-[10px] text-muted-foreground font-mono">
                            {mod.readingTime || 6} min read • Click to read module
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

        {/* 4. Notion-Style Pagination Bar */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-border/60 pt-6">
            <span className="text-xs text-muted-foreground font-mono">
              Page {currentPage} of {totalPages} ({allCourseSeries.length} Active Courses)
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
