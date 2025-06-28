export default async function handleTicketCreato(message) {
    const data = JSON.parse(message)
    console.log("🎫 Ticket creato:", data)
}
