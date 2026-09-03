type Entry = { count: number; resetAt: number };

const globalStore = globalThis as unknown as { __rateLimitStore?: Map<string, Entry> };

function getStore(): Map<string, Entry> {
  if (!globalStore.__rateLimitStore) {
    globalStore.__rateLimitStore = new Map<string, Entry>();
  }
  return globalStore.__rateLimitStore;
}

/**
 * Simple in-memory sliding window rate limiter.
 * Not distributed (resets per serverless instance), but prevents burst abuse in Phase 1.
 * For production multi-instance, replace with Upstash/Redis.
 */
export function checkRateLimit(key: string, limit: number, windowMs: number): { allowed: boolean; remaining: number; resetAt: number } {
  const store = getStore();
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || now > entry.resetAt) {
    const resetAt = now + windowMs;
    store.set(key, { count: 1, resetAt });
    // Lazy cleanup: prune expired entries every 100 calls or so (cheap)
    if (store.size > 500) {
      for (const [k, v] of store) if (now > v.resetAt) store.delete(k);
    }
    return { allowed: true, remaining: limit - 1, resetAt };
  }

  if (entry.count >= limit) {
    return { allowed: false, remaining: 0, resetAt: entry.resetAt };
  }

  entry.count += 1;
  return { allowed: true, remaining: limit - entry.count, resetAt: entry.resetAt };
}

export function getClientIpFromHeaders(headers: Headers | Record<string, string | null | undefined>): string {
  // Next.js headers() includes x-forwarded-for (Vercel), x-real-ip
  const get = (name: string) => {
    if (headers instanceof Headers) return headers.get(name);
    return (headers as Record<string, string | null | undefined>)[name] ?? null;
  };
  const forwarded = get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() ?? "unknown";
  const realIp = get("x-real-ip");
  if (realIp) return realIp.trim();
  return "unknown";
}
