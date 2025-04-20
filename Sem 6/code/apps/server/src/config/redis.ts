import { Redis } from "@upstash/redis";

export const initialzeRedis = async () => {
  try {
    const redis = new Redis({
      url: process.env.REDIS_URL,
      token: process.env.REDIS_TOKEN,
    });

    console.log("Redis connected ");

    return redis;
  } catch (error) {
    console.log(error);
  }
};
