import express from "express"
import dotenv from "dotenv"
import redis from "./redisClient.js"

import handleTicketCreato from "./handlers/ticketCreato.js"
import handleOrdineCreato from "./handlers/ordineCreato.js"

dotenv.config()
const app = express()
app.use(express.json())

// Pubblicazione manuale
app.post("/publish", async (req, res) => {
    const { channel, message } = req.body
    await redis.publish(channel, JSON.stringify(message))
    res.send("Messaggio pubblicato.")
})

// Sottoscrizioni
const subscriber = redis.duplicate()
const canali = ["ticket-creato", "ordine-creato"]

subscriber.subscribe(canali, () => {
    console.log("Iscritto ai canali:", canali.join(", "))
})

subscriber.on("message", (channel, message) => {
    if (channel === "ticket-creato") handleTicketCreato(message)
    if (channel === "ordine-creato") handleOrdineCreato(message)
})

const PORT = process.env.PORT || 3004
app.listen(PORT, () => {
    console.log(`Redis API Service in ascolto sulla porta ${PORT}`)
})
