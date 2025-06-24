import Redis from "ioredis"

const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD || undefined,
    retryStrategy(times) {
        const delay = Math.min(times * 50, 2000)
        return delay
    }
})

redis.on("connect", () => {
    console.log("✅ Connesso a Redis!")
})

redis.on("error", err => {
    console.error("❌ Errore connessione Redis:", err)
})

export default redis
