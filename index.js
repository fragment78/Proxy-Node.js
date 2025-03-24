// index.js
import express from "express";
import fetch from "node-fetch";

const app = express();
const API_BASE = "https://api.dofusdb.fr";

app.use(express.json());

app.use(async (req, res) => {
  try {
    const baseUrl = "https://api.dofusdb.fr" + req.path;
const searchParams = new URLSearchParams(req.query);

// Ajoute lang=fr s’il n’existe pas
if (!searchParams.has("lang")) {
  searchParams.set("lang", "fr");
}

// Ajoute limit=100 s’il n’existe pas
if (!searchParams.has("limit")) {
  searchParams.set("limit", "100");
}

const url = `${baseUrl}?${searchParams.toString()}`;

    const method = req.method;
    const headers = { "Content-Type": "application/json" };
    const options = { method, headers };

    if (method === "POST" || method === "PUT") {
      options.body = JSON.stringify(req.body);
    }

    const response = await fetch(url, options);

    // Vérifie si c’est du JSON
    const contentType = response.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      const data = await response.json();
      res.status(response.status).json(data);
    } else {
      const text = await response.text();
      res.status(response.status).send(text); // Renvoie tel quel si ce n’est pas du JSON
    }

  } catch (error) {
    res.status(500).json({ error: "Erreur proxy", detail: error.message });
  }
});

export default app;
