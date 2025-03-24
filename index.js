import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());

app.use(async (req, res) => {
  const baseUrl = "https://api.dofusdb.fr" + req.path;
  const searchParams = new URLSearchParams(req.query);

  // 🔥 Forcer lang=fr
  if (!searchParams.has("lang")) {
    searchParams.set("lang", "fr");
  }

  // 🔥 Forcer limit=1000 (au lieu de 10 par défaut)
  if (!searchParams.has("limit")) {
    searchParams.set("limit", "1000");
  }

  const url = `${baseUrl}?${searchParams.toString()}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: "Erreur proxy", detail: e.message });
  }
});

app.listen(3000);
