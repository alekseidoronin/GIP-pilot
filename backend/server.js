require("dotenv").config();
const express = require("express");
const cors = require("cors");
const apiRoutes = require("./src/routes/api");

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "backend", timestamp: new Date().toISOString() });
});

app.use("/api", apiRoutes);

app.use((err, _req, res, _next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(port, () => {
  console.log(`Backend listening on http://localhost:${port}`);
});
