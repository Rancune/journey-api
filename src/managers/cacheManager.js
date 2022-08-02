import { createClient } from "redis";

const cacheClient = createClient({
  url: process.env.REDIS_URL,
  password: process.env.REDIS_PASSWORD,
});
cacheClient.on("error", (err) => {
  console.log("Error " + err);
});

export const loadCacheController = async () => {
  await cacheClient.connect();
  console.log("Connected to redis");
};

export const makeCacheKey = (category, id) => `journey:${category}-${id}`;

export const setInCache = async (key, payload, duration = 3600) =>
  await cacheClient.setEx(key, duration, payload);
export const getFromCache = async (key) => await cacheClient.get(key);