import redis from 'redis';

let redisClient;

(async () => {
  redisClient = redis.createClient();

  redisClient.on("error", (error) => console.error(`Error : ${error}`));

  await redisClient.connect();
})();

const DEFAULT_EXPIRATION = 120 //cache for 5 min//
const setCache = async (key, value) => {
   await redisClient.setEx(key, DEFAULT_EXPIRATION, JSON.stringify(value));
}

export { redisClient, setCache };
  
