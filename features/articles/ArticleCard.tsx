import React from "react";
import Link from "next/link";
import { Clock, Calendar, ArrowUpRight } from "lucide-react";
import { Article } from "@/db/schema";
import { EditorialThumbnail } from "@/components/EditorialThumbnail";

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const { title, slug, excerpt, category, image, publishedAt, readingTime, contentType, viralScore } = article;

  const formattedDate = new Date(publishedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  // Transformed Content Type Labels
  const contentTypeLabel = {
    "news": "News",
    "tutorial": "Tutorial",
    "comparison": "Comparison",
    "tool-review": "Tool Review",
    "career": "Career Guide"
  }[contentType || "news"] || "Article";

  const isTrending = (viralScore || 0) >= 75;

  return (
    <article className="group relative bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl hover:border-primary/20 transition-all duration-300 flex flex-col h-full">
      {/* Article Thumbnail — dynamic SVG illustration */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <EditorialThumbnail title={title} category={category} metadataStr={article.metadata} className="w-full h-full" />

        {/* Category Badge overlay */}
        <span className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm text-foreground text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border border-border">
          {category}
        </span>

        {/* Premium TRENDING badge overlay (No numbers shown) */}
        {isTrending && (
          <span className="absolute top-4 right-4 bg-primary text-primary-foreground text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-md shadow-sm flex items-center gap-1 animate-pulse">
            🔥 Trending
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex flex-wrap items-center gap-3 text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2.5">
          <span className="bg-secondary text-secondary-foreground px-2 py-0.5 rounded-md text-[9px] font-bold tracking-normal">
            {contentTypeLabel}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {formattedDate}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {readingTime} Min Read
          </span>
        </div>

        <h3 className="font-heading text-lg font-bold text-foreground group-hover:text-primary transition-colors leading-tight mb-2 flex items-start gap-1 justify-between">
          <Link href={`/articles/${slug}`} className="hover:underline focus:outline-none">
            {title}
          </Link>
          <ArrowUpRight className="h-4.5 w-4.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-primary flex-shrink-0" />
        </h3>

        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 mb-4">
          {excerpt}
        </p>

        {/* Read More button at the bottom */}
        <div className="mt-auto pt-3 border-t border-border/50 flex items-center justify-between text-xs font-bold text-primary">
          <Link
            href={`/articles/${slug}`}
            className="flex items-center gap-1 group/btn hover:text-primary/80 transition-colors"
          >
            Read Article
          </Link>
        </div>
      </div>
    </article>
  );
}
