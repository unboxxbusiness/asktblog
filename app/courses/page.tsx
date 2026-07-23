import React from "react";
import Link from "next/link";
import { getCourseSeriesGrouped } from "@/services/articles";
import { Clock, ArrowRight, BookOpen, Layers, ChevronLeft, ChevronRight, CheckCircle2, PlayCircle, Sparkles, GraduationCap, Zap, Award } from "lucide-react";

export const revalidate = 300;

export const metadata = {
  title: "Micro-Courses & Skill Paths | TheAskt",
  description: "Explore 5-part micro-course series designed to save 5 to 10 hours of manual work every week.",
};

interface CoursesPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function GridStyleCoursesPage({ searchParams }: CoursesPageProps) {
  const { page } = await searchParams;
  const currentPage = Math.max(1, parseInt(page || "1", 10));
  const ITEMS_PER_PAGE = 6; // Increased to 6 for a balanced 2x3 grid

  // Fetch active course series grouped by sourceName / parent title
  const allCourseSeries = await getCourseSeriesGrouped();

  const totalPages = Math.max(1, Math.ceil(allCourseSeries.length / ITEMS_PER_PAGE));
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedSeries = allCourseSeries.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* 1. Hero Header */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 via-background to-muted/40 border border-border/80 p-8 sm:p-12 shadow-xs">
          <div className="relative z-10 space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold bg-primary/10 text-primary px-3.5 py-1.5 rounded-full border border-primary/20">
              <GraduationCap className="w-4 h-4" />
              <span>Self-Paced Micro-Courses & Skill Paths</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
              Master Practical AI & Automation Workflows
            </h1>
            
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              Explore step-by-step 5-module course series crafted to eliminate manual work, boost productivity, and save 5 to 10 hours every week.
            </p>

            <div className="flex flex-wrap items-center gap-6 pt-2 text-xs font-mono text-muted-foreground">
              <span className="flex items-center gap-1.5 text-foreground">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                100% Free Access
              </span>
              <span className="flex items-center gap-1.5 text-foreground">
                <Zap className="w-4 h-4 text-amber-500" />
                Practical 5-Module Syllabus
              </span>
              <span className="flex items-center gap-1.5 text-foreground">
                <Award className="w-4 h-4 text-primary" />
                Save 5-10 Hours/Week
              </span>
            </div>
          </div>

          <div className="absolute right-[-40px] bottom-[-40px] opacity-10 pointer-events-none hidden md:block">
            <BookOpen className="w-96 h-96 text-primary" />
          </div>
        </div>

        {/* 2. Professional 2-Column Responsive Card Grid */}
        {allCourseSeries.length === 0 ? (
          <div className="text-center py-20 bg-card rounded-3xl border border-border/60 space-y-3">
            <Sparkles className="w-10 h-10 text-primary mx-auto" />
            <h3 className="text-lg font-bold text-foreground">No Courses Published Yet</h3>
            <p className="text-muted-foreground text-sm max-w-md mx-auto">
              New micro-courses are added weekly. Check back soon or request a new topic!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {paginatedSeries.map((series, idx) => (
              <div
                key={idx}
                className="group relative bg-card border border-border/80 rounded-3xl p-6 sm:p-7 shadow-sm hover:shadow-xl hover:border-primary/50 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-5">
                  {/* Card Badges */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                      <Layers className="w-3.5 h-3.5" />
                      {series.modules.length} Modules
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                      <Clock className="w-3.5 h-3.5" />
                      Saves 5–10h/wk
                    </span>
                  </div>

                  {/* Dynamic Course Title derived from Part 1 */}
                  <div className="space-y-2">
                    <h2 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight leading-snug group-hover:text-primary transition-colors">
                      <Link href={`/courses/${series.firstModuleSlug}`}>
                        {series.courseTitle}
                      </Link>
                    </h2>

                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3">
                      {series.excerpt}
                    </p>
                  </div>

                  {/* 5-Module Syllabus Preview Box */}
                  <div className="bg-muted/40 border border-border/60 rounded-2xl p-4 space-y-2.5">
                    <div className="flex items-center justify-between border-b border-border/40 pb-2">
                      <span className="text-[11px] font-mono font-semibold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                        <PlayCircle className="w-3.5 h-3.5 text-primary" />
                        Syllabus Overview
                      </span>
                      <span className="text-[10px] font-mono text-muted-foreground">Self-Paced</span>
                    </div>

                    <div className="space-y-1.5">
                      {series.modules.map((mod, modIdx) => (
                        <Link
                          key={mod.id || mod.slug}
                          href={`/courses/${mod.slug}`}
                          className="flex items-center justify-between p-2 rounded-xl hover:bg-background/90 transition-colors text-xs group/link border border-transparent hover:border-border/40"
                        >
                          <div className="flex items-center gap-2 min-w-0 pr-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 group-hover/link:scale-110 transition-transform" />
                            <span className="font-medium text-foreground group-hover/link:text-primary transition-colors truncate">
                              Part {modIdx + 1}: {mod.title.replace(/^Part\s*\d+:\s*/i, "")}
                            </span>
                          </div>
                          <span className="text-[10px] text-muted-foreground font-mono shrink-0">
                            {mod.readingTime || 6} min
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Start Course CTA Button */}
                <div className="pt-6">
                  <Link
                    href={`/courses/${series.firstModuleSlug}`}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-colors shadow-sm"
                  >
                    Start 5-Module Course
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

              </div>
            ))}
          </div>
        )}

        {/* 3. Responsive Grid Pagination Bar */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-border/60 pt-8">
            <span className="text-xs text-muted-foreground font-mono">
              Showing Page {currentPage} of {totalPages} ({allCourseSeries.length} Total Courses)
            </span>

            <div className="flex items-center gap-3">
              {currentPage > 1 ? (
                <Link
                  href={`/courses?page=${currentPage - 1}`}
                  className="inline-flex items-center gap-1.5 py-2 px-4 rounded-xl border border-border/60 bg-card text-xs font-medium text-foreground hover:bg-muted transition-colors shadow-xs"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Link>
              ) : (
                <button disabled className="inline-flex items-center gap-1.5 py-2 px-4 rounded-xl border border-border/40 bg-muted/30 text-xs font-medium text-muted-foreground opacity-50 cursor-not-allowed">
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>
              )}

              {currentPage < totalPages ? (
                <Link
                  href={`/courses?page=${currentPage + 1}`}
                  className="inline-flex items-center gap-1.5 py-2 px-4 rounded-xl border border-border/60 bg-card text-xs font-medium text-foreground hover:bg-muted transition-colors shadow-xs"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Link>
              ) : (
                <button disabled className="inline-flex items-center gap-1.5 py-2 px-4 rounded-xl border border-border/40 bg-muted/30 text-xs font-medium text-muted-foreground opacity-50 cursor-not-allowed">
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
