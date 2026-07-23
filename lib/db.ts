import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "../db/schema";

const rawUrl =
  process.env.TURSO_CONNECTION_URL ||
  process.env.TURSO_DATABASE_URL ||
  process.env.NEXT_PUBLIC_TURSO_DATABASE_URL;

const rawToken =
  process.env.TURSO_AUTH_TOKEN ||
  process.env.TURSO_API_TOKEN ||
  process.env.TURSO_TOKEN;

const url = rawUrl?.replace(/(^["']|["']$)/g, "");
const authToken = rawToken?.replace(/(^["']|["']$)/g, "");

if (!url) {
  if (process.env.NODE_ENV === "production") {
    console.error("CRITICAL ERROR: TURSO database URL environment variable is missing in production!");
  }
  console.warn("Warning: TURSO database URL environment variable is missing.");
}

export const client = createClient({
  url: url || "libsql://placeholder.db",
  authToken: authToken || "",
});

export const db = drizzle(client, { schema });
export * from "../db/schema";
