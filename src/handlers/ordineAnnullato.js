export default async function handleOrdineAnnullato(message) {
    const data = JSON.parse(message)
    console.log("✅ Ordine completato ricevuto:", data)
}
