export default async function handler(req, res) {
  const { url } = req;
  const apiUrl = `https://api.dofusdb.fr${url}`;

  try {
    const response = await fetch(apiUrl);
    const json = await response.json();

    // Retourne uniquement le tableau s’il existe dans data
    if (json && Array.isArray(json.data)) {
      res.status(200).json(json.data);
    } else {
      res.status(200).json(json); // fallback
    }
  } catch (error) {
    res.status(500).json({
      error: "Erreur proxy",
      detail: error.message
    });
  }
}
