import Redis from "ioredis"

if (!process.env.REDIS_HOST || !process.env.REDIS_PORT) {
    throw new Error("❌ Variabili REDIS_HOST e REDIS_PORT non sono definite")
}

const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    password: process.env.REDIS_PASSWORD || undefined,
    retryStrategy(times) {
        const delay = Math.min(times * 50, 2000)
        console.log(`🔁 Tentativo riconnessione Redis Nr${times} in ${delay}ms`)
        return delay
    },
    connectTimeout: 5000
})

redis.on("connect", () => {
    console.log("✅ Connesso a Redis!")
})

redis.on("error", err => {
    console.error("❌ Errore connessione Redis:", err)
})

export default redis
