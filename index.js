// index.js
import express from "express";
import fetch from "node-fetch";

const app = express();
const API_BASE = "https://api.dofusdb.fr";

app.use(express.json());

// Proxy GET routes
app.get("*", async (req, res) => {
  try {
    const response = await fetch(`${API_BASE}${req.originalUrl}`);
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: "Erreur proxy", detail: error.message });
  }
});

// Proxy POST (rarement utilisé, mais on le supporte)
app.post("*", async (req, res) => {
  try {
    const response = await fetch(`${API_BASE}${req.originalUrl}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: "Erreur proxy", detail: error.message });
  }
});

export default app;
