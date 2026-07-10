import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "TheAskt AI Learning Platform",
    short_name: "TheAskt",
    description: "Learn AI. Build Skills. Create Opportunities.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0c",
    theme_color: "#8b5cf6",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-maskable.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    shortcuts: [
      {
        name: "AI News",
        short_name: "News",
        description: "Read the latest AI industry trends",
        url: "/ai-news",
        icons: [{ src: "/icon-192.png", sizes: "192x192" }],
      },
      {
        name: "AI Tools",
        short_name: "Tools",
        description: "Discover curated AI tools database",
        url: "/ai-tools",
        icons: [{ src: "/icon-192.png", sizes: "192x192" }],
      },
    ],
  };
}
