export default async function handler(req, res) {
  const baseUrl = "https://api.dofusdb.fr";
  const targetPath = req.url; // Exemple : /spells

  try {
    const response = await fetch(baseUrl + targetPath);

    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      throw new Error("La réponse n'est pas du JSON valide");
    }

    const json = await response.json();

    // Si la réponse contient un tableau dans "data", retourne-le
    if (json && Array.isArray(json.data)) {
      return res.status(200).json(json.data);
    }

    // Sinon retourne la réponse brute
    return res.status(200).json(json);

  } catch (err) {
    return res.status(500).json({
      error: "Erreur proxy",
      detail: err.message
    });
  }
}
