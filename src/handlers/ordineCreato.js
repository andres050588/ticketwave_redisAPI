export default function handleOrdineCreato(message) {
    const data = JSON.parse(message)
    console.log("📦 Ordine creato:", data)

    // Logica per gestire l'evento ordine-creato
}
