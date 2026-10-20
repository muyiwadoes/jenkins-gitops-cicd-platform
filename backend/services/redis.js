import { createClient } from 'redis';
import { REDIS_URL } from '../config/utils.js';

let redis = null;

export async function connectToRedis() {
  try {
    if (REDIS_URL) {
      redis = await createClient({
        url: REDIS_URL,
        disableOfflineQueue: true,
      }).connect();
      console.log('Redis connected successfully.');
    } else {
      console.log('Redis not configured, cache disabled.');
    }
  } catch (error) {
    console.error('Redis connection failed.');
  }
}

export function getRedisClient() {
  return redis;
}
