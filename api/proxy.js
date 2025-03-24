export default async function handler(req, res) {
  const baseUrl = "https://api.dofusdb.fr" + req.url.split("?")[0];
  const searchParams = new URLSearchParams(req.query);

  if (!searchParams.has("lang")) {
    searchParams.set("lang", "fr");
  }

  if (!searchParams.has("limit")) {
    searchParams.set("limit", "1000");
  }

  const fullUrl = `${baseUrl}?${searchParams.toString()}`;

  try {
    const response = await fetch(fullUrl);
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Erreur proxy", detail: err.message });
  }
}
