export default async function handleTicketCancellato(message) {
    const data = JSON.parse(message)
    console.log("✅ Ordine completato ricevuto:", data)
}
