import { db, articles } from "@/lib/db";
import { eq, ne, and, or, like, desc, not, lt, gt } from "drizzle-orm";
import { Article } from "@/db/schema";

export async function getArticles(limit = 10, offset = 0): Promise<Article[]> {
  try {
    return await db
      .select()
      .from(articles)
      .where(and(eq(articles.status, "published"), ne(articles.contentType, "course")))
      .orderBy(desc(articles.publishedAt))
      .limit(limit)
      .offset(offset);
  } catch (error) {
    console.error("Database query failed in getArticles:", error);
    return [];
  }
}

export async function getFeaturedArticles(limit = 3): Promise<Article[]> {
  try {
    return await db
      .select()
      .from(articles)
      .where(and(eq(articles.status, "published"), eq(articles.featured, 1), ne(articles.contentType, "course")))
      .orderBy(desc(articles.publishedAt))
      .limit(limit);
  } catch (error) {
    console.error("Database query failed in getFeaturedArticles:", error);
    return [];
  }
}

export async function getTrendingArticles(limit = 5): Promise<Article[]> {
  try {
    return await db
      .select()
      .from(articles)
      .where(and(eq(articles.status, "published"), ne(articles.contentType, "course")))
      .orderBy(desc(articles.views), desc(articles.publishedAt))
      .limit(limit);
  } catch (error) {
    console.error("Database query failed in getTrendingArticles:", error);
    return [];
  }
}

export async function getArticlesByCategory(
  categoryName: string,
  limit = 10,
  offset = 0
): Promise<Article[]> {
  try {
    return await db
      .select()
      .from(articles)
      .where(and(eq(articles.status, "published"), eq(articles.category, categoryName)))
      .orderBy(desc(articles.publishedAt))
      .limit(limit)
      .offset(offset);
  } catch (error) {
    console.error(`Database query failed in getArticlesByCategory for ${categoryName}:`, error);
    return [];
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const results = await db
      .select()
      .from(articles)
      .where(eq(articles.slug, slug))
      .limit(1);
    return results[0] || null;
  } catch (error) {
    console.error(`Database query failed in getArticleBySlug for ${slug}:`, error);
    return null;
  }
}

export async function getRelatedArticles(
  categoryName: string,
  currentSlug: string,
  limit = 3
): Promise<Article[]> {
  try {
    return await db
      .select()
      .from(articles)
      .where(
        and(
          eq(articles.status, "published"),
          eq(articles.category, categoryName),
          not(eq(articles.slug, currentSlug))
        )
      )
      .orderBy(desc(articles.publishedAt))
      .limit(limit);
  } catch (error) {
    console.error("Database query failed in getRelatedArticles:", error);
    return [];
  }
}

export async function getPrevAndNextArticles(
  publishedAt: number
): Promise<{ prev: Article | null; next: Article | null }> {
  try {
    // Previous article (older published date)
    const prevQuery = await db
      .select()
      .from(articles)
      .where(and(eq(articles.status, "published"), lt(articles.publishedAt, publishedAt)))
      .orderBy(desc(articles.publishedAt))
      .limit(1);

    // Next article (newer published date)
    const nextQuery = await db
      .select()
      .from(articles)
      .where(and(eq(articles.status, "published"), gt(articles.publishedAt, publishedAt)))
      .orderBy(desc(articles.publishedAt)) // Ascending older-first order for "next"
      .limit(1);

    return {
      prev: prevQuery[0] || null,
      next: nextQuery[0] || null,
    };
  } catch (error) {
    console.error("Database query failed in getPrevAndNextArticles:", error);
    return { prev: null, next: null };
  }
}

export async function searchArticles(queryStr: string, limit = 20): Promise<Article[]> {
  if (!queryStr.trim()) return [];
  const searchPattern = `%${queryStr.toLowerCase()}%`;

  try {
    // SQLite/libSQL LIKE is case-insensitive by default or we search lowercase pattern
    // Optimized: removed full content scanning to prevent major DB bottlenecks
    return await db
      .select()
      .from(articles)
      .where(
        and(
          eq(articles.status, "published"),
          or(
            like(articles.title, searchPattern),
            like(articles.excerpt, searchPattern),
            like(articles.category, searchPattern),
            like(articles.keywords, searchPattern),
            like(articles.tags, searchPattern)
          )
        )
      )
      .orderBy(desc(articles.publishedAt))
      .limit(limit);
  } catch (error) {
    console.error("Database query failed in searchArticles:", error);
    return [];
  }
}

export async function incrementArticleViews(id: string): Promise<void> {
  try {
    const now = Date.now();
    await db.run(
      sql`UPDATE articles SET views = views + 1, views_7d = views_7d + 1, views_30d = views_30d + 1, last_viewed_at = ${now} WHERE id = ${id}`
    );
  } catch (error) {
    // Silently log view update failure to prevent breaking page delivery
    console.error(`Failed to increment views for article ${id}:`, error);
  }
}

// ── NEW QUERIES FOR ADVANCED CONTENT ENGINE ─────────────────────────

export async function getTrendingThisWeek(limit = 5): Promise<Article[]> {
  try {
    return await db
      .select()
      .from(articles)
      .where(eq(articles.status, "published"))
      .orderBy(desc(articles.views7d), desc(articles.publishedAt))
      .limit(limit);
  } catch (error) {
    console.error("Database query failed in getTrendingThisWeek:", error);
    return [];
  }
}

export async function getArticlesByType(
  contentType: string,
  limit = 10,
  offset = 0
): Promise<Article[]> {
  try {
    return await db
      .select()
      .from(articles)
      .where(and(eq(articles.status, "published"), eq(articles.contentType, contentType)))
      .orderBy(desc(articles.publishedAt))
      .limit(limit)
      .offset(offset);
  } catch (error) {
    console.error(`Database query failed in getArticlesByType for ${contentType}:`, error);
    return [];
  }
}

export async function getArticlesByTag(
  tag: string,
  limit = 10,
  offset = 0
): Promise<Article[]> {
  try {
    const searchPattern = `%${tag.toLowerCase()}%`;
    return await db
      .select()
      .from(articles)
      .where(and(eq(articles.status, "published"), like(articles.tags, searchPattern)))
      .orderBy(desc(articles.publishedAt))
      .limit(limit)
      .offset(offset);
  } catch (error) {
    console.error(`Database query failed in getArticlesByTag for ${tag}:`, error);
    return [];
  }
}

export async function getTopViralArticles(limit = 5): Promise<Article[]> {
  try {
    return await db
      .select()
      .from(articles)
      .where(eq(articles.status, "published"))
      .orderBy(desc(articles.viralScore), desc(articles.publishedAt))
      .limit(limit);
  } catch (error) {
    console.error("Database query failed in getTopViralArticles:", error);
    return [];
  }
}

// Help query builder for raw injection support
import { sql } from "drizzle-orm";

export async function getActiveCategoriesAndTags(): Promise<{ categories: string[]; tags: string[] }> {
  try {
    const list = await db
      .select({ category: articles.category, tags: articles.tags })
      .from(articles)
      .where(eq(articles.status, "published"));

    const categoriesSet = new Set<string>();
    const tagsSet = new Set<string>();

    list.forEach((item) => {
      if (item.category) {
        categoriesSet.add(item.category.trim());
      }
      if (item.tags) {
        item.tags.split(",").forEach((t) => {
          const cleanTag = t.trim().toLowerCase();
          if (cleanTag) {
            tagsSet.add(cleanTag);
          }
        });
      }
    });

    return {
      categories: Array.from(categoriesSet),
      tags: Array.from(tagsSet),
    };
  } catch (error) {
    console.error("Database query failed in getActiveCategoriesAndTags:", error);
    return { categories: [], tags: [] };
  }
}

export async function getCourses(): Promise<Article[]> {
  try {
    return await db
      .select()
      .from(articles)
      .where(
        and(
          eq(articles.status, "published"),
          or(eq(articles.contentType, "course"), eq(articles.category, "Course"))
        )
      )
      .orderBy(desc(articles.publishedAt));
  } catch (error) {
    console.error("Database query failed in getCourses:", error);
    return [];
  }
}

export async function getDistinctCourseSeries(): Promise<Article[]> {
  try {
    const allCourseArticles = await getCourses();
    const uniqueMap = new Map<string, Article>();

    allCourseArticles.forEach((art) => {
      // Clean base title without Part 1 / Part 2 prefix
      const baseKey = art.title.replace(/^Part\s*\d+:\s*/i, "").split("—")[0].trim().toLowerCase();
      
      // If Part 1 or first time seeing series key, register it
      if (!uniqueMap.has(baseKey) || art.title.toLowerCase().includes("part 1")) {
        uniqueMap.set(baseKey, art);
      }
    });

    return Array.from(uniqueMap.values());
  } catch (error) {
    console.error("Database query failed in getDistinctCourseSeries:", error);
    return [];
  }
}

export interface CourseSeriesGroup {
  courseTitle: string;
  firstModuleSlug: string;
  excerpt: string;
  image: string;
  author: string;
  readingTime: number;
  modules: Article[];
}

export async function getCourseSeriesGrouped(): Promise<CourseSeriesGroup[]> {
  try {
    const allCourseArticles = await getCourses();
    if (allCourseArticles.length === 0) return [];

    const groupsMap = new Map<string, CourseSeriesGroup>();

    allCourseArticles.forEach((art) => {
      // Determine overarching course title:
      let cleanTitle = "";
      if (art.sourceName && art.sourceName.trim().length > 3 && !art.sourceName.includes("n8n Automation Docs")) {
        cleanTitle = art.sourceName.trim();
      } else {
        // Strip 'Part X:' and clean title
        cleanTitle = art.title.replace(/^Part\s*\d+:\s*/i, "").split("—")[0].split("-")[0].trim();
      }

      const groupKey = cleanTitle.toLowerCase();

      if (!groupsMap.has(groupKey)) {
        groupsMap.set(groupKey, {
          courseTitle: cleanTitle,
          firstModuleSlug: art.slug,
          excerpt: art.excerpt,
          image: art.image,
          author: art.author,
          readingTime: art.readingTime || 5,
          modules: [],
        });
      }

      const group = groupsMap.get(groupKey)!;
      group.modules.push(art);

      // If this article is Part 1, prioritize its slug, excerpt and image for the main card
      if (art.title.toLowerCase().includes("part 1")) {
        group.firstModuleSlug = art.slug;
        group.excerpt = art.excerpt;
        group.image = art.image;
      }
    });

    // Sort modules inside each course group (Part 1 to Part 5)
    const result = Array.from(groupsMap.values());
    result.forEach((grp) => {
      grp.modules.sort((a, b) => {
        const partA = parseInt(a.title.match(/Part\s*(\d+)/i)?.[1] || "1", 10);
        const partB = parseInt(b.title.match(/Part\s*(\d+)/i)?.[1] || "1", 10);
        return partA - partB;
      });
    });

    return result;
  } catch (error) {
    console.error("Database query failed in getCourseSeriesGrouped:", error);
    return [];
  }
}
