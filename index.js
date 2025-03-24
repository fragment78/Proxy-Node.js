export default async function handler(req, res) {
  const baseUrl = "https://api.dofusdb.fr";

  try {
    const targetUrl = `${baseUrl}${req.url}`;
    const response = await fetch(targetUrl);

    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      throw new Error("La réponse reçue n'est pas du JSON.");
    }

    const json = await response.json();

    // GPT-friendly: si "data" est un tableau, on retourne uniquement ce tableau
    if (json && Array.isArray(json.data)) {
      return res.status(200).json(json.data);
    }

    // Sinon, on renvoie le contenu brut
    return res.status(200).json(json);

  } catch (error) {
    res.status(500).json({
      error: "Erreur proxy",
      detail: error.message
    });
  }
}
