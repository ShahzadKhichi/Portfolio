import redis from "./redis";

export const DEFAULT_CACHE_TTL_SECONDS = 7 * 24 * 60 * 60;

export async function getCache<T>(key: string): Promise<T | null> {
  if (!redis) return null;
  try {
    const data = await redis.get(key);
    if (data) {
      return JSON.parse(data) as T;
    }
  } catch (error) {
    console.error(`Error getting cache for key ${key}:`, error);
  }
  return null;
}

export async function setCache(key: string, data: any, ttlSeconds: number = DEFAULT_CACHE_TTL_SECONDS): Promise<void> {
  if (!redis) return;
  try {
    const value = JSON.stringify(data);
    await redis.setex(key, ttlSeconds, value);
  } catch (error) {
    console.error(`Error setting cache for key ${key}:`, error);
  }
}

export async function deleteCache(key: string | string[]): Promise<void> {
  if (!redis) return;
  try {
    if (Array.isArray(key)) {
      if (key.length > 0) {
        await redis.del(...key);
      }
    } else {
      await redis.del(key);
    }
  } catch (error) {
    console.error(`Error deleting cache for key ${key}:`, error);
  }
}

export async function invalidateCachePattern(pattern: string): Promise<void> {
  if (!redis) return;
  try {
    const keys = await redis.keys(pattern);
    if (keys.length > 0) {
      await redis.del(...keys);
    }
  } catch (error) {
    console.error(`Error invalidating cache pattern ${pattern}:`, error);
  }
}
